"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HeroPhoto } from "./_shared";

export default function HeroOption5() {
  return (
    <section
      id="top"
      className="relative bg-background min-h-screen flex flex-col justify-center pt-32 md:pt-36 pb-16 md:pb-20 px-5 md:px-8 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full text-center relative">
        {/* Foto pequena no topo, contida em círculo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative inline-flex items-center justify-center mb-8 md:mb-10"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-primary-light shadow-xl ring-8 ring-background relative">
            <HeroPhoto className="absolute inset-0 w-full h-full object-cover object-top scale-110" />
          </div>
          <span className="absolute -top-2 -right-2 px-2.5 py-1 rounded-full bg-primary text-background text-[9px] uppercase tracking-[0.2em] font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" /> Disponível
          </span>
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-primary font-medium mb-5 md:mb-6"
        >
          Lara Dam · UGC Creator
        </motion.div>

        {/* Título serif elegante */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif-accent font-light text-foreground leading-[1.05] tracking-[-0.02em] text-4xl md:text-6xl lg:text-7xl max-w-3xl mx-auto"
        >
          Conteúdo que{" "}
          <span className="italic text-primary font-medium">conecta</span>
          <br className="hidden md:block" />
          {" "}e{" "}
          <span className="italic text-primary font-medium">converte</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-6 md:mt-8 text-foreground-soft text-base md:text-lg leading-relaxed max-w-xl mx-auto"
        >
          Mais de 500 vídeos, 200 marcas parceiras e 100M de views — UGC pensado pra
          performar em cada canal.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-9 md:mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          <a href="#contato" className="group inline-flex items-center gap-2.5 px-6 md:px-7 py-3 md:py-3.5 bg-foreground text-background rounded-full text-sm md:text-base font-semibold hover:bg-primary transition-colors">
            Quero criar com a Lara
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-45 transition-transform duration-300" strokeWidth={2.5} />
          </a>
          <a href="#categorias" className="text-sm md:text-base font-semibold text-foreground-soft hover:text-primary transition-colors px-3">
            Ver portfólio →
          </a>
        </motion.div>

        {/* Detalhes inferiores */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-14 md:mt-20 flex items-center justify-center gap-8 md:gap-12 text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted"
        >
          <span>InfinitePay</span>
          <span className="opacity-30">·</span>
          <span>Méliuz</span>
          <span className="opacity-30">·</span>
          <span>DT3</span>
          <span className="opacity-30 hidden md:inline">·</span>
          <span className="hidden md:inline">+200 marcas</span>
        </motion.div>
      </div>
    </section>
  );
}
