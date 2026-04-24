"use client";

import { useCallback, useMemo, useState } from "react";
import { BRAND_LOGO_FILES } from "@/data/content";

/**
 * Barra horizontal com scroll infinito das logos das marcas.
 * Cada círculo pega automaticamente a cor dominante da logo como fundo.
 */
export default function BrandsMarquee() {
  const doubled = useMemo(
    () => [...BRAND_LOGO_FILES, ...BRAND_LOGO_FILES],
    []
  );

  // Cache de cor por nome de arquivo (o mesmo arquivo aparece 2x no marquee)
  const [colorByFile, setColorByFile] = useState<Record<string, string>>({});

  const onExtract = useCallback((file: string, color: string) => {
    setColorByFile((prev) => (prev[file] ? prev : { ...prev, [file]: color }));
  }, []);

  return (
    <section className="py-6 md:py-8 overflow-hidden border-y border-foreground/10 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-6 md:mb-8">
        <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted font-medium flex items-center justify-center gap-3">
          <span className="h-px w-6 md:w-8 bg-foreground/20" />
          Marcas que confiam no meu trabalho
          <span className="h-px w-6 md:w-8 bg-foreground/20" />
        </div>
      </div>

      <div className="marquee-slow">
        {doubled.map((file, i) => (
          <LogoCircle
            key={`${file}-${i}`}
            file={file}
            background={colorByFile[file]}
            onExtract={onExtract}
          />
        ))}
      </div>
    </section>
  );
}

function LogoCircle({
  file,
  background,
  onExtract,
}: {
  file: string;
  background?: string;
  onExtract: (file: string, color: string) => void;
}) {
  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (background) return; // já extraído
    const color = extractDominantColor(e.currentTarget);
    if (color) onExtract(file, color);
  };

  return (
    <div
      className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full border border-foreground/10 p-3 flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all"
      style={{
        backgroundColor: background ?? "var(--background-alt, #e9e4db)",
      }}
    >
      <img
        src={`/logos/${encodeURI(file)}`}
        alt="Logo de marca parceira"
        loading="lazy"
        crossOrigin="anonymous"
        onLoad={handleLoad}
        className="max-w-full max-h-full object-contain"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
}

/**
 * Lê os pixels da logo num canvas, quantiza em buckets de 20/channel,
 * e retorna a MAIS FREQUENTE (pura "cor de fundo" do tile da logo).
 * Ignora só pixels transparentes e anti-aliasing de borda (semi-transparentes).
 */
function extractDominantColor(img: HTMLImageElement): string | null {
  try {
    const w = 48;
    const h = 48;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, w, h);
    const { data } = ctx.getImageData(0, 0, w, h);

    const buckets = new Map<string, { r: number; g: number; b: number; n: number }>();
    const step = 20;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      if (a < 200) continue; // transparente ou semi-transparente (aliasing)

      const qr = Math.round(r / step) * step;
      const qg = Math.round(g / step) * step;
      const qb = Math.round(b / step) * step;
      const key = `${qr}-${qg}-${qb}`;
      const cur = buckets.get(key);
      if (cur) {
        cur.r += r;
        cur.g += g;
        cur.b += b;
        cur.n += 1;
      } else {
        buckets.set(key, { r, g, b, n: 1 });
      }
    }

    if (buckets.size === 0) return null;

    // Pega simplesmente o bucket com mais pixels — é a cor dominante do tile
    const top = Array.from(buckets.values()).sort((a, b) => b.n - a.n)[0];
    if (!top) return null;
    const r = Math.round(top.r / top.n);
    const g = Math.round(top.g / top.n);
    const b = Math.round(top.b / top.n);
    return `rgb(${r}, ${g}, ${b})`;
  } catch {
    return null;
  }
}
