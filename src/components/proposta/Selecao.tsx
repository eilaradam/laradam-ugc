"use client";

import { useState } from "react";
import { Check, MessageCircle, Mail, Play, Rows3, Users } from "lucide-react";
import type { CreatorGrano } from "@/data/propostas/grano-creators";
import { GRANO_CREATORS } from "@/data/propostas/grano-creators";

// Apresentação das creators pré-selecionadas pra uma marca, sem valores, em formato de planilha.
// A marca marca as que gostou e manda a seleção pelo WhatsApp.
type Dados = typeof GRANO_CREATORS;

function num(n: number | null) {
  if (n === null) return "—";
  if (n >= 1_000_000) return (n / 1_000_000).toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + " mi";
  if (n >= 10_000) return Math.round(n / 1000).toLocaleString("pt-BR") + " mil";
  if (n >= 1000) return (n / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + " mil";
  return n.toLocaleString("pt-BR");
}
const engaj = (e: number | null) => (e === null ? "—" : e.toLocaleString("pt-BR", { minimumFractionDigits: 1 }) + "%");
const categoria = (c: CreatorGrano) => (c.seguidores <= 5000 ? "Nano" : c.seguidores <= 15000 ? "Micro" : "+15 mil");
const ig = (u: string) => `https://www.instagram.com/${u}/`;

function Avatar({ c, size = 40 }: { c: CreatorGrano; size?: number }) {
  const st = { width: size, height: size };
  if (c.foto) return <img src={c.foto} alt={c.nome} style={st} className="flex-shrink-0 rounded-full object-cover object-top" />;
  const ini = c.nome.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join("");
  return (
    <span style={st} className="flex flex-shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
      {ini}
    </span>
  );
}

function Marcar({ on, onClick, nome }: { on: boolean; onClick: () => void; nome: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      aria-label={(on ? "Desmarcar " : "Marcar ") + nome}
      className={
        "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border transition-colors " +
        (on ? "border-primary bg-primary text-background" : "border-border bg-background hover:border-primary")
      }
    >
      {on && <Check size={14} strokeWidth={3} />}
    </button>
  );
}

function Exemplos({ c }: { c: CreatorGrano }) {
  if (!c.exemplos.length) return <span className="text-sm text-muted">—</span>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {c.exemplos.map((u, i) => (
        <a
          key={u}
          href={u}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
        >
          <Play size={11} /> Reel {i + 1}
        </a>
      ))}
    </div>
  );
}

type Grupo = { titulo: string; creators: CreatorGrano[] };
type Sel = { tem: (u: string) => boolean; troca: (u: string) => void };

