"use client";

import { motion } from "framer-motion";
import FundoTrocando, { type FotoFundo } from "@/components/heroes/FundoTrocando";
import { SITE } from "@/data/content";
import { useLang, useT } from "@/lib/i18n";
import { BotaoPilula, IconeInstagram, IconeTiktok, Risquinhos, SeloGirando } from "./pecas";

const MINIATURAS = ["/best-infinitepay.jpg", "/best-meliuz.jpg", "/best-bready.jpg", "/best-meliuz-cashback.jpg"];
const NICHOS = [
  { label: "Ads", laranja: false },
  { label: "E‑commerce", laranja: true },
  { label: "Publi post", laranja: false },
  { label: "Roteiro", laranja: true },
  { label: "Gestão", laranja: false },
];

const sobe = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
});

// Capa da versão laranja: nome à esquerda, as 4 fotos do ensaio trocando à direita
// num arco, com círculo laranja atrás, selo girando e etiquetas de nicho.
export default function HeroLaranja({ fundo }: { fundo: FotoFundo[] }) {
  const t = useT();
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section id="top" className="relative overflow-hidden bg-background pt-28 md:pt-32 pb-12 md:pb-16">

      <div className="relative max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-[1.05fr_1fr] gap-10 md:gap-8 items-center">
        {/* ESQUERDA: texto */}
        <div>
          <motion.div {...sobe(0)} className="inline-flex items-center gap-2 rounded-full bg-white border border-foreground/10 pl-1.5 pr-4 py-1.5 shadow-sm">
            <span className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </span>
            <span className="text-xs md:text-[13px] font-medium text-foreground/80">{t.hero.badge}</span>
          </motion.div>

          <motion.h1 {...sobe(0.1)} className="mt-6 font-display font-extrabold tracking-tight leading-[0.95] text-foreground text-[2.9rem] sm:text-6xl lg:text-[5.4rem]">
            {en ? "I'm" : "Oi, eu sou"}
            <br />
            <span className="relative inline-block text-primary">
              Lara Dam
              <Risquinhos className="absolute -right-7 md:-right-9 -top-2 md:-top-3 w-7 h-7 md:w-9 md:h-9 text-foreground" />
            </span>
          </motion.h1>

          <motion.p {...sobe(0.2)} className="mt-5 font-display font-semibold text-lg md:text-2xl text-foreground">
            {t.hero.title1} {t.hero.title2} <span className="underline decoration-primary decoration-4 underline-offset-4">{t.hero.titleAccent}</span>
          </motion.p>
          <motion.p {...sobe(0.25)} className="mt-2 text-foreground-soft text-sm md:text-base max-w-md">
            {t.hero.body1}
          </motion.p>

          <motion.div {...sobe(0.35)} className="mt-7 flex flex-wrap items-center gap-3">
            <BotaoPilula href="#categorias" track="hero_portfolio">{en ? "See my work" : "Ver portfólio"}</BotaoPilula>
            <BotaoPilula href="#contato" variante="contorno" track="hero_cta">{en ? "Hire me" : "Me contrata"}</BotaoPilula>
          </motion.div>

          <motion.div {...sobe(0.45)} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
            <div className="flex items-center gap-3">
              <div className="flex">
                {MINIATURAS.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={src} src={src} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-background" style={{ marginLeft: i ? -12 : 0 }} />
                ))}
              </div>
              <div className="leading-tight">
                <div className="font-display font-bold text-foreground">
                  <span className="text-primary">+300 {en ? "brands" : "marcas"}</span> · 140M+ views
                </div>
                <div className="text-xs text-foreground-soft">{en ? "+500 videos in 3 years" : "+500 vídeos em 3 anos"}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-foreground-soft mr-1">{en ? "Follow me" : "Me segue"}</span>
              <a href={`https://instagram.com/${SITE.instagram.replace("@", "")}`} target="_blank" rel="noreferrer" data-track="hero_instagram" aria-label="Instagram" className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-primary hover:text-primary-light transition-colors">
                <IconeInstagram className="w-4 h-4" />
              </a>
              <a href={`https://tiktok.com/${SITE.tiktok}`} target="_blank" rel="noreferrer" data-track="hero_tiktok" aria-label="TikTok" className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-primary hover:text-primary-light transition-colors">
                <IconeTiktok className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* DIREITA: foto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[360px] md:max-w-[430px]"
        >
          {/* círculo laranja atrás */}
          <div aria-hidden className="absolute -inset-x-6 top-[12%] aspect-square rounded-full bg-primary" />
          {/* arco com as fotos trocando */}
          <div className="relative aspect-[3/4] rounded-t-full rounded-b-[2rem] overflow-hidden border-[3px] border-foreground shadow-[10px_10px_0_0_var(--foreground)]">
            <FundoTrocando fotos={fundo} modo="bloco" />
          </div>

          <SeloGirando
            texto={en ? "HIRE ME · UGC CREATOR · " : "CONTRATE · UGC CREATOR · "}
            className="absolute z-10 -top-4 right-0 md:-top-2 md:-right-8"
          />

          {/* balão de prova */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 md:-left-16 top-[30%] rounded-2xl bg-white border-2 border-foreground px-4 py-3 shadow-[4px_4px_0_0_var(--foreground)] max-w-[190px]"
          >
            <div className="font-display text-3xl leading-none text-primary">“</div>
            <div className="text-[13px] font-semibold text-foreground leading-snug -mt-2">{t.hero.bubble2Title}</div>
            <div className="text-[11px] text-foreground-soft">{t.hero.bubble2Sub}</div>
          </motion.div>

          {/* etiquetas de nicho */}
          <div className="absolute right-0 md:-right-10 bottom-8 flex flex-col items-end gap-1.5">
            {NICHOS.map((n, i) => (
              <motion.span
                key={n.label}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.08 }}
                className={`rounded-full px-3 py-1 text-[11px] md:text-xs font-semibold border-2 border-foreground ${n.laranja ? "bg-primary text-primary-light" : "bg-foreground text-background"}`}
              >
                {n.label}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
