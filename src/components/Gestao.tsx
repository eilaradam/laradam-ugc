"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Rocket,
} from "lucide-react";
import { BRAND_LOGO_FILES } from "@/data/content";
import { useT } from "@/lib/i18n";
import { useVideoModal } from "./VideoModalProvider";

/* ==========================================================================
   Paleta — fundo preto/branco, cores só em fontes, ícones e stickers
========================================================================== */
const PALETTE: React.CSSProperties = {
  ["--mm-blue" as string]: "#1028B0",
  ["--mm-blue-deep" as string]: "#081C7A",
  ["--mm-orange" as string]: "#FF5824",
  ["--mm-orange-deep" as string]: "#E0430F",
  ["--mm-pink" as string]: "#FFCFD2",
  ["--mm-pink-soft" as string]: "#FFE5E7",
};

/* ============================== STICKERS SVG ============================== */

function ChatBubbleSticker(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 140 100" fill="none" {...props}>
      <path
        d="M 40 10 Q 10 10 10 45 Q 10 75 35 77 L 20 92 L 48 78 L 110 78 Q 135 78 135 45 Q 135 10 105 10 Z"
        fill="#FF5824"
      />
      <circle cx="55" cy="44" r="8" fill="#FFCFD2" />
      <circle cx="77" cy="44" r="8" fill="#FFE5E7" />
      <circle cx="99" cy="44" r="8" fill="#FFF" />
      <circle cx="8" cy="96" r="3.5" fill="#FF5824" />
    </svg>
  );
}

function LoadingSticker(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" {...props}>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
        const x1 = 50 + Math.cos(angle) * 24;
        const y1 = 50 + Math.sin(angle) * 24;
        const x2 = 50 + Math.cos(angle) * 40;
        const y2 = 50 + Math.sin(angle) * 40;
        const shades = ["#081C7A", "#1028B0", "#3C50D8", "#7485E8", "#BCC4F0"];
        const fill = shades[i % shades.length];
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={fill}
            strokeWidth="7"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

function CursorSticker(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 100" fill="none" {...props}>
      <path
        d="M 10 10 L 10 80 L 25 68 L 35 92 L 50 86 L 40 64 L 62 60 Z"
        fill="#1028B0"
        stroke="#FFF"
        strokeWidth="6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CreatorStacked({ className }: { className?: string }) {
  return (
    <div
      className={`inline-flex flex-col items-start ${className ?? ""}`}
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="font-display font-black text-white uppercase text-2xl md:text-3xl leading-[0.85] tracking-tight -mt-1 first:mt-0"
          style={{
            background: "#FF5824",
            padding: "0.15em 0.55em 0.25em 0.55em",
            borderRadius: "0.55em",
            boxShadow: "0 0 0 3px white, 0 0 0 6px #FF5824",
            transform: `translateX(${i * 6}px) rotate(${i === 1 ? -2 : 0}deg)`,
          }}
        >
          Creator
        </span>
      ))}
    </div>
  );
}

function MMPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs md:text-sm font-bold uppercase tracking-wider bg-[var(--mm-pink)] text-[var(--mm-orange)]">
      {children}
    </span>
  );
}

