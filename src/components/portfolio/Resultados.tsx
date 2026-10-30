"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { HIGHLIGHTS_BASE } from "@/components/BestResults";
import { useVideoModal } from "@/components/VideoModalProvider";
import { useT } from "@/lib/i18n";

// Os 4 vídeos que mais performaram, lado a lado (antes era um carrossel com os vizinhos borrados).
export default function Resultados() {
  const t = useT();
  const { open } = useVideoModal();
  const b = t.bestResults;

  return (
    <section id="destaques" className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-12 gap-6 md:gap-12 mb-10 md:mb-14 items-end">
        <div className="md:col-span-6">
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">{b.tag}</p>
          <h2 className="font-display font-black text-4xl md:text-6xl leading-[0.95] tracking-tighter text-foreground">
            {b.title1} <span className="font-serif-accent italic text-primary">{b.titleAccent}</span>
          </h2>
        </div>
        <p className="md:col-span-6 text-foreground-soft text-base leading-relaxed max-w-lg md:justify-self-end">
          {b.body1Pre}
          <strong className="text-foreground">{b.body1ViewsHi}</strong>
          {b.body1Mid}
          <strong className="text-foreground">{b.body1Cpa}</strong>
          {b.body1Mid2}
          <strong className="text-foreground">{b.body1Roas}</strong>
          {b.body1End}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {HIGHLIGHTS_BASE.map((h, i) => {
          const tx = b.highlights[i];
          const titulo = tx?.stats ? tx.metric : tx?.metric.replace(/^\+\s*/, "+");
          return (
            <motion.button
              key={h.youtubeId}
              type="button"
              data-track={`destaque_${h.brand}`}
              data-cursor="play"
              onClick={() =>
                open({ id: `highlight-${h.youtubeId}`, title: `Case ${h.brand}`, category: "tech", brand: h.brand, youtubeId: h.youtubeId })
              }
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group text-left"
            >
              <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-foreground">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={h.cover ?? `https://i.ytimg.com/vi/${h.youtubeId}/hqdefault.jpg`}
                  alt={`Case ${h.brand}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/95 text-[10px] font-bold uppercase tracking-wider text-foreground">
                  {h.brand}
                </span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-14 h-14 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-5 h-5 text-foreground fill-foreground ml-0.5" />
                  </span>
                </span>
              </div>
              <div className="mt-4">
                <div className="font-display font-black text-xl md:text-2xl text-foreground leading-tight">{titulo}</div>
                <div className="mt-1 text-sm text-muted">
                  {tx?.stats ? tx.stats.map((s) => `${s.value} ${s.label}`).join(" · ") : tx?.platform}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
