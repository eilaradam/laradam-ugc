"use client";

import { useEffect, useState } from "react";
import { proximaData, fraseContagem, type Contagem } from "@/data/datas";

/**
 * Tag do topo da capa. Mostra a contagem pra próxima data comercial
 * (Black Friday, Natal, Dia das Mães...) e troca sozinha quando a data passa.
 * Fora da janela das datas, cai na linha padrão que veio por prop.
 *
 * A conta roda no navegador de propósito: a página é estática, então se
 * fosse calculada no build a contagem congelaria no dia do deploy.
 */
export default function TagContagem({ padrao }: { padrao: string }) {
  const [c, setC] = useState<Contagem | null>(null);

  useEffect(() => {
    setC(proximaData());
    // vira o dia sem precisar recarregar (útil pra quem deixa a aba aberta)
    const t = setInterval(() => setC(proximaData()), 60 * 60 * 1000);
    return () => clearInterval(t);
  }, []);

  if (!c) {
    return (
      <div className="flex items-center justify-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-primary font-medium whitespace-nowrap">
        <span className="hidden sm:block h-px w-8 bg-primary" />
        {padrao}
        <span className="hidden sm:block h-px w-8 bg-primary" />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <a
        href="#contato"
        data-track="capa_tag_data"
        className="group inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-light px-3.5 py-1.5 md:px-4 md:py-2 transition-colors hover:border-primary/50"
      >
        <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
        </span>
        <span className="text-[11px] md:text-[13px] font-semibold text-primary">
          {fraseContagem(c)}
        </span>
        <span className="hidden sm:inline text-[11px] md:text-[13px] text-primary/70">
          · {c.recado}
        </span>
        <span className="text-primary transition-transform group-hover:translate-x-0.5">→</span>
      </a>
    </div>
  );
}
