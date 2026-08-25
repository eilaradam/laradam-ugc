"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Move3d } from "lucide-react";
import { PROJETO_ARGUMENTOS, PROJETO_PALETA, PROJETO_TOUR } from "@/data/projeto";
import Cabecalho from "./Cabecalho";

/**
 * Tour 3D + os textos do projeto na mesma tela: o modelo fica menor na coluna
 * da esquerda (grudado enquanto a pessoa le) e os argumentos e a paleta correm
 * na direita. No celular o modelo vem primeiro e os textos embaixo.
 */
export default function ProjetoTour() {
  const [interagindo, setInteragindo] = useState(false);

  return (
    <section id="tour" className="bg-pj-bg px-5 py-16 sm:px-10 sm:py-24">
      <div className="mx-auto grid max-w-[1400px] items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        {/* ESQUERDA: o modelo 3D, em tamanho reduzido */}
        <div className="lg:sticky lg:top-24">
          <Cabecalho n="03" chapeu="Tour 3D" titulo={PROJETO_TOUR.titulo} />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            onMouseLeave={() => setInteragindo(false)}
            className="mt-7 overflow-hidden rounded-3xl border border-pj-line bg-pj-bg2"
          >
            <div className="relative aspect-[4/3] w-full">
              <iframe
                src={PROJETO_TOUR.url}
                title="Tour 3D do apartamento"
                className="absolute inset-0 h-full w-full"
                loading="lazy"
              />
              {/* camada que devolve a rolagem pra pagina enquanto ninguem esta
                  girando o modelo. No celular ela manda pro tour em tela cheia,
                  porque o gesto de girar brigaria com a rolagem. */}
              {!interagindo && (
                <button
                  onClick={() => {
                    if (window.innerWidth < 640) {
                      window.open(PROJETO_TOUR.url, "_blank", "noopener");
                      return;
                    }
                    setInteragindo(true);
                  }}
                  aria-label="Interagir com o modelo 3D"
                  className="group absolute inset-0 flex items-end justify-center bg-transparent pb-5"
                >
                  <span className="flex items-center gap-2 rounded-full bg-pj-ink/85 px-4 py-2 text-[12px] font-semibold text-pj-bg backdrop-blur transition group-hover:bg-pj-ink">
                    <Move3d className="h-4 w-4" />
                    <span className="hidden sm:inline">Clique para girar o modelo</span>
                    <span className="sm:hidden">Abrir em tela cheia</span>
                  </span>
                </button>
              )}
            </div>
          </motion.div>

          <p className="mt-5 text-[14px] leading-relaxed text-pj-muted sm:text-[15px]">
            {PROJETO_TOUR.texto}
          </p>

          <a
            href={PROJETO_TOUR.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex items-center gap-2 rounded-full border border-pj-line bg-pj-paper px-5 py-2.5 text-[13px] font-semibold transition hover:border-pj-ink"
          >
            {PROJETO_TOUR.chamada}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* DIREITA: os textos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
        >
          <h3 className="pj-display max-w-[20ch] text-[1.7rem] text-pj-ink sm:text-[2.4rem]">
            Uma reforma é o melhor lugar pra mostrar um produto de casa.
          </h3>

          <div className="mt-9 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {PROJETO_ARGUMENTOS.map((a, i) => (
              <div key={a.title} className="flex gap-4">
                <span className="pj-label shrink-0 pt-1 text-pj-terra">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-[16px] font-semibold text-pj-ink">{a.title}</p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-pj-muted">
                    {a.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* paleta e materiais */}
          <div className="mt-12 border-t border-pj-line pt-10">
            <p className="pj-label text-pj-olive">Paleta e materiais</p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {PROJETO_PALETA.map((c) => (
                <div key={c.nome} className="flex items-center gap-3">
                  <span
                    className="h-11 w-11 shrink-0 rounded-full border border-pj-line"
                    style={{ backgroundColor: c.cor }}
                  />
                  <span className="min-w-0 leading-tight">
                    <span className="block text-[13px] font-semibold text-pj-ink">
                      {c.nome}
                    </span>
                    <span className="block text-[12px] text-pj-muted">{c.onde}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
