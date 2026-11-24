import { supabaseAdmin } from "@/lib/supabase";
import { guardLead, validEmail, str } from "@/lib/guard";

// Formulário do Raio-X do Reels (ugc.laradam.com/raiox), liberado no fim da aula grátis de Edição com Claude.
// As respostas completas vão pra bio_leads (produto "Raio-X do Reels", respostas em jsonb) e o contato
// também entra na lista_espera (interesse "raiox"), que o admin do creators já mostra.
const EDITA = ["Sim, eu mesma edito", "Às vezes, depende do trabalho", "Não, pago alguém pra editar", "Não faço vídeo pra marca ainda"];
const VIDEOS = ["Nenhum ainda", "De 1 a 3", "De 4 a 10", "Mais de 10"];
const TRAVA = ["O corte, tirar pausa e erro", "A legenda", "Os títulos e as animações", "O som e a música", "O tempo que leva"];

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
  const insta = str(body.instagram, 60)?.replace(/^@+/, "").trim();
  if (!insta) return Response.json({ error: "Coloca seu @ do Instagram" }, { status: 400 });
  const edita = str(body.edita, 80), videos = str(body.videos, 40), trava = str(body.trava, 80);
  if (!edita || !EDITA.includes(edita)) return Response.json({ error: "Responde se você edita seus vídeos" }, { status: 400 });
  if (!videos || !VIDEOS.includes(videos)) return Response.json({ error: "Responde quantos vídeos você entrega por mês" }, { status: 400 });
  if (!trava || !TRAVA.includes(trava)) return Response.json({ error: "Responde o que mais te trava na edição" }, { status: 400 });

  const email = String(body.email).trim().toLowerCase();
  const origem = str(body.origem, 40) || "aula-edicao";
  const db = supabaseAdmin();
  const { error } = await db.from("bio_leads").insert({
    nome,
    email,
    whatsapp: zap,
    produto: "Raio-X do Reels",
    respostas: { instagram: insta, edita, videos_por_mes: videos, trava, origem },
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
