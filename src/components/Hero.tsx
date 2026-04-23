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
      <div className="relative z-40 px-5 md:px-12 flex flex-wrap items-center justify-between gap-3">
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

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative z-40 flex items-center justify-center gap-3 mt-6 md:mt-8 text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary font-medium"
      >
        <span className="h-px w-6 md:w-8 bg-primary" />
        UGC Creator & Content Strategist
        <span className="h-px w-6 md:w-8 bg-primary" />
      </motion.div>

      {/* Composição sobreposta: LARA — FOTO GRANDE — DAM */}
      <div className="relative flex-1 flex items-center justify-center my-4 md:my-6 px-2">
        {/* "Prazer," accent top-left (desktop) */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="hidden md:block absolute top-0 left-12 z-40"
        >
          <span className="font-serif-accent italic text-2xl text-foreground-soft">
            Prazer,
          </span>
        </motion.div>

        {/* "est. 2024" accent bottom-right (desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="hidden md:block absolute bottom-0 right-12 z-40 text-right"
        >
          <div className="font-serif-accent italic text-lg text-foreground-soft">
            est. 2024
          </div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted mt-0.5">
            portfólio · 2026
          </div>
        </motion.div>

        {/* Desktop: LARA · FOTO · DAM com sobreposição.
            A foto avança em cima do último "A" de LARA e primeiro "D" de DAM
            via margem negativa horizontal (-mx). Z-index maior faz ela cobrir
            as letras.
            Mobile: empilhado (LARA em cima, foto, DAM embaixo). */}
        <div className="relative w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-0">
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 font-display font-black text-foreground leading-[0.82] tracking-tighter text-[22vw] md:text-[11vw] select-none"
          >
            LARA
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.65, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-30 -my-10 md:my-0 md:-mx-[5vw] pointer-events-none flex-shrink-0"
          >
            <HeroPhoto />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 font-display font-black text-primary leading-[0.82] tracking-tighter text-[22vw] md:text-[11vw] select-none"
          >
            DAM
          </motion.h1>
        </div>
      </div>

      {/* Bottom: descrição + CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="relative z-40 px-5 md:px-12 pb-10 md:pb-14 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-5 md:gap-8 items-end"
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
  const SOURCES = ["/larafundo.png", "/lara-hero.png", "/lara-hero.jpg", "/lara-sobre.jpg"];
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  const isPng = SOURCES[idx]?.endsWith(".png");

  return (
    <img
      src={SOURCES[idx]}
      alt="Lara Dam"
      className={`w-auto object-contain ${
        isPng
          ? "h-[42vh] md:h-[78vh] max-w-[70vw] md:max-w-[36vw]"
          : "h-[36vh] md:h-[62vh] max-w-[70vw] md:max-w-[36vw] rounded-2xl shadow-2xl"
      }`}
      onError={() => {
        if (idx < SOURCES.length - 1) setIdx(idx + 1);
        else setFailed(true);
      }}
    />
  );
}
