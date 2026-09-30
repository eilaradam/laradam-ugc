"use client";

import { CORES, type CorTag } from "@/data/novo";

// Peças visuais compartilhadas da página /novo: linguagem chapada e editorial
// (cor sólida, sombra dura sem desfoque, canto quase reto).

export function Eyebrow({ children, claro = false }: { children: React.ReactNode; claro?: boolean }) {
  return (
    <div
      className={`text-[11px] md:text-xs uppercase tracking-[0.28em] font-semibold flex items-center gap-3 ${
        claro ? "text-accent-on-dark" : "text-primary"
      }`}
    >
      <span className={`h-px w-8 ${claro ? "bg-accent-on-dark" : "bg-primary"}`} />
      {children}
    </div>
  );
}

// Foto com moldura navy e sombra dura deslocada
export function FotoDura({
  src,
  alt,
  className = "",
  posicao = "center",
  sombra = "10px 10px 0 0 var(--foreground)",
  aspecto = "aspect-[3/4]",
  borda = "var(--foreground)",
}: {
  src: string;
  alt: string;
  className?: string;
  posicao?: string;
  sombra?: string;
  aspecto?: string;
  borda?: string;
}) {
  return (
    <div
      className={`relative ${aspecto} overflow-hidden rounded-md border-2 bg-background-alt ${className}`}
      style={{ boxShadow: sombra, borderColor: borda }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: posicao }}
      />
    </div>
  );
}

// Etiqueta colorida (pílula) com a cor da categoria
export function Etiqueta({ cor, children, className = "" }: { cor: CorTag; children: React.ReactNode; className?: string }) {
  const c = CORES[cor];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${className}`}
      style={{ backgroundColor: c.bg, color: c.texto, borderColor: c.forte }}
    >
      {children}
    </span>
  );
}

// Botão principal (navy chapado, sombra dura)
export function Botao({
  href,
  children,
  variante = "navy",
  className = "",
  track,
}: {
  href: string;
  children: React.ReactNode;
  variante?: "navy" | "teal" | "vazado" | "claro";
  className?: string;
  track?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 md:px-7 py-3 md:py-3.5 rounded-md text-sm md:text-base font-bold border-2 transition-transform hover:-translate-y-0.5 active:translate-y-0";
  const estilos: Record<string, React.CSSProperties> = {
    navy: { backgroundColor: "var(--foreground)", color: "#fff", borderColor: "var(--foreground)", boxShadow: "5px 5px 0 0 var(--primary)" },
    teal: { backgroundColor: "var(--primary)", color: "#fff", borderColor: "var(--foreground)", boxShadow: "5px 5px 0 0 var(--foreground)" },
    vazado: { backgroundColor: "transparent", color: "var(--foreground)", borderColor: "var(--foreground)", boxShadow: "5px 5px 0 0 var(--foreground)" },
    claro: { backgroundColor: "var(--accent-on-dark)", color: "var(--foreground)", borderColor: "var(--accent-on-dark)", boxShadow: "5px 5px 0 0 rgba(255,255,255,0.35)" },
  };
  return (
    <a href={href} data-track={track} className={`${base} ${className}`} style={estilos[variante]}>
      {children}
    </a>
  );
}

// Título de seção (Newsreader preta, acento em itálico petróleo)
export function Titulo({
  antes,
  acento,
  depois,
  tamanho = "text-4xl md:text-6xl",
  claro = false,
  className = "",
}: {
  antes?: string;
  acento?: string;
  depois?: string;
  tamanho?: string;
  claro?: boolean;
  className?: string;
}) {
  return (
    <h2 className={`font-display font-black ${tamanho} leading-[0.95] tracking-tighter ${claro ? "text-background" : "text-foreground"} ${className}`}>
      {antes}{antes ? " " : ""}
      {acento && (
        <span className={`font-serif-accent italic ${claro ? "text-accent-on-dark" : "text-primary"}`}>{acento}</span>
      )}
      {depois ? " " : ""}{depois}
    </h2>
  );
}
