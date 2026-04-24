"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Camera,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
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

// ========== HERO ==========
function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary-light pt-16 md:pt-20 pb-14 md:pb-20">
      {/* Formas decorativas ao fundo */}
      <svg
        viewBox="0 0 1200 600"
        className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
        aria-hidden
      >
        <path
          d="M -100 500 Q 200 350 500 450 T 1100 350"
          stroke="var(--primary)"
          strokeOpacity="0.15"
          strokeWidth="120"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M -50 200 Q 300 100 600 200 T 1250 150"
          stroke="var(--primary)"
          strokeOpacity="0.12"
          strokeWidth="80"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-foreground text-xl md:text-2xl tracking-tight mb-8"
        >
          laradam<span className="text-primary">.</span>gestão
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-black text-foreground text-4xl md:text-6xl leading-[0.95] tracking-tighter"
        >
          UGC QUE CONECTA.
          <br />
          CONTEÚDO REAL,
          <br />
          <span className="font-serif-accent italic text-primary">
            resultados reais.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-foreground-soft text-sm md:text-base max-w-lg mx-auto leading-relaxed"
        >
          Criamos conteúdos autênticos com UGC creators para engajar, gerar
          prova social e aumentar conversão.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          href="#gestao-contato"
          className="mt-8 inline-flex items-center gap-2 bg-foreground text-background px-6 py-3.5 rounded-full text-sm md:text-base font-bold uppercase tracking-wider hover:bg-primary transition-colors"
        >
          Falar com a Lara
          <Rocket className="w-4 h-4" />
        </motion.a>
      </div>
    </section>
  );
}

