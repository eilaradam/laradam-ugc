"use client";

import { useState } from "react";
import { ArrowRight, AtSign, ChevronDown, Mail, MessageCircle } from "lucide-react";
import { PROJETO, PROJETO_FAQ } from "@/data/projeto";
import Cabecalho from "./Cabecalho";
import { waLink } from "./ProjetoHero";

function Pergunta({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="font-display text-lg sm:text-xl">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-primary transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <p className="pb-6 pr-10 text-[15px] leading-relaxed text-foreground-soft">
          {a}
        </p>
      )}
    </div>
  );
}

export default function ProjetoContato() {
  return (
    <>
      {/* FAQ */}
      <section className="bg-background px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <Cabecalho
            n="09"
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

      {/* CTA final */}
      <section
        id="contato"
        className="relative overflow-hidden bg-foreground px-5 py-24 text-white sm:px-8 sm:py-32"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(55% 60% at 50% 0%, rgba(127,196,192,0.25) 0%, transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-on-dark sm:text-xs">
            Vamos construir juntos
          </p>
          <h2 className="font-display mt-5 text-3xl leading-[1.08] tracking-tight sm:text-6xl">
            A obra começa em{" "}
            <span className="font-serif-accent text-accent-on-dark">
              {PROJETO.inicioObra.toLowerCase()}
            </span>
            .
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-lg">
            Me manda uma mensagem contando qual categoria interessa e eu volto com a
            proposta fechada, com entregas, prazos e números.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-on-dark px-8 py-4 text-sm font-semibold text-foreground transition hover:bg-white sm:w-auto sm:text-base"
            >
              <MessageCircle className="h-[18px] w-[18px]" />
              Chamar no WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={`mailto:${PROJETO.email}?subject=${encodeURIComponent(
                "Parceria · Projeto Casa Estúdio"
              )}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold text-white transition hover:border-white/60 sm:w-auto sm:text-base"
            >
              <Mail className="h-[18px] w-[18px]" />
              Mandar e-mail
            </a>
          </div>

          <div className="mt-12 flex flex-col items-center gap-2 text-[14px] text-white/55">
            <a
              href={`https://instagram.com/${PROJETO.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition hover:text-accent-on-dark"
            >
              <AtSign className="h-4 w-4" />
              {PROJETO.instagram}
            </a>
            <p>{PROJETO.whatsappLabel}</p>
            <p>{PROJETO.email}</p>
          </div>
        </div>
      </section>

      <footer className="bg-foreground px-5 pb-28 text-center text-[12px] text-white/35 sm:px-8 sm:pb-10">
        Lara Dam · UGC Creator e estrategista de conteúdo · Litoral de SP
      </footer>

      {/* Barra fixa no celular */}
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed inset-x-4 bottom-4 z-50 flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-foreground/20 sm:hidden"
      >
        <MessageCircle className="h-[18px] w-[18px]" />
        Quero ser parceiro do projeto
      </a>
    </>
  );
}
