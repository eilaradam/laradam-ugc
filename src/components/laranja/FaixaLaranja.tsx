"use client";

import { useT } from "@/lib/i18n";
import { Brilho } from "./pecas";

// Faixa preta rolando com as palavras-chave e estrelinhas laranja.
export default function FaixaLaranja() {
  const t = useT();
  const itens = [...t.marquee, ...t.marquee];
  return (
    <div className="relative z-10 bg-foreground text-background py-4 md:py-5 overflow-hidden border-y-4 border-primary">
      <div className="marquee !gap-8 md:!gap-10">
        {itens.map((item, i) => (
          <span key={i} className="flex items-center gap-8 md:gap-10 font-display font-bold text-xl md:text-3xl tracking-tight">
            {item}
            <Brilho className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}
