"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { HeroPhoto } from "./_shared";
import { useT } from "@/lib/i18n";

// Opção premium E — "Soft Card"
// Hero dentro de um cartão arredondado com leve tint, foto à direita, uma tag discreta.
const ACCENT = "#c75925";
const EASE = [0.16, 1, 0.3, 1] as const;

export default function HeroPremiumE() {
  const t = useT();
  return (
    <section
      id="top"
      className="relative min-h-[100svh] bg-white overflow-hidden flex items-center px-4 md:px-8 pt-24 md:pt-24 pb-6"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="relative rounded-[2.5rem] border border-foreground/10 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #FFFFFF 0%, #FDF4EF 55%, #FBE9E0 100%)",
          }}
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-6 items-center">
            {/* Texto */}
            <div className="px-8 md:px-12 lg:px-16 pt-12 md:py-16 order-2 md:order-1">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-foreground/10 mb-7"
              >
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: ACCENT }}
                >
                  <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
                </span>
                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-foreground/65 font-medium">
                  Disponível para 2026
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.9, ease: EASE }}
                className="font-display font-semibold text-foreground leading-[0.95] tracking-[-0.03em] text-5xl md:text-5xl lg:text-6xl"
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
                transition={{ delay: 0.4, duration: 0.9 }}
                className="mt-6 max-w-md text-foreground-soft text-sm md:text-base leading-relaxed"
              >
                {t.hero.body1}{" "}
                <span className="text-foreground font-medium">{t.hero.metrics}</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
                className="mt-9 flex items-center gap-6"
              >
                <a
                  href="#contato"
                  style={{ backgroundColor: ACCENT }}
                  className="group inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity"
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

            {/* Foto */}
            <div className="relative order-1 md:order-2 flex items-end justify-center self-end min-h-[40vh] md:min-h-[78vh]">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 1.1, ease: EASE }}
                className="relative z-10 flex items-end justify-center"
              >
                <HeroPhoto className="w-auto h-[42vh] md:h-[78vh] max-w-full object-bottom" />
              </motion.div>

              {/* Tag discreta */}
              <motion.div
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.7 }}
                className="hidden md:flex absolute z-20 top-[32%] left-0 bg-white shadow-lg rounded-2xl px-4 py-3 items-center gap-3 border border-foreground/5"
              >
                <span className="font-display font-semibold text-lg text-foreground leading-none">
                  +100M
                </span>
                <span className="text-[11px] leading-tight text-foreground-soft">
                  views · recorde
                  <br />de CTR no Meta
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
