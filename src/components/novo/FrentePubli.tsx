"use client";

import { motion } from "framer-motion";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { CORES, FOTOS, FRENTE_PUBLI, NOVO_SITE } from "@/data/novo";
import { Botao, Eyebrow, FotoDura, Titulo } from "./_ui";
import { fmtBR, fmtInteiro, useLiveStats } from "./useLiveStats";

export default function FrentePubli() {
  const stats = useLiveStats();
  const numeros = [
    { emoji: "👥", valor: fmtBR(stats.followers), rotulo: "seguidores", cor: "rosa" as const },
    { emoji: "📣", valor: fmtBR(stats.reach_month), rotulo: "contas alcançadas em 30 dias", cor: "mostarda" as const },
    { emoji: "🖼️", valor: String(stats.posts), rotulo: "posts no feed", cor: "azul" as const },
  ];

  return (
    <section id="publi" className="scroll-mt-20 bg-foreground text-background border-y-2 border-foreground">
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-14 md:pt-20 pb-14 md:pb-20 grid md:grid-cols-12 gap-10 md:gap-12 items-start">
        {/* ESQUERDA: texto + números ao vivo */}
        <div className="md:col-span-7">
          <Eyebrow claro>{FRENTE_PUBLI.eyebrow}</Eyebrow>
          <Titulo antes={FRENTE_PUBLI.titulo1} acento={FRENTE_PUBLI.tituloAcento} depois={FRENTE_PUBLI.titulo2} claro className="mt-5" />
          <p className="mt-5 text-background/75 text-base md:text-lg leading-relaxed max-w-2xl">{FRENTE_PUBLI.corpo}</p>

          <div className="mt-7 grid grid-cols-3 gap-3 md:gap-4">
            {numeros.map((n) => {
              const c = CORES[n.cor];
              return (
                <div
                  key={n.rotulo}
                  className="rounded-md border-2 border-background/80 px-3 md:px-4 py-3 md:py-4 bg-foreground"
                  style={{ boxShadow: `5px 5px 0 0 ${c.forte}` }}
                >
                  <div className="text-xl md:text-2xl">{n.emoji}</div>
                  <div className="font-display font-black text-2xl md:text-4xl tracking-tight mt-1" style={{ color: c.forte }}>{n.valor}</div>
                  <div className="text-[10px] md:text-[11px] uppercase tracking-wider text-background/70 font-semibold leading-tight mt-1">{n.rotulo}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 text-[11px] uppercase tracking-wider text-background/50 font-semibold flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${stats.live ? "bg-accent-on-dark animate-pulse" : "bg-background/40"}`} />
            {stats.live ? "Ao vivo, direto da API do Instagram" : "Última leitura da API do Instagram"}
          </div>

          {/* Formatos */}
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {FRENTE_PUBLI.formatos.map((f, i) => {
              const c = CORES[f.cor];
              return (
                <motion.div
                  key={f.titulo}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="rounded-md border-2 border-foreground p-4 md:p-5 flex items-start gap-4"
                  style={{ backgroundColor: c.bg, boxShadow: "5px 5px 0 0 var(--accent-on-dark)" }}
                >
                  <span className="text-3xl leading-none">{f.emoji}</span>
                  <div>
                    <div className="font-display font-black text-xl tracking-tight text-foreground">{f.titulo}</div>
                    <p className="text-sm text-foreground-soft leading-snug mt-1">{f.corpo}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Botao href="#contato" variante="claro" track="novo_publi_cta">{FRENTE_PUBLI.cta}</Botao>
            <a
              href={NOVO_SITE.instagramUrl}
              target="_blank"
              rel="noopener"
              data-track="novo_publi_instagram"
              className="inline-flex items-center gap-2 px-6 py-3 md:py-3.5 rounded-md border-2 border-background/60 text-sm md:text-base font-bold text-background hover:bg-background hover:text-foreground transition-colors"
            >
              Ver o @eilaradam ↗
            </a>
          </div>
        </div>

        {/* DIREITA: post de Instagram com a foto do ensaio + por quês */}
        <div className="md:col-span-5 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-[400px] w-full mx-auto bg-background text-foreground rounded-md border-2 border-foreground overflow-hidden"
            style={{ boxShadow: "12px 12px 0 0 var(--accent-on-dark)" }}
          >
            {/* cabeçalho do post */}
            <div className="flex items-center gap-3 px-4 py-3 border-b-2 border-foreground">
              <div className="w-9 h-9 rounded-full border-2 border-foreground overflow-hidden bg-background-alt">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={FOTOS.avatar} alt="" className="w-full h-full object-cover" style={{ objectPosition: "center 15%" }} />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-sm">{NOVO_SITE.instagram}</div>
                <div className="text-[11px] text-foreground-soft">{NOVO_SITE.local} · Publi</div>
              </div>
              <span className="ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-primary-light text-primary border border-primary/40">
                Parceria paga
              </span>
            </div>
            <div className="relative aspect-[4/5] bg-background-alt">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={FOTOS.publiJanela} alt="Lara Dam sentada na janela com a cidade ao fundo" loading="lazy" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 30%" }} />
            </div>
            <div className="px-4 py-3">
              <div className="flex items-center gap-4 text-foreground">
                <Heart className="w-6 h-6" />
                <MessageCircle className="w-6 h-6" />
                <Send className="w-6 h-6" />
                <Bookmark className="w-6 h-6 ml-auto" />
              </div>
              <div className="mt-2 text-sm font-bold">{fmtInteiro(stats.followers)} seguidores</div>
              <div className="text-sm leading-snug mt-1">
                <span className="font-bold">{NOVO_SITE.instagram}</span> a sua marca no meu feed, do jeito que a minha audiência já gosta de ver. 🫶
              </div>
              <div className="text-[11px] text-foreground-soft mt-2 uppercase tracking-wider">
                {fmtBR(stats.reach_month)} contas alcançadas nos últimos 30 dias
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-3">
            {FRENTE_PUBLI.porques.map((p) => (
              <div key={p.titulo} className="flex items-start gap-4 rounded-md border-2 border-background/25 p-4">
                <span className="text-2xl leading-none">{p.emoji}</span>
                <div>
                  <div className="font-display font-black text-lg tracking-tight">{p.titulo}</div>
                  <p className="text-sm text-background/70 leading-snug mt-0.5">{p.corpo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Faixa de fotos da frente publi */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 pb-14 md:pb-20 grid grid-cols-3 gap-4 md:gap-6">
        <FotoDura src={FOTOS.publiCidade} alt="Lara Dam na janela com a cidade" aspecto="aspect-[3/4]" sombra="8px 8px 0 0 var(--accent-on-dark)" borda="rgba(244,244,239,0.85)" posicao="center 25%" />
        <FotoDura src={FOTOS.publiNotebook} alt="Lara Dam com celular e notebook" aspecto="aspect-[3/4]" sombra="8px 8px 0 0 var(--accent-on-dark)" borda="rgba(244,244,239,0.85)" posicao="center 25%" />
        <FotoDura src={FOTOS.sobreSofa} alt="Lara Dam sentada no sofá do estúdio" aspecto="aspect-[3/4]" sombra="8px 8px 0 0 var(--accent-on-dark)" borda="rgba(244,244,239,0.85)" posicao="center 30%" />
      </div>
    </section>
  );
}
