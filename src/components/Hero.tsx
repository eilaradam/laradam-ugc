"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowDown, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col overflow-hidden bg-background noise pt-24 md:pt-28"
    >
      {/* Top row: tags em cantos opostos */}
      <div className="relative z-30 px-5 md:px-12 flex flex-wrap items-center justify-between gap-3">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-light border border-primary/20"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] md:text-xs font-medium text-primary uppercase tracking-[0.15em]">
            Disponível para 2026
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center gap-1.5 text-[10px] md:text-xs uppercase tracking-[0.2em] text-foreground-soft"
        >
          <MapPin className="w-3 h-3" />
          <span>Litoral de SP · BR</span>
        </motion.div>
      </div>

      {/* Eyebrow label centralizado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative z-30 flex items-center justify-center gap-3 mt-6 md:mt-8 text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary font-medium"
      >
        <span className="h-px w-6 md:w-8 bg-primary" />
        UGC Creator & Content Strategist
        <span className="h-px w-6 md:w-8 bg-primary" />
      </motion.div>

      {/* Composição: LARA · FOTO · DAM numa linha horizontal */}
      <div className="relative flex-1 flex items-center justify-center my-4 md:my-8 px-4">
        {/* "Prazer," accent */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="hidden md:block absolute top-4 left-12 z-10"
        >
          <span className="font-serif-accent italic text-2xl text-foreground-soft">
            Prazer,
          </span>
        </motion.div>

        {/* Linha horizontal */}
        <div className="flex items-center justify-center gap-3 md:gap-6 w-full max-w-7xl">
          {/* LARA à esquerda */}
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-foreground leading-none tracking-tighter text-[14vw] md:text-[10vw]"
          >
            LARA
          </motion.h1>

          {/* FOTO no meio */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.65, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0"
          >
            <HeroPhoto />
          </motion.div>

          {/* DAM à direita */}
          <motion.h1
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-primary leading-none tracking-tighter text-[14vw] md:text-[10vw] relative"
          >
            DAM
            <span className="font-serif-accent italic text-[0.2em] text-foreground-soft absolute -bottom-1 -right-2 md:-right-4">
              est. 2024
            </span>
          </motion.h1>
        </div>
      </div>

      {/* Bottom: descrição + CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="relative z-30 px-5 md:px-12 pb-12 md:pb-16 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-5 md:gap-8 items-end"
      >
        <p className="text-foreground-soft text-sm md:text-base max-w-md leading-relaxed">
          Criando conteúdo que{" "}
          <span className="font-serif-accent italic text-primary">converte</span>{" "}
          — de hook a CTA, cada segundo pensado pra performar. +500 vídeos,
          +200 marcas parceiras, 60M+ views.
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
    </section>
  );
}

function HeroPhoto() {
  // Cascata: larafundo.png (PNG sem fundo ideal) → fallbacks
  const SOURCES = ["/larafundo.png", "/lara-hero.png", "/lara-hero.jpg", "/lara-sobre.jpg"];
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  const isPng = SOURCES[idx]?.endsWith(".png");

  if (isPng) {
    // PNG sem fundo: sem border, sem aspect fixo — só altura generosa
    // pra foto sangrar natural entre as letras LARA / DAM
    return (
      <img
        src={SOURCES[idx]}
        alt="Lara Dam"
        className="h-[38vh] md:h-[62vh] w-auto max-w-[44vw] object-contain"
        onError={() => {
          if (idx < SOURCES.length - 1) setIdx(idx + 1);
          else setFailed(true);
        }}
      />
    );
  }

  // JPG com fundo: mantém card retangular com bordas arredondadas
  return (
    <div className="relative h-[30vh] md:h-[50vh] aspect-[3/4] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl">
      <img
        src={SOURCES[idx]}
        alt="Lara Dam"
        className="absolute inset-0 w-full h-full object-cover"
        onError={() => {
          if (idx < SOURCES.length - 1) setIdx(idx + 1);
          else setFailed(true);
        }}
      />
    </div>
  );
}
