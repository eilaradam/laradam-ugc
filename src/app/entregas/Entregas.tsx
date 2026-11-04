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
        <div className="mt-2 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="grid grid-cols-[76px_104px_1fr] gap-2 border-b border-black/10 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: C.suave }}>
            <span>Dias</span><span>Pendência</span><span>Marca</span>
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
  const esperando = x.tipo.startsWith("espera");
  const e = esperando ? null : etiqueta(x.prazo, hoje);
  const campoPrazo = x.tipo === "roteiro" ? "prazo_roteiro" : "prazo_conteudo";
  const [salvando, setSalvando] = useState(false);
  const fazer = async (c: Record<string, unknown>) => { setSalvando(true); await mudar(x.id, c); setSalvando(false); };

  return (
    <article id={x.id} style={{ background: aberto ? "#FAF9F6" : "#fff" }}>
      {/* linha da planilha: Dias | Pendência | Marca */}
      <button type="button" onClick={() => abrir(aberto ? null : x.id)} className="grid w-full grid-cols-[76px_104px_1fr] items-center gap-2 px-3 py-3 text-left">
        <span className="text-[14px] font-extrabold" style={{ color: e ? (e.fundo === C.rosa ? "#E0307F" : e.txt === "HOJE" ? "#2F8F2F" : e.txt === "sem prazo" ? C.suave : C.preto) : C.suave }}>
          {e ? (e.txt === "HOJE" ? "hoje" : e.txt === "sem prazo" ? "—" : e.txt.replace(/^em /, "")) : x.desde ? `há ${Math.max(0, dias(x.desde, hoje))} d` : "—"}
        </span>
        <span className="text-[13px] font-bold" style={{ color: x.tipo === "roteiro" ? C.roxo : x.tipo === "conteudo" ? C.preto : C.suave }}>
          {x.tipo === "roteiro" ? "Roteiro" : x.tipo === "conteudo" ? "Conteúdo" : x.tipo === "espera_roteiro" ? "Aprov. roteiro" : "Aprov. vídeo"}
        </span>
        <span className="min-w-0 truncate text-[14px] font-semibold">
          {x.destaque ? "⭐ " : ""}{nomeLimpo(x.nome)}
        </span>
      </button>

      {aberto && (
        <div className="border-t border-black/5 px-4 pb-4 pt-3 text-[15px]">
          {x.cliente && <p style={{ color: C.suave }}>{x.cliente}{x.valor ? ` · R$${x.valor}` : ""}</p>}
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
