"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import VideoCard from "@/components/VideoCard";
import { SERVICOS, PECAS } from "./dados";

// Versão A: lista editorial. Uma linha grande por serviço, número e título enormes,
// e um leque de 3 trabalhos daquele tipo (abre no hover, no computador).
export default function ServicosLista({ id = "servicos" }: { id?: string }) {
  return (
    <section id={id} className="bg-background px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-primary" />
          Serviços
        </div>
        <h2 className="font-display font-black text-4xl md:text-7xl leading-[0.92] tracking-tighter text-foreground max-w-4xl">
          O que podemos <span className="font-serif-accent italic text-primary">criar</span> juntos?
        </h2>

        <ol className="mt-10 md:mt-16 border-b border-foreground/15">
          {SERVICOS.map((s, i) => (
            <motion.li
              key={s.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="group border-t border-foreground/15 py-8 md:py-12 grid md:grid-cols-12 gap-6 md:gap-8 items-center"
            >
              <div className="md:col-span-1 font-display font-black text-4xl md:text-6xl text-primary/25 leading-none">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="md:col-span-5">
                <h3 className="font-display font-black text-3xl md:text-5xl leading-[0.95] tracking-tight text-foreground">
                  {s.titulo}
                </h3>
                <p className="mt-3 text-foreground-soft text-base md:text-lg leading-relaxed max-w-md">{s.texto}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {s.resultado && (
                    <span className="font-display font-black text-xl md:text-2xl text-primary">
                      {s.resultado}
                      <span className="ml-1.5 text-xs font-sans font-semibold uppercase tracking-wider text-muted">{s.marca}</span>
                    </span>
                  )}
                  <a href="#contato" data-track={`servico_quero_${i + 1}`} className="inline-flex items-center gap-1.5 font-bold text-foreground hover:text-primary transition-colors">
                    Quero esse <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="md:col-span-6 flex justify-center md:justify-end">
                <div className="relative h-[230px] md:h-[300px] w-[300px] md:w-[420px]">
                  {PECAS[i].map((p, k) => {
                    const rot = [-9, 0, 9][k];
                    const x = [-1, 0, 1][k];
                    return (
                      <div
                        key={k}
                        className="absolute top-0 left-1/2 w-[120px] md:w-[160px] transition-transform duration-500 ease-out shadow-xl rounded-2xl"
                        style={{
                          zIndex: k === 1 ? 3 : 2,
                          transform: `translateX(calc(-50% + ${x * 78}px)) rotate(${rot}deg)`,
                        }}
                      >
                        {p.video ? (
                          <VideoCard video={p.video} index={k} />
                        ) : (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={p.foto} alt="" className="aspect-[9/16] w-full object-cover rounded-2xl" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
