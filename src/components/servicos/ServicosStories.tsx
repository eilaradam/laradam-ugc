"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useVideoModal } from "@/components/VideoModalProvider";
import { SERVICOS, videoDoServico } from "./dados";

// Versão B: stories. Fundo azul-marinho, cada serviço é um story vertical (capa cheia,
// barrinhas no topo, título e resultado por cima). No celular desliza pro lado.
export default function ServicosStories({ id = "servicos" }: { id?: string }) {
  const { open } = useVideoModal();
  return (
    <section id={id} className="bg-foreground text-background py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-6 items-end mb-10 md:mb-12">
        <div className="md:col-span-8">
          <div className="text-xs uppercase tracking-[0.3em] text-accent-on-dark font-medium mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-accent-on-dark" />
            Serviços
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl leading-[0.95] tracking-tighter">
            O que podemos <span className="font-serif-accent italic text-accent-on-dark">criar</span> juntos?
          </h2>
        </div>
        <p className="md:col-span-4 text-background/70 text-base md:text-lg leading-relaxed">
          Toca num story pra ver o trabalho. Me conta o seu objetivo que a gente monta o combo.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex md:grid md:grid-cols-4 gap-4 md:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide">
        {SERVICOS.map((s, i) => {
          const video = videoDoServico(i);
          return (
            <motion.article
              key={s.titulo}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex-shrink-0 w-[72%] sm:w-[45%] md:w-auto snap-center aspect-[9/16] rounded-3xl overflow-hidden ring-1 ring-white/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.capa} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-black from-25% via-black/75 via-50% to-black/30" />
              <button
                type="button"
                disabled={!video}
                onClick={() => video && open(video)}
                data-track={`servico_video_${i + 1}`}
                aria-label={video ? `Ver vídeo ${s.marca}` : s.titulo}
                className="absolute inset-0 disabled:cursor-default"
              />
              {/* barrinhas de story */}
              <div className="absolute top-3 inset-x-3 flex gap-1 pointer-events-none">
                {SERVICOS.map((_, k) => (
                  <span key={k} className={`h-[3px] flex-1 rounded-full ${k <= i ? "bg-white" : "bg-white/35"}`} />
                ))}
              </div>
              <div className="absolute top-6 inset-x-3 flex items-center gap-2 pointer-events-none">
                <span className="w-7 h-7 rounded-full bg-accent-on-dark text-foreground text-[11px] font-black flex items-center justify-center">LD</span>
                <span className="text-xs font-semibold">eilaradam</span>
                {s.marca && <span className="text-xs text-white/70">· {s.marca}</span>}
              </div>
              <div className="absolute bottom-0 inset-x-0 p-5 md:p-6 pointer-events-none">
                {s.resultado && (
                  <div className="font-display font-black text-3xl md:text-4xl text-accent-on-dark leading-none mb-2">{s.resultado}</div>
                )}
                <h3 className="font-display font-black text-2xl md:text-[1.7rem] leading-tight">{s.titulo}</h3>
                <p className="mt-2 text-sm text-white/80 leading-snug">{s.texto}</p>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8 md:mt-10">
        <a
          href="#contato"
          data-track="servicos_cta"
          className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-7 py-4 font-bold hover:bg-accent-on-dark transition-colors"
        >
          Quero montar o meu combo <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
