import { supabaseAdmin } from "@/lib/supabase";
import { str } from "@/lib/guard";

// Rotina de conteúdo do @eilaradam (tabela conteudo_perfil).
// Tudo exige a chave (?k= ou header x-rotina) que fica só com a Lara; os roteiros não vão pro git.

const STATUS = ["pendente", "gravado", "editado", "agendado", "postado"] as const;
const PLANO_ID = "rotina_plano";
const IDEIA_STATUS = ["ideia", "gravar", "postado"];

const RESULTADOS_ID = "rotina_resultados";

type Bruto = Record<string, unknown>;
const num = (v: unknown) => (typeof v === "number" && isFinite(v) ? v : 0);

/**
 * As métricas vêm do mesmo lugar que o admin do creators usa (aba Instagram): a tabela
 * ig_insights_cache, que o cron do ig-insights atualiza a cada 30 min. Junta o recorte de
 * 90 dias com o "all" e fica com a versão mais nova de cada post.
 */
async function lerInstagram() {
  const db = supabaseAdmin();
  const desde = new Date(Date.now() - 200 * 864e5).toISOString().slice(0, 10);
  const [cache, seg] = await Promise.all([
    db.from("ig_insights_cache").select("days,generated_at,payload").in("days", ["90", "all"]),
    db.from("ig_followers_daily").select("dia,followers").gte("dia", desde).order("dia"),
  ]);
  const linhas = (cache.data ?? []).slice().sort((a, b) => String(a.generated_at).localeCompare(String(b.generated_at)));
  const porId = new Map<string, unknown>();
  let atualizado = "";
  for (const l of linhas) {
    if (String(l.generated_at) > atualizado) atualizado = String(l.generated_at);
    const posts = ((l.payload as Bruto | null)?.posts ?? []) as Bruto[];
    for (const p of posts) {
      if (!p?.id || !p.timestamp) continue;
      const ts = String(p.timestamp);
      porId.set(String(p.id), {
        id: String(p.id),
        ts,
        dia: new Date(ts).toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" }),
        tipo: String(p.media_type ?? ""),
        legenda: String(p.caption ?? "").slice(0, 160),
        link: (p.permalink as string) ?? null,
        views: num(p.views),
        alcance: num(p.reach),
        curtidas: num(p.like_count),
        comentarios: num(p.comments_count),
        salvos: num(p.saved),
        compart: num(p.shares),
        tempo: typeof p.tempo_medio_seg === "number" ? p.tempo_medio_seg : null,
      });
    }
  }
  const posts = [...porId.values()].sort((a, b) => String((b as Bruto).ts).localeCompare(String((a as Bruto).ts)));
  return { posts, seguidores: seg.data ?? [], atualizado };
}

async function lerResultados() {
  const { data } = await supabaseAdmin().from("configuracoes").select("conteudo").eq("id", RESULTADOS_ID).maybeSingle();
  try {
    const r = data?.conteudo ? JSON.parse(data.conteudo) : {};
    return { links: r.links ?? {}, notas: r.notas ?? {} };
  } catch {
    return { links: {}, notas: {} };
  }
}

function autorizado(req: Request) {
  const u = new URL(req.url);
  const k = u.searchParams.get("k") ?? req.headers.get("x-rotina");
  return !!process.env.ROTINA_CHAVE && k === process.env.ROTINA_CHAVE;
}

export async function GET(req: Request) {
  if (!autorizado(req)) return Response.json({ error: "Chave inválida" }, { status: 401 });
  const u = new URL(req.url);
  const de = u.searchParams.get("de") ?? new Date(Date.now() - 7 * 864e5).toISOString().slice(0, 10);
  const ate = u.searchParams.get("ate") ?? new Date(Date.now() + 120 * 864e5).toISOString().slice(0, 10);
  const { data, error } = await supabaseAdmin()
    .from("conteudo_perfil")
    .select("*")
    .gte("data", de)
    .lte("data", ate)
    .order("data")
    .order("created_at");
  if (error) return Response.json({ error: error.message }, { status: 500 });

  // aba Plano: narrativa, calendário, temas e frequência (um JSON em configuracoes) + o Banco de Ideias do admin
  if (u.searchParams.get("plano")) {
    const db = supabaseAdmin();
    const [plano, ideias] = await Promise.all([
      db.from("configuracoes").select("conteudo").eq("id", PLANO_ID).maybeSingle(),
      db.from("ig_ideias").select("id,titulo,descricao,formato,status,tags,favorita,roteiro,created_at").neq("status", "postado").order("created_at", { ascending: false }),
    ]);
    let p = null;
    try { p = plano.data?.conteudo ? JSON.parse(plano.data.conteudo) : null; } catch {}
    const [insta, resultados] = await Promise.all([lerInstagram(), lerResultados()]);
    return Response.json({ itens: data ?? [], plano: p, ideias: ideias.data ?? [], insta, resultados });
  }

  // formato curto pro widget do iPhone: o que falta hoje e o próximo
  if (u.searchParams.get("widget")) {
    const hoje = new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
    const abertos = (data ?? []).filter((c) => c.status !== "postado");
    return Response.json({
      hoje: abertos.filter((c) => c.data <= hoje).map((c) => ({ id: c.id, data: c.data, titulo: c.titulo, status: c.status, serie: c.serie })),
      proximos: abertos.filter((c) => c.data > hoje).slice(0, 3).map((c) => ({ id: c.id, data: c.data, titulo: c.titulo, status: c.status, serie: c.serie })),
      pautaAte: (data ?? []).reduce((m, c) => (c.data > m ? c.data : m), ""),
    });
  }
  return Response.json({ itens: data ?? [] });
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
  const mudar: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (typeof body.status === "string" && (STATUS as readonly string[]).includes(body.status)) mudar.status = body.status;
  if (Array.isArray(body.checklist)) mudar.checklist = body.checklist.slice(0, 30);
  if (typeof body.takes_url === "string") mudar.takes_url = body.takes_url.slice(0, 500);
  if (typeof body.legenda === "string") mudar.legenda = body.legenda.slice(0, 2200);
  const { data, error } = await supabaseAdmin().from("conteudo_perfil").update(mudar).eq("id", id).select().maybeSingle();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ item: data });
}

