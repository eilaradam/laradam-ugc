"use client";

import { BRANDS, type Brand } from "@/data/content";

/**
 * Barra horizontal com scroll infinito das logos das marcas.
 * Duplicamos o array pra a animação continuar sem cortar ao fim.
 */
export default function BrandsMarquee() {
  const doubled = [...BRANDS, ...BRANDS];

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
        {doubled.map((brand, i) => (
          <BrandLogo key={`${brand.name}-${i}`} brand={brand} />
        ))}
      </div>
    </section>
  );
}

function BrandLogo({ brand }: { brand: Brand }) {
  // Cascata de fontes: arquivo local → Clearbit → nome estilizado
  const localSrc = brand.logo ? `/logos/${brand.logo}` : null;
  const clearbitSrc = brand.domain
    ? `https://logo.clearbit.com/${brand.domain}?size=200`
    : null;

  return (
    <div
      className="flex-shrink-0 flex items-center justify-center h-12 md:h-16 px-6 md:px-10 opacity-60 hover:opacity-100 transition-opacity"
      title={brand.name}
    >
      {localSrc ? (
        <img
          src={localSrc}
          alt={brand.name}
          className="max-h-full max-w-[140px] md:max-w-[160px] object-contain grayscale hover:grayscale-0 transition-all"
          onError={(e) => {
            // Se não tem arquivo local, tenta Clearbit
            const img = e.currentTarget;
            if (clearbitSrc && img.src !== clearbitSrc) {
              img.src = clearbitSrc;
            } else {
              // Fallback final: esconde imagem e mostra o span de texto
              img.style.display = "none";
              const fallback = img.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = "inline";
            }
          }}
        />
      ) : null}
      <span
        className={`font-display font-bold text-base md:text-lg text-foreground/70 whitespace-nowrap ${
          localSrc ? "hidden" : ""
        }`}
      >
        {brand.name}
      </span>
    </div>
  );
}
