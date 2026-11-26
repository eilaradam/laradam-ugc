import { supabaseAdmin } from "@/lib/supabase";
import { guardLead, validEmail, str } from "@/lib/guard";

// Lead da página ugc.laradam.com/animacoes (guia "Animações com o Claude", episódio 1 skincare).
// O direct da automação CLAUDE UGC manda pra cá depois de conferir que a pessoa segue.
// Vai pra lista_espera (interesse "animacoes-claude"), a mesma que o admin do creators mostra.
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: "Dados inválidos" }, { status: 400 });

  const barrado = guardLead(req, body, { name: "animacoes-lead", limit: 30, windowMs: 60 * 60 * 1000 });
  if (barrado) return barrado;

  const nome = str(body.nome, 120);
  if (!nome) return Response.json({ error: "Escreve seu nome" }, { status: 400 });
  const zap = str(body.whatsapp, 40);
  if (!zap || zap.replace(/\D/g, "").length < 10) return Response.json({ error: "Coloca seu WhatsApp com DDD" }, { status: 400 });
  if (!validEmail(body.email)) return Response.json({ error: "Esse e-mail não parece certo" }, { status: 400 });
  const insta = str(body.instagram, 60)?.replace(/^@+/, "").trim();
  if (!insta) return Response.json({ error: "Coloca o @ do seu Instagram" }, { status: 400 });

  const { error } = await supabaseAdmin().from("lista_espera").insert({
    nome,
    email: String(body.email).trim().toLowerCase(),
    whatsapp: zap,
    instagram: insta,
    origem: str(body.origem, 40) || "animacoes",
    interesse: "animacoes-claude",
  });
  // já cadastrada antes: libera do mesmo jeito
  if (error?.code === "23505") return Response.json({ ok: true, ja: true });
  if (error) {
    console.error("[animacoes-lead]", error.message);
    return Response.json({ error: "Não consegui salvar agora. Tenta de novo?" }, { status: 500 });
  }
  return Response.json({ ok: true });
}
