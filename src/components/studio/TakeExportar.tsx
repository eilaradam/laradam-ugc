"use client";

import { useEffect, useState } from "react";
import { Bookmark, Check, Heart, MessageCircle, Send, Upload } from "lucide-react";
import { EXPORTAR } from "@/data/studio";
import Take from "./Take";
import { useStudio } from "./StudioApp";

const ENDPOINT = "https://mfrmnquvwwuxraqgemyh.supabase.co/functions/v1/ig-public-stats";

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(".", ",") + "M";
  if (n >= 10_000) return Math.round(n / 1000) + " mil";
  if (n >= 1_000) return (n / 1000).toFixed(1).replace(".", ",") + " mil";
  return String(n);
}

export default function TakeExportar() {
  const { setPedido, pedido, irParaTake } = useStudio();
  const [stats, setStats] = useState({ ...EXPORTAR.fallback, live: false });
  const [marcados, setMarcados] = useState<string[]>(EXPORTAR.formatos.filter((f) => f.padrao).map((f) => f.nome));

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(ENDPOINT, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => { if (typeof d?.followers === "number") setStats({ followers: d.followers, reach_month: d.reach_month, posts: d.posts, live: true }); })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  const toggle = (nome: string) => setMarcados((m) => (m.includes(nome) ? m.filter((x) => x !== nome) : [...m, nome]));

  const exportar = () => {
    const outros = pedido.filter((p) => !EXPORTAR.formatos.some((f) => f.nome === p));
    setPedido([...outros, ...marcados.map((m) => `Publi: ${m}`)]);
    irParaTake("renderizar");
  };

  const destino = [
    { k: "Seguidores", v: fmt(stats.followers) },
    { k: "Alcance 30d", v: fmt(stats.reach_month) },
    { k: "Posts", v: String(stats.posts) },
  ];

  return (
    <Take id="exportar" direita={<span className="st-chip st-chip-azul"><Upload className="w-3 h-3" /> {EXPORTAR.preset}</span>}>
      <div className="mb-6">
        <h2 className="st-display font-extrabold text-4xl md:text-6xl leading-[0.98] tracking-tight">{EXPORTAR.titulo}</h2>
        <p className="mt-3 text-[var(--st-ink-2)] text-base md:text-lg max-w-2xl">{EXPORTAR.sub}</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* diálogo de exportação */}
        <div className="lg:col-span-7 st-painel">
          <div className="st-painel-topo">
            <span className="st-semaforo"><i /><i /><i /></span>
            <span className="font-bold">Exportar</span>
            <span className="opacity-60">/ destino: @eilaradam</span>
            <span className={`ml-auto flex items-center gap-1.5 ${stats.live ? "" : "opacity-60"}`}>
              <span className={`w-2 h-2 rounded-full ${stats.live ? "bg-[var(--st-blue)] animate-pulse" : "bg-[var(--st-ink)]"}`} />
              {stats.live ? "ao vivo" : "última leitura"}
            </span>
          </div>

          <div className="p-4 md:p-5 grid gap-5">
            <div>
              <div className="st-mono text-[10px] uppercase tracking-widest text-[var(--st-ink-2)] mb-2">Destino</div>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                {destino.map((d) => (
                  <div key={d.k} className="rounded-md border-2 border-[var(--st-ink)] p-3" style={{ background: "var(--st-blue-soft)" }}>
                    <div className="st-display font-extrabold text-2xl md:text-3xl leading-none" style={{ color: "var(--st-blue)" }}>{d.v}</div>
                    <div className="st-mono text-[9px] md:text-[10px] uppercase tracking-widest mt-1.5 text-[var(--st-ink-2)]">{d.k}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="st-mono text-[10px] uppercase tracking-widest text-[var(--st-ink-2)] mb-2">Formatos</div>
              <div className="grid sm:grid-cols-2 gap-2 md:gap-3">
                {EXPORTAR.formatos.map((f) => {
                  const on = marcados.includes(f.nome);
                  return (
                    <div key={f.id} className={`st-check ${on ? "marcado" : ""}`} onClick={() => toggle(f.nome)} role="checkbox" aria-checked={on}>
                      <span className="caixa">{on && <Check className="w-4 h-4" strokeWidth={3} />}</span>
                      <span>
                        <span className="font-bold text-sm block">{f.nome}</span>
                        <span className="text-[13px] text-[var(--st-ink-2)] leading-snug block">{f.desc}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-2 md:gap-3">
              {EXPORTAR.porques.map((p) => (
                <div key={p.t} className="rounded-md border-2 border-[var(--st-blue-line)] p-3">
                  <div className="font-bold text-sm">{p.t}</div>
                  <div className="text-[13px] text-[var(--st-ink-2)] leading-snug mt-1">{p.d}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button className="st-botao" onClick={exportar} disabled={marcados.length === 0}>
                <Upload className="w-4 h-4" /> {EXPORTAR.cta}
                {marcados.length > 0 && <span className="st-mono text-[10px] opacity-80">({marcados.length})</span>}
              </button>
              <a href="https://instagram.com/eilaradam" target="_blank" rel="noopener" className="st-botao st-botao-vazado">Ver o @eilaradam ↗</a>
            </div>
          </div>
        </div>

        {/* prévia no celular */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="st-celular">
            <div className="entalhe" />
            <div className="tela">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={EXPORTAR.foto} alt="Prévia de reel com a Lara na janela" loading="lazy" style={{ objectPosition: "center 30%" }} />
              <div className="absolute inset-x-3 top-9 flex gap-1">
                {[1, 0.6, 0.3].map((w, i) => (
                  <span key={i} className="h-[3px] flex-1 rounded-full bg-white/40 overflow-hidden"><span className="block h-full bg-white" style={{ width: `${w * 100}%` }} /></span>
                ))}
              </div>
              <div className="absolute left-3 top-12 flex items-center gap-2 text-white">
                <span className="w-7 h-7 rounded-full border-2 border-white overflow-hidden bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/ensaio/cara-01.webp" alt="" style={{ objectPosition: "center 15%" }} />
                </span>
                <span className="text-xs font-bold drop-shadow">eilaradam</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/25 backdrop-blur">Parceria paga</span>
              </div>
              <div className="absolute right-3 bottom-16 flex flex-col items-center gap-4 text-white">
                <Heart className="w-6 h-6 drop-shadow" /><MessageCircle className="w-6 h-6 drop-shadow" /><Send className="w-6 h-6 drop-shadow" /><Bookmark className="w-6 h-6 drop-shadow" />
              </div>
              <div className="absolute left-3 right-14 bottom-5 text-white text-[11px] leading-snug drop-shadow">
                <b>eilaradam</b> {EXPORTAR.legenda}
                <div className="st-mono text-[9px] uppercase tracking-wider opacity-80 mt-1">{fmt(stats.reach_month)} contas alcançadas · 30 dias</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Take>
  );
}
