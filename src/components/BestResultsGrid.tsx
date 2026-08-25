"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useVideoModal } from "./VideoModalProvider";
import { useT } from "@/lib/i18n";

// OPÇÃO B — Quadro de honra: os 4 cases menores lado a lado, número forte
// embaixo de cada um. Sem carrossel, sem blur, tudo visível de uma vez.
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

export default function BestResultsGrid() {
  const t = useT();
  const { open } = useVideoModal();
  const items = HIGHLIGHTS.map((h, i) => ({ ...h, ...t.bestResults.highlights[i] }));

  return (
    <section id="destaques" className="px-6 md:px-12 py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 items-end mb-12 md:mb-16">
          <div>
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
            <p className="mt-5 text-foreground-soft text-base md:text-lg max-w-md">
              {t.bestResults.eyeline}
            </p>
          </div>
          <StaticAudioPill />
        </div>

        {/* Quadro de honra */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 md:gap-x-6 gap-y-10">
          {items.map((h, i) => {
            const head = h.metric?.split(" de ")[0] ?? "";
            const tail = h.metric?.includes(" de ")
              ? "de " + h.metric.split(" de ")[1]
              : "";
            return (
              <motion.button
                key={h.brand}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
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
                className="group text-left"
              >
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-3">
                  {h.brand}
                </div>
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-foreground">
                  <img
                    src={`https://i.ytimg.com/vi/${h.youtubeId}/maxresdefault.jpg`}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = `https://i.ytimg.com/vi/${h.youtubeId}/hqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <Play className="w-4 h-4 text-primary-light fill-primary-light ml-0.5" />
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  {h.stats ? (
                    <div className="space-y-1">
                      {h.stats.map((s) => (
                        <div key={s.label} className="flex items-baseline gap-2">
                          <span className="font-display font-black text-foreground text-xl md:text-2xl tracking-tight tabular-nums">
                            {s.value}
                          </span>
                          <span className="text-[11px] md:text-xs text-foreground-soft">
                            {s.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="font-display font-black text-foreground text-2xl md:text-3xl tracking-tight leading-none">
                        {head}
                      </div>
                      <div className="mt-1.5 text-xs md:text-sm text-foreground-soft">
                        {tail}
                        {tail && h.platform ? " · " : ""}
                        {h.platform}
                      </div>
                    </>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
