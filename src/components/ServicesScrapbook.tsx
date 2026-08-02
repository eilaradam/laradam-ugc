"use client";

import { motion } from "framer-motion";

// Serviços "o que podemos criar juntos" — estética scrapbook/colagem
// (referência do print), adaptada pras cores da marca: branco + laranja.
const SERVICES = [
  {
    label: "Criativos para Tráfego",
    body: "Ads otimizados pra Meta, TikTok e YouTube, pensados pra converter de verdade e baixar seu CPA.",
  },
  {
    label: "UGC para E-commerce",
    body: "Vídeos autênticos de produto pra sua loja vender todo dia, com a naturalidade de quem realmente usa.",
  },
  {
    label: "Publi Post",
    body: "Publieditorial no meu perfil: a sua marca com a minha cara, alcançando uma audiência que confia em mim.",
  },
  {
    label: "Gestão em Escala",
    body: "Campanhas com vários creators, do briefing à entrega, pra escalar seu conteúdo sem dor de cabeça.",
  },
];

const ORANGE = "#C8441A";
const INK = "#1b1b1b";

// Washi tape: faixa inclinada com o texto repetido
function Tape({
  text,
  variant,
  rotate,
  top,
  z,
}: {
  text: string;
  variant: "orange" | "white";
  rotate: number;
  top: string;
  z: number;
}) {
  const repeated = Array.from({ length: 14 }, () => text);
  const isOrange = variant === "orange";
  return (
    <div
      aria-hidden
      className="absolute left-1/2 w-[160%] py-1.5 overflow-hidden shadow-sm"
      style={{
        top,
        zIndex: z,
        backgroundColor: isOrange ? ORANGE : "#ffffff",
        border: isOrange ? "none" : `1px solid ${ORANGE}33`,
        transform: `translateX(-50%) rotate(${rotate}deg)`,
      }}
    >
      <div className="flex gap-6 whitespace-nowrap">
        {repeated.map((t, i) => (
          <span
            key={i}
            className="font-serif-accent italic text-[13px] md:text-sm"
            style={{ color: isOrange ? "#fff" : ORANGE }}
          >
            {t} <span className="not-italic mx-1">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function BinderClip() {
  return (
    <svg viewBox="0 0 90 90" className="w-14 h-14 md:w-16 md:h-16" aria-hidden>
      <path
        d="M30 40 L26 16 Q26 11 31 11 L59 11 Q64 11 64 16 L60 40"
        fill="none"
        stroke={INK}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M37 40 L34 20 Q34 17 37 17 L53 17 Q56 17 56 20 L53 40"
        fill="none"
        stroke={INK}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect
        x="18"
        y="38"
        width="54"
        height="34"
        rx="3"
        fill={ORANGE}
        stroke={INK}
        strokeWidth="2.5"
      />
      <line x1="27" y1="38" x2="27" y2="72" stroke={INK} strokeWidth="2" />
      <line x1="63" y1="38" x2="63" y2="72" stroke={INK} strokeWidth="2" />
    </svg>
  );
}

export default function ServicesScrapbook() {
  return (
    <section
      id="servicos"
      className="relative bg-[#FBF9F6] px-6 md:px-12 pt-24 md:pt-28 pb-16 md:pb-24 overflow-hidden"
    >
      {/* Washi tape cruzada no topo */}
      <Tape text="@eilaradam • ugc creator" variant="white" rotate={-5} top="26px" z={1} />
      <Tape text="ugc creator • @eilaradam" variant="orange" rotate={4} top="46px" z={2} />
      {/* Selo estrela na direita */}
      <div
        aria-hidden
        className="absolute right-[8%] top-[10px] z-[3] w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-[3px]"
        style={{ backgroundColor: ORANGE, borderColor: INK }}
      >
        <span className="text-2xl md:text-3xl text-white">★</span>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center mt-8 md:mt-10">
        {/* Esquerda — clipe + título + texto + cta */}
        <div className="relative">
          <div className="mb-2">
            <BinderClip />
          </div>
          <h2 className="font-serif-accent text-foreground text-4xl md:text-5xl leading-[1.05]">
            <span className="italic">O que podemos</span>{" "}
            <span
              className="italic px-2 box-decoration-clone text-white"
              style={{ backgroundColor: ORANGE }}
            >
              criar
            </span>{" "}
            <span className="font-display font-black not-italic block mt-1">
              juntos?
            </span>
          </h2>

          <p className="mt-6 md:mt-8 text-foreground-soft text-base md:text-lg leading-relaxed max-w-md">
            Cada formato tem um objetivo: vender, escalar ou construir marca. Me
            conta o seu que a gente monta o combo perfeito pra sua marca.
          </p>

          <a
            href="#contato"
            className="mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm md:text-base font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: ORANGE }}
          >
            Bora criar juntos →
          </a>
        </div>

        {/* Direita — 2x2 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 md:gap-y-12">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
              className="relative rounded-2xl border bg-white px-5 pt-8 pb-6"
              style={{ borderColor: "#e5ddd4" }}
            >
              {/* Pílula do título, montada sobre a borda de cima */}
              <span
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1.5 text-[11px] md:text-xs font-bold uppercase tracking-wide text-white border-[1.5px]"
                style={{ backgroundColor: ORANGE, borderColor: INK }}
              >
                {s.label}
              </span>
              <p className="text-sm md:text-[15px] text-foreground-soft leading-relaxed text-justify">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
