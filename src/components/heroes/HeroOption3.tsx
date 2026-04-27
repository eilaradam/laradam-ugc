"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Sparkles, TrendingUp } from "lucide-react";
import { HeroPhoto } from "./_shared";

export default function HeroOption3() {
  return (
    <section
      id="top"
      className="relative bg-background pt-28 md:pt-32 pb-12 md:pb-16 px-4 md:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6 md:mb-8 text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary font-medium"
        >
          <span className="h-px w-8 bg-primary" />
          UGC Creator & Content Strategist
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 grid-rows-[auto_auto_auto] md:grid-rows-2 gap-3 md:gap-4">
          {/* Cell 1: Foto grande (col-span 3, row-span 2) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="col-span-2 md:col-span-3 md:row-span-2 relative rounded-3xl overflow-hidden bg-foreground aspect-[4/5] md:aspect-auto"
          >
            <HeroPhoto className="absolute inset-0 w-full h-full object-cover object-center" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent p-5 md:p-6 text-background">
              <div className="text-[10px] uppercase tracking-[0.3em] opacity-80">Lara Dam</div>
              <div className="font-serif-accent italic text-xl md:text-2xl mt-1">est. 2024</div>
            </div>
          </motion.div>

          {/* Cell 2: Título */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="col-span-2 md:col-span-3 rounded-3xl bg-foreground text-background p-6 md:p-8 flex flex-col justify-center min-h-[200px] md:min-h-0"
          >
            <h1 className="font-display font-black leading-[0.92] tracking-tighter text-3xl md:text-5xl lg:text-6xl">
              Conteúdo que <span className="text-primary">conecta</span> e <span className="font-serif-accent italic font-medium text-primary">converte</span>.
            </h1>
            <p className="mt-4 text-background/70 text-sm md:text-base max-w-md">
              Criativos pensados pra performar — de hook a CTA, cada segundo conta.
            </p>
          </motion.div>

          {/* Cell 3: Stat 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="rounded-3xl bg-primary text-background p-5 md:p-6 flex flex-col justify-between min-h-[140px]"
          >
            <TrendingUp className="w-5 h-5" />
            <div>
              <div className="font-display font-black text-2xl md:text-4xl tracking-tight">100M+</div>
              <div className="text-[10px] md:text-xs uppercase tracking-wider opacity-90 mt-1">views totais</div>
            </div>
          </motion.div>

          {/* Cell 4: Stat 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="rounded-3xl bg-primary-light text-foreground p-5 md:p-6 flex flex-col justify-between min-h-[140px]"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <div>
              <div className="font-display font-black text-2xl md:text-4xl tracking-tight">+200</div>
              <div className="text-[10px] md:text-xs uppercase tracking-wider opacity-70 mt-1">marcas parceiras</div>
            </div>
          </motion.div>

          {/* Cell 5: CTA */}
          <motion.a
            href="#contato"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="col-span-2 md:col-span-1 group rounded-3xl bg-foreground text-background p-5 md:p-6 flex flex-col justify-between min-h-[140px] hover:bg-primary transition-colors"
          >
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            <div>
              <div className="font-display font-bold text-base md:text-lg leading-tight">Trabalhe comigo</div>
              <div className="text-[10px] md:text-xs uppercase tracking-wider opacity-70 mt-1">disponível 2026</div>
            </div>
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-6 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-foreground-soft"
        >
          <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> Litoral SP · BR</span>
          <span>Portfólio 2026</span>
        </motion.div>
      </div>
    </section>
  );
}
