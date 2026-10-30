"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Heart, MessageCircle, MoreHorizontal, Music2, Pause, Play, RotateCcw, Send } from "lucide-react";
import { segundosDeFala, type RoteiroConteudo } from "@/lib/roteiro";

// Prévia de como o vídeo fica postado: Reels com a Lara recortada na frente
// (a "tela verde"), o que aparece na tela atrás e a legenda palavra por palavra.

const FUNDOS = [
  "linear-gradient(160deg,#2B1D6B 0%,#5B3DF5 55%,#B9A8FF 100%)",
  "linear-gradient(160deg,#0F3D2E 0%,#1F8A5B 60%,#BFF0D2 100%)",
  "linear-gradient(160deg,#4A1530 0%,#C2416B 55%,#FFC9D8 100%)",
  "linear-gradient(160deg,#3B2A12 0%,#C98A2B 55%,#FFE3B0 100%)",
  "linear-gradient(160deg,#10263F 0%,#2F6FB5 55%,#BBDDFF 100%)",
  "linear-gradient(160deg,#2A2A2A 0%,#6B6B6B 55%,#E7E7E7 100%)",
];

type Cena = { nome: string; tempo?: string; fala: string; tela?: string; mp4?: string; dur: number };

export default function Celular({ conteudo, gancho }: { conteudo: RoteiroConteudo; gancho: string }) {
  const cenas: Cena[] = useMemo(() => {
    const g = conteudo.ganchos.find((x) => x.id === gancho) ?? conteudo.ganchos[0];
    const lista = [
      ...(g ? [{ nome: `Gancho ${g.id}`, tempo: "0:00", fala: g.fala, tela: g.tela, mp4: g.exemplo?.mp4 }] : []),
      ...conteudo.partes.map((p) => ({ nome: p.nome, tempo: p.tempo, fala: p.fala, tela: p.tela, mp4: p.exemplo?.mp4 })),
    ];
    return lista.map((c) => ({ ...c, dur: segundosDeFala(c.fala) }));
  }, [conteudo, gancho]);

  const [pos, setPos] = useState({ idx: 0, t: 0 });
  const [tocando, setTocando] = useState(false);
  const [vel, setVel] = useState(1);
  const ultimo = useRef<number | null>(null);

  useEffect(() => {
    if (!tocando) {
      ultimo.current = null;
      return;
    }
    let raf = 0;
    const passo = (agora: number) => {
      const dt = ultimo.current == null ? 0 : (agora - ultimo.current) / 1000;
      ultimo.current = agora;
      const d = cenas.map((c) => c.dur);
      setPos((p) => {
        const t = p.t + dt * vel;
        if (t < d[p.idx]) return { idx: p.idx, t };
        if (p.idx < d.length - 1) return { idx: p.idx + 1, t: 0 };
        setTocando(false);
        return { idx: p.idx, t: d[p.idx] };
      });
      raf = requestAnimationFrame(passo);
    };
    raf = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(raf);
  }, [tocando, vel, cenas]);

  const idx = Math.min(pos.idx, cenas.length - 1);
  const t = pos.t;
  const cena = cenas[idx];

  if (!cena) return null;

  const palavras = cena.fala.replace(/^"|"$/g, "").split(/\s+/).filter(Boolean);
  const atual = Math.min(palavras.length - 1, Math.floor((t / cena.dur) * palavras.length));
  const bloco = Math.floor(atual / 5) * 5;
  const legenda = palavras.slice(bloco, bloco + 5);
  const final = idx === cenas.length - 1;
  const total = cenas.reduce((s, c) => s + c.dur, 0);
  const decorrido = cenas.slice(0, idx).reduce((s, c) => s + c.dur, 0) + t;

  function irPara(i: number) {
    setPos({ idx: i, t: 0 });
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[280px] rounded-[46px] bg-[#0B0B0F] p-[9px] shadow-[0_30px_80px_-30px_rgba(20,18,26,.55)]">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[38px] bg-black text-white">
          {/* fundo: o que aparece "na tela verde" */}
          <div className="absolute inset-0 transition-[background] duration-700" style={{ background: FUNDOS[idx % FUNDOS.length] }} />
          {cena.mp4 ? (
            <video key={cena.mp4} src={cena.mp4} autoPlay muted loop playsInline className="absolute inset-0 size-full object-cover" />
          ) : (
            cena.tela && (
              <div
                key={idx}
                className="rt-print absolute left-1/2 top-[13%] w-[78%] -translate-x-1/2 rotate-[-2.5deg] rounded-xl bg-white/95 p-3 text-[#14121A] shadow-2xl"
              >
                <p className="text-[8.5px] font-bold uppercase tracking-[.14em] text-[var(--rt-roxo)]">na tela</p>
                <p className="mt-1 text-[11px] font-medium leading-snug">{cena.tela}</p>
              </div>
            )
          )}

          {/* a Lara na frente */}
          <Image
            src="/lara-fundo.png"
            alt=""
            width={560}
            height={653}
            sizes="280px"
            className="pointer-events-none absolute bottom-0 left-1/2 w-[82%] max-w-none -translate-x-1/2 select-none"
          />
          <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

          {/* barrinhas de progresso */}
          <div className="absolute inset-x-3 top-3 flex gap-1">
            {cenas.map((c, i) => (
              <button key={i} onClick={() => irPara(i)} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30" aria-label={c.nome}>
                <span
                  className="block h-full bg-white"
                  style={{ width: i < idx ? "100%" : i === idx ? `${Math.min(100, (t / c.dur) * 100)}%` : "0%" }}
                />
              </button>
            ))}
          </div>
          <div className="absolute left-4 top-6 text-[15px] font-bold tracking-tight">Reels</div>

          {/* legenda */}
          <div className="absolute left-5 right-12 top-[46%] text-center">
            <p className="text-[17px] font-extrabold leading-[1.25] [text-shadow:0_2px_10px_rgba(0,0,0,.6)]">
              {legenda.map((p, i) => (
                <span
                  key={bloco + i}
                  className={`mx-[2px] inline-block rounded-md px-[3px] ${bloco + i === atual ? "bg-[#FFE14D] text-[#14121A]" : ""}`}
                >
                  {p}
                </span>
              ))}
            </p>
          </div>

          {/* lateral do Reels */}
          <div className="absolute bottom-24 right-2.5 flex flex-col items-center gap-3.5 text-[10px] font-semibold">
            <span className="flex flex-col items-center gap-0.5"><Heart size={22} />12,4 mil</span>
            <span className="flex flex-col items-center gap-0.5"><MessageCircle size={22} />318</span>
            <span className="flex flex-col items-center gap-0.5"><Send size={21} />2.051</span>
            <MoreHorizontal size={20} />
          </div>

          {/* rodapé */}
          <div className="absolute inset-x-3 bottom-3">
            <div className="flex items-center gap-2 text-[12px]">
              <Image src="/sobre-circle.png" alt="" width={28} height={28} className="size-7 rounded-full border border-white/70 object-cover" />
              <span className="font-bold">eilaradam</span>
              <span className="rounded-md border border-white/60 px-1.5 py-[1px] text-[10.5px] font-semibold">Seguir</span>
            </div>
            <p className="mt-1 text-[10.5px] opacity-85">Patrocinado · {conteudo.marca}</p>
            <div
              className={`mt-2 flex items-center justify-between rounded-lg px-3 py-2 text-[12px] font-bold transition-all duration-500 ${
                final ? "bg-[var(--rt-roxo)] text-white shadow-[0_0_0_4px_rgba(91,61,245,.35)]" : "bg-white/15 text-white backdrop-blur"
              }`}
            >
              {conteudo.cta ?? "Saiba mais"}
              <span>›</span>
            </div>
            <p className="mt-1.5 flex items-center gap-1 text-[9.5px] opacity-70">
              <Music2 size={10} /> Áudio original · eilaradam
            </p>
          </div>

          {!tocando && (
            <button onClick={() => setTocando(true)} className="absolute inset-0 grid place-items-center" aria-label="Tocar prévia">
              <span className="mt-[45%] grid size-16 place-items-center rounded-full bg-black/45 backdrop-blur">
                <Play size={28} fill="white" />
              </span>
            </button>
          )}
          {tocando && <button onClick={() => setTocando(false)} className="absolute inset-x-0 top-12 bottom-40" aria-label="Pausar" />}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[12px]">
        <button
          onClick={() => {
            if (!tocando && final && t >= cena.dur) irPara(0);
            setTocando((v) => !v);
          }}
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--rt-ink)] px-3.5 py-1.5 font-semibold text-white"
        >
          {tocando ? <Pause size={13} /> : <Play size={13} />}
          {tocando ? "Pausar" : "Tocar"}
        </button>
        <button onClick={() => irPara(0)} className="grid size-8 place-items-center rounded-full border border-[var(--rt-linha)] bg-white" aria-label="Recomeçar">
          <RotateCcw size={13} />
        </button>
        <button onClick={() => setVel((v) => (v === 1 ? 2 : 1))} className="rounded-full border border-[var(--rt-linha)] bg-white px-2.5 py-1.5 font-semibold">
          {vel}x
        </button>
        <span className="tabular-nums text-[var(--rt-muted)]">
          {mmss(decorrido)} / {mmss(total)}
        </span>
      </div>
      <p className="mt-2 text-center text-[12px] text-[var(--rt-muted)]">
        Agora: <b className="text-[var(--rt-ink)]">{cena.nome}</b>
      </p>
    </div>
  );
}

function mmss(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}