export async function DELETE(req: Request) {
  if (!autorizado(req)) return Response.json({ error: "Chave inválida" }, { status: 401 });
  const id = str(new URL(req.url).searchParams.get("id"), 60);
  if (!id) return Response.json({ error: "Sem id" }, { status: 400 });
  const { error } = await supabaseAdmin().from("conteudo_perfil").delete().eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}

// POST: salvar o plano, criar ideia, mudar status de ideia ou mandar uma ideia pra pauta (vira post com data)
export async function POST(req: Request) {
  if (!autorizado(req)) return Response.json({ error: "Chave inválida" }, { status: 401 });
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }
  const db = supabaseAdmin();
  const agora = new Date().toISOString();

  if (body.acao === "plano") {
    const texto = JSON.stringify(body.plano ?? {});
    if (texto.length > 60000) return Response.json({ error: "Plano grande demais" }, { status: 400 });
    const { error } = await db.from("configuracoes").upsert({ id: PLANO_ID, conteudo: texto, updated_at: agora });
    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ ok: true });
  }

  // qual post do Instagram é o desta pauta ("" = nenhum), e a anotação de por que foi bem ou mal
  if (body.acao === "vinculo" || body.acao === "nota") {
    const id = str(body.id, 60);
    if (!id) return Response.json({ error: "Sem id" }, { status: 400 });
    const r = await lerResultados();
    if (body.acao === "vinculo") r.links[id] = typeof body.media_id === "string" ? body.media_id.slice(0, 40) : "";
    else r.notas[id] = typeof body.texto === "string" ? body.texto.slice(0, 1000) : "";
    const { error } = await db.from("configuracoes").upsert({ id: RESULTADOS_ID, conteudo: JSON.stringify(r), updated_at: agora });
    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ ok: true });
  }

  if (body.acao === "ideia") {
    const titulo = str(body.titulo, 200);
    if (!titulo) return Response.json({ error: "Sem título" }, { status: 400 });
    const tags = Array.isArray(body.tags) ? body.tags.map((t) => str(t, 40)).filter(Boolean).slice(0, 6) : [];
    const { data, error } = await db.from("ig_ideias")
      .insert({ titulo, descricao: str(body.descricao, 1000) || null, formato: str(body.formato, 40) || "Reel", status: "ideia", tags, origem: "rotina" })
      .select("id,titulo,descricao,formato,status,tags,favorita,roteiro,created_at").single();
    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ ideia: data });
  }

  if (body.acao === "ideia_status") {
    const id = str(body.id, 60);
    const st = str(body.status, 20);
    if (!id || !st || !IDEIA_STATUS.includes(st)) return Response.json({ error: "Dados inválidos" }, { status: 400 });
    const { error } = await db.from("ig_ideias").update({ status: st, updated_at: agora }).eq("id", id);
    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ ok: true });
  }

  if (body.acao === "pauta") {
    const id = str(body.id, 60);
    const dia = str(body.data, 10);
    if (!id || !dia || !/^\d{4}-\d{2}-\d{2}$/.test(dia)) return Response.json({ error: "Dados inválidos" }, { status: 400 });
    const { data: ideia, error: e1 } = await db.from("ig_ideias").select("*").eq("id", id).maybeSingle();
    if (e1 || !ideia) return Response.json({ error: "Ideia não encontrada" }, { status: 404 });
    const r = (ideia.roteiro ?? {}) as { gancho?: string; desenvolvimento?: string[]; cta?: string; legenda?: string };
    const roteiro = [...(r.desenvolvimento ?? []), r.cta ?? ""].filter(Boolean).join("\n\n") || ideia.descricao || null;
    const { data: post, error: e2 } = await db.from("conteudo_perfil")
      .insert({ data: dia, titulo: ideia.titulo, formato: ideia.formato, serie: str(body.serie, 20) || "dica", gancho: r.gancho ?? null, roteiro, legenda: r.legenda ?? null, checklist: [], status: "pendente" })
      .select().single();
    if (e2) return Response.json({ error: e2.message }, { status: 500 });
    await db.from("ig_ideias").update({ status: "gravar", updated_at: agora }).eq("id", id);
    return Response.json({ item: post });
  }

  return Response.json({ error: "Ação desconhecida" }, { status: 400 });
}