/* =============================== 1. HERO =============================== */
function Hero() {
  const t = useT();
  return (
    <section className="relative overflow-hidden bg-[#FAF8F4] text-black pt-24 md:pt-28 pb-0">
      {/* Grid quadriculado fininho */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Glow laranja sutil atrás do conteúdo (estilo da referência) */}
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(255,88,36,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-6 md:gap-4 items-end pt-2 md:pt-4">
        {/* Esquerda */}
        <div className="md:col-span-7 lg:col-span-7 relative pb-8 md:pb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2.5 mb-4 md:mb-5"
          >
            <div className="w-2 h-2 rounded-full bg-[var(--mm-orange)] animate-pulse" />
            <span className="font-display font-black text-black text-xs md:text-sm tracking-widest uppercase">
              {t.gestao.hero.tag.split(".")[0]}<span className="text-[var(--mm-orange)]">.</span>{t.gestao.hero.tag.split(".")[1]}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-black text-3xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tighter uppercase"
          >
            <span className="block text-[1.2em]">{t.gestao.hero.titleLine1}</span>
            <span className="block">{t.gestao.hero.titleLine2}</span>
          </motion.h1>

          {/* Linha complementar abaixo do título */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 md:mt-3 font-display font-bold text-[var(--mm-orange)] text-base md:text-lg lg:text-xl tracking-tight"
          >
            {t.gestao.hero.subtitle}
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-sm md:text-base max-w-xl leading-relaxed text-black/75"
          >
            {t.gestao.hero.body}{" "}
            <span className="text-black font-semibold">
              {t.gestao.hero.bodyBold}
            </span>
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-5"
          >
            <a
              href="#gestao-contato"
              className="inline-flex items-center gap-2 bg-[var(--mm-orange)] text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-[var(--mm-orange-deep)] transition-colors shadow-xl"
            >
              {t.gestao.hero.cta}
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <p className="mt-2 text-[11px] md:text-xs text-black/55">
              {t.gestao.hero.ctaSub}
            </p>
          </motion.div>

          {/* Prova social — discreta, info complementar numa linha só */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-6 flex flex-nowrap items-center gap-x-3 text-black/70 border-t border-black/10 pt-3 overflow-x-auto whitespace-nowrap"
          >
            <Stat value="+100" label={t.gestao.hero.stats.campanhas} small />
            <span className="text-black/20">|</span>
            <Stat value="+200" label={t.gestao.hero.stats.marcas} small />
            <span className="text-black/20">|</span>
            <Stat value="+1.200" label={t.gestao.hero.stats.creators} small />
          </motion.div>
        </div>

        {/* Direita: foto + stickers (centralizado verticalmente com o conteúdo esquerdo) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 lg:col-span-5 relative md:self-center md:mt-4"
        >
          <div className="relative aspect-[3/4] md:aspect-[4/5] w-full max-w-[260px] md:max-w-[320px] mx-auto md:ml-auto md:mr-0">
            <div
              className="absolute inset-x-3 inset-y-2 bg-white border border-black/5 rounded-[2rem] shadow-lg"
              aria-hidden
            />
            <img
              src="/lara-fundo.png"
              alt="Lara Dam"
              className="relative w-full h-full object-contain object-bottom drop-shadow-2xl"
              onError={(e) => {
                e.currentTarget.src = "/lara-sobre.jpg";
                e.currentTarget.className =
                  "relative w-full h-full object-cover rounded-[3rem]";
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 20 }}
              animate={{ opacity: 1, scale: 1, rotate: -10 }}
              transition={{ duration: 0.9, delay: 0.8 }}
              className="absolute -top-4 -left-4 md:-left-10 pointer-events-none scale-[0.6] md:scale-75 origin-top-left"
            >
              <CreatorStacked />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 8 }}
              transition={{ duration: 0.9, delay: 1.1 }}
              className="absolute top-8 -right-2 md:-right-6 w-20 md:w-24 pointer-events-none"
            >
              <ChatBubbleSticker className="w-full h-auto drop-shadow-lg" />
            </motion.div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-24 -left-2 md:-left-4 w-12 md:w-14 pointer-events-none drop-shadow-lg"
            >
              <LoadingSticker className="w-full h-auto" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 5 }}
              animate={{ opacity: 1, y: 0, rotate: -4 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="absolute bottom-6 -right-2 md:-right-8 pointer-events-none"
            >
              <MMPill>{t.gestao.hero.bubble}</MMPill>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Marquee de fechamento do hero */}
      <div className="relative mt-6 md:mt-10 bg-[var(--mm-orange)] py-3 md:py-4 overflow-hidden">
        <div className="marquee-slow">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 md:gap-5 text-xs md:text-sm uppercase tracking-[0.25em] font-bold text-white whitespace-nowrap"
            >
              <span>{t.gestao.marquee.item1}</span>
              <span className="text-white/70">✦</span>
              <span>{t.gestao.marquee.item2}</span>
              <span className="text-white/70">✦</span>
              <span>{t.gestao.marquee.item3}</span>
              <span className="text-white/70">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label, small }: { value: string; label: string; small?: boolean }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span
        className={`font-display font-black text-black tabular-nums ${
          small ? "text-sm md:text-base" : "text-xl md:text-2xl"
        }`}
      >
        {value}
      </span>
      <span
        className={`uppercase tracking-wider text-black/60 ${
          small ? "text-[9px] md:text-[10px]" : "text-[10px] md:text-xs"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/* =========================== 2. BRANDS LOGO BAR =========================== */
function BrandsLogoBar() {
  const LOGOS = BRAND_LOGO_FILES.slice(0, 12);
  const BRANDS_TEXT = [
    "OLX",
    "ZAP Imóveis",
    "Magalu",
    "Méliuz",
    "Porto Seguro",
    "Chilli Beans",
    "Bonduelle",
    "Bauducco",
    "Granado",
    "Lancôme",
    "Carolina Herrera",
    "Calvin Klein",
    "Jägermeister",
    "Bioderma",
    "Neutrogena",
    "YSL",
    "Wella",
    "Knorr",
    "Brinox",
    "Coza",
    "Mont Blanc",
    "Jean Paul Gaultier",
    "Sebastian",
    "Inglot",
    "Keune",
    "SPC",
    "Pura Vida",
    "Sofá na Caixa",
    "Mei Digital",
    "Mash",
    "Focus",
    "David Beckham",
  ];

  return (
    <section id="parceiros-gestao" className="bg-white py-12 md:py-16 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Grid de logos */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-10 items-center mb-10 md:mb-14">
          {LOGOS.map((file) => (
            <div
              key={file}
              className="flex items-center justify-center h-10 md:h-12"
            >
              <img
                src={`/logo-1/${encodeURI(file)}`}
                alt="Marca parceira"
                loading="lazy"
                className="max-h-full max-w-full object-contain hover:scale-110 transition-transform"
                onError={(e) => {
                  const p = e.currentTarget.parentElement;
                  if (p) p.remove();
                }}
              />
            </div>
          ))}
        </div>

        {/* Marquee de nomes */}
        <div className="overflow-hidden border-y border-black/10 py-4">
          <div className="marquee-slow">
            {BRANDS_TEXT.concat(BRANDS_TEXT).map((b, i) => (
              <div
                key={`${b}-${i}`}
                className="flex items-center gap-4 text-sm md:text-base font-semibold text-black whitespace-nowrap"
              >
                {b}
                <span className="text-[var(--mm-orange)]">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== 5. O QUE FAÇO ============================== */
function OQueFaço() {
  const t = useT();
  const ITENS = t.gestao.oQueFaco.items;
  const [active, setActive] = useState(0);
  const current = ITENS[active];

  // Auto-rotate enquanto o usuário não interage (a cada 5s)
  // Removemos auto-play pra dar controle total ao usuário — pode rolar e ler

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter text-black uppercase">
            {t.gestao.oQueFaco.title1}{" "}
            <span className="text-[var(--mm-orange)]">
              {t.gestao.oQueFaco.title2}
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-black/75 leading-relaxed">
            {t.gestao.oQueFaco.body}
          </p>
        </div>

        {/* Tabs horizontais (pills) */}
        <div className="mt-10 md:mt-14 flex flex-wrap justify-center gap-2 md:gap-2.5">
          {ITENS.map((it, i) => (
            <button
              key={it.titulo}
              onClick={() => setActive(i)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all ${
                active === i
                  ? "bg-black text-white scale-105"
                  : "bg-white border-2 border-black/10 text-black/70 hover:border-black/30"
              }`}
            >
              <span
                className={`text-[10px] md:text-xs ${
                  active === i ? "text-[var(--mm-orange)]" : "text-[var(--mm-orange)]"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {it.tagShort}
            </button>
          ))}
        </div>

        {/* Card grande com conteúdo do item ativo */}
        <div className="mt-8 md:mt-10 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.titulo}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid md:grid-cols-12 gap-6 md:gap-10 items-center rounded-3xl bg-black text-white p-6 md:p-12 min-h-[280px]"
            >
              {/* Número gigante da etapa */}
              <div className="md:col-span-4 flex items-center justify-center">
                <div className="font-display font-black text-[var(--mm-orange)] text-[7rem] md:text-[14rem] leading-none tabular-nums tracking-tighter select-none">
                  {String(active + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Texto */}
              <div className="md:col-span-8">
                <div className="text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--mm-orange)] font-bold mb-3">
                  {t.gestao.oQueFaco.etapa} {String(active + 1).padStart(2, "0")} {t.gestao.oQueFaco.de}{" "}
                  {String(ITENS.length).padStart(2, "0")}
                </div>
                <h3 className="font-display font-black text-2xl md:text-4xl tracking-tight uppercase mb-4 leading-tight">
                  {current.titulo}
                </h3>
                <p className="text-base md:text-lg text-white/85 leading-relaxed">
                  {current.texto}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Setas prev/next */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={() => setActive((i) => (i - 1 + ITENS.length) % ITENS.length)}
              aria-label="Anterior"
              className="w-10 h-10 rounded-full border-2 border-black/15 text-black flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"
            >
              <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18 L9 12 L15 6" />
              </svg>
            </button>
            <span className="text-xs md:text-sm font-bold text-black/60 tabular-nums px-2">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(ITENS.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => setActive((i) => (i + 1) % ITENS.length)}
              aria-label="Próximo"
              className="w-10 h-10 rounded-full border-2 border-black/15 text-black flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"
            >
              <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6 L15 12 L9 18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ 6. MODALIDADES ============================ */
function Modalidades() {
  const t = useT();
  // Primeiro card é o destaque (emphasis: true)
  const CARDS = t.gestao.modalidades.cards.map((c, i) => ({
    ...c,
    emphasis: i === 0,
  }));

  return (
    <section className="bg-white py-14 md:py-20 border-t border-black/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter text-black uppercase max-w-3xl">
          {t.gestao.modalidades.title1}{" "}
          <span className="text-[var(--mm-orange)]">{t.gestao.modalidades.title2}</span>
        </h2>

        <div className="mt-10 md:mt-14 grid md:grid-cols-3 gap-4 md:gap-5">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`rounded-2xl p-6 md:p-7 flex flex-col gap-5 ${
                c.emphasis
                  ? "bg-black text-white border-2 border-black"
                  : "bg-white text-black border-2 border-black/10"
              }`}
            >
              <div>
                {c.emphasis && (
                  <div className="inline-flex items-center gap-1 text-[10px] md:text-xs font-bold uppercase tracking-wider bg-[var(--mm-orange)] text-white px-2.5 py-1 rounded-full mb-3">
                    {t.gestao.modalidades.maisEscolhido}
                  </div>
                )}
                <h3 className="font-display font-black text-xl md:text-2xl tracking-tight uppercase mb-2">
                  {c.name}
                </h3>
                <p
                  className={`text-sm md:text-base leading-relaxed ${
                    c.emphasis ? "text-white/80" : "text-black/75"
                  }`}
                >
                  {c.pitch}
                </p>
              </div>

              <ul className="space-y-2.5">
                {c.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-sm leading-snug"
                  >
                    <CheckCircle2
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        c.emphasis
                          ? "text-[var(--mm-orange)]"
                          : "text-[var(--mm-orange)]"
                      }`}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div
                className={`pt-4 border-t ${
                  c.emphasis ? "border-white/15" : "border-black/10"
                }`}
              >
                <div
                  className={`text-[11px] md:text-xs uppercase tracking-wider font-bold mb-1.5 ${
                    c.emphasis ? "text-white/60" : "text-black/60"
                  }`}
                >
                  {t.gestao.modalidades.idealPara}
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    c.emphasis ? "text-white/85" : "text-black/80"
                  }`}
                >
                  {c.ideal}
                </p>
              </div>

              <a
                href="#gestao-contato"
                className={`mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-colors ${
                  c.emphasis
                    ? "bg-[var(--mm-orange)] text-white hover:bg-[var(--mm-orange-deep)]"
                    : "bg-black text-white hover:bg-neutral-800"
                }`}
              >
                {c.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== 7. PROCESSO ============================== */
function Processo() {
  const t = useT();
  const ETAPAS = t.gestao.processo.etapas;

  return (
    <section id="etapas-gestao" className="relative bg-white text-black py-14 md:py-20 overflow-hidden border-t border-black/10 scroll-mt-24">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="hidden md:block absolute top-16 right-12 w-12 opacity-80 pointer-events-none"
      >
        <LoadingSticker className="w-full h-auto" />
      </motion.div>

      <div className="relative max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter uppercase text-black">
          {t.gestao.processo.title1}{" "}
          <span className="text-[var(--mm-orange)]">{t.gestao.processo.title2}</span>
        </h2>
        <p className="mt-4 text-base md:text-lg text-black/75 max-w-2xl leading-relaxed">
          {t.gestao.processo.body}
        </p>

        <div className="mt-10 md:mt-14 relative">
          {/* linha vertical */}
          <div className="absolute left-5 md:left-7 top-2 bottom-2 w-px bg-black/15" />

          <div className="space-y-6 md:space-y-8">
            {ETAPAS.map((e, i) => (
              <motion.div
                key={e.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative pl-14 md:pl-20"
              >
                <div className="absolute left-0 top-0 w-10 h-10 md:w-14 md:h-14 rounded-full bg-[var(--mm-orange)] text-white flex items-center justify-center font-display font-black text-sm md:text-base shadow-lg">
                  {e.n}
                </div>
                <h3 className="font-display font-black text-lg md:text-xl tracking-tight uppercase mb-2 mt-1.5 md:mt-2.5 text-black">
                  {e.title}
                </h3>
                <p className="text-sm md:text-base text-black/75 leading-relaxed">
                  {e.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================= 8. CASES E VÍDEOS ========================= */
const GESTAO_VIDEOS: { youtubeId: string; brand: string }[] = [
  // Round 1: 1 de cada marca
  { youtubeId: "i62BOlzvQlo", brand: "Sebastian" },
  { youtubeId: "ukZSk1h_Y2Q", brand: "OLX" },
  { youtubeId: "9WjJTAbJsms", brand: "Frooty" },
  { youtubeId: "3qKBJccHlg8", brand: "Zap Imóveis" },
  { youtubeId: "H5nVICmwGog", brand: "Brinox" },
  { youtubeId: "15nOoGJ872g", brand: "Wella" },
  { youtubeId: "fDjZz6kMjMY", brand: "Trisanti" },
  { youtubeId: "sb9PHTUVBvc", brand: "Rap10" },
  { youtubeId: "ATz4wOA_mAc", brand: "Neutrogena" },
  { youtubeId: "ZnoQzWTTSHM", brand: "Automotivo" },
  // Round 2
  { youtubeId: "_76b4s5tOZQ", brand: "OLX" },
  { youtubeId: "ij5dOFY29ZI", brand: "Frooty" },
  { youtubeId: "pqUrs6-l8Lg", brand: "Zap Imóveis" },
  { youtubeId: "XhDRsx2Q2MM", brand: "Brinox" },
  { youtubeId: "SNAvEW9DO7M", brand: "Trisanti" },
  { youtubeId: "lvxaMi4GaVc", brand: "Rap10" },
  // Round 3
  { youtubeId: "Dc9D0nj7n3U", brand: "OLX" },
  { youtubeId: "q4RDtGGGcDc", brand: "Zap Imóveis" },
  // Round 4
  { youtubeId: "bg-wyhCzVkQ", brand: "OLX" },
  { youtubeId: "8y0eXGsfHv4", brand: "Zap Imóveis" },
];

function CasesEVideos() {
  const t = useT();
  const { open } = useVideoModal();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollByPage = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * dir, behavior: "smooth" });
  };

  return (
    <section
      id="cases-gestao"
      className="bg-white py-14 md:py-20 border-t border-black/10 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter text-black uppercase">
          {t.gestao.cases.title1}{" "}
          <span className="text-[var(--mm-orange)]">{t.gestao.cases.title2}</span>
        </h2>
        <p className="mt-4 text-base md:text-lg text-black/75 max-w-2xl leading-relaxed">
          {t.gestao.cases.subtitle}
        </p>

        {/* Carrossel com setas */}
        <div className="relative mt-10 md:mt-14">
          {/* Botão anterior */}
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => scrollByPage(-1)}
            disabled={!canPrev}
            className="absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black text-white shadow-lg flex items-center justify-center hover:bg-[var(--mm-orange)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Botão próximo */}
          <button
            type="button"
            aria-label="Próximo"
            onClick={() => scrollByPage(1)}
            disabled={!canNext}
            className="absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black text-white shadow-lg flex items-center justify-center hover:bg-[var(--mm-orange)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Trilho de cards (scroll só horizontal) */}
          <div
            ref={scrollerRef}
            className="flex gap-3 md:gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x scroll-smooth snap-x snap-mandatory scrollbar-hide px-2 py-3"
          >
            {GESTAO_VIDEOS.map((v, i) => {
              const hasVideo = !!v.youtubeId;
              const Cmp = hasVideo ? motion.button : motion.div;
              return (
                <Cmp
                  key={i}
                  {...(hasVideo
                    ? {
                        onClick: () =>
                          open({
                            id: `gestao-${i}`,
                            youtubeId: v.youtubeId,
                            title: v.brand,
                            brand: v.brand,
                            category: "gestao",
                          }),
                        "data-cursor": "play",
                      }
                    : {})}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`flex-shrink-0 snap-start w-[48%] sm:w-[32%] md:w-[24%] lg:w-[19%] aspect-[9/16] rounded-xl overflow-hidden transition-transform duration-300 ${
                    hasVideo ? "bg-black cursor-pointer group relative hover:scale-[1.04] hover:shadow-2xl hover:z-10" : "bg-black/5 border-2 border-dashed border-black/15 flex items-center justify-center"
                  }`}
                >
                  {hasVideo ? (
                    <>
                      <img
                        src={`https://i.ytimg.com/vi/${v.youtubeId}/maxresdefault.jpg`}
                        alt={v.brand}
                        loading="lazy"
                        data-thumb-idx="0"
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          const FALLBACKS = ["sddefault.jpg", "hqdefault.jpg", "mqdefault.jpg"];
                          const idx = Number(e.currentTarget.dataset.thumbIdx ?? "0");
                          if (idx >= FALLBACKS.length) return;
                          e.currentTarget.dataset.thumbIdx = String(idx + 1);
                          e.currentTarget.src = `https://i.ytimg.com/vi/${v.youtubeId}/${FALLBACKS[idx]}`;
                        }}
                        onLoad={(e) => {
                          // YouTube devolve placeholder 120x90 quando endpoint não tem
                          if (e.currentTarget.naturalWidth > 120) return;
                          const FALLBACKS = ["sddefault.jpg", "hqdefault.jpg", "mqdefault.jpg"];
                          const idx = Number(e.currentTarget.dataset.thumbIdx ?? "0");
                          if (idx >= FALLBACKS.length) return;
                          e.currentTarget.dataset.thumbIdx = String(idx + 1);
                          e.currentTarget.src = `https://i.ytimg.com/vi/${v.youtubeId}/${FALLBACKS[idx]}`;
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                        <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-[var(--mm-orange)] flex items-center justify-center">
                          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4 fill-white ml-0.5">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 text-[10px] md:text-xs font-bold uppercase tracking-wider text-white drop-shadow-lg truncate">
                        {v.brand}
                      </div>
                    </>
                  ) : (
                    <div className="text-center px-3">
                      <div className="text-[10px] md:text-xs uppercase tracking-wider text-black/40 font-semibold">
                        {t.gestao.cases.emBreve}
                      </div>
                    </div>
                  )}
                </Cmp>
              );
            })}
          </div>
        </div>

        {/* Métricas — info complementar, centralizada e discreta */}
        <div className="mt-8 md:mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-black/10 pt-6 md:pt-8 text-black/70">
          {[
            { v: "+100", l: t.gestao.cases.stats.campanhas },
            { v: "+1.200", l: t.gestao.cases.stats.creators },
            { v: "+1.000", l: t.gestao.cases.stats.videos },
          ].map((m, i, arr) => (
            <div key={m.l} className="flex items-center gap-3">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display font-bold text-base md:text-lg tabular-nums text-black">
                  {m.v}
                </span>
                <span className="text-xs uppercase tracking-wider text-black/55">
                  {m.l}
                </span>
              </div>
              {i < arr.length - 1 && <span className="text-black/15 text-sm">|</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== 9. QUEM SOU ============================== */
function QuemSou() {
  const t = useT();
  // Renderiza **trecho** como <b>
  const renderBold = (text: string) =>
    text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <b key={i} className="text-black">{part.slice(2, -2)}</b>
      ) : (
        <span key={i}>{part}</span>
      )
    );

  return (
    <section className="bg-white text-black py-14 md:py-20 overflow-hidden border-t border-black/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-8 md:gap-12 items-center">
        <div className="md:col-span-7">
          <div className="text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--mm-orange)] font-bold mb-4">
            {t.gestao.quemSou.eyebrow}
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl leading-[0.95] tracking-tighter uppercase text-black">
            {t.gestao.quemSou.title}{" "}
            <span className="font-serif-accent italic text-[var(--mm-orange)] normal-case">
              {t.gestao.quemSou.titleAccent}
            </span>
          </h2>

          <div className="mt-8 space-y-5 text-base md:text-lg text-black/80 leading-relaxed">
            {t.gestao.quemSou.paragraphs.map((p, i) => (
              <p key={i} className={i === t.gestao.quemSou.paragraphs.length - 1 ? "font-semibold text-black" : ""}>
                {renderBold(p)}
              </p>
            ))}
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="relative aspect-[3/4] w-full max-w-sm mx-auto">
            <div
              className="absolute inset-x-3 inset-y-2 bg-[var(--mm-pink-soft)] rounded-[2.5rem]"
              aria-hidden
            />
            <img
              src="/lara-sobre.jpg"
              alt="Lara Dam"
              className="relative w-full h-full object-cover rounded-[2.5rem]"
            />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-3 -left-3 w-12 md:w-14 pointer-events-none"
            >
              <LoadingSticker className="w-full h-auto" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, rotate: 15 }}
              whileInView={{ opacity: 1, rotate: -8 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute -top-2 -right-2 w-20 md:w-24 pointer-events-none"
            >
              <ChatBubbleSticker className="w-full h-auto drop-shadow-lg" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================ 10. FAQ ================================ */
function FAQ() {
  const t = useT();
  const ITEMS = t.gestao.faq.items;

  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="duvidas-gestao" className="bg-white py-14 md:py-20 scroll-mt-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter text-black uppercase mb-10 md:mb-12">
          {t.gestao.faq.title1}{" "}
          <span className="text-[var(--mm-orange)]">{t.gestao.faq.title2}</span>
        </h2>

        <div className="space-y-3">
          {ITEMS.map((item, i) => {
            const isOpen = i === openIdx;
            return (
              <div
                key={item.q}
                className="rounded-2xl border-2 border-black/10 overflow-hidden bg-white"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-5 text-left"
                >
                  <span className="text-base md:text-lg font-semibold text-black leading-snug">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-black/50 flex-shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-5 text-sm md:text-base text-black/80 leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================== 11. CTA FINAL ============================== */
function CTAFinal() {
  const t = useT();
  return (
    <section className="bg-white text-black py-16 md:py-24 overflow-hidden border-t border-black/10">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter uppercase text-black">
          {t.gestao.ctaFinal.title1}{" "}
          <span className="text-[var(--mm-orange)]">
            {t.gestao.ctaFinal.title2}
          </span>
        </h2>

        <div className="mt-8 space-y-4 text-base md:text-lg text-black/80 leading-relaxed">
          {t.gestao.ctaFinal.paragraphs.map((p, i) => (
            <p key={i} className={i === t.gestao.ctaFinal.paragraphs.length - 1 ? "text-black font-semibold" : ""}>
              {p}
            </p>
          ))}
        </div>

        <a
          href="#gestao-contato"
          className="mt-10 inline-flex items-center gap-2 bg-[var(--mm-orange)] text-white px-7 py-4 rounded-full text-base md:text-lg font-bold uppercase tracking-wider hover:bg-[var(--mm-orange-deep)] transition-colors shadow-xl"
        >
          {t.gestao.ctaFinal.cta}
          <ArrowRight className="w-4 h-4" />
        </a>
        <p className="mt-3 text-xs md:text-sm text-black/60">
          {t.gestao.ctaFinal.ctaSub}
        </p>
      </div>
    </section>
  );
}

/* ============================ 12. CONTACT FORM ============================ */
function ContactForm() {
  const t = useT();
  const [step, setStep] = useState<1 | 2>(1);
  const [data, setData] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onChange = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch("/api/gestao-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSent(true);
    } catch {}
  };

  return (
    <section
      id="gestao-contato"
      className="relative bg-black text-white py-16 md:py-24 overflow-hidden border-t border-white/10 scroll-mt-24"
    >
      <motion.div
        initial={{ opacity: 0, rotate: 20 }}
        whileInView={{ opacity: 1, rotate: 10 }}
        viewport={{ once: true }}
        className="hidden md:block absolute top-20 left-10 w-28 pointer-events-none"
      >
        <ChatBubbleSticker className="w-full h-auto" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, rotate: -15 }}
        whileInView={{ opacity: 1, rotate: -10 }}
        viewport={{ once: true }}
        className="hidden md:block absolute bottom-20 right-10 w-24 pointer-events-none"
      >
        <ChatBubbleSticker className="w-full h-auto" />
      </motion.div>

      <div className="relative max-w-2xl mx-auto px-6 md:px-12">
        <div className="text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--mm-orange)] font-bold text-center mb-3">
          {t.gestao.contactForm.tag}
        </div>
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter text-center text-white uppercase">
          {t.gestao.contactForm.title1}{" "}
          <span className="text-[var(--mm-orange)]">{t.gestao.contactForm.title2}</span>
        </h2>
        <p className="mt-4 text-center text-white/75 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          {t.gestao.contactForm.subtitle}
        </p>

        {sent ? (
          <div className="mt-10 p-8 rounded-3xl bg-white/10 border border-white/15 text-center">
            <div className="text-4xl mb-4">{t.gestao.contactForm.successEmoji}</div>
            <div className="font-display font-black text-lg mb-2">
              {t.gestao.contactForm.successTitle}
            </div>
            <div className="text-white/70 text-sm md:text-base">
              {t.gestao.contactForm.successBody}
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-10 space-y-5">
            <div className="flex items-center gap-3 justify-center mb-6">
              <StepDot n={1} active={step >= 1} />
              <div className="h-px flex-1 max-w-[180px] bg-white/20" />
              <StepDot n={2} active={step >= 2} />
            </div>

            {step === 1 ? (
              <>
                <Field label={t.gestao.contactForm.labels.name} name="name" required onChange={onChange("name")} />
                <Field label={t.gestao.contactForm.labels.email} name="email" type="email" required onChange={onChange("email")} />
                <Field label={t.gestao.contactForm.labels.whatsapp} name="whatsapp" placeholder={t.gestao.contactForm.placeholders.whatsapp} onChange={onChange("whatsapp")} />
                <Field label={t.gestao.contactForm.labels.company} name="company" onChange={onChange("company")} />
                <Select
                  label={t.gestao.contactForm.labels.role}
                  name="role"
                  required
                  onChange={onChange("role")}
                  options={t.gestao.contactForm.options.roles}
                />
                <Field label={t.gestao.contactForm.labels.site} name="site" required onChange={onChange("site")} />
                <Select
                  label={t.gestao.contactForm.labels.modality}
                  name="modality"
                  required
                  onChange={onChange("modality")}
                  options={t.gestao.contactForm.options.modalities}
                />
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 bg-[var(--mm-orange)] text-white px-7 py-3 rounded-full text-sm md:text-base font-bold uppercase tracking-wider hover:bg-[var(--mm-orange-deep)] transition-colors"
                  >
                    {t.gestao.contactForm.next}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Select
                  label={t.gestao.contactForm.labels.goal}
                  name="goal"
                  required
                  onChange={onChange("goal")}
                  options={t.gestao.contactForm.options.goals}
                />
                <Select
                  label={t.gestao.contactForm.labels.budget}
                  name="budget"
                  required
                  onChange={onChange("budget")}
                  options={t.gestao.contactForm.options.budgets}
                />
                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-wider text-white/70 mb-2 font-semibold">
                    {t.gestao.contactForm.labels.message}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    onChange={(e) => setData((d) => ({ ...d, message: e.target.value }))}
                    className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--mm-orange)] transition-colors text-base leading-relaxed resize-none"
                    placeholder={t.gestao.contactForm.placeholders.message}
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs md:text-sm uppercase tracking-wider text-white/60 hover:text-white"
                  >
                    {t.gestao.contactForm.back}
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[var(--mm-orange)] text-white px-7 py-3 rounded-full text-sm md:text-base font-bold uppercase tracking-wider hover:bg-[var(--mm-orange-deep)] transition-colors"
                  >
                    {t.gestao.contactForm.submit}
                    <Rocket className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

function StepDot({ n, active }: { n: number; active: boolean }) {
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
        active
          ? "bg-[var(--mm-orange)] text-white border-[var(--mm-orange)]"
          : "bg-white/5 text-white/50 border-white/20"
      }`}
    >
      {n}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block text-xs md:text-sm uppercase tracking-wider text-white/70 mb-2 font-semibold">
        {label}
        {required && <span className="text-[var(--mm-orange)]"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--mm-orange)] transition-colors text-base"
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
  required,
  onChange,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <label className="block text-xs md:text-sm uppercase tracking-wider text-white/70 mb-2 font-semibold">
        {label}
        {required && <span className="text-[var(--mm-orange)]"> *</span>}
      </label>
      <select
        name={name}
        required={required}
        onChange={onChange}
        defaultValue=""
        className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-[var(--mm-orange)] transition-colors text-base appearance-none cursor-pointer"
      >
        <option value="" disabled>
          Selecione…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-black">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ================================ EXPORT ================================ */
export default function Gestao() {
  return (
    <div style={PALETTE}>
      <Hero />
      <CasesEVideos />
      <BrandsLogoBar />
      <Processo />
      <Modalidades />
      <QuemSou />
      <FAQ />
      <CTAFinal />
      <ContactForm />
    </div>
  );
}
