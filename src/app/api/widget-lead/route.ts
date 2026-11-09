import { supabaseAdmin } from "@/lib/supabase";
import { guardLead, validEmail, str } from "@/lib/guard";

// Lead da página ugc.laradam.com/widget (isca do reels do widget, automação WIDGET no direct).
// Vai pra mesma lista_espera que o admin do creators já mostra, com origem "widget" (ou o ?ref).
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: "Dados inválidos" }, { status: 400 });

  const barrado = guardLead(req, body, { name: "widget-lead", limit: 6, windowMs: 60 * 60 * 1000 });
  if (barrado) return barrado;

  const nome = str(body.nome, 120);
  if (!nome) return Response.json({ error: "Escreve seu nome" }, { status: 400 });
  if (!validEmail(body.email)) return Response.json({ error: "Esse e-mail não parece certo" }, { status: 400 });

  const insta = str(body.instagram, 60)?.replace(/^@+/, "").trim() || null;
  const { error } = await supabaseAdmin().from("lista_espera").insert({
    nome,
    email: String(body.email).trim().toLowerCase(),
    whatsapp: str(body.whatsapp, 40) || null,
    instagram: insta,
    origem: str(body.origem, 40) || "widget",
    interesse: "widget",
  });
  if (error) {
    console.error("[widget-lead]", error.message);
    return Response.json({ error: "Não consegui salvar agora. Tenta de novo?" }, { status: 500 });
  }
  return Response.json({ ok: true });
}
