"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Item = {
  id: string;
  nome: string;
  cliente: string | null;
  status: string;
  valor: number;
  terminei: string | null;
  dias: number | null;
  prazo_dias: number;
  vence: string | null;
  atrasado: boolean;
  data_postagem: string | null;
  nota_fiscal_enviada: boolean | null;
  observacoes: string | null;
};

const C = { fundo: "#F2F1ED", roxo: "#6C3CF5", limao: "#DCFB4E", rosa: "#E0307F", preto: "#18181B", suave: "#5B5B66", verde: "#2F8F2F" };

const diasEntre = (de: string, ate: string) => Math.round((Date.parse(ate + "T12:00:00Z") - Date.parse(de + "T12:00:00Z")) / 864e5);
const dataBonita = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" });
const nomeLimpo = (n: string) => n.replace(/\s+/g, " ").trim();
const reais = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: v % 1 ? 2 : 0 });

function lerChave(): string {
  const daUrl = new URLSearchParams(window.location.search).get("k");
  try {
    if (daUrl) localStorage.setItem("rotina_k", daUrl);
    return daUrl ?? localStorage.getItem("rotina_k") ?? "";
  } catch {
    return daUrl ?? "";
  }
}

export default function Pagamentos() {
  const [chave, setChave] = useState("");
  const [itens, setItens] = useState<Item[] | null>(null);
  const [hoje, setHoje] = useState("");
  const [erro, setErro] = useState("");
  const [aberto, setAberto] = useState<string | null>(null);

  const carregar = useCallback(async (k: string) => {
    const r = await fetch(`/api/pagamentos?k=${encodeURIComponent(k)}`);
    if (!r.ok) return setErro("Link sem a chave certa. Abre pelo link que o Claude te mandou.");
    const j = await r.json();
    setItens(j.itens);
    setHoje(j.hoje);
  }, []);

  useEffect(() => {
    const k = lerChave();
    // a chave e o card aberto vêm da URL, que só existe no navegador
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChave(k);
    setAberto(window.location.hash.slice(1) || null);
    if (k) carregar(k);
    else setErro("Link sem a chave certa. Abre pelo link que o Claude te mandou.");
  }, [carregar]);

  const mudar = async (id: string, corpo: Record<string, unknown>) => {
    await fetch(`/api/pagamentos?k=${encodeURIComponent(chave)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...corpo }),
    });
    await carregar(chave);
  };

  const g = useMemo(() => {
    const xs = itens ?? [];
    const comValor = xs.filter((x) => x.valor > 0);
    return {
      atrasados: comValor.filter((x) => x.atrasado),
      noPrazo: comValor.filter((x) => x.terminei && !x.atrasado),
      semData: comValor.filter((x) => !x.terminei),
      semValor: xs.filter((x) => x.valor <= 0),
      total: comValor.reduce((s, x) => s + x.valor, 0),
      totalAtrasado: comValor.filter((x) => x.atrasado).reduce((s, x) => s + x.valor, 0),
    };
  }, [itens]);

  const secao = (titulo: string, xs: Item[], cor = C.suave) =>
    xs.length > 0 && (
      <section className="mt-7">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em]" style={{ color: cor }}>{titulo} · {xs.length}</h2>
        <div className="mt-2 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="grid grid-cols-[64px_1fr_92px] gap-2 border-b border-black/10 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: C.suave }}>
            <span>Dias</span><span>Marca</span><span className="text-right">Valor</span>
          </div>
          <div className="divide-y divide-black/5">
            {xs.map((x) => <Cartao key={x.id} x={x} hoje={hoje} aberto={aberto === x.id} abrir={setAberto} mudar={mudar} />)}
          </div>
        </div>
      </section>
    );

  return (
    <main className="min-h-screen pb-16" style={{ background: C.fundo, color: C.preto }}>
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <p className="text-sm font-semibold" style={{ color: C.roxo }}>laradam · pagamentos das marcas</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight">O que ainda não caiu</h1>
        {itens && (
          <p className="mt-1 text-sm" style={{ color: C.suave }}>
            <b style={{ color: C.preto }}>{reais(g.total)}</b> a receber · {g.atrasados.length} atrasados{g.totalAtrasado ? ` (${reais(g.totalAtrasado)})` : ""}
          </p>
        )}
        <p className="mt-1 text-xs" style={{ color: C.suave }}>Dias = desde que a marca aprovou o vídeo. Fica rosa quando passou do prazo de pagamento.</p>
        {erro && <p className="mt-6 rounded-2xl bg-white p-4 text-sm">{erro}</p>}
        {!itens && !erro && <p className="mt-6 text-sm" style={{ color: C.suave }}>Carregando…</p>}

        {secao("Passou do prazo", g.atrasados, C.rosa)}
        {secao("Sem data: marca quando terminou", g.semData, C.roxo)}
        {secao("Dentro do prazo", g.noPrazo)}
        {secao("Sem valor no admin", g.semValor)}
        {itens && itens.length === 0 && <p className="mt-6 rounded-2xl bg-white p-4 text-sm">Tudo recebido 💚</p>}
      </div>
    </main>
  );
}

function Cartao({ x, hoje, aberto, abrir, mudar }: {
  x: Item; hoje: string; aberto: boolean; abrir: (id: string | null) => void; mudar: (id: string, c: Record<string, unknown>) => Promise<void>;
}) {
  const [salvando, setSalvando] = useState(false);
  const fazer = async (c: Record<string, unknown>) => { setSalvando(true); await mudar(x.id, c); setSalvando(false); };
  const faltam = x.vence && hoje ? diasEntre(hoje, x.vence) : null;

  return (
    <article id={x.id} style={{ background: aberto ? "#FAF9F6" : "#fff" }}>
      <button type="button" onClick={() => abrir(aberto ? null : x.id)} className="grid w-full grid-cols-[64px_1fr_92px] items-center gap-2 px-3 py-3 text-left">
        <span className="text-[15px] font-extrabold" style={{ color: x.dias === null ? C.suave : x.atrasado ? C.rosa : C.preto }}>
          {x.dias === null ? "—" : `${x.dias} d`}
        </span>
        <span className="min-w-0 truncate text-[14px] font-semibold">{nomeLimpo(x.nome)}</span>
        <span className="text-right text-[14px] font-bold">{x.valor > 0 ? reais(x.valor) : "—"}</span>
      </button>

      {aberto && (
        <div className="border-t border-black/5 px-4 pb-4 pt-3 text-[15px]">
          {x.cliente && <p style={{ color: C.suave }}>{x.cliente}</p>}
          {x.terminei && <p>Terminei em <b>{dataBonita(x.terminei)}</b> · faz {x.dias} {x.dias === 1 ? "dia" : "dias"}</p>}
          {x.vence && faltam !== null && (
            <p style={{ color: x.atrasado ? C.rosa : C.suave }}>
              Prazo de {x.prazo_dias} dias: {faltam < 0 ? `venceu há ${-faltam} ${faltam === -1 ? "dia" : "dias"}` : faltam === 0 ? "vence hoje" : `vence em ${faltam} ${faltam === 1 ? "dia" : "dias"}`} ({dataBonita(x.vence)})
            </p>
          )}
          {x.nota_fiscal_enviada === false && <p style={{ color: C.suave }}>Nota fiscal: ainda não marquei como enviada</p>}
          {x.observacoes && <p className="mt-2 whitespace-pre-line rounded-xl p-3 text-sm" style={{ background: C.fundo }}>{x.observacoes}</p>}

          <label className="mt-3 flex items-center gap-2 text-sm">
            <span style={{ color: C.suave }}>Terminei em:</span>
            <input type="date" defaultValue={x.terminei ?? ""} max={hoje} className="rounded-lg border border-black/10 px-2 py-1"
              onChange={(ev) => ev.target.value && fazer({ terminei: ev.target.value })} />
          </label>

          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" disabled={salvando} onClick={() => fazer({ acao: "recebi" })}
              className="rounded-xl px-4 py-2.5 text-sm font-bold disabled:opacity-50" style={{ background: C.verde, color: "#fff" }}>
              💚 Recebi hoje
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
