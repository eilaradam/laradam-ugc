"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, CheckCircle2, Play, Sparkles, X } from "lucide-react";
import type { Exemplo, Nota, RoteiroPublico } from "@/lib/roteiro";
import { RoteiroCtx, quando, useRoteiro } from "./contexto";
import Campo from "./Campo";
import Celular from "./Celular";

type Props = { inicial: RoteiroPublico; notasIniciais: Nota[]; chave?: string };

const CHAVE_NOME = "roteiro:nome";

export default function RoteiroPage({ inicial, notasIniciais, chave }: Props) {
  const [roteiro, setRoteiro] = useState(inicial);
  const [notas, setNotas] = useState(notasIniciais);
  const [nome, setNomeState] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return localStorage.getItem(CHAVE_NOME) ?? "";
    } catch {
      return "";
    }
  });
  const [erro, setErro] = useState<string | null>(null);
  const [exemplo, setExemplo] = useState<Exemplo | null>(null);
  const [aprovando, setAprovando] = useState(false);
  const lara = Boolean(chave);
  const c = roteiro.conteudo;

  const recomendado = c.ganchos.find((g) => g.recomendado)?.id ?? c.ganchos[0]?.id ?? "";
  const [previa, setPrevia] = useState(roteiro.gancho_escolhido ?? recomendado);

  const setNome = useCallback((n: string) => {
    setNomeState(n);
    try {
      localStorage.setItem(CHAVE_NOME, n);
    } catch {}
  }, []);

  // Sem nome ainda: abre a caixinha de nome e só manda depois.
  const [pedirNome, setPedirNome] = useState<null | ((n: string | null) => void)>(null);

  const enviar = useCallback(
    async (acao: string, dados: Record<string, unknown> = {}) => {
      setErro(null);
      let autor = (dados.autor as string | undefined) ?? nome;
      if (!lara && !autor) {
        const n = await new Promise<string | null>((resolve) => setPedirNome(() => resolve));
        setPedirNome(null);
        if (!n) return false;
        setNome(n);
        autor = n;
      }
      try {
        const res = await fetch(`/api/roteiro/${roteiro.slug}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ acao, k: chave, ...dados, autor }),
        });
        const j = await res.json();
        if (!res.ok) {
          setErro(j.error ?? "Não deu certo, tenta de novo");
          return false;
        }
        setRoteiro(j.roteiro);
        setNotas(j.notas);
        return true;
      } catch {
        setErro("Sem conexão. Tenta de novo.");
        return false;
      }
    },
    [roteiro.slug, nome, chave, lara, setNome]
  );

  // Atualiza quando a aba volta pro foco (a Lara pode ter respondido).
  useEffect(() => {
    const atualizar = async () => {
      if (document.visibilityState !== "visible") return;
      const res = await fetch(`/api/roteiro/${roteiro.slug}`);
      if (!res.ok) return;
      const j = await res.json();
      setRoteiro(j.roteiro);
      setNotas(j.notas);
    };
    document.addEventListener("visibilitychange", atualizar);
    return () => document.removeEventListener("visibilitychange", atualizar);
  }, [roteiro.slug]);

  const abertas = notas.filter((n) => n.status === "aberta" && n.tipo !== "resposta");
  const sugestoes = abertas.filter((n) => n.tipo === "sugestao").length;
  const comentarios = abertas.length - sugestoes;
  const exemplos = [
    ...c.ganchos.flatMap((g) => (g.exemplo ? [g.exemplo] : [])),
    ...c.partes.flatMap((p) => (p.exemplo ? [p.exemplo] : [])),
    ...(c.exemplos ?? []),
  ];

  return (
    <RoteiroCtx.Provider value={{ nome, setNome, lara, notas, enviar, abrirExemplo: setExemplo }}>
      <div
        className="rt min-h-screen bg-[var(--rt-fundo)] pb-32 text-[var(--rt-ink)]"
        style={{ fontFamily: "var(--rt-font), system-ui, sans-serif" }}
      >
        {lara && (
          <div className="sticky top-0 z-30 bg-[var(--rt-roxo)] px-4 py-2 text-center text-[12.5px] font-semibold text-white">
            Modo Lara · você pode aceitar ou recusar sugestões e resolver comentários
          </div>
        )}

        <div className="mx-auto grid max-w-[1180px] gap-10 px-4 pt-10 md:px-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:pt-16">
          <main className="min-w-0">
            {/* cabeçalho */}
            <p className="flex items-center gap-1 text-[13px] font-bold">
              {c.marca} <Sparkles size={13} className="text-[var(--rt-roxo)]" />
            </p>
            <h1 className="mt-3 text-[40px] font-extrabold leading-[1.02] tracking-[-0.035em] md:text-[56px]">Roteiro de vídeo</h1>

            <Status roteiro={roteiro} />

            <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--rt-linha)] bg-[var(--rt-linha)] md:grid-cols-4">
              {[
                ["Creator", c.creator],
                ["Marca", c.marca],
                ["Formato", c.formato],
                ["Duração", c.duracao],
              ].map(([k, v]) => (
                <div key={k} className="bg-white px-4 py-3.5">
                  <p className="text-[10.5px] font-bold uppercase tracking-[.12em] text-[var(--rt-muted)]">{k}</p>
                  <p className="mt-1 text-[14px] font-semibold leading-snug">{v}</p>
                </div>
              ))}
            </div>

            {(c.conceito || c.regra) && (
              <div className="mt-5 space-y-3 rounded-2xl bg-[var(--rt-lilas)] px-5 py-4 text-[14.5px] leading-relaxed">
                {c.conceito && (
                  <Campo
                    alvo="geral:conceito"
                    texto={c.conceito}
                    render={(t) => (
                      <p>
                        <b className="text-[var(--rt-roxo)]">Conceito</b> {t}
                      </p>
                    )}
                  />
                )}
                {c.regra && (
                  <Campo
                    alvo="geral:regra"
                    texto={c.regra}
                    render={(t) => (
                      <p>
                        <b className="text-[var(--rt-roxo)]">Regra principal</b> {t}
                      </p>
                    )}
                  />
                )}
              </div>
            )}

            <p className="mt-5 rounded-xl border border-dashed border-[var(--rt-linha)] px-4 py-3 text-[13px] leading-relaxed text-[var(--rt-muted)]">
              <b className="text-[var(--rt-ink)]">Como revisar:</b> passe o mouse (ou toque) em qualquer texto pra{" "}
              <b className="text-[var(--rt-ink)]">sugerir uma mudança</b> ou <b className="text-[var(--rt-ink)]">comentar</b>. Escolha o
              gancho que mais combina com a marca e, quando estiver tudo certo, aprove lá embaixo.
            </p>

            {/* ganchos */}
            <Titulo>
              Ganchos <span className="text-[var(--rt-muted)]">· escolher um (0:00 a 0:07)</span>
            </Titulo>
            <div className="space-y-3">
              {c.ganchos.map((g) => {
                const escolhido = roteiro.gancho_escolhido === g.id;
                return (
                  <article
                    key={g.id}
                    className={`relative rounded-2xl border bg-white p-5 transition-shadow md:p-6 ${
                      escolhido ? "border-[var(--rt-roxo)] shadow-[0_0_0_3px_rgba(91,61,245,.18)]" : "border-[var(--rt-linha)]"
                    }`}
                  >
                    <div className="flex gap-4 md:gap-5">
                      <span className="text-[34px] font-extrabold leading-none text-[var(--rt-roxo)]">{g.id}</span>
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <Campo
                            alvo={`gancho:${g.id}:titulo`}
                            texto={g.titulo}
                            multilinha={false}
                            render={(t) => <h3 className="text-[18px] font-bold tracking-tight">{t}</h3>}
                          />
                          {g.recomendado && (
                            <span className="rounded-full bg-[var(--rt-lilas)] px-2 py-0.5 text-[11px] font-semibold text-[var(--rt-roxo)]">
                              recomendado
                            </span>
                          )}
                        </div>
                        <Campo alvo={`gancho:${g.id}:fala`} texto={g.fala} render={(t) => <p className="text-[15.5px] leading-relaxed">“{t}”</p>} />
                        {g.tela && <Campo alvo={`gancho:${g.id}:tela`} texto={g.tela} render={(t) => <Tela>{t}</Tela>} />}
                        <div className="flex flex-wrap items-center gap-2 pt-2">
                          <button
                            onClick={() => enviar("gancho", { id: g.id }).then((ok) => ok && setPrevia(g.id))}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${
                              escolhido
                                ? "bg-[var(--rt-roxo)] text-white"
                                : "border border-[var(--rt-linha)] hover:border-[var(--rt-roxo)] hover:text-[var(--rt-roxo)]"
                            }`}
                          >
                            {escolhido && <Check size={13} />}
                            {escolhido ? "Gancho escolhido" : "Escolher este gancho"}
                          </button>
                          <button
                            onClick={() => {
                              setPrevia(g.id);
                              document.getElementById("previa")?.scrollIntoView({ behavior: "smooth", block: "center" });
                            }}
                            className="rounded-full px-3 py-1.5 text-[12.5px] font-medium text-[var(--rt-muted)] hover:text-[var(--rt-ink)]"
                          >
                            Ver no celular
                          </button>
                          {g.exemplo && <BotaoExemplo e={g.exemplo} onClick={() => setExemplo(g.exemplo!)} />}
                          {escolhido && roteiro.gancho_escolhido_por && (
                            <span className="text-[11.5px] text-[var(--rt-muted)]">por {roteiro.gancho_escolhido_por}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* prévia no celular (celular e tablet) */}
            <section className="mt-12 lg:hidden">
              <Titulo>Como fica postado</Titulo>
              <SeletorGancho ganchos={c.ganchos.map((g) => g.id)} atual={previa} onChange={setPrevia} />
              <div className="mt-4">
                <Celular key={previa} conteudo={c} gancho={previa} />
              </div>
            </section>

            {/* roteiro */}
            <Titulo>
              Roteiro <span className="text-[var(--rt-muted)]">· depois do gancho</span>
            </Titulo>
            <div className="overflow-hidden rounded-2xl border border-[var(--rt-linha)] bg-white">
              {c.partes.map((p, i) => (
                <div
                  key={p.id}
                  className={`grid gap-3 px-5 py-5 md:grid-cols-[150px_minmax(0,1fr)] md:gap-6 md:px-6 ${i ? "border-t border-[var(--rt-linha)]" : ""}`}
                >
                  <div>
                    <Campo
                      alvo={`parte:${p.id}:nome`}
                      texto={p.nome}
                      multilinha={false}
                      render={(t) => <p className="text-[15px] font-bold text-[var(--rt-roxo)]">{t}</p>}
                    />
                    {p.tempo && <p className="mt-0.5 text-[12px] tabular-nums text-[var(--rt-muted)]">{p.tempo}</p>}
                  </div>
                  <div className="min-w-0 space-y-2.5">
                    <Campo
                      alvo={`parte:${p.id}:fala`}
                      texto={p.fala}
                      render={(t) => (
                        <div className="space-y-2.5 text-[15px] leading-[1.7]">
                          {t.split(/\n+/).map((par, j) => (
                            <p key={j}>{par}</p>
                          ))}
                        </div>
                      )}
                    />
                    {p.tela && <Campo alvo={`parte:${p.id}:tela`} texto={p.tela} render={(t) => <Tela>{t}</Tela>} />}
                    {p.exemplo && <BotaoExemplo e={p.exemplo} onClick={() => setExemplo(p.exemplo!)} />}
                  </div>
                </div>
              ))}
            </div>

            {/* referências */}
            {exemplos.length > 0 && (
              <>
                <Titulo>
                  Referências <span className="text-[var(--rt-muted)]">· vídeos meus nesse estilo</span>
                </Titulo>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {exemplos.map((e, i) => (
                    <button key={i} onClick={() => setExemplo(e)} className="group text-left">
                      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-[var(--rt-ink)]">
                        {e.youtube ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={`https://i.ytimg.com/vi/${e.youtube}/oar2.jpg`}
                            onError={(ev) => (ev.currentTarget.src = `https://i.ytimg.com/vi/${e.youtube}/hqdefault.jpg`)}
                            alt=""
                            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          />
                        ) : (
                          e.mp4 && <video src={`${e.mp4}#t=0.5`} muted playsInline preload="metadata" className="size-full object-cover" />
                        )}
                        <span className="absolute inset-0 grid place-items-center">
                          <span className="grid size-12 place-items-center rounded-full bg-white/90 text-[var(--rt-ink)] shadow-lg">
                            <Play size={18} fill="currentColor" />
                          </span>
                        </span>
                      </div>
                      <p className="mt-2 text-[13.5px] font-semibold">{e.titulo}</p>
                      {e.nota && <p className="text-[12.5px] leading-snug text-[var(--rt-muted)]">{e.nota}</p>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </main>

          {/* prévia fixa (computador) */}
          <aside id="previa" className="hidden lg:block">
            <div className="sticky top-10">
              <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[.14em] text-[var(--rt-muted)]">Como fica postado</p>
              <SeletorGancho ganchos={c.ganchos.map((g) => g.id)} atual={previa} onChange={setPrevia} />
              <div className="mt-4">
                <Celular key={previa} conteudo={c} gancho={previa} />
              </div>
            </div>
          </aside>
        </div>

        {/* barra de aprovação */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--rt-linha)] bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-3 px-4 py-3 md:px-8">
            {erro && (
              <p className="w-full text-[12.5px] font-semibold text-[#B4321F] md:w-auto">
                {erro}
              </p>
            )}
            <p className="text-[12.5px] text-[var(--rt-muted)]">
              {sugestoes + comentarios === 0 ? (
                "Nenhuma sugestão em aberto"
              ) : (
                <>
                  {sugestoes > 0 && <b className="text-[var(--rt-ink)]">{sugestoes} sugest{sugestoes > 1 ? "ões" : "ão"}</b>}
                  {sugestoes > 0 && comentarios > 0 && " · "}
                  {comentarios > 0 && <b className="text-[var(--rt-ink)]">{comentarios} comentário{comentarios > 1 ? "s" : ""}</b>}
                  {" em aberto"}
                </>
              )}
            </p>
            <div className="ml-auto flex items-center gap-2">
              {roteiro.aprovado_em ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DDF5E6] px-4 py-2 text-[13px] font-bold text-[#13703A]">
                  <CheckCircle2 size={16} /> Aprovado por {roteiro.aprovado_por}
                </span>
              ) : lara ? (
                <span className="text-[12.5px] text-[var(--rt-muted)]">Aguardando a marca aprovar</span>
              ) : (
                <button
                  onClick={() => setAprovando(true)}
                  className="rounded-full bg-[var(--rt-ink)] px-5 py-2.5 text-[13.5px] font-bold text-white transition-transform hover:scale-[1.02]"
                >
                  Aprovar roteiro
                </button>
              )}
            </div>
          </div>
        </div>

        {aprovando && <Aprovar fechar={() => setAprovando(false)} gancho={roteiro.gancho_escolhido} pendentes={sugestoes} />}
        {exemplo && <ModalExemplo e={exemplo} fechar={() => setExemplo(null)} />}
        {pedirNome && <PedirNome responder={pedirNome} />}
      </div>
    </RoteiroCtx.Provider>
  );
}

function Status({ roteiro }: { roteiro: RoteiroPublico }) {
  if (roteiro.aprovado_em)
    return (
      <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#DDF5E6] px-3 py-1 text-[12.5px] font-semibold text-[#13703A]">
        <CheckCircle2 size={14} /> Aprovado por {roteiro.aprovado_por} em {quando(roteiro.aprovado_em)}
      </p>
    );
  return (
    <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--rt-amarelo)] px-3 py-1 text-[12.5px] font-semibold text-[#7A5A00]">
      <span className="size-1.5 animate-pulse rounded-full bg-[#C99A00]" /> Em revisão
    </p>
  );
}

function Titulo({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 mt-12 text-[12px] font-bold uppercase tracking-[.12em]">{children}</h2>;
}

function Tela({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] leading-relaxed text-[var(--rt-muted)]">
      <b className="mr-1.5 text-[var(--rt-roxo)]">Tela</b>
      {children}
    </p>
  );
}

function SeletorGancho({ ganchos, atual, onChange }: { ganchos: string[]; atual: string; onChange: (g: string) => void }) {
  if (ganchos.length < 2) return null;
  return (
    <div className="flex justify-center gap-1.5">
      {ganchos.map((g) => (
        <button
          key={g}
          onClick={() => onChange(g)}
          className={`rounded-full px-3 py-1 text-[12px] font-bold ${
            g === atual ? "bg-[var(--rt-roxo)] text-white" : "border border-[var(--rt-linha)] bg-white text-[var(--rt-muted)]"
          }`}
        >
          Gancho {g}
        </button>
      ))}
    </div>
  );
}

function BotaoExemplo({ e, onClick }: { e: Exemplo; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full bg-[var(--rt-lilas)] px-3 py-1.5 text-[12px] font-semibold text-[var(--rt-roxo)]"
    >
      <Play size={11} fill="currentColor" /> Exemplo: {e.titulo}
    </button>
  );
}

function ModalExemplo({ e, fechar }: { e: Exemplo; fechar: () => void }) {
  useEffect(() => {
    const esc = (ev: KeyboardEvent) => ev.key === "Escape" && fechar();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [fechar]);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4 backdrop-blur-sm" onClick={fechar}>
      <div className="relative w-full max-w-[360px]" onClick={(ev) => ev.stopPropagation()}>
        <button onClick={fechar} className="absolute -top-11 right-0 grid size-9 place-items-center rounded-full bg-white/15 text-white" aria-label="Fechar">
          <X size={18} />
        </button>
        <div className="aspect-[9/16] overflow-hidden rounded-3xl bg-black">
          {e.youtube ? (
            <iframe
              src={`https://www.youtube.com/embed/${e.youtube}?autoplay=1&playsinline=1&rel=0`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="size-full"
            />
          ) : (
            <video src={e.mp4} autoPlay controls playsInline className="size-full object-cover" />
          )}
        </div>
        <p className="mt-3 text-[14px] font-semibold text-white">{e.titulo}</p>
        {e.nota && <p className="text-[13px] text-white/70">{e.nota}</p>}
      </div>
    </div>
  );
}

function Aprovar({ fechar, gancho, pendentes }: { fechar: () => void; gancho: string | null; pendentes: number }) {
  const ctx = useRoteiro();
  const [nome, setNome] = useState(ctx.nome);
  const [ok, setOk] = useState(false);
  const [enviando, setEnviando] = useState(false);

  async function aprovar() {
    if (nome.trim() !== ctx.nome) ctx.setNome(nome.trim());
    setEnviando(true);
    const res = await ctx.enviar("aprovar", { autor: nome.trim() });
    setEnviando(false);
    if (res) setOk(true);
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 backdrop-blur-sm" onClick={fechar}>
      <div className="w-full max-w-[420px] rounded-3xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
        {ok ? (
          <div className="text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#DDF5E6] text-[#13703A]">
              <Check size={28} />
            </div>
            <h3 className="mt-4 text-[22px] font-extrabold tracking-tight">Roteiro aprovado!</h3>
            <p className="mt-2 text-[14px] text-[var(--rt-muted)]">A Lara já recebeu o aviso e vai começar a gravar. 🎬</p>
            <button onClick={fechar} className="mt-5 rounded-full bg-[var(--rt-ink)] px-5 py-2.5 text-[13.5px] font-bold text-white">
              Fechar
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-[22px] font-extrabold tracking-tight">Aprovar o roteiro?</h3>
            <ul className="mt-3 space-y-1.5 text-[13.5px] text-[var(--rt-muted)]">
              <li>• Gancho: {gancho ? <b className="text-[var(--rt-ink)]">{gancho}</b> : "nenhum escolhido (a Lara usa o recomendado)"}</li>
              {pendentes > 0 && <li>• As {pendentes} sugestões em aberto vão junto, pra Lara aplicar</li>}
            </ul>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              className="mt-4 w-full rounded-xl border border-[var(--rt-linha)] px-3.5 py-2.5 text-[14px] outline-none focus:border-[var(--rt-roxo)]"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={fechar} className="rounded-full px-4 py-2 text-[13.5px] font-medium text-[var(--rt-muted)]">
                Voltar
              </button>
              <button
                disabled={!nome.trim() || enviando}
                onClick={aprovar}
                className="rounded-full bg-[#13703A] px-5 py-2 text-[13.5px] font-bold text-white disabled:opacity-40"
              >
                {enviando ? "Aprovando…" : "Aprovar"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function PedirNome({ responder }: { responder: (n: string | null) => void }) {
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
        <h3 className="text-[20px] font-extrabold tracking-tight">Como posso te chamar?</h3>
        <p className="mt-1 text-[13.5px] text-[var(--rt-muted)]">Seu nome aparece junto das sugestões e comentários.</p>
        <input
          autoFocus
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome"
          className="mt-4 w-full rounded-xl border border-[var(--rt-linha)] px-3.5 py-2.5 text-[14px] outline-none focus:border-[var(--rt-roxo)]"
        />
        <button disabled={!nome.trim()} className="mt-4 w-full rounded-full bg-[var(--rt-ink)] py-2.5 text-[13.5px] font-bold text-white disabled:opacity-40">
          Continuar
        </button>
      </form>
    </div>
  );
}
