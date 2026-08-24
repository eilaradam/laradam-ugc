"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJETO, PROJETO_SOBRE } from "@/data/projeto";
import ProjetoGaleria from "./ProjetoGaleria";

export const waLink = (msg = PROJETO.whatsappMensagem) =>
  `https://wa.me/${PROJETO.whatsapp}?text=${encodeURIComponent(msg)}`;

export default function ProjetoHero() {
  return (
    <section className="bg-pj-bg">
      {/* barra do topo */}
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-6 sm:px-10">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PROJETO_SOBRE.foto}
            alt={PROJETO_SOBRE.fotoAlt}
            className="h-10 w-10 rounded-full object-cover object-top"
          />
          <span className="leading-tight">
            <span className="block text-sm font-semibold">
              {PROJETO_SOBRE.nome}
            </span>
            <span className="block text-[12px] text-pj-muted">
              @{PROJETO.instagram}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="pj-label hidden text-pj-muted sm:block">
            {PROJETO.eyebrow}
          </span>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-pj-ink px-5 py-2.5 text-[13px] font-semibold text-pj-bg transition hover:bg-pj-olive"
          >
            Falar comigo
          </a>
        </div>
      </div>

      {/* titulo gigante + resumo */}
      <div className="mx-auto max-w-[1400px] px-5 pb-12 pt-6 sm:px-10 sm:pb-16 sm:pt-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pj-display text-[3.4rem] uppercase sm:text-[5.6rem] lg:text-[7.2rem]"
          >
            Casa
            <br />
            Estúdio
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-[17px] leading-snug sm:text-[19px]">
              {PROJETO.subtitulo}
            </p>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-pj-muted">
              {PROJETO.intro2}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-pj-terra px-7 py-3.5 text-sm font-semibold text-pj-paper transition hover:bg-pj-ink"
              >
                Quero ser parceiro
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#procuro"
                className="inline-flex items-center gap-2 rounded-full border border-pj-line px-7 py-3.5 text-sm font-semibold transition hover:border-pj-ink"
              >
                Ver o que estou procurando
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* faixa de imagem ocupando a largura toda */}
      <ProjetoGaleria />
    </section>
  );
}
