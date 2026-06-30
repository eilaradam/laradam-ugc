"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HeroPhoto } from "./_shared";
import { useT } from "@/lib/i18n";

// Opção premium C — "Spotlight"
// Foto à esquerda sobre um backdrop quente arredondado, texto à direita.
const ACCENT = "#c75925";
const EASE = [0.16, 1, 0.3, 1] as const;

const METRICS: [string, string][] = [
  ["500", "vídeos"],
  ["200", "marcas"],
  ["100M", "views"],
];

export default function HeroPremiumC() {
  const t = useT();
  return (
    <section
      id="top"
      className="relative min-h-[100svh] bg-[#F4F1EB] overflow-hidden flex items-center pt-24 md:pt-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 md:gap-14 items-center w-full">
        {/* Foto + backdrop */}
        <div className="relative order-1 flex items-end justify-center min-h-[44vh] md:min-h-[72vh]">
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1.1, ease: EASE }}
            className="absolute bottom-0 w-[78%] h-[88%] rounded-t-[14rem] bg-[#EAE0D5]"
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.1, ease: EASE }}
            className="relative z-10 flex items-end justify-center"
          >
            <HeroPhoto className="w-auto h-[44vh] md:h-[74vh] max-w-full object-bottom" />
          </motion.div>
        </div>

        {/* Texto */}
        <div className="order-2 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full border border-foreground/15 mb-7"
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-foreground/60 font-medium">
              Disponível para 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 1, ease: EASE }}
            className="font-display font-semibold text-foreground leading-[0.95] tracking-[-0.03em] text-5xl md:text-6xl lg:text-7xl"
          >
            {t.hero.title1}
            <br />
            {t.hero.title2}{" "}
            <span className="font-serif-accent italic font-normal" style={{ color: ACCENT }}>
              {t.hero.titleAccent}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.9 }}
            className="mt-6 max-w-md text-foreground-soft text-sm md:text-base leading-relaxed"
          >
            {t.hero.body1}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease: EASE }}
            className="mt-8 flex items-center gap-6 border-t border-foreground/10 pt-7"
          >
            {METRICS.map(([n, l], i) => (
              <div key={l} className="flex items-center gap-6">
                {i > 0 && <span className="h-7 w-px bg-foreground/15" />}
                <div className="leading-none">
                  <span className="font-display font-semibold text-2xl tracking-tight">{n}</span>
                  <span className="ml-1.5 text-[10px] uppercase tracking-[0.2em] text-foreground/45">{l}</span>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8, ease: EASE }}
            className="mt-8 flex items-center gap-7"
          >
            <a
              href="#contato"
              className="group inline-flex items-center gap-2 bg-foreground text-background px-7 py-3.5 rounded-full text-sm font-medium tracking-wide hover:opacity-90 transition-opacity"
            >
              {t.hero.cta}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#categorias"
              className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors underline-offset-4 hover:underline"
            >
              Ver portfólio
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
