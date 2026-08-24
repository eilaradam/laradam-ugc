"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { PROJETO_GALERIA, type Render } from "@/data/projeto";

/**
 * Painel/carrossel "como vai ficar" que abre a página.
 * Se PROJETO_GALERIA estiver vazio, nada é renderizado (o hero volta pro
 * layout de uma coluna só).
 */
export default function ProjetoGaleria({ itens = PROJETO_GALERIA }: { itens?: Render[] }) {
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
      <div className="w-full">
        {/* painel principal */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[28px] bg-white/5 ring-1 ring-white/15">
          <AnimatePresence mode="wait">
            <motion.div
              key={atual.src}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
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

          {/* degradê pra legenda ler bem */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent" />

          <span className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
            Como vai ficar
          </span>

          <button
            onClick={() => setZoom(true)}
            aria-label="Ampliar imagem"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/70"
          >
            <Expand className="h-4 w-4" />
          </button>

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
            <div className="min-w-0">
              <p className="font-display text-xl text-white sm:text-2xl">
                {atual.titulo}
              </p>
              {atual.legenda && (
                <p className="mt-1 text-[13px] leading-snug text-white/75 sm:text-sm">
                  {atual.legenda}
                </p>
              )}
            </div>
            {total > 1 && (
              <span className="shrink-0 text-[12px] font-semibold text-white/70">
                {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            )}
          </div>

          {total > 1 && (
            <>
              <button
                onClick={() => vai(-1)}
                aria-label="Imagem anterior"
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/70"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => vai(1)}
                aria-label="Próxima imagem"
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/70"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* miniaturas */}
        {total > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {itens.map((r, idx) => (
              <button
                key={r.src}
                onClick={() => setI(idx)}
                aria-label={r.titulo}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl transition ${
                  idx === i
                    ? "ring-2 ring-accent-on-dark"
                    : "opacity-55 ring-1 ring-white/15 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.src}
                  alt={r.titulo}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 sm:p-10"
          >
            <button
              onClick={() => setZoom(false)}
              aria-label="Fechar"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
            >
              <X className="h-5 w-5" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={atual.src}
              alt={atual.titulo}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full rounded-2xl object-contain"
            />
            {total > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    vai(-1);
                  }}
                  aria-label="Imagem anterior"
                  className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    vai(1);
                  }}
                  aria-label="Próxima imagem"
                  className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
