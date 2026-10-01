"use client";

import { Check, MessageCircle, Mail, ArrowUpRight, Rows3, LayoutGrid, AlignLeft, Calendar, Film, Users, GripVertical } from "lucide-react";
import { VIDEOS } from "@/data/content";
import VideoCard from "@/components/VideoCard";

// Página de proposta pra UMA marca, montada só a partir de um arquivo de dados
// (src/data/propostas/<cliente>.ts). Mesma identidade do site: creme, navy e teal.
export type Proposta = {
  slug: string;
  eyebrow: string;
  cliente: string;
  titulo: string;
  subtitulo: string;
  destaques: { rotulo: string; valor: string }[];
  sobre: string;
  opcoesTitulo?: string;
  opcoes: {
    nome: string;
    tipo: string;
    valor: string;
    descricao: string;
    inclui: string[];
    destaque?: boolean;
    badge?: string;
    economia?: string;
    /** Bloco destacado no rodapé do próprio card (ex. preço com contrato de permanência). */
    contratoFixo?: { titulo: string; valor: string; economia: string };
  }[];
  notaOpcoes?: string;
  /** Linha discreta abaixo da notaOpcoes, sem card (ex. oferta de teste menor). */
  notaExtra?: string;
  extra?: { nome: string; valor: string; descricao: string; condicao?: string };
  incluso: string[];
  /** Bloco curto e discreto logo depois de "O que está incluso". */
  responsabilidadesMarca?: { titulo: string; itens: string[] };
  // Referência de vídeo: ou `id` (puxa do portfólio da Lara em content.ts),
  // ou `video` inline (pra mostrar trabalho de outras creators da rede, ex. conteúdos da /agencia).
  referenciasTitulo?: string;
  referenciasIntro?: string;
  referencias: (
    | { id: string; porque: string }
    | { video: { brand: string; titulo?: string; youtubeId?: string; instagram?: string; thumbnail?: string; videoLocal?: string }; porque: string }
  )[];
  /** Prévia de exemplo (dados de demonstração) do painel de acompanhamento, no estilo da planilha do agencia.laradam.com. */
  painel?: {
    titulo: string;
    sub: string;
    /** Contagem mostrada na barra (tamanho real da campanha). Sem isso, usa o nº de linhas do exemplo. */
    videosQtd?: number;
    creatorsQtd?: number;
    linhas: { nome: string; cidade: string; status: string }[];
  };
  cronograma: { etapa: string; quando: string }[];
  cronogramaNota?: string;
  pagamento: string;
  proximoPasso: string;
  whatsapp: string;
  whatsappMensagem: string;
  email: string;
  /** Bloco final. Sem isso, entra o texto neutro padrão. */
  chamada?: { titulo: string; destaque: string; texto: string };
  /** Linha de assinatura no rodapé. Sem isso, usa o texto padrão (perfil de creator). */
  assinatura?: string;
};

const CHAMADA_PADRAO = {
  titulo: "Vamos alinhar os",
  destaque: "próximos passos",
  texto: "Qualquer dúvida sobre a proposta, é só me chamar. Com o descritivo em mãos, fecho o roteiro e mando pra aprovação.",
};

function Eyebrow({ n, children, dark }: { n: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className={
        "mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] font-semibold " +
        (dark ? "text-accent-on-dark" : "text-primary")
      }
    >
      <span className={"font-serif-accent italic normal-case tracking-normal text-base " + (dark ? "text-accent-on-dark/70" : "text-primary/70")}>{n}</span>
      <span className={"h-px w-8 " + (dark ? "bg-accent-on-dark/50" : "bg-primary/40")} />
      {children}
    </div>
  );
}

const AVATAR_CORES = ["bg-primary", "bg-foreground", "bg-accent-on-dark"];

function AvatarIniciais({ nome, i }: { nome: string; i: number }) {
  const numerico = nome.match(/^Creator\s+(\d+)$/i);
  const iniciais = numerico
    ? numerico[1]
    : nome
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0]!.toUpperCase())
        .join("");
  const cor = AVATAR_CORES[i % AVATAR_CORES.length];
  const texto = cor === "bg-accent-on-dark" ? "text-foreground" : "text-background";
  return (
    <span className={"flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold " + cor + " " + texto}>
      {iniciais}
    </span>
  );
}

