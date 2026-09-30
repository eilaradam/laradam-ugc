"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CATEGORIES, VIDEOS, type Video } from "@/data/content";
import { CORES, FOTOS, FRENTE_UGC, type CorTag } from "@/data/novo";
import VideoCard from "@/components/VideoCard";
import { Botao, Etiqueta, Eyebrow, FotoDura, Titulo } from "./_ui";

const EMOJI_NICHO: Record<string, string> = {
  ia: "🤖", tech: "📱", gastronomia: "🍝", casa: "🛋️", beleza: "💄",
  financas: "💸", food: "🍹", saude: "🏃‍♀️", moda: "👗", viagem: "✈️",
};
const COR_NICHO: CorTag[] = ["teal", "mostarda", "terracota", "oliva", "azul", "rosa"];

export default function FrenteUGC() {
  return (
    <section id="ugc" className="scroll-mt-20 bg-background">
      {/* Abertura da frente */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-14 md:pt-20 pb-10 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-4 order-2 md:order-1">
          <FotoDura
            src={FOTOS.ugcCaixas}
            alt="Lara Dam com os braços cheios de caixas de produto"
            posicao="center 30%"
            className="max-w-[360px] mx-auto md:mx-0"
          />
        </div>
        <div className="md:col-span-8 order-1 md:order-2">
          <Eyebrow>{FRENTE_UGC.eyebrow}</Eyebrow>
          <Titulo antes={FRENTE_UGC.titulo1} acento={FRENTE_UGC.tituloAcento} className="mt-5" />
          <p className="mt-5 text-foreground-soft text-base md:text-lg leading-relaxed max-w-2xl">{FRENTE_UGC.corpo}</p>
          <div className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-3">
            {FRENTE_UGC.numeros.map((n, i) => {
              const c = CORES[COR_NICHO[i % COR_NICHO.length]];
              return (
                <div
                  key={n.rotulo}
                  className="rounded-md border-2 border-foreground px-4 py-3"
                  style={{ backgroundColor: c.bg, boxShadow: "4px 4px 0 0 var(--foreground)" }}
                >
                  <div className="font-display font-black text-2xl md:text-3xl tracking-tight" style={{ color: c.texto }}>{n.valor}</div>
                  <div className="text-[10px] md:text-[11px] uppercase tracking-wider text-foreground-soft font-semibold leading-tight">{n.rotulo}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-7 flex flex-wrap gap-4">
            <Botao href="#contato" variante="teal" track="novo_ugc_cta">Quero UGC pra minha marca</Botao>
            <Botao href="#portfolio" variante="vazado">Ver os vídeos ↓</Botao>
          </div>
        </div>
      </div>

      <Feed />
      <Servicos />
      <Etapas />
    </section>
  );
}

// Portfólio com filtro por nicho (pílulas coloridas) + "ver mais"
function Feed() {
  const nichos = CATEGORIES.filter((c) => c.slug !== "all");
  const [ativo, setAtivo] = useState<string>("melhores");
  const [limite, setLimite] = useState(10);

  const lista: Video[] =
    ativo === "melhores"
      ? FRENTE_UGC.melhores.map((id) => VIDEOS.find((v) => v.id === id)).filter((v): v is Video => Boolean(v))
      : VIDEOS.filter((v) => v.category === ativo);
  const visiveis = lista.slice(0, limite);

  return (
    <div id="portfolio" className="scroll-mt-20 bg-background-alt border-y-2 border-foreground py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <Eyebrow>Portfólio</Eyebrow>
            <Titulo antes={FRENTE_UGC.feedTitulo} tamanho="text-3xl md:text-5xl" className="mt-4" />
          </div>
          <p className="text-foreground-soft text-sm md:text-base max-w-xs">{FRENTE_UGC.feedCorpo}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Pilula ativa={ativo === "melhores"} onClick={() => { setAtivo("melhores"); setLimite(10); }} cor="teal">
            ⭐ Melhores
          </Pilula>
          {nichos.map((n, i) => (
            <Pilula
              key={n.slug}
              ativa={ativo === n.slug}
              onClick={() => { setAtivo(n.slug); setLimite(10); }}
              cor={COR_NICHO[(i + 1) % COR_NICHO.length]}
            >
              {EMOJI_NICHO[n.slug] ?? "✦"} {n.name}
              <span className="ml-1 opacity-60">{VIDEOS.filter((v) => v.category === n.slug).length}</span>
            </Pilula>
          ))}
        </div>

        <motion.div
          key={ativo}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5"
        >
          {visiveis.map((v, i) => (
            <VideoCard key={v.id} video={v} index={i} />
          ))}
        </motion.div>

        {lista.length > limite && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setLimite((l) => l + 10)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm md:text-base font-bold border-2 border-foreground text-foreground bg-background transition-transform hover:-translate-y-0.5"
              style={{ boxShadow: "5px 5px 0 0 var(--foreground)" }}
            >
              Ver mais {Math.min(10, lista.length - limite)} vídeos ↓
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Pilula({ ativa, onClick, cor, children }: { ativa: boolean; onClick: () => void; cor: CorTag; children: React.ReactNode }) {
  const c = CORES[cor];
  return (
    <button
      onClick={onClick}
      className="px-3.5 py-1.5 rounded-md border-2 text-xs md:text-sm font-bold transition-transform hover:-translate-y-0.5"
      style={
        ativa
          ? { backgroundColor: "var(--foreground)", color: "#fff", borderColor: "var(--foreground)", boxShadow: `4px 4px 0 0 ${c.forte}` }
          : { backgroundColor: c.bg, color: c.texto, borderColor: "var(--foreground)", boxShadow: "3px 3px 0 0 var(--foreground)" }
      }
    >
      {children}
    </button>
  );
}

function Servicos() {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 md:py-20">
      <Eyebrow>Serviços</Eyebrow>
      <Titulo antes={FRENTE_UGC.servicosTitulo1} acento={FRENTE_UGC.servicosAcento} tamanho="text-3xl md:text-5xl" className="mt-4" />
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FRENTE_UGC.servicos.map((s, i) => {
          const c = CORES[s.cor];
          return (
            <motion.a
              key={s.titulo}
              href="#contato"
              data-track={`novo_servico_${i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="relative rounded-md border-2 border-foreground p-5 md:p-6 flex flex-col gap-3 bg-background"
              style={{ boxShadow: `7px 7px 0 0 ${c.forte}` }}
            >
              <div className="flex items-center justify-between">
                <span className="w-12 h-12 rounded-md border-2 border-foreground flex items-center justify-center text-2xl" style={{ backgroundColor: c.bg }}>
                  {s.emoji}
                </span>
                {s.tag && <Etiqueta cor={s.cor}>{s.tag}</Etiqueta>}
              </div>
              <div className="font-display font-black text-xl md:text-2xl tracking-tight text-foreground leading-tight">{s.titulo}</div>
              <p className="text-sm text-foreground-soft leading-snug">{s.corpo}</p>
              <span className="mt-auto text-xs font-bold uppercase tracking-wider" style={{ color: c.texto }}>
                Quero esse →
              </span>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}

function Etapas() {
  return (
    <div className="bg-background-alt border-t-2 border-foreground py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Eyebrow>Processo</Eyebrow>
        <Titulo antes={FRENTE_UGC.etapasTitulo1} acento={FRENTE_UGC.etapasAcento} tamanho="text-3xl md:text-5xl" className="mt-4" />
        <div className="mt-10 grid md:grid-cols-3 gap-8 md:gap-6">
          {FRENTE_UGC.etapas.map((e, i) => {
            const c = CORES[e.cor];
            return (
              <motion.div
                key={e.numero}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col"
              >
                <FotoDura src={e.foto} alt={`Etapa ${e.numero}: ${e.titulo}`} aspecto="aspect-[4/5]" sombra={`8px 8px 0 0 ${c.forte}`} />
                <div className="mt-6 flex items-center gap-3">
                  <span className="font-display font-black text-3xl md:text-4xl tracking-tight" style={{ color: c.forte }}>{e.numero}</span>
                  <span className="font-display font-black text-2xl md:text-3xl tracking-tight text-foreground">{e.titulo}</span>
                </div>
                <p className="mt-2 text-sm md:text-base text-foreground-soft leading-relaxed">{e.corpo}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
