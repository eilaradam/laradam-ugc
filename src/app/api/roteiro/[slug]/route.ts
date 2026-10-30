import { supabaseAdmin } from "@/lib/supabase";
import { clientIp, emailBudgetOk, originAllowed, rateLimit, str, tooManyRequests } from "@/lib/guard";
import { sendRoteiroAviso } from "@/lib/resend";
import { blocoDe, gravarAlvo, lerAlvo, type Nota, type RoteiroConteudo } from "@/lib/roteiro";

// Ações da página /roteiro/<slug>. O slug é o acesso da marca;
// a chave_lara (?k=) libera aceitar, recusar e resolver.

type Ctx = { params: Promise<{ slug: string }> };

const SITE = "https://ugc.laradam.com";
const BUCKET = "roteiros-marca";

function erro(msg: string, status = 400) {
  return Response.json({ error: msg }, { status });
}

async function carregar(slug: string) {
  const db = supabaseAdmin();
  const { data } = await db
    .from("roteiros_marca")
    .select("id, slug, chave_lara, conteudo, gancho_escolhido, gancho_escolhido_por, aprovado_em, aprovado_por, updated_at")
    .eq("slug", slug)
    .maybeSingle();
  return data;
}

async function notasDe(roteiroId: string): Promise<Nota[]> {
  const { data } = await supabaseAdmin()
    .from("roteiros_marca_notas")
    .select("id, parent_id, alvo, tipo, autor, autor_lara, texto, original, sugerido, status, created_at")
    .eq("roteiro_id", roteiroId)
    .order("created_at", { ascending: true });
  return (data ?? []) as Nota[];
}

function publico(r: NonNullable<Awaited<ReturnType<typeof carregar>>>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, chave_lara, ...resto } = r;
  return resto;
}

export async function GET(req: Request, ctx: Ctx) {
  const { slug } = await ctx.params;
  const r = await carregar(slug);
  if (!r) return erro("Roteiro não encontrado", 404);
  return Response.json({ roteiro: publico(r), notas: await notasDe(r.id) });
}

