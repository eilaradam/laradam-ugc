"use client";

import { VIDEOS } from "@/data/content";
import VideoCard from "./VideoCard";

export default function FeaturedVideos() {
  const featured = VIDEOS.filter((v) => v.featured);

  return (
    <section id="destaques" className="px-6 md:px-12 py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              Destaques
            </div>
            <h2 className="font-display font-black text-5xl md:text-7xl leading-[0.9] tracking-tighter">
              Os melhores{" "}
              <span className="font-serif-accent italic text-primary">
                resultados
              </span>
            </h2>
            <p className="mt-4 text-foreground-soft max-w-md">
              Conteúdos que estouraram — milhões de views, milhares de compras,
              marcas que viraram parceiras de longo prazo.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {featured.map((v, i) => (
            <VideoCard key={v.id} video={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
