"use client";

import { motion } from "framer-motion";
import { ArrowRight, Megaphone, ShoppingBag, Target, Users } from "lucide-react";
import { SERVICOS } from "./dados";

// Versões minimalistas da seção de serviços: só cards, sem foto nem enfeite.
const ICONES = [Target, ShoppingBag, Megaphone, Users];

function Cabecalho({ centro = false }: { centro?: boolean }) {
  return (
    <div className={`mb-10 md:mb-14 ${centro ? "text-center" : ""}`}>
      <div className={`text-xs uppercase tracking-[0.3em] text-primary font-medium mb-4 flex items-center gap-3 ${centro ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-primary" />
        Serviços
        {centro && <span className="h-px w-8 bg-primary" />}
      </div>
      <h2 className="font-display font-black text-3xl md:text-5xl leading-[1] tracking-tight text-foreground">
        O que podemos <span className="font-serif-accent italic text-primary">criar</span> juntos?
      </h2>
    </div>
  );
}

const entra = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay: i * 0.06 },
});

// 1 · Ícones: 4 cards brancos com ícone num círculo
export function ServicosIcones({ id = "servicos" }: { id?: string }) {
  return (
    <section id={id} className="bg-background px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <Cabecalho centro />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {SERVICOS.map((s, i) => {
            const Icone = ICONES[i];
            return (
              <motion.a
                key={s.titulo}
                href="#contato"
                data-track={`servico_quero_${i + 1}`}
                {...entra(i)}
                className="group flex flex-col rounded-2xl bg-white border border-foreground/10 p-5 md:p-7 hover:border-primary/40 hover:shadow-lg transition-all"
              >
                <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-light text-primary flex items-center justify-center">
                  <Icone className="w-5 h-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 md:mt-6 font-display font-bold text-lg md:text-xl leading-tight text-foreground">{s.titulo}</h3>
                <p className="mt-2 text-[13px] md:text-[15px] leading-relaxed text-foreground-soft">{s.texto}</p>
                <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Saber mais <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// 2 · Numerados: cards creme sem borda, número fino grande
export function ServicosNumerados({ id = "servicos" }: { id?: string }) {
  return (
    <section id={id} className="bg-background px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 md:gap-12">
        <div className="md:col-span-4">
          <Cabecalho />
          <p className="-mt-4 md:-mt-6 text-foreground-soft text-base leading-relaxed max-w-sm">
            Cada formato tem um objetivo. Me conta o seu que a gente monta o combo certo.
          </p>
          <a
            href="#contato"
            data-track="servicos_cta"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground border-b border-foreground pb-0.5 hover:text-primary hover:border-primary transition-colors"
          >
            Falar comigo <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="md:col-span-8 grid grid-cols-2 gap-3 md:gap-4">
          {SERVICOS.map((s, i) => (
            <motion.a
              key={s.titulo}
              href="#contato"
              data-track={`servico_quero_${i + 1}`}
              {...entra(i)}
              className="rounded-2xl bg-background-alt p-5 md:p-8 hover:bg-primary-light transition-colors"
            >
              <span className="font-display font-light text-4xl md:text-5xl text-primary/50 leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 md:mt-6 font-display font-bold text-lg md:text-2xl leading-tight text-foreground">{s.titulo}</h3>
              <p className="mt-2 text-[13px] md:text-[15px] leading-relaxed text-foreground-soft">{s.texto}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// 3 · Com destaque: estilo tabela de planos, o primeiro em azul-marinho com selo
export function ServicosDestaque({ id = "servicos" }: { id?: string }) {
  return (
    <section id={id} className="bg-background px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <Cabecalho centro />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 items-stretch">
          {SERVICOS.map((s, i) => {
            const top = i === 0;
            const Icone = ICONES[i];
            return (
              <motion.a
                key={s.titulo}
                href="#contato"
                data-track={`servico_quero_${i + 1}`}
                {...entra(i)}
                className={`relative flex flex-col rounded-2xl p-5 md:p-7 transition-transform hover:-translate-y-1 ${
                  top ? "bg-foreground text-background shadow-xl" : "bg-white border border-foreground/10 text-foreground"
                }`}
              >
                {top && (
                  <span className="absolute -top-3 left-5 md:left-7 rounded-full bg-accent-on-dark text-foreground px-3 py-1 text-[10px] md:text-[11px] font-bold uppercase tracking-wider">
                    Mais pedido
                  </span>
                )}
                <Icone className={`w-6 h-6 ${top ? "text-accent-on-dark" : "text-primary"}`} strokeWidth={1.6} />
                <h3 className="mt-5 font-display font-bold text-lg md:text-xl leading-tight">{s.titulo}</h3>
                <p className={`mt-2 text-[13px] md:text-[15px] leading-relaxed ${top ? "text-background/75" : "text-foreground-soft"}`}>{s.texto}</p>
                <ul className={`mt-4 space-y-1.5 text-[12px] md:text-sm ${top ? "text-background/85" : "text-foreground-soft"}`}>
                  {s.tags.map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className={`w-1 h-1 rounded-full ${top ? "bg-accent-on-dark" : "bg-primary"}`} />
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto pt-6">
                  <span
                    className={`flex items-center justify-center rounded-full py-2.5 text-sm font-semibold ${
                      top ? "bg-background text-foreground" : "border border-foreground/20"
                    }`}
                  >
                    Quero esse
                  </span>
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
