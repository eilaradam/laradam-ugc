"use client";

import { motion } from "framer-motion";
import { PROJETO, PROJETO_AMBIENTES, PROJETO_GALERIA } from "@/data/projeto";
import Cabecalho from "./Cabecalho";

const imagem = PROJETO_GALERIA[1] ?? PROJETO_GALERIA[0];

export default function ProjetoAmbientes() {
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

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
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
                <h3 className="pj-display text-[1.6rem] sm:text-[2rem]">
                  {amb.nome}
                </h3>
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

        {imagem && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mt-4 overflow-hidden rounded-3xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagem.src}
              alt={imagem.titulo}
              className="aspect-[16/9] w-full object-cover sm:aspect-[2.6/1]"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
