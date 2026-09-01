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
      className="relative overflow-hidden bg-background noise pt-28 md:pt-32 pb-16 md:pb-24"
    >
      {/* Nome gigante ocupando a largura toda */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="px-3 md:px-6 font-display font-black text-foreground leading-[0.78] tracking-[-0.045em] text-center select-none"
        style={{ fontSize: "clamp(3.5rem, 17.5vw, 20rem)" }}
      >
        LARA DAM
      </motion.h1>

      {/* Card do carrossel subindo por cima das letras */}
      <div className="relative -mt-[7vw] md:-mt-[8.5vw] px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[1180px]"
        >
          <div
            className="relative overflow-hidden rounded-[28px] md:rounded-[44px] bg-foreground/5 shadow-[0_28px_70px_-30px_rgba(30,42,68,0.45)] aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/8]"
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

              <div className="mt-5 flex items-center justify-center gap-2">
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
        className="mt-9 md:mt-12 flex flex-col items-center gap-5 px-6"
      >
        <p className="max-w-lg text-center text-sm md:text-base leading-relaxed text-foreground-soft">
          UGC Creator e estrategista de conteúdo. Mais de{" "}
          <span className="font-serif-accent italic text-primary">500 vídeos</span>, 200 marcas
          parceiras e 100M de views.
        </p>
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
            className="inline-flex items-center rounded-full border border-foreground/20 px-7 py-4 text-sm md:text-base font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
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
      className={`absolute top-1/2 -translate-y-1/2 z-20 grid h-11 w-11 md:h-14 md:w-14 place-items-center rounded-full text-foreground transition
        bg-background/70 backdrop-blur hover:bg-background md:bg-transparent md:backdrop-blur-0 md:hover:bg-background/70
        ${lado === "esq" ? "left-2 md:-left-4 lg:-left-12" : "right-2 md:-right-4 lg:-right-12"}`}
    >
      <Icone className="h-6 w-6 md:h-8 md:w-8" strokeWidth={1.8} />
    </button>
  );
}
