"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { Video } from "@/data/content";
import { useVideoModal } from "./VideoModalProvider";

// Cascata de thumbs — se a atual não existir (404) OU vier placeholder (120x90),
// tentamos a próxima. Ordem: alta qualidade horizontal → Shorts vertical → fallbacks.
const THUMB_ENDPOINTS = [
  "maxresdefault.jpg",
  "oardefault.jpg",
  "oar2.jpg",
  "sddefault.jpg",
  "hqdefault.jpg",
  "mqdefault.jpg",
];

function bumpThumb(img: HTMLImageElement, id: string) {
  const i = Number(img.dataset.thumbIdx ?? "0") + 1;
  if (i >= THUMB_ENDPOINTS.length) return;
  img.dataset.thumbIdx = String(i);
  img.src = `https://i.ytimg.com/vi/${id}/${THUMB_ENDPOINTS[i]}`;
}

type Props = {
  video: Video;
  index?: number;
  size?: "sm" | "md" | "lg";
};

export default function VideoCard({ video, index = 0, size = "md" }: Props) {
  const { open } = useVideoModal();

  // Preview no hover (mudo, em loop, sem controles — só pra dar "vida")
  const previewUrl = video.youtubeId
    ? `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=1&loop=1&controls=0&playlist=${video.youtubeId}&modestbranding=1&rel=0&playsinline=1&vq=hd1080`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onClick={() => open(video)}
      data-cursor="play"
      className="group relative cursor-pointer"
    >
      <div className="aspect-[9/16] relative overflow-hidden rounded-2xl bg-foreground">
        {/* Placeholder when no youtubeId */}
        {!video.youtubeId && (
          <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground-soft to-primary/30 flex items-center justify-center">
            <div className="text-background/40 text-center p-4">
              <Play className="w-10 h-10 mx-auto mb-2 opacity-60" />
              <div className="text-xs uppercase tracking-wider font-semibold">
                {video.brand}
              </div>
            </div>
          </div>
        )}

        {/* Real embed (loads on hover via iframe) */}
        {video.youtubeId && (
          <>
            <img
              src={`https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`}
              onError={(e) => bumpThumb(e.currentTarget, video.youtubeId!)}
              onLoad={(e) => {
                // YouTube devolve imagem 120x90 quando a thumbnail pedida não existe —
                // detectamos isso pra cair pro próximo fallback.
                if (e.currentTarget.naturalWidth <= 120) {
                  bumpThumb(e.currentTarget, video.youtubeId!);
                }
              }}
              alt={video.title}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:opacity-0 transition-opacity duration-500"
            />
            <iframe
              src={previewUrl!}
              className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-[1.4] pointer-events-none"
              allow="autoplay; encrypted-media"
              loading="lazy"
              tabIndex={-1}
            />
          </>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity" />

        {/* Top badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-foreground">
            {video.brand}
          </div>
          {video.views && (
            <div className="px-2.5 py-1 rounded-full bg-primary text-primary-light text-[10px] font-bold uppercase tracking-wider">
              {video.views} views
            </div>
          )}
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-3 left-3 right-3 text-background">
          <div className="font-display font-bold text-base md:text-lg leading-tight">
            {video.title}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-background/70 mt-1">
            {video.category}
          </div>
        </div>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center">
            <Play className="w-5 h-5 text-primary-light fill-primary-light ml-0.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
