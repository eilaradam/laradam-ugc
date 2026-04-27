"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { HeroPhoto } from "./_shared";

export default function HeroOption2() {
  return (
    <section
      id="top"
      className="relative bg-foreground text-background min-h-screen overflow-hidden flex flex-col"
    >
      {/* Foto full-bleed de fundo */}
      <div className="absolute inset-0 z-0">
        <HeroPhoto className="w-full h-full object-cover object-center opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/30 to-foreground/40" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-between pt-28 md:pt-32 pb-10 md:pb-14 px-5 md:px-12">
        {/* Top: masthead row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-start justify-between text-background"
        >
          <div className="font-serif-accent italic text-xl md:text-2xl tracking-tight">
            issue 01 · 2026
          </div>
          <div className="text-right">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium opacity-80">
              The UGC Issue
            </div>
            <div className="text-[9px] uppercase tracking-[0.3em] opacity-50 mt-1">
              ugc.laradam.com
            </div>
          </div>
        </motion.div>

        {/* Title gigante */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="my-auto py-12 md:py-0"
        >
          <h1 className="font-serif-accent text-background leading-[0.85] tracking-[-0.04em] text-[18vw] md:text-[14vw] lg:text-[12vw] font-medium">
            <span className="block">Lara</span>
            <span className="block italic text-primary -mt-2 md:-mt-4">Dam</span>
          </h1>
          <div className="mt-3 md:mt-5 flex flex-col gap-1.5 max-w-xl">
            <p className="font-serif-accent italic text-xl md:text-2xl text-background/85">
              Conteúdo que conecta, criativo que converte.
            </p>
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-background/60">
              UGC Creator · Performance · São Paulo
            </p>
          </div>
        </motion.div>

        {/* Bottom: editorial captions estilo revista */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-background pt-6 border-t border-background/15"
        >
          <Caption number="500+" label="vídeos publicados" />
          <Caption number="200+" label="marcas parceiras" />
          <Caption number="100M+" label="views totais" />
          <div className="flex items-center justify-end gap-2">
            <Star className="w-3.5 h-3.5 fill-primary text-primary" strokeWidth={0} />
            <a href="#contato" className="text-xs md:text-sm font-semibold underline underline-offset-4 hover:text-primary transition-colors">
              Trabalhe comigo →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Caption({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="font-display font-black text-2xl md:text-4xl tracking-tight">
        {number}
      </div>
      <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-background/60 mt-1">
        {label}
      </div>
    </div>
  );
}
