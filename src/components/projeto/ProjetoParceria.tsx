"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import {
  PROJETO_BUSCA,
  PROJETO_FORMATOS_TEXTO,
  PROJETO_PLANOS,
  type BuscaItem,
} from "@/data/projeto";
import Cabecalho from "./Cabecalho";
import { waLink } from "./ProjetoHero";

const STATUS: Record<BuscaItem["status"], { label: string; cls: string; dot: string }> = {
  aberto: {
    label: "Vaga aberta",
    cls: "bg-primary-light text-primary-dark",
    dot: "bg-primary",
  },
  conversando: {
    label: "Em conversa",
    cls: "bg-[#F6E9D2] text-[#8A5A1B]",
    dot: "bg-[#C8892B]",
  },
  fechado: {
    label: "Fechado",
    cls: "bg-border text-muted",
    dot: "bg-muted",
  },
};

export default function ProjetoParceria() {
  const abertas = PROJETO_BUSCA.filter((b) => b.status === "aberto").length;

  return (
    <>
      {/* O que estou procurando */}
      <section id="procuro" className="bg-background px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Cabecalho
            n="07"
            chapeu="O que estou procurando"
            titulo={`${abertas} categorias de parceiro ainda abertas.`}
            sub="Se a sua marca se encaixa em alguma delas, me chama. Se não estiver na lista e fizer sentido pra obra, me chama do mesmo jeito."
          />

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PROJETO_BUSCA.map((b, i) => {
              const s = STATUS[b.status];
              return (
                <motion.div
                  key={b.categoria}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-white/60 px-5 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-semibold text-foreground">
                      {b.categoria}
                    </p>
                    <p className="mt-0.5 truncate text-[13px] text-muted">
                      {b.ambiente}
                    </p>
                  </div>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${s.cls}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                    {b.marca && b.status === "fechado" ? b.marca : s.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Formatos de parceria */}
      <section id="parceria" className="bg-background-alt px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Cabecalho
            n="08"
            chapeu="Formatos de parceria"
            titulo="Três jeitos de entrar. Escolha o tamanho."
            sub={PROJETO_FORMATOS_TEXTO}
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {PROJETO_PLANOS.map((p, i) => (
              <motion.div
                key={p.nome}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`flex flex-col rounded-3xl p-8 sm:p-9 ${
                  p.destaque
                    ? "bg-foreground text-white"
                    : "border border-border bg-background"
                }`}
              >
                {p.destaque && (
                  <span className="mb-5 inline-flex w-fit rounded-full bg-accent-on-dark px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground">
                    Mais completo
                  </span>
                )}
                <h3 className="font-display text-2xl sm:text-3xl">{p.nome}</h3>
                <p
                  className={`mt-1 text-[13px] font-semibold uppercase tracking-[0.12em] ${
                    p.destaque ? "text-accent-on-dark" : "text-primary"
                  }`}
                >
                  {p.chamada}
                </p>
                <p
                  className={`mt-5 text-[15px] leading-relaxed ${
                    p.destaque ? "text-white/70" : "text-foreground-soft"
                  }`}
                >
                  {p.descricao}
                </p>

                <ul className="mt-7 space-y-3">
                  {p.entregas.map((e) => (
                    <li key={e} className="flex gap-3 text-[14px] leading-snug">
                      <Check
                        className={`mt-[3px] h-4 w-4 shrink-0 ${
                          p.destaque ? "text-accent-on-dark" : "text-primary"
                        }`}
                      />
                      <span className={p.destaque ? "text-white/85" : "text-foreground"}>
                        {e}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={waLink(
                    `Oi Lara! Quero conversar sobre o formato "${p.nome}" do Projeto Casa Estúdio.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group mt-9 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition ${
                    p.destaque
                      ? "bg-accent-on-dark text-foreground hover:bg-white"
                      : "bg-foreground text-white hover:bg-primary-dark"
                  }`}
                >
                  <MessageCircle className="h-[17px] w-[17px]" />
                  Quero esse formato
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
