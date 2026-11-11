import { createHash } from "node:crypto";
import { supabaseAdmin } from "@/lib/supabase";
import { str } from "@/lib/guard";

// Entregas pendentes das campanhas (mesma tabela da aba Conteúdos do admin).
// Prazo do roteiro: "Envie até" da Seu Influencer, ou aprovação + 3 dias corridos.
// Prazo do conteúdo: "Envie até" da Seu Influencer, ou roteiro aprovado + 5 dias corridos.
// Usa a mesma chave da rotina (ROTINA_CHAVE).

// Postar: status "aprovado" com data_postagem preenchida (a data é o prazo pra postar).
const ABERTOS = ["briefing", "roteiro", "aprovacao_roteiro", "gravacao", "edicao", "aprovacao_video", "aprovado"];
const PROXIMO: Record<string, string> = { briefing: "aprovacao_roteiro", roteiro: "aprovacao_roteiro", aprovacao_roteiro: "gravacao", gravacao: "aprovacao_video", edicao: "aprovacao_video", aprovacao_video: "aprovado", aprovado: "postado" };

function autorizado(req: Request) {
  const k = new URL(req.url).searchParams.get("k") ?? req.headers.get("x-rotina");
  return !!process.env.ROTINA_CHAVE && k === process.env.ROTINA_CHAVE;
}

// mesma chave que liga a campanha do robô à linha da planilha (robo-registrar)
function uuidSI(chave: string) {
  const ns = Buffer.from("6f1d2b8e3c4a4e5f9a7b1c2d3e4f5a6b", "hex");
  const b = createHash("sha1").update(Buffer.concat([ns, Buffer.from("seuinfluencer:" + chave)])).digest().subarray(0, 16);
  b[6] = (b[6] & 0x0f) | 0x50;
  b[8] = (b[8] & 0x3f) | 0x80;
  const x = b.toString("hex");
  return `${x.slice(0, 8)}-${x.slice(8, 12)}-${x.slice(12, 16)}-${x.slice(16, 20)}-${x.slice(20)}`;
}

const maisDias = (d: string | null, n: number) => {
  if (!d) return null;
  const t = new Date(d + "T12:00:00Z");
  t.setUTCDate(t.getUTCDate() + n);
  return t.toISOString().slice(0, 10);
};

type Linha = Record<string, unknown> & { id: string; status: string; updated_at: string | null; origem_id: string | null };

export async function GET(req: Request) {
  if (!autorizado(req)) return Response.json({ error: "Chave inválida" }, { status: 401 });
  const db = supabaseAdmin();
  const [{ data: cs, error }, { data: si }] = await Promise.all([
    db.from("conteudos").select("*").in("status", ABERTOS),
    db.from("robo_aprovadas").select("*"),
  ]);
  if (error) return Response.json({ error: error.message }, { status: 500 });

  const doRobo = new Map<string, Record<string, string | null>>();
  for (const r of si ?? []) doRobo.set(uuidSI(r.chave), r);

  const linhas = ((cs ?? []) as Linha[]).filter((c) => c.status !== "aprovado" || c.data_postagem);
  const itens = linhas.map((c) => {
    const r = c.origem_id ? doRobo.get(c.origem_id) : undefined;
    const aprovada = (c.aprovada_em as string | null) ?? (r?.aprovada_em ?? null);
    const desde = (c.updated_at ?? "").slice(0, 10) || null;
    let tipo: string, prazo: string | null = null;
    if (c.status === "briefing" || c.status === "roteiro") {
      tipo = "roteiro";
      prazo = (c.prazo_roteiro as string | null) ?? r?.prazo_roteiro ?? maisDias(aprovada, Number(c.prazo_roteiro_dias ?? 3));
    } else if (c.status === "gravacao" || c.status === "edicao") {
      tipo = "conteudo";
      prazo = (c.prazo_conteudo as string | null) ?? r?.prazo_video ?? maisDias(c.roteiro_aprovado_em as string | null, Number(c.prazo_conteudo_dias ?? 5));
    } else if (c.status === "aprovado") {
      tipo = "postar";
      prazo = c.data_postagem as string;
    } else {
      tipo = c.status === "aprovacao_roteiro" ? "espera_roteiro" : "espera_video";
    }
    return {
      id: c.id, nome: c.nome, cliente: c.cliente, status: c.status, tipo, prazo, desde, aprovada_em: aprovada,
      roteiro_aprovado_em: c.roteiro_aprovado_em ?? null, valor: c.valor, destaque: c.destaque, observacoes: c.observacoes,
      roteiro_url: c.roteiro_url ?? null, etapa_si: r?.etapa ?? null,
    };
  });

  const u = new URL(req.url);
  if (u.searchParams.get("widget")) {
    const fazer = itens.filter((i) => i.tipo === "roteiro" || i.tipo === "conteudo" || i.tipo === "postar").sort((a, b) => (a.prazo ?? "9999").localeCompare(b.prazo ?? "9999"));
    return Response.json({ fazer: fazer.map(({ id, nome, tipo, prazo }) => ({ id, nome, tipo, prazo })), esperando: itens.length - fazer.length });
  }
  return Response.json({ itens });
}

export async function PATCH(req: Request) {
  if (!autorizado(req)) return Response.json({ error: "Chave inválida" }, { status: 401 });
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }
  const id = str(body.id, 60);
  if (!id) return Response.json({ error: "Sem id" }, { status: 400 });
  const db = supabaseAdmin();
  const mudar: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (body.acao === "avancar") {
    const { data: c } = await db.from("conteudos").select("status, data_aprovacao").eq("id", id).maybeSingle();
    if (!c || !PROXIMO[c.status]) return Response.json({ error: "Não dá pra avançar" }, { status: 400 });
    mudar.status = PROXIMO[c.status];
    // marca aprovou o vídeo = terminei o conteúdo (é daqui que o widget de pagamentos conta os dias)
    if (c.status === "aprovacao_video" && !c.data_aprovacao) mudar.data_aprovacao = new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
    if (c.status === "aprovado") mudar.data_postagem = new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
  }
  const data = (v: unknown) => (v === null || (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v)) ? v : undefined);
  for (const k of ["prazo_roteiro", "prazo_conteudo", "data_postagem", "aprovada_em", "roteiro_aprovado_em"]) {
    if (k in body && data(body[k]) !== undefined) mudar[k] = data(body[k]);
  }
  const { data: item, error } = await db.from("conteudos").update(mudar).eq("id", id).select("id, status").maybeSingle();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ item });
}
