"use client";

import { motion } from "framer-motion";
import { FOTOS, SOBRE } from "@/data/novo";
import { Eyebrow, FotoDura } from "./_ui";

export default function NovoSobre() {
  return (
    <section id="sobre" className="scroll-mt-20 bg-background noise py-14 md:py-20">
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-10 md:gap-12 items-center">
        <div className="md:col-span-5">
          <FotoDura src={FOTOS.sobre} alt="Lara Dam apoiada no sofá do estúdio" posicao="center 35%" className="max-w-[420px] mx-auto md:mx-0" sombra="12px 12px 0 0 var(--primary)" />
        </div>
        <div className="md:col-span-7">
          <Eyebrow>{SOBRE.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display font-black text-4xl md:text-6xl leading-[0.95] tracking-tighter text-foreground">
            {SOBRE.titulo1}{" "}
            <span className="whitespace-nowrap">
              <span className="font-serif-accent italic text-primary">{SOBRE.nome}</span> 👋
            </span>
          </h2>
          <p className="mt-5 text-foreground-soft text-base md:text-lg leading-relaxed max-w-2xl">{SOBRE.corpo1}</p>
          <p className="mt-4 text-foreground-soft text-base md:text-lg leading-relaxed max-w-2xl">{SOBRE.corpo2}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {SOBRE.pills.map((p) => (
              <span key={p} className="px-4 py-2 rounded-md border-2 border-foreground bg-background text-xs md:text-sm font-bold text-foreground" style={{ boxShadow: "3px 3px 0 0 var(--foreground)" }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Galeria polaroid do ensaio */}
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 mt-14 md:mt-20">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-5">
          {SOBRE.galeria.map((g, i) => (
            <motion.figure
              key={g.src}
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: g.giro }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              whileHover={{ rotate: 0, y: -6 }}
              className="bg-background border-2 border-foreground rounded-md p-2 pb-3"
              style={{ boxShadow: "6px 6px 0 0 var(--foreground)" }}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-sm bg-background-alt">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.src} alt={`Lara Dam: ${g.legenda}`} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <figcaption className="mt-2 text-center font-serif-accent italic text-sm md:text-base text-foreground">{g.legenda}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
