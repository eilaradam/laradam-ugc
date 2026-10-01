"use client";

import { useEffect, useState } from "react";
import { ENTRADA } from "@/data/entrada";

const DURACAO_CARREGANDO = 1500; // ms

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
        </div>
      ) : (
        <div className="en-escolha">
          <div className="en-avatar">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ENTRADA.avatar} alt="Lara Dam" />
          </div>
          <h1>{ENTRADA.titulo}</h1>
          <p className="en-sub">{ENTRADA.sub}</p>
          <div className="en-botoes">
            {ENTRADA.caminhos.map((c, i) => (
              <a key={c.id} href={c.href} className="en-botao" style={{ animationDelay: `${0.1 + i * 0.08}s` }} data-track={`entrada_${c.id}`}>
                <span className="e">{c.emoji}</span>
                <span>{c.rotulo}</span>
                <small>{c.dica} →</small>
              </a>
            ))}
          </div>
          <div className="en-rodape">{ENTRADA.rodape}</div>
        </div>
      )}
    </main>
  );
}
