"use client";

import { useMemo, useState } from "react";
import { C, diaBonito, hojeSP, isoDe, segundaDe, tipoDoFormato, type Ideia, type Item, type Marco, type Plano } from "./comum";

// Aba Plano: o passo a passo do planejamento (narrativa, calendário, tema do mês, frequência e folga)
// e aba Ideias: o mesmo Banco de Ideias do admin, com botão pra mandar a ideia pra pauta.

const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const SEMANAS_META = 8; // 2 meses de folga

const rotulo = "text-xs font-bold uppercase tracking-[0.14em]";
const campo = "mt-1 w-full rounded-xl p-3 text-[16px] leading-snug outline-none";

/** As semanas de agora até 2 meses pra frente, com quantos Reels e carrosséis cada uma já tem. */
export function semanasDaPauta(itens: Item[], plano: Plano) {
  const meta = plano.frequencia.reels + plano.frequencia.carrossel;
  const seg0 = new Date(segundaDe(hojeSP()) + "T12:00:00");
  const semanas = Array.from({ length: SEMANAS_META + 1 }, (_, i) => {
    const d = new Date(seg0);
    d.setDate(d.getDate() + i * 7);
    const inicio = isoDe(d);
    const fimD = new Date(d);
    fimD.setDate(fimD.getDate() + 6);
    const fim = isoDe(fimD);
    const xs = itens.filter((x) => x.data >= inicio && x.data <= fim);
    const reels = xs.filter((x) => tipoDoFormato(x.formato) === "reels").length;
    const carrossel = xs.filter((x) => tipoDoFormato(x.formato) === "carrossel").length;
    return { inicio, total: xs.length, reels, carrossel, ok: meta > 0 && xs.length >= meta };
  });
  // a folga conta da semana que vem em diante: a semana atual já está em andamento
  let prontas = 0;
  for (const s of semanas.slice(1)) {
    if (!s.ok) break;
    prontas++;
  }
  const pautaAte = itens.reduce((m, x) => (x.data > m ? x.data : m), "");
  return { semanas, prontas, pautaAte, meta };
}

