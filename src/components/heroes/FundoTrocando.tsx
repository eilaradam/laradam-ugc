"use client";

import { useEffect, useState } from "react";

export type FotoFundo = { src: string; cor: string };

// Ritmos da troca. "rapida" é o padrão; ?troca=suave ou ?troca=gif no link mostram os outros
// (pra comparar na prévia; quando a Lara escolher, fica só o escolhido).
const RITMOS = {
  suave: { intervalo: 2200, fade: 700 },
  rapida: { intervalo: 1500, fade: 450 },
  gif: { intervalo: 900, fade: 150 },
} as const;

// Fotos de fundo da capa trocando, uma dissolvendo na outra (efeito "gif mudando de ângulo").
// Cada foto vertical fica à direita, numa parede da mesma cor dela, com a borda esquerda
// se misturando na parede. Todas ficam empilhadas e só a opacidade muda.
export default function FundoTrocando({ fotos }: { fotos: FotoFundo[] }) {
  const [atual, setAtual] = useState(0);
  const [ritmo, setRitmo] = useState<(typeof RITMOS)[keyof typeof RITMOS]>(RITMOS.rapida);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("troca");
    const r = q && q in RITMOS ? RITMOS[q as keyof typeof RITMOS] : RITMOS.rapida;
    if (fotos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setAtual((i) => (i + 1) % fotos.length), r.intervalo);
    // o ritmo também muda a duração do fade; guardado fora do render inicial pra não divergir do servidor
    const raf = requestAnimationFrame(() => setRitmo(r));
    return () => { clearInterval(t); cancelAnimationFrame(raf); };
  }, [fotos.length]);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {fotos.map((f, i) => (
        <div
          key={f.src}
          className="absolute inset-0 transition-opacity ease-in-out"
          style={{ opacity: i === atual ? 1 : 0, transitionDuration: `${ritmo.fade}ms`, background: f.cor }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={f.src}
            alt=""
            fetchPriority={i === 0 ? "high" : "low"}
            className="absolute right-0 top-0 h-full w-auto max-w-none object-cover object-top"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 22%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 22%)",
            }}
          />
        </div>
      ))}
      {/* clareia a esquerda pra o texto ler bem em cima da parede */}
      <div className="absolute inset-0 bg-gradient-to-r from-background from-30% via-background/50 via-45% to-transparent to-60%" />
    </div>
  );
}
