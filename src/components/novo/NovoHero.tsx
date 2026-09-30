"use client";

import { motion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { CAPA, CORES, FOTOS, NUMEROS, type CorTag } from "@/data/novo";
import { fmtBR, useLiveStats } from "./useLiveStats";

export default function NovoHero() {
  const stats = useLiveStats();

  return (
    <section id="top" className="relative bg-background noise pt-24 md:pt-28 pb-10 md:pb-14 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-10 md:gap-8 items-center">
        {/* ESQUERDA: texto + escolha de frente */}
        <div className="md:col-span-7 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border-2 border-foreground bg-background text-[11px] md:text-xs font-bold uppercase tracking-[0.15em] text-foreground">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Disponível pra 2026
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] md:text-xs uppercase tracking-[0.2em] text-foreground-soft font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              {CAPA.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-foreground leading-[0.92] tracking-tighter text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem]"
          >
            {CAPA.titulo1}
            <br />
            <span className="text-primary">{CAPA.titulo2}</span>
            <br />
            <span className="font-serif-accent italic font-medium">{CAPA.titulo3}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-6 text-foreground-soft text-base md:text-lg leading-relaxed max-w-xl"
          >
            {CAPA.corpo}
          </motion.p>

          {/* As duas frentes */}
          <div className="mt-7 grid sm:grid-cols-2 gap-4 md:gap-5 max-w-2xl">
            {CAPA.frentes.map((f, i) => {
              const c = CORES[f.cor as CorTag];
              return (
                <motion.a
                  key={f.href}
                  href={f.href}
                  data-track={`novo_capa_${f.href.replace("#", "")}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.6 }}
                  whileHover={{ y: -4 }}
                  className="group relative rounded-md border-2 border-foreground p-5 flex flex-col gap-2"
                  style={{ backgroundColor: c.bg, boxShadow: "7px 7px 0 0 var(--foreground)" }}
                >
                  <span className="text-3xl leading-none">{f.emoji}</span>
                  <span className="font-display font-black text-xl md:text-2xl tracking-tight text-foreground leading-tight">
                    {f.titulo}
                  </span>
                  <span className="text-sm text-foreground-soft leading-snug">{f.corpo}</span>
                  <span
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                    style={{ color: c.texto }}
                  >
                    {f.cta}
                    <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* DIREITA: foto do ensaio com etiquetas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 relative mx-auto w-full max-w-[420px] md:max-w-none"
        >
          <div
            className="relative aspect-[3/4] rounded-md border-2 border-foreground overflow-hidden bg-background-alt"
            style={{ boxShadow: "14px 14px 0 0 var(--primary)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FOTOS.capa}
              alt="Lara Dam segurando uma caixa de produto no estúdio"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "center 20%" }}
            />
          </div>

          {/* Etiqueta: views */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="absolute -left-3 md:-left-8 top-8 bg-background border-2 border-foreground rounded-md px-3.5 py-2.5 flex items-center gap-3"
            style={{ boxShadow: "5px 5px 0 0 var(--foreground)" }}
          >
            <span className="text-2xl">👀</span>
            <div className="leading-tight">
              <div className="font-display font-black text-lg text-foreground">100M+</div>
              <div className="text-[10px] uppercase tracking-wider text-foreground-soft font-semibold">views em campanhas</div>
            </div>
          </motion.div>

          {/* Etiqueta: seguidores ao vivo */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="absolute -right-3 md:-right-6 bottom-10 bg-foreground text-background border-2 border-foreground rounded-md px-3.5 py-2.5 flex items-center gap-3"
            style={{ boxShadow: "5px 5px 0 0 var(--accent-on-dark)" }}
          >
            <span className="text-2xl">📱</span>
            <div className="leading-tight">
              <div className="font-display font-black text-lg">{fmtBR(stats.followers)}</div>
              <div className="text-[10px] uppercase tracking-wider text-background/70 font-semibold">
                seguidores · @eilaradam
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Números macro */}
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 mt-12 md:mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 border-2 border-foreground rounded-md overflow-hidden bg-background" style={{ boxShadow: "8px 8px 0 0 var(--foreground)" }}>
          {NUMEROS.map((n, i) => (
            <div
              key={n.rotulo}
              className={`flex items-center gap-3 px-5 py-4 border-foreground ${i < 2 ? "border-b-2 md:border-b-0" : ""} ${i % 2 === 0 ? "border-r-2" : ""} md:border-r-2 md:last:border-r-0`}
            >
              <span className="text-2xl md:text-3xl">{n.emoji}</span>
              <div className="leading-tight">
                <div className="font-display font-black text-2xl md:text-3xl text-foreground tracking-tight">{n.valor}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider text-foreground-soft font-semibold">{n.rotulo}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
