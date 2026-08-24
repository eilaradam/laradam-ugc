"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import {
  PROJETO,
  PROJETO_AMBIENTES,
  PROJETO_ANTES_DEPOIS,
  PROJETO_ARGUMENTOS,
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
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.antes}
        alt={`${item.ambiente} antes`}
        draggable={false}
        loading="lazy"
        decoding="async"
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
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
      <span className="pj-label absolute left-4 top-4 rounded-full bg-pj-ink/85 px-3 py-1.5 text-pj-bg">
        {label}
      </span>
    </div>
  );
}

export default function ProjetoAmbientes() {
  const comImagem = PROJETO_ANTES_DEPOIS.filter((i) => i.antes || i.depois);

  return (
    <section id="projeto" className="bg-pj-ink px-5 py-20 text-pj-bg sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Cabecalho
          n="02"
          chapeu="O projeto"
          dark
          centro
          titulo="Quatro frentes, uma casa inteira virando conteúdo."
          sub={`Projeto de arquitetura pronto, obra começando em ${PROJETO.inicioObra.toLowerCase()}, documentada do primeiro dia ao tour final.${
            PROJETO.arquiteta.nome ? ` Assinatura de ${PROJETO.arquiteta.nome}.` : ""
          }`}
          className="mx-auto"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {PROJETO_AMBIENTES.map((amb, i) => (
            <motion.div
              key={amb.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-3xl bg-pj-bg p-7 text-pj-ink sm:p-9"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="pj-display text-[1.6rem] sm:text-[2rem]">{amb.nome}</h3>
                <span className="pj-label shrink-0 text-pj-terra">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-pj-muted">
                {amb.resumo}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {amb.itens.map((it) => (
                  <li
                    key={it}
                    className="rounded-full bg-pj-bg2 px-3 py-1.5 text-[12.5px] font-medium text-pj-olive"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* paleta e materiais */}
        <div className="mt-10">
          <p className="pj-label text-pj-olive-soft">Paleta e materiais</p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {PROJETO_PALETA.map((c) => (
              <div key={c.nome} className="flex items-center gap-3">
                <span
                  className="h-11 w-11 shrink-0 rounded-full"
                  style={{ backgroundColor: c.cor }}
                />
                <span className="min-w-0 leading-tight">
                  <span className="block text-[13px] font-semibold">{c.nome}</span>
                  <span className="block text-[12px] text-pj-bg/50">{c.onde}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* antes e depois (aparece quando tiver foto) */}
        {comImagem.length > 0 && (
          <div className="mt-12">
            <p className="pj-label text-pj-olive-soft">Antes e depois</p>
            <div className="mt-6 grid gap-8 lg:grid-cols-2">
              {comImagem.map((item) => (
                <div key={item.ambiente}>
                  {item.antes && item.depois ? (
                    <Comparador item={item} />
                  ) : (
                    <CardImagem item={item} />
                  )}
                  <h4 className="pj-display mt-4 text-[1.3rem]">{item.ambiente}</h4>
                  <p className="mt-1 text-[14px] leading-relaxed text-pj-bg/60">
                    {item.legenda}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* por que a marca deveria entrar */}
        <div className="mt-12 border-t border-pj-bg/20 pt-12">
          <h3 className="pj-display max-w-[22ch] text-[1.7rem] sm:text-[2.3rem]">
            Uma reforma é o melhor lugar pra mostrar um produto de casa.
          </h3>
          <div className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {PROJETO_ARGUMENTOS.map((a, i) => (
              <div key={a.title} className="flex gap-4">
                <span className="pj-label shrink-0 pt-1 text-pj-terra">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-[16px] font-semibold">{a.title}</p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-pj-bg/60">
                    {a.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
