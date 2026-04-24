"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Quote } from "lucide-react";
import { useVideoModal } from "./VideoModalProvider";
import type { Video } from "@/data/content";

type Stat = { value: string; label: string };

type Case = {
  brand: string;
  brandDomain?: string; // pro Clearbit se não tiver logoText
  brandLogoText?: string; // renderiza o nome como tipografia estilizada
  youtubeId: string;
  // Quote-style (depoimento) OU description-style (sobre a marca/campanha)
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
    <section
      id="cases"
      className="px-6 md:px-12 py-10 md:py-20 bg-background"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-10 text-center">
          <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-6 md:w-8 bg-primary" />
            Cases detalhados
            <span className="h-px w-6 md:w-8 bg-primary" />
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl leading-[0.95] tracking-tighter max-w-3xl mx-auto">
            Números que{" "}
            <span className="font-serif-accent italic text-primary">
              provam o trabalho
            </span>
          </h2>
        </div>

        {/* Card principal */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.brand}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl bg-foreground text-background p-5 md:p-8 shadow-xl"
          >
            <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
              {/* Vídeo */}
              <button
                onClick={() => open(video)}
                data-cursor="play"
                className="group relative w-full max-w-xs mx-auto aspect-[9/16] rounded-2xl overflow-hidden bg-background/5 cursor-pointer"
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
                  <div className="absolute inset-0 bg-gradient-to-br from-background/5 to-primary/20 flex items-center justify-center">
                    <div className="text-background/40 text-center p-4">
                      <Play className="w-10 h-10 mx-auto mb-2 opacity-60" />
                      <div className="text-[10px] uppercase tracking-wider font-semibold">
                        {current.brand}
                      </div>
                    </div>
                  </div>
                )}

                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-background/15 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Play className="w-5 h-5 text-background fill-background ml-0.5" />
                  </div>
                </div>
              </button>

              {/* Conteúdo */}
              <div className="flex flex-col gap-5">
                {/* Brand logo/name */}
                <div>
                  {current.brandLogoText ? (
                    <div className="font-display font-black text-3xl md:text-4xl tracking-tight">
                      {current.brandLogoText}
                    </div>
                  ) : current.brandDomain ? (
                    <img
                      src={`https://logo.clearbit.com/${current.brandDomain}?size=200`}
                      alt={current.brand}
                      className="h-10 md:h-12 w-auto object-contain brightness-0 invert"
                    />
                  ) : (
                    <div className="font-display font-black text-3xl md:text-4xl tracking-tight">
                      {current.brand}
                    </div>
                  )}
                  <div className="h-px bg-background/15 mt-4" />
                </div>

                {/* Quote OU description */}
                {current.quote ? (
                  <div>
                    <Quote
                      className="w-6 h-6 text-primary mb-3"
                      strokeWidth={2}
                    />
                    <p className="text-base md:text-lg leading-snug text-background">
                      {current.quote}
                    </p>
                    {current.author && (
                      <p className="mt-3 text-xs md:text-sm text-background/60">
                        {current.author}
                      </p>
                    )}
                  </div>
                ) : current.description ? (
                  <p className="text-sm md:text-base leading-relaxed text-background/85">
                    {current.description}
                  </p>
                ) : null}

                <div className="h-px bg-background/15" />

                {/* Stats em linha */}
                <div className="flex flex-col gap-2">
                  {current.stats.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center justify-between px-4 py-3 rounded-xl bg-background/5 border border-background/5"
                    >
                      <span className="font-display font-black text-xl md:text-2xl tracking-tight">
                        {s.value}
                      </span>
                      <span className="text-xs md:text-sm text-background/60 text-right">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Nav */}
        {CASES.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={prev}
              aria-label="Anterior"
              className="w-11 h-11 rounded-full border border-foreground/15 flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs text-muted tabular-nums">
              {String(idx + 1).padStart(2, "0")} /{" "}
              {String(CASES.length).padStart(2, "0")}
            </span>
            <button
              onClick={next}
              aria-label="Próximo"
              className="w-11 h-11 rounded-full border border-foreground/15 flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
