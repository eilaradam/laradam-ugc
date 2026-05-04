import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const ALLOWED_TYPES = new Set(["page_view", "button_click", "video_view"]);

export async function POST(req: Request) {
  let body: Record<string, unknown> | null = null;
  try {
    const text = await req.text();
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

  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const sb = supabaseAdmin();
      const { error } = await sb.from("portfolio_events").insert({
        event_type: eventType,
        event_name: eventName,
        session_id:
          typeof body.session_id === "string"
            ? body.session_id.slice(0, 100)
            : null,
        page_path:
          typeof body.page_path === "string"
            ? body.page_path.slice(0, 200)
            : null,
        user_agent:
          typeof body.user_agent === "string"
            ? body.user_agent.slice(0, 500)
            : null,
        referrer:
          typeof body.referrer === "string"
            ? body.referrer.slice(0, 500)
            : null,
        metadata:
          body.metadata && typeof body.metadata === "object"
            ? body.metadata
            : {},
      });
      if (error) console.error("[track] insert error", error);
    }
  } catch (e) {
    console.error("[track] exception", e);
  }

  return NextResponse.json({ ok: true });
}
