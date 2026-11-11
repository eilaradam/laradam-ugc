import { supabaseAdmin } from "@/lib/supabase";
import { str } from "@/lib/guard";

// Pagamentos que ainda não caíram (mesma tabela da aba Conteúdos do admin).
// "Terminei em" = data_aprovacao (o ✅ Aprovação do admin): o dia em que o vídeo foi aprovado pela marca.
// Vence = data_pagamento_prevista, ou terminei + prazo_pagamento ("30dias" → 30).
// Usa a mesma chave da rotina (ROTINA_CHAVE).

const FEITOS = ["aprovado", "postado"];

function autorizado(req: Request) {
  const k = new URL(req.url).searchParams.get("k") ?? req.headers.get("x-rotina");
  return !!process.env.ROTINA_CHAVE && k === process.env.ROTINA_CHAVE;
}

const hojeSP = () => new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
const dias = (de: string, ate: string) => Math.round((Date.parse(ate + "T12:00:00Z") - Date.parse(de + "T12:00:00Z")) / 864e5);
const maisDias = (d: string, n: number) => {
  const t = new Date(d + "T12:00:00Z");
  t.setUTCDate(t.getUTCDate() + n);
  return t.toISOString().slice(0, 10);
};

export async function GET(req: Request) {
  if (!autorizado(req)) return Response.json({ error: "Chave inválida" }, { status: 401 });
  const { data, error } = await supabaseAdmin()
    .from("conteudos")
    .select("id, nome, cliente, status, valor, data_aprovacao, data_postagem, prazo_pagamento, data_pagamento_prevista, nota_fiscal_enviada, observacoes")
    .in("status", FEITOS)
    .neq("status_pagamento", "pago");
  if (error) return Response.json({ error: error.message }, { status: 500 });

  const hoje = hojeSP();
  const itens = (data ?? []).map((c) => {
    const terminei = (c.data_aprovacao as string | null) ?? null;
    const prazoDias = Number(String(c.prazo_pagamento ?? "").match(/\d+/)?.[0] ?? 30);
    const vence = (c.data_pagamento_prevista as string | null) ?? (terminei ? maisDias(terminei, prazoDias) : null);
    return {
      ...c,
      valor: Number(c.valor ?? 0),
      terminei,
      dias: terminei ? Math.max(0, dias(terminei, hoje)) : null,
      prazo_dias: prazoDias,
      vence,
      atrasado: !!vence && vence < hoje,
    };
  }).sort((a, b) => (b.dias ?? -1) - (a.dias ?? -1));

  if (new URL(req.url).searchParams.get("widget")) {
    const comValor = itens.filter((i) => i.valor > 0);
    return Response.json({
      total: comValor.reduce((s, i) => s + i.valor, 0),
      atrasados: comValor.filter((i) => i.atrasado).length,
      total_atrasado: comValor.filter((i) => i.atrasado).reduce((s, i) => s + i.valor, 0),
      sem_data: comValor.filter((i) => !i.terminei).length,
      itens: comValor.map(({ id, nome, valor, dias, vence, atrasado }) => ({ id, nome, valor, dias, vence, atrasado })),
    });
  }
  return Response.json({ itens, hoje });
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
  const ehData = (v: unknown) => v === null || (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v));
  const mudar: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (body.acao === "recebi") {
    mudar.status_pagamento = "pago";
    mudar.data_pagamento = ehData(body.data_pagamento) && body.data_pagamento ? body.data_pagamento : hojeSP();
  }
  if ("terminei" in body && ehData(body.terminei)) mudar.data_aprovacao = body.terminei;
  if ("data_pagamento_prevista" in body && ehData(body.data_pagamento_prevista)) mudar.data_pagamento_prevista = body.data_pagamento_prevista;
  const { data: item, error } = await supabaseAdmin().from("conteudos").update(mudar).eq("id", id).select("id").maybeSingle();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ item });
}
