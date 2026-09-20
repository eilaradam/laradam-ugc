import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { clientIp, originAllowed, rateLimit, str } from "@/lib/guard";

const ALLOWED_TYPES = new Set(["page_view", "button_click", "video_view"]);

// Uma visita de verdade gera poucos eventos. 60 em 10 minutos cobre a navegação
// mais agitada e ainda corta qualquer script que tente poluir a métrica.
const LIMITE = 60;
const JANELA_MS = 10 * 60 * 1000;

export async function POST(req: Request) {
  if (originAllowed(req) === false) {
    return NextResponse.json({ ok: true });
  }

  let body: Record<string, unknown> | null = null;
  try {
    const text = await req.text();
    if (text.length > 10_000) return NextResponse.json({ ok: true });
    body = text ? JSON.parse(text) : null;
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  if (!body) return NextResponse.json({ ok: true });

  const eventType = String(body.event_type ?? "");
  const eventName = String(body.event_name ?? "").slice(0, 200);
  if (!ALLOWED_TYPES.has(eventType) || !eventName) {
    return NextResponse.json(
      { error: "event_type e event_name obrigatórios" },
      { status: 400 }
    );
  }

  // Estourou a cota: responde ok (não quebra a página) e descarta o evento.
  if (!rateLimit(`track:${clientIp(req)}`, LIMITE, JANELA_MS).ok) {
    return NextResponse.json({ ok: true });
  }

  // Metadata é jsonb livre: limita o tamanho para não virar depósito de lixo.
  let metadata: Record<string, unknown> = {};
  if (body.metadata && typeof body.metadata === "object") {
    const m = body.metadata as Record<string, unknown>;
    if (JSON.stringify(m).length <= 2000) metadata = m;
  }

  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const sb = supabaseAdmin();
      const { error } = await sb.from("portfolio_events").insert({
        event_type: eventType,
        event_name: eventName,
        session_id: str(body.session_id, 100),
        page_path: str(body.page_path, 200),
        user_agent: str(body.user_agent, 500),
        referrer: str(body.referrer, 500),
        metadata,
      });
      if (error) console.error("[track] insert error", error);
    }
  } catch (e) {
    console.error("[track] exception", e);
  }

  return NextResponse.json({ ok: true });
}
