"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_FOTOS } from "@/data/content";
import TagContagem from "@/components/TagContagem";

/**
 * Capa editorial: promessa em serifada (com "converte." em italico petroleo,
 * a mesma assinatura do resto do site), sublinha com nome + prova, faixa de
 * foto larga e CTA pilula central. Tudo cabe na primeira tela.
 * As fotos vem de HERO_FOTOS (src/data/content.ts): trocar la troca aqui.
 */
export default function HeroCapaGrande() {
  const fotos = HERO_FOTOS.length ? HERO_FOTOS : [{ src: "/fotobio.png", alt: "Lara Dam" }];
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
      className="relative overflow-hidden bg-background noise pt-[5.5rem] md:pt-24 pb-10 md:pb-12"
    >
      {/* Bloco de texto: o que ela faz, a promessa e a prova, nessa ordem */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="px-5 md:px-12 text-center"
      >
        <TagContagem padrao="UGC Creator & Content Strategist" />

        <h1
          className="mt-3 md:mt-4 font-display font-medium text-foreground leading-[1.02] tracking-[-0.02em] text-balance"
          style={{ fontSize: "clamp(2.9rem, 8.6vw, 11rem)" }}
        >
          conteúdo que{" "}
          <span className="font-serif-accent italic text-primary">converte.</span>
        </h1>

        <p className="mx-auto mt-4 md:mt-5 max-w-[21rem] md:max-w-2xl text-sm md:text-lg text-foreground-soft leading-relaxed">
          Sou a Lara Dam:{" "}
          <strong className="font-semibold text-foreground">+500 vídeos</strong>,{" "}
          <strong className="font-semibold text-foreground">+200 marcas parceiras</strong> e{" "}
          <strong className="font-semibold text-foreground">+100M de views</strong>.
        </p>
      </motion.div>

      {/* Faixa de foto larga */}
      <div className="mt-6 md:mt-8 px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[1440px]"
        >
          <div
            className="relative overflow-hidden rounded-[24px] md:rounded-[32px] bg-foreground/5 shadow-[0_28px_70px_-30px_rgba(30,42,68,0.45)] aspect-[3/2] sm:aspect-[16/7] lg:aspect-[16/5]"
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
              <div className="absolute left-5 bottom-5 md:left-7 md:bottom-6">
                <span className="inline-block rounded-full bg-background/85 backdrop-blur px-4 py-1.5 text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
                  {fotos[i].legenda}
                </span>
              </div>
            )}

            {fotos.length > 1 && (
              <>
                <Seta lado="esq" onClick={() => ir(-1)} />
                <Seta lado="dir" onClick={() => ir(1)} />
              </>
            )}
          </div>

          {fotos.length > 1 && (
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
          )}
        </motion.div>
      </div>

      {/* Caminho: um botao, um link, nada disputando atencao */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7 }}
        className="mt-5 md:mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 px-6"
      >
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
        hover:bg-white/15 ${lado === "esq" ? "left-2 md:left-4" : "right-2 md:right-4"}`}
    >
      <Icone
        className="h-7 w-7 md:h-9 md:w-9 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
        strokeWidth={2}
      />
    </button>
  );
}
