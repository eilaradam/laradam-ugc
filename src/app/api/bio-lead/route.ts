import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Recebe o contato capturado no chat do /bio e salva em bio_leads.
export async function POST(req: Request) {
  let body: Record<string, unknown> | null = null;
  try {
    const t = await req.text();
    body = t ? JSON.parse(t) : null;
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  if (!body) return NextResponse.json({ error: "vazio" }, { status: 400 });

  const nome = typeof body.nome === "string" ? body.nome.trim().slice(0, 120) : "";
  const whatsapp = typeof body.whatsapp === "string" ? body.whatsapp.trim().slice(0, 40) : "";
  if (!nome || !whatsapp) {
    return NextResponse.json({ error: "nome e whatsapp obrigatórios" }, { status: 400 });
  }
  const instagram =
    typeof body.instagram === "string" ? body.instagram.trim().slice(0, 80) : null;
  const respostas =
    body.respostas && typeof body.respostas === "object" ? body.respostas : {};
  const produto = typeof body.produto === "string" ? body.produto.slice(0, 120) : null;

  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const sb = supabaseAdmin();
      const { error } = await sb
        .from("bio_leads")
        .insert({ nome, whatsapp, instagram, respostas, produto });
      if (error) {
        console.error("[bio-lead] insert error", error);
        return NextResponse.json({ error: "falha ao salvar" }, { status: 500 });
      }
    }
  } catch (e) {
    console.error("[bio-lead] exception", e);
    return NextResponse.json({ error: "erro" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
