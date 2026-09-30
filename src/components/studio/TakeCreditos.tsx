"use client";

import { CREDITOS } from "@/data/studio";
import Take from "./Take";

export default function TakeCreditos() {
  const dobrado = [...CREDITOS.filme, ...CREDITOS.filme];
  return (
    <Take id="creditos" direita={<span className="st-chip-claro st-chip">making of</span>}>
      <div className="mb-6">
        <h2 className="st-display font-extrabold text-4xl md:text-6xl leading-[0.98] tracking-tight">{CREDITOS.titulo}</h2>
        <p className="mt-3 text-[var(--st-ink-2)] text-base md:text-lg max-w-xl">{CREDITOS.sub}</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <div className="lg:col-span-5 st-painel">
          <div className="st-painel-topo"><span className="st-semaforo"><i /><i /><i /></span><span className="font-bold">Making of</span><span className="opacity-60">/ set de setembro</span></div>
          <div className="relative aspect-[4/5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={CREDITOS.fotoMakingOf} alt="Lara Dam apoiada no sofá do estúdio" loading="lazy" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 35%" }} />
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-5">
          <p className="text-base md:text-lg leading-relaxed">{CREDITOS.bio1}</p>
          <p className="text-base md:text-lg leading-relaxed text-[var(--st-ink-2)]">{CREDITOS.bio2}</p>

          {/* créditos rolando */}
          <div className="st-creditos">
            <dl className="st-creditos-rolo">
              {CREDITOS.lista.map((c) => (
                <div key={c.k} className="st-credito">
                  <dt>{c.k}</dt>
                  <dd>{c.v}</dd>
                </div>
              ))}
            </dl>
            <div className="absolute top-3 left-4 st-mono text-[9px] uppercase tracking-widest opacity-60 z-[3]">créditos · passa o mouse pra pausar</div>
          </div>
        </div>
      </div>

      {/* tira de filme com a série de expressões */}
      <div className="mt-10 -mx-4 md:-mx-8 overflow-hidden">
        <div className="st-filme">
          {dobrado.map((f, i) => (
            <figure key={`${f.src}-${i}`}>
              <div className="quadro">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.src} alt={`Lara Dam: ${f.legenda}`} loading="lazy" />
              </div>
              <figcaption>{String((i % CREDITOS.filme.length) + 1).padStart(2, "0")} · {f.legenda}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Take>
  );
}
