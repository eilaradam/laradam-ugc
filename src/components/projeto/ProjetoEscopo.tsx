"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import Cabecalho from "./Cabecalho";
import {
  PROJETO,
  PROJETO_AMBIENTES,
  PROJETO_ANTES_DEPOIS,
  PROJETO_CRONOGRAMA,
  PROJETO_PALETA,
  type AntesDepois,
} from "@/data/projeto";

/** Comparador arrastável: foto de hoje x projeto da arquiteta. */
function Comparador({ item }: { item: AntesDepois }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = (clientX: number) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    const pct = ((clientX - box.left) / box.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
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
      className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-3xl bg-foreground"
    >
      {/* depois (base) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.depois}
        alt={`${item.ambiente} depois`}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* antes (recortado pelo clip, sem distorcer a foto) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.antes}
        alt={`${item.ambiente} antes`}
        draggable={false}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-foreground/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
        Antes
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-accent-on-dark px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground">
        Depois
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-[2px] bg-white/90"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
          <MoveHorizontal className="h-4 w-4 text-foreground" />
        </div>
      </div>
    </div>
  );
}

function CardImagem({ item }: { item: AntesDepois }) {
  const unica = item.depois || item.antes;
  const label = item.depois ? "Projeto" : "Como está hoje";
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-foreground">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={unica}
        alt={`${item.ambiente} ${label}`}
        className="h-full w-full object-cover"
      />
      <span className="absolute left-4 top-4 rounded-full bg-foreground/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
        {label}
      </span>
    </div>
  );
}

export default function ProjetoEscopo() {
  const comImagem = PROJETO_ANTES_DEPOIS.filter((i) => i.antes || i.depois);

  return (
    <>
      {/* O projeto, ambiente por ambiente */}
      <section id="projeto" className="bg-background-alt px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Cabecalho
            n="05"
            chapeu="O projeto"
            titulo="Quatro frentes, uma casa inteira virando conteúdo."
            sub={`Projeto de arquitetura pronto, obra começando em ${PROJETO.inicioObra.toLowerCase()}, documentada do primeiro dia ao tour final.${
              PROJETO.arquiteta.nome ? ` Assinatura de ${PROJETO.arquiteta.nome}.` : ""
            }`}
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {PROJETO_AMBIENTES.map((amb, i) => (
              <motion.div
                key={amb.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-3xl border border-border bg-background p-7 sm:p-9"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-sm text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl">{amb.nome}</h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-foreground-soft">
                  {amb.resumo}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {amb.itens.map((it) => (
                    <li
                      key={it}
                      className="rounded-full bg-primary-light px-3 py-1.5 text-[13px] font-medium text-primary-dark"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* paleta e materiais do projeto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mt-12 rounded-3xl border border-border bg-background p-7 sm:p-9"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              Paleta e materiais
            </p>
            <div className="mt-7 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {PROJETO_PALETA.map((c) => (
                <div key={c.nome} className="flex items-center gap-3">
                  <span
                    className="h-11 w-11 shrink-0 rounded-full ring-1 ring-foreground/10"
                    style={{ backgroundColor: c.cor }}
                  />
                  <span className="min-w-0 leading-tight">
                    <span className="block text-sm font-semibold text-foreground">
                      {c.nome}
                    </span>
                    <span className="block text-[12px] text-muted">{c.onde}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Antes e depois (só aparece quando tem imagem) */}
      {comImagem.length > 0 && (
        <section className="bg-background px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary sm:text-xs">
              Antes e depois
            </p>
            <h2 className="font-display mt-5 max-w-3xl text-[2.15rem] leading-[1.05] tracking-tight sm:text-[3.4rem]">
              Como está hoje e como vai ficar.
            </h2>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {comImagem.map((item) => (
                <div key={item.ambiente}>
                  {item.antes && item.depois ? (
                    <Comparador item={item} />
                  ) : (
                    <CardImagem item={item} />
                  )}
                  <h3 className="font-display mt-5 text-xl sm:text-2xl">
                    {item.ambiente}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground-soft">
                    {item.legenda}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cronograma */}
      <section className="bg-foreground px-5 py-20 text-white sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Cabecalho
            n="06"
            chapeu="Cronograma"
            dark
            titulo={PROJETO.janelaFechamento}
          />

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {PROJETO_CRONOGRAMA.map((f, i) => (
              <motion.div
                key={f.quando}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative border-t border-white/20 pt-6"
              >
                <span className="absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full bg-accent-on-dark" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-on-dark">
                  {f.quando}
                </p>
                <h3 className="font-display mt-3 text-xl">{f.titulo}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/60">
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
