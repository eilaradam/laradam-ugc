"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { SERVICES } from "@/data/content";
import { DESTAQUES, NICHOS, SITE, STATS, TESTIMONIALS, Thumb, whats } from "@/components/novo/dados";

// Portfólio na identidade visual da Lara (Painel de Identidade Visual, out/2026):
// vinho + chartreuse + creme, "LARA" condensado + "Dam" itálico, flor de 8 pétalas,
// anotações em Caveat, adesivos e pontilhado. Referências: Mira Tan, Theo Wilder, PLM.
const VINHO = "#860200";
const MARROM = "#4D1400";
const MAGENTA = "#87003A";
const LIMA = "#AAB700";
const CREME = "#F1E5C5";
const PAPEL = "#F8F0DD";
const BEGE = "#DEB992";

const titulo = "font-[family-name:var(--lr-titulo)] uppercase";
const italico = "font-[family-name:var(--lr-italico)] italic";
const mao = "font-[family-name:var(--pf-mao)]";

export function Flor({ cor = LIMA, className = "" }: { cor?: string; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={i} cx="50" cy="27" rx="12.5" ry="24" fill={cor} transform={`rotate(${i * 45} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="14" fill={cor} />
    </svg>
  );
}

// Seta desenhada à mão, igual às anotações do painel
function Seta({ className = "", cor = MARROM }: { className?: string; cor?: string }) {
  return (
    <svg viewBox="0 0 80 60" className={className} fill="none" stroke={cor} strokeWidth="2.5" strokeLinecap="round" aria-hidden>
      <path d="M5 8 C 30 4, 55 18, 62 48" />
      <path d="M50 40 L 62 50 L 70 36" />
    </svg>
  );
}

const pontilhado = { backgroundImage: `radial-gradient(${MARROM}1f 1.2px, transparent 1.3px)`, backgroundSize: "14px 14px" };

function Faixa({ itens, fundo = VINHO, cor = LIMA }: { itens: string[]; fundo?: string; cor?: string }) {
  return (
    <div className="overflow-hidden py-3.5 -rotate-1 scale-[1.02]" style={{ background: fundo }}>
      <div className="marquee-slow items-center">
        {[0, 1].map((k) => (
          <span key={k} className="flex items-center gap-6 pr-6">
            {itens.map((t) => (
              <span key={t} className={`flex items-center gap-6 ${titulo} text-xl md:text-2xl`} style={{ color: cor }}>
                {t} <Flor cor={cor} className="w-5 h-5" />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

function Etiqueta({ children, cor = LIMA, texto = MARROM, rot = -2 }: { children: React.ReactNode; cor?: string; texto?: string; rot?: number }) {
  return (
    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.15em] shadow-sm" style={{ background: cor, color: texto, transform: `rotate(${rot}deg)` }}>
      {children}
    </span>
  );
}

const CORES_CARD = [
  { fundo: LIMA, texto: MARROM },
  { fundo: VINHO, texto: CREME },
  { fundo: BEGE, texto: MARROM },
  { fundo: MAGENTA, texto: CREME },
  { fundo: MARROM, texto: CREME },
];

export default function PortfolioLara() {
  return (
    <div className="min-h-screen font-sans" style={{ background: CREME, color: MARROM }}>
      {/* menu em pílula */}
      <header className="sticky top-3 z-40 px-3 md:px-6">
        <nav className="max-w-6xl mx-auto flex items-center justify-between rounded-full pl-4 pr-1.5 py-1.5 shadow-lg" style={{ background: MARROM, color: CREME }}>
          <a href="#top" className="flex items-center gap-2">
            <Flor className="w-6 h-6" />
            <span className={`${titulo} text-lg tracking-wide`}>Lara <span className={`${italico} normal-case`}>Dam</span></span>
          </a>
          <div className="hidden md:flex gap-7 text-sm">
            <a href="#destaques" className="hover:opacity-70">Destaques</a>
            <a href="#sobre" className="hover:opacity-70">Sobre</a>
            <a href="#trabalhos" className="hover:opacity-70">Trabalhos</a>
            <a href="#servicos" className="hover:opacity-70">Serviços</a>
          </div>
          <a href={whats()} className="rounded-full px-4 md:px-5 py-2 text-sm font-bold" style={{ background: LIMA, color: MARROM }}>Bora conversar</a>
        </nav>
      </header>

      {/* CAPA: nome à esquerda, foto recortada à direita */}
      <section id="top" className="relative -mt-14 pt-24 md:pt-20 overflow-hidden" style={pontilhado}>
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-[1.1fr_1fr] gap-6 items-center min-h-[min(820px,100svh)]">
          <div className="relative z-10">
            <p className="text-[11px] md:text-xs font-bold uppercase tracking-[0.3em]">UGC Creator · Estratégia · Resultados</p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mt-4 leading-[0.82]" style={{ color: VINHO }}>
              <span className={`${titulo} block text-[30vw] md:text-[12rem]`}>Lara</span>
              <span className="flex items-center gap-3">
                <span className={`${italico} block text-[24vw] md:text-[9.5rem] font-black -mt-2`}>Dam</span>
                <motion.span initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ delay: 0.4, type: "spring", stiffness: 120 }}>
                  <Flor className="w-20 md:w-32 h-20 md:h-32" />
                </motion.span>
              </span>
            </motion.h1>
            <p className="mt-6 text-lg md:text-xl max-w-md leading-relaxed">Vídeos com cara de gente de verdade, pensados do gancho ao CTA pra fazer a sua marca <b style={{ color: VINHO }}>vender</b>.</p>
            <div className="relative mt-8 flex flex-wrap items-center gap-3">
              <a href={whats()} className="inline-flex items-center gap-2 rounded-full px-7 py-4 font-bold text-white shadow-[4px_4px_0_#4D1400]" style={{ background: VINHO }}>Quero criar com a Lara <ArrowRight className="w-4 h-4" /></a>
              <a href="#trabalhos" className="rounded-full px-6 py-4 font-bold border-2" style={{ borderColor: MARROM }}>Ver trabalhos</a>
            </div>
          </div>

          <div className="relative h-[480px] md:h-[680px]">
            <Flor cor={LIMA} className="flor-gira absolute left-[46%] top-[34%] -translate-x-1/2 -translate-y-1/2 w-[105%] max-w-[560px]" />
            <motion.img
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9 }}
              src="/ensaio/capa-caixa-rosto.webp" alt="Lara Dam segurando uma caixa" fetchPriority="high"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-none object-contain drop-shadow-[0_20px_30px_rgba(77,20,0,0.25)]"
            />
            {/* adesivos */}
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: -8 }} transition={{ delay: 0.7, type: "spring" }} className="absolute left-0 md:-left-6 top-[18%] rounded-2xl px-4 py-3 shadow-xl" style={{ background: VINHO, color: CREME }}>
              <div className={`${titulo} text-3xl leading-none`} style={{ color: LIMA }}>100M</div>
              <div className="text-xs mt-1">views em 1 vídeo</div>
            </motion.div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 6 }} transition={{ delay: 0.85, type: "spring" }} className="absolute right-0 top-[8%] rounded-full w-28 h-28 flex flex-col items-center justify-center text-center shadow-xl" style={{ background: MAGENTA, color: CREME }}>
              <span className={`${titulo} text-3xl leading-none`}>300+</span>
              <span className="text-[11px] font-bold uppercase tracking-wider">marcas</span>
            </motion.div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: -3 }} transition={{ delay: 1, type: "spring" }} className="absolute right-2 bottom-[16%] rounded-xl px-3 py-2 bg-white shadow-xl text-sm font-bold">
              ⭐ Recorde de CTR no Meta
            </motion.div>
            <div className="hidden md:flex absolute -left-16 bottom-[30%] items-start gap-1">
              <span className={`${mao} text-2xl leading-tight rotate-[-8deg]`} style={{ color: VINHO }}>oi! essa<br />sou eu ;)</span>
              <Seta className="w-16 h-12 mt-6" cor={VINHO} />
            </div>
          </div>
        </div>
      </section>

      <Faixa itens={["UGC de conversão", "Roteiro estratégico", "Criativos pra tráfego", "Fotos lifestyle", "Gancho que prende"]} />

      {/* números */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((s, i) => (
          <div key={s.label} className="text-center">
            <div className={`${titulo} text-6xl md:text-7xl`} style={{ color: i % 2 ? MAGENTA : VINHO }}>{s.value}</div>
            <div className="text-sm font-semibold uppercase tracking-wider mt-1">{s.label}</div>
          </div>
        ))}
      </section>

      {/* DESTAQUES: cards inclinados, como na referência Mira Tan */}
      <section id="destaques" className="py-16 md:py-20" style={{ background: PAPEL }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="text-center">
            <Etiqueta cor={VINHO} texto={CREME}>Destaques</Etiqueta>
            <h2 className="mt-4 leading-[0.9]" style={{ color: VINHO }}>
              <span className={`${titulo} text-5xl md:text-7xl`}>Os vídeos que </span>
              <span className={`${italico} text-5xl md:text-7xl font-black`}>mais venderam</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 mt-14 max-w-4xl mx-auto">
            {DESTAQUES.map((v, i) => {
              const t = TESTIMONIALS.find((x) => x.brand === v.brand);
              const rot = [-5, 2, 6][i];
              return (
                <motion.div key={v.id} whileHover={{ rotate: 0, y: -8 }} style={{ rotate: rot }} className="relative">
                  <Thumb v={v} className="aspect-[9/16] w-full max-w-[280px] mx-auto rounded-3xl border-[6px] border-white shadow-2xl">
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-14 h-14 rounded-full flex items-center justify-center bg-white/90"><Play className="w-6 h-6 ml-1" style={{ color: VINHO, fill: VINHO }} /></span>
                    </span>
                  </Thumb>
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-2xl px-4 py-2 text-center shadow-lg whitespace-nowrap" style={{ background: CORES_CARD[i].fundo, color: CORES_CARD[i].texto, rotate: `${-rot}deg` }}>
                    <div className={`${titulo} text-2xl leading-none`}>{v.views} views</div>
                    <div className="text-xs font-semibold">{v.brand}{t?.metric ? ` · ${t.metric.label}` : ""}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SOBRE: polaroid + anotações à mão */}
      <section id="sobre" className="max-w-6xl mx-auto px-5 md:px-8 py-20 grid md:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
        <div className="relative max-w-sm mx-auto">
          <div className="bg-white p-3 pb-14 shadow-2xl rotate-[-4deg]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ensaio/gal-sorriso.webp" alt="Lara Dam sorrindo" className="w-full aspect-[4/5] object-cover" />
            <span className={`${mao} absolute bottom-3 left-0 right-0 text-center text-2xl`} style={{ color: MARROM }}>litoral de SP ☀️</span>
          </div>
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-8 rotate-[3deg] opacity-80" style={{ background: BEGE }} />
          <Flor cor={MAGENTA} className="absolute -right-6 -bottom-6 w-20 h-20 rotate-12" />
        </div>
        <div>
          <Etiqueta>Prazer!</Etiqueta>
          <h2 className="mt-4 leading-[0.9]" style={{ color: VINHO }}>
            <span className={`${titulo} text-5xl md:text-7xl block`}>Oie, eu sou</span>
            <span className={`${italico} text-6xl md:text-8xl font-black`}>a Lara</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed">Tenho 27 anos e sou UGC creator e estrategista de conteúdo. Em 3 anos foram mais de 500 vídeos e 300 marcas. Eu penso o roteiro como estrategista, gravo como gente comum e edito pra o vídeo rodar como anúncio.</p>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[["🎯", "Estratégia", "começo pelo porquê do produto"], ["🎬", "Autêntica", "conteúdo com cara de gente"], ["📈", "Resultado", "feito pra rodar e vender"]].map(([e, t, d]) => (
              <div key={t} className="rounded-2xl p-4 border-2 border-dashed" style={{ borderColor: `${MARROM}40` }}>
                <div className="text-3xl">{e}</div>
                <div className={`${titulo} text-xl mt-2`} style={{ color: VINHO }}>{t}</div>
                <div className="text-xs mt-1 opacity-80">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* marcas */}
      <section className="py-10 border-y-2 border-dashed" style={{ borderColor: `${MARROM}30` }}>
        <p className={`${mao} text-center text-2xl`} style={{ color: VINHO }}>marcas que já confiaram ♥</p>
        <div className="overflow-hidden mt-5">
          <div className="marquee-slow items-center">
            {[0, 1].map((k) => (
              <span key={k} className="flex items-center gap-4 pr-4">
                {Array.from({ length: 30 }, (_, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={`/logo-1/${i + 1}.png`} alt="" loading="lazy" className="w-20 h-20 rounded-full bg-white object-contain p-3 shadow-sm" />
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TRABALHOS: fileiras por nicho */}
      <section id="trabalhos" className="py-20">
        <div className="max-w-6xl mx-auto px-5 md:px-8 text-center">
          <Etiqueta cor={MAGENTA} texto={CREME} rot={2}>Portfólio</Etiqueta>
          <h2 className="mt-4 leading-[0.9]" style={{ color: VINHO }}>
            <span className={`${titulo} text-5xl md:text-7xl`}>Escolha o seu </span>
            <span className={`${italico} text-5xl md:text-7xl font-black`}>nicho</span>
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {NICHOS.map((n, i) => (
              <a key={n.slug} href={`#n-${n.slug}`} className="rounded-full px-4 py-2 text-sm font-bold hover:-translate-y-0.5 transition-transform" style={{ background: CORES_CARD[i % 5].fundo, color: CORES_CARD[i % 5].texto }}>{n.name}</a>
            ))}
          </div>
        </div>
        {NICHOS.map((n, i) => (
          <div key={n.slug} id={`n-${n.slug}`} className="mt-14 scroll-mt-24">
            <div className="max-w-6xl mx-auto px-5 md:px-8 flex items-center gap-3">
              <Flor cor={CORES_CARD[i % 5].fundo} className="w-8 h-8" />
              <h3 className={`${titulo} text-3xl md:text-4xl`} style={{ color: VINHO }}>{n.name}</h3>
              <span className={`${mao} text-xl hidden md:inline`} style={{ color: MAGENTA }}>{n.tagline.toLowerCase()}</span>
            </div>
            <div className="mt-4 flex gap-4 overflow-x-auto px-5 md:px-[max(2rem,calc((100vw-72rem)/2+2rem))] pb-4 snap-x [scrollbar-width:none]">
              {n.videos.map((v) => (
                <Thumb key={v.id} v={v} className="snap-start shrink-0 w-40 md:w-48 aspect-[9/16] rounded-2xl border-4 border-white shadow-lg hover:-rotate-2 transition-transform">
                  <span className="absolute top-2 left-2 rounded-full px-2.5 py-1 text-[11px] font-bold shadow" style={{ background: CREME, color: MARROM }}>{v.brand}</span>
                  <span className="absolute bottom-2 right-2 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: VINHO }}><Play className="w-4 h-4 ml-0.5 text-white fill-white" /></span>
                </Thumb>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* SERVIÇOS: cards coloridos numerados */}
      <section id="servicos" className="py-20" style={{ background: PAPEL }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="text-center">
            <Etiqueta>Serviços</Etiqueta>
            <h2 className="mt-4 leading-[0.9]" style={{ color: VINHO }}>
              <span className={`${titulo} text-5xl md:text-7xl`}>Como a gente pode </span>
              <span className={`${italico} text-5xl md:text-7xl font-black`}>criar junto</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-12">
            {SERVICES.slice(0, 5).map((s, i) => (
              <div key={s.title} className="rounded-3xl p-6 min-h-[220px] flex flex-col justify-between hover:-translate-y-1 hover:rotate-1 transition-transform" style={{ background: CORES_CARD[i].fundo, color: CORES_CARD[i].texto }}>
                <span className={`${titulo} text-4xl opacity-90`}>0{i + 1}</span>
                <div>
                  <h3 className={`${titulo} text-2xl leading-none`}>{s.title}</h3>
                  <p className="text-sm mt-2 opacity-90">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS: faixa vinho */}
      <section className="px-3 md:px-6 py-16">
        <div className="max-w-6xl mx-auto rounded-[2.5rem] px-6 md:px-12 py-12 relative overflow-hidden" style={{ background: VINHO, color: CREME }}>
          <Flor cor={MAGENTA} className="absolute -right-10 -top-10 w-48 h-48 opacity-60" />
          <p className={`${mao} text-3xl relative`} style={{ color: LIMA }}>o que as marcas dizem ♥</p>
          <div className="grid md:grid-cols-3 gap-8 mt-6 relative">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <figure key={t.brand}>
                <blockquote className="text-base leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="mt-4 flex items-center gap-2">
                  <span className={`${titulo} text-xl`} style={{ color: LIMA }}>{t.brand}</span>
                  {t.metric && <span className="text-xs opacity-80">· {t.metric.value} {t.metric.label}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="px-5 md:px-8 pb-16">
        <div className="max-w-3xl mx-auto text-center rounded-[2.5rem] px-6 py-14 relative" style={{ background: MARROM, color: CREME }}>
          <h2 className="leading-[0.9]">
            <span className={`${titulo} text-5xl md:text-7xl block`}>Bora criar algo</span>
            <span className={`${italico} text-5xl md:text-7xl font-black`} style={{ color: LIMA }}>que vende?</span>
          </h2>
          <p className="mt-5 opacity-80">Me conta do seu produto que eu te mando uma ideia de roteiro.</p>
          <a href={whats()} className="inline-flex items-center gap-2 mt-8 rounded-full px-8 py-4 font-bold shadow-[4px_4px_0_#AAB700]" style={{ background: CREME, color: MARROM }}>Chamar no WhatsApp <ArrowRight className="w-4 h-4" /></a>
          <p className="mt-5 text-sm opacity-70">{SITE.email} · {SITE.instagram}</p>
        </div>
      </section>

      {/* rodapé com o nome gigante */}
      <footer className="overflow-hidden pt-10 pb-4" style={{ background: LIMA, color: VINHO }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8 flex flex-wrap justify-between gap-4 text-sm font-semibold">
          <span>UGC Creator · {SITE.location}</span>
          <span className="flex gap-5"><a href={`https://instagram.com/${SITE.instagram.slice(1)}`}>Instagram</a><a href={`https://tiktok.com/${SITE.tiktok}`}>TikTok</a><a href={`mailto:${SITE.email}`}>E-mail</a></span>
        </div>
        <div className="flex items-end justify-center gap-3 mt-6 leading-[0.8]">
          <span className={`${titulo} text-[24vw] md:text-[15rem]`}>Lara</span>
          <span className={`${italico} text-[20vw] md:text-[12rem] font-black`}>Dam</span>
          <Flor cor={VINHO} className="w-[12vw] max-w-[140px] mb-[3vw]" />
        </div>
      </footer>
    </div>
  );
}
