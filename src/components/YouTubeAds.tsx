"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useVideoModal } from "./VideoModalProvider";
import type { Video } from "@/data/content";

type YtAd = {
  youtubeId: string; // id do YouTube (vídeo horizontal 16:9)
  brand: string;
  title: string;
  views?: string; // ex: "2,3 mi"
};

// TODO Lara: trocar youtubeId pelos 4 vídeos horizontais de YouTube Ads
const YT_ADS: YtAd[] = [
  { youtubeId: "zZXflzISC1c", brand: "Óculos", title: "YouTube Ad — Óculos", views: "2,3 mi" },
  { youtubeId: "Lms0XrCgfnI", brand: "Sheglam", title: "YouTube Ad — Sheglam", views: "828 mil" },
  { youtubeId: "adYG4nOwaIM", brand: "Cygnuss", title: "YouTube Ad — Cygnuss" },
  { youtubeId: "", brand: "Cygnuss", title: "YouTube Ad — Cygnuss Sutiã" },
];

function YouTubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 68 48" {...props}>
      <path
        d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
        fill="#FF0000"
      />
      <path d="M45 24 27 14v20" fill="#fff" />
    </svg>
  );
}

export default function YouTubeAds() {
  return (
    <section
      id="youtube"
      className="px-6 md:px-12 py-10 md:py-20 bg-background"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-12 items-center">
        {/* Coluna esquerda — título + descrição */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-5"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            YouTube Ads
          </div>

          <h2 className="font-display font-black text-4xl md:text-6xl leading-[0.9] tracking-tighter text-foreground">
            Sua marca no
            <br />
            <span className="inline-flex items-center gap-3 md:gap-4 flex-wrap">
              YouTube
              <YouTubeIcon className="h-8 md:h-12 w-auto" />
            </span>
          </h2>

          <p className="mt-6 text-foreground-soft text-base md:text-lg leading-snug">
            Mais visibilidade,
            <br />
            mais estratégia,
            <br />
            mais resultado!
          </p>

          <p className="mt-6 text-foreground-soft text-sm md:text-base max-w-md leading-relaxed">
            Tudo isso com vídeos pensados para o{" "}
            <span className="font-serif-accent italic text-primary">
              YouTube Ads
            </span>
            .
          </p>
        </motion.div>

        {/* Coluna direita — grid 2x2 de vídeos horizontais */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {YT_ADS.map((ad, i) => (
            <YouTubeAdCard key={`${ad.brand}-${i}`} ad={ad} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function YouTubeAdCard({ ad, index }: { ad: YtAd; index: number }) {
  const { open } = useVideoModal();

  const video: Video = {
    id: `yt-ad-${index}`,
    title: ad.title,
    category: "youtube",
    brand: ad.brand,
    youtubeId: ad.youtubeId || undefined,
    landscape: true,
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => open(video)}
      className="group relative aspect-video overflow-hidden rounded-xl bg-foreground cursor-pointer"
    >
      {ad.youtubeId ? (
        <img
          src={`https://i.ytimg.com/vi/${ad.youtubeId}/maxresdefault.jpg`}
          alt={ad.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = `https://i.ytimg.com/vi/${ad.youtubeId}/hqdefault.jpg`;
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground-soft to-primary/20 flex items-center justify-center">
          <div className="text-background/50 text-center p-4">
            <Play className="w-10 h-10 mx-auto mb-2 opacity-60" />
            <div className="text-[10px] uppercase tracking-wider font-semibold">
              {ad.brand}
            </div>
          </div>
        </div>
      )}

      {/* Badge de views */}
      {ad.views && (
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#FF0000] text-white text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-md">
          {ad.views} views
        </div>
      )}

      {/* Play overlay estilo YouTube */}
      <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="w-14 h-10 md:w-16 md:h-11 rounded-lg bg-black/70 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#FF0000] transition-colors">
          <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 fill-white ml-0.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
}