function corStatus(status: string) {
  const s = status.toLowerCase();
  if (s.includes("aprovado") || s.includes("entregue")) return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (s.includes("gravação") || s.includes("revisão") || s.includes("andamento")) return "border-amber-200 bg-amber-50 text-amber-700";
  return "border-border bg-background-alt text-foreground-soft";
}

export default function PropostaPage({ p }: { p: Proposta }) {
  const zap = `https://wa.me/${p.whatsapp}?text=${encodeURIComponent(p.whatsappMensagem)}`;
  const refs = p.referencias
    .map((r, i) => {
      if ("id" in r) return { video: VIDEOS.find((v) => v.id === r.id), porque: r.porque };
      const vv = r.video;
      return {
        video: {
          id: `ref-${i}-${vv.instagram || vv.youtubeId || vv.brand}`,
          title: vv.titulo || vv.brand,
          category: "",
          brand: vv.brand,
          youtubeId: vv.youtubeId,
          instagram: vv.instagram,
          thumbnail: vv.thumbnail,
          videoLocal: vv.videoLocal,
        },
        porque: r.porque,
      };
    })
    .filter((r) => !!r.video);

  let secaoAtual = 0;
  const secao = () => String(++secaoAtual).padStart(2, "0");

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* barra */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="/" className="font-display text-lg font-black tracking-tight">
            LARA DAM<span className="text-primary">.</span>
          </a>
          <a
            href={zap}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-primary"
          >
            <MessageCircle size={16} /> Falar no WhatsApp
          </a>
        </div>
      </header>

      {/* capa */}
      <section className="mx-auto max-w-5xl px-6 pt-14 pb-10 md:pt-20 md:pb-14">
        <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold">{p.eyebrow}</div>
        <div className="mt-4 font-serif-accent italic text-2xl text-foreground-soft md:text-3xl">{p.cliente}</div>
        <h1 className="mt-2 font-display text-4xl font-black leading-[0.95] tracking-tighter md:text-6xl">
          {p.titulo}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-soft">{p.subtitulo}</p>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {p.destaques.map((d) => (
            <div key={d.rotulo} className="rounded-2xl border border-border bg-background-alt px-5 py-4">
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted font-semibold">{d.rotulo}</div>
              <div className="mt-1 font-display text-2xl font-bold text-foreground">{d.valor}</div>
            </div>
          ))}
        </div>
      </section>

      {/* sobre */}
      <section className="mx-auto max-w-5xl px-6 py-10 md:py-14">
        <Eyebrow n={secao()}>Sobre a campanha</Eyebrow>
        <p className="max-w-3xl text-lg leading-relaxed">{p.sobre}</p>
      </section>

      {/* opções */}
      <section className="bg-background-alt">
        <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <Eyebrow n={secao()}>{p.opcoesTitulo || "Opções de vídeo"}</Eyebrow>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {p.opcoes.map((o) => (
              <div
                key={o.nome}
                className={
                  "relative rounded-3xl border p-7 md:p-8 " +
                  (o.destaque ? "border-primary bg-foreground text-background shadow-xl" : "border-border bg-background")
                }
              >
                {o.destaque && (
                  <span className="absolute -top-3 left-7 rounded-full bg-accent-on-dark px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">
                    {o.badge || "Mais alcance"}
                  </span>
                )}
                <div className={"text-[11px] uppercase tracking-[0.25em] font-semibold " + (o.destaque ? "text-accent-on-dark" : "text-primary")}>
                  {o.nome} · {o.tipo}
                </div>
                <div className="mt-3 font-display text-4xl font-black tracking-tight">{o.valor}</div>
                <p className={"mt-4 leading-relaxed " + (o.destaque ? "text-background/85" : "text-foreground-soft")}>{o.descricao}</p>
                <ul className="mt-5 space-y-2">
                  {o.inclui.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check size={16} className={"mt-0.5 flex-shrink-0 " + (o.destaque ? "text-accent-on-dark" : "text-primary")} />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
                {o.economia && (
                  <p className={"mt-5 text-sm font-bold " + (o.destaque ? "text-accent-on-dark" : "text-primary")}>{o.economia}</p>
                )}
                {o.contratoFixo && (
                  <div
                    className={
                      "mt-5 rounded-xl border px-4 py-3 " +
                      (o.destaque ? "border-background/20 bg-background/10" : "border-primary/20 bg-primary-light")
                    }
                  >
                    <div className={"text-[10px] font-bold uppercase tracking-[0.15em] " + (o.destaque ? "text-accent-on-dark" : "text-primary")}>
                      {o.contratoFixo.titulo}
                    </div>
                    <div className="mt-1 font-semibold">{o.contratoFixo.valor}</div>
                    <div className={"text-sm " + (o.destaque ? "text-background/70" : "text-foreground-soft")}>{o.contratoFixo.economia}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {p.notaOpcoes && <p className="mt-6 max-w-3xl text-sm text-foreground-soft">{p.notaOpcoes}</p>}
          {p.notaExtra && (
            <div className="mt-4 inline-flex max-w-3xl items-center gap-2 rounded-full border border-primary/30 bg-primary-light px-4 py-2.5 text-sm font-semibold text-primary">
              {p.notaExtra}
            </div>
          )}

          {p.extra && (
            <div className="mt-8 rounded-3xl border border-dashed border-primary/50 bg-primary-light p-7 md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="text-[11px] uppercase tracking-[0.25em] text-primary font-semibold">{p.extra.nome}</div>
                <div className="font-display text-3xl font-black tracking-tight text-primary">{p.extra.valor}</div>
              </div>
              <p className="mt-4 max-w-3xl leading-relaxed">{p.extra.descricao}</p>
              {p.extra.condicao && <p className="mt-3 text-sm font-semibold text-primary">{p.extra.condicao}</p>}
            </div>
          )}
        </div>
      </section>

      {/* incluso */}
      <section className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <Eyebrow n={secao()}>O que está incluso</Eyebrow>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {p.incluso.map((i) => (
            <li key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-background-alt px-5 py-4 text-sm font-medium">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-background">
                <Check size={14} />
              </span>
              {i}
            </li>
          ))}
        </ul>

        {p.responsabilidadesMarca && (
          <div className="mt-6 rounded-2xl border border-dashed border-border bg-background-alt/50 px-5 py-4">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">{p.responsabilidadesMarca.titulo}</div>
            <ul className="mt-3 space-y-1.5">
              {p.responsabilidadesMarca.itens.map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground-soft">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* painel de acompanhamento (exemplo) */}
      {p.painel && (
        <section className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <Eyebrow n={secao()}>{p.painel.titulo}</Eyebrow>
          <p className="mb-8 max-w-2xl text-foreground-soft">{p.painel.sub}</p>

          <div className="overflow-hidden rounded-2xl border border-border">
            {/* barra de ferramentas */}
            <div className="flex flex-wrap items-center gap-3 border-b border-border bg-background-alt px-4 py-3">
              <div className="flex items-center gap-2 text-muted">
                <Rows3 size={15} />
                <LayoutGrid size={15} className="opacity-35" />
                <AlignLeft size={15} className="opacity-35" />
              </div>
              <span className="h-4 w-px bg-border" />
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground-soft">
                <Calendar size={13} /> {p.cliente}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold">
                <Film size={12} /> {p.painel.videosQtd ?? p.painel.linhas.length} vídeos
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold">
                <Users size={12} /> {p.painel.creatorsQtd ?? p.painel.linhas.length} creators
              </span>
            </div>

            {/* cabeçalho (só desktop) */}
            <div className="hidden grid-cols-[24px_20px_1.7fr_0.9fr_1fr_1.1fr] items-center gap-3 border-b border-border bg-background-alt/60 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-muted md:grid">
              <span />
              <span />
              <span>Nome</span>
              <span>Portfólio</span>
              <span>Cidade</span>
              <span>Status roteiro</span>
            </div>

            {/* linhas */}
            {p.painel.linhas.map((l, i) => (
              <div
                key={l.nome}
                className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-border px-4 py-3.5 last:border-b-0 md:grid-cols-[24px_20px_1.7fr_0.9fr_1fr_1.1fr]"
              >
                <span className="hidden h-4 w-4 flex-shrink-0 rounded border border-border md:block" />
                <GripVertical size={14} className="hidden flex-shrink-0 text-muted/50 md:block" />
                <div className="flex min-w-0 items-center gap-3">
                  <AvatarIniciais nome={l.nome} i={i} />
                  <span className="truncate text-sm font-semibold">{l.nome}</span>
                </div>
                <span className="hidden text-sm font-semibold text-primary md:block">LINK</span>
                <span className="hidden text-sm text-foreground-soft md:block">{l.cidade}</span>
                <span className={"inline-flex w-fit flex-shrink-0 items-center rounded-full border px-3 py-1 text-xs font-bold " + corStatus(l.status)}>
                  {l.status}
                </span>
              </div>
            ))}

            {/* rodapé */}
            <div className="flex items-center justify-between bg-background-alt px-4 py-2.5 text-xs font-semibold text-foreground-soft">
              <span>{p.painel.creatorsQtd ?? p.painel.linhas.length} creators</span>
              <span>{p.painel.linhas.filter((l) => /aprovado|entregue/i.test(l.status)).length} aprovados</span>
            </div>
          </div>

          <p className="mt-4 text-xs text-muted">Exemplo ilustrativo, com nomes e status de demonstração.</p>
        </section>
      )}

      {/* referências */}
      {refs.length > 0 && (
        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
            <div className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-accent-on-dark font-semibold">
              <span className="font-serif-accent italic normal-case tracking-normal text-base text-accent-on-dark/70">{secao()}</span>
              <span className="h-px w-8 bg-accent-on-dark/50" />
              {p.referenciasTitulo || "Referências do meu portfólio"}
            </div>
            <p className="mb-8 max-w-2xl text-background/75">{p.referenciasIntro || "Toca em qualquer um pra assistir. É o tom que eu proponho pro vídeo do prêmio."}</p>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
              {refs.map((r, i) => (
                <div key={r.video!.id}>
                  <VideoCard video={r.video!} index={i} size="sm" />
                  <p className="mt-3 text-sm leading-relaxed text-background/75">{r.porque}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* cronograma */}
      <section className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <Eyebrow n={secao()}>Cronograma</Eyebrow>
        <ol className="relative ml-2 border-l-2 border-primary/30 pl-7">
          {p.cronograma.map((c) => (
            <li key={c.etapa} className="relative pb-7 last:pb-0">
              <span className="absolute -left-[37px] top-1 h-4 w-4 rounded-full border-4 border-background bg-primary" />
              <div className="font-semibold">{c.etapa}</div>
              <div className="text-sm text-foreground-soft">{c.quando}</div>
            </li>
          ))}
        </ol>
        {p.cronogramaNota && <p className="mt-6 max-w-2xl whitespace-pre-line text-sm text-muted">{p.cronogramaNota}</p>}
      </section>

      {/* pagamento + próximo passo */}
      <section className="bg-background-alt">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-12 md:grid-cols-2 md:py-16">
          <div>
            <Eyebrow n={secao()}>Pagamento</Eyebrow>
            <p className="whitespace-pre-line leading-relaxed text-foreground-soft">{p.pagamento}</p>
          </div>
          <div>
            <Eyebrow n={secao()}>Próximo passo</Eyebrow>
            <p className="leading-relaxed">{p.proximoPasso}</p>
          </div>
        </div>
      </section>

      {/* contato */}
      <section className="mx-auto max-w-5xl px-6 py-14 md:py-20">
        <div className="rounded-3xl bg-foreground p-8 text-background md:p-12">
          <h2 className="font-display text-3xl font-black tracking-tight md:text-5xl">
            {(p.chamada || CHAMADA_PADRAO).titulo}{" "}
            <span className="font-serif-accent italic text-accent-on-dark">{(p.chamada || CHAMADA_PADRAO).destaque}</span>?
          </h2>
          <p className="mt-4 max-w-xl text-background/75">{(p.chamada || CHAMADA_PADRAO).texto}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={zap} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-accent-on-dark px-6 py-3 font-semibold text-foreground transition-transform hover:-translate-y-0.5">
              <MessageCircle size={18} /> Falar no WhatsApp
            </a>
            <a href={`mailto:${p.email}`} className="inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3 font-semibold text-background transition-colors hover:border-accent-on-dark hover:text-accent-on-dark">
              <Mail size={18} /> {p.email}
            </a>
            <a href="/" className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-background/80 hover:text-accent-on-dark">
              Ver o portfólio completo <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-muted">{p.assinatura || "Lara Dam · UGC Creator & Content Strategist · @eilaradam"}</p>
      </section>
    </main>
  );
}
