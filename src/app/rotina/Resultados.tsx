"use client";

import { useMemo, useState } from "react";
import { C, SERIES, diaBonito, isoDe, type Insta, type Item, type PostIG, type Resultados } from "./comum";

// Resultados: liga cada post da pauta ao post de verdade no Instagram e mostra os números.
// Os números são os mesmos do admin do creators (ig_insights_cache, atualizado a cada 30 min).

const rotulo = "text-xs font-bold uppercase tracking-[0.14em]";

export const fmt = (n: number) => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(".0", "").replace(".", ",") + " mi";
  if (n >= 10_000) return Math.round(n / 1000) + " mil";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".0", "").replace(".", ",") + " mil";
  return String(n);
};
const vezesTxt = (x: number) => x.toFixed(1).replace(".", ",") + "×";
const somaDias = (dia: string, n: number) => { const d = new Date(dia + "T12:00:00"); d.setDate(d.getDate() + n); return isoDe(d); };
const NOME_TIPO: Record<string, string> = { VIDEO: "Reels", CAROUSEL_ALBUM: "carrosséis", IMAGE: "fotos" };

/**
 * Qual post do Instagram é cada post da pauta. Primeiro o que a Lara escolheu; o resto
 * acha sozinho: o post do Instagram mais perto da data (de 1 dia antes a 3 depois),
 * sem repetir um post que já é de outro item.
 */
export function vincular(itens: Item[], posts: PostIG[], res: Resultados) {
  const porId = new Map(posts.map((p) => [p.id, p]));
  const usados = new Set(Object.values(res.links).filter(Boolean));
  const mapa = new Map<string, PostIG>();
  const postados = itens.filter((x) => x.status === "postado").sort((a, b) => a.data.localeCompare(b.data));
  for (const x of postados) {
    const escolhido = res.links[x.id];
    if (escolhido !== undefined) {
      const p = porId.get(escolhido);
      if (p) mapa.set(x.id, p);
      continue;
    }
    const de = somaDias(x.data, -1), ate = somaDias(x.data, 3);
    const perto = posts
      .filter((p) => p.dia >= de && p.dia <= ate && !usados.has(p.id))
      .sort((a, b) => dist(a.dia, x.data) - dist(b.dia, x.data) || a.ts.localeCompare(b.ts))[0];
    if (perto) { mapa.set(x.id, perto); usados.add(perto.id); }
  }
  return mapa;
}
// post no dia ou depois ganha de post na véspera
const dist = (dia: string, alvo: string) => {
  const d = (new Date(dia + "T12:00:00").getTime() - new Date(alvo + "T12:00:00").getTime()) / 864e5;
  return d >= 0 ? d : Math.abs(d) + 0.5;
};

type Med = Record<string, { views: number; alcance: number; curtidas: number; comentarios: number; salvos: number; compart: number; n: number }>;

/** Mediana de cada número por tipo (Reels com Reels, carrossel com carrossel), nos últimos 90 dias. */
export function medianas(posts: PostIG[]): Med {
  const corte = new Date(Date.now() - 90 * 864e5).toISOString();
  const med = (xs: number[]) => { const s = xs.slice().sort((a, b) => a - b); return s.length ? s[Math.floor(s.length / 2)] : 0; };
  const out: Med = {};
  for (const tipo of new Set(posts.map((p) => p.tipo))) {
    const xs = posts.filter((p) => p.tipo === tipo && p.ts >= corte);
    out[tipo] = {
      views: med(xs.map((p) => p.views)), alcance: med(xs.map((p) => p.alcance)), curtidas: med(xs.map((p) => p.curtidas)),
      comentarios: med(xs.map((p) => p.comentarios)), salvos: med(xs.map((p) => p.salvos)), compart: med(xs.map((p) => p.compart)), n: xs.length,
    };
  }
  return out;
}

/** Seguidores ganhos entre a véspera do post e o dia seguinte (o snapshot diário do admin). */
export function seguidoresDoPost(seg: Insta["seguidores"], dia: string) {
  const em = (d: string) => [...seg].reverse().find((s) => s.dia <= d);
  const antes = seg.find((s) => s.dia === somaDias(dia, -1));
  const depois = em(somaDias(dia, 1));
  if (!antes || !depois || depois.dia < dia) return null;
  return { ganho: depois.followers - antes.followers, parcial: depois.dia < somaDias(dia, 1) };
}

/** O selo "2,3× seus outros Reels". */
export function Selo({ p, med }: { p: PostIG; med: Med }) {
  const m = med[p.tipo];
  if (!m || m.n < 3 || !m.views) return null;
  const x = p.views / m.views;
  const bom = x >= 1.2, ruim = x < 0.8;
  return (
    <span className="rounded-full px-2 py-0.5 text-[11px] font-bold"
      style={bom ? { background: C.limao, color: C.preto } : ruim ? { background: C.fundo, color: C.suave } : { background: C.roxoClaro, color: C.roxo }}>
      {bom ? "🔥 " : ""}{vezesTxt(x)} a média dos {NOME_TIPO[p.tipo] ?? "posts"}
    </span>
  );
}

