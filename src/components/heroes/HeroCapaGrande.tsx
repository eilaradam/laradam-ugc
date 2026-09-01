"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_FOTOS } from "@/data/content";

/**
 * Capa "nome gigante + carrossel por cima".
 * O nome ocupa a largura toda e o card de foto sobe em cima da metade de baixo
 * das letras. As fotos vêm de HERO_FOTOS (src/data/content.ts): trocar lá troca aqui.
 */
export default function HeroCapaGrande() {
  const fotos = HERO_FOTOS.length ? HERO_FOTOS : [{ src: "/lara-sobre.jpg", alt: "Lara Dam" }];
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const toqueX = useRef<number | null>(null);

  const ir = useCallback((passo: number) => {
    setDir(passo);
    setI((atual) => (atual + passo + fotos.length) % fotos.length);
  }, [fotos.length]);

  // setinhas do teclado, pra quem navega sem mouse
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") ir(1);
      if (e.key === "ArrowLeft") ir(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ir]);

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-background noise pt-24 md:pt-20 pb-12 md:pb-16"
    >
      {/* O espaco mais nobre do site diz o que ela VENDE, nao o nome dela (que ja esta
          no menu). O chapeu em italico usa a serifada da marca. */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="px-3 md:px-6 text-center select-none"
      >
        <span className="block font-serif-accent italic text-foreground-soft leading-tight mb-3 md:mb-5"
          style={{ fontSize: "clamp(1rem, 2.3vw, 2.25rem)" }}>
          conteúdo que
        </span>
        <h1
          className="font-display font-black text-foreground leading-[0.86] tracking-[-0.05em] whitespace-nowrap"
          style={{ fontSize: "clamp(3rem, 14vw, 17rem)" }}
        >
          CONVERTE
        </h1>
      </motion.div>

      {/* Card do carrossel subindo por cima das letras */}
      <div className="relative -mt-[2.6vw] md:-mt-[2.2vw] px-4 md:px-[3.7vw]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[1800px]"
        >
          <div
            className="relative overflow-hidden rounded-[28px] md:rounded-[40px] bg-foreground/5 shadow-[0_28px_70px_-30px_rgba(30,42,68,0.45)] aspect-[3/2] sm:aspect-[16/7] md:aspect-[16/5]"
            onTouchStart={(e) => { toqueX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (toqueX.current === null) return;
              const d = e.changedTouches[0].clientX - toqueX.current;
              if (Math.abs(d) > 45) ir(d < 0 ? 1 : -1);
              toqueX.current = null;
            }}
          >
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.img
                key={fotos[i].src}
                src={fotos[i].src}
                alt={fotos[i].alt || "Lara Dam"}
                custom={dir}
                initial={{ opacity: 0, x: dir > 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir > 0 ? -60 : 60 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: fotos[i].posicao || "center 28%" }}
                draggable={false}
              />
            </AnimatePresence>

            {/* legenda opcional da foto */}
            {fotos[i].legenda && (
              <div className="absolute left-5 bottom-5 md:left-8 md:bottom-7">
                <span className="inline-block rounded-full bg-background/85 backdrop-blur px-4 py-1.5 text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
                  {fotos[i].legenda}
                </span>
              </div>
            )}
          </div>

          {fotos.length > 1 && (
            <>
              <Seta lado="esq" onClick={() => ir(-1)} />
              <Seta lado="dir" onClick={() => ir(1)} />

              <div className="mt-3 flex items-center justify-center gap-2">
                {fotos.map((f, n) => (
                  <button
                    key={f.src}
                    type="button"
                    aria-label={`Foto ${n + 1}`}
                    onClick={() => { setDir(n > i ? 1 : -1); setI(n); }}
                    className={`h-1.5 rounded-full transition-all ${
                      n === i ? "w-7 bg-foreground" : "w-1.5 bg-foreground/25 hover:bg-foreground/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Chamada embaixo */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7 }}
        className="mt-5 md:mt-[1.2vw] flex flex-col items-center gap-4 px-6"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-center">
          {[
            ["+500", "vídeos"],
            ["+200", "marcas"],
            ["100M", "views"],
          ].map(([n, l], k) => (
            <div key={l} className="flex items-center gap-7">
              {k > 0 && <span className="hidden sm:block h-4 w-px bg-foreground/15" />}
              <span className="flex items-baseline gap-1.5">
                <span className="font-display font-black text-foreground text-xl md:text-2xl leading-none">{n}</span>
                <span className="text-xs md:text-sm text-foreground-soft">{l}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#contato"
            data-track="capa_agendar"
            className="inline-flex items-center rounded-full bg-primary px-9 py-4 text-sm md:text-base font-bold text-white transition-colors hover:bg-primary-dark"
          >
            Agendar uma conversa
          </a>
          <a
            href="#categorias"
            data-track="capa_ver_portfolio"
            className="text-sm md:text-base font-semibold text-foreground-soft underline underline-offset-4 decoration-foreground/25 transition-colors hover:text-primary hover:decoration-primary"
          >
            Ver portfólio
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function Seta({ lado, onClick }: { lado: "esq" | "dir"; onClick: () => void }) {
  const Icone = lado === "esq" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={lado === "esq" ? "Foto anterior" : "Próxima foto"}
      className={`absolute top-1/2 -translate-y-1/2 z-20 grid h-11 w-11 md:h-14 md:w-14 place-items-center rounded-full text-white transition
        hover:bg-white/15 ${lado === "esq" ? "left-2 md:left-5" : "right-2 md:right-5"}`}
    >
      <Icone
        className="h-7 w-7 md:h-9 md:w-9 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
        strokeWidth={2}
      />
    </button>
  );
}
