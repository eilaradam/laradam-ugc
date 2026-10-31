// Peças visuais da versão laranja (creme + preto + laranja), reaproveitadas nas seções.

/** Estrela de 4 pontas usada na faixa e nos selos. */
export function Brilho({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" fill="currentColor" />
    </svg>
  );
}

/** Risquinhos de "brilho" no canto do título, como na referência. */
export function Risquinhos({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
      <path d="M4 14 9 12" />
      <path d="M8 6 11 10" />
      <path d="M16 3 15 9" />
    </svg>
  );
}

/** Etiqueta de seção: duas bolinhas (laranja + preta) e o nome. */
export function Etiqueta({ children, escuro = false }: { children: React.ReactNode; escuro?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 text-sm font-medium mb-3 ${escuro ? "text-background/80" : "text-foreground/80"}`}>
      <span className="flex">
        <span className={`w-3.5 h-3.5 rounded-full ${escuro ? "bg-background" : "bg-foreground"}`} />
        <span className="w-3.5 h-3.5 rounded-full bg-primary -ml-1.5" />
      </span>
      {children}
    </div>
  );
}

/** Botão pílula com a bolinha da seta, no estilo "Portfolio →". */
export function BotaoPilula({
  href,
  children,
  variante = "laranja",
  track,
}: {
  href: string;
  children: React.ReactNode;
  variante?: "laranja" | "contorno" | "escuro";
  track?: string;
}) {
  const cores = {
    laranja: "bg-primary text-foreground border-foreground",
    contorno: "bg-background text-foreground border-foreground",
    escuro: "bg-foreground text-background border-foreground",
  }[variante];
  const bolinha = variante === "escuro" ? "bg-primary text-foreground" : "bg-foreground text-background";
  return (
    <a
      href={href}
      data-track={track}
      className={`group inline-flex items-center gap-3 rounded-full border-2 pl-6 pr-1.5 py-1.5 text-sm md:text-base font-semibold whitespace-nowrap transition-transform hover:-translate-y-0.5 ${cores}`}
    >
      {children}
      <span className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-transform group-hover:rotate-[-45deg] ${bolinha}`}>
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </a>
  );
}

/** Selo redondo girando ("CONTRATE · UGC CREATOR ·"). Quem usa define a posição (absolute/relative). */
export function SeloGirando({ texto, className = "" }: { texto: string; className?: string }) {
  return (
    <div className={`w-24 h-24 md:w-28 md:h-28 rounded-full bg-foreground text-background ${className}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_14s_linear_infinite]" aria-hidden>
        <defs>
          <path id="selo-circulo" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
        </defs>
        <text fontSize="10.5" fontWeight="700" letterSpacing="2.2" fill="currentColor">
          <textPath href="#selo-circulo">{texto}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary text-foreground flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </span>
    </div>
  );
}

export function IconeInstagram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconeTiktok({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.8 5.8 0 1 0 4.9 5.7V9.1a7.4 7.4 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6Z" />
    </svg>
  );
}
