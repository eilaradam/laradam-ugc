"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { HeroPhoto } from "./_shared";

export default function HeroOption1() {
  return (
    <section
      id="top"
      className="relative bg-primary-light pt-28 md:pt-32 pb-12 md:pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <svg width="100%" height="100%" aria-hidden>
          <defs>
            <pattern id="opt1-pattern" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M18 22 L26 30 M26 22 L18 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-primary-dark" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#opt1-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-8 md:mb-10">
          <span className="px-2.5 py-1 rounded-full bg-background border border-primary/20 text-[10px] uppercase tracking-[0.15em] text-primary font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Disponível 2026
          </span>
          <span className="hidden md:flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-primary font-medium">
            <span className="h-px w-8 bg-primary" />
            UGC Creator & Strategist
            <span className="h-px w-8 bg-primary" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-foreground-soft flex items-center gap-1.5">
            <MapPin className="w-3 h-3" /> Litoral SP · BR
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[28px] md:rounded-[40px] bg-[#EDDDC4] overflow-hidden"
        >
          <div className="grid md:grid-cols-12 items-stretch min-h-[58vh] md:min-h-[64vh]">
            <div className="md:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1">
              <span className="font-serif-accent italic text-xl md:text-2xl text-foreground/60 mb-2">Prazer,</span>
              <h1 className="font-serif-accent font-medium text-foreground leading-[1.05] tracking-tight text-3xl md:text-5xl lg:text-[58px]">
                Conteúdo onde <span className="text-primary font-semibold">estratégia</span> e <span className="italic text-primary">estética</span> caminham lado a lado
              </h1>
              <p className="mt-5 md:mt-6 text-foreground-soft text-sm md:text-base leading-relaxed max-w-md">
                Sou a <strong className="font-semibold text-foreground">Lara Dam</strong>, UGC creator e content strategist. +500 vídeos, +200 marcas parceiras, +100M views.
              </p>
              <div className="mt-7 md:mt-8 flex flex-wrap items-center gap-3">
                <a href="#contato" className="group inline-flex items-center gap-3 pl-1.5 pr-5 md:pr-6 py-1.5 bg-primary text-background rounded-full text-sm md:text-base font-semibold hover:bg-primary-dark transition-colors">
                  <span className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-background text-primary flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
                  </span>
                  Quero criar com a Lara
                </a>
              </div>
            </div>
            <div className="md:col-span-5 relative h-full flex items-end justify-center md:justify-end overflow-hidden order-1 md:order-2 min-h-[280px] md:min-h-0">
              <HeroPhoto className="w-auto h-[42vh] md:h-[60vh] max-w-[90%] md:max-w-full object-bottom" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
