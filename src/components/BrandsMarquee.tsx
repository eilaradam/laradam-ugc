"use client";

import { BRAND_LOGO_FILES } from "@/data/content";

/**
 * Barra horizontal com scroll infinito das logos das marcas.
 * Cada logo dentro de um círculo (w/h iguais, rounded-full).
 */
export default function BrandsMarquee() {
  const doubled = [...BRAND_LOGO_FILES, ...BRAND_LOGO_FILES];

  return (
    <section className="py-10 md:py-14 overflow-hidden border-y border-foreground/10 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-6 md:mb-8">
        <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted font-medium flex items-center justify-center gap-3">
          <span className="h-px w-6 md:w-8 bg-foreground/20" />
          Marcas que confiam no meu trabalho
          <span className="h-px w-6 md:w-8 bg-foreground/20" />
        </div>
      </div>

      <div className="marquee-slow">
        {doubled.map((file, i) => (
          <div
            key={`${file}-${i}`}
            className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full bg-background-alt border border-foreground/10 p-3 flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all"
          >
            <img
              src={`/logos/${encodeURI(file)}`}
              alt="Logo de marca parceira"
              loading="lazy"
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
