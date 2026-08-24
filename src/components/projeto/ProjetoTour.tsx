"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Move3d } from "lucide-react";
import { PROJETO_TOUR } from "@/data/projeto";
import Cabecalho from "./Cabecalho";

/**
 * Tour 3D do apartamento. O modelo (Three.js) so carrega no clique e, quando
 * o mouse sai de cima, uma camada invisivel volta a cobrir o iframe pra rolagem
 * da pagina nao ficar presa no zoom do 3D.
 */
export default function ProjetoTour() {
  const [ligado, setLigado] = useState(false);
  const [interagindo, setInteragindo] = useState(false);

  return (
    <section id="tour" className="bg-pj-bg px-5 py-14 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-center gap-6">
          <Cabecalho n="03" chapeu="Tour 3D" centro titulo={PROJETO_TOUR.titulo} />
          <a
            href={PROJETO_TOUR.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-pj-line bg-pj-paper px-6 py-3 text-sm font-semibold transition hover:border-pj-ink"
          >
            {PROJETO_TOUR.chamada}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-relaxed text-pj-muted sm:text-[17px]">
          {PROJETO_TOUR.texto}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          onMouseLeave={() => setInteragindo(false)}
          className="mt-10 overflow-hidden rounded-3xl border border-pj-line bg-pj-bg2"
        >
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/9]">
            {ligado ? (
              <>
                <iframe
                  src={PROJETO_TOUR.url}
                  title="Tour 3D do apartamento"
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                />
                {/* camada que devolve a rolagem pra pagina quando ninguem esta girando o modelo */}
                {!interagindo && (
                  <button
                    onClick={() => setInteragindo(true)}
                    aria-label="Clique para girar o modelo"
                    className="absolute inset-0 flex items-end justify-center bg-transparent pb-6"
                  >
                    <span className="rounded-full bg-pj-ink/85 px-4 py-2 text-[12px] font-semibold text-pj-bg backdrop-blur">
                      Clique para girar o modelo
                    </span>
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => {
                  // no celular o modelo abre em tela cheia (embutido a rolagem
                  // da pagina ficaria presa no gesto de girar)
                  if (window.innerWidth < 640) {
                    window.open(PROJETO_TOUR.url, "_blank", "noopener");
                    return;
                  }
                  setLigado(true);
                  setInteragindo(true);
                }}
                className="group absolute inset-0 flex flex-col items-center justify-center gap-5 bg-pj-bg2 transition hover:bg-pj-line/40"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pj-terra text-pj-paper transition group-hover:scale-105">
                  <Move3d className="h-7 w-7" />
                </span>
                <span className="text-center">
                  <span className="pj-display block text-[1.4rem] sm:text-[1.8rem]">
                    Abrir o modelo 3D
                  </span>
                  <span className="mt-1 block text-[14px] text-pj-muted">
                    Arraste pra girar, aproxime e escolha o ambiente
                  </span>
                </span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
