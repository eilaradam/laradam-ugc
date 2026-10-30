"use client";

import { useEffect, useState } from "react";

export type FotoFundo = { src: string; cor: string };

// Ritmo escolhido pela Lara entre suave (2,2s), rápido e gif (0,9s)
const INTERVALO_MS = 1500;
const FADE_MS = 450;

// Fotos de fundo da capa trocando, uma dissolvendo na outra (efeito "gif mudando de ângulo").
// Cada foto vertical fica à direita, numa parede da mesma cor dela, com a borda esquerda
// se misturando na parede. Todas ficam empilhadas e só a opacidade muda.
// modo "bloco": no celular a foto fica num quadro abaixo do texto, em vez de fundo da capa.
export default function FundoTrocando({ fotos, modo = "fundo", className = "" }: { fotos: FotoFundo[]; modo?: "fundo" | "bloco"; className?: string }) {
  const bloco = modo === "bloco";
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    if (fotos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setAtual((i) => (i + 1) % fotos.length), INTERVALO_MS);
    return () => clearInterval(t);
  }, [fotos.length]);

  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {fotos.map((f, i) => (
        <div
          key={f.src}
          className="absolute inset-0 transition-opacity ease-in-out"
          style={{ opacity: i === atual ? 1 : 0, transitionDuration: `${FADE_MS}ms`, background: f.cor }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={f.src}
            alt=""
            fetchPriority={i === 0 ? "high" : "low"}
            className={bloco ? "absolute inset-0 w-full h-full object-cover object-top" : "absolute right-[-42%] md:right-0 top-0 h-full w-auto max-w-none object-cover object-top"}
            style={bloco ? undefined : {
              maskImage: "linear-gradient(to right, transparent 0%, black 22%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 22%)",
            }}
          />
        </div>
      ))}
      {/* clareia a esquerda pra o texto ler bem em cima da parede */}
      {!bloco && <div className="absolute inset-0 bg-gradient-to-r from-background from-30% via-background/50 via-45% to-transparent to-60%" />}
    </div>
  );
}
