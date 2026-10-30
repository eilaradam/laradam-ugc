"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Check, CheckCircle2, Eye, ImagePlus, Plus, Sparkles, Star, Trash2, X } from "lucide-react";
import { corDe, letraDoGancho, type Nota, type RoteiroPublico } from "@/lib/roteiro";
import { RoteiroCtx, quando, useRoteiro } from "./contexto";
import Campo from "./Campo";
import Midia from "./Midia";

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
  const [aprovando, setAprovando] = useState(false);
  // "Ver como a marca": a Lara esconde os próprios controles pra conferir a página.
  const [comoMarca, setComoMarca] = useState(false);
  const lara = Boolean(chave) && !comoMarca;
  const c = roteiro.conteudo;
  const cor = corDe(c);


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
      if (!chave && !autor) {
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
    [roteiro.slug, nome, chave, setNome]
  );

  const subirFotos = useCallback(
    async (bloco: string, arquivos: File[]) => {
      setErro(null);
      for (const f of arquivos) {
        try {
          const fd = new FormData();
          fd.append("k", chave ?? "");
          fd.append("bloco", bloco);
          const logo = bloco === "logo";
          fd.append("foto", await reduzir(f, logo ? 800 : 1600, logo ? "image/png" : "image/jpeg"), logo ? "logo.png" : "foto.jpg");
          const res = await fetch(`/api/roteiro/${roteiro.slug}/foto`, { method: "POST", body: fd });
          const j = await res.json();
          if (!res.ok) {
            setErro(j.error ?? "Não deu pra subir a foto");
            return;
          }
          setRoteiro(j.roteiro);
        } catch {
          setErro(`Não deu pra abrir ${f.name}. Tenta em JPG ou PNG.`);
          return;
        }
      }
    },
    [roteiro.slug, chave]
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

  const letraEscolhida = letraDoGancho(c, roteiro.gancho_escolhido);

  return (
    <RoteiroCtx.Provider value={{ nome, setNome, lara, notas, enviar, subirFotos }}>
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
            logo={c.logo}
            enviar={enviar}
            subirLogo={(f) => subirFotos("logo", [f])}
          />
        )}

        <div className="mx-auto max-w-[880px] px-4 pt-10 md:px-8 lg:pt-14">
          <main className="min-w-0">
            {/* cabeçalho */}
            {c.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.logo} alt={c.marca} className="h-9 w-auto max-w-[180px] object-contain object-left" />
            ) : (
              <p className="flex items-center gap-1 text-[13px] font-bold">
                {c.marca} <Sparkles size={13} className="text-[var(--rt-roxo)]" />
              </p>
            )}
            <Campo
              alvo="geral:titulo"
              texto={c.titulo ?? "Roteiro de vídeo"}
              multilinha={false}
              className="mt-3"
              render={(t) => <h1 className="text-[40px] font-extrabold leading-[1.02] tracking-[-0.035em] md:text-[56px]">{t}</h1>}
            />

            <Status roteiro={roteiro} />

            <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--rt-linha)] bg-[var(--rt-linha)] md:grid-cols-4">
              {(
                [
                  ["Creator", "creator", c.creator],
                  ["Marca", "marca", c.marca],
                  ["Formato", "formato", c.formato],
                  ["Duração", "duracao", c.duracao],
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
                      render={(t) => <p className="mt-1 text-[14px] font-semibold leading-snug">{t}</p>}
                    />
                  ) : (
                    <p className="mt-1 text-[14px] text-[var(--rt-muted)]">—</p>
                  )}
                </div>
              ))}
            </div>

            {(c.conceito || c.regra || lara) && (
              <div className="mt-5 space-y-3 rounded-2xl bg-[var(--rt-lilas)] px-5 py-4 text-[14.5px] leading-relaxed">
                {(c.conceito || lara) && (
                  <Campo
                    alvo="geral:conceito"
                    texto={c.conceito ?? ""}
                    vazio="a ideia do vídeo numa frase"
                    render={(t) => (
                      <p>
                        <b className="text-[var(--rt-roxo)]">Conceito</b> {t}
                      </p>
                    )}
                  />
                )}
                {(c.regra || lara) && (
                  <Campo
                    alvo="geral:regra"
                    texto={c.regra ?? ""}
                    vazio="o que não pode faltar (ou não pode aparecer)"
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
              <b className="text-[var(--rt-ink)]">sugerir uma mudança</b> ou <b className="text-[var(--rt-ink)]">comentar</b>.
              {c.ganchos.length > 1 && " Escolha o gancho que mais combina com a marca e,"} quando estiver tudo certo, aprove lá embaixo.
            </p>

            {/* ganchos */}
            <Titulo>
              {c.ganchos.length > 1 ? "Ganchos" : "Gancho"}{" "}
              {c.ganchos.length > 1 && <span className="text-[var(--rt-muted)]">· escolher um</span>}
            </Titulo>
            <div className="space-y-3">
              {c.ganchos.map((g, i) => {
                const escolhido = roteiro.gancho_escolhido === g.id;
                const letra = String.fromCharCode(65 + i);
                return (
                  <article
                    key={g.id}
                    className={`relative rounded-2xl border bg-white p-5 transition-shadow md:p-6 ${
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
                      <span className="text-[34px] font-extrabold leading-none text-[var(--rt-roxo)]">{letra}</span>
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2 pr-20">
                          {(g.titulo || lara) && (
                            <Campo
                              alvo={`gancho:${g.id}:titulo`}
                              texto={g.titulo}
                              multilinha={false}
                              vazio="nome do gancho"
                              render={(t) => <h3 className="text-[18px] font-bold tracking-tight">{t}</h3>}
                            />
                          )}
                          {g.recomendado && (
                            <span className="rounded-full bg-[var(--rt-lilas)] px-2 py-0.5 text-[11px] font-semibold text-[var(--rt-roxo)]">
                              recomendado
                            </span>
                          )}
                        </div>
                        {(g.fala || lara) && (
                          <Campo
                            alvo={`gancho:${g.id}:fala`}
                            texto={g.fala}
                            vazio="o que você fala nos primeiros segundos"
                            render={(t) => <p className="text-[15.5px] leading-relaxed">“{t}”</p>}
                          />
                        )}
                        {(g.tela || lara) && (
                          <Campo alvo={`gancho:${g.id}:tela`} texto={g.tela ?? ""} vazio="o que aparece na tela" render={(t) => <Tela>{t}</Tela>} />
                        )}
                        <Midia bloco={`gancho:${g.id}`} fotos={g.fotos} refs={g.refs} />
                        {c.ganchos.length > 1 && (
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
                              {escolhido ? "Gancho escolhido" : "Escolher este gancho"}
                            </button>
                            {escolhido && roteiro.gancho_escolhido_por && (
                              <span className="text-[11.5px] text-[var(--rt-muted)]">por {roteiro.gancho_escolhido_por}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
              {lara && <Adicionar onClick={() => enviar("item_add", { bloco: "gancho:" })}>Adicionar gancho</Adicionar>}
            </div>

            {/* roteiro */}
            <Titulo>
              Roteiro <span className="text-[var(--rt-muted)]">· depois do gancho</span>
            </Titulo>
            <div className="overflow-hidden rounded-2xl border border-[var(--rt-linha)] bg-white">
              {c.partes.map((p, i) => (
                <div
                  key={p.id}
                  className={`relative grid gap-3 px-5 py-5 md:grid-cols-[150px_minmax(0,1fr)] md:gap-6 md:px-6 ${i ? "border-t border-[var(--rt-linha)]" : ""}`}
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
                      render={(t) => <p className="text-[15px] font-bold text-[var(--rt-roxo)]">{t}</p>}
                    />
                    {(p.tempo || lara) && (
                      <Campo
                        alvo={`parte:${p.id}:tempo`}
                        texto={p.tempo ?? ""}
                        multilinha={false}
                        vazio="0:00"
                        render={(t) => <p className="mt-0.5 text-[12px] tabular-nums text-[var(--rt-muted)]">{t}</p>}
                      />
                    )}
                  </div>
                  <div className="min-w-0 space-y-2.5 md:pr-16">
                    {(p.fala || lara) && (
                      <Campo
                        alvo={`parte:${p.id}:fala`}
                        texto={p.fala}
                        vazio="o que você fala nessa parte"
                        render={(t) => (
                          <div className="space-y-2.5 text-[15px] leading-[1.7]">
                            {t.split(/\n+/).map((par, j) => (
                              <p key={j}>{par}</p>
                            ))}
                          </div>
                        )}
                      />
                    )}
                    {(p.tela || lara) && (
                      <Campo alvo={`parte:${p.id}:tela`} texto={p.tela ?? ""} vazio="o que aparece na tela" render={(t) => <Tela>{t}</Tela>} />
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

            {/* referências gerais */}
            {(lara || (c.refs?.length ?? 0) > 0 || (c.fotos?.length ?? 0) > 0) && (
              <>
                <Titulo>
                  Referências <span className="text-[var(--rt-muted)]">· pra ver antes de aprovar</span>
                </Titulo>
                <Midia bloco="geral" fotos={c.fotos} refs={c.refs} vazio="Imagens e links que valem pro vídeo inteiro (tom, ritmo, cenário, edição)" />
              </>
            )}
          </main>
        </div>

        {/* barra de aprovação */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--rt-linha)] bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-[880px] flex-wrap items-center gap-3 px-4 py-3 md:px-8">
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
              ) : chave ? (
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

        {aprovando && (
          <Aprovar fechar={() => setAprovando(false)} gancho={letraEscolhida} temGanchos={c.ganchos.length > 1} pendentes={sugestoes} />
        )}
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




function Aprovar({
  fechar,
  gancho,
  temGanchos,
  pendentes,
}: {
  fechar: () => void;
  gancho: string | null;
  temGanchos: boolean;
  pendentes: number;
}) {
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
              {temGanchos && (
                <li>• Gancho: {gancho ? <b className="text-[var(--rt-ink)]">{gancho}</b> : "nenhum escolhido (a Lara usa o recomendado)"}</li>
              )}
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
