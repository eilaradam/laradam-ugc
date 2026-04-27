"use client";

import { motion } from "framer-motion";
import { Check, MessageCircle, Sparkles } from "lucide-react";
import { ABOUT } from "@/data/content";

const ACCENT = "#d17d39";
const BROWN = "#d17d39";
const CREAM = "#E8DFD3";

export default function About() {
  return (
    <section
      id="sobre"
      className="px-6 md:px-12 pt-4 md:pt-8 pb-4 md:pb-8 max-w-7xl mx-auto"
    >
      <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        {/* LEFT: photo + jornada (primeiro contato → criação → entrega) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[4/5] max-w-[400px] mx-auto md:ml-auto md:mr-0 w-full"
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

          {/* Linha da jornada — mistura reta + curva conectando os 3 pontos */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 400 500"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Bubble 1 (Primeiro Contato) → Bubble 2 (Criação) → Bubble 3 (Entrega) */}
            <path
              d="M 95 135 L 95 195 C 95 240, 200 230, 245 270 L 275 285 C 320 305, 320 360, 295 405 L 295 430"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="0 1"
            />
          </svg>

          {/* Bubble 1: Primeiro Contato — TOPO ESQUERDA (origem) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute top-4 left-0 md:left-2 z-20 bg-white shadow-xl rounded-2xl px-3 py-2.5 flex items-center gap-2.5 border border-foreground/5"
          >
            <span
              style={{ backgroundColor: ACCENT }}
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <MessageCircle
                className="w-3.5 h-3.5 text-white"
                strokeWidth={2.5}
              />
            </span>
            <div className="text-[12px] leading-tight">
              <div className="text-foreground-soft text-[10px] uppercase tracking-wider">
                Etapa 1
              </div>
              <div className="font-semibold text-foreground">
                Primeiro contato
              </div>
            </div>
          </motion.div>

          {/* Bubble 2: Criação — MEIO DIREITA (processo, ícone pequeno) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="absolute top-[52%] right-0 md:right-2 z-20 bg-white shadow-xl rounded-xl p-2.5 border border-foreground/5"
          >
            <div className="flex items-center gap-2">
              <span
                style={{ backgroundColor: ACCENT }}
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <Sparkles
                  className="w-3.5 h-3.5 text-white"
                  strokeWidth={2.5}
                />
              </span>
              <div className="text-[12px] leading-tight pr-1">
                <div className="text-foreground-soft text-[10px] uppercase tracking-wider">
                  Etapa 2
                </div>
                <div className="font-semibold text-foreground">Criação</div>
              </div>
            </div>
          </motion.div>

          {/* Bubble 3: Entrega — EMBAIXO (destino) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-2 right-2 md:right-6 z-20 bg-white shadow-xl rounded-2xl px-3 py-2.5 flex items-center gap-2.5 border border-foreground/5"
          >
            <span
              style={{ backgroundColor: ACCENT }}
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            </span>
            <div className="text-[12px] leading-tight">
              <div className="text-foreground-soft text-[10px] uppercase tracking-wider">
                Etapa 3
              </div>
              <div className="font-semibold text-foreground">Entrega</div>
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
