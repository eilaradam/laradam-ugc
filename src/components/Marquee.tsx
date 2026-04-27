"use client";

import { useT } from "@/lib/i18n";

export default function Marquee() {
  const t = useT();
  const doubled = [...t.marquee, ...t.marquee];
  return (
    <div className="relative z-30 -mt-2 md:-mt-3 bg-foreground text-background py-2.5 overflow-hidden border-y border-foreground/10">
      <div className="marquee">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display font-bold text-xs md:text-sm uppercase tracking-[0.15em] flex items-center gap-4"
          >
            {item}
            <span className="text-primary">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