export function Numeros({ p, med, seg, compacto }: { p: PostIG; med: Med; seg: Insta["seguidores"]; compacto?: boolean }) {
  const m = med[p.tipo];
  const s = seguidoresDoPost(seg, p.dia);
  const caixas: { nome: string; v: string; acima?: boolean }[] = [
    { nome: "Views", v: fmt(p.views), acima: !!m && p.views > m.views },
    { nome: "Alcance", v: fmt(p.alcance), acima: !!m && p.alcance > m.alcance },
    { nome: "Curtidas", v: fmt(p.curtidas), acima: !!m && p.curtidas > m.curtidas },
    { nome: "Comentários", v: fmt(p.comentarios), acima: !!m && p.comentarios > m.comentarios },
    { nome: "Salvos", v: fmt(p.salvos), acima: !!m && p.salvos > m.salvos },
    { nome: "Compart.", v: fmt(p.compart), acima: !!m && p.compart > m.compart },
  ];
  if (!compacto && p.tempo) caixas.push({ nome: "Assistido", v: `${p.tempo.toFixed(1).replace(".", ",")} s` });
  if (!compacto && s) caixas.push({ nome: s.parcial ? "Seguidores*" : "Seguidores", v: (s.ganho >= 0 ? "+" : "") + fmt(s.ganho) });
  return (
    <div className={`grid gap-1.5 ${compacto ? "grid-cols-6" : "grid-cols-3 sm:grid-cols-4"}`}>
      {caixas.map((c) => (
        <div key={c.nome} className="rounded-xl px-2 py-2" style={{ background: c.acima ? "#F3FDD0" : C.fundo }}>
          <p className={`${compacto ? "text-[13px]" : "text-lg"} font-extrabold leading-none`}>{c.v}{c.acima ? <span className="ml-0.5 text-[11px]" style={{ color: "#5C7A00" }}>↑</span> : null}</p>
          <p className="mt-1 truncate text-[10.5px] font-semibold" style={{ color: C.suave }}>{c.nome}</p>
        </div>
      ))}
    </div>
  );
}

