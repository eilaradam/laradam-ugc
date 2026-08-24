"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJETO, PROJETO_MARQUEE } from "@/data/projeto";
import ProjetoGaleria from "./ProjetoGaleria";
import Ornamento from "./Ornamento";
import { waLink } from "./ProjetoNav";

export { waLink };

export default function ProjetoHero() {
  return (
    <section id="topo" className="bg-pj-bg">
      <div className="mx-auto max-w-[1100px] px-5 pb-14 pt-10 text-center sm:px-10 sm:pb-20 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3"
        >
          <Ornamento className="h-8 w-8 text-pj-olive-soft" />
          <span className="pj-label text-pj-muted">{PROJETO.eyebrow}</span>
          <Ornamento className="h-8 w-8 text-pj-terra" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="pj-display mx-auto mt-8 text-[2.6rem] sm:text-[4.4rem] lg:text-[5.2rem]"
        >
          Uma reforma inteira
          <br />
          <span className="mt-1 inline-block bg-pj-olive-soft/45 px-3 py-1">
            virando conteúdo
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mx-auto mt-8 max-w-2xl text-[16px] leading-relaxed text-pj-muted sm:text-[18px]"
        >
          {PROJETO.intro} {PROJETO.intro2}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
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
            className="inline-flex items-center gap-2 rounded-full border border-pj-line bg-pj-paper px-7 py-3.5 text-sm font-semibold transition hover:border-pj-ink"
          >
            Ver o que estou procurando
          </a>
        </motion.div>
      </div>

      {/* faixa de imagem ocupando a largura toda */}
      <ProjetoGaleria />

      {/* faixa corrida */}
      <div className="overflow-hidden bg-pj-ink py-3.5 text-pj-bg">
        <div className="marquee">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="pj-label flex items-center gap-8 whitespace-nowrap"
            >
              {PROJETO_MARQUEE}
              <Ornamento className="h-3.5 w-3.5 text-pj-olive-soft" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
