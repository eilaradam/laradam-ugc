"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import type { Video } from "@/data/content";
import { useVideoModal } from "@/components/VideoModalProvider";

const THUMBS = ["maxresdefault.jpg", "oardefault.jpg", "oar2.jpg", "sddefault.jpg", "hqdefault.jpg", "mqdefault.jpg"];

// Clipe do bin: capa 9:16, prévia muda no hover, abre no player global ao clicar.
export default function ClipCard({ video }: { video: Video }) {
  const { open } = useVideoModal();
  const [idx, setIdx] = useState(0);
  const [preview, setPreview] = useState(false);
  const [pronto, setPronto] = useState(false);
  const id = video.youtubeId;
  const src = video.thumbnail ?? (id ? `https://i.ytimg.com/vi/${id}/${THUMBS[idx]}` : "");
  const proximo = () => { if (!video.thumbnail && idx < THUMBS.length - 1) setIdx(idx + 1); };

  return (
    <div className="st-clip-card" role="button" tabIndex={0} aria-label={`Assistir ${video.title} (${video.brand})`} onClick={() => open(video)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(video); } }} onMouseEnter={() => setPreview(true)} onFocus={() => setPreview(true)} data-cursor="play">
      <div className="thumb">
        {src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={video.title}
            loading="lazy"
            onError={proximo}
            onLoad={(e) => { if (!video.thumbnail && e.currentTarget.naturalWidth <= 120) proximo(); }}
          />
        )}
        {preview && id && (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&controls=0&playlist=${id}&modestbranding=1&rel=0&playsinline=1`}
            className={pronto ? "pronto" : ""}
            onLoad={() => setPronto(true)}
            allow="autoplay; encrypted-media"
            tabIndex={-1}
          />
        )}
        {video.views && <span className="views">{video.views} views</span>}
        <div className="play"><span><Play className="w-4 h-4 fill-white ml-0.5" /></span></div>
      </div>
      <div className="meta">
        <b>{video.brand}</b>
        <span className="opacity-60 flex-shrink-0">{video.category}</span>
      </div>
    </div>
  );
}
