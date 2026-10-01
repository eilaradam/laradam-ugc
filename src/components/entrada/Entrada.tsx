"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ENTRADA } from "@/data/entrada";

const DURACAO_CARREGANDO = 1700; // ms

export default function Entrada() {
  const [fase, setFase] = useState<"carregando" | "escolha">("carregando");

  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setFase("escolha"), reduz ? 0 : DURACAO_CARREGANDO);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="en-pagina">
      {fase === "carregando" ? (
        <div className="en-carregando" role="status" aria-live="polite">
          <div className="en-anel">
            <svg viewBox="0 0 120 120" aria-hidden>
              <circle className="trilha" cx="60" cy="60" r="54" />
              <circle className="progresso" cx="60" cy="60" r="54" />
            </svg>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ENTRADA.avatar} alt="Lara Dam" />
          </div>
          <div className="en-carregando-txt">{ENTRADA.carregando}<span className="pontos" aria-hidden><i>.</i><i>.</i><i>.</i></span></div>
          <div className="en-barra" aria-hidden><i /></div>
        </div>
      ) : (
        <div className="en-escolha">
          <div className="en-cab">
            <div className="en-avatar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ENTRADA.avatar} alt="Lara Dam" />
            </div>
            <div className="en-eyebrow">{ENTRADA.eyebrow}</div>
            <h1>{ENTRADA.titulo1} <span>{ENTRADA.tituloAcento}</span></h1>
            <p>{ENTRADA.sub}</p>
          </div>

          <div className="en-caminhos">
            {ENTRADA.caminhos.map((c, i) => (
              <a key={c.id} href={c.href} className={`en-caminho ${c.id}`} style={{ animationDelay: `${0.12 + i * 0.1}s` }} data-track={`entrada_${c.id}`}>
                <div className="foto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.foto} alt="" style={{ objectPosition: c.posicao }} />
                  <span className="rotulo"><span className="e">{c.emoji}</span> {c.rotulo}</span>
                </div>
                <div className="txt">
                  <h2>{c.titulo}</h2>
                  <p>{c.desc}</p>
                  <p className="pra pf-mao">{c.pra}</p>
                  <span className="cta">{c.cta} <ArrowRight className="w-4 h-4" /></span>
                </div>
              </a>
            ))}
          </div>

          <div className="en-rodape">{ENTRADA.rodape}</div>
        </div>
      )}
    </main>
  );
}