export function PlanoAba({ itens, plano, mudar }: { itens: Item[]; plano: Plano; mudar: (p: Plano) => void }) {
  const { semanas, prontas, pautaAte, meta } = useMemo(() => semanasDaPauta(itens, plano), [itens, plano]);
  const faltam = Math.max(0, SEMANAS_META - prontas);

  return (
    <div className="mt-5 flex flex-col gap-4">
      {/* Folga */}
      <section className="rounded-2xl p-4" style={{ background: C.preto, color: "#fff" }}>
        <p className={rotulo} style={{ color: C.limao }}>Folga</p>
        <p className="mt-1 text-2xl font-extrabold leading-tight">
          {pautaAte ? <>Pauta pronta até {diaBonito(pautaAte)}</> : "Pauta vazia"}
        </p>
        <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,.75)" }}>
          {prontas} de {SEMANAS_META} semanas completas.{" "}
          {faltam === 0 ? "Você tem 2 meses de folga 🎉" : `Faltam ${faltam} pra ter 2 meses de folga.`}
        </p>
        <div className="mt-3 flex gap-1">
          {Array.from({ length: SEMANAS_META }, (_, i) => (
            <span key={i} className="h-2 flex-1 rounded-full" style={{ background: i < prontas ? C.limao : "rgba(255,255,255,.18)" }} />
          ))}
        </div>
      </section>

      {/* Frequência */}
      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <p className={rotulo} style={{ color: C.roxo }}>Frequência por semana</p>
        <div className="mt-2 grid grid-cols-1 gap-2 text-[15px]">
          <div className="flex items-center justify-between gap-2 rounded-xl p-2 pl-3" style={{ background: C.fundo }}>
            <span className="font-semibold">Reels</span>
            <Contador valor={plano.frequencia.reels} mudar={(n) => mudar({ ...plano, frequencia: { ...plano.frequencia, reels: n } })} />
          </div>
          <div className="flex items-center justify-between gap-2 rounded-xl p-2 pl-3" style={{ background: C.fundo }}>
            <span className="font-semibold">Carrosséis</span>
            <Contador valor={plano.frequencia.carrossel} mudar={(n) => mudar({ ...plano, frequencia: { ...plano.frequencia, carrossel: n } })} />
          </div>
        </div>
        <p className="mt-2 text-sm font-bold">{meta} posts por semana</p>
        <p className="mt-1 text-xs" style={{ color: C.suave }}>Uma que dê pra cumprir. Em semana de campanha ou data especial, você posta mais.</p>
        <ul className="mt-3 flex flex-col gap-1.5">
          {semanas.map((s) => (
            <li key={s.inicio} className="flex items-center gap-2 text-sm">
              <span className="w-20 flex-shrink-0 font-semibold" style={{ color: C.suave }}>{diaBonito(s.inicio).replace(/^\w+,? /, "")}</span>
              <span className="flex flex-1 gap-1">
                {Array.from({ length: Math.max(meta, s.total) }, (_, i) => (
                  <span key={i} className="h-5 flex-1 rounded-md" style={{ background: i < s.total ? (i < meta ? C.roxo : C.rosa) : C.fundo }} />
                ))}
              </span>
              <span className="w-24 flex-shrink-0 text-right text-xs font-bold" style={{ color: s.ok ? C.roxo : C.rosa }}>
                {s.ok ? `${s.reels}R · ${s.carrossel}C ✓` : `falta ${meta - s.total}`}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <Narrativa plano={plano} mudar={mudar} />
      <Calendario plano={plano} mudar={mudar} />
    </div>
  );
}

function Contador({ valor, mudar }: { valor: number; mudar: (n: number) => void }) {
  const b = "h-8 w-8 rounded-full text-lg font-bold leading-none";
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white p-0.5">
      <button type="button" aria-label="Menos" className={b} style={{ background: C.fundo }} onClick={() => mudar(Math.max(0, valor - 1))}>−</button>
      <b className="w-5 text-center">{valor}</b>
      <button type="button" aria-label="Mais" className={b} style={{ background: C.fundo }} onClick={() => mudar(Math.min(14, valor + 1))}>+</button>
    </span>
  );
}

const CAMPOS_NARRATIVA: { k: keyof Plano["narrativa"]; nome: string; dica: string }[] = [
  { k: "quem", nome: "Quem eu sou", dica: "O que você faz, em uma ou duas frases" },
  { k: "praQuem", nome: "Pra quem eu falo", dica: "Quem você quer atrair" },
  { k: "vende", nome: "O que eu vendo", dica: "Seus produtos agora" },
  { k: "quer", nome: "O que essa pessoa quer", dica: "" },
  { k: "trava", nome: "O que trava ela", dica: "" },
  { k: "pesquisa", nome: "O que ela pesquisa", dica: "" },
];

function Narrativa({ plano, mudar }: { plano: Plano; mudar: (p: Plano) => void }) {
  const [aberta, setAberta] = useState(false);
  const n = plano.narrativa;
  return (
    <section className="rounded-2xl bg-white shadow-sm">
      <button type="button" onClick={() => setAberta(!aberta)} className="flex w-full items-start gap-3 p-4 text-left">
        <span className="min-w-0 flex-1">
          <span className={rotulo + " block"} style={{ color: C.roxo }}>Narrativa</span>
          <span className="mt-1 block text-[15px] font-semibold leading-snug">{n.quem || "Conta quem você é, pra quem fala e o que vende"}</span>
        </span>
        <span className="text-xs font-bold" style={{ color: C.roxo }}>{aberta ? "Fechar" : "Ver"}</span>
      </button>
      {aberta && (
        <div className="border-t border-black/5 px-4 pb-4 pt-2">
          {CAMPOS_NARRATIVA.map((c) => (
            <TextoSalvo key={c.k} nome={c.nome} dica={c.dica} valor={n[c.k]}
              salvar={(v) => mudar({ ...plano, narrativa: { ...n, [c.k]: v } })} />
          ))}
          <p className="mt-3 text-xs" style={{ color: C.suave }}>É a partir disso que o Claude monta os temas e as ideias.</p>
        </div>
      )}
    </section>
  );
}

function TextoSalvo({ nome, dica, valor, salvar }: { nome: string; dica?: string; valor: string; salvar: (v: string) => void }) {
  const [v, setV] = useState(valor);
  return (
    <label className="mt-3 block">
      <span className="text-sm font-bold">{nome}</span>
      <textarea value={v} rows={Math.max(2, Math.min(8, Math.ceil(v.length / 32)))} placeholder={dica}
        onChange={(e) => setV(e.target.value)} onBlur={() => { if (v !== valor) salvar(v); }}
        className={campo + " resize-y"} style={{ background: C.fundo }} />
    </label>
  );
}

/** 12 meses a partir do mês atual. */
function proximosMeses() {
  const [a, m] = hojeSP().split("-").map(Number);
  return Array.from({ length: 12 }, (_, i) => {
    const mes = (m - 1 + i) % 12;
    const ano = a + Math.floor((m - 1 + i) / 12);
    return { chave: `${ano}-${String(mes + 1).padStart(2, "0")}`, nome: MESES[mes], ano };
  });
}

function Calendario({ plano, mudar }: { plano: Plano; mudar: (p: Plano) => void }) {
  const meses = useMemo(() => proximosMeses(), []);
  const [sel, setSel] = useState<string | null>(null);
  const doMes = (k: string) => plano.meses[k] ?? { tema: "", marcos: [] };
  const mudarMes = (k: string, m: { tema: string; marcos: Marco[] }) => mudar({ ...plano, meses: { ...plano.meses, [k]: m } });

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm">
      <p className={rotulo} style={{ color: C.roxo }}>Calendário e tema do mês</p>
      <p className="mt-1 text-xs" style={{ color: C.suave }}>Amarelo é mês de campanha ou lançamento. Toca no mês pra ver e mudar o tema.</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {meses.map(({ chave, nome, ano }) => {
          const m = doMes(chave);
          const campanha = m.marcos.some((x) => x.tipo === "campanha");
          const ativo = sel === chave;
          return (
            <button key={chave} type="button" onClick={() => setSel(ativo ? null : chave)}
              className="flex min-h-[92px] flex-col items-start rounded-xl p-2.5 text-left"
              style={{ background: campanha ? C.limao : C.preto, color: campanha ? C.preto : "#fff", outline: ativo ? `3px solid ${C.roxo}` : "none", outlineOffset: 2 }}>
              <span className="text-sm font-extrabold uppercase">{nome}{ano !== meses[0].ano ? <span className="ml-1 text-[10px] font-bold opacity-60">{String(ano).slice(2)}</span> : null}</span>
              <span className="mt-auto flex w-full min-w-0 flex-col items-start gap-1">
                {m.marcos.slice(0, 2).map((x, i) => (
                  <span key={i} className="max-w-full truncate rounded px-1.5 py-0.5 text-[10.5px] font-bold"
                    style={x.tipo === "campanha" ? { background: C.preto, color: C.limao } : { background: C.limao, color: C.preto }}>{x.t}</span>
                ))}
                {m.marcos.length > 2 && <span className="text-[10px] font-bold opacity-70">+{m.marcos.length - 2}</span>}
              </span>
            </button>
          );
        })}
      </div>
      {sel && <EditorMes key={sel} nome={`${meses.find((x) => x.chave === sel)?.nome} ${sel.slice(0, 4)}`} mes={doMes(sel)} salvar={(m) => mudarMes(sel, m)} />}
    </section>
  );
}

