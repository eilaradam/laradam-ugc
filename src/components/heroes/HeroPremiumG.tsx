"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HeroPhoto } from "./_shared";
import { useT } from "@/lib/i18n";

// Opção premium G — "Clean Agency"
// Branco impecável, barra de acento vertical, foto com sombra suave e uma tag de prova social.
const ACCENT = "#c75925";
const EASE = [0.16, 1, 0.3, 1] as const;

const METRICS: [string, string][] = [
  ["500", "vídeos"],
  ["200", "marcas"],
  ["100M", "views"],
];

export default function HeroPremiumG() {
  const t = useT();
  return (
    <section
      id="top"
      className="relative min-h-[100svh] bg-white overflow-hidden flex items-center pt-24 md:pt-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 md:gap-16 items-center w-full">
        {/* Texto */}
        <div className="order-2 md:order-1 relative md:pl-8">
          <span
            aria-hidden
            className="hidden md:block absolute left-0 top-1 bottom-1 w-[3px] rounded-full"
            style={{ backgroundColor: ACCENT }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-[11px] uppercase tracking-[0.3em] text-foreground/45 mb-6 font-medium"
          >
            UGC Creator & Content Strategist
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
            className="mt-8 flex items-center gap-6"
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
            className="mt-9 flex items-center gap-7"
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
              {t.hero.saibaMais}
            </a>
          </motion.div>
        </div>

        {/* Foto + tag */}
        <div className="relative order-1 md:order-2 flex items-end justify-center self-end min-h-[42vh] md:min-h-[78vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 1.1, ease: EASE }}
            className="relative z-10 flex items-end justify-center drop-shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
          >
            <HeroPhoto className="w-auto h-[46vh] md:h-[80vh] max-w-full object-bottom" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="hidden md:flex absolute z-20 bottom-[14%] right-0 bg-white shadow-xl rounded-2xl px-4 py-3 items-center gap-3 border border-foreground/5"
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ACCENT }} />
            <span className="text-[12px] leading-tight text-foreground">
              <span className="font-semibold">Recorde de CTR</span>
              <br />
              <span className="text-foreground-soft">no Meta · InfinitePay</span>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
