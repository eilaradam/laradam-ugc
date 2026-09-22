"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { proximaData, fraseContagem, type Contagem } from "@/data/datas";

/**
 * Faixa do topo do site, acima do menu. Mostra a contagem pra próxima data
 * comercial e troca sozinha quando a data passa. Some quando não tem data
 * chegando, e aí o menu volta a encostar no topo.
 *
 * As frases da data (recado + extras) correm na VERTICAL, uma de cada vez.
 * Data em destaque (Black Friday) ganha faixa mais alta, fundo preto e selo.
 *
 * O menu é `fixed top-0`, então a altura da faixa vira a variável CSS
 * --barra-topo, que o Nav e o <main> usam pra descer junto.
 */
const ALTURA = "2.5rem"; // 40px
const ALTURA_DESTAQUE = "3rem"; // 48px

/** Uma linha por vez, subindo. Reserva a largura da maior frase pra faixa não pular. */
function Ticker({
  linhas,
  intervalo = 2800,
  className = "",
}: {
  linhas: string[];
  intervalo?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const [anima, setAnima] = useState(true);

  useEffect(() => {
    setI(0);
    setAnima(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (linhas.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % linhas.length), intervalo);
    return () => clearInterval(t);
  }, [linhas, intervalo]);

  const maior = linhas.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className={`relative block overflow-hidden leading-5 ${className}`}>
      {/* invisível: só segura a largura e a altura */}
      <span className="invisible block whitespace-nowrap">{maior}</span>
      <AnimatePresence initial={false}>
        <motion.span
          key={i}
          initial={anima ? { y: "100%", opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          exit={anima ? { y: "-100%", opacity: 0 } : undefined}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 block whitespace-nowrap"
        >
          {linhas[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

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
    raiz.style.setProperty("--barra-topo", c ? (c.destaque ? ALTURA_DESTAQUE : ALTURA) : "0px");
    return () => raiz.style.setProperty("--barra-topo", "0px");
  }, [c]);

  if (!c) return null;

  const frase = fraseContagem(c);
  const selo = c.destaque ? c.nome.replace(/^[oa] /, "") : null;

  return (
    <a
      href="#contato"
      data-track="barra_topo_data"
      style={{ height: c.destaque ? ALTURA_DESTAQUE : ALTURA }}
      className={`group fixed top-0 left-0 right-0 z-[60] flex items-center justify-center gap-2 px-4 transition-colors ${
        c.destaque
          ? "bg-[#0B0F1A] text-background hover:bg-foreground md:gap-3"
          : "bg-foreground text-background hover:bg-primary"
      }`}
    >
      {selo ? (
        /* selo da data grande: teal claro sobre preto, regra dela de contraste */
        <span className="flex-shrink-0 rounded-full bg-accent-on-dark px-2 py-0.5 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.18em] text-foreground">
          {selo}
        </span>
      ) : (
        <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-background opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-background" />
        </span>
      )}

      {/* telona: contagem fixa + frases correndo ao lado */}
      <span
        className={`hidden sm:inline whitespace-nowrap font-semibold tracking-wide ${
          c.destaque ? "text-[13px] md:text-[15px]" : "text-[11px] md:text-[13px]"
        }`}
      >
        {frase}
      </span>
      <span className={`hidden sm:inline ${c.destaque ? "text-accent-on-dark/70" : "text-background/50"}`}>·</span>
      <Ticker
        linhas={c.linhas}
        className={`hidden sm:block ${
          c.destaque ? "text-[13px] md:text-[15px] text-background/85" : "text-[11px] md:text-[13px] text-background/70"
        }`}
      />

      {/* celular: tudo corre na vertical, contagem incluída */}
      <Ticker
        linhas={[frase, ...c.linhas]}
        className={`sm:hidden font-semibold ${c.destaque ? "text-[12px]" : "text-[11px]"}`}
      />

      <span
        className={`flex-shrink-0 transition-transform group-hover:translate-x-0.5 ${
          c.destaque ? "text-accent-on-dark" : ""
        }`}
      >
        {c.destaque ? <span className="hidden md:inline text-[12px] font-semibold mr-1">reservar agenda</span> : null}→
      </span>
    </a>
  );
}
