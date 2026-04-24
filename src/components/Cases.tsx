"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useVideoModal } from "./VideoModalProvider";
import type { Video } from "@/data/content";

type Stat = { value: string; label: string };

type Case = {
  brand: string;
  brandDomain?: string; // pro Clearbit se não tiver logoText
  brandLogoText?: string; // renderiza o nome como tipografia estilizada
  youtubeId: string;
  quote?: string;
  author?: string;
  description?: string;
  stats: Stat[];
};

const CASES: Case[] = [
  {
    brand: "Bready",
    brandLogoText: "BREADY",
    youtubeId: "2s6BI893C74",
    quote:
      "Basicamente vocês duplicaram o nosso ROAS e fizeram com que acabasse o nosso estoque.",
    author: "Andre Voskanian — CMO e founder do Bready",
    stats: [
      { value: "5,94x", label: "ROAS" },
      { value: "50%", label: "Taxa de hook" },
    ],
  },
  {
    brand: "Méliuz",
    brandDomain: "meliuz.com.br",
    youtubeId: "dgQYEfEQTvQ",
    description:
      "O Méliuz é uma plataforma brasileira que oferece cashback e cupons de desconto para compras online e em lojas físicas. O serviço funciona como intermediário entre o consumidor e as lojas parceiras, recompensando o usuário com parte do valor gasto.",
    stats: [
      { value: "1.023", label: "vídeos totais" },
      { value: "5,6M", label: "visualizações totais" },
      { value: "66k", label: "salvamentos totais" },
    ],
  },
];

export default function Cases() {
  const [idx, setIdx] = useState(0);
  const { open } = useVideoModal();

  if (CASES.length === 0) return null;

  const current = CASES[idx];
  const next = () => setIdx((i) => (i + 1) % CASES.length);
  const prev = () => setIdx((i) => (i - 1 + CASES.length) % CASES.length);

  const video: Video = {
    id: `case-${current.brand}`,
    title: `Case ${current.brand}`,
    category: "case",
    brand: current.brand,
    youtubeId: current.youtubeId || undefined,
  };

  return (
    <section id="cases" className="px-6 md:px-12 py-8 md:py-14 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Header — eyebrow + nav inline */}
        <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-6 md:w-8 bg-primary" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary font-medium">
              Cases detalhados
            </span>
          </div>

          {CASES.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted tabular-nums mr-1">
                {String(idx + 1).padStart(2, "0")}{" "}
                <span className="text-muted/50">
                  / {String(CASES.length).padStart(2, "0")}
                </span>
              </span>
              <button
                onClick={prev}
                aria-label="Anterior"
                className="w-8 h-8 rounded-full border border-foreground/15 flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                aria-label="Próximo"
                className="w-8 h-8 rounded-full border border-foreground/15 flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Card principal — card clarinho, estilo editorial */}
        <AnimatePresence mode="wait">
          <motion.article
            key={current.brand}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl bg-background-alt border border-foreground/10 p-5 md:p-8"
          >
            <div className="grid md:grid-cols-[220px_1fr] gap-5 md:gap-8 items-start">
              {/* Vídeo */}
              <button
                onClick={() => open(video)}
                data-cursor="play"
                className="group relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-foreground/5 cursor-pointer"
              >
                {current.youtubeId ? (
                  <img
                    src={`https://i.ytimg.com/vi/${current.youtubeId}/maxresdefault.jpg`}
                    alt={current.brand}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = `https://i.ytimg.com/vi/${current.youtubeId}/hqdefault.jpg`;
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-primary/10 flex items-center justify-center">
                    <Play className="w-8 h-8 opacity-30" />
                  </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Play className="w-4 h-4 text-primary-light fill-primary-light ml-0.5" />
                  </div>
                </div>
              </button>

              {/* Conteúdo */}
              <div className="flex flex-col gap-4 md:gap-5 min-w-0">
                {/* Brand */}
                <div>
                  {current.brandLogoText ? (
                    <div className="font-display font-black text-xl md:text-2xl tracking-tight text-foreground">
                      {current.brandLogoText}
                    </div>
                  ) : current.brandDomain ? (
                    <img
                      src={`https://logo.clearbit.com/${current.brandDomain}?size=160`}
                      alt={current.brand}
                      className="h-7 md:h-8 w-auto object-contain"
                    />
                  ) : (
                    <div className="font-display font-black text-xl md:text-2xl tracking-tight text-foreground">
                      {current.brand}
                    </div>
                  )}
                </div>

                {/* Quote OU description */}
                {current.quote ? (
                  <div className="border-l-2 border-primary/40 pl-4 py-0.5">
                    <p className="font-serif-accent italic text-foreground text-sm md:text-base leading-snug">
                      &ldquo;{current.quote}&rdquo;
                    </p>
                    {current.author && (
                      <p className="mt-2 text-[11px] md:text-xs text-muted">
                        — {current.author}
                      </p>
                    )}
                  </div>
                ) : current.description ? (
                  <p className="text-xs md:text-sm leading-relaxed text-foreground-soft">
                    {current.description}
                  </p>
                ) : null}

                {/* Stats — linhas simples com divider */}
                <dl className="divide-y divide-foreground/10 border-t border-foreground/10 mt-1">
                  {current.stats.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-baseline justify-between py-2.5"
                    >
                      <dt className="text-[11px] md:text-xs uppercase tracking-wider text-muted">
                        {s.label}
                      </dt>
                      <dd className="font-display font-black text-lg md:text-xl tracking-tight text-foreground tabular-nums">
                        {s.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
