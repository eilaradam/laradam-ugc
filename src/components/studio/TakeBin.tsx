"use client";

import { useState } from "react";
import { Bot, Smartphone, UtensilsCrossed, Sofa, Sparkles, Wallet, CupSoda, HeartPulse, Shirt, Plane, Star, Folder, Plus, type LucideIcon } from "lucide-react";
import { BRAND_LOGO_FILES, CATEGORIES, VIDEOS, type Video } from "@/data/content";
import { BIN } from "@/data/studio";
import Take from "./Take";
import ClipCard from "./ClipCard";
import { useStudio } from "./StudioApp";

const ICONE: Record<string, LucideIcon> = {
  ia: Bot, tech: Smartphone, gastronomia: UtensilsCrossed, casa: Sofa, beleza: Sparkles,
  financas: Wallet, food: CupSoda, saude: HeartPulse, moda: Shirt, viagem: Plane,
};

export default function TakeBin() {
  const { addPedido, irParaTake } = useStudio();
  const nichos = CATEGORIES.filter((c) => c.slug !== "all");
  const [pasta, setPasta] = useState("melhores");
  const [limite, setLimite] = useState(10);

  const lista: Video[] =
    pasta === "melhores"
      ? BIN.melhores.map((id) => VIDEOS.find((v) => v.id === id)).filter((v): v is Video => Boolean(v))
      : VIDEOS.filter((v) => v.category === pasta);
  const visiveis = lista.slice(0, limite);
  const nomePasta = pasta === "melhores" ? "Melhores" : nichos.find((n) => n.slug === pasta)?.name ?? "";

  return (
    <Take id="bin" direita={<span className="st-chip-claro st-chip">{VIDEOS.length} clipes</span>}>
      <div className="grid lg:grid-cols-12 gap-6 items-end mb-6">
        <div className="lg:col-span-7">
          <h2 className="st-display font-extrabold text-4xl md:text-6xl leading-[0.98] tracking-tight">{BIN.titulo}</h2>
          <p className="mt-3 text-[var(--st-ink-2)] text-base md:text-lg max-w-xl">{BIN.sub}</p>
        </div>
        <div className="lg:col-span-5 flex flex-wrap gap-2 lg:justify-end">
          {BIN.metadados.map((m) => (
            <span key={m.k} className="st-chip-claro st-chip text-[11px]">
              <span className="opacity-60">{m.k}</span> {m.v}
            </span>
          ))}
        </div>
      </div>

      {/* janela do bin */}
      <div className="st-painel">
        <div className="st-painel-topo">
          <span className="st-semaforo"><i /><i /><i /></span>
          <span className="font-bold">Bin</span>
          <span className="opacity-60">/ UGC pra marcas / {nomePasta}</span>
          <span className="ml-auto opacity-60">{lista.length} itens</span>
        </div>
        <div className="grid md:grid-cols-[210px_1fr]">
          {/* pastas */}
          <aside className="border-b-2 md:border-b-0 md:border-r-2 border-[var(--st-ink)] p-2 md:p-3 flex md:flex-col gap-1 overflow-x-auto st-esconde-barra">
            <button className={`st-pasta ${pasta === "melhores" ? "ativa" : ""}`} onClick={() => { setPasta("melhores"); setLimite(10); }}>
              <Star className="w-4 h-4 flex-shrink-0" /> Melhores <span className="qtd">{BIN.melhores.length}</span>
            </button>
            {nichos.map((n) => {
              const Icone = ICONE[n.slug] ?? Folder;
              return (
                <button key={n.slug} className={`st-pasta ${pasta === n.slug ? "ativa" : ""}`} onClick={() => { setPasta(n.slug); setLimite(10); }}>
                  <Icone className="w-4 h-4 flex-shrink-0" /> {n.name} <span className="qtd">{VIDEOS.filter((v) => v.category === n.slug).length}</span>
                </button>
              );
            })}
          </aside>

          {/* grade de clipes */}
          <div className="p-3 md:p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {visiveis.map((v) => <ClipCard key={v.id} video={v} />)}
            </div>
            {lista.length > limite && (
              <div className="mt-4 flex justify-center">
                <button className="st-botao st-botao-vazado" onClick={() => setLimite((l) => l + 10)}>
                  <Plus className="w-4 h-4" /> Carregar mais {Math.min(10, lista.length - limite)}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* presets (serviços) */}
      <div className="mt-10 grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <h3 className="st-display font-extrabold text-2xl md:text-3xl tracking-tight">{BIN.presetsTitulo}</h3>
          <p className="mt-2 text-[var(--st-ink-2)] text-sm md:text-base">{BIN.presetsSub}</p>
        </div>
        <div className="lg:col-span-8 st-painel">
          <div className="st-painel-topo"><span className="st-semaforo"><i /><i /><i /></span><span className="font-bold">Efeitos</span><span className="opacity-60">/ presets da Lara</span></div>
          <ul className="divide-y-2 divide-[var(--st-blue-line)]">
            {BIN.presets.map((p) => (
              <li key={p.id} className="flex items-center gap-3 md:gap-4 px-3 md:px-4 py-3">
                <span className="st-mono text-[10px] w-6 text-center opacity-60">fx</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm md:text-base">{p.nome}</span>
                    {p.tag && <span className="st-chip st-chip-azul text-[9px]">{p.tag}</span>}
                  </div>
                  <div className="text-[13px] text-[var(--st-ink-2)]">{p.desc}</div>
                </div>
                <button
                  className="st-botao st-botao-vazado !py-1.5 !px-3 text-xs flex-shrink-0"
                  onClick={() => { addPedido(p.nome); irParaTake("renderizar"); }}
                >
                  Aplicar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* marcas (plugins) */}
      <div className="mt-8">
        <div className="st-mono text-[10px] uppercase tracking-widest text-[var(--st-ink-2)] mb-3">{BIN.pluginsTitulo}</div>
        <div className="flex gap-2 overflow-x-auto st-esconde-barra pb-1">
          {BRAND_LOGO_FILES.map((f) => (
            <span key={f} className="flex-shrink-0 w-16 h-16 rounded-md border-2 border-[var(--st-ink)] bg-white p-1.5 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/logo-1/${encodeURI(f)}`} alt="Marca parceira" loading="lazy" className="max-w-full max-h-full object-contain" onError={(e) => { e.currentTarget.parentElement?.remove(); }} />
            </span>
          ))}
        </div>
      </div>
    </Take>
  );
}
