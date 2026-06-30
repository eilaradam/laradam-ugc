"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HeroPhoto } from "./_shared";
import { useT } from "@/lib/i18n";

// Opção premium D — "Big Type"
// Título gigante dominando o topo, foto ancorada à direita, barra de credenciais embaixo.
const ACCENT = "#c75925";
const EASE = [0.16, 1, 0.3, 1] as const;

const METRICS: [string, string][] = [
  ["500", "vídeos gravados"],
  ["200", "marcas parceiras"],
  ["100M", "views acumulados"],
  ["2 anos", "de experiência"],
];

export default function HeroPremiumD() {
  const t = useT();
  return (
    <section
      id="top"
      className="relative min-h-[100svh] bg-[#FAF8F4] overflow-hidden flex flex-col pt-24 md:pt-28"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-[11px] uppercase tracking-[0.3em] text-foreground/45 mb-5"
        >
          UGC Creator & Content Strategist
        </motion.div>

        <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-end">
          {/* Coluna texto */}
          <div className="md:col-span-7 order-2 md:order-1 flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 1, ease: EASE }}
              className="font-display font-semibold text-foreground leading-[0.88] tracking-[-0.035em] text-[15vw] md:text-[7vw] lg:text-[6.6vw]"
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
              className="mt-7 text-foreground-soft text-sm md:text-base leading-relaxed max-w-md"
            >
              {t.hero.body1}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
              className="mt-7 flex items-center gap-6"
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

          {/* Coluna foto */}
          <div className="md:col-span-5 order-1 md:order-2 flex items-end justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1.1, ease: EASE }}
              className="flex items-end justify-center"
            >
              <HeroPhoto className="w-auto h-[40vh] md:h-[62vh] max-w-full object-bottom" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Barra de credenciais */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
        className="relative z-10 border-t border-foreground/10 bg-[#FAF8F4]/80 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-4">
          {METRICS.map(([n, l]) => (
            <div key={l} className="leading-tight">
              <div className="font-display font-semibold text-2xl md:text-3xl tracking-tight text-foreground">
                {n}
              </div>
              <div className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-foreground/45 mt-1">
                {l}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
