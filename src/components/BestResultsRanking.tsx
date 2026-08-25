"use client";

import { Play } from "lucide-react";
import { useVideoModal } from "./VideoModalProvider";
import { useT } from "@/lib/i18n";

// OPÇÃO A — Ranking: vídeo pequeno + número GIGANTE numa lista editorial.
const HIGHLIGHTS = [
  { youtubeId: "5wf8Fv2CTa4", brand: "InfinitePay" },
  { youtubeId: "wesTfq67X9o", brand: "Méliuz" },
  { youtubeId: "2s6BI893C74", brand: "Bready" },
  { youtubeId: "dgQYEfEQTvQ", brand: "Méliuz Cashback" },
];

function StaticAudioPill() {
  const bars = [30, 55, 42, 70, 50, 85, 60, 40, 72, 48, 60, 38, 52, 78, 45, 66, 50, 40];
  return (
    <div className="w-full max-w-md flex items-center gap-3 p-3 md:p-4 bg-[#e9e4db] border border-foreground/5 rounded-3xl">
      <div className="w-11 h-11 rounded-full bg-foreground text-background flex items-center justify-center flex-shrink-0">
        <Play className="w-4 h-4 fill-current ml-0.5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-[2px] h-6">
          {bars.map((h, i) => (
            <span key={i} className={`flex-1 rounded-full ${i < 3 ? "bg-primary" : "bg-foreground/35"}`} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex justify-between mt-1.5 text-[10px] text-foreground/50 tabular-nums">
          <span>0:01</span>
          <span>13:52</span>
        </div>
      </div>
      <span className="text-[10px] font-semibold text-foreground/60 bg-background/60 rounded-full px-2 py-0.5 flex-shrink-0">1,5x</span>
    </div>
  );
}

export default function BestResultsRanking() {
  const t = useT();
  const { open } = useVideoModal();
  const items = HIGHLIGHTS.map((h, i) => ({ ...h, ...t.bestResults.highlights[i] }));

  return (
    <section id="destaques" className="px-6 md:px-12 py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            {t.bestResults.tag}
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl leading-[0.9] tracking-tighter text-foreground">
            {t.bestResults.title1}{" "}
            <span className="font-serif-accent italic text-primary">
              {t.bestResults.titleAccent}
            </span>
          </h2>
          <p className="mt-5 text-foreground-soft text-base md:text-lg">
            {t.bestResults.eyeline}
          </p>
          <div className="mt-8">
            <StaticAudioPill />
          </div>
        </div>

        {/* Ranking */}
        <div className="border-t border-foreground/12">
          {items.map((h) => {
            const head = h.metric?.split(" de ")[0] ?? "";
            const tail = h.metric?.includes(" de ")
              ? "de " + h.metric.split(" de ")[1]
              : "";
            return (
              <button
                key={h.brand}
                onClick={() =>
                  open({
                    id: `hl-${h.brand}`,
                    title: h.brand,
                    category: "financas",
                    brand: h.brand,
                    youtubeId: h.youtubeId,
                  })
                }
                data-cursor="play"
                className="group w-full grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] items-center gap-5 md:gap-8 border-b border-foreground/12 py-5 md:py-7 text-left"
              >
                {/* Vídeo pequeno */}
                <div className="relative w-16 md:w-[76px] aspect-[9/16] rounded-xl overflow-hidden bg-foreground flex-shrink-0">
                  <img
                    src={`https://i.ytimg.com/vi/${h.youtubeId}/hqdefault.jpg`}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                    <span className="w-8 h-8 rounded-full bg-primary/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-3.5 h-3.5 text-primary-light fill-primary-light ml-0.5" />
                    </span>
                  </div>
                </div>

                {/* Marca + número */}
                <div className="min-w-0">
                  <div className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-muted font-semibold mb-1.5">
                    {h.brand}
                  </div>
                  {h.stats ? (
                    <div className="flex flex-wrap items-baseline gap-x-8 gap-y-1">
                      {h.stats.map((s) => (
                        <span
                          key={s.label}
                          className="font-display font-black text-foreground text-2xl md:text-4xl tracking-tight tabular-nums leading-none"
                        >
                          {s.value}
                          <span className="ml-2 text-xs md:text-sm font-normal text-foreground-soft tracking-normal">
                            {s.label}
                          </span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="font-display font-black text-foreground text-3xl md:text-5xl tracking-tighter leading-none">
                      {head}
                      {(tail || h.platform) && (
                        <span className="ml-2.5 align-middle text-sm md:text-base font-normal text-foreground-soft tracking-normal">
                          {tail}
                          {tail && h.platform ? " · " : ""}
                          {h.platform}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Play */}
                <span className="hidden md:flex w-12 h-12 rounded-full border border-foreground/15 items-center justify-center text-foreground/45 group-hover:bg-primary group-hover:text-primary-light group-hover:border-primary transition-all">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
