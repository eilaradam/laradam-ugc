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
  return (
    <section className="relative overflow-hidden bg-black text-white pt-20 md:pt-24 pb-0">
      {/* Pontilhado bg */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-8 md:gap-4 items-end pt-4 md:pt-8">
        {/* Esquerda */}
        <div className="md:col-span-7 lg:col-span-7 relative pb-12 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6 md:mb-8"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--mm-orange)] animate-pulse" />
            <span className="font-display font-black text-white text-sm md:text-base tracking-widest uppercase">
              laradam<span className="text-[var(--mm-orange)]">.</span>gestão
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-white text-3xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tighter uppercase"
          >
            Gestão de campanhas UGC
          </motion.h1>

          {/* Linha complementar abaixo do título */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 md:mt-4 font-display font-bold text-[var(--mm-orange)] text-xl md:text-2xl lg:text-3xl tracking-tight"
          >
            do briefing à entrega.
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-7 text-base md:text-lg max-w-xl leading-relaxed text-white/80"
          >
            Cuidamos de todo o processo pra sua empresa: seleção dos creators
            certos, briefing alinhado com seu posicionamento, roteiro
            revisado, produção acompanhada e entrega no prazo.{" "}
            <span className="text-white font-semibold">
              Você roda mídia. Nós rodamos a operação.
            </span>
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-8"
          >
            <a
              href="#gestao-contato"
              className="inline-flex items-center gap-2 bg-[var(--mm-orange)] text-white px-7 py-4 rounded-full text-base md:text-lg font-bold uppercase tracking-wider hover:bg-[var(--mm-orange-deep)] transition-colors shadow-xl"
            >
              Quero conversar sobre minha campanha
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="mt-3 text-xs md:text-sm text-white/60">
              Resposta em até 24h. Diagnóstico gratuito antes de qualquer
              proposta.
            </p>
          </motion.div>

          {/* Prova social */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-white/85 border-t border-white/10 pt-6"
          >
            <Stat value="+100" label="campanhas gerenciadas" />
            <div className="h-6 w-px bg-white/15" />
            <Stat value="+200" label="marcas atendidas" />
            <div className="h-6 w-px bg-white/15" />
            <Stat value="+1.200" label="creators em rede" />
          </motion.div>
        </div>

        {/* Direita: foto + stickers */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 lg:col-span-5 relative self-end"
        >
          <div className="relative aspect-[3/4] md:aspect-[4/5] w-full max-w-md mx-auto md:ml-auto md:mr-0">
            <div
              className="absolute inset-x-4 inset-y-2 bg-white rounded-[3rem]"
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
              <MMPill>De creator pra creator</MMPill>
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
              <span>Sem retrabalho</span>
              <span className="text-white/70">✦</span>
              <span>Sem improviso</span>
              <span className="text-white/70">✦</span>
              <span>Processo claro</span>
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
    <div className="flex items-baseline gap-2">
      <span
        className={`font-display font-black text-white tabular-nums ${
          small ? "text-base md:text-lg" : "text-2xl md:text-3xl"
        }`}
      >
        {value}
      </span>
      <span
        className={`uppercase tracking-wider text-white/70 ${
          small ? "text-[10px] md:text-xs" : "text-xs md:text-sm"
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
    <section className="bg-white py-12 md:py-16">
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
                className="max-h-full max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity"
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
  const ITENS = [
    {
      titulo: "Seleção de creators",
      tagShort: "Seleção",
      emoji: "🎯",
      texto:
        "Hunting com critério, não mensagem em massa. Perfil alinhado com sua persona, histórico de entrega, nicho compatível e disponibilidade real. Você recebe creators pré-aprovados.",
    },
    {
      titulo: "Briefing co-criado",
      tagShort: "Briefing",
      emoji: "📋",
      texto:
        "Construído junto com você, traduzindo posicionamento de marca em direção criativa que o creator entende e executa. Briefing claro é metade do trabalho.",
    },
    {
      titulo: "Roteiros revisados",
      tagShort: "Roteiro",
      emoji: "✍️",
      texto:
        "Toda campanha minha tem roteiro revisado por mim antes do creator gravar. É onde mais campanha desanda no mercado, e onde mais cuido pra não desandar a sua.",
    },
    {
      titulo: "Produção acompanhada",
      tagShort: "Produção",
      emoji: "🎬",
      texto:
        "Acompanhamento direto com cada creator. Cobrança de prazo, ajuste de execução, suporte técnico. Você não vai ficar correndo atrás de ninguém.",
    },
    {
      titulo: "Revisão antes da entrega",
      tagShort: "Revisão",
      emoji: "✓",
      texto:
        "Antes do material chegar em você, ele já passou por revisão. Você recebe entrega, não rascunho.",
    },
    {
      titulo: "Relatório e leitura",
      tagShort: "Relatório",
      emoji: "📊",
      texto:
        "Leitura clara do que performou, o que saturou e o que vamos testar no próximo ciclo. Decisão baseada em dado, não em achismo.",
    },
  ];

  const [active, setActive] = useState(0);
  const current = ITENS[active];

  // Auto-rotate enquanto o usuário não interage (a cada 5s)
  // Removemos auto-play pra dar controle total ao usuário — pode rolar e ler

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter text-black uppercase">
            Gestão completa.{" "}
            <span className="text-[var(--mm-orange)]">
              Sem montar time interno.
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-black/75 leading-relaxed">
            Eu opero a campanha de ponta a ponta. Você define o objetivo, eu
            entrego o que vai pro ar.
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
              {/* Emoji/visual gigante */}
              <div className="md:col-span-4 flex items-center justify-center">
                <div className="relative">
                  <div className="text-7xl md:text-9xl select-none">
                    {current.emoji}
                  </div>
                  <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 font-display font-black text-[var(--mm-orange)] text-3xl md:text-5xl tabular-nums">
                    {String(active + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>

              {/* Texto */}
              <div className="md:col-span-8">
                <div className="text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--mm-orange)] font-bold mb-3">
                  Etapa {String(active + 1).padStart(2, "0")} de{" "}
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
  type Card = {
    name: string;
    pitch: string;
    bullets: string[];
    ideal: string;
    cta: string;
    emphasis?: boolean;
  };
  const CARDS: Card[] = [
    {
      name: "Pacote Recorrente Mensal",
      pitch: "Operação contínua pra quem já roda UGC com volume.",
      bullets: [
        "Volume mensal definido",
        "Entrega recorrente, sempre com creators novos no banco",
        "Briefing, roteiro, produção e revisão inclusos",
        "Suporte direto durante o mês inteiro",
      ],
      ideal: "Marcas que já validaram UGC e querem escalar com previsibilidade.",
      cta: "Quero conversar sobre meu plano mensal",
      emphasis: true,
    },
    {
      name: "Campanha Pontual",
      pitch: "Campanha com começo, meio e fim — escopo fechado.",
      bullets: [
        "Lançamento, ativação sazonal ou teste pontual",
        "Escopo fechado de creators e entregas",
        "Briefing, roteiro, produção e revisão",
        "Entrega em prazo definido",
      ],
      ideal:
        "Marcas que querem testar UGC com qualidade ou têm necessidade pontual em datas específicas.",
      cta: "Quero conversar sobre minha campanha pontual",
    },
    {
      name: "Consultoria Estratégica",
      pitch: "Estrutura pro seu time aplicar — sem terceirizar a execução.",
      bullets: [
        "Diagnóstico do que já é feito hoje",
        "Processos de gestão de UGC pro seu time",
        "Briefing modelo + framework de seleção",
        "Acompanhamento de implementação",
      ],
      ideal:
        "Marcas com operação interna que querem profissionalizar o que já fazem.",
      cta: "Quero conversar sobre consultoria",
    },
  ];

  return (
    <section className="bg-white py-14 md:py-20 border-t border-black/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter text-black uppercase max-w-3xl">
          Três formas de trabalhar.{" "}
          <span className="text-[var(--mm-orange)]">Você escolhe.</span>
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
                    Mais escolhido
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
                  Ideal pra
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
  const ETAPAS = [
    {
      n: "01",
      title: "Diagnóstico",
      body:
        "Antes de qualquer proposta, conversa de diagnóstico. Eu preciso entender seu produto, seu público, o que você já tentou e onde está hoje. Sem isso, qualquer proposta é chute.",
    },
    {
      n: "02",
      title: "Estratégia e seleção",
      body:
        "Definimos juntos o objetivo da campanha, os ângulos que vamos testar e o perfil de creator ideal. A partir daí, eu seleciono os creators dentro do meu banco e te apresento já filtrados.",
    },
    {
      n: "03",
      title: "Briefing e roteiro",
      body:
        "Briefing co-criado, roteiro revisado por mim antes da gravação. Cada creator recebe direção clara, não margem pra interpretação.",
    },
    {
      n: "04",
      title: "Produção e acompanhamento",
      body:
        "Os creators gravam, eu acompanho. Quando chega ajuste, é antes de você ver. Quando chega entrega na sua mão, já passou por filtro.",
    },
    {
      n: "05",
      title: "Entrega e leitura",
      body:
        "Material entregue dentro do prazo combinado. Ao final, leitura do que funcionou e plano pro próximo ciclo.",
    },
  ];

  return (
    <section className="relative bg-white text-black py-14 md:py-20 overflow-hidden border-t border-black/10">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="hidden md:block absolute top-16 right-12 w-12 opacity-80 pointer-events-none"
      >
        <LoadingSticker className="w-full h-auto" />
      </motion.div>

      <div className="relative max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter uppercase text-black">
          Cinco etapas.{" "}
          <span className="text-[var(--mm-orange)]">Sem mistério, sem milagre.</span>
        </h2>
        <p className="mt-4 text-base md:text-lg text-black/75 max-w-2xl leading-relaxed">
          Esse é o processo que rodei em mais de 100 campanhas. Cada etapa
          existe porque, sem ela, alguma coisa quebra.
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
  { youtubeId: "i62BOlzvQlo", brand: "Sebastian" },
  { youtubeId: "15nOoGJ872g", brand: "Wella" },
  { youtubeId: "ATz4wOA_mAc", brand: "Neutrogena" },
];

function CasesEVideos() {
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
      className="bg-white py-14 md:py-20 border-t border-black/10"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter text-black uppercase">
          Conteúdos gerenciados{" "}
          <span className="text-[var(--mm-orange)]">pelo nosso time.</span>
        </h2>
        <p className="mt-4 text-base md:text-lg text-black/75 max-w-2xl leading-relaxed">
          Conheça algumas creators que poderão criar para a sua marca.
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

          {/* Trilho de cards (scroll horizontal) */}
          <div
            ref={scrollerRef}
            className="flex gap-3 md:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide px-2"
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
                  className={`flex-shrink-0 snap-start w-[44%] sm:w-[30%] md:w-[22%] lg:w-[16%] aspect-[9/16] rounded-xl overflow-hidden ${
                    hasVideo ? "bg-black cursor-pointer group relative" : "bg-black/5 border-2 border-dashed border-black/15 flex items-center justify-center"
                  }`}
                >
                  {hasVideo ? (
                    <>
                      <img
                        src={`https://i.ytimg.com/vi/${v.youtubeId}/maxresdefault.jpg`}
                        alt={v.brand}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`;
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
                        Em breve
                      </div>
                    </div>
                  )}
                </Cmp>
              );
            })}
          </div>
        </div>

        {/* Métricas */}
        <div className="mt-10 md:mt-14 grid grid-cols-3 gap-4 md:gap-6 border-t border-black/10 pt-8 md:pt-10">
          {[
            { v: "+100", l: "campanhas gerenciadas" },
            { v: "+1.200", l: "creators em rede" },
            { v: "+1000", l: "vídeos produzidos" },
          ].map((m) => (
            <div key={m.l}>
              <div className="font-display font-black text-3xl md:text-5xl text-black tabular-nums leading-none">
                {m.v}
              </div>
              <div className="mt-2 text-xs md:text-sm uppercase tracking-wider text-black/60">
                {m.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== 9. QUEM SOU ============================== */
function QuemSou() {
  return (
    <section className="bg-white text-black py-14 md:py-20 overflow-hidden border-t border-black/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-8 md:gap-12 items-center">
        <div className="md:col-span-7">
          <div className="text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--mm-orange)] font-bold mb-4">
            Eu sou
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl leading-[0.95] tracking-tighter uppercase text-black">
            Lara{" "}
            <span className="font-serif-accent italic text-[var(--mm-orange)] normal-case">
              Dam.
            </span>
          </h2>

          <div className="mt-8 space-y-5 text-base md:text-lg text-black/80 leading-relaxed">
            <p>
              Fui uma das primeiras pessoas no Brasil a falar publicamente
              sobre gestão de campanhas UGC. Não porque planejei. Porque já
              estava fazendo.
            </p>
            <p>
              Antes de existir nome bonito pra isso, eu já organizava creator,
              escrevia briefing, revisava roteiro, cobrava prazo e entregava
              campanha que funcionava. Aprendi na prática, errando, ajustando
              e fazendo de novo. E foi assim que construí o método que rodo
              até hoje.
            </p>
            <p>
              Em mais de 100 campanhas, com marcas como{" "}
              <b className="text-black">
                OLX, ZAP Imóveis, Magalu, Porto Seguro, Chilli Beans
              </b>{" "}
              e muitas outras, uma coisa ficou clara: o que separa campanha
              boa de campanha que dá errado não é talento isolado de creator.
              É processo.
            </p>
            <p className="font-semibold text-black">
              Eu não acredito em fórmula mágica. Acredito em fazer o básico
              bem feito.
            </p>
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
  const ITEMS = [
    {
      q: "O que é UGC e por que minha marca precisa disso?",
      a: "UGC é conteúdo produzido por pessoas reais, com cara de pessoa real. Funciona porque audiência confia em pessoa, não em propaganda. Se sua marca roda mídia paga, redes sociais ou quer presença digital constante, UGC é o formato que mais retém atenção e gera conversão hoje.",
    },
    {
      q: "Como vocês selecionam os creators?",
      a: "A partir de um banco com mais de 1.200 perfis ativos, filtramos por nicho, perfil de audiência, estilo de entrega e histórico. Você recebe creators pré-aprovados que fazem sentido pra sua marca, não uma lista genérica.",
    },
    {
      q: "Quanto tempo leva uma campanha do início à entrega?",
      a: "Depende do escopo, mas pra te dar uma referência: campanha pontual com 3 a 5 creators leva entre 3 e 5 semanas. Pacote mensal entrega volume contínuo a partir do primeiro mês.",
    },
    {
      q: "Vocês fazem só o vídeo ou cuidam da estratégia?",
      a: "Cuidamos da estratégia também. Pra mim, vídeo solto sem direção é onde a maioria das marcas perde dinheiro. Briefing, roteiro e ângulo criativo são parte do que entrego.",
    },
    {
      q: "Preciso enviar briefing pronto?",
      a: "Não. Briefing é construído junto com você. Eu pergunto o que precisa ser perguntado pra ter direção clara, e te entrego o briefing finalizado pra você aprovar antes de qualquer creator começar.",
    },
    {
      q: "Os vídeos são pra orgânico ou pra mídia paga?",
      a: "Os dois. Eu adapto o formato e o ângulo dependendo de onde você vai usar. Vídeo pra orgânico tem lógica diferente de vídeo pra ads, e isso entra no planejamento.",
    },
    {
      q: "E se uma entrega não vier do jeito que esperávamos?",
      a: "Antes de chegar em você, eu já revisei. Se ainda assim algo precisa ajustar, ajustamos sem custo adicional dentro do escopo combinado. Faz parte do processo.",
    },
    {
      q: "Vocês garantem resultado em vendas ou ROAS?",
      a: "Não garanto venda nem ROAS, e quem garante isso na primeira campanha está te enganando. O que garanto é entrega bem feita, conteúdo com lógica e processo claro. Resultado de venda depende da sua oferta, do seu funil e do seu produto. UGC bem feito é peça do quebra-cabeça, não o quebra-cabeça inteiro.",
    },
    {
      q: "Como funciona a cobrança?",
      a: "Pacote mensal: contrato com valor fixo mensal, definido conforme volume. Campanha pontual: orçamento fechado, pago em parcelas conforme escopo. Consultoria: valor definido após diagnóstico. Tudo formalizado em contrato. Sem surpresa.",
    },
    {
      q: "Como começo?",
      a: "Clica no botão abaixo, agendamos uma conversa de diagnóstico, e a partir dali eu monto proposta sob medida pra sua marca. Conversa não tem custo.",
    },
  ];

  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter text-black uppercase mb-10 md:mb-12">
          Perguntas que{" "}
          <span className="text-[var(--mm-orange)]">recebo com frequência.</span>
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
  return (
    <section className="bg-white text-black py-16 md:py-24 overflow-hidden border-t border-black/10">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter uppercase text-black">
          Sua marca não precisa de mais um vídeo.{" "}
          <span className="text-[var(--mm-orange)]">
            Precisa de uma campanha que funcione.
          </span>
        </h2>

        <div className="mt-8 space-y-4 text-base md:text-lg text-black/80 leading-relaxed">
          <p>
            Se você chegou até aqui, é porque alguma coisa do que eu falei
            bateu. Talvez seu time esteja sobrecarregado, talvez você já tenha
            rodado UGC e não funcionou, talvez você só queira começar do jeito
            certo.
          </p>
          <p>
            De qualquer forma, o próximo passo é simples: a gente conversa, eu
            entendo seu momento, e a partir dali decidimos juntos se faz
            sentido trabalhar.
          </p>
          <p className="text-black font-semibold">
            Sem proposta enlatada. Sem promessa que eu não posso cumprir.
            Conversa real pra entender se o que eu faço é o que sua marca
            precisa agora.
          </p>
        </div>

        <a
          href="#gestao-contato"
          className="mt-10 inline-flex items-center gap-2 bg-[var(--mm-orange)] text-white px-7 py-4 rounded-full text-base md:text-lg font-bold uppercase tracking-wider hover:bg-[var(--mm-orange-deep)] transition-colors shadow-xl"
        >
          Quero conversar sobre minha campanha
          <ArrowRight className="w-4 h-4" />
        </a>
        <p className="mt-3 text-xs md:text-sm text-black/60">
          Resposta em até 24h. Diagnóstico inicial sem custo.
        </p>
      </div>
    </section>
  );
}

/* ============================ 12. CONTACT FORM ============================ */
function ContactForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [data, setData] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onChange = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "gestao" }),
      });
      setSent(true);
    } catch {}
  };

  return (
    <section
      id="gestao-contato"
      className="relative bg-black text-white py-16 md:py-24 overflow-hidden border-t border-white/10"
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
          #contato
        </div>
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter text-center text-white uppercase">
          Vamos conversar sobre{" "}
          <span className="text-[var(--mm-orange)]">sua campanha?</span>
        </h2>
        <p className="mt-4 text-center text-white/75 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          Diagnóstico gratuito antes de qualquer proposta. Resposta em até 24h.
        </p>

        {sent ? (
          <div className="mt-10 p-8 rounded-3xl bg-white/10 border border-white/15 text-center">
            <div className="text-4xl mb-4">🚀</div>
            <div className="font-display font-black text-lg mb-2">
              Recebido!
            </div>
            <div className="text-white/70 text-sm md:text-base">
              Entro em contato em até 24h.
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
                <Field label="Nome completo" name="name" required onChange={onChange("name")} />
                <Field label="E-mail" name="email" type="email" required onChange={onChange("email")} />
                <Field label="Whatsapp" name="whatsapp" placeholder="(   )" onChange={onChange("whatsapp")} />
                <Field label="Empresa" name="company" onChange={onChange("company")} />
                <Select
                  label="Cargo"
                  name="role"
                  required
                  onChange={onChange("role")}
                  options={[
                    "Marketing",
                    "Growth / Performance",
                    "Founder / C-level",
                    "Social Media",
                    "Outro",
                  ]}
                />
                <Field label="Site" name="site" required onChange={onChange("site")} />
                <Select
                  label="Modalidade de interesse"
                  name="modality"
                  required
                  onChange={onChange("modality")}
                  options={[
                    "Pacote mensal recorrente",
                    "Campanha pontual",
                    "Consultoria estratégica",
                    "Não sei ainda — quero diagnóstico",
                  ]}
                />
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 bg-[var(--mm-orange)] text-white px-7 py-3 rounded-full text-sm md:text-base font-bold uppercase tracking-wider hover:bg-[var(--mm-orange-deep)] transition-colors"
                  >
                    Avançar
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Select
                  label="Objetivo principal"
                  name="goal"
                  required
                  onChange={onChange("goal")}
                  options={[
                    "Conteúdo pra mídia paga",
                    "Always-on no TikTok/Instagram",
                    "Lançamento de campanha",
                    "Presença digital da marca",
                  ]}
                />
                <Select
                  label="Orçamento estimado"
                  name="budget"
                  required
                  onChange={onChange("budget")}
                  options={[
                    "Até R$ 5.000",
                    "R$ 5.000 a R$ 15.000",
                    "R$ 15.000 a R$ 50.000",
                    "+R$ 50.000",
                    "A definir",
                  ]}
                />
                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-wider text-white/70 mb-2 font-semibold">
                    Conta sobre o projeto
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    onChange={(e) => setData((d) => ({ ...d, message: e.target.value }))}
                    className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--mm-orange)] transition-colors text-base leading-relaxed resize-none"
                    placeholder="Prazo, momento da marca, o que você já tentou..."
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs md:text-sm uppercase tracking-wider text-white/60 hover:text-white"
                  >
                    ← Voltar
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[var(--mm-orange)] text-white px-7 py-3 rounded-full text-sm md:text-base font-bold uppercase tracking-wider hover:bg-[var(--mm-orange-deep)] transition-colors"
                  >
                    Enviar
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
      <BrandsLogoBar />
      <CasesEVideos />
      <OQueFaço />
      <Modalidades />
      <Processo />
      <QuemSou />
      <FAQ />
      <CTAFinal />
      <ContactForm />
    </div>
  );
}
