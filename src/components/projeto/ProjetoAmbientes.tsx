"use client";

import { motion } from "framer-motion";
import { PROJETO, PROJETO_AMBIENTES, PROJETO_GALERIA } from "@/data/projeto";
import Cabecalho from "./Cabecalho";

// Imagem grande da seção: usa o segundo render quando existe.
const imagem = PROJETO_GALERIA[1] ?? PROJETO_GALERIA[0];

export default function ProjetoAmbientes() {
  return (
    <section id="projeto" className="bg-pj-bg2 px-5 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Cabecalho
          n="02"
          chapeu="O projeto"
          titulo="Quatro frentes, uma casa inteira virando conteúdo."
          sub={`Projeto de arquitetura pronto, obra começando em ${PROJETO.inicioObra.toLowerCase()}, documentada do primeiro dia ao tour final.${
            PROJETO.arquiteta.nome ? ` Assinatura de ${PROJETO.arquiteta.nome}.` : ""
          }`}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {imagem && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-8 lg:self-start"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagem.src}
                alt={imagem.titulo}
                className="aspect-[4/3] w-full rounded-2xl object-cover lg:aspect-[3/4]"
              />
            </motion.div>
          )}

          <div className="divide-y divide-pj-line border-y border-pj-line">
            {PROJETO_AMBIENTES.map((amb, i) => (
              <motion.div
                key={amb.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="py-8"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="pj-display text-[1.7rem] sm:text-[2.2rem]">
                    {amb.nome}
                  </h3>
                  <span className="pj-label shrink-0 text-pj-terra">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-pj-muted">
                  {amb.resumo}
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  {amb.itens.map((it) => (
                    <li
                      key={it}
                      className="text-[13px] font-medium text-pj-olive"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
