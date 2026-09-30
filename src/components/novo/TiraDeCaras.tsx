"use client";

import { CARAS } from "@/data/novo";

// Tira horizontal com a série de expressões do ensaio, correndo em CSS
// (sem framer infinito, que trava captura de tela).
export default function TiraDeCaras() {
  const dobrada = [...CARAS, ...CARAS];
  return (
    <section className="bg-foreground text-background py-10 md:py-14 overflow-hidden border-y-2 border-foreground">
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
        <h2 className="font-display font-black text-3xl md:text-5xl tracking-tighter leading-[0.95]">
          Uma cara pra cada{" "}
          <span className="font-serif-accent italic text-accent-on-dark">segundo do roteiro</span>
        </h2>
        <p className="text-background/70 text-sm md:text-base max-w-sm">
          Hook, problema, virada, prova e CTA. O vídeo segura porque a expressão acompanha o texto. 🎭
        </p>
      </div>

      <div className="marquee-caras">
        {dobrada.map((c, i) => (
          <figure key={`${c.src}-${i}`} className="flex-shrink-0 w-[150px] md:w-[190px]">
            <div
              className="aspect-[2/3] rounded-md border-2 border-background/80 overflow-hidden bg-background-alt"
              style={{ boxShadow: "5px 5px 0 0 var(--accent-on-dark)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.src}
                alt={`Lara Dam: ${c.legenda}`}
                loading="lazy"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 15%" }}
              />
            </div>
            <figcaption className="mt-3 text-center font-serif-accent italic text-base md:text-lg text-background/90">
              {c.legenda}
            </figcaption>
          </figure>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .marquee-caras { display: flex; gap: 1.25rem; width: max-content; padding-left: 1.25rem; animation: marquee 48s linear infinite; }
        .marquee-caras:hover { animation-play-state: paused; }
      ` }} />
    </section>
  );
}
