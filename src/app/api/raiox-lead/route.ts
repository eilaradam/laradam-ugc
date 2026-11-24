import { supabaseAdmin } from "@/lib/supabase";
import { guardLead, validEmail, str } from "@/lib/guard";

// Formulário do bônus da aula grátis Edição com Claude (ugc.laradam.com/raiox): 4 campos e libera o e-book.
// Vai pra bio_leads (produto "Bônus aula Edição com Claude": nome, WhatsApp e e-mail; origem em respostas) e o contato
// também entra na lista_espera (interesse "raiox"), que o admin do creators já mostra.

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: "Dados inválidos" }, { status: 400 });

  // aula ao vivo: muita gente da mesma rede ao mesmo tempo, então o limite por IP é mais folgado
  const barrado = guardLead(req, body, { name: "raiox-lead", limit: 40, windowMs: 60 * 60 * 1000 });
  if (barrado) return barrado;

  const nome = str(body.nome, 120);
  if (!nome) return Response.json({ error: "Escreve seu nome" }, { status: 400 });
  if (!validEmail(body.email)) return Response.json({ error: "Esse e-mail não parece certo" }, { status: 400 });
  const zap = str(body.whatsapp, 40);
  if (!zap || zap.replace(/\D/g, "").length < 10) return Response.json({ error: "Coloca seu WhatsApp com DDD" }, { status: 400 });
  const insta = str(body.instagram, 60)?.replace(/^@+/, "").trim() || null; // opcional: o formulário de 24/11 não pede mais

  const email = String(body.email).trim().toLowerCase();
  const origem = str(body.origem, 40) || "aula-edicao";
  const db = supabaseAdmin();
  const { error } = await db.from("bio_leads").insert({
    nome,
    email,
    whatsapp: zap,
    produto: "Bônus aula Edição com Claude",
    respostas: { instagram: insta, origem },
  });
  if (error) {
    console.error("[raiox-lead]", error.message);
    return Response.json({ error: "Não consegui salvar agora. Tenta de novo?" }, { status: 500 });
  }
  // contato também na lista de espera do admin; se já estiver lá, segue normal
  const { error: e2 } = await db.from("lista_espera").insert({ nome, email, whatsapp: zap, instagram: insta, origem, interesse: "raiox" });
  if (e2 && e2.code !== "23505") console.error("[raiox-lead] lista_espera", e2.message);
  return Response.json({ ok: true });
}
