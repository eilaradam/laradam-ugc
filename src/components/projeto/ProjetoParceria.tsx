"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import {
  PROJETO_BUSCA,
  PROJETO_FORMATOS_TEXTO,
  PROJETO_PLANOS,
  type BuscaItem,
} from "@/data/projeto";
import Cabecalho from "./Cabecalho";
import { waLink } from "./ProjetoHero";

const STATUS: Record<BuscaItem["status"], { label: string; cor: string }> = {
  aberto: { label: "Vaga aberta", cor: "text-pj-terra" },
  conversando: { label: "Em conversa", cor: "text-pj-olive-soft" },
  fechado: { label: "Fechado", cor: "text-pj-muted" },
};

export default function ProjetoParceria() {
  const abertas = PROJETO_BUSCA.filter((b) => b.status === "aberto").length;

  return (
    <>
      {/* O que estou procurando */}
      <section id="procuro" className="bg-pj-bg px-5 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Cabecalho
            n="09"
            chapeu="O que estou procurando"
            titulo={`${abertas} categorias de parceiro ainda abertas.`}
            sub="Se a sua marca se encaixa em alguma delas, me chama. Se não estiver na lista e fizer sentido pra obra, me chama do mesmo jeito."
          />

          <div className="mt-14 grid gap-x-14 sm:grid-cols-2">
            {PROJETO_BUSCA.map((b, i) => {
              const s = STATUS[b.status];
              return (
                <motion.div
                  key={b.categoria}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: (i % 8) * 0.03 }}
                  className="flex items-baseline justify-between gap-4 border-b border-pj-line py-5"
                >
                  <div className="min-w-0">
                    <p className="text-[17px] font-semibold">{b.categoria}</p>
                    <p className="mt-0.5 text-[13px] text-pj-muted">
                      {b.ambiente}
                    </p>
                  </div>
                  <span className={`pj-label shrink-0 ${s.cor}`}>
                    {b.marca && b.status === "fechado" ? b.marca : s.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Formatos de parceria */}
      <section id="parceria" className="bg-pj-bg2 px-5 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Cabecalho
            n="10"
            chapeu="Formatos de parceria"
            titulo="Três jeitos de entrar. Escolha o tamanho."
            sub={PROJETO_FORMATOS_TEXTO}
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {PROJETO_PLANOS.map((p, i) => (
              <motion.div
                key={p.nome}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`flex flex-col rounded-2xl p-8 sm:p-10 ${
                  p.destaque
                    ? "bg-pj-olive text-pj-bg"
                    : "border border-pj-line bg-pj-bg"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="pj-display text-[1.8rem] sm:text-[2.1rem]">
                    {p.nome}
                  </h3>
                  <span
                    className={`pj-label shrink-0 pt-2 ${
                      p.destaque ? "text-pj-olive-soft" : "text-pj-terra"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p
                  className={`pj-label mt-2 ${
                    p.destaque ? "text-pj-bg/70" : "text-pj-muted"
                  }`}
                >
                  {p.chamada}
                </p>
                <p
                  className={`mt-6 text-[15px] leading-relaxed ${
                    p.destaque ? "text-pj-bg/80" : "text-pj-muted"
                  }`}
                >
                  {p.descricao}
                </p>

                <ul className="mt-8 space-y-3">
                  {p.entregas.map((e) => (
                    <li key={e} className="flex gap-3 text-[14px] leading-snug">
                      <Check
                        className={`mt-[3px] h-4 w-4 shrink-0 ${
                          p.destaque ? "text-pj-olive-soft" : "text-pj-terra"
                        }`}
                      />
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={waLink(
                    `Oi Lara! Quero conversar sobre o formato "${p.nome}" do Projeto Casa Estúdio.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group mt-10 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition ${
                    p.destaque
                      ? "bg-pj-bg text-pj-ink hover:bg-pj-terra hover:text-pj-paper"
                      : "bg-pj-ink text-pj-bg hover:bg-pj-terra"
                  }`}
                >
                  Quero esse formato
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