/** O bloco "Resultado" dentro do cartão de um post postado. */
export function ResultadoDoPost({ x, p, insta, med, res, vincular: trocar, anotar }: {
  x: Item; p: PostIG | undefined; insta: Insta; med: Med; res: Resultados;
  vincular: (id: string, mediaId: string) => void; anotar: (id: string, texto: string) => void;
}) {
  const [trocando, setTrocando] = useState(false);
  const [nota, setNota] = useState(res.notas[x.id] ?? "");
  const perto = insta.posts.filter((q) => q.dia >= somaDias(x.data, -7) && q.dia <= somaDias(x.data, 7));
  const s = p ? seguidoresDoPost(insta.seguidores, p.dia) : null;
  return (
    <div className="mb-4 rounded-xl p-3" style={{ background: "#FAFAF7", border: "1px solid rgba(0,0,0,.06)" }}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className={rotulo} style={{ color: C.roxo }}>Resultado</p>
        {p && <Selo p={p} med={med} />}
      </div>
      {p ? (
        <>
          <p className="mt-1 text-xs" style={{ color: C.suave }}>Postado {diaBonito(p.dia)} às {new Date(p.ts).toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit" })}</p>
          <div className="mt-2"><Numeros p={p} med={med} seg={insta.seguidores} /></div>
          <p className="mt-1.5 text-[11px]" style={{ color: C.suave }}>
            Verde = acima da sua média de {NOME_TIPO[p.tipo] ?? "posts"} dos últimos 90 dias.{s?.parcial ? " *Seguidores ainda contando." : ""}
          </p>
        </>
      ) : (
        <p className="mt-1 text-sm" style={{ color: C.suave }}>Ainda não achei esse post no Instagram. Os números do admin atualizam a cada 30 min, ou escolhe o post abaixo.</p>
      )}
      <div className="mt-2 flex flex-wrap items-center gap-3">
        {p?.link && <a href={p.link} target="_blank" rel="noreferrer" className="text-xs font-bold underline underline-offset-2" style={{ color: C.roxo }}>Abrir no Instagram</a>}
        <button type="button" onClick={() => setTrocando(!trocando)} className="text-xs font-bold underline underline-offset-2" style={{ color: C.suave }}>
          {p ? "Não é esse post?" : "Escolher o post"}
        </button>
      </div>
      {trocando && (
        <select className="mt-2 w-full rounded-xl bg-white p-2.5 text-[16px] outline-none" value={p?.id ?? ""}
          onChange={(e) => { trocar(x.id, e.target.value); setTrocando(false); }}>
          <option value="">Nenhum (não achei)</option>
          {perto.map((q) => (
            <option key={q.id} value={q.id}>{diaBonito(q.dia)} · {NOME_TIPO[q.tipo] ?? q.tipo} · {q.legenda.replace(/\s+/g, " ").slice(0, 60)}</option>
          ))}
        </select>
      )}
      <label className="mt-3 block">
        <span className="text-xs font-bold">Por que acho que foi assim</span>
        <textarea value={nota} rows={2} maxLength={1000} placeholder="Ex.: gancho com número, história pessoal, postei às 18h…"
          onChange={(e) => setNota(e.target.value)} onBlur={() => { if (nota !== (res.notas[x.id] ?? "")) anotar(x.id, nota); }}
          className="mt-1 w-full resize-y rounded-xl bg-white p-2.5 text-[16px] leading-snug outline-none" />
      </label>
    </div>
  );
}

/** Aba Resultados: ranking da pauta, o que cada série rende e o que ficou fora da pauta. */
export function ResultadosAba({ itens, insta, res }: { itens: Item[]; insta: Insta; res: Resultados }) {
  const med = useMemo(() => medianas(insta.posts), [insta.posts]);
  const mapa = useMemo(() => vincular(itens, insta.posts, res), [itens, insta.posts, res]);
  const linhas = itens.filter((x) => mapa.has(x.id)).map((x) => ({ x, p: mapa.get(x.id)! })).sort((a, b) => b.p.views - a.p.views);
  const semPost = itens.filter((x) => x.status === "postado" && !mapa.has(x.id));
  const [abertos, setAbertos] = useState<string | null>(null);

  const series = useMemo(() => {
    const g: Record<string, { n: number; views: number; salvos: number; compart: number; vezes: number[] }> = {};
    for (const { x, p } of linhas) {
      const k = x.serie ?? "outro";
      const m = med[p.tipo];
      const s = (g[k] ??= { n: 0, views: 0, salvos: 0, compart: 0, vezes: [] });
      s.n++; s.views += p.views; s.salvos += p.salvos; s.compart += p.compart;
      if (m?.views) s.vezes.push(p.views / m.views);
    }
    return Object.entries(g).map(([k, s]) => ({ k, ...s, media: s.views / s.n, vez: s.vezes.length ? s.vezes.reduce((a, b) => a + b, 0) / s.vezes.length : null }))
      .sort((a, b) => b.media - a.media);
  }, [linhas, med]);
  const maxSerie = Math.max(1, ...series.map((s) => s.media));

  const vinculados = new Set([...mapa.values()].map((p) => p.id));
  const primeiro = itens.filter((x) => x.status === "postado").map((x) => x.data).sort()[0];
  const fora = primeiro ? insta.posts.filter((p) => p.dia >= primeiro && !vinculados.has(p.id)) : [];

  if (!insta.posts.length) {
    return <p className="mt-5 rounded-2xl bg-white p-4 text-sm">Não consegui ler as métricas do admin agora. Tenta de novo daqui a pouco.</p>;
  }
  const melhor = linhas[0];
  const totalViews = linhas.reduce((t, l) => t + l.p.views, 0);

  return (
    <div className="mt-5 flex flex-col gap-4">
      {melhor ? (
        <section className="rounded-2xl p-4" style={{ background: C.preto, color: "#fff" }}>
          <p className={rotulo} style={{ color: C.limao }}>Melhor post da pauta</p>
          <p className="mt-1 text-xl font-extrabold leading-tight">{melhor.x.titulo}</p>
          <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,.75)" }}>
            {fmt(melhor.p.views)} views · {fmt(melhor.p.curtidas)} curtidas · {fmt(melhor.p.salvos)} salvos · {fmt(melhor.p.compart)} compart.
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl py-2" style={{ background: "rgba(255,255,255,.08)" }}><b className="block text-lg">{linhas.length}</b><span className="text-[11px] opacity-75">posts medidos</span></div>
            <div className="rounded-xl py-2" style={{ background: "rgba(255,255,255,.08)" }}><b className="block text-lg">{fmt(totalViews)}</b><span className="text-[11px] opacity-75">views somadas</span></div>
            <div className="rounded-xl py-2" style={{ background: "rgba(255,255,255,.08)" }}><b className="block text-lg">{fmt(Math.round(totalViews / linhas.length))}</b><span className="text-[11px] opacity-75">média por post</span></div>
          </div>
        </section>
      ) : (
        <p className="rounded-2xl bg-white p-4 text-sm">Assim que um post da pauta for marcado como Postado, os números dele aparecem aqui.</p>
      )}

      {series.length > 0 && (
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <p className={rotulo} style={{ color: C.roxo }}>O que cada série rende</p>
          <p className="mt-1 text-xs" style={{ color: C.suave }}>Média de views por post. Com poucos posts ainda é palpite; fica confiável lá pelo 4º de cada série.</p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {series.map((s) => {
              const sr = SERIES[s.k] ?? { nome: s.k, cor: "#ddd", tinta: C.preto };
              return (
                <li key={s.k}>
                  <div className="flex items-baseline justify-between gap-2 text-sm">
                    <span className="font-bold">{sr.nome} <span className="font-semibold" style={{ color: C.suave }}>· {s.n} post{s.n > 1 ? "s" : ""}</span></span>
                    <span className="font-extrabold">{fmt(Math.round(s.media))}{s.vez ? <span className="ml-1 text-xs font-bold" style={{ color: C.suave }}>({vezesTxt(s.vez)})</span> : null}</span>
                  </div>
                  <div className="mt-1 h-2.5 rounded-full" style={{ background: C.fundo }}>
                    <div className="h-2.5 rounded-full" style={{ width: `${(s.media / maxSerie) * 100}%`, background: sr.cor === C.preto ? C.roxo : sr.cor }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {linhas.length > 0 && (
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <p className={rotulo} style={{ color: C.roxo }}>Ranking da pauta</p>
          <ol className="mt-2 flex flex-col">
            {linhas.map(({ x, p }, i) => {
              const sr = SERIES[x.serie ?? ""] ?? { nome: x.serie ?? "", cor: "#ddd", tinta: C.preto };
              const aberto = abertos === x.id;
              return (
                <li key={x.id} className="border-b border-black/5 py-3 last:border-0">
                  <button type="button" onClick={() => setAbertos(aberto ? null : x.id)} className="flex w-full items-start gap-3 text-left">
                    <span className="w-6 flex-shrink-0 text-lg font-extrabold" style={{ color: i === 0 ? C.roxo : C.suave }}>{i + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-1.5">
                        <span className="rounded-full px-2 py-0.5 text-[11px] font-bold" style={{ background: sr.cor, color: sr.tinta }}>{sr.nome}</span>
                        <span className="text-[11px] font-semibold" style={{ color: C.suave }}>{diaBonito(p.dia)}</span>
                        <Selo p={p} med={med} />
                      </span>
                      <span className="mt-1 block font-bold leading-snug">{x.titulo}</span>
                      {res.notas[x.id] && <span className="mt-0.5 block text-xs italic" style={{ color: C.suave }}>“{res.notas[x.id]}”</span>}
                    </span>
                    <span className="flex-shrink-0 text-right"><b className="block text-lg leading-none">{fmt(p.views)}</b><span className="text-[10.5px]" style={{ color: C.suave }}>views</span></span>
                  </button>
                  {aberto && (
                    <div className="mt-2 pl-9">
                      <Numeros p={p} med={med} seg={insta.seguidores} />
                      {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-bold underline underline-offset-2" style={{ color: C.roxo }}>Abrir no Instagram</a>}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {semPost.length > 0 && (
        <section className="rounded-2xl bg-white p-4 text-sm shadow-sm">
          <p className={rotulo} style={{ color: C.rosa }}>Postados sem número</p>
          <p className="mt-1 text-xs" style={{ color: C.suave }}>Não achei no Instagram. Abre o post na aba Hoje e escolhe qual é.</p>
          <ul className="mt-2 list-disc pl-5">{semPost.map((x) => <li key={x.id}>{diaBonito(x.data)} · {x.titulo}</li>)}</ul>
        </section>
      )}

      {fora.length > 0 && (
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <p className={rotulo} style={{ color: C.suave }}>Fora da pauta</p>
          <p className="mt-1 text-xs" style={{ color: C.suave }}>Posts do Instagram desde que a rotina começou que não estão ligados a nenhum item da pauta.</p>
          <ul className="mt-2 flex flex-col gap-2 text-sm">
            {fora.map((p) => (
              <li key={p.id} className="flex items-start gap-2">
                <span className="w-16 flex-shrink-0 text-xs font-bold" style={{ color: C.suave }}>{diaBonito(p.dia)}</span>
                <span className="min-w-0 flex-1 truncate">{p.legenda.replace(/\s+/g, " ")}</span>
                <b className="flex-shrink-0">{fmt(p.views)}</b>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="text-center text-[11px]" style={{ color: C.suave }}>
        Números do admin do creators (aba Instagram), atualizados sozinhos a cada 30 min
        {insta.atualizado ? ` · última leitura ${new Date(insta.atualizado).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}` : ""}.
      </p>
    </div>
  );
}

export type { Med };
