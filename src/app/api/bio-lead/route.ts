import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { guardLead, str } from "@/lib/guard";

export const dynamic = "force-dynamic";

// Recebe o contato capturado no chat do /bio e salva em bio_leads.
export async function POST(req: Request) {
  let body: Record<string, unknown> | null = null;
  try {
    const t = await req.text();
    // Corpo gigante nem chega a ser interpretado.
    if (t.length > 20_000) {
      return NextResponse.json({ error: "payload grande" }, { status: 413 });
    }
    body = t ? JSON.parse(t) : null;
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  if (!body) return NextResponse.json({ error: "vazio" }, { status: 400 });

  // Não manda email, então a cota pode ser mais folgada que a de contato.
  const barrado = guardLead(req, body, {
    name: "bio-lead",
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });
  if (barrado) return barrado;

  const nome = str(body.nome, 120);
  const whatsapp = str(body.whatsapp, 40);
  if (!nome || !whatsapp) {
    return NextResponse.json({ error: "nome e whatsapp obrigatórios" }, { status: 400 });
  }
  // Telefone de verdade tem de 8 a 15 dígitos.
  const digitos = whatsapp.replace(/\D/g, "").length;
  if (digitos < 8 || digitos > 15) {
    return NextResponse.json({ error: "whatsapp inválido" }, { status: 400 });
  }
  const email = str(body.email, 120);
  const respostas =
    body.respostas && typeof body.respostas === "object" ? body.respostas : {};
  const produto = str(body.produto, 120);

  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const sb = supabaseAdmin();
      const { error } = await sb
        .from("bio_leads")
        .insert({ nome, whatsapp, email, respostas, produto });
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