// ========== BRANDS ==========
function Brands() {
  const LOGOS = BRAND_LOGO_FILES.slice(0, 10);
  return (
    <section className="bg-background py-10 md:py-14 border-b border-foreground/5">
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

// ========== QUEM PRECISA ==========
function WhoFor() {
  const ITEMS = [
    "Marcas que querem melhorar os resultados de campanhas de mídia paga",
    "Marcas que desejam estourar a bolha no always-on",
    "Marcas que passaram da hora de criar conteúdos com a cara do consumidor real",
    "Marcas que não têm pessoas pra humanizar os vídeos",
    "Marcas que precisam aumentar engajamento e alcance orgânico",
    "Gestores que querem ativar TikTok e Reels de forma estratégica",
    "Times de marketing sem estrutura de produção interna",
    "Produtos que precisam de prova social pra gerar conversão",
  ];

  return (
    <section className="bg-background py-14 md:py-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <h2 className="font-display font-black text-3xl md:text-5xl leading-[0.95] tracking-tighter text-foreground mb-10 md:mb-14">
          QUEM PRECISA CRIAR{" "}
          <span className="font-serif-accent italic text-primary">
            conteúdo UGC
          </span>{" "}
          COMIGO?
        </h2>

        <div className="flex flex-wrap justify-center gap-2.5 md:gap-3">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="inline-flex items-center gap-2 bg-primary-light border border-primary/20 text-foreground text-xs md:text-sm px-4 py-2 rounded-full"
            >
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========== CONTEÚDO AUTÊNTICO (dark) ==========
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
    <section className="bg-foreground text-background py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-10 md:mb-14 items-end">
          <h2 className="font-display font-black text-3xl md:text-5xl leading-[0.95] tracking-tighter">
            CONTEÚDO
            <br />
            AUTÊNTICO QUE{" "}
            <span className="font-serif-accent italic text-primary">GRUDA</span>{" "}
            NA AUDIÊNCIA
          </h2>
          <p className="text-background/70 text-sm md:text-base leading-relaxed">
            UGC é o formato que mais cresce no digital: aumenta confiança,
            retenção e impacto de campanhas. Com +500 vídeos já produzidos, eu
            ativo uma rede de creators prontos pra produzir vídeos com
            linguagem nativa e foco em performance — pra orgânico e mídia.
          </p>
        </div>

        <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
          {/* Features column */}
          <ul className="space-y-3 md:space-y-4 md:max-w-[220px]">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex items-start gap-3">
                <span className="text-primary mt-0.5">✦</span>
                <span className="text-[11px] md:text-xs uppercase tracking-wider font-bold leading-tight">
                  {f.title}
                </span>
              </li>
            ))}
          </ul>

          {/* Video grid 4x2 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {GRID_VIDEOS.map((v) => (
              <button
                key={v.id}
                onClick={() => open(v)}
                data-cursor="play"
                className="group relative aspect-[9/16] rounded-lg overflow-hidden bg-background/5 cursor-pointer"
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
                  <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-primary/90 flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-light fill-primary-light ml-0.5" />
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

// ========== MARQUEE ==========
function MarqueeStripe() {
  const items = Array.from({ length: 12 }, () => "RESULTADOS REAIS · CONTEÚDO REAL");
  return (
    <div className="bg-primary-light py-4 md:py-5 overflow-hidden border-y border-primary/20">
      <div className="marquee">
        {items.concat(items).map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-4 text-[11px] md:text-xs uppercase tracking-[0.25em] font-bold text-primary"
          >
            {s}
            <span className="text-primary/50">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== CONTENT TYPES ==========
function ContentTypes() {
  type T = { title: string; icon: LucideIcon; color: "light" | "primary" | "dark" };
  const TYPES: T[] = [
    { title: "Reviews de produto", icon: Star, color: "light" },
    { title: "Experiência em eventos", icon: Calendar, color: "light" },
    { title: "Storytelling de marca", icon: BookOpen, color: "primary" },
    { title: "POV, GRWM e Vlog", icon: Video, color: "light" },
    { title: "Conteúdo educativo, how to e tutoriais", icon: ListOrdered, color: "primary" },
    { title: "Conteúdo com trends/challenges", icon: TrendingUp, color: "light" },
    { title: "Unboxing", icon: ShoppingBag, color: "light" },
    { title: "POV, GRWM e Vlog", icon: MessageCircle, color: "dark" },
    { title: "Antes e depois (transformação clara)", icon: FlaskConical, color: "light" },
    { title: "POV, GRWM e Vlog", icon: Video, color: "primary" },
    { title: "UGC para anúncios pagos", icon: Zap, color: "light" },
    { title: "Top 3/Top 5 motivos para usar o produto", icon: ListOrdered, color: "primary" },
    { title: "Review comparativo", icon: CheckCircle2, color: "light" },
    { title: "Reação espontânea", icon: Smile, color: "light" },
    { title: "Experiência em evento/ativação", icon: Users, color: "primary" },
    { title: "UGC colaborativo com dois ou mais creators", icon: Users, color: "light" },
  ];

  return (
    <section className="bg-background py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-3xl md:text-5xl leading-[0.95] tracking-tighter text-foreground mb-10 md:mb-14 max-w-2xl">
          CRIAMOS O TIPO DE CONTEÚDO COM UGC{" "}
          <span className="font-serif-accent italic text-primary">
            certo pra sua marca
          </span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
          {TYPES.map((t, i) => {
            const Icon = t.icon;
            const bg =
              t.color === "primary"
                ? "bg-primary-light border-primary/20"
                : t.color === "dark"
                ? "bg-foreground text-background border-foreground"
                : "bg-background border-foreground/10";
            return (
              <motion.div
                key={`${t.title}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className={`aspect-[4/3] rounded-2xl border p-3 md:p-4 flex flex-col justify-between ${bg}`}
              >
                <Icon
                  className={`w-4 h-4 md:w-5 md:h-5 self-end ${
                    t.color === "dark" ? "text-background/60" : "text-foreground/50"
                  }`}
                  strokeWidth={1.8}
                />
                <div className="text-xs md:text-sm font-semibold leading-tight">
                  {t.title}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#gestao-contato"
            className="inline-flex items-center gap-2 bg-primary text-primary-light px-6 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-primary-dark transition-colors"
          >
            Fale comigo e comece hoje
            <Rocket className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ========== COMO FAZEMOS ==========
function HowWeDo() {
  type Step = { title: string; body: string; color: string };
  const STEPS: Step[] = [
    {
      title: "Hunting e seleção de creators",
      body:
        "Mapeamos e selecionamos UGC creators alinhados ao perfil da sua marca e do seu público-alvo. Nosso processo de hunting analisa banco de creators e considera dados demográficos, estilo de conteúdo e histórico de performance, garantindo que você tenha creators autênticos e engajados pra gerar conexão real e aumentar resultados digitais.",
      color: "bg-primary-light text-foreground border-primary/30",
    },
    {
      title: "Briefing co-criado com a marca",
      body:
        "Alinhamos tom, objetivos e KPIs antes de qualquer câmera ligar. O briefing é construído junto com o time da marca pra o criativo nascer já validado.",
      color: "bg-foreground text-background border-foreground",
    },
    {
      title: "Produção de conteúdos autênticos",
      body:
        "Gravação com direção, luz natural, roteiros testados em performance. Cada vídeo pensado pros 3 primeiros segundos segurarem a audiência.",
      color: "bg-primary text-primary-light border-primary",
    },
    {
      title: "Aprovação e ajustes",
      body:
        "Você revisa, ajusta e recebe o material nos formatos certos pra cada plataforma (9:16, 1:1, 16:9) + relatório dos primeiros dias rodando.",
      color: "bg-background border-foreground/15 text-foreground",
    },
  ];

  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="bg-background py-14 md:py-20">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-3xl md:text-5xl leading-[0.95] tracking-tighter text-foreground text-center">
          COMO{" "}
          <span className="font-serif-accent italic text-primary">
            fazemos acontecer
          </span>
        </h2>
        <p className="mt-4 text-center text-foreground-soft text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Diferentes canais, objetivos distintos, a mesma qualidade, respeito
          e resultados cada vez melhores. Escolha o canal de mídia paga, a
          Lara cuida do resto.
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
                  <span className="font-display font-black text-sm md:text-base tracking-wide uppercase">
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
                      <div className="px-5 md:px-6 pb-5 md:pb-6 text-sm leading-relaxed opacity-90">
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

// ========== CASES (3 cards) ==========
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
      headline: "+100M views e +30% em engajamento",
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
      headline: "+30M views e +30K seguidores em 6 meses",
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
      body: "Construímos uma comunidade UGC no TikTok com conteúdo autêntico — sem investir 1 real em ads.",
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
    <section className="bg-primary-light py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-3xl md:text-5xl leading-[0.95] tracking-tighter text-foreground text-center">
          CASES COM UGC:{" "}
          <span className="font-serif-accent italic text-primary">
            a gente faz acontecer!
          </span>
        </h2>
        <p className="mt-4 text-center text-foreground-soft text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Descubra como marcas como <b>InfinitePay</b>, <b>Méliuz</b> e{" "}
          <b>Cygnuss</b> aumentaram engajamento, seguidores e vendas com
          estratégias de UGC creators no TikTok e Instagram.
        </p>

        {/* Desktop: 3 cards; Mobile: carrossel */}
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
              className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-muted tabular-nums">
              {String(idx + 1).padStart(2, "0")}/
              {String(CASES.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => setIdx((i) => (i + 1) % CASES.length)}
              className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center"
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
      className="rounded-3xl bg-foreground text-background p-6 md:p-7 flex flex-col gap-4"
    >
      <div className="text-center font-display font-black text-lg md:text-xl tracking-tight border-b border-background/15 pb-4">
        {c.brand}
      </div>
      <div className="font-display font-black text-primary text-base md:text-lg leading-tight tracking-tight text-center">
        {c.headline}
      </div>
      <p className="text-xs md:text-sm text-background/70 leading-relaxed text-center">
        {c.body}
      </p>
      <div className="text-[10px] uppercase tracking-wider text-center text-background/60 mt-1">
        resultado:
      </div>
      <div className="grid grid-cols-2 gap-2">
        {c.stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-primary/40 bg-background/5 px-3 py-2.5 text-center"
          >
            <div className="font-display font-black text-primary text-base md:text-lg tabular-nums leading-none">
              {s.value}
            </div>
            <div className="text-[9px] md:text-[10px] uppercase tracking-wider text-background/60 mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>
      {c.footnote && (
        <div className="text-[10px] text-center text-background/60 border-t border-background/10 pt-3">
          {c.footnote}
        </div>
      )}
      <a
        href="#gestao-contato"
        className="mt-2 inline-flex items-center justify-center gap-2 bg-primary text-primary-light px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-primary-dark transition-colors"
      >
        Falar com a Lara
        <Rocket className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  );
}

// ========== SCALE / TTCX ==========
function ScaleSection() {
  return (
    <section className="relative bg-foreground text-background py-14 md:py-20 overflow-hidden">
      {/* Formas decorativas */}
      <svg
        viewBox="0 0 1200 400"
        className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
        aria-hidden
      >
        <path
          d="M 100 -50 L 350 250"
          stroke="var(--primary)"
          strokeWidth="50"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />
        <path
          d="M 600 -50 L 900 350"
          stroke="var(--primary)"
          strokeWidth="50"
          strokeOpacity="0.3"
          strokeLinecap="round"
        />
        <path
          d="M 950 100 L 1250 450"
          stroke="var(--primary-light)"
          strokeWidth="30"
          strokeOpacity="0.2"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">
            #TTCX
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl leading-[0.95] tracking-tighter mb-4">
            TikTok Creative Exchange
          </h2>
          <p className="text-xs md:text-sm text-background/70 leading-relaxed mb-6">
            Como parceira na fase beta do <b>TTCX</b>, fui treinada pra
            potencializar os resultados das marcas nas plataformas. A
            parceria foi fundamental pra construirmos um Banco de Creators,
            que já conta com mais de 500 vídeos produzidos e uma forma de
            pensar conteúdo TikTok-first. Isso garante velocidade na
            produção, testes em escala e conteúdos nativos que realmente
            performam.
          </p>
          <a
            href="#gestao-contato"
            className="inline-flex items-center gap-2 bg-primary text-primary-light px-5 py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-primary-dark transition-colors"
          >
            Falar com a Lara
            <Rocket className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="text-center md:text-left">
          <div className="font-display font-black text-6xl md:text-8xl text-primary leading-none tracking-tighter">
            +500
          </div>
          <div className="mt-3 font-display font-black text-primary-light text-xl md:text-3xl leading-tight tracking-tight uppercase">
            vídeos UGC
            <br />
            produção em escala
          </div>
        </div>
      </div>
    </section>
  );
}

// ========== FAQ ==========
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
    <section className="bg-background py-14 md:py-20">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-3xl md:text-4xl leading-[0.95] tracking-tighter text-foreground text-center mb-10">
          DÚVIDAS FREQUENTES SOBRE{" "}
          <span className="font-serif-accent italic text-primary">
            criação de conteúdo UGC
          </span>
        </h2>

        <div className="space-y-3">
          {ITEMS.map((item, i) => {
            const isOpen = i === openIdx;
            return (
              <div
                key={item.q}
                className="rounded-2xl border border-foreground/15 overflow-hidden bg-background"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 text-left"
                >
                  <span className="text-sm md:text-base font-medium text-foreground">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-foreground/50 flex-shrink-0 transition-transform ${
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
                      <div className="px-5 md:px-6 pb-5 text-xs md:text-sm text-foreground-soft leading-relaxed">
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

// ========== FINAL CTA + CONTACT ==========
function FinalCTA() {
  return (
    <section className="bg-background py-14 md:py-20">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <h2 className="font-display font-black text-3xl md:text-5xl leading-[0.95] tracking-tighter text-foreground">
          SEU PRÓXIMO{" "}
          <span className="font-serif-accent italic text-primary">
            case de sucesso
          </span>{" "}
          COMEÇA AQUI.
        </h2>
        <p className="mt-4 text-foreground-soft text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Integro estratégia, creators e produção <b>end-to-end</b>, do
          briefing à biblioteca de UGC pronta pra orgânico e mídia. Quer
          construir um case de sucesso, otimizar resultados ou fazer
          TikTok/Reels com cara de TikTok/Reels?
        </p>
        <a
          href="#gestao-contato"
          className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-light px-6 py-3.5 rounded-full text-sm md:text-base font-bold uppercase tracking-wider hover:bg-primary-dark transition-colors"
        >
          Fale com a Lara e comece hoje
          <Rocket className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}

// ========== CONTACT FORM (dark) ==========
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
      className="relative bg-foreground text-background py-16 md:py-24 overflow-hidden"
    >
      {/* balõezinhos decorativos */}
      <div className="absolute top-12 left-6 text-6xl md:text-8xl opacity-30 pointer-events-none rotate-12">
        🎈
      </div>
      <div className="absolute bottom-12 right-6 text-6xl md:text-8xl opacity-30 pointer-events-none -rotate-12">
        🎈
      </div>
      <div className="absolute top-1/2 left-1/4 text-4xl opacity-20 pointer-events-none">
        ✦
      </div>

      <div className="relative max-w-2xl mx-auto px-6 md:px-12">
        <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary font-bold text-center mb-3">
          #contato
        </div>
        <h2 className="font-display font-black text-3xl md:text-5xl leading-[0.95] tracking-tighter text-center text-background">
          FALE COMIGO PARA FAZER UM{" "}
          <span className="font-serif-accent italic text-primary">
            diagnóstico
          </span>{" "}
          OU RECEBER ORÇAMENTO!
        </h2>

        {sent ? (
          <div className="mt-10 p-8 rounded-3xl bg-background/5 border border-background/10 text-center">
            <div className="text-5xl mb-4">🚀</div>
            <div className="font-display font-black text-xl mb-2">Enviado!</div>
            <div className="text-background/60 text-sm">
              Entro em contato em até 48h.
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-10 space-y-5">
            {/* Step indicator */}
            <div className="flex items-center gap-3 justify-center mb-6">
              <StepDot n={1} active={step >= 1} />
              <div className="h-px flex-1 max-w-[180px] bg-background/20" />
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
                    className="inline-flex items-center gap-2 bg-primary text-primary-light px-7 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-primary-dark transition-colors"
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
                  <label className="block text-[11px] uppercase tracking-wider text-background/60 mb-2">
                    Conta sobre o projeto
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    onChange={(e) => setData((d) => ({ ...d, message: e.target.value }))}
                    className="w-full bg-background/5 border border-background/15 rounded-2xl px-4 py-3 text-background placeholder:text-background/30 focus:outline-none focus:border-primary transition-colors text-sm resize-none"
                    placeholder="Prazo, categoria, objetivo da campanha..."
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs uppercase tracking-wider text-background/60 hover:text-background"
                  >
                    ← Voltar
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-primary text-primary-light px-7 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-primary-dark transition-colors"
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
          ? "bg-primary text-primary-light border-primary"
          : "bg-background/5 text-background/50 border-background/20"
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
      <label className="block text-[11px] uppercase tracking-wider text-background/60 mb-2">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full bg-background/5 border border-background/15 rounded-2xl px-4 py-3 text-background placeholder:text-background/30 focus:outline-none focus:border-primary transition-colors text-sm"
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
      <label className="block text-[11px] uppercase tracking-wider text-background/60 mb-2">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <select
        name={name}
        required={required}
        onChange={onChange}
        defaultValue=""
        className="w-full bg-background/5 border border-background/15 rounded-2xl px-4 py-3 text-background focus:outline-none focus:border-primary transition-colors text-sm appearance-none"
      >
        <option value="" disabled>
          Selecione…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-foreground">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

// ========== EXPORT ==========
export default function Gestao() {
  return (
    <>
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
    </>
  );
}
