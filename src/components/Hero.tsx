"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative bg-primary-light pt-28 md:pt-32 pb-12 md:pb-16 overflow-hidden"
    >
      <DecorativePattern />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Top row: 3 infos */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background border border-primary/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] md:text-xs font-medium text-primary uppercase tracking-[0.15em]">
              Disponível para 2026
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden md:flex items-center justify-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary font-medium"
          >
            <span className="h-px w-6 md:w-8 bg-primary" />
            UGC Creator & Content Strategist
            <span className="h-px w-6 md:w-8 bg-primary" />
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

        {/* Card editorial contido */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[28px] md:rounded-[40px] bg-[#EDDDC4] overflow-hidden"
        >
          <div className="grid md:grid-cols-12 items-stretch min-h-[58vh] md:min-h-[64vh]">
            {/* Esquerda: texto */}
            <div className="md:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="block font-serif-accent italic text-xl md:text-2xl text-foreground/60 mb-2 md:mb-3"
              >
                Prazer,
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif-accent font-medium text-foreground leading-[1.05] tracking-tight text-3xl md:text-5xl lg:text-[58px]"
              >
                Conteúdo onde{" "}
                <span className="text-primary font-semibold">estratégia</span> e{" "}
                <span className="italic text-primary">estética</span> caminham
                lado a lado
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.7 }}
                className="mt-5 md:mt-6 text-foreground-soft text-sm md:text-base leading-relaxed max-w-md"
              >
                Sou a <strong className="font-semibold text-foreground">Lara Dam</strong>,
                UGC creator e content strategist. +500 vídeos, +200 marcas
                parceiras, +100M views — cada criativo pensado pra converter.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.7 }}
                className="mt-7 md:mt-8 flex flex-wrap items-center gap-3"
              >
                <a
                  href="#contato"
                  className="group inline-flex items-center gap-3 pl-1.5 pr-5 md:pr-6 py-1.5 bg-primary text-background rounded-full text-sm md:text-base font-semibold hover:bg-primary-dark transition-colors"
                >
                  <span className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-background text-primary flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight
                      className="w-4 h-4 md:w-5 md:h-5"
                      strokeWidth={2.5}
                    />
                  </span>
                  Quero criar com a Lara
                </a>
                <a
                  href="#categorias"
                  className="inline-flex items-center text-xs md:text-sm font-semibold text-foreground/70 hover:text-primary transition-colors px-3"
                >
                  Ver portfólio →
                </a>
              </motion.div>
            </div>

            {/* Direita: foto */}
            <div className="md:col-span-5 relative h-full flex items-end justify-center md:justify-end overflow-hidden order-1 md:order-2 min-h-[280px] md:min-h-0">
              <HeroPhoto />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Padrão decorativo — pequenos "X" marcados sutilmente no fundo
function DecorativePattern() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        aria-hidden
      >
        <defs>
          <pattern
            id="hero-x-pattern"
            x="0"
            y="0"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 18 22 L 26 30 M 26 22 L 18 30"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="text-primary-dark"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-x-pattern)" />
      </svg>
    </div>
  );
}

function HeroPhoto() {
  const SOURCES = [
    "/lara-fundo.png",
    "/larafundo.png",
    "/lara-hero.png",
    "/lara-hero.jpg",
    "/lara-sobre.jpg",
  ];
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <img
      src={SOURCES[idx]}
      alt="Lara Dam"
      className="w-auto h-[42vh] md:h-[60vh] max-w-[90%] md:max-w-full object-contain object-bottom"
      onError={() => {
        if (idx < SOURCES.length - 1) setIdx(idx + 1);
        else setFailed(true);
      }}
    />
  );
}
