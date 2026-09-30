"use client";

import { CARAS } from "@/data/perfil";

export default function Caras() {
  return (
    <section id="caras" className="pf-sec">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2>Uma cara pra cada segundo do roteiro 🎭</h2>
          <p className="sub">Hook, problema, virada, prova e CTA. O vídeo segura porque a expressão acompanha o texto. Desliza pro lado.</p>
        </div>
        <span className="pf-mao pf-nota">← série do ensaio, sem filtro</span>
      </div>
      <div className="pf-tira">
        {CARAS.map((c, i) => (
          <figure key={c.src} className="pf-quadro">
            <span className="n">{String(i + 1).padStart(2, "0")}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.src} alt={`Lara Dam: ${c.legenda}`} loading="lazy" />
            <figcaption className="leg pf-mao">{c.legenda}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
