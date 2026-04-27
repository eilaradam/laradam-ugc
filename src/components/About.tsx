"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ABOUT } from "@/data/content";

const ACCENT = "#d17d39";
const BROWN = "#d17d39";
const CREAM = "#E8DFD3";

export default function About() {
  return (
    <section
      id="sobre"
      className="px-6 md:px-12 pt-12 md:pt-20 pb-12 md:pb-20 max-w-7xl mx-auto"
    >
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* LEFT: photo with backdrops + bubbles + curved line */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[4/5] max-w-md mx-auto md:mx-0 w-full"
        >
          {/* Cream backdrop (atrás, offset pra direita+baixo) */}
          <div
            style={{ backgroundColor: CREAM }}
            className="absolute top-8 right-0 w-[78%] h-[88%] rounded-3xl"
          />

          {/* Brown card com a foto (frente, offset pra esquerda+cima) */}
          <div
            style={{ backgroundColor: BROWN }}
            className="absolute top-0 left-0 w-[78%] h-[88%] rounded-3xl overflow-hidden"
          >
            {/* Textura granulada — polka dots sutis */}
            <div
              className="absolute inset-0 opacity-40 mix-blend-overlay"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1.2px)",
                backgroundSize: "10px 10px",
              }}
            />
            {/* Grão fino adicional */}
            <div
              className="absolute inset-0 opacity-30 mix-blend-soft-light pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.8) 0.5px, transparent 0.8px)",
                backgroundSize: "4px 4px",
              }}
            />
            <img
              src="/lara-sobre1.png"
              alt="Lara Dam"
              className="absolute inset-0 w-full h-full object-cover object-bottom"
            />
          </div>

          {/* Linha curva decorativa branca conectando os bubbles */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 400 500"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M 90 175 C 60 220, 110 280, 140 320 S 220 400, 260 410"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Bubble 1: A entrega foi perfeita — topo direito */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            animate={{ y: [0, -6, 0] }}
            style={{
              animationDelay: "1s",
            }}
            className="absolute -top-2 right-4 md:right-8 z-20 bg-white shadow-xl rounded-2xl px-3 py-2.5 flex items-center gap-2.5 border border-foreground/5"
          >
            <span
              style={{ backgroundColor: ACCENT }}
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <Check className="w-3 h-3 text-foreground" strokeWidth={3} />
            </span>
            <div className="text-[12px] leading-tight">
              <div className="font-semibold text-foreground">
                A entrega foi perfeita!
              </div>
              <div className="text-foreground-soft">Super alinhada</div>
            </div>
          </motion.div>

          {/* Bubble 2: Primeiro Contato — meio esquerda */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="absolute top-[28%] -left-2 md:left-2 z-20 bg-white shadow-xl rounded-2xl px-3 py-2.5 flex items-center gap-2.5 border border-foreground/5"
          >
            <span
              style={{ backgroundColor: ACCENT }}
              className="w-6 h-6 rounded-full flex-shrink-0"
            />
            <div className="text-[12px] font-semibold text-foreground">
              Primeiro Contato
            </div>
          </motion.div>

          {/* Bubble 3: Resultados para a sua marca — embaixo direita */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="absolute bottom-[10%] right-2 md:right-4 z-20 bg-white shadow-xl rounded-2xl px-3 py-2.5 flex items-center gap-2.5 border border-foreground/5 max-w-[170px]"
          >
            <span
              style={{ backgroundColor: ACCENT }}
              className="w-6 h-6 rounded-full flex-shrink-0"
            />
            <div className="text-[12px] leading-tight font-semibold text-foreground">
              Resultados para a sua marca
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT: texto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            Sobre mim
          </div>

          <h2 className="font-display font-black text-3xl md:text-5xl text-foreground leading-[0.95] tracking-tighter mb-6">
            Oie, eu sou a{" "}
            <span className="text-primary font-serif-accent italic">
              Lara Dam
            </span>
          </h2>

          <p className="text-sm md:text-base text-foreground-soft leading-relaxed max-w-xl">
            {ABOUT.body}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="px-5 py-3 rounded-full bg-primary-light border border-primary/20">
              <span className="text-sm font-semibold text-primary">
                +200 marcas parceiras
              </span>
            </div>
            <div className="px-5 py-3 rounded-full bg-foreground/5 border border-foreground/10">
              <span className="text-sm font-semibold text-foreground">
                Litoral de SP · Brasil
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
