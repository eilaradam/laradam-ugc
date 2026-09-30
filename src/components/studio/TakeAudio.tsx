"use client";

import { Headphones, Play } from "lucide-react";
import { TESTIMONIALS } from "@/data/content";
import { AUDIO } from "@/data/studio";
import { useVideoModal } from "@/components/VideoModalProvider";
import Take from "./Take";

// forma de onda determinística por índice
function Onda({ semente, suave = false }: { semente: number; suave?: boolean }) {
  const n = 46;
  return (
    <div className={`st-onda ${suave ? "suave" : ""}`}>
      {Array.from({ length: n }, (_, i) => {
        const v = Math.abs(Math.sin(i * 0.7 + semente) * 0.6 + Math.sin(i * 0.19 + semente * 2) * 0.4);
        return <i key={i} style={{ height: `${18 + v * 82}%` }} />;
      })}
    </div>
  );
}

export default function TakeAudio() {
  const { open } = useVideoModal();
  return (
    <Take id="audio" direita={<span className="st-chip-claro st-chip">{TESTIMONIALS.length + 1} clipes de áudio</span>}>
      <div className="mb-6">
        <h2 className="st-display font-extrabold text-4xl md:text-6xl leading-[0.98] tracking-tight">{AUDIO.titulo}</h2>
        <p className="mt-3 text-[var(--st-ink-2)] text-base md:text-lg max-w-xl">{AUDIO.sub}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {/* áudio de verdade */}
        <button
          onClick={() => open({ id: "audio-cliente", title: "Depoimento de cliente", category: "áudio", brand: "Cliente", youtubeId: AUDIO.audioReal.youtubeId, audioOnly: true })}
          className="st-painel text-left group"
          style={{ background: "var(--st-ink)", color: "#fff" }}
        >
          <div className="st-painel-topo" style={{ background: "var(--st-ink-2)", color: "#fff", borderColor: "#fff" }}>
            <span className="st-semaforo"><i style={{ background: "var(--st-rec)", opacity: 1 }} /><i style={{ background: "#fff" }} /><i style={{ background: "#fff" }} /></span>
            <span className="font-bold">A1.00</span>
            <span className="opacity-70">/ {AUDIO.audioReal.duracao}</span>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "var(--st-blue)" }}>
                <Play className="w-5 h-5 fill-white ml-0.5" />
              </span>
              <div>
                <div className="st-display font-bold text-lg leading-tight">{AUDIO.audioReal.rotulo}</div>
                <div className="st-mono text-[10px] uppercase tracking-widest opacity-70 mt-1 flex items-center gap-1.5"><Headphones className="w-3 h-3" /> toca no player</div>
              </div>
            </div>
            <Onda semente={0.3} />
          </div>
        </button>

        {TESTIMONIALS.map((t, i) => (
          <div key={t.brand} className="st-painel flex flex-col">
            <div className="st-painel-topo">
              <span className="st-semaforo"><i /><i /><i /></span>
              <span className="font-bold">A1.{String(i + 1).padStart(2, "0")}</span>
              <span className="opacity-60 truncate">/ {t.brand}</span>
              {t.instagram && (
                <a href={`https://instagram.com/${t.instagram}`} target="_blank" rel="noopener" className="ml-auto lowercase font-bold hover:underline">@{t.instagram}</a>
              )}
            </div>
            <div className="p-4 md:p-5 flex flex-col gap-3 flex-1">
              <Onda semente={i + 1} suave />
              <p className="text-sm leading-snug text-[var(--st-ink)] flex-1">“{t.quote}”</p>
              <div className="flex items-center justify-between gap-3 pt-3 border-t-2 border-[var(--st-blue-line)]">
                <span className="st-mono text-[10px] uppercase tracking-widest text-[var(--st-ink-2)]">{t.role}</span>
                {t.metric && (
                  <span className="text-right leading-tight">
                    <b className="st-display font-extrabold text-lg" style={{ color: "var(--st-blue)" }}>{t.metric.value}</b>
                    <span className="block st-mono text-[9px] uppercase tracking-wider text-[var(--st-ink-2)]">{t.metric.label}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Take>
  );
}
