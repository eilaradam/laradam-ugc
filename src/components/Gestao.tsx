"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Heart,
  ListOrdered,
  MessageCircle,
  Play,
  Rocket,
  ShoppingBag,
  Smile,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Video,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { VIDEOS, BRAND_LOGO_FILES } from "@/data/content";
import { useVideoModal } from "./VideoModalProvider";

/* ==========================================================================
   Paleta Meu Manager — aplicada via CSS vars no root da /gestao
   - blue: azul royal #1E3AFF
   - orange: laranja vivo #FF5824
   - pink: rosa claro pastel #FFCFD2
   - pink-soft: rosa ainda mais claro #FFE5E7
   - blue-deep: azul mais escuro pra hovers #0A1FE8
========================================================================== */
const PALETTE: React.CSSProperties = {
  ["--mm-blue" as string]: "#1028B0",
  ["--mm-blue-deep" as string]: "#081C7A",
  ["--mm-orange" as string]: "#FF5824",
  ["--mm-orange-deep" as string]: "#E0430F",
  ["--mm-pink" as string]: "#FFCFD2",
  ["--mm-pink-soft" as string]: "#FFE5E7",
};

/* ========================== STICKERS (SVG inline) ========================== */

// Balão laranja com 3 bolinhas rosa (chat/thinking)
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

// Loading azul (círculo tracejado tipo spinner)
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

// Cursor pixelado azul (estilo retrô Mac)
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

// "Creator Creator Creator" sticker laranja
function CreatorStacked({ className }: { className?: string }) {
  return (
    <div
      className={`inline-flex flex-col items-start ${className ?? ""}`}
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="font-display font-black text-white uppercase text-xl md:text-3xl leading-[0.85] tracking-tight -mt-1 first:mt-0"
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

// Pill estilo Meu Manager (pink bg + orange text)
function MMPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider bg-[var(--mm-pink)] text-[var(--mm-orange)]">
      {children}
    </span>
  );
}

