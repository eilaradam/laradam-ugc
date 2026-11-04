"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Item = {
  id: string;
  nome: string;
  cliente: string | null;
  status: string;
  tipo: "roteiro" | "conteudo" | "espera_roteiro" | "espera_video";
  prazo: string | null;
  desde: string | null;
  aprovada_em: string | null;
  roteiro_aprovado_em: string | null;
  valor: number | null;
  destaque: boolean | null;
  observacoes: string | null;
  roteiro_url: string | null;
  etapa_si: string | null;
};

const C = { fundo: "#F2F1ED", roxo: "#6C3CF5", roxoClaro: "#EEE8FE", limao: "#DCFB4E", rosa: "#FF4FA3", preto: "#18181B", suave: "#5B5B66" };
const TIPO: Record<string, { nome: string; cor: string; tinta: string }> = {
  roteiro: { nome: "Roteiro", cor: C.roxo, tinta: "#fff" },
  conteudo: { nome: "Conteúdo", cor: C.preto, tinta: "#fff" },
  espera_roteiro: { nome: "Marca aprovando roteiro", cor: C.roxoClaro, tinta: C.roxo },
  espera_video: { nome: "Marca aprovando vídeo", cor: C.roxoClaro, tinta: C.roxo },
};

const hojeSP = () => new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
const dias = (de: string, ate: string) => Math.round((Date.parse(ate + "T12:00:00Z") - Date.parse(de + "T12:00:00Z")) / 864e5);
const dataBonita = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" }).replace(".", "");
const nomeLimpo = (n: string) => n.replace(/\s+/g, " ").trim();

function etiqueta(prazo: string | null, hoje: string) {
  if (!prazo) return { txt: "sem prazo", fundo: "#E4E2DC", letra: C.suave };
  const n = dias(hoje, prazo);
  if (n === 0) return { txt: "HOJE", fundo: C.limao, letra: C.preto };
  if (n > 0) return { txt: `em ${n} ${n === 1 ? "dia" : "dias"}`, fundo: "#fff", letra: C.roxo };
  return { txt: `${n} ${n === -1 ? "dia" : "dias"}`, fundo: C.rosa, letra: "#fff" };
}

function lerChave(): string {
  const daUrl = new URLSearchParams(window.location.search).get("k");
  try {
    if (daUrl) localStorage.setItem("rotina_k", daUrl);
    return daUrl ?? localStorage.getItem("rotina_k") ?? "";
  } catch {
    return daUrl ?? "";
  }
}

