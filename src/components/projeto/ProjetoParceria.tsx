"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import {
  PROJETO,
  PROJETO_BUSCA,
  PROJETO_CRONOGRAMA,
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

const VISIVEIS = 6;

export default function ProjetoParceria() {
  const [tudo, setTudo] = useState(false);
  const abertas = PROJETO_BUSCA.filter((b) => b.status === "aberto").length;
  const lista = tudo ? PROJETO_BUSCA : PROJETO_BUSCA.slice(0, VISIVEIS);

  return (
    <>
      {/* O que estou procurando */}
      <section id="procuro" className="bg-pj-bg px-5 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-[1400px]">
          <Cabecalho
            n="05"
            chapeu="O que estou procurando"
            centro
            className="mx-auto"
            titulo={`${abertas} categorias de parceiro ainda abertas.`}
            sub="Se a sua marca se encaixa em alguma delas, me chama. Se não estiver na lista e fizer sentido pra obra, me chama do mesmo jeito."
          />

          <div className="mt-10 grid gap-x-14 sm:grid-cols-2">
            {lista.map((b, i) => {
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

          {PROJETO_BUSCA.length > VISIVEIS && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setTudo((v) => !v)}
                className="group inline-flex items-center gap-2 rounded-full border border-pj-line bg-pj-paper px-7 py-3.5 text-sm font-semibold transition hover:border-pj-ink"
              >
                {tudo
                  ? "Mostrar menos"
                  : `Ver todas as ${PROJETO_BUSCA.length} categorias`}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${tudo ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Formatos de parceria */}
      <section id="parceria" className="bg-pj-ink px-5 py-16 text-pj-bg sm:px-10 sm:py-20">
        <div className="mx-auto max-w-[1400px]">
          <Cabecalho
            n="06"
            chapeu="Formatos de parceria"
            dark
            centro
            className="mx-auto"
            titulo="Três jeitos de entrar. Escolha o tamanho."
            sub={PROJETO_FORMATOS_TEXTO}
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {PROJETO_PLANOS.map((p, i) => (
              <motion.div
                key={p.nome}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`flex flex-col rounded-3xl p-8 sm:p-10 ${
                  p.destaque ? "bg-pj-olive text-pj-bg" : "bg-pj-bg text-pj-ink"
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

          {/* cronograma */}
          <div className="mt-14 border-t border-pj-bg/20 pt-12">
            <p className="pj-label text-pj-olive-soft">Cronograma</p>
            <h3 className="pj-display mt-4 max-w-[22ch] text-[1.7rem] sm:text-[2.3rem]">
              {PROJETO.janelaFechamento}
            </h3>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
              {PROJETO_CRONOGRAMA.map((f, i) => (
                <motion.div
                  key={f.quando}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                >
                  <p className="pj-label text-pj-terra">{f.quando}</p>
                  <p className="mt-2 text-[15px] font-semibold">{f.titulo}</p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-pj-bg/55">
                    {f.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
