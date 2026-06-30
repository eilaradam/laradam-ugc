"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HeroPhoto } from "./_shared";
import { useT } from "@/lib/i18n";

// Opção premium A — "Editorial Premium"
// Split refinado, tipografia conduz, monocromático com laranja como acento fino.
// Sem balões flutuantes, sem grid. Muito respiro.
const ACCENT = "#c75925";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function HeroPremiumA() {
  const t = useT();

  return (
    <section
      id="top"
      className="relative min-h-[100svh] bg-[#F7F4EF] overflow-hidden pt-24 md:pt-28"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-full">
        {/* Linha fina + eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex items-center gap-4 pb-8 md:pb-10 border-b border-foreground/10"
        >
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-foreground/50 font-medium">
            UGC Creator
          </span>
          <span className="h-px flex-1 bg-foreground/10" />
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-foreground/50 font-medium">
            Content Strategist
          </span>
          <span className="hidden md:inline h-px w-12 bg-foreground/10" />
          <span className="hidden md:inline text-[10px] uppercase tracking-[0.32em] text-foreground/50 font-medium">
            Litoral de SP · BR
          </span>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-6 items-center pt-10 md:pt-12">
          {/* Texto */}
          <div className="md:col-span-7 lg:col-span-7 order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="text-[11px] uppercase tracking-[0.3em] text-foreground/40 mb-6"
            >
              Portfólio · 2026
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: EASE }}
              className="font-display font-semibold text-foreground leading-[0.92] tracking-[-0.03em] text-[13vw] sm:text-6xl md:text-6xl lg:text-7xl xl:text-[5.4rem]"
            >
              {t.hero.title1}
              <br />
              {t.hero.title2}{" "}
              <span
                className="font-serif-accent italic font-normal"
                style={{ color: ACCENT }}
              >
                {t.hero.titleAccent}
              </span>
            </motion.h1>

            {/* Métricas em hairline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: EASE }}
              className="mt-9 md:mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-foreground"
            >
              {[
                ["500", "vídeos"],
                ["200", "marcas"],
                ["100M", "views"],
              ].map(([n, l], i) => (
                <div key={l} className="flex items-center gap-6">
                  {i > 0 && <span className="h-8 w-px bg-foreground/15" />}
                  <div className="leading-none">
                    <span className="font-display font-semibold text-2xl md:text-3xl tracking-tight">
                      {n}
                    </span>
                    <span className="ml-1.5 text-[11px] uppercase tracking-[0.2em] text-foreground/45">
                      {l}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.9 }}
              className="mt-8 max-w-md text-foreground-soft text-sm md:text-base leading-relaxed"
            >
              {t.hero.body1}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
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
                Ver portfólio
              </a>
            </motion.div>
          </div>

          {/* Foto */}
          <div className="md:col-span-5 lg:col-span-5 order-1 md:order-2 relative flex items-end justify-center">
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="absolute inset-x-6 bottom-0 top-8 border-x border-foreground/10"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 1.1, ease: EASE }}
              className="relative z-10 flex items-end justify-center"
            >
              <HeroPhoto className="w-auto h-[46vh] md:h-[68vh] max-w-full object-bottom" />
            </motion.div>
            {/* Selo discreto */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="hidden md:block absolute z-20 bottom-6 right-0 text-right"
            >
              <span className="block text-[10px] uppercase tracking-[0.25em] text-foreground/40">
                Caso em destaque
              </span>
              <span
                className="block font-serif-accent italic text-lg leading-tight"
                style={{ color: ACCENT }}
              >
                InfinitePay · +100M
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
