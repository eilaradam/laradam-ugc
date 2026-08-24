"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { PROJETO, PROJETO_NUMEROS } from "@/data/projeto";

export const waLink = (msg = PROJETO.whatsappMensagem) =>
  `https://wa.me/${PROJETO.whatsapp}?text=${encodeURIComponent(msg)}`;

export default function ProjetoHero() {
  return (
    <section className="relative overflow-hidden bg-foreground text-white">
      {/* textura de fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(60% 55% at 78% 8%, rgba(127,196,192,0.28) 0%, transparent 60%), radial-gradient(50% 45% at 8% 92%, rgba(127,196,192,0.14) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-on-dark sm:text-xs"
        >
          {PROJETO.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display mt-5 text-[2.6rem] leading-[1.03] tracking-tight sm:text-7xl lg:text-[5.5rem]"
        >
          Projeto{" "}
          <span className="font-serif-accent text-accent-on-dark">
            {PROJETO.nome}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-6 max-w-2xl text-lg leading-snug text-white/80 sm:text-2xl"
        >
          {PROJETO.subtitulo}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-9 max-w-2xl space-y-4 text-[15px] leading-relaxed text-white/65 sm:text-base"
        >
          <p>{PROJETO.intro}</p>
          <p className="text-white/85">{PROJETO.intro2}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent-on-dark px-7 py-4 text-sm font-semibold text-foreground transition hover:bg-white sm:text-base"
          >
            <MessageCircle className="h-[18px] w-[18px]" />
            Quero ser parceiro
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#procuro"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition hover:border-white/60 sm:text-base"
          >
            Ver o que estou procurando
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/15 pt-10 sm:grid-cols-4"
        >
          {PROJETO_NUMEROS.map((n) => (
            <div key={n.label}>
              <p className="font-display text-3xl text-accent-on-dark sm:text-4xl">
                {n.value}
              </p>
              <p className="mt-1 text-[13px] leading-tight text-white/60">
                {n.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
