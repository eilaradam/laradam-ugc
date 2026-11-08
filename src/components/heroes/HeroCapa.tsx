"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

// Capa nova (08/11/2026): nome gigante à esquerda, foto 26 do ensaio (janela) à direita.
// Cores e fonte vêm dos tokens do tema (--background, --foreground, --primary, font-display),
// então a mesma capa serve pros 3 temas em /capa-opcoes.
const FOTO = "/ensaio/publi-janela.webp";

export default function HeroCapa() {
  const t = useT();
  return (
    <section id="top" className="relative bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10 grid md:grid-cols-[1.15fr_1fr] gap-8 md:gap-12 items-center pt-24 md:pt-16 pb-12 md:pb-16 min-h-[min(860px,100svh)]">
        {/* esquerda: nome */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-foreground-soft"
          >
            <span className="w-2 h-2 rounded-full bg-primary" />
            {t.hero.badge}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-foreground leading-[0.86] tracking-tight mt-6 text-[22vw] md:text-[9rem] lg:text-[10.5rem]"
          >
            Lara
            <br />
            <em className="text-primary">Dam</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-6 text-lg md:text-xl text-foreground-soft max-w-md leading-relaxed"
          >
            {t.hero.body1}
          </motion.p>

          {/* provas rápidas */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {["500+ vídeos", "300+ marcas", "140M+ views"].map((p) => (
              <span key={p} className="px-3 py-1.5 rounded-full border border-foreground/15 text-sm font-semibold text-foreground">{p}</span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <a href="#contato" className="inline-flex px-8 py-4 rounded-full bg-primary text-white font-bold hover:opacity-90 transition-opacity">
              {t.hero.cta}
            </a>
            <a href="#categorias" className="font-semibold text-foreground underline underline-offset-4 decoration-primary decoration-2">
              {t.hero.saibaMais}
            </a>
          </motion.div>
        </div>

        {/* direita: foto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] rounded-t-[999px] rounded-b-3xl overflow-hidden bg-background-alt">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={FOTO} alt="Lara Dam" fetchPriority="high" className="capa-zoom absolute inset-0 w-full h-full object-cover object-[50%_30%]" />
          </div>
          {/* selo de prova, abaixo do rosto */}
          <div className="absolute -left-4 md:-left-10 bottom-10 bg-background shadow-xl rounded-2xl px-4 py-3 border border-foreground/10">
            <div className="font-display text-3xl text-primary leading-none">100M</div>
            <div className="text-xs text-foreground-soft mt-1">views em 1 vídeo · InfinitePay</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
