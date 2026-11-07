"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Item = {
  id: string;
  data: string;
  serie: string | null;
  formato: string | null;
  titulo: string;
  gancho: string | null;
  roteiro: string | null;
  legenda: string | null;
  checklist: { t: string; ok: boolean }[];
  takes_url: string | null;
  status: string;
};

const C = { fundo: "#F2F1ED", roxo: "#6C3CF5", roxoClaro: "#EEE8FE", limao: "#DCFB4E", rosa: "#DB4FA0", preto: "#18181B", suave: "#5B5B66" };
const SERIES: Record<string, { nome: string; cor: string; tinta: string }> = {
  claude: { nome: "Fiz com o Claude", cor: C.roxo, tinta: "#fff" },
  dica: { nome: "Dica completa", cor: C.limao, tinta: C.preto },
  aluna: { nome: "Antes e depois", cor: C.rosa, tinta: "#fff" },
  bastidor: { nome: "Bastidor", cor: C.preto, tinta: "#fff" },
  venda: { nome: "Venda", cor: "#F5B301", tinta: C.preto },
};
const STATUS = ["pendente", "gravado", "editado", "agendado", "postado"];
const NOME_STATUS: Record<string, string> = { pendente: "A fazer", gravado: "Gravado", editado: "Editado", agendado: "Agendado", postado: "Postado" };

const hojeSP = () => new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
const diaBonito = (d: string) =>
  new Date(d + "T12:00:00").toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" }).replace(".", "");

function lerChave(): string {
  if (typeof window === "undefined") return "";
  const daUrl = new URLSearchParams(window.location.search).get("k");
  try {
    if (daUrl) localStorage.setItem("rotina_k", daUrl);
    return daUrl ?? localStorage.getItem("rotina_k") ?? "";
  } catch {
    return daUrl ?? "";
  }
}

