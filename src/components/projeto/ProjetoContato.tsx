"use client";

import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { PROJETO, PROJETO_FAQ } from "@/data/projeto";
import Cabecalho from "./Cabecalho";
import { waLink } from "./ProjetoHero";

function Pergunta({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-pj-line">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="pj-display text-[1.25rem] sm:text-[1.5rem]">{q}</span>
        <Plus
          className={`h-5 w-5 shrink-0 text-pj-terra transition-transform ${
            open ? "rotate-45" : ""
          }`}
        />
      </button>
      {open && (
        <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-pj-muted">
          {a}
        </p>
      )}
    </div>
  );
}

export default function ProjetoContato() {
  return (
    <>
      {/* Dúvidas */}
      <section className="bg-pj-bg px-5 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Cabecalho
            n="10"
            chapeu="Dúvidas comuns"
            titulo="O que as marcas costumam perguntar."
          />
          <div className="mt-12">
            {PROJETO_FAQ.map((f) => (
              <Pergunta key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Chamada final */}
      <section id="contato" className="bg-pj-ink px-5 py-24 text-pj-bg sm:px-10 sm:py-32">
        <div className="mx-auto max-w-[1400px]">
          <p className="pj-label text-pj-olive-soft">Vamos construir juntos</p>
          <h2 className="pj-display mt-6 max-w-[14ch] text-[2.8rem] uppercase sm:text-[5rem] lg:text-[6.4rem]">
            A obra começa em {PROJETO.inicioObra.split(" de ")[0].toLowerCase()}
          </h2>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="max-w-xl text-[16px] leading-relaxed text-pj-bg/70 sm:text-[18px]">
              Me manda uma mensagem contando qual categoria interessa e eu volto
              com a proposta fechada, com entregas, prazos e números.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-pj-terra px-8 py-4 text-sm font-semibold text-pj-paper transition hover:bg-pj-bg hover:text-pj-ink"
              >
                Chamar no WhatsApp
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={`mailto:${PROJETO.email}?subject=${encodeURIComponent(
                  "Parceria · Projeto Casa Estúdio"
                )}`}
                className="inline-flex items-center gap-2 rounded-full border border-pj-bg/25 px-8 py-4 text-sm font-semibold transition hover:border-pj-bg"
              >
                Mandar e-mail
              </a>
            </div>
          </div>

          <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-pj-bg/20 pt-8 text-[13px] text-pj-bg/50">
            <span>Lara Dam · UGC Creator · {PROJETO.whatsappLabel}</span>
            <span>{PROJETO.email}</span>
            <a
              href={`https://instagram.com/${PROJETO.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-pj-olive-soft"
            >
              @{PROJETO.instagram}
            </a>
          </div>
        </div>
      </section>

      {/* Barra fixa no celular */}
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed inset-x-4 bottom-4 z-50 flex items-center justify-center gap-2 rounded-full bg-pj-terra px-6 py-4 text-sm font-semibold text-pj-paper shadow-xl sm:hidden"
      >
        Quero ser parceiro do projeto
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </>
  );
}
