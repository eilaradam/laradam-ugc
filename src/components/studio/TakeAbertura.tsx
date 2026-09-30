"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { ABERTURA } from "@/data/studio";
import Take from "./Take";
import { timecode, useStudio } from "./StudioApp";

export default function TakeAbertura() {
  const { tempo, togglePlay, irParaTake, tocando } = useStudio();
  const [foco, setFoco] = useState({ x: 50, y: 42 });

  return (
    <Take id="abertura" direita={<span className="st-chip-claro st-chip">{ABERTURA.hudDir}</span>}>
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* monitor com viewfinder */}
        <div className="lg:col-span-7">
          <div
            className="st-monitor aspect-[4/5] sm:aspect-[16/11] lg:aspect-[16/10]"
            onPointerMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setFoco({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
            }}
            onPointerLeave={() => setFoco({ x: 50, y: 42 })}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ABERTURA.monitorFoto} alt="Lara Dam com celular e notebook no estúdio" style={{ objectPosition: "center 30%" }} />
            <div className="st-grade" />
            <div className="st-foco" style={{ left: `${foco.x}%`, top: `${foco.y}%` }}><i /></div>
            <div className="st-hud left-4 top-4 flex items-center gap-2">
              <span className="st-rec" /> {ABERTURA.hudEsq} {timecode(tempo).slice(3)}
            </div>
            <div className="st-hud right-4 top-4">{ABERTURA.hudDir}</div>
            <div className="st-hud right-4 top-10 opacity-80">▮▮▮▮ 96%</div>
            <div className="st-terco">
              <div className="st-terco-barra" />
              <div className="st-terco-caixa">
                <div className="st-display font-extrabold text-2xl md:text-3xl leading-none">{ABERTURA.tercoTitulo}</div>
                <div className="st-mono text-[10px] md:text-[11px] uppercase tracking-widest mt-1 opacity-85">{ABERTURA.tercoSub}</div>
              </div>
            </div>
          </div>
        </div>

        {/* claquete + pitch */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="st-claquete">
            <div className="st-claquete-listras" />
            <dl>
              {ABERTURA.claquete.map((c) => (
                <div key={c.k}>
                  <dt>{c.k}</dt>
                  <dd>{c.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <h1 className="st-display font-extrabold text-4xl md:text-5xl leading-[1.02] tracking-tight">
            {ABERTURA.pitch1} <span className="st-blue">{ABERTURA.pitch2}</span>
            <br />
            {ABERTURA.pitch3} <span className="st-blue">{ABERTURA.pitch4}</span>
          </h1>
          <p className="text-[var(--st-ink-2)] text-base leading-relaxed max-w-md">{ABERTURA.corpo}</p>

          <div className="flex flex-wrap gap-3">
            <button className="st-botao" onClick={togglePlay}>
              <Play className="w-4 h-4 fill-white" /> {tocando ? "Pausar" : ABERTURA.ctaPlay}
              <span className="st-mono text-[10px] opacity-70 ml-1 hidden sm:inline">[espaço]</span>
            </button>
            <button className="st-botao st-botao-vazado" onClick={() => irParaTake("bin")}>
              {ABERTURA.ctaBin}
            </button>
          </div>
        </div>
      </div>
    </Take>
  );
}