export default function Rotina() {
  const [chave, setChave] = useState("");
  const [itens, setItens] = useState<Item[] | null>(null);
  const [erro, setErro] = useState("");
  const [aberto, setAberto] = useState<string | null>(null);

  const carregar = useCallback(async (k: string) => {
    const r = await fetch(`/api/rotina?k=${encodeURIComponent(k)}`);
    if (!r.ok) return setErro("Link sem a chave certa. Abre pelo link que o Claude te mandou.");
    const j = await r.json();
    setItens(j.itens);
  }, []);

  useEffect(() => {
    const k = lerChave();
    const id = window.location.hash.slice(1) || null;
    // a chave e o post aberto vêm da URL, que só existe no navegador
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChave(k);
    setAberto(id);
    if (k) carregar(k);
    else setErro("Link sem a chave certa. Abre pelo link que o Claude te mandou.");
  }, [carregar]);

  const salvar = async (id: string, mudar: Partial<Item>) => {
    setItens((xs) => xs?.map((x) => (x.id === id ? { ...x, ...mudar } : x)) ?? xs);
    await fetch(`/api/rotina?k=${encodeURIComponent(chave)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...mudar }),
    });
  };

  // Excluir some na hora, mas só apaga no banco depois de 5 s: dá tempo de desfazer.
  const [lixo, setLixo] = useState<Item | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const apagarNoBanco = useCallback((id: string) => {
    fetch(`/api/rotina?k=${encodeURIComponent(chave)}&id=${encodeURIComponent(id)}`, { method: "DELETE", keepalive: true });
  }, [chave]);
  const excluir = (x: Item) => {
    if (!confirm(`Excluir "${x.titulo}"?`)) return;
    if (timer.current && lixo) { clearTimeout(timer.current); apagarNoBanco(lixo.id); }
    setItens((xs) => xs?.filter((y) => y.id !== x.id) ?? xs);
    setAberto(null);
    setLixo(x);
    timer.current = setTimeout(() => { apagarNoBanco(x.id); setLixo(null); timer.current = null; }, 5000);
  };
  const desfazer = () => {
    if (!lixo) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    const volta = lixo;
    setItens((xs) => (xs ? [...xs, volta].sort((a, b) => a.data.localeCompare(b.data)) : xs));
    setLixo(null);
  };
  // fechou a página antes dos 5 s: apaga mesmo assim
  useEffect(() => {
    if (!lixo) return;
    const sair = () => apagarNoBanco(lixo.id);
    window.addEventListener("pagehide", sair);
    return () => window.removeEventListener("pagehide", sair);
  }, [lixo, apagarNoBanco]);

  const hoje = hojeSP();
  const { agora, semanas } = useMemo(() => {
    const xs = itens ?? [];
    const agora = xs.filter((x) => x.data <= hoje && x.status !== "postado");
    const futuros = xs.filter((x) => x.data > hoje || (x.data <= hoje && x.status === "postado"));
    const semanas: Record<string, Item[]> = {};
    for (const x of futuros) {
      const d = new Date(x.data + "T12:00:00");
      const seg = new Date(d); seg.setDate(d.getDate() - ((d.getDay() + 6) % 7));
      const chaveSemana = seg.toISOString().slice(0, 10);
      (semanas[chaveSemana] ??= []).push(x);
    }
    return { agora, semanas };
  }, [itens, hoje]);

  const feitos = (itens ?? []).filter((x) => x.status === "postado").length;

  return (
    <main className="min-h-screen pb-16" style={{ background: C.fundo, color: C.preto }}>
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <p className="text-sm font-semibold" style={{ color: C.roxo }}>laradam · rotina de conteúdo</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight">O que tem pra hoje</h1>
        {itens && <p className="mt-1 text-sm" style={{ color: C.suave }}>{feitos} de {itens.length} posts do mês postados</p>}

        {erro && <p className="mt-6 rounded-2xl bg-white p-4 text-sm">{erro}</p>}
        {!itens && !erro && <p className="mt-6 text-sm" style={{ color: C.suave }}>Carregando…</p>}

        {itens && (
          <section className="mt-5">
            {agora.length === 0 ? (
              <p className="rounded-2xl bg-white p-4 text-sm">Nada pendente pra hoje. 🎉</p>
            ) : (
              <div className="flex flex-col gap-3">{agora.map((x) => <Cartao key={x.id} x={x} aberto={aberto === x.id} abrir={setAberto} salvar={salvar} excluir={excluir} atrasado={x.data < hoje} />)}</div>
            )}
          </section>
        )}

        {Object.entries(semanas).map(([seg, xs]) => (
          <section key={seg} className="mt-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em]" style={{ color: C.suave }}>Semana de {diaBonito(seg)}</h2>
            <div className="mt-3 flex flex-col gap-3">{xs.map((x) => <Cartao key={x.id} x={x} aberto={aberto === x.id} abrir={setAberto} salvar={salvar} excluir={excluir} />)}</div>
          </section>
        ))}
      </div>

      {lixo && (
        <div className="fixed inset-x-0 bottom-5 z-10 flex justify-center px-4">
          <div className="flex items-center gap-4 rounded-full py-2.5 pl-5 pr-2.5 text-sm text-white shadow-lg" style={{ background: C.preto }}>
            <span>Post excluído</span>
            <button type="button" onClick={desfazer} className="rounded-full px-3 py-1.5 text-xs font-bold" style={{ background: C.limao, color: C.preto }}>Desfazer</button>
          </div>
        </div>
      )}
    </main>
  );
}

function Legenda({ x, salvar }: { x: Item; salvar: (id: string, m: Partial<Item>) => void }) {
  const [texto, setTexto] = useState(x.legenda ?? "");
  const [copiou, setCopiou] = useState(false);
  const copiar = async () => {
    await navigator.clipboard.writeText(texto);
    setCopiou(true);
    setTimeout(() => setCopiou(false), 2000);
  };
  return (
    <>
      <div className="mt-4 flex items-center justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: C.roxo }}>Legenda</p>
        <button type="button" onClick={copiar} disabled={!texto.trim()} className="rounded-full px-3 py-1.5 text-xs font-bold disabled:opacity-40"
          style={copiou ? { background: C.limao, color: C.preto } : { background: C.roxo, color: "#fff" }}>
          {copiou ? "Copiada ✓" : "Copiar legenda"}
        </button>
      </div>
      <textarea value={texto} rows={Math.max(4, Math.min(12, texto.split("\n").length + 2))} maxLength={2200} placeholder="Escreve a legenda aqui"
        onChange={(e) => setTexto(e.target.value)}
        onBlur={() => { if (texto !== (x.legenda ?? "")) salvar(x.id, { legenda: texto }); }}
        className="mt-1.5 w-full resize-y rounded-xl p-3 text-[16px] leading-relaxed outline-none" style={{ background: C.fundo, color: "#333" }} />
    </>
  );
}

function Cartao({ x, aberto, abrir, salvar, excluir, atrasado }: {
  x: Item; aberto: boolean; abrir: (id: string | null) => void; salvar: (id: string, m: Partial<Item>) => void; excluir: (x: Item) => void; atrasado?: boolean;
}) {
  const s = SERIES[x.serie ?? ""] ?? { nome: x.serie ?? "", cor: "#ddd", tinta: C.preto };
  const postado = x.status === "postado";
  return (
    <article id={x.id} className="rounded-2xl bg-white shadow-sm" style={{ opacity: postado ? 0.55 : 1 }}>
      <button type="button" onClick={() => abrir(aberto ? null : x.id)} className="flex w-full items-start gap-3 p-4 text-left">
        <span className="mt-0.5 w-14 flex-shrink-0 text-xs font-bold leading-tight" style={{ color: atrasado ? C.rosa : C.suave }}>
          {diaBonito(x.data)}{atrasado ? " · atrasado" : ""}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full px-2 py-0.5 text-[11px] font-bold" style={{ background: s.cor, color: s.tinta }}>{s.nome}</span>
            {x.formato && <span className="rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ background: C.fundo }}>{x.formato}</span>}
            <span className="rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ background: postado ? C.limao : C.roxoClaro, color: postado ? C.preto : C.roxo }}>{NOME_STATUS[x.status] ?? x.status}</span>
          </span>
          <span className="mt-1.5 block font-bold leading-snug">{x.titulo}</span>
        </span>
      </button>

      {aberto && (
        <div className="border-t border-black/5 px-4 pb-4 pt-3">
          {x.gancho && (
            <>
              <p className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: C.roxo }}>Gancho</p>
              <p className="mt-1 text-[15px] font-semibold">{x.gancho}</p>
            </>
          )}
          {x.roteiro && (
            <>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em]" style={{ color: C.roxo }}>Roteiro</p>
              <p className="mt-1 whitespace-pre-line text-[15px] leading-relaxed" style={{ color: "#333" }}>{x.roteiro}</p>
            </>
          )}
          <Legenda x={x} salvar={salvar} />
          {x.checklist?.length > 0 && (
            <>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em]" style={{ color: C.roxo }}>Checklist</p>
              <ul className="mt-1.5 flex flex-col gap-1.5">
                {x.checklist.map((c, i) => (
                  <li key={i}>
                    <label className="flex items-start gap-2 text-[15px]">
                      <input type="checkbox" checked={c.ok} className="mt-1 h-4 w-4 accent-[#6C3CF5]"
                        onChange={() => salvar(x.id, { checklist: x.checklist.map((y, j) => (j === i ? { ...y, ok: !y.ok } : y)) })} />
                      <span style={{ textDecoration: c.ok ? "line-through" : "none", color: c.ok ? C.suave : C.preto }}>{c.t}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </>
          )}
          {x.takes_url && (
            <a href={x.takes_url} target="_blank" rel="noreferrer" className="mt-4 inline-block rounded-xl px-3.5 py-2 text-sm font-bold" style={{ background: C.fundo }}>
              📁 Abrir os takes no Drive
            </a>
          )}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {STATUS.map((st) => (
              <button key={st} type="button" onClick={() => salvar(x.id, { status: st })}
                className="rounded-full px-3 py-1.5 text-xs font-bold"
                style={x.status === st ? { background: C.roxo, color: "#fff" } : { background: C.fundo, color: C.preto }}>
                {NOME_STATUS[st]}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => excluir(x)} className="mt-4 text-xs font-bold underline underline-offset-2" style={{ color: C.rosa }}>
            Excluir este post
          </button>
        </div>
      )}
    </article>
  );
}
