"use client";

import { useMemo, useRef } from "react";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { DURACAO_TOTAL, TAKES } from "@/data/studio";
import { timecode, useStudio } from "./StudioApp";

// Timeline fixa no pé da tela. O playhead segue a rolagem; arrastar o playhead
// (ou clicar na régua) rola a página; clicar num clipe pula pro take.
export default function Timeline() {
  const { tempo, takeAtivo, tocando, irPara, irParaTake, togglePlay } = useStudio();
  const area = useRef<HTMLDivElement>(null);
  const arrastando = useRef(false);

  const pct = (s: number) => `${(s / DURACAO_TOTAL) * 100}%`;

  const tempoDoEvento = (e: React.PointerEvent) => {
    const el = area.current;
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(r.width, e.clientX - r.left));
    return (x / r.width) * DURACAO_TOTAL;
  };

  const onDown = (e: React.PointerEvent) => {
    arrastando.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    irPara(tempoDoEvento(e));
  };
  const onMove = (e: React.PointerEvent) => {
    if (!arrastando.current) return;
    irPara(tempoDoEvento(e));
  };
  const onUp = () => { arrastando.current = false; };

  // ticks da régua: a cada 6s, com número a cada 30s
  const ticks = useMemo(() => {
    const out: { s: number; grande: boolean }[] = [];
    for (let s = 0; s <= DURACAO_TOTAL; s += 6) out.push({ s, grande: s % 30 === 0 });
    return out;
  }, []);

  // forma de onda determinística pra trilha A1
  const onda = useMemo(() => {
    const n = 140;
    return Array.from({ length: n }, (_, i) => {
      const a = Math.abs(Math.sin(i * 0.9) * 0.6 + Math.sin(i * 0.23) * 0.4);
      return 0.15 + a * 0.85;
    });
  }, []);

  const idx = TAKES.findIndex((t) => t.id === takeAtivo);

  return (
    <div className="st-timeline">
      <div className="h-full max-w-[1400px] mx-auto px-3 md:px-6 flex items-stretch gap-3 md:gap-4">
        {/* transporte */}
        <div className="flex flex-col justify-center gap-2 flex-shrink-0 w-[92px] md:w-[150px]">
          <div className="st-transport">
            <button aria-label="Take anterior" onClick={() => irParaTake(TAKES[Math.max(0, idx - 1)].id)}><SkipBack className="w-4 h-4" /></button>
            <button aria-label={tocando ? "Pausar" : "Play"} className={tocando ? "ativo" : ""} onClick={togglePlay}>
              {tocando ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
            <button aria-label="Próximo take" className="hidden md:inline-flex" onClick={() => irParaTake(TAKES[Math.min(TAKES.length - 1, idx + 1)].id)}><SkipForward className="w-4 h-4" /></button>
          </div>
          <div className="st-mono text-[10px] md:text-[11px] font-bold tabular-nums text-[var(--st-ink)]">
            {timecode(tempo)} <span className="opacity-50 hidden md:inline">/ {timecode(DURACAO_TOTAL)}</span>
          </div>
        </div>

        {/* rótulos das trilhas */}
        <div className="flex flex-col flex-shrink-0 w-[30px]">
          <div className="h-[18px]" />
          <div className="st-trilha-rotulo">V1</div>
          <div className="st-trilha-rotulo st-trilha-rotulo-audio hidden md:flex">A1</div>
        </div>

        {/* trilhas */}
        <div
          ref={area}
          className="relative flex-1 min-w-0 select-none cursor-crosshair"
          role="slider"
          tabIndex={0}
          aria-label="Playhead da timeline"
          aria-valuemin={0}
          aria-valuemax={DURACAO_TOTAL}
          aria-valuenow={Math.round(tempo)}
          aria-valuetext={timecode(tempo)}
          onKeyDown={(e) => {
            const passo = e.shiftKey ? 30 : 6;
            if (e.key === "ArrowRight") { e.preventDefault(); irPara(tempo + passo); }
            else if (e.key === "ArrowLeft") { e.preventDefault(); irPara(tempo - passo); }
            else if (e.key === "Home") { e.preventDefault(); irPara(0); }
            else if (e.key === "End") { e.preventDefault(); irPara(DURACAO_TOTAL); }
          }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <div className="st-regua">
            {ticks.map((t) => (
              <div key={t.s} className={`st-tick ${t.grande ? "grande" : ""}`} style={{ left: pct(t.s) }}>
                {t.grande && <span className={t.s % 60 === 0 ? "" : "hidden md:inline"}>{timecode(t.s).slice(3, 8)}</span>}
              </div>
            ))}
          </div>

          {/* V1: os takes */}
          <div className="st-trilha">
            {TAKES.map((t) => (
              <div
                key={t.id}
                className={`st-clipe ${takeAtivo === t.id ? "ativo" : ""}`}
                style={{ left: `calc(${pct(t.inicio)} + 1px)`, width: `calc(${pct(t.fim - t.inicio)} - 3px)`, backgroundImage: `url(${t.foto})` }}
                role="button"
                tabIndex={0}
                aria-label={`Ir pro take ${t.numero}: ${t.titulo}`}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => irParaTake(t.id)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); irParaTake(t.id); } }}
                title={`${t.numero} · ${t.slate}`}
              >
                <span className="nome">{t.numero} {t.titulo}</span>
              </div>
            ))}
          </div>

          {/* A1: forma de onda */}
          <div className="st-trilha st-trilha-audio hidden md:block">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox={`0 0 ${onda.length} 20`}>
              {onda.map((v, i) => (
                <rect key={i} x={i + 0.15} y={10 - v * 9} width={0.7} height={v * 18} fill="var(--st-blue-mid)" />
              ))}
            </svg>
          </div>

          <div className="st-playhead" style={{ left: pct(tempo) }} />
        </div>
      </div>
    </div>
  );
}
