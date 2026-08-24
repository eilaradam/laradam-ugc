"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import {
  PROJETO,
  PROJETO_ANTES_DEPOIS,
  PROJETO_CRONOGRAMA,
  PROJETO_PALETA,
  type AntesDepois,
} from "@/data/projeto";
import Cabecalho from "./Cabecalho";

/** Comparador arrastável: foto de hoje x projeto da arquiteta. */
function Comparador({ item }: { item: AntesDepois }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = (clientX: number) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    setPos(Math.min(100, Math.max(0, ((clientX - box.left) / box.width) * 100)));
  };

  return (
    <div
      ref={ref}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && move(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl bg-pj-bg2"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.depois}
        alt={`${item.ambiente} depois`}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.antes}
        alt={`${item.ambiente} antes`}
        draggable={false}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <span className="pj-label pointer-events-none absolute left-4 top-4 rounded-full bg-pj-ink/85 px-3 py-1.5 text-pj-bg">
        Antes
      </span>
      <span className="pj-label pointer-events-none absolute right-4 top-4 rounded-full bg-pj-terra px-3 py-1.5 text-pj-paper">
        Depois
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-[2px] bg-pj-paper"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-pj-paper shadow-lg">
          <MoveHorizontal className="h-4 w-4 text-pj-ink" />
        </div>
      </div>
    </div>
  );
}

function CardImagem({ item }: { item: AntesDepois }) {
  const unica = item.depois || item.antes;
  const label = item.depois ? "Projeto" : "Como está hoje";
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-pj-bg2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={unica}
        alt={`${item.ambiente} ${label}`}
        className="h-full w-full object-cover"
      />
      <span className="pj-label absolute left-4 top-4 rounded-full bg-pj-ink/85 px-3 py-1.5 text-pj-bg">
        {label}
      </span>
    </div>
  );
}

export default function ProjetoEscopo() {
  const comImagem = PROJETO_ANTES_DEPOIS.filter((i) => i.antes || i.depois);

  return (
    <>
      {/* Paleta + antes e depois */}
      <section className="bg-pj-bg px-5 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Cabecalho
            n="07"
            chapeu="Paleta e materiais"
            centro
            className="mx-auto"
            titulo="A cara do projeto, escolha por escolha."
          />

          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {PROJETO_PALETA.map((c, i) => (
              <motion.div
                key={c.nome}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
              >
                <span
                  className="block aspect-[4/3] w-full rounded-xl"
                  style={{ backgroundColor: c.cor }}
                />
                <p className="mt-3 text-sm font-semibold">{c.nome}</p>
                <p className="text-[13px] text-pj-muted">{c.onde}</p>
              </motion.div>
            ))}
          </div>

          {comImagem.length > 0 && (
            <div className="mt-20">
              <div className="flex items-center gap-3">
                <span className="pj-label text-pj-terra">Antes e depois</span>
                <span className="h-px flex-1 bg-pj-line" />
              </div>
              <h3 className="pj-display mt-6 max-w-[16ch] text-[2rem] sm:text-[3rem]">
                Como está hoje e como vai ficar.
              </h3>

              <div className="mt-12 grid gap-10 lg:grid-cols-2">
                {comImagem.map((item) => (
                  <div key={item.ambiente}>
                    {item.antes && item.depois ? (
                      <Comparador item={item} />
                    ) : (
                      <CardImagem item={item} />
                    )}
                    <h4 className="pj-display mt-5 text-[1.4rem]">
                      {item.ambiente}
                    </h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-pj-muted">
                      {item.legenda}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Cronograma */}
      <section className="bg-pj-olive px-5 py-20 text-pj-bg sm:px-10 sm:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Cabecalho
            n="08"
            chapeu="Cronograma"
            dark
            centro
            className="mx-auto"
            titulo={PROJETO.janelaFechamento}
          />

          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {PROJETO_CRONOGRAMA.map((f, i) => (
              <motion.div
                key={f.quando}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-3xl bg-pj-bg/10 p-6"
              >
                <p className="pj-label text-pj-olive-soft">{f.quando}</p>
                <h3 className="pj-display mt-3 text-[1.5rem]">{f.titulo}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-pj-bg/70">
                  {f.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
