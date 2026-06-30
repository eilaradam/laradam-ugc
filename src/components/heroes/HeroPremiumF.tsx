"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HeroPhoto } from "./_shared";
import { useT } from "@/lib/i18n";

// Opção premium F — "Dark Premium"
// Fundo escuro quente, laranja como brasa. Alto contraste, sensação de caro.
const ACCENT = "#e0762f";
const EASE = [0.16, 1, 0.3, 1] as const;

const METRICS: [string, string][] = [
  ["500", "vídeos"],
  ["200", "marcas"],
  ["100M", "views"],
];

export default function HeroPremiumF() {
  const t = useT();
  return (
    <section
      id="top"
      className="relative min-h-[100svh] bg-[#161311] overflow-hidden flex items-center pt-24 md:pt-20"
    >
      {/* Glow quente */}
      <div
        aria-hidden
        className="absolute -right-40 top-1/4 w-[680px] h-[680px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(224,118,47,0.20) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 md:gap-12 items-center w-full">
        {/* Texto */}
        <div className="order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 mb-7"
          >
            <span className="h-px w-8" style={{ backgroundColor: ACCENT }} />
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              UGC Creator · 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 1, ease: EASE }}
            className="font-display font-semibold leading-[0.95] tracking-[-0.03em] text-white text-5xl md:text-6xl lg:text-7xl"
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
            className="mt-6 max-w-md text-white/55 text-sm md:text-base leading-relaxed"
          >
            {t.hero.body1}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease: EASE }}
            className="mt-8 flex items-center gap-6 border-t border-white/10 pt-7"
          >
            {METRICS.map(([n, l], i) => (
              <div key={l} className="flex items-center gap-6">
                {i > 0 && <span className="h-7 w-px bg-white/15" />}
                <div className="leading-none">
                  <span className="font-display font-semibold text-2xl tracking-tight text-white">{n}</span>
                  <span className="ml-1.5 text-[10px] uppercase tracking-[0.2em] text-white/40">{l}</span>
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
              style={{ backgroundColor: ACCENT }}
              className="group inline-flex items-center gap-2 text-[#161311] px-7 py-3.5 rounded-full text-sm font-bold tracking-wide hover:opacity-90 transition-opacity"
            >
              {t.hero.cta}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#categorias"
              className="text-sm font-medium text-white/60 hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Ver portfólio
            </a>
          </motion.div>
        </div>

        {/* Foto */}
        <div className="relative order-1 md:order-2 flex items-end justify-center self-end min-h-[42vh] md:min-h-[78vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 1.1, ease: EASE }}
            className="relative z-10 flex items-end justify-center"
          >
            <HeroPhoto className="w-auto h-[46vh] md:h-[80vh] max-w-full object-bottom" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
