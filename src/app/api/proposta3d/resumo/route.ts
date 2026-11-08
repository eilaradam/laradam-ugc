import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// Resumo de quem abriu a proposta de impressão 3D (ugc.laradam.com/impressao-3d).
// Lido pela rotina agendada que manda o e-mail pra Lara: GET /api/proposta3d/resumo.
// Sem chave, devolve só a contagem (não diz quais marcas). Com ?k=<PROPOSTA3D_TOKEN>, se essa
// variável existir na Vercel, devolve também a lista por marca.
// Conta só o evento proposta3d_aberta sem dono:true (as visitas da própria Lara ficam de fora).

type Evento = { session_id: string | null; event_name: string; metadata: Record<string, unknown> | null; created_at: string };

export async function GET(req: Request) {
  const token = process.env.PROPOSTA3D_TOKEN;
  const detalhado = !!token && new URL(req.url).searchParams.get("k") === token;

  const { data, error } = await supabaseAdmin()
    .from("portfolio_events")
    .select("session_id,event_name,metadata,created_at")
    .like("page_path", "/impressao-3d%")
    .order("created_at", { ascending: true })
    .limit(5000);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const eventos = (data ?? []) as Evento[];
  // Sessão → marca, a partir do evento de abertura; o resto da sessão (rolagem) herda a marca.
  const marcaDaSessao = new Map<string, string>();
  for (const e of eventos) {
    if (e.event_name !== "proposta3d_aberta" || !e.session_id) continue;
    if (e.metadata?.dono === true) continue;
    marcaDaSessao.set(e.session_id, String(e.metadata?.marca ?? "(sem marca)"));
  }

  const porMarca = new Map<string, { visitas: Set<string>; primeira: string; ultima: string; rolagem: number }>();
  for (const e of eventos) {
    const marca = e.session_id ? marcaDaSessao.get(e.session_id) : undefined;
    if (!marca) continue;
    const m = porMarca.get(marca) ?? { visitas: new Set<string>(), primeira: e.created_at, ultima: e.created_at, rolagem: 0 };
    m.visitas.add(e.session_id!);
    m.ultima = e.created_at;
    const r = /^scroll_(\d+)$/.exec(e.event_name);
    if (r) m.rolagem = Math.max(m.rolagem, Number(r[1]));
    porMarca.set(marca, m);
  }

  const marcas = [...porMarca.entries()]
    .map(([marca, m]) => ({ marca, visitas: m.visitas.size, primeira: m.primeira, ultima: m.ultima, rolou_ate_pct: m.rolagem }))
    .sort((a, b) => b.visitas - a.visitas);

  const resumo = {
    marcas_que_abriram: marcas.filter((m) => m.marca !== "(sem marca)").length,
    visitas: marcas.reduce((s, m) => s + m.visitas, 0),
  };
  return NextResponse.json(detalhado ? { ...resumo, marcas } : resumo, { headers: { "Cache-Control": "no-store" } });
}
