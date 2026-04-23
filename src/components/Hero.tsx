"use client";

import { motion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-background noise pt-24 md:pt-0"
    >
      {/* Big background type */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.04, scale: 1 }}
          transition={{ duration: 2 }}
          className="font-display font-black text-[36vw] md:text-[32vw] leading-none text-primary tracking-tighter"
        >
          UGC
        </motion.div>
      </div>

      {/* Top-right tag — desktop only (mobile tem isso integrado no content) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="hidden md:block absolute top-28 right-12 text-right z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-light border border-primary/20">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            Disponível para projetos 2026
          </span>
        </div>
      </motion.div>

      {/* Left side meta — desktop only */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="hidden md:block absolute top-32 left-12 z-10 text-xs uppercase tracking-[0.2em] text-foreground-soft"
      >
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3" />
          <span>Litoral de SP · BR</span>
        </div>
        <div className="mt-2 text-muted">Portfólio · 2026</div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 px-5 md:px-12 pb-12 md:pb-24 max-w-7xl mx-auto w-full">
        {/* Mobile-only top meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex md:hidden flex-wrap gap-2 items-center mb-6"
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-light border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-medium text-primary uppercase tracking-wider">
              Aberta pra 2026
            </span>
          </div>
          <div className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] text-foreground-soft">
            <MapPin className="w-3 h-3" />
            <span>Litoral de SP</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary font-medium mb-4 md:mb-6 flex items-center gap-3"
        >
          <span className="h-px w-6 md:w-8 bg-primary" />
          UGC Creator & Content Strategist
        </motion.div>

        <h1 className="font-display font-black text-foreground leading-[0.85]">
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[20vw] md:text-[8vw]"
          >
            LARA
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[20vw] md:text-[8vw] text-primary relative"
          >
            DAM
            <span className="font-serif-accent italic text-[0.2em] md:text-[0.3em] text-foreground-soft absolute -bottom-1 md:-bottom-2 right-0 md:right-8">
              est. 2024
            </span>
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-6 md:mt-12 grid md:grid-cols-2 gap-6 md:gap-8 items-end"
        >
          <p className="text-foreground-soft text-sm md:text-lg max-w-md leading-relaxed">
            Criando conteúdo que <span className="font-serif-accent italic text-primary">converte</span> —
            de hook a CTA, cada segundo pensado pra performar. +500 vídeos, +200
            marcas parceiras, 60M+ views.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 md:gap-3 md:justify-end">
            <a
              href="#categorias"
              className="group inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-foreground text-background rounded-full text-xs md:text-sm font-semibold hover:bg-primary transition-colors"
            >
              Ver portfólio
              <ArrowDown className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 border border-foreground/20 rounded-full text-xs md:text-sm font-semibold hover:bg-foreground hover:text-background transition-colors"
            >
              Fale com a Lara
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
