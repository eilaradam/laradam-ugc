"use client";

import { motion } from "framer-motion";
import { useState } from "react";
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

      {/* Top-right tag — desktop only */}
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
      <div className="relative z-10 px-5 md:px-12 pb-12 md:pb-20 max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-6 md:gap-10 items-end">
        {/* Texto + CTAs — ocupa ~8/12 do grid no desktop */}
        <div className="md:col-span-8">
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
              className="block text-[20vw] md:text-[11vw]"
            >
              LARA
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[20vw] md:text-[11vw] text-primary relative"
            >
              DAM
              <span className="font-serif-accent italic text-[0.2em] md:text-[0.25em] text-foreground-soft absolute -bottom-1 md:-bottom-2 right-0 md:right-4">
                est. 2024
              </span>
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-6 md:mt-10"
          >
            <p className="text-foreground-soft text-sm md:text-lg max-w-md leading-relaxed">
              Criando conteúdo que{" "}
              <span className="font-serif-accent italic text-primary">
                converte
              </span>{" "}
              — de hook a CTA, cada segundo pensado pra performar. +500
              vídeos, +200 marcas parceiras, 60M+ views.
            </p>

            <div className="mt-5 md:mt-6 flex flex-wrap items-center gap-2.5 md:gap-3">
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

        {/* Foto lateral — ocupa ~4/12 no desktop, absoluta em mobile */}
        <HeroPhoto />
      </div>
    </section>
  );
}

function HeroPhoto() {
  // Tenta /lara-hero.jpg primeiro (foto específica do hero),
  // se não existir cai pra /lara-sobre.jpg (mesma do About).
  const [src, setSrc] = useState("/lara-hero.jpg");
  const [failed, setFailed] = useState(false);

  if (failed) return null; // nenhuma foto disponível — hero fica só com texto

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="md:col-span-4 relative self-end"
    >
      <div className="relative aspect-[3/4] w-full max-w-[260px] md:max-w-[340px] mx-auto md:ml-auto md:mr-0 rounded-3xl overflow-hidden shadow-2xl">
        <img
          src={src}
          alt="Lara Dam"
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => {
            if (src === "/lara-hero.jpg") {
              setSrc("/lara-sobre.jpg");
            } else {
              setFailed(true);
            }
          }}
        />

        {/* Gradiente sutil no fundo pra legibilidade do caption */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Caption editorial */}
        <div className="absolute bottom-3 left-3 right-3 text-background">
          <div className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-background/70">
            Retrato
          </div>
          <div className="font-display font-black text-sm md:text-base tracking-tight">
            Lara Dam
          </div>
        </div>

        {/* Ponto pulsante "ao vivo" */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-background/20 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[9px] uppercase tracking-wider text-background font-semibold">
            2026
          </span>
        </div>
      </div>
    </motion.div>
  );
}
