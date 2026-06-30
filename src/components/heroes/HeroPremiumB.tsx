"use client";

import { motion } from "framer-motion";
import { HeroPhoto } from "./_shared";
import { useT } from "@/lib/i18n";

// Opção premium B — "Quiet Luxury"
// Centralizado, máximo respiro, wordmark no topo. Luxo discreto, cara de casa de moda.
const ACCENT = "#c75925";
const EASE = [0.16, 1, 0.3, 1] as const;

export default function HeroPremiumB() {
  const t = useT();

  return (
    <section
      id="top"
      className="relative min-h-[100svh] bg-[#FBFAF7] overflow-hidden flex flex-col"
    >
      {/* Masthead / wordmark */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="pt-24 md:pt-28 px-6"
      >
        <div className="text-center">
          <span className="font-display font-semibold text-foreground text-sm md:text-base tracking-[0.5em] uppercase">
            Lara Dam<span style={{ color: ACCENT }}>.</span>
          </span>
        </div>
        <div className="mt-6 mx-auto max-w-5xl h-px bg-foreground/10" />
      </motion.div>

      {/* Conteúdo central */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="text-[11px] uppercase tracking-[0.4em] text-foreground/45 mb-7"
        >
          Portfólio · 2026
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 1, ease: EASE }}
          className="font-display font-medium text-foreground leading-[0.95] tracking-[-0.03em] text-[12vw] sm:text-6xl md:text-7xl lg:text-[5.6rem] max-w-4xl"
        >
          {t.hero.title1} {t.hero.title2}{" "}
          <span
            className="font-serif-accent italic font-normal"
            style={{ color: ACCENT }}
          >
            {t.hero.titleAccent}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.9 }}
          className="mt-7 max-w-md text-foreground-soft text-sm md:text-base leading-relaxed"
        >
          {t.hero.body1}
        </motion.p>

        {/* Foto contida */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.1, ease: EASE }}
          className="relative mt-8 md:mt-4 flex items-end justify-center"
        >
          <HeroPhoto className="w-auto h-[40vh] md:h-[52vh] max-w-full object-bottom" />
        </motion.div>

        {/* CTA discreto */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
          className="mt-8 md:mt-10"
        >
          <a
            href="#contato"
            className="inline-flex items-center justify-center px-9 py-3.5 rounded-full border border-foreground/25 text-sm font-medium text-foreground tracking-wide hover:bg-foreground hover:text-background transition-colors"
          >
            {t.hero.cta}
          </a>
        </motion.div>
      </div>

      {/* Rodapé de métricas em hairline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.9 }}
        className="border-t border-foreground/10"
      >
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-center gap-8 md:gap-16 text-foreground/70">
          {[
            ["500", "vídeos"],
            ["200", "marcas"],
            ["100M", "views"],
          ].map(([n, l]) => (
            <div key={l} className="text-center leading-none">
              <span className="font-display font-semibold text-lg md:text-xl tracking-tight text-foreground">
                {n}
              </span>
              <span className="ml-1.5 text-[10px] uppercase tracking-[0.25em] text-foreground/45">
                {l}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
