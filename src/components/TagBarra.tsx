"use client";

import { useEffect, useState } from "react";
import { proximaData, fraseContagem, type Contagem } from "@/data/datas";

/**
 * Faixa do topo do site, acima do menu. Mostra a contagem pra próxima data
 * comercial e troca sozinha quando a data passa. Some quando não tem data
 * chegando, e aí o menu volta a encostar no topo.
 *
 * O menu é `fixed top-0`, então a altura da faixa vira a variável CSS
 * --barra-topo, que o Nav e o <main> usam pra descer junto.
 */
const ALTURA = "2.5rem"; // 40px

export default function TagBarra() {
  const [c, setC] = useState<Contagem | null>(null);

  useEffect(() => {
    const atualiza = () => setC(proximaData());
    atualiza();
    // vira o dia sem precisar recarregar a página
    const t = setInterval(atualiza, 60 * 60 * 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const raiz = document.documentElement;
    raiz.style.setProperty("--barra-topo", c ? ALTURA : "0px");
    return () => raiz.style.setProperty("--barra-topo", "0px");
  }, [c]);

  if (!c) return null;

  return (
    <a
      href="#contato"
      data-track="barra_topo_data"
      style={{ height: ALTURA }}
      className="group fixed top-0 left-0 right-0 z-[60] flex items-center justify-center gap-2 bg-foreground px-4 text-background transition-colors hover:bg-primary"
    >
      <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-background opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-background" />
      </span>
      <span className="truncate text-[11px] md:text-[13px] font-semibold tracking-wide">
        {fraseContagem(c)}
      </span>
      <span className="hidden sm:inline truncate text-[11px] md:text-[13px] text-background/70">
        · {c.recado}
      </span>
      <span className="flex-shrink-0 transition-transform group-hover:translate-x-0.5">→</span>
    </a>
  );
}
