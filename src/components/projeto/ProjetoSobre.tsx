"use client";

import { motion } from "framer-motion";
import { PROJETO, PROJETO_GALERIA, PROJETO_NUMEROS, PROJETO_SOBRE } from "@/data/projeto";
import Ornamento from "./Ornamento";

const fundo = PROJETO_GALERIA[2] ?? PROJETO_GALERIA[0];

export default function ProjetoSobre() {
  return (
    <section className="bg-pj-bg px-5 py-16 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-[1400px]">
        {/* card de perfil sobre a imagem do ambiente */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-pj-bg2 p-5 sm:p-12"
        >
          {fundo && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={fundo.src}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-pj-ink/45" />
            </>
          )}

          <div className="relative grid gap-5 lg:grid-cols-[auto_1fr] lg:items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PROJETO_SOBRE.foto}
              alt={PROJETO_SOBRE.fotoAlt}
              className="h-40 w-40 rounded-3xl object-cover object-top sm:h-56 sm:w-56"
            />

            <div className="rounded-3xl bg-pj-paper p-6 sm:p-9">
              <div className="flex items-center gap-2">
                <Ornamento className="h-4 w-4 text-pj-terra" />
                <span className="pj-label text-pj-muted">01 · Quem assina</span>
              </div>
              <h2 className="pj-display mt-4 text-[1.9rem] uppercase sm:text-[2.6rem]">
                Oi, eu sou a Lara
              </h2>
              <p className="mt-2 text-[14px] text-pj-muted">
                {PROJETO_SOBRE.cargo} · {PROJETO_SOBRE.local}
              </p>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed sm:text-[17px]">
                {PROJETO_SOBRE.recado}
              </p>
              <a
                href={`https://instagram.com/${PROJETO.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex rounded-full bg-pj-ink px-6 py-3 text-[13px] font-semibold text-pj-bg transition hover:bg-pj-terra"
              >
                Ver o perfil @{PROJETO.instagram}
              </a>
            </div>
          </div>
        </motion.div>

        {/* o que eu faço + números */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {PROJETO_SOBRE.bullets.map((b) => (
            <div
              key={b}
              className="rounded-2xl border border-pj-line bg-pj-paper px-6 py-5 text-[15px]"
            >
              {b}
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {PROJETO_NUMEROS.map((n) => (
            <div
              key={n.label}
              className="rounded-2xl bg-pj-bg2 px-6 py-7 text-center"
            >
              <p className="pj-display text-[2.2rem] sm:text-[2.8rem]">{n.value}</p>
              <p className="mt-1 text-[13px] leading-tight text-pj-muted">
                {n.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