export async function POST(req: Request, ctx: Ctx) {
  if (originAllowed(req) === false) return erro("Origem não permitida", 403);
  const lim = rateLimit(`roteiro:${clientIp(req)}`, 60, 10 * 60 * 1000);
  if (!lim.ok) return tooManyRequests(lim.retryAfter);

  const { slug } = await ctx.params;
  const r = await carregar(slug);
  if (!r) return erro("Roteiro não encontrado", 404);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return erro("JSON inválido");
  }

  const lara = typeof body.k === "string" && body.k === r.chave_lara;
  const autor = lara ? "Lara" : str(body.autor, 80);
  const acao = body.acao;
  const db = supabaseAdmin();
  const conteudo = r.conteudo as RoteiroConteudo;
  const marca = conteudo.marca;
  let aviso: { assunto: string; linhas: string[] } | null = null;

  if (!autor) return erro("Coloca seu nome antes");

  if (acao === "comentar" || acao === "sugerir") {
    const alvo = str(body.alvo, 60);
    if (!alvo) return erro("Trecho inválido");
    const atual = lerAlvo(conteudo, alvo) ?? "";
    if (acao === "comentar") {
      const texto = str(body.texto, 3000);
      if (!texto) return erro("Escreve o comentário");
      await db.from("roteiros_marca_notas").insert({ roteiro_id: r.id, alvo, tipo: "comentario", autor, autor_lara: lara, texto });
      aviso = { assunto: `💬 ${autor} comentou no roteiro ${marca}`, linhas: [`Trecho: ${atual}`, `Comentário: ${texto}`] };
    } else {
      const sugerido = str(body.sugerido, 3000);
      if (!sugerido || sugerido === atual) return erro("Muda o texto antes de enviar");
      if (!gravarAlvo(conteudo, alvo, sugerido)) return erro("Trecho inválido");
      const texto = str(body.texto, 1000);
      await db.from("roteiros_marca_notas").insert({
        roteiro_id: r.id, alvo, tipo: "sugestao", autor, autor_lara: lara, texto, original: atual, sugerido,
      });
      aviso = {
        assunto: `✏️ ${autor} sugeriu uma mudança no roteiro ${marca}`,
        linhas: [`Antes: ${atual}`, `Sugestão: ${sugerido}`, ...(texto ? [`Motivo: ${texto}`] : [])],
      };
    }
  } else if (acao === "responder") {
    const pai = str(body.parent_id, 60);
    const texto = str(body.texto, 3000);
    if (!pai || !texto) return erro("Escreve a resposta");
    const { data: p } = await db.from("roteiros_marca_notas").select("id, alvo").eq("id", pai).eq("roteiro_id", r.id).maybeSingle();
    if (!p) return erro("Comentário não encontrado", 404);
    await db.from("roteiros_marca_notas").insert({ roteiro_id: r.id, parent_id: p.id, alvo: p.alvo, tipo: "resposta", autor, autor_lara: lara, texto });
    aviso = { assunto: `💬 ${autor} respondeu no roteiro ${marca}`, linhas: [texto] };
  } else if (acao === "gancho") {
    const id = str(body.id, 4);
    if (!id || !conteudo.ganchos.some((g) => g.id === id)) return erro("Gancho inválido");
    await db.from("roteiros_marca").update({ gancho_escolhido: id, gancho_escolhido_por: autor, updated_at: new Date().toISOString() }).eq("id", r.id);
    const g = conteudo.ganchos.find((x) => x.id === id)!;
    aviso = { assunto: `🎯 ${autor} escolheu o gancho ${id} (${marca})`, linhas: [`${id} · ${g.titulo}`, g.fala] };
  } else if (acao === "aprovar") {
    await db.from("roteiros_marca").update({ aprovado_em: new Date().toISOString(), aprovado_por: autor, updated_at: new Date().toISOString() }).eq("id", r.id);
    const gancho = r.gancho_escolhido ? ` com o gancho ${r.gancho_escolhido}` : "";
    aviso = { assunto: `✅ ${autor} aprovou o roteiro ${marca}${gancho}`, linhas: ["Pode gravar! 🎬"] };
  } else if (acao === "aceitar" || acao === "recusar" || acao === "resolver" || acao === "reabrir") {
    if (!lara) return erro("Só a Lara pode fazer isso", 403);
    const id = str(body.id, 60);
    const { data: n } = await db.from("roteiros_marca_notas").select("id, tipo, alvo, sugerido").eq("id", id).eq("roteiro_id", r.id).maybeSingle();
    if (!n) return erro("Nota não encontrada", 404);
    if (acao === "aceitar") {
      if (n.tipo !== "sugestao" || !n.sugerido) return erro("Só sugestão pode ser aceita");
      const novo = gravarAlvo(conteudo, n.alvo, n.sugerido);
      if (!novo) return erro("Trecho não existe mais");
      await db.from("roteiros_marca").update({ conteudo: novo, updated_at: new Date().toISOString() }).eq("id", r.id);
    }
    const status = { aceitar: "aceita", recusar: "recusada", resolver: "resolvida", reabrir: "aberta" }[acao];
    await db.from("roteiros_marca_notas").update({ status }).eq("id", n.id);
  } else if (acao === "ref_add" || acao === "ref_rm" || acao === "foto_rm") {
    if (!lara) return erro("Só a Lara pode fazer isso", 403);
    const novo: RoteiroConteudo = structuredClone(conteudo);
    const b = blocoDe(novo, str(body.bloco, 60) ?? "");
    const url = str(body.url, 1000);
    if (!b || !url) return erro("Bloco inválido");
    if (acao === "ref_add") {
      if (!/^https?:\/\//.test(url)) return erro("Link inválido");
      b.refs = [...(b.refs ?? []), { url, titulo: str(body.titulo, 120) ?? undefined }];
    } else if (acao === "ref_rm") {
      b.refs = (b.refs ?? []).filter((r) => r.url !== url);
    } else {
      b.fotos = (b.fotos ?? []).filter((f) => f !== url);
      const caminho = url.split(`/${BUCKET}/`)[1];
      if (caminho) await db.storage.from(BUCKET).remove([caminho]);
    }
    await db.from("roteiros_marca").update({ conteudo: novo, updated_at: new Date().toISOString() }).eq("id", r.id);
  } else {
    return erro("Ação desconhecida");
  }

  if (aviso && !lara && emailBudgetOk()) {
    try {
      await sendRoteiroAviso({ ...aviso, link: `${SITE}/roteiro/${r.slug}?k=${r.chave_lara}` });
    } catch (e) {
      console.error("[roteiro] aviso falhou", e);
    }
  }

  const atualizado = await carregar(slug);
  return Response.json({ roteiro: publico(atualizado!), notas: await notasDe(r.id) });
}
