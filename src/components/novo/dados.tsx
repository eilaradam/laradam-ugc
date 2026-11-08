"use client";

import { CATEGORIES, SITE, STATS, TESTIMONIALS, VIDEOS, type Video } from "@/data/content";
import { useVideoModal } from "@/components/VideoModalProvider";

// Dados e peças comuns das 3 direções novas do portfólio (/novo/tv, /novo/revista, /novo/feed).
export { SITE, STATS, TESTIMONIALS };

// 3 destaques: os melhores na frente, não os mais recentes (método funil)
export const DESTAQUES = ["t0a", "t0b", "t-infinitepay"]
  .map((id) => VIDEOS.find((v) => v.id === id))
  .filter((v): v is Video => !!v);

// Nicho com 1 vídeo só pesa contra, então só entram os que têm 2 ou mais
export const NICHOS = CATEGORIES.filter((c) => c.slug !== "all")
  .map((c) => ({ ...c, videos: VIDEOS.filter((v) => v.category === c.slug && (v.youtubeId || v.thumbnail)) }))
  .filter((n) => n.videos.length >= 2);

export const whats = (msg = "Oi Lara! Vi seu portfólio e quero conversar sobre um projeto.") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;

// hqdefault existe pra todo vídeo; num quadro 9:16 com object-cover as faixas pretas do Short somem
export const capaDe = (v: Video) => v.thumbnail ?? (v.youtubeId ? `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg` : "");

export function Thumb({ v, className = "", children }: { v: Video; className?: string; children?: React.ReactNode }) {
  const { open } = useVideoModal();
  return (
    <button type="button" onClick={() => open(v)} data-cursor="play" aria-label={`Ver vídeo ${v.brand}`} className={`group relative block overflow-hidden text-left ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={capaDe(v)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      {children}
    </button>
  );
}
