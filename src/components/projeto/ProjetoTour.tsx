"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Move3d } from "lucide-react";
import { PROJETO_TOUR } from "@/data/projeto";
import Cabecalho from "./Cabecalho";

/**
 * Tour 3D do apartamento. O modelo ja vem aberto (o iframe usa lazy nativo,
 * entao so baixa quando a secao chega perto da tela). Uma camada por cima
 * devolve a rolagem pra pagina enquanto ninguem esta girando o modelo.
 */
export default function ProjetoTour() {
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
                className="group absolute inset-0 flex items-end justify-center bg-transparent pb-6"
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
      </div>
    </section>
  );
}
