"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Check, CheckCircle2, Eye, ImagePlus, Plus, Sparkles, Star, Trash2, X } from "lucide-react";
import { LINGUAS, corDe, letraDoGancho, traduzir, type Lingua, type Nota, type RoteiroPublico } from "@/lib/roteiro";
import { RoteiroCtx, quando, useRoteiro } from "./contexto";
import Campo from "./Campo";
import Midia from "./Midia";
import { TEXTOS, type Textos } from "./textos";

/** Um roteiro da página. A chave só vem quando quem abriu é a Lara. */
export type Item = { inicial: RoteiroPublico; notas: Nota[]; chave?: string };

type Props = { itens: Item[]; atual: string; lang?: string };

const CHAVE_NOME = "roteiro:nome";

// Roteiros do mesmo grupo aparecem um embaixo do outro. Cada um tem comentários,
// gancho e aprovação próprios; cor e logo saem do primeiro.
export default function RoteiroPage({ itens: iniciais, atual, lang }: Props) {
  const [itens, setItens] = useState(() => iniciais.map((i) => ({ roteiro: i.inicial, notas: i.notas })));
  const chaves = iniciais.map((i) => i.chave);
  const chave = chaves[0];
  const [nome, setNomeState] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return localStorage.getItem(CHAVE_NOME) ?? "";
    } catch {
      return "";
    }
  });
  const [erro, setErro] = useState<string | null>(null);
  // "Ver como a marca": a Lara esconde os próprios controles pra conferir a página.
  const [comoMarca, setComoMarca] = useState(false);
  const lara = Boolean(chave) && !comoMarca;
  const varios = itens.length > 1;
  const primeiro = itens[0].roteiro.conteudo;
  const cor = corDe(primeiro);

  // PT/EN/ES: só aparece quando o roteiro tem tradução. A língua fica no link (?lang=en).
  const disponiveis = LINGUAS.filter((l) => l === "pt" || itens.some((x) => x.roteiro.conteudo.traducoes?.[l]));
  const [lingua, setLinguaState] = useState<Lingua>(() => disponiveis.find((l) => l === lang) ?? "pt");
  const t = TEXTOS[lingua];
  function setLingua(l: Lingua) {
    setLinguaState(l);
    const u = new URL(window.location.href);
    if (l === "pt") u.searchParams.delete("lang");
    else u.searchParams.set("lang", l);
    window.history.replaceState(null, "", u);
    document.documentElement.lang = l === "pt" ? "pt-BR" : l;
  }

  const setNome = useCallback((n: string) => {
    setNomeState(n);
    try {
      localStorage.setItem(CHAVE_NOME, n);
    } catch {}
  }, []);

  // Sem nome ainda: abre a caixinha de nome e só manda depois.
  const [pedirNome, setPedirNome] = useState<null | ((n: string | null) => void)>(null);

  const trocar = (i: number, j: { roteiro?: RoteiroPublico; notas?: Nota[] }) =>
    setItens((xs) => xs.map((x, k) => (k === i ? { roteiro: j.roteiro ?? x.roteiro, notas: j.notas ?? x.notas } : x)));

  async function enviarEm(i: number, acao: string, dados: Record<string, unknown> = {}) {
    setErro(null);
    let autor = (dados.autor as string | undefined) ?? nome;
    if (!chaves[i] && !autor) {
      const n = await new Promise<string | null>((resolve) => setPedirNome(() => resolve));
      setPedirNome(null);
      if (!n) return false;
      setNome(n);
      autor = n;
    }
    try {
      const res = await fetch(`/api/roteiro/${itens[i].roteiro.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ acao, k: chaves[i], ...dados, autor }),
      });
      const j = await res.json();
      if (!res.ok) {
        setErro(j.error ?? "Não deu certo, tenta de novo");
        return false;
      }
      trocar(i, j);
      return true;
    } catch {
      setErro("Sem conexão. Tenta de novo.");
      return false;
    }
  }

  async function subirFotosEm(i: number, bloco: string, arquivos: File[]) {
    setErro(null);
    for (const f of arquivos) {
      try {
        const fd = new FormData();
        fd.append("k", chaves[i] ?? "");
        fd.append("bloco", bloco);
        const logo = bloco === "logo";
        fd.append("foto", await reduzir(f, logo ? 800 : 1600, logo ? "image/png" : "image/jpeg"), logo ? "logo.png" : "foto.jpg");
        const res = await fetch(`/api/roteiro/${itens[i].roteiro.slug}/foto`, { method: "POST", body: fd });
        const j = await res.json();
        if (!res.ok) {
          setErro(j.error ?? "Não deu pra subir a foto");
          return;
        }
        trocar(i, j);
      } catch {
        setErro(`Não deu pra abrir ${f.name}. Tenta em JPG ou PNG.`);
        return;
      }
    }
  }

  // Atualiza quando a aba volta pro foco (a Lara pode ter respondido).
  const slugs = itens.map((x) => x.roteiro.slug).join(",");
  useEffect(() => {
    const atualizar = async () => {
      if (document.visibilityState !== "visible") return;
      for (const [i, slug] of slugs.split(",").entries()) {
        const res = await fetch(`/api/roteiro/${slug}`);
        if (res.ok) trocar(i, await res.json());
      }
    };
    document.addEventListener("visibilitychange", atualizar);
    return () => document.removeEventListener("visibilitychange", atualizar);
  }, [slugs]);

  // Com seções, a página abre só com os quadrados; clicar num deles mostra aquela seção.
  // O link de um roteiro específico (ex.: e-mail de comentário) já abre a seção dele.
  const escolhaUnica = itens.some((x) => x.roteiro.conteudo.escolhaUnica);
  const temSecoes = !escolhaUnica && itens.some((x) => x.roteiro.conteudo.secao);
  const secoes = secoesDe(itens.map((x) => x.roteiro), itens.map((x) => x.notas));
  const [aberta, setAberta] = useState<string | null>(() =>
    temSecoes && atual !== itens[0].roteiro.slug ? (itens.find((x) => x.roteiro.slug === atual)?.roteiro.conteudo.secao ?? null) : null
  );
  // Dentro de cada seção, a opção aprovada vai pro topo; as outras seguem a ordem original.
  const ordem = itens.map((_, i) => i);
  ordem.sort((a, b) => {
    const sa = itens[a].roteiro.conteudo.secao;
    const sb = itens[b].roteiro.conteudo.secao;
    if (!sa || sa !== sb) return a - b;
    return Number(Boolean(itens[b].roteiro.aprovado_em)) - Number(Boolean(itens[a].roteiro.aprovado_em)) || a - b;
  });
  const [expandidos, setExpandidos] = useState<Set<string>>(() => new Set());
  // Escolha única: uma opção por vez na tela, pra marca comparar sem rolar tudo.
  // Com seções (vários vídeos), a marca escolhe uma opção por seção.
  const videosEscolha = [...new Set(itens.map((x) => x.roteiro.conteudo.secao).filter(Boolean))];
  const aprovadaDaSecao = (secao?: string) => itens.find((o) => o.roteiro.conteudo.secao === secao && o.roteiro.aprovado_em);
  const [opcaoAberta, setOpcaoAberta] = useState(() => Math.max(0, itens.findIndex((x) => x.roteiro.aprovado_em)));
  const alternarOpcao = (i: number, slug: string) => {
    const abrir = opcaoAberta !== i;
    setOpcaoAberta(abrir ? i : -1);
    if (abrir) requestAnimationFrame(() => document.getElementById(`opcao-${slug}`)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  // Modo gravação: só o que foi aprovado, tudo em sequência, sem abrir quadrado por quadrado.
  // Abre sozinho quando toda seção com opções já tem uma aprovada.
  const temAprovado = itens.some((x) => x.roteiro.aprovado_em);
  const [abertosGravar, setAbertosGravar] = useState<Set<string>>(() => new Set());
  const alternarGravar = (slug: string) =>
    setAbertosGravar((e) => {
      const n = new Set(e);
      if (n.has(slug)) n.delete(slug);
      else n.add(slug);
      return n;
    });
  const [soAprovados, setSoAprovados] = useState(
    () => temSecoes && secoes.filter((g) => !g.informativo).every((g) => g.aprovados.length > 0)
  );

  function abrirSecao(nome: string | null) {
    setAberta(nome);
    if (nome) requestAnimationFrame(() => document.getElementById("secao-aberta")?.scrollIntoView({ behavior: "smooth" }));
  }

  // Link de um roteiro do meio do grupo (ex.: e-mail de comentário) já desce até ele.
  useEffect(() => {
    if (varios && atual !== itens[0].roteiro.slug) document.getElementById(atual)?.scrollIntoView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [criando, setCriando] = useState(false);
  async function novoRoteiro(copiar: boolean) {
    setCriando(true);
    const ok = await enviarEm(itens.length - 1, "roteiro_add", { copiar });
    if (ok) window.location.reload();
    else setCriando(false);
  }

  return (
    <div
      className="rt min-h-screen bg-[var(--rt-fundo)] pb-32 text-[var(--rt-ink)]"
      style={
        {
          fontFamily: "var(--rt-font), system-ui, sans-serif",
          "--rt-roxo": cor,
          "--rt-lilas": `color-mix(in srgb, ${cor} 11%, white)`,
        } as React.CSSProperties
      }
    >
      {chave && (
        <BarraLara
          comoMarca={comoMarca}
          setComoMarca={setComoMarca}
          cor={cor}
          logo={primeiro.logo}
          enviar={(acao, dados) => enviarEm(0, acao, dados)}
          subirLogo={(f) => subirFotosEm(0, "logo", [f])}
        />
      )}

      <div className="mx-auto max-w-[880px] px-4 pt-10 md:px-8 lg:pt-14">
        <main className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {primeiro.capa ? (
              <div className="flex min-w-0 items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={primeiro.capa} alt={primeiro.produto ?? primeiro.marca} className="size-[92px] shrink-0 rounded-full border border-[var(--rt-linha)] bg-white object-cover" />
                <div className="min-w-0">
                  <p className="text-[24px] font-extrabold leading-tight tracking-tight">{primeiro.marca}</p>
                  {primeiro.produto && <p className="mt-0.5 text-[14px] leading-snug text-[var(--rt-muted)]">{primeiro.produto}</p>}
                </div>
              </div>
            ) : primeiro.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={primeiro.logo} alt={primeiro.marca} className="h-9 w-auto max-w-[180px] object-contain object-left" />
            ) : (
              <p className="flex items-center gap-1 text-[13px] font-bold">
                {primeiro.marca} <Sparkles size={13} className="text-[var(--rt-roxo)]" />
              </p>
            )}
            {disponiveis.length > 1 && <Linguas linguas={disponiveis} atual={lingua} mudar={setLingua} />}
          </div>

          {varios && !escolhaUnica && !itens.some((x) => x.roteiro.conteudo.secao) && (
            <p className="mt-3 text-[14.5px] text-[var(--rt-muted)]">
              {t.roteiros(itens.filter((x) => !x.roteiro.conteudo.semAprovacao).length)}
            </p>
          )}
          {escolhaUnica && (
            <div className="mt-7">
              <h2 className="text-[22px] font-extrabold leading-tight tracking-tight">{videosEscolha.length > 1 ? t.escolhaPorVideo : t.escolhaUnica(itens.length)}</h2>
              <p className="mt-1.5 text-[14px] text-[var(--rt-muted)]">{t.comoRevisarCurto}</p>
            </div>
          )}
          {temSecoes && temAprovado && (
            <div className="mt-6 inline-flex rounded-full border border-[var(--rt-linha)] bg-white p-1 text-[13px] font-semibold">
              {[true, false].map((v) => (
                <button
                  key={String(v)}
                  onClick={() => setSoAprovados(v)}
                  className={`rounded-full px-4 py-1.5 ${soAprovados === v ? "bg-[var(--rt-ink)] text-white" : "text-[var(--rt-muted)]"}`}
                >
                  {v ? `✓ ${t.soAprovados}` : t.todasOpcoes}
                </button>
              ))}
            </div>
          )}
          {temSecoes && !soAprovados && <Cartoes secoes={secoes} aberta={aberta} abrir={abrirSecao} t={t} />}

          {ordem.map((i, k) => {
            const x = itens[i];
            const secao = x.roteiro.conteudo.secao;
            const secaoDe = (j: number | undefined) => (j === undefined ? undefined : itens[j].roteiro.conteudo.secao);
            const abre = Boolean(secao) && (k === 0 || secaoDe(ordem[k - 1]) !== secao);
            const dentro = Boolean(secao) && !abre;
            const fecha = Boolean(secao) && secaoDe(ordem[k + 1]) !== secao;
            if (soAprovados ? ehOpcao(x.roteiro) && !x.roteiro.aprovado_em : temSecoes && secao !== aberta) return null;
            const grupo = secoes.find((g) => g.nome === secao);
            const proxima = secoes[secoes.findIndex((g) => g.nome === secao) + 1];
            // com uma opção aprovada, as outras da mesma seção ficam recolhidas (dá pra abrir)
            const recolhido = Boolean(grupo?.aprovados.length) && !x.roteiro.aprovado_em && ehOpcao(x.roteiro);
            const primeiroRecolhido = recolhido && (k === 0 || itens[ordem[k - 1]].roteiro.aprovado_em);
            const expandido = expandidos.has(x.roteiro.slug);
            const c = x.roteiro.conteudo;
            // no modo gravação, cada roteiro aprovado começa como uma linha; abre só na hora de gravar
            const gravado = Boolean(c.gravado_em);
            const botaoGravado = !c.semAprovacao && (
              <button
                onClick={() => enviarEm(i, "gravado")}
                className={`flex-shrink-0 rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold ${
                  gravado ? "border-[#13703A] bg-[#13703A] text-white" : "border-[var(--rt-linha)] bg-white text-[var(--rt-ink)] hover:border-[#13703A]"
                }`}
              >
                {gravado ? `✓ ${t.gravado}` : t.marcarGravado}
              </button>
            );
              const conteudo = (
            <RoteiroCtx.Provider
              value={{
                nome,
                setNome,
                lara,
                notas: x.notas,
                enviar: (acao, dados) => enviarEm(i, acao, dados),
                subirFotos: (bloco, arquivos) => subirFotosEm(i, bloco, arquivos),
                lingua,
                t,
                traduzir: (alvo, original) => traduzir(x.roteiro.conteudo, lingua, alvo, original),
              }}
            >
              <Secao
                roteiro={x.roteiro}
                notas={x.notas}
                chave={chaves[i]}
                lara={lara}
                varios={varios}
                n={i + 1}
                erro={varios ? null : erro}
                abre={abre}
                dentro={dentro && !recolhido}
                podeEscolher={escolhaUnica && !aprovadaDaSecao(secao)}
                outraEscolhida={
                  x.roteiro.conteudo.escolhaUnica && !x.roteiro.aprovado_em
                    ? aprovadaDaSecao(secao)?.roteiro.conteudo.rotulo?.split(" · ")[0] ?? null
                    : null
                }
              />
            </RoteiroCtx.Provider>
            );
            if (escolhaUnica) {
              const c = x.roteiro.conteudo;
              const on = i === opcaoAberta;
              return (
                <Fragment key={x.roteiro.slug}>
                {abre && <h2 className="mb-1 mt-8 text-[17px] font-bold tracking-tight">{secao}</h2>}
                <div id={`opcao-${x.roteiro.slug}`} className="mt-3 scroll-mt-3 overflow-hidden rounded-2xl border border-[var(--rt-linha)] bg-white">
                  <button onClick={() => alternarOpcao(i, x.roteiro.slug)} aria-expanded={on} className="flex w-full items-center gap-3.5 p-4 text-left">
                    <span className="text-[28px] font-extrabold leading-none text-[var(--rt-roxo)]">{c.rotulo?.match(/\d+/)?.[0] ?? i + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[16px] font-bold leading-snug">{c.titulo}</span>
                      {c.rotulo?.includes(" · ") && (
                        <span className="block text-[13px] text-[var(--rt-muted)]">{c.rotulo.split(" · ").slice(1).join(" · ")}</span>
                      )}
                    </span>
                    {x.roteiro.aprovado_em ? (
                      <CheckCircle2 size={20} className="shrink-0 text-[#13703A]" />
                    ) : (
                      <span className="text-[13.5px] font-bold text-[var(--rt-roxo)]">{on ? t.fechar : t.ler}</span>
                    )}
                  </button>
                  {on && <div className="border-t border-[var(--rt-linha)] px-3.5 pb-4 md:px-5">{conteudo}</div>}
                </div>
                </Fragment>
              );
            }
            // no modo gravação, cada roteiro aprovado começa como uma linha; abre só na hora de gravar
            if (soAprovados && !abertosGravar.has(x.roteiro.slug)) {
            return (
                <div
                  key={x.roteiro.slug}
                  className={`${k === 0 ? "mt-6" : "mt-3"} flex flex-col gap-3 rounded-2xl border px-4 py-4 sm:flex-row sm:items-center sm:justify-between ${
                    gravado ? "border-[#13703A]/40 bg-[#E8F5EC]" : "border-[var(--rt-linha)] bg-white"
                  }`}
                >
                  <button onClick={() => alternarGravar(x.roteiro.slug)} className="min-w-0 text-left sm:flex-1">
                    <span className="block text-[17px] font-extrabold leading-tight tracking-tight">
                      {gravado && <CheckCircle2 size={16} className="mr-1 inline -translate-y-px text-[#13703A]" />}
                      {secao ?? c.titulo}
                    </span>
                    <span className="mt-0.5 block text-[13.5px] text-[var(--rt-muted)]">
                      {[c.rotulo, secao ? c.titulo : null].filter(Boolean).join(" · ")}
                    </span>
                  </button>
                  <span className="flex flex-shrink-0 gap-2">
                    {botaoGravado}
                    <button
                      onClick={() => alternarGravar(x.roteiro.slug)}
                      className="rounded-full bg-[var(--rt-ink)] px-3.5 py-1.5 text-[12.5px] font-semibold text-white first-letter:uppercase"
                    >
                      {c.semAprovacao ? t.abrir : t.abrirGravar}
                    </button>
                  </span>
                </div>
              );
            }
            return (
            <Fragment key={x.roteiro.slug}>
            {soAprovados && (
              <div className="mt-10 flex flex-wrap gap-2">
                <button
                  onClick={() => alternarGravar(x.roteiro.slug)}
                  className="rounded-full border border-[var(--rt-linha)] bg-white px-3.5 py-1.5 text-[12.5px] font-semibold hover:border-[var(--rt-roxo)]"
                >
                  ↑ {t.recolher}
                </button>
                {botaoGravado}
              </div>
            )}
            {abre && (
              <h2
                id="secao-aberta"
                className="mt-10 scroll-mt-16 border-t-4 border-[var(--rt-ink)] pt-10 text-[30px] font-extrabold leading-tight tracking-[-0.03em] md:text-[38px]"
              >
                {secao}
              </h2>
            )}
            {abre && grupo && grupo.opcoes > 1 && (
              grupo.aprovados.length ? (
                <p className="mt-2 flex items-center gap-1.5 text-[14px] font-semibold text-[#13703A]">
                  <CheckCircle2 size={15} /> {t.opcaoAprovada(grupo.aprovados.join(", "))}
                </p>
              ) : (
                <p className="mt-2 text-[14px] text-[var(--rt-muted)]">{t.opcoesNaSecao(grupo.opcoes)}</p>
              )
            )}
            {primeiroRecolhido && (
              <p className="mt-14 text-[12px] font-bold uppercase tracking-[.12em] text-[var(--rt-muted)]">{t.outrasOpcoes}</p>
            )}
            {recolhido && (
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-[var(--rt-linha)] bg-white/60 px-4 py-3">
                <p className="min-w-0 text-[13.5px]">
                  <b>{(c.rotulo ?? "").split(" · ")[0]}</b>
                  <span className="text-[var(--rt-muted)]"> · {c.titulo} · {t.naoEscolhida}</span>
                </p>
                <button
                  onClick={() =>
                    setExpandidos((e) => {
                      const n = new Set(e);
                      if (n.has(x.roteiro.slug)) n.delete(x.roteiro.slug);
                      else n.add(x.roteiro.slug);
                      return n;
                    })
                  }
                  className="rounded-full border border-[var(--rt-linha)] bg-white px-3 py-1 text-[12px] font-semibold hover:border-[var(--rt-roxo)]"
                >
                  {expandido ? t.recolher : t.verMesmoAssim}
                </button>
              </div>
            )}
            {(!recolhido || expandido) && (
            conteudo
            )}
            {fecha && temSecoes && !soAprovados && (
              <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--rt-linha)] pt-6">
                <button
                  onClick={() => {
                    abrirSecao(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="rounded-full border border-[var(--rt-linha)] bg-white px-4 py-2 text-[13px] font-semibold hover:border-[var(--rt-roxo)]"
                >
                  {t.voltarAosQuadros}
                </button>
                {proxima && (
                  <button
                    onClick={() => abrirSecao(proxima.nome)}
                    className="rounded-full bg-[var(--rt-ink)] px-4 py-2 text-[13px] font-semibold text-white"
                  >
                    {t.proximo}: {proxima.nome} →
                  </button>
                )}
              </div>
            )}
            </Fragment>
            );
          })}

          {lara && (
            <div className="mt-14 rounded-2xl border border-dashed border-[var(--rt-roxo)]/50 p-5 text-center">
              <p className="text-[13px] text-[var(--rt-muted)]">Mais um roteiro pra {primeiro.marca} nesta mesma página</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <button
                  disabled={criando}
                  onClick={() => novoRoteiro(false)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[var(--rt-roxo)] px-4 py-2 text-[13px] font-semibold text-white disabled:opacity-50"
                >
                  <Plus size={15} /> {criando ? "Criando…" : "Novo roteiro em branco"}
                </button>
                <button
                  disabled={criando}
                  onClick={() => novoRoteiro(true)}
                  className="rounded-full border border-[var(--rt-linha)] bg-white px-4 py-2 text-[13px] font-semibold hover:border-[var(--rt-roxo)] disabled:opacity-50"
                >
                  Copiar o último
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {varios && erro && (
        <p className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-[560px] rounded-xl bg-[#B4321F] px-4 py-3 text-center text-[13px] font-semibold text-white">
          {erro}
        </p>
      )}
      {pedirNome && <PedirNome responder={pedirNome} t={t} />}
    </div>
  );
}

function Secao({
  roteiro,
  notas,
  chave,
  lara,
  varios,
  n,
  erro,
  abre,
  dentro,
  outraEscolhida,
  podeEscolher,
}: {
  roteiro: RoteiroPublico;
  notas: Nota[];
  chave?: string;
  lara: boolean;
  varios: boolean;
  n: number;
  erro: string | null;
  /** primeiro roteiro de uma seção (o título da seção vem logo acima) */
  abre?: boolean;
  /** roteiro seguinte dentro da mesma seção */
  dentro?: boolean;
  /** com escolha única: a opção que a marca já aprovou no lugar desta */
  outraEscolhida?: string | null;
  /** com escolha única: ninguém escolheu ainda, mostra o botão verde */
  podeEscolher?: boolean;
}) {
  const { enviar, t } = useRoteiro();
  const [aprovando, setAprovando] = useState(false);
  const c = roteiro.conteudo;
  const abertas = notas.filter((x) => x.status === "aberta" && x.tipo !== "resposta");
  const sugestoes = abertas.filter((x) => x.tipo === "sugestao").length;
  const comentarios = abertas.length - sugestoes;
  const letraEscolhida = letraDoGancho(c, roteiro.gancho_escolhido);
  // a mesma cena em todos os ganchos aparece uma vez só
  const telaUnica = c.ganchos.length > 1 && Boolean(c.ganchos[0].tela) && c.ganchos.every((g) => g.tela === c.ganchos[0].tela);

  return (
    <section
      id={roteiro.slug}
      className={`scroll-mt-16 ${
        c.escolhaUnica ? "" : abre ? "mt-8" : dentro ? "mt-14 border-t border-[var(--rt-linha)] pt-12" : varios && n > 1 ? "mt-16 border-t-2 border-[var(--rt-ink)] pt-12" : ""
      }`}
    >
      {varios && !c.escolhaUnica && (
        <p className={`${n === 1 && !abre ? "mt-8" : ""} text-[12px] font-bold uppercase tracking-[.12em] text-[var(--rt-roxo)]`}>
          {c.rotulo ?? `${t.roteiro} ${n}`}
        </p>
      )}
      {(!c.escolhaUnica || lara) && (
      <Campo
        alvo="geral:titulo"
        texto={c.titulo ?? "Roteiro de vídeo"}
        multilinha={false}
        className={varios ? "mt-1" : "mt-3"}
        render={(x) => <h1 className="text-[30px] font-extrabold leading-[1.1] tracking-[-0.025em] md:text-[38px]">{x}</h1>}
      />
      )}

      {!c.semAprovacao && roteiro.aprovado_em && <Status roteiro={roteiro} />}

      {!lara && (
        <p className="mt-3 text-[13px] text-[var(--rt-muted)]">{[c.duracao, c.formato].filter(Boolean).join(" · ")}</p>
      )}
      {lara && (
      <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--rt-linha)] bg-[var(--rt-linha)] md:grid-cols-4">
        {(
          [
            [t.creator, "creator", c.creator],
            [t.marca, "marca", c.marca],
            [t.formato, "formato", c.formato],
            [t.duracao, "duracao", c.duracao],
          ] as const
        ).map(([rotulo, campo, v]) => (
          <div key={campo} className="bg-white px-4 py-3.5">
            <p className="text-[10.5px] font-bold uppercase tracking-[.12em] text-[var(--rt-muted)]">{rotulo}</p>
            {v || lara ? (
              <Campo
                alvo={`geral:${campo}`}
                texto={v ?? ""}
                multilinha={false}
                vazio="preencher"
                render={(x) => <p className="mt-1 text-[14px] font-semibold leading-snug">{x}</p>}
              />
            ) : (
              <p className="mt-1 text-[14px] text-[var(--rt-muted)]">—</p>
            )}
          </div>
        ))}
      </div>
      )}

      {/* com escolha única, é só explicação: a marca lê, mas não tem o que editar aí */}
      {c.escolhaUnica && !lara && (c.conceito || c.regra) && (
        <div className="mt-4 space-y-2 text-[15px] leading-relaxed">
          {c.conceito && <p>{c.conceito}</p>}
          {c.regra && <p className="text-[13px] text-[var(--rt-muted)]">{c.regra}</p>}
        </div>
      )}
      {(!c.escolhaUnica || lara) && (c.conceito || c.regra || lara) && (
        <div className="mt-4 space-y-2 text-[15px] leading-relaxed">
          {(c.conceito || lara) && (
            <Campo
              alvo="geral:conceito"
              texto={c.conceito ?? ""}
              vazio="a ideia do vídeo numa frase"
              render={(x) => (
                <p>{x}</p>
              )}
            />
          )}
          {(c.regra || lara) && (
            <Campo
              alvo="geral:regra"
              texto={c.regra ?? ""}
              vazio="o que não pode faltar (ou não pode aparecer)"
              render={(x) => (
                <p className="text-[13px] text-[var(--rt-muted)]">{x}</p>
              )}
            />
          )}
        </div>
      )}

      {(n === 1 || abre) && !c.semAprovacao && !c.escolhaUnica && (
        <p className="mt-4 text-[13px] leading-relaxed text-[var(--rt-muted)]">
          {t.comoRevisar(varios, varios || c.ganchos.length > 1)}
        </p>
      )}

      {/* ganchos (blocos informativos, como a agenda, podem não ter) */}
      {(c.ganchos.length > 0 || lara) && (
        <>
      <Titulo>
        {c.ganchos.length > 1 ? t.ganchos : t.gancho}{" "}
        {c.ganchos.length > 1 && <span className="text-[var(--rt-muted)]">· {c.ganchosTodos ? t.gravamosTodos : t.escolherUm}</span>}
      </Titulo>
      <div className="space-y-2.5">
        {c.ganchos.map((g, i) => {
          const escolhido = roteiro.gancho_escolhido === g.id;
          // gravando todos, vira 1, 2… pra não confundir com Opção A, B, C
          const letra = c.ganchosTodos || c.escolhaUnica ? String(i + 1) : String.fromCharCode(65 + i);
          return (
            <article
              key={g.id}
              className={`relative rounded-2xl border bg-white p-4 transition-shadow md:p-5 ${
                escolhido
                  ? "border-[var(--rt-roxo)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--rt-roxo)_18%,transparent)]"
                  : "border-[var(--rt-linha)]"
              }`}
            >
              {lara && (
                <Ordem
                  bloco={`gancho:${g.id}`}
                  primeiro={i === 0}
                  ultimo={i === c.ganchos.length - 1}
                  recomendado={g.recomendado}
                  podeTirar={c.ganchos.length > 1}
                />
              )}
              <div className="flex gap-4 md:gap-5">
                <span className="text-[24px] font-extrabold leading-none text-[var(--rt-roxo)]">{letra}</span>
                <div className="min-w-0 flex-1 space-y-2">
                  <div className={`flex flex-wrap items-center gap-2 ${c.escolhaUnica && !c.ganchosTodos && !lara ? "hidden" : "pr-20"}`}>
                    {((g.titulo && (!c.escolhaUnica || c.ganchosTodos)) || lara) && (
                      <Campo
                        alvo={`gancho:${g.id}:titulo`}
                        texto={g.titulo}
                        multilinha={false}
                        vazio="nome do gancho"
                        render={(x) => <h3 className="text-[18px] font-bold tracking-tight">{x}</h3>}
                      />
                    )}
                    {g.recomendado && (
                      <span className="rounded-full bg-[var(--rt-lilas)] px-2 py-0.5 text-[11px] font-semibold text-[var(--rt-roxo)]">
                        {t.recomendado}
                      </span>
                    )}
                  </div>
                  {(g.fala || lara) && (
                    <Campo
                      alvo={`gancho:${g.id}:fala`}
                      texto={g.fala}
                      vazio="o que você fala nos primeiros segundos"
                      falado
                      render={(x) => <p className="text-[15.5px] leading-relaxed">“{x}”</p>}
                    />
                  )}
                  {((g.tela && !telaUnica) || lara) && (
                    <Campo alvo={`gancho:${g.id}:tela`} texto={g.tela ?? ""} vazio="o que aparece na tela" render={(x) => <Tela>{x}</Tela>} />
                  )}
                  <Midia bloco={`gancho:${g.id}`} fotos={g.fotos} refs={g.refs} />
                  {c.ganchos.length > 1 && !c.ganchosTodos && (
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <button
                        onClick={() => enviar("gancho", { id: g.id })}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${
                          escolhido
                            ? "bg-[var(--rt-roxo)] text-white"
                            : "border border-[var(--rt-linha)] hover:border-[var(--rt-roxo)] hover:text-[var(--rt-roxo)]"
                        }`}
                      >
                        {escolhido && <Check size={13} />}
                        {escolhido ? t.ganchoEscolhido : t.escolherGancho}
                      </button>
                      {escolhido && roteiro.gancho_escolhido_por && (
                        <span className="text-[11.5px] text-[var(--rt-muted)]">{t.por(roteiro.gancho_escolhido_por)}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
        {lara && <Adicionar onClick={() => enviar("item_add", { bloco: "gancho:" })}>Adicionar gancho</Adicionar>}
        {telaUnica && !lara && <Tela>{c.ganchos[0].tela}</Tela>}
      </div>
        </>
      )}

      {/* roteiro */}
      <Titulo>
        {c.partesTitulo ? (
          <>
            {c.partesTitulo.split(" · ")[0]}
            {c.partesTitulo.includes(" · ") && <span className="text-[var(--rt-muted)]"> · {c.partesTitulo.split(" · ").slice(1).join(" · ")}</span>}
          </>
        ) : (
          <>
            {t.roteiro} <span className="text-[var(--rt-muted)]">· {t.depoisDoGancho}</span>
          </>
        )}
        {lara && (
          <span className="text-[var(--rt-muted)]">
            {" "}· ≈ {Math.round(segundosDeFala([c.ganchos[0]?.fala ?? "", ...c.partes.map((p) => p.fala)].join(" ")))} s de fala com o primeiro gancho
          </span>
        )}
      </Titulo>
      <div className="overflow-hidden rounded-2xl border border-[var(--rt-linha)] bg-white">
        {c.partes.map((p, i) => (
          <div
            key={p.id}
            className={`relative grid gap-2 px-5 py-4 md:grid-cols-[120px_minmax(0,1fr)] md:gap-6 md:px-6 ${i ? "border-t border-[var(--rt-linha)]" : ""}`}
          >
            {lara && (
              <Ordem bloco={`parte:${p.id}`} primeiro={i === 0} ultimo={i === c.partes.length - 1} podeTirar={c.partes.length > 1} />
            )}
            <div className="pr-20 md:pr-0">
              <Campo
                alvo={`parte:${p.id}:nome`}
                texto={p.nome}
                multilinha={false}
                vazio="nome da parte"
                render={(x) => (
                  <p className="text-[11.5px] font-bold uppercase tracking-[.1em] text-[var(--rt-muted)]">
                    {!lara && c.partes[i - 1]?.nome === x ? "" : x}
                  </p>
                )}
              />
              {p.tempo ? (
                <Campo
                  alvo={`parte:${p.id}:tempo`}
                  texto={p.tempo}
                  multilinha={false}
                  vazio="0:00"
                  render={(x) => <p className="mt-0.5 text-[12px] tabular-nums text-[var(--rt-muted)]">{x}</p>}
                />
              ) : (
                lara && <p className="mt-0.5 text-[12px] tabular-nums text-[var(--rt-muted)]">≈ {Math.max(1, Math.round(segundosDeFala(p.fala)))} s de fala</p>
              )}
            </div>
            <div className="min-w-0 space-y-2.5 md:pr-16">
              {(p.fala || lara) && (
                <Campo
                  alvo={`parte:${p.id}:fala`}
                  texto={p.fala}
                  vazio="o que você fala nessa parte"
                  falado
                  render={(x) =>
                    p.exemplo ? (
                      <div className="rounded-xl border border-[#E8C77A] bg-[#FFF6DF] px-4 py-3">
                        <p className="text-[10.5px] font-bold uppercase tracking-[.12em] text-[#9A6B00]">{t.exemplo}</p>
                        <div className="mt-1.5 space-y-2.5 text-[15px] italic leading-[1.7] text-[#6B4A00]">
                          {x.split(/\n+/).map((par, j) => (
                            <p key={j}>“{par}”</p>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2.5 text-[16px] leading-[1.6]">
                        {x.split(/\n+/).map((par, j) => (
                          <p key={j}>{par}</p>
                        ))}
                      </div>
                    )
                  }
                />
              )}
              {(p.tela || lara) && (
                <Campo alvo={`parte:${p.id}:tela`} texto={p.tela ?? ""} vazio="o que aparece na tela" render={(x) => <Tela>{x}</Tela>} />
              )}
              <Midia bloco={`parte:${p.id}`} fotos={p.fotos} refs={p.refs} />
            </div>
          </div>
        ))}
      </div>
      {lara && (
        <div className="mt-3">
          <Adicionar onClick={() => enviar("item_add", { bloco: "parte:" })}>Adicionar parte</Adicionar>
        </div>
      )}

      {/* o que precisa estar pronto no set */}
      {(c.noSet || lara) && (
        <>
          <Titulo>{t.noSet}</Titulo>
          <div className="rounded-2xl border border-[var(--rt-linha)] bg-white px-5 py-4">
            <Campo
              alvo="geral:noSet"
              texto={c.noSet ?? ""}
              vazio="o que precisa estar pronto no set (um item por linha)"
              render={(x) => (
                <ul className="space-y-1.5 text-[14px] leading-relaxed">
                  {x.split(/\n+/).map((item, j) => (
                    <li key={j} className="flex gap-2">
                      <Check size={15} className="mt-[3px] shrink-0 text-[var(--rt-roxo)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            />
          </div>
        </>
      )}

      {/* referências gerais */}
      {(lara || (c.refs?.length ?? 0) > 0 || (c.fotos?.length ?? 0) > 0) && (
        <>
          <Titulo>
            {t.referencias} <span className="text-[var(--rt-muted)]">· {t.antesDeAprovar}</span>
          </Titulo>
          <Midia bloco="geral" fotos={c.fotos} refs={c.refs} vazio="Imagens e links que valem pro vídeo inteiro (tom, ritmo, cenário, edição)" />
        </>
      )}

      {/* aprovação: barra fixa com um roteiro, cartão no fim de cada um quando são vários */}
      {!c.semAprovacao && (
      <div
        className={
          c.escolhaUnica
            ? "mt-4"
            : varios
            ? "mt-8 rounded-2xl border border-[var(--rt-linha)] bg-white"
            : "fixed inset-x-0 bottom-0 z-40 border-t border-[var(--rt-linha)] bg-white/90 backdrop-blur"
        }
      >
        <div className={`mx-auto flex max-w-[880px] flex-wrap items-center gap-3 ${c.escolhaUnica ? "" : `px-4 py-3 ${varios ? "md:px-5" : "md:px-8"}`}`}>
          {erro && <p className="w-full text-[12.5px] font-semibold text-[#B4321F] md:w-auto">{erro}</p>}
          <p className="text-[12.5px] text-[var(--rt-muted)]">
            {sugestoes + comentarios === 0 ? (
              c.escolhaUnica ? "" : t.nenhumaAberta
            ) : (
              <>
                {sugestoes > 0 && <b className="text-[var(--rt-ink)]">{t.sugestoes(sugestoes)}</b>}
                {sugestoes > 0 && comentarios > 0 && " · "}
                {comentarios > 0 && <b className="text-[var(--rt-ink)]">{t.comentarios(comentarios)}</b>}
                {t.emAberto}
              </>
            )}
          </p>
          <div className={`flex flex-wrap items-center gap-2 ${c.escolhaUnica ? "w-full" : "ml-auto"}`}>
            {podeEscolher && !chave && (
              <button
                onClick={() => setAprovando(true)}
                className="w-full rounded-full bg-[#13703A] px-5 py-3.5 text-[16px] font-bold text-white"
              >
                {t.queroEsta(c.rotulo?.split(" · ")[0] ?? "")}
              </button>
            )}
            {roteiro.aprovado_em ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DDF5E6] px-4 py-2 text-[13px] font-bold text-[#13703A]">
                <CheckCircle2 size={16} /> {t.aprovadoPor(roteiro.aprovado_por ?? "")}
              </span>
            ) : outraEscolhida ? (
              <span className="text-[12.5px] text-[var(--rt-muted)]">{t.outraEscolhida(outraEscolhida)}</span>
            ) : chave ? (
              <span className="text-[12.5px] text-[var(--rt-muted)]">Aguardando a marca aprovar</span>
            ) : podeEscolher ? null : (
              <button
                onClick={() => setAprovando(true)}
                className="rounded-full bg-[var(--rt-ink)] px-5 py-2.5 text-[13.5px] font-bold text-white transition-transform hover:scale-[1.02]"
              >
                {varios ? (c.rotulo ? `${t.aprovar} ${c.rotulo.split(" · ")[0]}` : t.aprovarRoteiroN(n)) : t.aprovarRoteiro}
              </button>
            )}
          </div>
        </div>
      </div>
      )}

      {aprovando && (
        <Aprovar fechar={() => setAprovando(false)} gancho={letraEscolhida} temGanchos={c.ganchos.length > 1 && !c.ganchosTodos} opcoesGancho={c.escolhaUnica && !c.ganchosTodos ? c.ganchos : undefined} escolhidoId={roteiro.gancho_escolhido} pendentes={sugestoes} />
      )}
    </section>
  );
}

function Status({ roteiro }: { roteiro: RoteiroPublico }) {
  const { t, lingua } = useRoteiro();
  if (roteiro.aprovado_em)
    return (
      <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#DDF5E6] px-3 py-1 text-[12.5px] font-semibold text-[#13703A]">
        <CheckCircle2 size={14} /> {t.aprovadoPorEm(roteiro.aprovado_por ?? "", quando(roteiro.aprovado_em, lingua))}
      </p>
    );
  return (
    <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--rt-amarelo)] px-3 py-1 text-[12.5px] font-semibold text-[#7A5A00]">
      <span className="size-1.5 animate-pulse rounded-full bg-[#C99A00]" /> {t.emRevisao}
    </p>
  );
}

// Seletor de língua do topo. A tradução é pra revisar; o vídeo é gravado em português.
function Linguas({ linguas, atual, mudar }: { linguas: Lingua[]; atual: Lingua; mudar: (l: Lingua) => void }) {
  return (
    <div className="flex rounded-full border border-[var(--rt-linha)] bg-white p-0.5" role="group" aria-label="Idioma / Language">
      {linguas.map((l) => (
        <button
          key={l}
          onClick={() => mudar(l)}
          aria-pressed={l === atual}
          title={TEXTOS[l].nomeLingua}
          className={`rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-wide transition-colors ${
            l === atual ? "bg-[var(--rt-ink)] text-white" : "text-[var(--rt-muted)] hover:text-[var(--rt-ink)]"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

const ehOpcao = (r: RoteiroPublico) => /^op(ç|c)(ã|a)o\b/i.test(r.conteudo.rotulo ?? "");

type GrupoSecao = { nome: string; opcoes: number; total: number; aprovados: string[]; abertas: number; informativo: boolean };

/** Seções na ordem da página, com o que o quadrado de cada uma mostra. */
function secoesDe(roteiros: RoteiroPublico[], notas: Nota[][]): GrupoSecao[] {
  const out: GrupoSecao[] = [];
  roteiros.forEach((r, i) => {
    const nome = r.conteudo.secao;
    if (!nome) return;
    let g = out[out.length - 1];
    if (!g || g.nome !== nome) out.push((g = { nome, opcoes: 0, total: 0, aprovados: [], abertas: 0, informativo: true }));
    g.total++;
    if (ehOpcao(r)) g.opcoes++;
    if (!r.conteudo.semAprovacao) g.informativo = false;
    if (r.aprovado_em) g.aprovados.push((r.conteudo.rotulo ?? r.conteudo.titulo ?? "").split(" · ")[0]);
    g.abertas += notas[i].filter((n) => n.status === "aberta" && n.tipo !== "resposta").length;
  });
  return out;
}

// Um quadrado por seção (ex.: um por produto). Clicar abre a seção embaixo; clicar de novo fecha.
function Cartoes({ secoes, aberta, abrir, t }: { secoes: GrupoSecao[]; aberta: string | null; abrir: (s: string | null) => void; t: Textos }) {
  return (
    <div className="mt-6">
      <p className="text-[13px] text-[var(--rt-muted)]">{t.toqueNoQuadrado}</p>
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
        {secoes.map((g) => {
          const [num, ...resto] = g.nome.split(" · ");
          const numerado = /^\d+$/.test(num) && resto.length > 0;
          const ativo = g.nome === aberta;
          return (
            <button
              key={g.nome}
              onClick={() => abrir(ativo ? null : g.nome)}
              aria-expanded={ativo}
              className={`flex min-h-[132px] flex-col rounded-2xl border bg-white p-4 text-left transition-all md:p-5 ${
                ativo
                  ? "border-[var(--rt-roxo)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--rt-roxo)_18%,transparent)]"
                  : "border-[var(--rt-linha)] hover:-translate-y-0.5 hover:border-[var(--rt-roxo)]"
              }`}
            >
              {numerado && <span className="text-[22px] font-extrabold leading-none text-[var(--rt-roxo)]">{num}</span>}
              <span className={`text-[16px] font-bold leading-tight tracking-tight md:text-[18px] ${numerado ? "mt-2" : ""}`}>
                {numerado ? resto.join(" · ") : g.nome}
              </span>
              <span className="mt-auto pt-3 text-[12px] leading-snug text-[var(--rt-muted)]">
                {g.informativo
                  ? t.informativo
                  : g.opcoes > 1
                    ? t.opcoesN(g.opcoes)
                    : t.entregasN(g.total)}
                {g.aprovados.length > 0 ? (
                  <b className="mt-1 flex items-center gap-1 text-[#13703A]">
                    <CheckCircle2 size={13} /> {t.aprovadoLista(g.aprovados.join(", "))}
                  </b>
                ) : (
                  !g.informativo && <span className="block">{t.emRevisao}</span>
                )}
                {g.abertas > 0 && <span className="mt-0.5 block font-semibold text-[#9A6B00]">{t.comentarios(g.abertas)}</span>}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Ritmo real de fala da Lara (manual de roteiro): 3,74 palavras por segundo.
function segundosDeFala(texto: string) {
  return (texto.match(/[\p{L}\d]+/gu)?.length ?? 0) / 3.74;
}

function Titulo({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 mt-9 text-[12px] font-bold uppercase tracking-[.12em]">{children}</h2>;
}

function Tela({ children }: { children: React.ReactNode }) {
  const { t } = useRoteiro();
  return (
    <p className="text-[13px] leading-relaxed text-[var(--rt-muted)]">
      <b className="mr-1.5 font-semibold">{t.tela}</b>
      {children}
    </p>
  );
}




function Aprovar({
  fechar,
  gancho,
  temGanchos,
  opcoesGancho,
  escolhidoId,
  pendentes,
}: {
  fechar: () => void;
  gancho: string | null;
  temGanchos: boolean;
  /** escolha única: o gancho é escolhido aqui mesmo, antes de aprovar */
  opcoesGancho?: { id: string; fala: string }[];
  escolhidoId?: string | null;
  pendentes: number;
}) {
  const ctx = useRoteiro();
  const t = ctx.t;
  const [nome, setNome] = useState(ctx.nome);
  const [ok, setOk] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [ganchoId, setGanchoId] = useState(escolhidoId ?? null);
  const escolherAqui = (opcoesGancho?.length ?? 0) > 1;

  async function aprovar() {
    if (nome.trim() !== ctx.nome) ctx.setNome(nome.trim());
    setEnviando(true);
    if (escolherAqui && ganchoId !== escolhidoId && !(await ctx.enviar("gancho", { id: ganchoId, autor: nome.trim() }))) {
      setEnviando(false);
      return;
    }
    const res = await ctx.enviar("aprovar", { autor: nome.trim() });
    setEnviando(false);
    if (res) setOk(true);
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 backdrop-blur-sm" onClick={fechar}>
      <div className="max-h-[90dvh] w-full max-w-[420px] overflow-y-auto rounded-3xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
        {ok ? (
          <div className="text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#DDF5E6] text-[#13703A]">
              <Check size={28} />
            </div>
            <h3 className="mt-4 text-[22px] font-extrabold tracking-tight">{t.aprovadoTitulo}</h3>
            <p className="mt-2 text-[14px] text-[var(--rt-muted)]">{t.aprovadoMsg}</p>
            <button onClick={fechar} className="mt-5 rounded-full bg-[var(--rt-ink)] px-5 py-2.5 text-[13.5px] font-bold text-white">
              {t.fechar}
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-[22px] font-extrabold leading-tight tracking-tight">{escolherAqui ? t.qualGancho : t.aprovarTitulo}</h3>
            {escolherAqui && (
              <div className="mt-3 space-y-2">
                {opcoesGancho!.map((g, i) => (
                  <button
                    key={g.id}
                    onClick={() => setGanchoId(g.id)}
                    aria-pressed={ganchoId === g.id}
                    className={`flex w-full gap-3 rounded-2xl border-2 p-3.5 text-left text-[14.5px] leading-snug ${
                      ganchoId === g.id ? "border-[#13703A] bg-[#E9F6EE]" : "border-[var(--rt-linha)]"
                    }`}
                  >
                    <b className="text-[18px] leading-none text-[var(--rt-roxo)]">{i + 1}</b>
                    <span className="min-w-0 flex-1">“{g.fala}”</span>
                    {ganchoId === g.id && <Check size={18} className="shrink-0 text-[#13703A]" />}
                  </button>
                ))}
              </div>
            )}
            <ul className="mt-3 space-y-1.5 text-[13.5px] text-[var(--rt-muted)]">
              {temGanchos && !escolherAqui && (
                <li>• {t.ganchoLinha} {gancho ? <b className="text-[var(--rt-ink)]">{gancho}</b> : t.nenhumGancho}</li>
              )}
              {pendentes > 0 && <li>• {t.pendentes(pendentes)}</li>}
            </ul>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder={t.seuNome}
              className="mt-4 w-full rounded-xl border border-[var(--rt-linha)] px-3.5 py-2.5 text-[14px] outline-none focus:border-[var(--rt-roxo)]"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={fechar} className="rounded-full px-4 py-2 text-[13.5px] font-medium text-[var(--rt-muted)]">
                {t.voltar}
              </button>
              <button
                disabled={!nome.trim() || enviando || (escolherAqui && !ganchoId)}
                onClick={aprovar}
                className="rounded-full bg-[#13703A] px-5 py-2 text-[13.5px] font-bold text-white disabled:opacity-40"
              >
                {enviando ? t.aprovando : escolherAqui ? t.confirmarEscolha : t.aprovar}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function PedirNome({ responder, t }: { responder: (n: string | null) => void; t: Textos }) {
  const [nome, setNome] = useState("");
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 backdrop-blur-sm" onClick={() => responder(null)}>
      <form
        className="w-full max-w-[380px] rounded-3xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          if (nome.trim()) responder(nome.trim());
        }}
      >
        <h3 className="text-[20px] font-extrabold tracking-tight">{t.nomeTitulo}</h3>
        <p className="mt-1 text-[13.5px] text-[var(--rt-muted)]">{t.nomeDesc}</p>
        <input
          autoFocus
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder={t.seuNome}
          className="mt-4 w-full rounded-xl border border-[var(--rt-linha)] px-3.5 py-2.5 text-[14px] outline-none focus:border-[var(--rt-roxo)]"
        />
        <button disabled={!nome.trim()} className="mt-4 w-full rounded-full bg-[var(--rt-ink)] py-2.5 text-[13.5px] font-bold text-white disabled:opacity-40">
          {t.continuar}
        </button>
      </form>
    </div>
  );
}

/** Reduz a imagem no navegador pra caber no limite de upload (logo sai em PNG pra manter a transparência). */
async function reduzir(f: File, max = 1600, tipo = "image/jpeg"): Promise<Blob> {
  const img = await createImageBitmap(f);
  const escala = Math.min(1, max / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * escala);
  canvas.height = Math.round(img.height * escala);
  canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
  return new Promise((ok, falha) => canvas.toBlob((b) => (b ? ok(b) : falha(new Error("toBlob"))), tipo, 0.85));
}

function BarraLara({
  comoMarca,
  setComoMarca,
  cor,
  logo,
  enviar,
  subirLogo,
}: {
  comoMarca: boolean;
  setComoMarca: (v: boolean) => void;
  cor: string;
  logo?: string;
  enviar: (acao: string, dados?: Record<string, unknown>) => Promise<boolean>;
  subirLogo: (f: File) => Promise<void>;
}) {
  const [corLocal, setCorLocal] = useState(cor);
  const [subindo, setSubindo] = useState(false);
  return (
    <div className="sticky top-0 z-30 border-b border-black/10 bg-[var(--rt-ink)] px-4 py-2.5 text-[12.5px] text-white">
      <div className="mx-auto flex max-w-[880px] flex-wrap items-center gap-x-4 gap-y-2">
        <span className="font-bold">{comoMarca ? "Vendo como a marca" : "Modo Lara"}</span>
        {!comoMarca && (
          <>
            <label className="inline-flex cursor-pointer items-center gap-2">
              <span className="opacity-75">Cor da marca</span>
              <input
                type="color"
                value={corLocal}
                onChange={(e) => setCorLocal(e.target.value)}
                onBlur={() => corLocal !== cor && enviar("cor", { cor: corLocal })}
                className="size-6 cursor-pointer rounded border-0 bg-transparent p-0"
              />
            </label>
            <span className="inline-flex items-center gap-2">
              <span className="opacity-75">Logo</span>
              <label className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 font-semibold hover:bg-white/25">
                <ImagePlus size={13} /> {subindo ? "Subindo…" : logo ? "Trocar" : "Subir"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    e.target.value = "";
                    if (!f) return;
                    setSubindo(true);
                    await subirLogo(f);
                    setSubindo(false);
                  }}
                />
              </label>
              {logo && (
                <button onClick={() => confirm("Tirar a logo?") && enviar("logo_rm")} className="opacity-75 hover:opacity-100" aria-label="Tirar logo">
                  <X size={14} />
                </button>
              )}
            </span>
          </>
        )}
        <button
          onClick={() => setComoMarca(!comoMarca)}
          className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 font-semibold text-[var(--rt-ink)]"
        >
          <Eye size={13} /> {comoMarca ? "Voltar a editar" : "Ver como a marca"}
        </button>
      </div>
    </div>
  );
}

function Ordem({
  bloco,
  primeiro,
  ultimo,
  recomendado,
  podeTirar,
}: {
  bloco: string;
  primeiro: boolean;
  ultimo: boolean;
  recomendado?: boolean;
  podeTirar: boolean;
}) {
  const { enviar } = useRoteiro();
  const b = "grid size-7 place-items-center rounded-full text-[var(--rt-muted)] hover:bg-[var(--rt-fundo)] hover:text-[var(--rt-ink)] disabled:opacity-25";
  return (
    <div className="absolute right-3 top-3 z-10 flex items-center gap-0.5 rounded-full border border-[var(--rt-linha)] bg-white px-1 py-0.5 shadow-sm">
      <button className={b} disabled={primeiro} onClick={() => enviar("item_subir", { bloco })} aria-label="Subir" title="Subir">
        <ArrowUp size={14} />
      </button>
      <button className={b} disabled={ultimo} onClick={() => enviar("item_descer", { bloco })} aria-label="Descer" title="Descer">
        <ArrowDown size={14} />
      </button>
      {bloco.startsWith("gancho:") && (
        <button
          className={`${b} ${recomendado ? "text-[var(--rt-roxo)]" : ""}`}
          onClick={() => enviar("recomendar", { bloco })}
          aria-label="Recomendado"
          title={recomendado ? "Tirar recomendado" : "Marcar como recomendado"}
        >
          <Star size={14} fill={recomendado ? "currentColor" : "none"} />
        </button>
      )}
      {podeTirar && (
        <button
          className={`${b} hover:!text-[#B4321F]`}
          onClick={() => confirm("Apagar esse bloco do roteiro?") && enviar("item_rm", { bloco })}
          aria-label="Apagar"
          title="Apagar"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}

function Adicionar({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-dashed border-[var(--rt-roxo)]/50 py-3 text-[13px] font-semibold text-[var(--rt-roxo)] hover:bg-[var(--rt-lilas)]"
    >
      <Plus size={15} /> {children}
    </button>
  );
}
