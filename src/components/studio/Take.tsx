"use client";

import { TAKES } from "@/data/studio";
import { timecode } from "./StudioApp";

// Moldura de cada take: marcas de canto, claquete em mono com número, nome e
// o intervalo de timecode que ele ocupa na timeline.
export default function Take({ id, children, direita }: { id: string; children: React.ReactNode; direita?: React.ReactNode }) {
  const t = TAKES.find((k) => k.id === id)!;
  return (
    <section id={id} className="st-take">
      <div className="st-frame">
        <div className="st-canto" />
        <div className="st-slate">
          <span className="st-chip">Take {t.numero}</span>
          <span className="font-bold text-[var(--st-ink)]">{t.slate}</span>
          <span className="hidden sm:inline opacity-70">{timecode(t.inicio)} → {timecode(t.fim)}</span>
          <span className="ml-auto flex items-center gap-3">{direita ?? <><span className="st-rec" /> rec</>}</span>
        </div>
        {children}
      </div>
    </section>
  );
}
