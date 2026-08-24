"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { PROJETO_GALERIA, type Render } from "@/data/projeto";

/**
 * Faixa de imagem do projeto ocupando a largura toda, com carrossel.
 * Se PROJETO_GALERIA estiver vazio, nada e renderizado.
 */
export default function ProjetoGaleria({
  itens = PROJETO_GALERIA,
}: {
  itens?: Render[];
}) {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  const total = itens.length;

  const vai = useCallback(
    (dir: number) => setI((v) => (v + dir + total) % total),
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") vai(1);
      if (e.key === "ArrowLeft") vai(-1);
      if (e.key === "Escape") setZoom(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [vai]);

  useEffect(() => {
    document.body.style.overflow = zoom ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [zoom]);

  if (total === 0) return null;
  const atual = itens[i];

  return (
    <>
      <div className="relative">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-pj-bg2 sm:aspect-[16/9] lg:aspect-[2.4/1]">
          <AnimatePresence mode="wait">
            <motion.div
              key={atual.src}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              drag={total > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) vai(1);
                if (info.offset.x > 60) vai(-1);
              }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={atual.src}
                alt={atual.titulo}
                draggable={false}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => setZoom(true)}
            aria-label="Ampliar imagem"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-pj-paper/85 text-pj-ink backdrop-blur transition hover:bg-pj-paper sm:right-8 sm:top-8"
          >
            <Expand className="h-4 w-4" />
          </button>
        </div>

        {/* legenda e controles embaixo da faixa */}
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-6 px-5 py-6 sm:px-10">
          <div className="min-w-0">
            <span className="pj-label text-pj-terra">Como vai ficar</span>
            <p className="pj-display mt-2 text-[1.6rem] sm:text-[2.1rem]">
              {atual.titulo}
            </p>
            {atual.legenda && (
              <p className="mt-2 max-w-lg text-[14px] leading-snug text-pj-muted">
                {atual.legenda}
              </p>
            )}
          </div>

          {total > 1 && (
            <div className="flex items-center gap-5">
              <span className="text-[13px] font-semibold text-pj-muted">
                {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => vai(-1)}
                  aria-label="Imagem anterior"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-pj-line transition hover:border-pj-ink hover:bg-pj-ink hover:text-pj-bg"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => vai(1)}
                  aria-label="Próxima imagem"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-pj-line transition hover:border-pj-ink hover:bg-pj-ink hover:text-pj-bg"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* miniaturas */}
        {total > 1 && (
          <div className="mx-auto flex max-w-[1400px] gap-3 overflow-x-auto px-5 pb-10 sm:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {itens.map((r, idx) => (
              <button
                key={r.src}
                onClick={() => setI(idx)}
                aria-label={r.titulo}
                className={`relative h-20 w-32 shrink-0 overflow-hidden rounded-xl transition ${
                  idx === i ? "ring-2 ring-pj-ink" : "opacity-60 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.src}
                  alt={r.titulo}
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-1 left-2 text-[11px] font-semibold text-white drop-shadow">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* tela cheia */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-pj-ink/95 p-4 sm:p-10"
          >
            <button
              onClick={() => setZoom(false)}
              aria-label="Fechar"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-pj-bg/15 text-pj-bg transition hover:bg-pj-bg/30"
            >
              <X className="h-5 w-5" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={atual.src}
              alt={atual.titulo}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full rounded-xl object-contain"
            />
            {total > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    vai(-1);
                  }}
                  aria-label="Imagem anterior"
                  className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-pj-bg/15 text-pj-bg transition hover:bg-pj-bg/30"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    vai(1);
                  }}
                  aria-label="Próxima imagem"
                  className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-pj-bg/15 text-pj-bg transition hover:bg-pj-bg/30"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
