"use client";

import { motion } from "framer-motion";
import { PROJETO, PROJETO_SOBRE } from "@/data/projeto";
import Cabecalho from "./Cabecalho";

export default function ProjetoSobre() {
  return (
    <section className="bg-background px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Cabecalho
          n="01"
          chapeu="Quem assina"
          titulo={
            <>
              A casa é minha. O cenário é{" "}
              <span className="font-serif-accent text-primary">de verdade</span>.
            </>
          }
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -bottom-4 -left-4 hidden h-full w-full rounded-[28px] border border-primary/30 sm:block" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PROJETO_SOBRE.foto}
              alt={PROJETO_SOBRE.fotoAlt}
              className="relative aspect-[4/5] w-full rounded-[28px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="font-display text-3xl sm:text-4xl">
              {PROJETO_SOBRE.nome}
            </p>
            <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-primary">
              {PROJETO_SOBRE.cargo} · {PROJETO_SOBRE.local}
            </p>

            <ul className="mt-8 space-y-3">
              {PROJETO_SOBRE.bullets.map((b) => (
                <li
                  key={b}
                  className="flex gap-3 text-[15px] leading-snug text-foreground-soft"
                >
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {b}
                </li>
              ))}
            </ul>

            <blockquote className="mt-9 border-l-2 border-primary pl-6">
              <p className="font-display text-xl leading-snug text-foreground sm:text-2xl">
                {PROJETO_SOBRE.recado}
              </p>
              <footer className="font-serif-accent mt-5 text-lg text-primary">
                {PROJETO_SOBRE.assinatura}
              </footer>
            </blockquote>

            <a
              href={`https://instagram.com/${PROJETO.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-dark"
            >
              Ver o perfil @{PROJETO.instagram}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
