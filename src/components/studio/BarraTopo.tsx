"use client";

import { Play } from "lucide-react";
import { PROJETO, TAKES } from "@/data/studio";
import { timecode, useStudio } from "./StudioApp";

export default function BarraTopo() {
  const { tempo, takeAtivo, tocando, irParaTake } = useStudio();
  return (
    <header className="st-topo">
      <div className="h-full max-w-[1400px] mx-auto px-4 md:px-6 flex items-center gap-3 md:gap-5">
        <button onClick={() => irParaTake("abertura")} className="flex items-center gap-2 flex-shrink-0">
          <span className="w-7 h-7 rounded-md flex items-center justify-center text-white" style={{ background: "var(--st-blue)", border: "2px solid var(--st-ink)" }}>
            <Play className="w-3.5 h-3.5 fill-white" />
          </span>
          <span className="st-display font-extrabold text-sm md:text-base tracking-tight">{PROJETO.app}</span>
        </button>

        <span className="hidden lg:inline st-mono text-[11px] text-[var(--st-ink-2)] opacity-80 truncate">{PROJETO.arquivo}</span>

        <nav className="hidden lg:flex items-center gap-1 ml-auto">
          {TAKES.map((t) => (
            <button
              key={t.id}
              onClick={() => irParaTake(t.id)}
              className={`st-topo-item hover:bg-[var(--st-blue-soft)] ${takeAtivo === t.id ? "ativo" : ""}`}
            >
              {t.numero} {t.titulo}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3 ml-auto lg:ml-2 flex-shrink-0">
          {tocando ? (
            <span className="st-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5" style={{ color: "var(--st-rec)" }}>
              <span className="st-rec" /> play
            </span>
          ) : (
            <span className="hidden sm:inline st-mono text-[10px] uppercase tracking-widest text-[var(--st-ink-2)] opacity-70">{PROJETO.versao}</span>
          )}
          <span className="st-timecode">{timecode(tempo, PROJETO.fps)}</span>
        </div>
      </div>
    </header>
  );
}
