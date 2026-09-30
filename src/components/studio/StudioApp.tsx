"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { DURACAO_TOTAL, TAKES } from "@/data/studio";
import Fundo from "./Fundo";
import BarraTopo from "./BarraTopo";
import Timeline from "./Timeline";
import TakeAbertura from "./TakeAbertura";
import TakeBin from "./TakeBin";
import TakeAudio from "./TakeAudio";
import TakeExportar from "./TakeExportar";
import TakeCreditos from "./TakeCreditos";
import TakeRenderizar from "./TakeRenderizar";

// Estado do estúdio: o tempo atual (derivado da rolagem), play/pause e o
// "pedido" (formatos e presets escolhidos, que vão pro formulário).
type Ctx = {
  tempo: number;          // segundos na timeline
  total: number;
  takeAtivo: string;
  tocando: boolean;
  irPara: (segundos: number) => void;
  irParaTake: (id: string) => void;
  togglePlay: () => void;
  pedido: string[];
  setPedido: (itens: string[]) => void;
  addPedido: (item: string) => void;
};

const StudioCtx = createContext<Ctx | null>(null);
export function useStudio() {
  const c = useContext(StudioCtx);
  if (!c) throw new Error("useStudio fora do StudioApp");
  return c;
}

// O tempo é o topo da tela: um take "começa" quando encosta no topo da página
// e o último take termina quando a rolagem chega no fim do documento.
const VELOCIDADE = 2; // segundos de timeline por segundo real quando está tocando

export default function StudioApp() {
  const [tempo, setTempo] = useState(0);
  const [tocando, setTocando] = useState(false);
  const [pedido, setPedidoState] = useState<string[]>([]);
  const tocandoRef = useRef(false);
  const ignorarScroll = useRef(false);

  // Mede onde cada take começa/termina no documento
  const medir = useCallback(() => {
    return TAKES.map((t) => {
      const el = document.getElementById(t.id);
      if (!el) return { ...t, top: 0, height: 1 };
      const r = el.getBoundingClientRect();
      return { ...t, top: r.top + window.scrollY, height: r.height };
    });
  }, []);

  // A "âncora" (ponto da página que o playhead representa) desliza do topo da
  // tela (rolagem 0) até o pé da tela (rolagem máxima). Assim o tempo começa em
  // 0 no topo do site e chega no total exatamente no fim, sem take perdido.
  const fatorAncora = () => {
    const fim = document.documentElement.scrollHeight - window.innerHeight;
    return fim > 0 ? 1 + window.innerHeight / fim : 1;
  };

  // rolagem -> tempo
  const calcularTempo = useCallback(() => {
    const y = window.scrollY * fatorAncora();
    const takes = medir();
    if (y <= takes[0].top) return 0;
    for (const t of takes) {
      if (y >= t.top && y < t.top + t.height) {
        const frac = (y - t.top) / t.height;
        return t.inicio + frac * (t.fim - t.inicio);
      }
    }
    return DURACAO_TOTAL;
  }, [medir]);

  // tempo -> rolagem
  const irPara = useCallback(
    (segundos: number) => {
      const s = Math.max(0, Math.min(DURACAO_TOTAL, segundos));
      const takes = medir();
      const t = takes.find((k) => s >= k.inicio && s < k.fim) ?? takes[takes.length - 1];
      const frac = (s - t.inicio) / (t.fim - t.inicio);
      const y = (t.top + frac * t.height) / fatorAncora();
      // "instant" ignora o scroll-behavior: smooth global do site
      window.scrollTo({ top: Math.max(0, y), behavior: "instant" as ScrollBehavior });
      setTempo(s);
    },
    [medir]
  );

  const irParaTake = useCallback(
    (id: string) => {
      const t = TAKES.find((k) => k.id === id);
      if (!t) return;
      tocandoRef.current = false;
      setTocando(false);
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 56;
      window.scrollTo({ top, behavior: "smooth" });
    },
    []
  );

  const togglePlay = useCallback(() => {
    tocandoRef.current = !tocandoRef.current;
    setTocando(tocandoRef.current);
  }, []);

  // acompanha a rolagem
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setTempo(calcularTempo());
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [calcularTempo]);

  // play: a timeline anda sozinha (e a página rola junto)
  useEffect(() => {
    if (!tocando) return;
    let raf = 0;
    let ultimo = performance.now();
    let atual = calcularTempo();
    const passo = (agora: number) => {
      if (!tocandoRef.current) return;
      const dt = Math.min(0.1, (agora - ultimo) / 1000);
      ultimo = agora;
      atual += dt * VELOCIDADE;
      const prox = atual;
      if (prox >= DURACAO_TOTAL) {
        irPara(DURACAO_TOTAL);
        tocandoRef.current = false;
        setTocando(false);
        return;
      }
      ignorarScroll.current = true;
      irPara(prox);
      raf = requestAnimationFrame(passo);
    };
    raf = requestAnimationFrame(passo);
    // qualquer gesto do usuário pausa
    const parar = () => {
      tocandoRef.current = false;
      setTocando(false);
    };
    window.addEventListener("wheel", parar, { passive: true });
    window.addEventListener("touchstart", parar, { passive: true });
    window.addEventListener("keydown", (e) => { if (e.key !== " ") parar(); });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", parar);
      window.removeEventListener("touchstart", parar);
    };
  }, [tocando, calcularTempo, irPara]);

  // barra de espaço = play/pause (fora de campos de texto)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const alvo = e.target as HTMLElement | null;
      if (alvo && (alvo.tagName === "INPUT" || alvo.tagName === "TEXTAREA")) return;
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [togglePlay]);

  const takeAtivo = useMemo(() => {
    const t = TAKES.find((k) => tempo >= k.inicio && tempo < k.fim);
    return (t ?? TAKES[TAKES.length - 1]).id;
  }, [tempo]);

  const setPedido = useCallback((itens: string[]) => setPedidoState(itens), []);
  const addPedido = useCallback((item: string) => {
    setPedidoState((p) => (p.includes(item) ? p : [...p, item]));
  }, []);

  const ctx: Ctx = { tempo, total: DURACAO_TOTAL, takeAtivo, tocando, irPara, irParaTake, togglePlay, pedido, setPedido, addPedido };

  return (
    <StudioCtx.Provider value={ctx}>
      <Fundo />
      <BarraTopo />
      <main className="relative z-[1]">
        <TakeAbertura />
        <TakeBin />
        <TakeAudio />
        <TakeExportar />
        <TakeCreditos />
        <TakeRenderizar />
      </main>
      <Timeline />
    </StudioCtx.Provider>
  );
}

// 00:01:23:12 (HH:MM:SS:FF a 30 fps)
export function timecode(segundos: number, fps = 30): string {
  const s = Math.max(0, segundos);
  const hh = Math.floor(s / 3600);
  const mm = Math.floor((s % 3600) / 60);
  const ss = Math.floor(s % 60);
  const ff = Math.floor((s - Math.floor(s)) * fps);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(hh)}:${p(mm)}:${p(ss)}:${p(ff)}`;
}
