"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Move3d } from "lucide-react";
import { PROJETO_ARGUMENTOS, PROJETO_PALETA, PROJETO_TOUR } from "@/data/projeto";
import Cabecalho from "./Cabecalho";

/**
 * Tour 3D + os argumentos na mesma tela. O modelo precisa de largura (os
 * controles dele se amontoam em coluna estreita), entao fica com a maior
 * parte da linha e os textos correm empilhados na direita. A paleta fecha a
 * secao numa faixa fina. No celular vira uma coluna so.
 */
export default function ProjetoTour() {
  const [interagindo, setInteragindo] = useState(false);

  return (
    <section id="tour" className="bg-pj-bg px-5 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-[1400px]">
        <Cabecalho n="03" chapeu="Tour 3D" titulo={PROJETO_TOUR.titulo} />

        <div className="mt-9 grid items-start gap-9 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-12">
          {/* ESQUERDA: o modelo 3D */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              onMouseLeave={() => setInteragindo(false)}
              className="overflow-hidden rounded-3xl border border-pj-line bg-pj-bg2"
            >
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
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
                    className="group absolute inset-0 flex items-end justify-start bg-transparent p-4 pb-14"
                  >
                    <span className="flex items-center gap-2 rounded-full bg-pj-ink/85 px-4 py-2 text-[12px] font-semibold text-pj-bg backdrop-blur transition group-hover:bg-pj-ink">
                      <Move3d className="h-4 w-4" />
                      <span className="hidden sm:inline">Clique para girar</span>
                      <span className="sm:hidden">Abrir em tela cheia</span>
                    </span>
                  </button>
                )}
              </div>
            </motion.div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-md text-[14px] leading-relaxed text-pj-muted sm:text-[15px]">
                {PROJETO_TOUR.texto}
              </p>
              <a
                href={PROJETO_TOUR.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-pj-line bg-pj-paper px-5 py-2.5 text-[13px] font-semibold transition hover:border-pj-ink"
              >
                {PROJETO_TOUR.chamada}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* DIREITA: por que a marca deveria entrar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <h3 className="pj-display max-w-[18ch] text-[1.45rem] text-pj-ink sm:text-[1.75rem]">
              Uma reforma é o melhor lugar pra mostrar um produto de casa.
            </h3>

            <div className="mt-7 space-y-6">
              {PROJETO_ARGUMENTOS.map((a, i) => (
                <div key={a.title} className="flex gap-4">
                  <span className="pj-label shrink-0 pt-1 text-pj-terra">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-pj-ink">{a.title}</p>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-pj-muted">
                      {a.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* paleta e materiais, numa faixa fina fechando a secao */}
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-pj-line pt-8">
          <p className="pj-label w-full text-pj-olive lg:w-auto">Paleta e materiais</p>
          {PROJETO_PALETA.map((c) => (
            <div key={c.nome} className="flex items-center gap-2.5">
              <span
                className="h-8 w-8 shrink-0 rounded-full border border-pj-line"
                style={{ backgroundColor: c.cor }}
              />
              <span className="leading-tight">
                <span className="block text-[13px] font-semibold text-pj-ink">
                  {c.nome}
                </span>
                <span className="block text-[12px] text-pj-muted">{c.onde}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
