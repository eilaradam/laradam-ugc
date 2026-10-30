"use client";

import { useEffect, useState } from "react";

// Fotos de fundo da capa trocando devagar, uma dissolvendo na outra (efeito "gif mudando de ângulo").
// Todas ficam empilhadas e só a opacidade muda, então não pisca nem recarrega imagem.
const INTERVALO_MS = 3200;

export default function FundoTrocando({ fotos }: { fotos: string[] }) {
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    if (fotos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setAtual((i) => (i + 1) % fotos.length), INTERVALO_MS);
    return () => clearInterval(t);
  }, [fotos.length]);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {fotos.map((src, i) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={src}
          src={src}
          alt=""
          fetchPriority={i === 0 ? "high" : "low"}
          className="absolute inset-0 w-full h-full object-cover object-[75%_30%] transition-opacity duration-[1400ms] ease-in-out"
          style={{ opacity: i === atual ? 1 : 0 }}
        />
      ))}
      {/* clareia a esquerda pra o texto ler bem em cima da parede creme */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent md:via-background/30" />
    </div>
  );
}