function EditorMes({ nome, mes, salvar }: { nome: string; mes: { tema: string; marcos: Marco[] }; salvar: (m: { tema: string; marcos: Marco[] }) => void }) {
  const [novo, setNovo] = useState("");
  const [tipo, setTipo] = useState<Marco["tipo"]>("data");
  const add = () => {
    const t = novo.trim();
    if (!t) return;
    salvar({ ...mes, marcos: [...mes.marcos, { t, tipo }] });
    setNovo("");
  };
  return (
    <div className="mt-4 rounded-xl p-3" style={{ background: C.fundo }}>
      <p className="text-lg font-extrabold capitalize">{nome}</p>
      <TextoSalvo nome="Tema do mês" dica="O assunto principal do mês, não o post" valor={mes.tema} salvar={(v) => salvar({ ...mes, tema: v })} />
      <p className="mt-3 text-sm font-bold">Datas e campanhas</p>
      <ul className="mt-1.5 flex flex-col gap-1.5">
        {mes.marcos.map((x, i) => (
          <li key={i} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-[15px]">
            <span className="rounded px-1.5 py-0.5 text-[10.5px] font-bold" style={x.tipo === "campanha" ? { background: C.preto, color: C.limao } : { background: C.limao, color: C.preto }}>
              {x.tipo === "campanha" ? "campanha" : "data"}
            </span>
            <span className="min-w-0 flex-1">{x.t}</span>
            <button type="button" aria-label={`Tirar ${x.t}`} className="px-1 text-lg leading-none" style={{ color: C.suave }}
              onClick={() => salvar({ ...mes, marcos: mes.marcos.filter((_, j) => j !== i) })}>×</button>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex gap-1.5">
        <input value={novo} onChange={(e) => setNovo(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Ex.: Dia das Mães" className="min-w-0 flex-1 rounded-lg bg-white px-3 py-2 text-[16px] outline-none" />
        <button type="button" onClick={() => setTipo(tipo === "data" ? "campanha" : "data")} className="rounded-lg px-2.5 text-xs font-bold"
          style={tipo === "campanha" ? { background: C.preto, color: C.limao } : { background: C.limao, color: C.preto }}>{tipo}</button>
        <button type="button" onClick={add} className="rounded-lg px-3 text-sm font-bold text-white" style={{ background: C.roxo }}>Pôr</button>
      </div>
    </div>
  );
}

/* ───────────── Ideias ───────────── */

const FORMATOS = ["Reel", "Carrossel", "Story"];

/** Primeiro dia útil a partir de amanhã que ainda não tem post. */
function proximoDiaLivre(itens: Item[]) {
  const ocupados = new Set(itens.map((x) => x.data));
  const d = new Date(hojeSP() + "T12:00:00");
  for (let i = 0; i < 120; i++) {
    d.setDate(d.getDate() + 1);
    const iso = isoDe(d);
    if (d.getDay() !== 0 && d.getDay() !== 6 && !ocupados.has(iso)) return iso;
  }
  return isoDe(d);
}

export function IdeiasAba({ ideias, itens, criar, mudarStatus, pautar }: {
  ideias: Ideia[];
  itens: Item[];
  criar: (i: { titulo: string; formato: string; tags: string[] }) => Promise<void>;
  mudarStatus: (id: string, status: string) => void;
  pautar: (id: string, data: string) => Promise<boolean>;
}) {
  const [filtro, setFiltro] = useState<string>("todas");
  const [aberta, setAberta] = useState<string | null>(null);
  const tags = useMemo(() => Array.from(new Set(ideias.flatMap((i) => i.tags ?? []))).sort(), [ideias]);
  const lista = ideias.filter((i) =>
    filtro === "todas" ? true : filtro === "gravar" ? i.status === "gravar" : FORMATOS.includes(filtro) ? i.formato === filtro : (i.tags ?? []).includes(filtro));
  const chips = ["todas", "gravar", ...FORMATOS.filter((f) => ideias.some((i) => i.formato === f)), ...tags];

  return (
    <div className="mt-5">
      <NovaIdeia criar={criar} />
      <div className="-mx-4 mt-4 flex gap-1.5 overflow-x-auto px-4 pb-1">
        {chips.map((c) => (
          <button key={c} type="button" onClick={() => setFiltro(c)} className="flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-bold"
            style={filtro === c ? { background: C.roxo, color: "#fff" } : { background: "#fff", color: C.preto }}>
            {c === "todas" ? `Todas · ${ideias.length}` : c === "gravar" ? "🎬 Pra gravar" : c}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-col gap-2.5">
        {lista.length === 0 && <p className="rounded-2xl bg-white p-4 text-sm">Nenhuma ideia aqui ainda.</p>}
        {lista.map((i) => (
          <CartaoIdeia key={i.id} i={i} aberta={aberta === i.id} abrir={() => setAberta(aberta === i.id ? null : i.id)}
            sugestao={proximoDiaLivre(itens)} mudarStatus={mudarStatus} pautar={pautar} />
        ))}
      </div>
    </div>
  );
}

function NovaIdeia({ criar }: { criar: (i: { titulo: string; formato: string; tags: string[] }) => Promise<void> }) {
  const [titulo, setTitulo] = useState("");
  const [formato, setFormato] = useState("Reel");
  const [tag, setTag] = useState("");
  const [indo, setIndo] = useState(false);
  const enviar = async () => {
    if (!titulo.trim() || indo) return;
    setIndo(true);
    await criar({ titulo: titulo.trim(), formato, tags: tag.trim() ? [tag.trim().toLowerCase()] : [] });
    setTitulo(""); setTag(""); setIndo(false);
  };
  return (
    <div className="rounded-2xl bg-white p-3 shadow-sm">
      <input value={titulo} onChange={(e) => setTitulo(e.target.value)} onKeyDown={(e) => e.key === "Enter" && enviar()}
        placeholder="Anota uma ideia…" className="w-full rounded-xl px-3 py-2.5 text-[16px] outline-none" style={{ background: C.fundo }} />
      <div className="mt-2 flex gap-1.5">
        {FORMATOS.map((f) => (
          <button key={f} type="button" onClick={() => setFormato(f)} className="rounded-full px-2.5 py-1.5 text-xs font-bold"
            style={formato === f ? { background: C.preto, color: "#fff" } : { background: C.fundo }}>{f}</button>
        ))}
        <input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="tema" className="min-w-0 flex-1 rounded-full px-3 text-[16px] outline-none" style={{ background: C.fundo }} />
        <button type="button" onClick={enviar} disabled={!titulo.trim() || indo} className="rounded-full px-3.5 text-xs font-bold text-white disabled:opacity-40" style={{ background: C.roxo }}>
          Guardar
        </button>
      </div>
    </div>
  );
}

function CartaoIdeia({ i, aberta, abrir, sugestao, mudarStatus, pautar }: {
  i: Ideia; aberta: boolean; abrir: () => void; sugestao: string;
  mudarStatus: (id: string, status: string) => void; pautar: (id: string, data: string) => Promise<boolean>;
}) {
  const [dia, setDia] = useState(sugestao);
  const [indo, setIndo] = useState(false);
  const [foi, setFoi] = useState(false);
  const r = i.roteiro ?? {};
  return (
    <article className="rounded-2xl bg-white shadow-sm">
      <button type="button" onClick={abrir} className="w-full p-3.5 text-left">
        <span className="flex flex-wrap items-center gap-1.5">
          {i.formato && <span className="rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ background: C.fundo }}>{i.formato}</span>}
          {i.status === "gravar" && <span className="rounded-full px-2 py-0.5 text-[11px] font-bold" style={{ background: C.limao }}>🎬 pra gravar</span>}
          {(i.tags ?? []).map((t) => <span key={t} className="rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ background: C.roxoClaro, color: C.roxo }}>{t}</span>)}
        </span>
        <span className="mt-1.5 block font-bold leading-snug">{i.titulo}</span>
      </button>
      {aberta && (
        <div className="border-t border-black/5 px-3.5 pb-3.5 pt-2.5 text-[15px]">
          {i.descricao && <p style={{ color: "#333" }}>{i.descricao}</p>}
          {r.gancho && <p className="mt-2"><b style={{ color: C.roxo }}>Gancho:</b> {r.gancho}</p>}
          {(r.desenvolvimento ?? []).length > 0 && (
            <ul className="mt-1.5 list-disc pl-5" style={{ color: "#333" }}>{r.desenvolvimento!.map((d, k) => <li key={k}>{d}</li>)}</ul>
          )}
          {r.cta && <p className="mt-1.5"><b style={{ color: C.roxo }}>CTA:</b> {r.cta}</p>}

          {foi ? (
            <p className="mt-3 rounded-xl p-3 text-sm font-bold" style={{ background: C.limao }}>Foi pra pauta em {diaBonito(dia)} ✓</p>
          ) : (
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <input type="date" value={dia} onChange={(e) => setDia(e.target.value)} className="rounded-full px-3 py-1.5 text-[16px] outline-none" style={{ background: C.fundo }} />
              <button type="button" disabled={indo || !dia} className="rounded-full px-3.5 py-2 text-xs font-bold text-white disabled:opacity-40" style={{ background: C.roxo }}
                onClick={async () => { setIndo(true); setFoi(await pautar(i.id, dia)); setIndo(false); }}>
                {indo ? "Colocando…" : "Colocar na pauta"}
              </button>
              <button type="button" onClick={() => mudarStatus(i.id, i.status === "gravar" ? "ideia" : "gravar")} className="rounded-full px-3 py-2 text-xs font-bold" style={{ background: C.fundo }}>
                {i.status === "gravar" ? "Voltar pra ideia" : "🎬 Pra gravar"}
              </button>
              <button type="button" onClick={() => mudarStatus(i.id, "postado")}
                className="ml-auto text-xs font-bold underline underline-offset-2" style={{ color: C.suave }}>Já postei</button>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
