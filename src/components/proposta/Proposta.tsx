"use client";

import { Check, MessageCircle, Mail, ArrowUpRight } from "lucide-react";
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
  opcoes: { nome: string; tipo: string; valor: string; descricao: string; inclui: string[]; destaque?: boolean }[];
  notaOpcoes?: string;
  extra?: { nome: string; valor: string; descricao: string; condicao?: string };
  incluso: string[];
  referencias: { id: string; porque: string }[];
  cronograma: { etapa: string; quando: string }[];
  pagamento: string;
  proximoPasso: string;
  whatsapp: string;
  whatsappMensagem: string;
  email: string;
  /** Bloco final. Sem isso, entra o texto neutro padrão. */
  chamada?: { titulo: string; destaque: string; texto: string };
};

const CHAMADA_PADRAO = {
  titulo: "Vamos alinhar os",
  destaque: "próximos passos",
  texto: "Qualquer dúvida sobre a proposta, é só me chamar. Com o descritivo em mãos, fecho o roteiro e mando pra aprovação.",
};

function Eyebrow({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-primary font-semibold">
      <span className="font-serif-accent italic normal-case tracking-normal text-base text-primary/70">{n}</span>
      <span className="h-px w-8 bg-primary/40" />
      {children}
    </div>
  );
}

export default function PropostaPage({ p }: { p: Proposta }) {
  const zap = `https://wa.me/${p.whatsapp}?text=${encodeURIComponent(p.whatsappMensagem)}`;
  const refs = p.referencias
    .map((r) => ({ video: VIDEOS.find((v) => v.id === r.id), porque: r.porque }))
    .filter((r) => !!r.video);

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
        <Eyebrow n="01">Sobre a campanha</Eyebrow>
        <p className="max-w-3xl text-lg leading-relaxed">{p.sobre}</p>
      </section>

      {/* opções */}
      <section className="bg-background-alt">
        <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <Eyebrow n="02">Opções de vídeo</Eyebrow>
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
                    Mais alcance
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
              </div>
            ))}
          </div>
          {p.notaOpcoes && <p className="mt-6 max-w-3xl text-sm text-foreground-soft">{p.notaOpcoes}</p>}

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
        <Eyebrow n="03">O que está incluso</Eyebrow>
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
      </section>

      {/* referências */}
      {refs.length > 0 && (
        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
            <div className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-accent-on-dark font-semibold">
              <span className="font-serif-accent italic normal-case tracking-normal text-base text-accent-on-dark/70">04</span>
              <span className="h-px w-8 bg-accent-on-dark/50" />
              Referências do meu portfólio
            </div>
            <p className="mb-8 max-w-2xl text-background/75">Toca em qualquer um pra assistir. É o tom que eu proponho pro vídeo do prêmio.</p>
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
        <Eyebrow n="05">Cronograma</Eyebrow>
        <ol className="relative ml-2 border-l-2 border-primary/30 pl-7">
          {p.cronograma.map((c) => (
            <li key={c.etapa} className="relative pb-7 last:pb-0">
              <span className="absolute -left-[37px] top-1 h-4 w-4 rounded-full border-4 border-background bg-primary" />
              <div className="font-semibold">{c.etapa}</div>
              <div className="text-sm text-foreground-soft">{c.quando}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* pagamento + próximo passo */}
      <section className="bg-background-alt">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-12 md:grid-cols-2 md:py-16">
          <div>
            <Eyebrow n="06">Pagamento</Eyebrow>
            <p className="leading-relaxed text-foreground-soft">{p.pagamento}</p>
          </div>
          <div>
            <Eyebrow n="07">Próximo passo</Eyebrow>
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
        <p className="mt-8 text-center text-xs text-muted">Lara Dam · UGC Creator & Content Strategist · @eilaradam</p>
      </section>
    </main>
  );
}
