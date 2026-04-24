"use client";

import { BRAND_LOGO_FILES } from "@/data/content";

/**
 * Barra horizontal com scroll infinito das logos das marcas.
 * Duplicamos o array pra a animação continuar sem cortar ao fim.
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

      <div className="marquee">
        {doubled.map((file, i) => (
          <div
            key={`${file}-${i}`}
            className="flex-shrink-0 flex items-center justify-center h-14 md:h-20 px-6 md:px-10"
          >
            <img
              src={`/logos/${encodeURI(file)}`}
              alt="Logo de marca parceira"
              loading="lazy"
              className="max-h-full w-auto max-w-[140px] md:max-w-[180px] object-contain opacity-70 hover:opacity-100 transition-opacity"
              onError={(e) => {
                // Se o arquivo não existir, esconde pra não mostrar ícone quebrado
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