/* ================================ HERO ================================ */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white pt-20 md:pt-24 pb-0">
      {/* Grid bg decorativo (pontos sutis) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-8 md:gap-4 items-end pt-4 md:pt-8">
        {/* ========== Coluna esquerda: Text block ========== */}
        <div className="md:col-span-7 lg:col-span-7 relative pb-12 md:pb-20">
          {/* Wordmark no topo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8 md:mb-10"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--mm-orange)] animate-pulse" />
            <span className="font-display font-black text-white text-sm md:text-base tracking-widest uppercase">
              laradam<span className="text-[var(--mm-orange)]">.</span>gestão
            </span>
          </motion.div>

          {/* Pill acima do título */}
          <motion.div
            initial={{ opacity: 0, x: -20, rotate: -3 }}
            animate={{ opacity: 1, x: 0, rotate: -2 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-6 origin-left inline-block"
          >
            <MMPill>✦ Menos caos, mais criação</MMPill>
          </motion.div>

          {/* H1 grande */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-white text-4xl md:text-5xl lg:text-6xl leading-[0.88] tracking-tighter uppercase"
          >
            UGC que vende,
            <br />
            <span className="text-[var(--mm-orange)]">de creator</span>
            <br />
            pra creator.
          </motion.h1>

          {/* Descrição */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 text-white/85 text-base md:text-lg max-w-xl leading-relaxed"
          >
            Gestão completa de UGC —{" "}
            <span className="font-serif-accent italic text-[var(--mm-orange)]">
              do briefing ao viral
            </span>
            . Creators selecionados, roteiros validados e vídeos pensados pra
            converter.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#gestao-contato"
              className="inline-flex items-center gap-2 bg-[var(--mm-orange)] text-white px-7 py-4 rounded-full text-base font-bold uppercase tracking-wider hover:bg-[var(--mm-orange-deep)] transition-colors shadow-xl"
            >
              Falar com a Lara
              <Rocket className="w-4 h-4" />
            </a>
            <a
              href="#cases-gestao"
              className="inline-flex items-center gap-2 border-2 border-white/20 text-white px-6 py-4 rounded-full text-base font-bold uppercase tracking-wider hover:bg-white hover:text-[var(--mm-blue)] transition-colors"
            >
              Ver cases
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-white/80"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-display font-black text-xl md:text-2xl text-white tabular-nums">
                +500
              </span>
              <span className="text-xs md:text-sm uppercase tracking-wider">
                vídeos
              </span>
            </div>
            <div className="h-6 w-px bg-white/20" />
            <div className="flex items-baseline gap-2">
              <span className="font-display font-black text-xl md:text-2xl text-white tabular-nums">
                +200
              </span>
              <span className="text-xs md:text-sm uppercase tracking-wider">
                marcas
              </span>
            </div>
            <div className="h-6 w-px bg-white/20" />
            <div className="flex items-baseline gap-2">
              <span className="font-display font-black text-xl md:text-2xl text-white tabular-nums">
                100M+
              </span>
              <span className="text-xs md:text-sm uppercase tracking-wider">
                views
              </span>
            </div>
          </motion.div>
        </div>

        {/* ========== Coluna direita: Foto + stickers ========== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 lg:col-span-5 relative self-end"
        >
          {/* Container da foto com forma orgânica */}
          <div className="relative aspect-[3/4] md:aspect-[4/5] w-full max-w-md mx-auto md:ml-auto md:mr-0">
            {/* Shape branco ao fundo */}
            <div
              className="absolute inset-x-4 inset-y-2 bg-white rounded-[3rem]"
              aria-hidden
            />
            {/* Foto */}
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

            {/* Sticker: Creator Creator Creator no canto superior esquerdo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 20 }}
              animate={{ opacity: 1, scale: 1, rotate: -10 }}
              transition={{ duration: 0.9, delay: 0.8 }}
              className="absolute -top-4 -left-4 md:-left-10 pointer-events-none scale-[0.65] md:scale-75 origin-top-left"
            >
              <CreatorStacked />
            </motion.div>

            {/* Sticker: Chat bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 8 }}
              transition={{ duration: 0.9, delay: 1.1 }}
              className="absolute top-8 -right-2 md:-right-6 w-20 md:w-24 pointer-events-none"
            >
              <ChatBubbleSticker className="w-full h-auto drop-shadow-lg" />
            </motion.div>

            {/* Sticker: Loading giro lento */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-24 -left-2 md:-left-4 w-12 md:w-14 pointer-events-none drop-shadow-lg"
            >
              <LoadingSticker className="w-full h-auto" />
            </motion.div>

            {/* Pill "De creator para creator" */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 5 }}
              animate={{ opacity: 1, y: 0, rotate: -4 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="absolute bottom-6 -right-2 md:-right-8 pointer-events-none"
            >
              <MMPill>De creator pra creator</MMPill>
            </motion.div>

            {/* Cursor pixel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="absolute top-1/2 -left-1 md:-left-6 w-9 md:w-12 pointer-events-none rotate-[-10deg] drop-shadow-md"
            >
              <CursorSticker className="w-full h-auto" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Faixa laranja com tagline no rodapé do hero — animação lenta */}
      <div className="relative mt-6 md:mt-10 bg-[var(--mm-orange)] py-3 md:py-4 overflow-hidden">
        <div className="marquee-slow">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 md:gap-5 text-xs md:text-sm uppercase tracking-[0.25em] font-bold text-white whitespace-nowrap"
            >
              <span>Gestão inteligente</span>
              <span className="text-white/70">✦</span>
              <span>Creators selecionados</span>
              <span className="text-white/70">✦</span>
              <span>UGC que converte</span>
              <span className="text-white/70">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================ BRANDS ================================ */
function Brands() {
  const LOGOS = BRAND_LOGO_FILES.slice(0, 10);
  return (
    <section className="bg-white py-10 md:py-14 border-b border-[var(--mm-blue)]/5">
      <div className="max-w-5xl mx-auto px-6 md:px-12 grid grid-cols-3 md:grid-cols-5 gap-6 md:gap-10 items-center">
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
    </section>
  );
}

/* =============================== WHO FOR =============================== */
function WhoFor() {
  // Organizado em linhas alternadas 2-1-2-1-2 pra ficar um zigue-zague centralizado
  const ROWS: string[][] = [
    [
      "Marcas que querem melhorar os resultados de campanhas de mídia paga",
      "Marcas que desejam estourar a bolha no always-on",
    ],
    ["Marcas que passaram da hora de criar conteúdos com a cara do consumidor real"],
    [
      "Marcas que não têm pessoas pra humanizar os vídeos",
      "Marcas que precisam aumentar engajamento e alcance orgânico",
    ],
    ["Gestores que querem ativar TikTok e Reels de forma estratégica"],
    [
      "Times de marketing sem estrutura de produção interna",
      "Produtos que precisam de prova social pra gerar conversão",
    ],
  ];

  return (
    <section className="relative bg-white py-14 md:py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, rotate: 20 }}
        whileInView={{ opacity: 1, rotate: 8 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="hidden md:block absolute top-10 right-10 w-24 pointer-events-none"
      >
        <ChatBubbleSticker className="w-full h-auto" />
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter text-black uppercase mb-10 md:mb-14">
          Quem precisa criar{" "}
          <span className="text-[var(--mm-orange)]">conteúdo UGC</span> comigo?
        </h2>

        <div className="flex flex-col gap-3 md:gap-4">
          {ROWS.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="flex flex-wrap justify-center gap-3 md:gap-4"
            >
              {row.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: rowIdx * 0.08 + i * 0.05,
                  }}
                  className="inline-flex items-center gap-2 bg-[var(--mm-pink-soft)] text-black text-sm md:text-base px-4 md:px-5 py-2.5 md:py-3 rounded-full border border-[var(--mm-pink)] leading-snug"
                >
                  <CheckCircle2 className="w-4 h-4 text-[var(--mm-orange)] flex-shrink-0" />
                  <span className="text-left">{item}</span>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================== CONTEÚDO AUTÊNTICO (blue) ======================== */
function AuthenticContent() {
  const { open } = useVideoModal();
  const FEATURES = [
    { icon: TrendingUp, title: "Mais credibilidade com prova social" },
    { icon: Zap, title: "Conteúdos escaláveis e de baixo custo" },
    { icon: Sparkles, title: "Performance superior em TikTok, Reels e Shorts" },
    { icon: Heart, title: "Diversidade de tipos de conteúdos" },
  ];
  const GRID_VIDEOS = VIDEOS.filter((v) => v.youtubeId).slice(0, 8);

  return (
    <section className="relative bg-black text-white py-14 md:py-20 overflow-hidden">
      {/* Loading sticker girando decorativo */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="hidden md:block absolute top-10 right-10 w-14 opacity-80 pointer-events-none"
      >
        <LoadingSticker className="w-full h-auto" />
      </motion.div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-10 md:mb-14 items-end">
          <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.9] tracking-tighter uppercase">
            Conteúdo
            <br />
            autêntico que{" "}
            <span className="text-[var(--mm-orange)]">gruda</span>
            <br />
            na audiência
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed">
            UGC é o formato que mais cresce no digital: aumenta confiança,
            retenção e impacto de campanhas. Com +500 vídeos já produzidos,
            ativo uma rede de creators prontos pra produzir vídeos com
            linguagem nativa e foco em performance.
          </p>
        </div>

        <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
          <ul className="space-y-3 md:space-y-4 md:max-w-[220px]">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex items-start gap-3">
                <span className="text-[var(--mm-orange)] mt-0.5">✦</span>
                <span className="text-xs md:text-sm uppercase tracking-wider font-bold leading-snug">
                  {f.title}
                </span>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {GRID_VIDEOS.map((v) => (
              <button
                key={v.id}
                onClick={() => open(v)}
                data-cursor="play"
                className="group relative aspect-[9/16] rounded-lg overflow-hidden bg-white/5 cursor-pointer"
              >
                <img
                  src={`https://i.ytimg.com/vi/${v.youtubeId}/maxresdefault.jpg`}
                  alt={v.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                  <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-[var(--mm-orange)] flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 md:w-4 md:h-4 text-white fill-white ml-0.5" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================== MARQUEE =============================== */
function MarqueeStripe() {
  const items = Array.from({ length: 14 }, () => "Resultados reais · Conteúdo real");
  return (
    <div className="bg-black py-4 md:py-5 overflow-hidden border-y border-[var(--mm-orange)]/30">
      <div className="marquee-slow">
        {items.concat(items).map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-4 text-xs md:text-sm uppercase tracking-[0.25em] font-bold text-[var(--mm-orange)]"
          >
            {s}
            <span className="text-white/70">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================ CONTENT TYPES ============================ */
function ContentTypes() {
  type T = {
    title: string;
    icon: LucideIcon;
    color: "pink" | "white" | "blue" | "orange";
  };
  const TYPES: T[] = [
    { title: "Reviews de produto", icon: Star, color: "white" },
    { title: "Experiência em eventos", icon: Calendar, color: "white" },
    { title: "Storytelling de marca", icon: BookOpen, color: "pink" },
    { title: "POV, GRWM e Vlog", icon: Video, color: "white" },
    { title: "Conteúdo educativo, how to e tutoriais", icon: ListOrdered, color: "pink" },
    { title: "Conteúdo com trends/challenges", icon: TrendingUp, color: "white" },
    { title: "Unboxing", icon: ShoppingBag, color: "white" },
    { title: "POV, GRWM e Vlog", icon: MessageCircle, color: "blue" },
    { title: "Antes e depois (transformação clara)", icon: FlaskConical, color: "white" },
    { title: "POV, GRWM e Vlog", icon: Video, color: "orange" },
    { title: "UGC para anúncios pagos", icon: Zap, color: "white" },
    { title: "Top 3/Top 5 motivos", icon: ListOrdered, color: "pink" },
    { title: "Review comparativo", icon: CheckCircle2, color: "white" },
    { title: "Reação espontânea", icon: Smile, color: "white" },
    { title: "Experiência em evento/ativação", icon: Users, color: "blue" },
    { title: "UGC colaborativo com dois creators", icon: Users, color: "white" },
  ];

  const colorClasses: Record<T["color"], string> = {
    white: "bg-white border-black/10 text-black",
    pink: "bg-[var(--mm-pink-soft)] border-[var(--mm-pink)] text-black",
    blue: "bg-black border-black text-white",
    orange: "bg-[var(--mm-orange)] border-[var(--mm-orange)] text-white",
  };

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.9] tracking-tighter uppercase text-black mb-10 md:mb-14 max-w-2xl">
          Criamos o tipo de conteúdo UGC{" "}
          <span className="text-[var(--mm-orange)]">certo pra sua marca</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
          {TYPES.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={`${t.title}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className={`aspect-[4/3] rounded-2xl border p-3.5 md:p-4 flex flex-col justify-between ${colorClasses[t.color]}`}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5 self-end opacity-70" strokeWidth={1.8} />
                <div className="text-sm md:text-base font-semibold leading-snug">
                  {t.title}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#gestao-contato"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
          >
            Fale comigo e comece hoje
            <Rocket className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================= HOW WE DO ============================= */
function HowWeDo() {
  type Step = { title: string; body: string; color: string };
  const STEPS: Step[] = [
    {
      title: "Hunting e seleção de creators",
      body:
        "Mapeio e seleciono UGC creators alinhados ao perfil da sua marca e do seu público-alvo. Processo de hunting considera dados demográficos, estilo de conteúdo e histórico de performance.",
      color:
        "bg-[var(--mm-pink-soft)] text-black border-[var(--mm-pink)]",
    },
    {
      title: "Briefing co-criado com a marca",
      body:
        "Alinhamos tom, objetivos e KPIs antes de qualquer câmera ligar. O briefing nasce junto com o time da marca pra o criativo já sair validado.",
      color: "bg-black text-white border-black",
    },
    {
      title: "Produção de conteúdos autênticos",
      body:
        "Gravação com direção, luz natural, roteiros testados em performance. Cada vídeo pensado pros 3 primeiros segundos segurarem a audiência.",
      color: "bg-[var(--mm-orange)] text-white border-[var(--mm-orange)]",
    },
    {
      title: "Aprovação e ajustes",
      body:
        "Você revisa, ajusta e recebe o material nos formatos certos pra cada plataforma (9:16, 1:1, 16:9) + relatório dos primeiros dias rodando.",
      color: "bg-white text-black border-black/15",
    },
  ];

  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="relative bg-white py-14 md:py-20 overflow-hidden">
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="hidden md:block absolute top-16 left-10 w-12 opacity-80 pointer-events-none"
      >
        <LoadingSticker className="w-full h-auto" />
      </motion.div>

      <div className="relative max-w-3xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter text-black uppercase text-center">
          Como <span className="text-[var(--mm-orange)]">fazemos acontecer</span>
        </h2>
        <p className="mt-4 text-center text-black/75 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Diferentes canais, objetivos distintos, a mesma qualidade e
          resultados cada vez melhores. Escolha o canal, a Lara cuida do resto.
        </p>

        <div className="mt-10 space-y-3">
          {STEPS.map((s, i) => {
            const isOpen = i === openIdx;
            return (
              <div
                key={s.title}
                className={`rounded-2xl border-2 overflow-hidden transition-all ${s.color}`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 md:py-5 text-left"
                >
                  <span className="font-display font-black text-base md:text-lg tracking-wide uppercase">
                    {s.title}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${
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
                      <div className="px-5 md:px-6 pb-5 md:pb-6 text-base leading-relaxed opacity-90">
                        {s.body}
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

/* ================================ CASES ================================ */
function CasesSection() {
  type Case = {
    brand: string;
    headline: string;
    body: string;
    stats: { value: string; label: string }[];
    footnote?: string;
  };

  const CASES: Case[] = [
    {
      brand: "InfinitePay",
      headline: "+100M views e +30% em vendas em 3 meses",
      body: "Vídeo UGC TikTok-first com hook testado em performance, rodando como criativo pago e orgânico.",
      stats: [
        { value: "+100M", label: "visualizações" },
        { value: "+12K", label: "engajamento" },
        { value: "+1.500%", label: "alcance" },
        { value: "+30%", label: "em vendas" },
      ],
      footnote: "Case oficial TikTok for Business",
    },
    {
      brand: "Méliuz",
      headline: "+30M views e +30k seguidores em 6 meses",
      body: "UGC creator + microinfluenciadores em estratégia TikTok-first pra humanização e conversão.",
      stats: [
        { value: "+30M", label: "visualizações" },
        { value: "+30K", label: "seguidores" },
        { value: "1.023", label: "vídeos ativos" },
        { value: "+25K", label: "cliques no site" },
      ],
      footnote: "Humanização em escala com performance real",
    },
    {
      brand: "Cygnuss",
      headline: "Zero mídia paga e +140k views em 8 meses",
      body: "Comunidade UGC no TikTok construída com conteúdo autêntico — sem investir 1 real em ads.",
      stats: [
        { value: "+140K", label: "visualizações" },
        { value: "+2K", label: "seguidores" },
        { value: "5,86%", label: "taxa de engajamento" },
      ],
      footnote: "UGC como motor de comunidade",
    },
  ];

  const [idx, setIdx] = useState(0);

  return (
    <section id="cases-gestao" className="relative bg-black py-14 md:py-20 overflow-hidden">
      {/* Sticker Creator Creator Creator flutuando */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="hidden md:block absolute top-10 right-6 pointer-events-none"
      >
        <CreatorStacked className="scale-75" />
      </motion.div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter text-white uppercase text-center">
          Cases com UGC:{" "}
          <span className="italic">a gente faz acontecer!</span>
        </h2>
        <p className="mt-4 text-center text-white/90 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Descubra como marcas como <b>InfinitePay</b>, <b>Méliuz</b> e{" "}
          <b>Cygnuss</b> aumentaram engajamento, seguidores e vendas com
          estratégias de UGC no TikTok e Instagram.
        </p>

        <div className="mt-10 hidden md:grid grid-cols-3 gap-5">
          {CASES.map((c) => (
            <CaseCard key={c.brand} c={c} />
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <CaseCard c={CASES[idx]} />
          <div className="flex items-center justify-center gap-3 mt-5">
            <button
              onClick={() => setIdx((i) => (i - 1 + CASES.length) % CASES.length)}
              className="w-10 h-10 rounded-full border-2 border-white/30 text-white flex items-center justify-center"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-white/80 tabular-nums">
              {String(idx + 1).padStart(2, "0")}/
              {String(CASES.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => setIdx((i) => (i + 1) % CASES.length)}
              className="w-10 h-10 rounded-full border-2 border-white/30 text-white flex items-center justify-center"
              aria-label="Próximo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseCard({
  c,
}: {
  c: {
    brand: string;
    headline: string;
    body: string;
    stats: { value: string; label: string }[];
    footnote?: string;
  };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl bg-neutral-900 border border-white/10 text-white p-6 md:p-7 flex flex-col gap-4"
    >
      <div className="text-center font-display font-black text-base md:text-lg tracking-tight border-b border-white/15 pb-4 uppercase">
        {c.brand}
      </div>
      <div className="font-display font-black text-[var(--mm-orange)] text-base md:text-lg leading-tight tracking-tight text-center uppercase">
        {c.headline}
      </div>
      <p className="text-sm md:text-base text-white/80 leading-relaxed text-center">
        {c.body}
      </p>
      <div className="text-xs uppercase tracking-wider text-center text-white/65 mt-1 font-semibold">
        resultado:
      </div>
      <div className="grid grid-cols-2 gap-2">
        {c.stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-[var(--mm-orange)]/50 bg-white/5 px-3 py-3 text-center"
          >
            <div className="font-display font-black text-[var(--mm-orange)] text-base md:text-lg tabular-nums leading-none">
              {s.value}
            </div>
            <div className="text-[11px] md:text-xs uppercase tracking-wider text-white/75 mt-1.5">
              {s.label}
            </div>
          </div>
        ))}
      </div>
      {c.footnote && (
        <div className="text-xs text-center text-white/70 border-t border-white/10 pt-3">
          {c.footnote}
        </div>
      )}
      <a
        href="#gestao-contato"
        className="mt-2 inline-flex items-center justify-center gap-2 bg-[var(--mm-orange)] text-white px-5 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[var(--mm-orange-deep)] transition-colors"
      >
        Falar com a Lara
        <Rocket className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  );
}

/* ============================== SCALE / TTCX ============================== */
function ScaleSection() {
  return (
    <section className="relative bg-black text-white py-14 md:py-20 overflow-hidden">
      {/* Formas decorativas */}
      <svg
        viewBox="0 0 1200 400"
        className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
        aria-hidden
      >
        <path
          d="M 50 -50 L 350 350"
          stroke="#FF5824"
          strokeWidth="80"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />
        <path
          d="M 800 100 L 1100 -100"
          stroke="#FFCFD2"
          strokeWidth="40"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />
        <path
          d="M 950 350 L 1250 50"
          stroke="#FF5824"
          strokeWidth="30"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Cursor sticker */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="hidden md:block absolute top-16 right-20 w-16 pointer-events-none"
      >
        <CursorSticker className="w-full h-auto" />
      </motion.div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[var(--mm-orange)] font-bold mb-4">
            #TTCX
          </div>
          <h2 className="font-display font-black text-2xl md:text-3xl leading-[0.95] tracking-tighter mb-4 uppercase">
            TikTok Creative Exchange
          </h2>
          <p className="text-sm md:text-base text-white/80 leading-relaxed mb-6">
            Como parceira na fase beta do <b>TTCX</b>, fui treinada pra
            potencializar os resultados das marcas nas plataformas. A
            parceria foi fundamental pra construirmos um Banco de Creators
            que já conta com mais de 500 vídeos produzidos. Isso garante
            velocidade na produção, testes em escala e conteúdos nativos que
            realmente performam.
          </p>
          <a
            href="#gestao-contato"
            className="inline-flex items-center gap-2 bg-[var(--mm-orange)] text-white px-5 py-3 rounded-full text-sm md:text-base font-bold uppercase tracking-wider hover:bg-[var(--mm-orange-deep)] transition-colors"
          >
            Falar com a Lara
            <Rocket className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="text-center md:text-left">
          <div className="font-display font-black text-5xl md:text-6xl text-[var(--mm-orange)] leading-none tracking-tighter">
            +500
          </div>
          <div className="mt-3 font-display font-black text-[var(--mm-pink)] text-lg md:text-2xl leading-tight tracking-tight uppercase">
            Creators UGC e
            <br />
            produção em escala
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================== FAQ ================================== */
function FAQ() {
  const ITEMS = [
    {
      q: "A Lara trabalha com UGC no always e em campanhas?",
      a: "Sim! Atuo tanto em always-on (pra sustentar presença digital) quanto em campanhas específicas, com UGC pensado pra engajamento e performance.",
    },
    {
      q: "Qual a diferença entre UGC e influenciador?",
      a: "UGC (User Generated Content) é conteúdo pensado pra rodar como criativo — você compra os direitos do vídeo e usa em anúncios/feed da marca. Influenciador publica no próprio perfil pra alcance orgânico. Trabalho com os dois modelos.",
    },
    {
      q: "Direitos de uso e prazo de veiculação?",
      a: "Por padrão os direitos de uso são de 6 meses, em mídia paga e orgânica, nas plataformas contratadas. Extensões e exclusividade são negociadas caso a caso.",
    },
  ];

  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-2xl md:text-3xl leading-[0.95] tracking-tighter text-black uppercase text-center mb-10">
          Dúvidas frequentes sobre{" "}
          <span className="text-[var(--mm-orange)]">criação de UGC</span>
        </h2>

        <div className="space-y-3">
          {ITEMS.map((item, i) => {
            const isOpen = i === openIdx;
            return (
              <div
                key={item.q}
                className="rounded-2xl border-2 border-black/15 overflow-hidden bg-white"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-5 text-left"
                >
                  <span className="text-base md:text-lg font-medium text-black">
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

/* ============================== FINAL CTA ============================== */
function FinalCTA() {
  return (
    <section className="relative bg-white py-14 md:py-20 overflow-hidden border-t border-black/10">
      <div className="relative max-w-3xl mx-auto px-6 md:px-12 text-center">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter text-black uppercase">
          Seu próximo{" "}
          <span className="text-[var(--mm-orange)]">case de sucesso</span>{" "}
          começa aqui.
        </h2>
        <p className="mt-4 text-black/80 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Integro estratégia, creators e produção <b>end-to-end</b>, do
          briefing à biblioteca de UGC pronta pra orgânico e mídia.
        </p>
        <a
          href="#gestao-contato"
          className="mt-8 inline-flex items-center gap-2 bg-black text-white px-7 py-4 rounded-full text-base md:text-lg font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-lg"
        >
          Fale com a Lara e comece hoje
          <Rocket className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}

/* ============================== CONTACT FORM ============================== */
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
      className="relative bg-black text-white py-16 md:py-24 overflow-hidden"
    >
      {/* stickers decorativos */}
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

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="hidden md:block absolute top-1/2 right-20 w-14 pointer-events-none"
      >
        <LoadingSticker className="w-full h-auto" />
      </motion.div>

      <div className="relative max-w-2xl mx-auto px-6 md:px-12">
        <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[var(--mm-orange)] font-bold text-center mb-3">
          #contato
        </div>
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter text-center text-white uppercase">
          Fale comigo para fazer um{" "}
          <span className="text-[var(--mm-orange)]">diagnóstico</span> ou
          receber orçamento!
        </h2>

        {sent ? (
          <div className="mt-10 p-8 rounded-3xl bg-white/10 border border-white/15 text-center">
            <div className="text-4xl mb-4">🚀</div>
            <div className="font-display font-black text-lg mb-2">Enviado!</div>
            <div className="text-white/70 text-sm">
              Entro em contato em até 48h.
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
                  label="Número de funcionários"
                  name="size"
                  required
                  onChange={onChange("size")}
                  options={["1–10", "11–50", "51–200", "201–1000", "+1000"]}
                />
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 bg-[var(--mm-orange)] text-white px-7 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[var(--mm-orange-deep)] transition-colors"
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
                    "R$ 5.000 – R$ 15.000",
                    "R$ 15.000 – R$ 50.000",
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
                    placeholder="Prazo, categoria, objetivo da campanha..."
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs uppercase tracking-wider text-white/60 hover:text-white"
                  >
                    ← Voltar
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[var(--mm-orange)] text-white px-7 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[var(--mm-orange-deep)] transition-colors"
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
      <Brands />
      <WhoFor />
      <AuthenticContent />
      <MarqueeStripe />
      <ContentTypes />
      <MarqueeStripe />
      <HowWeDo />
      <CasesSection />
      <ScaleSection />
      <FAQ />
      <FinalCTA />
      <ContactForm />
    </div>
  );
}
