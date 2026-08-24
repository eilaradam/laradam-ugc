"use client";

import { motion } from "framer-motion";
import { PROJETO, PROJETO_NUMEROS, PROJETO_SOBRE } from "@/data/projeto";
import Cabecalho from "./Cabecalho";

export default function ProjetoSobre() {
  return (
    <section className="bg-pj-bg px-5 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Cabecalho
          n="01"
          chapeu="Quem assina"
          titulo={
            <>
              A casa é minha. O cenário é <em className="not-italic text-pj-terra">de verdade</em>.
            </>
          }
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PROJETO_SOBRE.foto}
              alt={PROJETO_SOBRE.fotoAlt}
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
            <p className="pj-label mt-4 text-pj-muted">
              {PROJETO_SOBRE.nome} · {PROJETO_SOBRE.local}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            <p className="text-[19px] leading-snug sm:text-[26px]">
              {PROJETO_SOBRE.recado}
            </p>

            <ul className="mt-10 divide-y divide-pj-line border-y border-pj-line">
              {PROJETO_SOBRE.bullets.map((b) => (
                <li key={b} className="py-4 text-[15px] text-pj-muted">
                  {b}
                </li>
              ))}
            </ul>

            {/* numeros grandes */}
            <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {PROJETO_NUMEROS.map((n) => (
                <div key={n.label}>
                  <p className="pj-display text-[2.4rem] sm:text-[3rem]">
                    {n.value}
                  </p>
                  <p className="mt-1 text-[13px] leading-tight text-pj-muted">
                    {n.label}
                  </p>
                </div>
              ))}
            </div>

            <a
              href={`https://instagram.com/${PROJETO.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pj-label mt-10 inline-flex w-fit border-b border-pj-ink pb-1 text-pj-ink transition hover:border-pj-terra hover:text-pj-terra"
            >
              Ver o perfil @{PROJETO.instagram}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
