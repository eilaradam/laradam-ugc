"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { HeroPhoto } from "./_shared";
import { useT } from "@/lib/i18n";

// Cor de destaque verde-oliva da referência (one-off, não muda o tema global)
const ACCENT = "#d46928";
const ACCENT_DARK = "#c75925";
const ACCENT_LIGHT = "#e3725a";

export default function HeroOption6() {
  const t = useT();
  return (
    <section
      id="top"
      className="relative bg-white pt-4 md:pt-6 pb-0 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-6 md:gap-12 items-center w-full pt-[60px] md:pt-[40px]">
        {/* LEFT: texto */}
        <div className="flex flex-col">
          {/* Badge com check */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6 md:mb-8"
          >
            <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
              <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-background" strokeWidth={3} />
            </span>
            <span className="text-xs md:text-sm font-semibold text-foreground/80">
              {t.hero.badge}
            </span>
          </motion.div>

          {/* Título grande */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-foreground leading-[0.95] tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t.hero.title1}
            <br />
            {t.hero.title2}{" "}
            <span style={{ color: ACCENT_DARK }}>{t.hero.titleAccent}</span>
          </motion.h1>

          {/* Descrição */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-5 md:mt-6 text-foreground-soft text-sm md:text-base leading-relaxed max-w-md"
          >
            {t.hero.body1}
            <br />
            <strong className="font-semibold text-foreground">
              {t.hero.metrics}
            </strong>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-8 md:mt-10 flex items-center gap-5 md:gap-6"
          >
            <a
              href="#contato"
              style={{ backgroundColor: ACCENT }}
              className="inline-flex items-center justify-center px-7 md:px-10 py-3 md:py-4 rounded-2xl text-sm md:text-base font-bold text-white hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              {t.hero.cta}
            </a>
            <a
              href="#categorias"
              className="text-sm md:text-base font-semibold text-foreground-soft hover:text-foreground transition-colors whitespace-nowrap"
            >
              {t.hero.saibaMais}
            </a>
          </motion.div>
        </div>

        {/* RIGHT: foto + UGC backdrop + bubbles */}
        <div className="relative flex items-end justify-center self-end">
          {/* UGC backdrop gigante */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <span
              style={{ color: ACCENT_LIGHT }}
              className="font-display font-black text-[40vw] md:text-[22vw] lg:text-[20vw] leading-none tracking-[-0.06em] select-none -mt-4 md:-mt-16"
            >
              UGC
            </span>
          </motion.div>

          {/* Foto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 0.9 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex items-end justify-center origin-bottom"
          >
            <HeroPhoto className="w-auto h-[50vh] sm:h-[60vh] md:h-[640px] max-w-full object-bottom" />
          </motion.div>

          {/* Bubble 1 — direita (flutua devagar pra cima/baixo, zoom no hover) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -8, 0],
            }}
            transition={{
              opacity: { delay: 0.9, duration: 0.7 },
              x: { delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
              y: {
                delay: 1.6,
                duration: 4.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              },
            }}
            whileHover={{ scale: 1.06, transition: { duration: 0.25, ease: "easeOut" } }}
            className="hidden md:flex absolute z-20 right-1 md:right-3 top-[35%] md:top-[38%] bg-white shadow-xl rounded-2xl p-3 md:p-3.5 items-center gap-3 max-w-[220px] border border-foreground/5 cursor-default"
          >
            <span
              style={{ backgroundColor: ACCENT }}
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <Check className="w-3.5 h-3.5 text-foreground" strokeWidth={3} />
            </span>
            <div className="text-xs md:text-[13px] leading-tight">
              <div className="font-semibold text-foreground">{t.hero.bubble1Title}</div>
              <div className="text-foreground-soft">{t.hero.bubble1Sub}</div>
            </div>
          </motion.div>

          {/* Bubble 2 — esquerda (flutua em fase oposta) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, 8, 0],
            }}
            transition={{
              opacity: { delay: 1.1, duration: 0.7 },
              x: { delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
              y: {
                delay: 1.8,
                duration: 5.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              },
            }}
            whileHover={{ scale: 1.06, transition: { duration: 0.25, ease: "easeOut" } }}
            className="hidden md:flex absolute z-20 left-1 md:left-3 top-[58%] md:top-[60%] bg-white shadow-xl rounded-2xl p-3 md:p-3.5 items-center gap-3 max-w-[230px] border border-foreground/5 cursor-default"
          >
            <span
              style={{ backgroundColor: ACCENT }}
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <Check className="w-3.5 h-3.5 text-foreground" strokeWidth={3} />
            </span>
            <div className="text-xs md:text-[13px] leading-tight">
              <div className="font-semibold text-foreground">{t.hero.bubble2Title}</div>
              <div className="text-foreground-soft">{t.hero.bubble2Sub}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