function Planilha({ grupos, sel, cliente }: { grupos: Grupo[]; sel: Sel; cliente: string }) {
  const total = grupos.reduce((n, g) => n + g.creators.length, 0);
  const cols = "grid-cols-[32px_minmax(210px,1.5fr)_76px_minmax(190px,1.6fr)_84px_84px_64px_160px]";
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background">
      <div className="flex flex-wrap items-center gap-3 border-b border-border bg-background-alt px-4 py-3">
        <Rows3 size={15} className="text-muted" />
        <span className="text-xs font-semibold text-foreground-soft">{cliente} · Seleção de creators</span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold">
          <Users size={12} /> {total} creators
        </span>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[980px]">
          <div className={"grid items-center gap-3 border-b border-border bg-background-alt/60 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-muted " + cols}>
            <span />
            <span>Creator</span>
            <span>Perfil</span>
            <span>Nicho</span>
            <span className="text-right">Seguidores</span>
            <span className="text-right">Views/reel</span>
            <span className="text-right">Engaj.</span>
            <span>Exemplos</span>
          </div>
          {grupos.map((g) => (
            <div key={g.titulo}>
              <div className="border-b border-border bg-primary-light px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-primary">{g.titulo}</div>
              {g.creators.map((c) => (
                <div
                  key={c.username}
                  className={"grid items-center gap-3 border-b border-border px-4 py-3 last:border-b-0 " + cols + (sel.tem(c.username) ? " bg-primary-light/50" : "")}
                >
                  <Marcar on={sel.tem(c.username)} onClick={() => sel.troca(c.username)} nome={c.nome} />
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar c={c} />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{c.nome}</div>
                      <a href={ig(c.username)} target="_blank" rel="noopener" className="text-xs font-semibold text-primary hover:underline">
                        @{c.username}
                      </a>
                    </div>
                  </div>
                  <span className="w-fit rounded-full border border-border bg-background-alt px-2.5 py-0.5 text-xs font-bold">{categoria(c)}</span>
                  <span className="text-sm text-foreground-soft">{c.nicho}</span>
                  <span className="text-right text-sm font-semibold tabular-nums">{num(c.seguidores)}</span>
                  <span className="text-right text-sm font-semibold tabular-nums">{num(c.viewsReel)}</span>
                  <span className="text-right text-sm font-semibold tabular-nums">{engaj(c.engajamento)}</span>
                  <Exemplos c={c} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SelecaoPage({ d }: { d: Dados }) {
  const [marcadas, setMarcadas] = useState<string[]>([]);
  const sel: Sel = {
    tem: (u) => marcadas.includes(u),
    troca: (u) => setMarcadas((m) => (m.includes(u) ? m.filter((x) => x !== u) : [...m, u])),
  };
  const grupos: Grupo[] = [d.ate10k, d.maiores];
  const zapBase = `https://wa.me/${d.whatsapp}?text=`;
  const zap = zapBase + encodeURIComponent(d.whatsappMensagem);
  const zapSel =
    zapBase + encodeURIComponent(`Oi Lara! Da seleção da ${d.cliente}, gostamos destes perfis:\n` + marcadas.map((u) => `@${u}`).join("\n"));

  return (
    <main className="min-h-screen bg-background pb-24 text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <a href="/" className="font-display text-lg font-black tracking-tight">
            LARA DAM<span className="text-primary">.</span>
          </a>
          <a
            href={zap}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-primary"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pt-12 pb-8 md:px-6 md:pt-16">
        <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">Seleção de creators</div>
        <div className="mt-4 font-serif-accent text-2xl italic text-foreground-soft md:text-3xl">{d.cliente}</div>
        <h1 className="mt-2 font-display text-4xl font-black leading-[0.95] tracking-tighter md:text-6xl">{d.titulo}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-soft">{d.subtitulo}</p>
        <p className="mt-3 text-sm text-muted">Marque os perfis que combinam com a {d.cliente} e envie a seleção pelo WhatsApp. {d.atualizado}</p>
      </section>

      <section className="mx-auto max-w-6xl px-4 md:px-6">
        <Planilha grupos={grupos} sel={sel} cliente={d.cliente} />
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted">
          Views/reel: mediana dos 6 reels mais recentes. Engaj.: curtidas e comentários dos 3 posts mais recentes sobre os seguidores.
        </p>
      </section>

      <section className="mx-auto mt-14 max-w-6xl px-4 md:px-6">
        <div className="rounded-3xl bg-foreground p-8 text-background md:p-12">
          <h2 className="font-display text-3xl font-black tracking-tight md:text-5xl">
            Quais perfis <span className="font-serif-accent italic text-accent-on-dark">combinam</span> com a {d.cliente}?
          </h2>
          <p className="mt-4 max-w-xl text-background/75">Me conta quais creators chamaram atenção que eu confirmo a disponibilidade e sigo com o briefing.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={zap} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-accent-on-dark px-6 py-3 font-semibold text-foreground transition-transform hover:-translate-y-0.5">
              <MessageCircle size={18} /> Falar no WhatsApp
            </a>
            <a href={`mailto:${d.email}`} className="inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3 font-semibold text-background transition-colors hover:border-accent-on-dark hover:text-accent-on-dark">
              <Mail size={18} /> {d.email}
            </a>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-muted">Lara Dam · Gestão de campanhas UGC</p>
      </section>

      {marcadas.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
            <span className="text-sm font-semibold">
              {marcadas.length} {marcadas.length === 1 ? "creator selecionada" : "creators selecionadas"}
            </span>
            <a href={zapSel} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-foreground">
              <MessageCircle size={16} /> Enviar seleção
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