export default function Entregas() {
  const [chave, setChave] = useState("");
  const [itens, setItens] = useState<Item[] | null>(null);
  const [erro, setErro] = useState("");
  const [aberto, setAberto] = useState<string | null>(null);

  const carregar = useCallback(async (k: string) => {
    const r = await fetch(`/api/entregas?k=${encodeURIComponent(k)}`);
    if (!r.ok) return setErro("Link sem a chave certa. Abre pelo link que o Claude te mandou.");
    setItens((await r.json()).itens);
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
    await fetch(`/api/entregas?k=${encodeURIComponent(chave)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...corpo }),
    });
    await carregar(chave);
  };

  const hoje = hojeSP();
  const grupos = useMemo(() => {
    const xs = itens ?? [];
    const fazer = xs.filter((x) => x.tipo === "roteiro" || x.tipo === "conteudo");
    const porPrazo = (a: Item, b: Item) => (a.prazo ?? "9999").localeCompare(b.prazo ?? "9999");
    return {
      atrasadas: fazer.filter((x) => x.prazo && x.prazo < hoje).sort(porPrazo),
      hoje: fazer.filter((x) => x.prazo === hoje),
      proximas: fazer.filter((x) => x.prazo && x.prazo > hoje).sort(porPrazo),
      semPrazo: fazer.filter((x) => !x.prazo),
      esperando: xs.filter((x) => x.tipo === "espera_roteiro" || x.tipo === "espera_video").sort((a, b) => (a.desde ?? "").localeCompare(b.desde ?? "")),
    };
  }, [itens, hoje]);

  const total = (itens ?? []).filter((x) => x.tipo === "roteiro" || x.tipo === "conteudo").length;

  const secao = (titulo: string, xs: Item[], cor = C.suave) =>
    xs.length > 0 && (
      <section className="mt-7">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em]" style={{ color: cor }}>{titulo} · {xs.length}</h2>
        <div className="mt-3 flex flex-col gap-3">
          {xs.map((x) => <Cartao key={x.id} x={x} hoje={hoje} aberto={aberto === x.id} abrir={setAberto} mudar={mudar} />)}
        </div>
      </section>
    );

  return (
    <main className="min-h-screen pb-16" style={{ background: C.fundo, color: C.preto }}>
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <p className="text-sm font-semibold" style={{ color: C.roxo }}>laradam · entregas das marcas</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight">O que eu tenho que entregar</h1>
        {itens && (
          <p className="mt-1 text-sm" style={{ color: C.suave }}>
            {total} entregas abertas · {grupos.atrasadas.length} atrasadas · {grupos.esperando.length} com a marca
          </p>
        )}
        {erro && <p className="mt-6 rounded-2xl bg-white p-4 text-sm">{erro}</p>}
        {!itens && !erro && <p className="mt-6 text-sm" style={{ color: C.suave }}>Carregando…</p>}

        {secao("Atrasadas", grupos.atrasadas, C.rosa)}
        {secao("Vence hoje", grupos.hoje, C.preto)}
        {secao("Próximas", grupos.proximas)}
        {secao("Sem prazo: define a data", grupos.semPrazo)}
        {secao("Com a marca (esperando aprovação)", grupos.esperando)}
      </div>
    </main>
  );
}

function Cartao({ x, hoje, aberto, abrir, mudar }: {
  x: Item; hoje: string; aberto: boolean; abrir: (id: string | null) => void; mudar: (id: string, c: Record<string, unknown>) => Promise<void>;
}) {
  const t = TIPO[x.tipo];
  const esperando = x.tipo.startsWith("espera");
  const e = esperando ? null : etiqueta(x.prazo, hoje);
  const campoPrazo = x.tipo === "roteiro" ? "prazo_roteiro" : "prazo_conteudo";
  const [salvando, setSalvando] = useState(false);
  const fazer = async (c: Record<string, unknown>) => { setSalvando(true); await mudar(x.id, c); setSalvando(false); };

  return (
    <article id={x.id} className="rounded-2xl bg-white shadow-sm">
      <button type="button" onClick={() => abrir(aberto ? null : x.id)} className="flex w-full items-center gap-3 p-4 text-left">
        {e ? (
          <span className="flex h-8 w-[78px] flex-shrink-0 items-center justify-center rounded-lg text-[13px] font-black" style={{ background: e.fundo, color: e.letra, border: e.fundo === "#fff" ? `1.5px solid ${C.roxoClaro}` : "none" }}>
            {e.txt}
          </span>
        ) : (
          <span className="flex h-8 w-[78px] flex-shrink-0 items-center justify-center rounded-lg text-[12px] font-bold" style={{ background: C.fundo, color: C.suave }}>
            {x.desde ? `há ${Math.max(0, dias(x.desde, hoje))}d` : "—"}
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="rounded-full px-2 py-0.5 text-[11px] font-bold" style={{ background: t.cor, color: t.tinta }}>{t.nome}</span>
          {x.destaque ? <span className="ml-1 text-[12px]">⭐</span> : null}
          <span className="mt-1 block font-bold leading-snug">{nomeLimpo(x.nome)}</span>
          {x.cliente && <span className="block text-xs" style={{ color: C.suave }}>{x.cliente}{x.valor ? ` · R$${x.valor}` : ""}</span>}
        </span>
      </button>

      {aberto && (
        <div className="border-t border-black/5 px-4 pb-4 pt-3 text-[15px]">
          {x.prazo && !esperando && <p>Prazo: <b>{dataBonita(x.prazo)}</b></p>}
          {x.aprovada_em && <p style={{ color: C.suave }}>Campanha aprovada em {dataBonita(x.aprovada_em)}</p>}
          {x.roteiro_aprovado_em && <p style={{ color: C.suave }}>Roteiro aprovado em {dataBonita(x.roteiro_aprovado_em)}</p>}
          {x.etapa_si && <p style={{ color: C.suave }}>Na Seu Influencer: {x.etapa_si}</p>}
          {x.observacoes && <p className="mt-2 whitespace-pre-line rounded-xl p-3 text-sm" style={{ background: C.fundo }}>{x.observacoes}</p>}
          {x.roteiro_url && <a href={x.roteiro_url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-bold" style={{ color: C.roxo }}>Abrir o roteiro →</a>}

          {!esperando && (
            <label className="mt-3 flex items-center gap-2 text-sm">
              <span style={{ color: C.suave }}>Mudar prazo:</span>
              <input type="date" defaultValue={x.prazo ?? ""} className="rounded-lg border border-black/10 px-2 py-1"
                onChange={(ev) => ev.target.value && fazer({ [campoPrazo]: ev.target.value })} />
            </label>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" disabled={salvando} onClick={() => fazer({ acao: "avancar" })}
              className="rounded-xl px-4 py-2.5 text-sm font-bold disabled:opacity-50" style={{ background: C.roxo, color: "#fff" }}>
              {x.tipo === "roteiro" ? "✓ Entreguei o roteiro" : x.tipo === "conteudo" ? "✓ Entreguei o conteúdo" : x.tipo === "espera_roteiro" ? "✓ Marca aprovou o roteiro" : "✓ Marca aprovou o vídeo"}
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
