"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import type { Video } from "@/data/content";
import { useVideoModal } from "./VideoModalProvider";

// Serviços "o que podemos criar juntos": cada formato vem com um trabalho real como prova
// (capa + resultado), e o vídeo toca no clique. Publi post usa foto do ensaio (sem métrica).
export type Servico = {
  titulo: string;
  texto: string;
  tags: string[];
  capa: string;
  marca?: string;
  resultado?: string;
  youtubeId?: string;
};

export const SERVICOS: Servico[] = [
  {
    titulo: "Criativos para tráfego",
    texto: "Ads pra Meta, TikTok e YouTube feitos pra baixar seu CPA.",
    tags: ["Meta", "TikTok", "YouTube"],
    capa: "/best-infinitepay.jpg",
    marca: "InfinitePay",
    resultado: "100M views",
    youtubeId: "5wf8Fv2CTa4",
  },
  {
    titulo: "UGC para e‑commerce", // hífen que não quebra linha
    texto: "Vídeo de produto com cara de cliente real, pra sua loja vender todo dia.",
    tags: ["Review", "Unboxing", "Uso real"],
    capa: "/best-bready.jpg",
    marca: "Bready",
    resultado: "5,94x ROAS",
    youtubeId: "2s6BI893C74",
  },
  {
    titulo: "Publi post",
    texto: "Sua marca no meu perfil, falando com quem já confia em mim.",
    tags: ["Reels", "Stories", "TikTok"],
    capa: "/ensaio/capa-caixa-rosto.webp",
  },
  {
    titulo: "Gestão em escala",
    texto: "Vários creators, do briefing à entrega, sem dor de cabeça pra você.",
    tags: ["Curadoria", "Briefing", "Entrega"],
    capa: "/best-meliuz-cashback.jpg",
    marca: "Méliuz",
    resultado: "1.023 vídeos",
    youtubeId: "dgQYEfEQTvQ",
  },
];

export default function ServicesScrapbook() {
  const { open } = useVideoModal();

  return (
    <section id="servicos" className="bg-background px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-end mb-10 md:mb-14">
          <div className="md:col-span-7">
            <div className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              Serviços
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl leading-[0.95] tracking-tighter text-foreground">
              O que podemos <span className="font-serif-accent italic text-primary">criar</span> juntos?
            </h2>
          </div>
          <div className="md:col-span-5 md:justify-self-end max-w-md">
            <p className="text-foreground-soft text-base md:text-lg leading-relaxed">
              Cada formato tem um objetivo: vender, escalar ou construir marca. Me conta o seu que a gente monta o
              combo perfeito.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {SERVICOS.map((s, i) => {
            const video: Video | null = s.youtubeId
              ? { id: `servico-${i}`, title: s.titulo, category: "tech", brand: s.marca ?? "", youtubeId: s.youtubeId }
              : null;
            return (
              <motion.article
                key={s.titulo}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-foreground/10"
              >
                <button
                  type="button"
                  disabled={!video}
                  onClick={() => video && open(video)}
                  data-track={`servico_video_${i + 1}`}
                  data-cursor={video ? "play" : undefined}
                  aria-label={video ? `Ver vídeo ${s.marca}` : s.titulo}
                  className="relative aspect-[4/5] overflow-hidden bg-foreground text-left disabled:cursor-default"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.capa}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {s.resultado && (
                    <span className="absolute top-2.5 left-2.5 md:top-3 md:left-3 rounded-full bg-primary text-white px-2.5 md:px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-wide">
                      {s.resultado}
                    </span>
                  )}
                  {s.marca && (
                    <span className="absolute bottom-2.5 left-2.5 md:bottom-3 md:left-3 text-white text-[11px] md:text-sm font-semibold">
                      {s.marca}
                    </span>
                  )}
                  {video && (
                    <span className="absolute bottom-2.5 right-2.5 md:bottom-3 md:right-3 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground fill-foreground ml-0.5" />
                    </span>
                  )}
                </button>

                <div className="flex flex-col flex-1 p-4 md:p-6">
                  <span className="font-display text-xs md:text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-1 font-display font-black text-lg md:text-2xl leading-tight text-foreground">{s.titulo}</h3>
                  <p className="mt-2 text-[13px] md:text-[15px] leading-snug md:leading-relaxed text-foreground-soft">{s.texto}</p>
                  <div className="mt-3 flex flex-wrap gap-1 md:gap-1.5">
                    {s.tags.map((tg) => (
                      <span key={tg} className="rounded-full bg-primary-light text-primary px-2 py-0.5 text-[10px] md:text-xs font-semibold">
                        {tg}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#contato"
                    data-track={`servico_quero_${i + 1}`}
                    className="mt-auto pt-4 md:pt-5 inline-flex items-center gap-1.5 text-sm md:text-base font-bold text-foreground hover:text-primary transition-colors"
                  >
                    Quero esse <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
