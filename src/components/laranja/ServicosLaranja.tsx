"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICOS } from "@/components/servicos/dados";
import { useLang } from "@/lib/i18n";
import { BotaoPilula, Etiqueta, Risquinhos } from "./pecas";

// Serviços em lista numerada: a linha aberta fica preta com as etiquetas e o texto.
export default function ServicosLaranja() {
  const { lang } = useLang();
  const en = lang === "en";
  const [aberto, setAberto] = useState(0);

  return (
    <section id="servicos" className="bg-background px-5 md:px-8 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-5 mb-8 md:mb-10">
          <div>
            <Etiqueta>{en ? "Services" : "Serviços"}</Etiqueta>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight leading-[1.05] text-foreground">
              {en ? "What we can " : "O que podemos "}
              <span className="relative inline-block text-primary">
                {en ? "create together" : "criar juntos"}
                <Risquinhos className="absolute -right-6 md:-right-8 -top-2 w-6 h-6 md:w-8 md:h-8 text-foreground" />
              </span>
            </h2>
          </div>
          <BotaoPilula href="#contato" track="servicos_cta">{en ? "Let's talk" : "Falar comigo"}</BotaoPilula>
        </div>

        <div className="space-y-3">
          {SERVICOS.map((s, i) => {
            const ativo = aberto === i;
            return (
              <motion.div
                key={s.titulo}
                layout
                onMouseEnter={() => setAberto(i)}
                onClick={() => setAberto(i)}
                className={`rounded-2xl border-2 border-foreground cursor-pointer transition-colors ${
                  ativo ? "bg-foreground text-background shadow-[6px_6px_0_0_var(--primary)]" : "bg-white text-foreground hover:bg-primary-light"
                }`}
              >
                <div className="grid grid-cols-[3rem_1fr_auto] md:grid-cols-[7rem_1fr_auto] items-center gap-3 px-4 md:px-6 py-4 md:py-5">
                  <span className={`font-display font-bold text-sm ${ativo ? "text-primary" : "text-primary-dark"}`}>
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <h3 className="font-display font-bold text-lg md:text-2xl tracking-tight">{s.titulo}</h3>
                  <a
                    href="#contato"
                    data-track={`servico_quero_${i + 1}`}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`${en ? "I want" : "Quero"} ${s.titulo}`}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform ${ativo ? "bg-primary text-foreground rotate-45" : "bg-primary text-foreground rotate-0"}`}
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </a>
                </div>
                <AnimatePresence initial={false}>
                  {ativo && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-[3rem_1fr] md:grid-cols-[7rem_1fr] gap-3 px-4 md:px-6 pb-5 md:pb-6">
                        <span />
                        <div>
                          <div className="flex flex-wrap gap-2">
                            {s.tags.map((tag) => (
                              <span key={tag} className="rounded-full border border-background/25 px-3 py-1 text-xs text-background/85">
                                {tag}
                              </span>
                            ))}
                            {s.resultado && (
                              <span className="rounded-full bg-primary text-foreground px-3 py-1 text-xs font-semibold">
                                {s.marca} · {s.resultado}
                              </span>
                            )}
                          </div>
                          <p className="mt-3 text-sm md:text-base text-background/75 max-w-xl">{s.texto}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
