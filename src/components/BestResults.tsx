"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Pause, Play } from "lucide-react";
import { useVideoModal } from "./VideoModalProvider";
import type { Video } from "@/data/content";

type Highlight = {
  youtubeId: string;
  brand: string;
  brandDomain: string; // usado pelo Clearbit pro logo
  metric: string; // ex: "+ 50 milhões de views"
  platform: string; // ex: "apenas no TikTok"
};

const HIGHLIGHTS: Highlight[] = [
  {
    youtubeId: "5wf8Fv2CTa4",
    brand: "InfinitePay",
    brandDomain: "infinitepay.io",
    metric: "+ 50 milhões de views",
    platform: "apenas no TikTok",
  },
  {
    youtubeId: "wesTfq67X9o",
    brand: "Méliuz",
    brandDomain: "meliuz.com.br",
    metric: "+ 10 milhões de views",
    platform: "apenas no TikTok",
  },
];

// Áudio de cliente — abre no modal mas esconde o vídeo (audioOnly)
const AUDIO_TESTIMONIAL = {
  youtubeId: "rRrIpSRu90A",
  brand: "Depoimento de cliente",
  duration: "13:52",
};

export default function BestResults() {
  return (
    <section
      id="destaques"
      className="px-6 md:px-12 py-10 md:py-20 bg-background relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-12 items-start">
        {/* Coluna esquerda — título + áudio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-5 md:sticky md:top-28 self-start"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            Conteúdos que estouraram
          </div>

          <h2 className="font-display font-black text-4xl md:text-6xl leading-[0.9] tracking-tighter text-foreground">
            Os melhores{" "}
            <span className="font-serif-accent italic text-primary">
              resultados
            </span>
          </h2>

          <p className="mt-4 text-foreground-soft text-base md:text-lg max-w-md">
            Será que você já me viu por aí? <span aria-hidden>👀</span>
          </p>

          <p className="mt-5 text-foreground-soft text-sm md:text-base max-w-md leading-relaxed">
            Criei conteúdos que se destacaram e trouxeram ótimos resultados para
            marcas parceiras.
          </p>

          <div className="mt-8 md:mt-10">
            <AudioTestimonialCard />
          </div>
        </motion.div>

        {/* Coluna direita — 2 vídeos verticais */}
        <div className="md:col-span-7 grid grid-cols-2 gap-4 md:gap-6">
          {HIGHLIGHTS.map((h, i) => (
            <HighlightCard key={h.brand} highlight={h} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HighlightCard({
  highlight,
  index,
}: {
  highlight: Highlight;
  index: number;
}) {
  const { open } = useVideoModal();

  const video: Video = {
    id: `highlight-${highlight.brand}`,
    title: `Case ${highlight.brand}`,
    category: "tech",
    brand: highlight.brand,
    youtubeId: highlight.youtubeId || undefined,
    views: highlight.metric.replace("+ ", "").replace(" milhões de views", "M"),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col"
    >
      {/* Brand logo acima do vídeo */}
      <div className="h-8 md:h-10 flex items-center justify-center mb-3 md:mb-4">
        <img
          src={`https://logo.clearbit.com/${highlight.brandDomain}?size=200`}
          alt={highlight.brand}
          loading="lazy"
          className="max-h-full max-w-[140px] md:max-w-[170px] object-contain"
          onError={(e) => {
            const el = e.currentTarget;
            el.style.display = "none";
            const fallback = el.nextElementSibling as HTMLElement | null;
            if (fallback) fallback.style.display = "block";
          }}
        />
        <span className="hidden font-display font-bold text-sm md:text-base text-foreground">
          {highlight.brand}
        </span>
      </div>

      {/* Vídeo vertical */}
      <button
        onClick={() => open(video)}
        className="group relative w-full aspect-[9/16] overflow-hidden rounded-2xl bg-foreground cursor-pointer"
      >
        {highlight.youtubeId ? (
          <img
            src={`https://i.ytimg.com/vi/${highlight.youtubeId}/maxresdefault.jpg`}
            alt={highlight.brand}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = `https://i.ytimg.com/vi/${highlight.youtubeId}/hqdefault.jpg`;
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground-soft to-primary/30 flex items-center justify-center">
            <div className="text-background/50 text-center p-4">
              <Play className="w-10 h-10 mx-auto mb-2 opacity-60" />
              <div className="text-[10px] uppercase tracking-wider font-semibold">
                {highlight.brand}
              </div>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center">
            <Play className="w-4 h-4 md:w-5 md:h-5 text-primary-light fill-primary-light ml-0.5" />
          </div>
        </div>
      </button>

      {/* Métrica abaixo */}
      <div className="mt-4 md:mt-5 text-center">
        <div className="font-display font-bold text-foreground text-base md:text-xl tracking-tight">
          <span className="font-black">
            {highlight.metric.split(" de ")[0]}
          </span>
          {" de "}
          {highlight.metric.split(" de ")[1]}
        </div>
        <div className="text-sm md:text-base text-foreground-soft mt-0.5">
          {highlight.platform}
        </div>
      </div>
    </motion.div>
  );
}

function AudioTestimonialCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const hasId = Boolean(AUDIO_TESTIMONIAL.youtubeId);

  const toggle = () => {
    if (!hasId) return;
    setIsPlaying((p) => !p);
  };

  // autoplay=1 só toca porque o click do usuário dispara o mount do iframe
  const embedUrl = hasId
    ? `https://www.youtube.com/embed/${AUDIO_TESTIMONIAL.youtubeId}?autoplay=1&controls=0&rel=0&modestbranding=1&playsinline=1`
    : null;

  return (
    <button
      type="button"
      onClick={toggle}
      className="w-full max-w-md relative rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
    >
      {/* iframe oculto atrás da UI — tem dimensão real pra o browser liberar autoplay */}
      {isPlaying && embedUrl && (
        <iframe
          src={embedUrl}
          title="Depoimento de cliente"
          className="absolute inset-0 w-full h-full pointer-events-none"
          allow="autoplay; encrypted-media"
          aria-hidden
          tabIndex={-1}
        />
      )}

      {/* UI na frente cobre visualmente o iframe */}
      <div className="relative z-10 flex items-center gap-3 p-3 md:p-4 bg-[#e9e4db] border border-foreground/5 rounded-3xl">
        {/* Play/Pause */}
        <div
          className={`flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${
            isPlaying ? "bg-primary text-primary-light" : "bg-foreground text-background hover:bg-primary"
          }`}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 md:w-5 md:h-5 fill-current" />
          ) : (
            <Play className="w-4 h-4 md:w-5 md:h-5 fill-current ml-0.5" />
          )}
        </div>

        {/* Waveform + metadata */}
        <div className="flex-1 min-w-0">
          <Waveform playing={isPlaying} />
          <div className="flex items-center justify-between mt-1.5 text-[10px] md:text-xs text-foreground/50 font-medium tabular-nums">
            <span>{isPlaying ? "agora" : "0:01"}</span>
            <span>{AUDIO_TESTIMONIAL.duration}</span>
          </div>
        </div>

        {/* Velocidade + mic — decorativo (estilo WhatsApp) */}
        <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
          <span className="text-[10px] md:text-xs font-semibold text-foreground/60 bg-background/60 rounded-full px-2 py-0.5">
            1,5x
          </span>
          <Mic className="w-4 h-4 text-foreground/40" strokeWidth={2} />
        </div>
      </div>
    </button>
  );
}

// Waveform fake estilo WhatsApp — barras animam quando playing
function Waveform({ playing = false }: { playing?: boolean }) {
  const HEIGHTS = [
    30, 55, 42, 70, 50, 85, 60, 40, 72, 48, 88, 55, 65, 38, 52, 78, 45, 92,
    60, 50, 80, 42, 68, 55, 36, 72, 58, 48, 82, 52, 40, 68, 54, 88, 62, 44,
    76, 50, 38, 64,
  ];
  const progress = playing ? 1 : 0.15;

  return (
    <div className="flex items-center gap-[2px] h-6 md:h-7 w-full">
      {HEIGHTS.map((h, i) => {
        const played = i / HEIGHTS.length < progress;
        return (
          <span
            key={i}
            className={`flex-1 rounded-full origin-center ${
              played ? "bg-primary" : "bg-foreground/35"
            } ${playing ? "wave-bar" : ""}`}
            style={
              {
                height: `${h}%`,
                animationDelay: `${(i % 10) * 80}ms`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
