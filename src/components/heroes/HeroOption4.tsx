"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { HeroPhoto } from "./_shared";

export default function HeroOption4() {
  return (
    <section
      id="top"
      className="relative bg-background min-h-screen overflow-hidden flex flex-col pt-24 md:pt-28"
    >
      {/* Top bar */}
      <div className="px-5 md:px-12 py-4 border-y-2 border-foreground flex items-center justify-between text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold">
        <span>Lara Dam · 001</span>
        <span className="hidden md:inline">UGC Creator & Strategist</span>
        <span>2026</span>
      </div>

      {/* Main */}
      <div className="flex-1 grid md:grid-cols-12 gap-0">
        {/* Coluna esquerda: tipografia gigante */}
        <div className="md:col-span-8 px-5 md:px-12 py-10 md:py-14 flex flex-col justify-between border-b-2 md:border-b-0 md:border-r-2 border-foreground">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-foreground leading-[0.78] tracking-[-0.06em] text-[18vw] md:text-[15vw] lg:text-[13vw]"
          >
            <span className="block">CON-</span>
            <span className="block">TEÚDO<span className="text-primary">.</span></span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-8 md:mt-10 max-w-2xl"
          >
            <p className="font-display font-bold text-foreground text-xl md:text-3xl leading-[1.1] tracking-tight">
              De hook a CTA, cada segundo pensado pra <span className="bg-foreground text-background px-1.5">performar</span>.
            </p>
            <p className="mt-4 text-foreground-soft text-sm md:text-base leading-relaxed max-w-md">
              500 vídeos. 200 marcas. 100 milhões de views. Sou a Lara Dam — UGC creator e content strategist.
            </p>
          </motion.div>
        </div>

        {/* Coluna direita: foto + CTA */}
        <div className="md:col-span-4 flex flex-col">
          <div className="relative bg-foreground flex-1 min-h-[350px] md:min-h-0 overflow-hidden border-b-2 border-foreground">
            <HeroPhoto className="absolute inset-0 w-full h-full object-cover object-top grayscale-[20%] contrast-[1.1]" />
            <div className="absolute top-4 left-4 px-2 py-1 bg-primary text-background text-[9px] uppercase tracking-[0.3em] font-bold">
              ⌂ Disponível 2026
            </div>
          </div>
          <a
            href="#contato"
            className="group bg-primary text-background px-6 py-6 md:py-8 flex items-center justify-between hover:bg-primary-dark transition-colors"
          >
            <div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-80">Próxima campanha</div>
              <div className="font-display font-black text-xl md:text-2xl tracking-tight mt-1">Trabalhe comigo →</div>
            </div>
            <ArrowDownRight className="w-8 h-8 md:w-10 md:h-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </section>
  );
}
