"use client";

import { Heart, MessageCircle, Send, Bookmark, Play } from "lucide-react";
import { DESTAQUES, NICHOS, SITE, STATS, TESTIMONIALS, Thumb, capaDe, whats } from "./dados";

// Direção "Feed": o portfólio inteiro fala a língua do Reels, onde o vídeo da marca vai viver.
const AZUL = "#4C6FFF";
const CREME = "#F4EFE8";

// Moldura de celular com a interface do Reels por cima
function Celular({ children, legenda, className = "" }: { children: React.ReactNode; legenda?: string; className?: string }) {
  return (
    <div className={`relative aspect-[9/19] rounded-[2.4rem] border-[7px] border-[#1a1a1d] bg-black overflow-hidden shadow-2xl ${className}`}>
      {children}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-black z-10" />
      <div className="pointer-events-none absolute right-3 bottom-20 flex flex-col items-center gap-5 text-white z-10">
        <Heart className="w-6 h-6" /><MessageCircle className="w-6 h-6" /><Send className="w-6 h-6" /><Bookmark className="w-6 h-6" />
      </div>
      {legenda && (
        <div className="pointer-events-none absolute left-3 right-14 bottom-5 text-white text-xs z-10">
          <div className="font-bold text-sm">{SITE.instagram}</div>
          <div className="opacity-90 mt-0.5">{legenda}</div>
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />
    </div>
  );
}

export default function PortfolioFeed() {
  return (
    <div className="min-h-screen font-[family-name:var(--fd-corpo)]" style={{ background: "#0B0B0D", color: CREME }}>
      {/* capa: nome à esquerda, celular com a foto à direita */}
      <section className="grid md:grid-cols-[1.2fr_1fr] gap-10 items-center px-5 md:px-12 pt-12 md:pt-20 pb-16 max-w-7xl mx-auto">
        <div>
          <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: AZUL }} /> UGC Creator · {SITE.location}
          </span>
          <h1 className="font-[family-name:var(--fd-titulo)] leading-[0.88] text-[24vw] md:text-[9.5rem] mt-6">
            Lara <em style={{ color: AZUL }}>Dam</em>
          </h1>
          <p className="mt-6 max-w-md text-lg text-white/70">Seu produto do jeito que ele vai aparecer no feed: no meio de vídeos reais, prendendo nos 2 primeiros segundos.</p>
          <div className="mt-8 flex gap-3">
            <a href={whats()} className="px-6 py-3 rounded-full font-semibold text-sm text-white" style={{ background: AZUL }}>Mandar DM</a>
            <a href="#reels" className="px-6 py-3 rounded-full font-semibold text-sm border border-white/20">Ver reels</a>
          </div>
        </div>
        <Celular legenda="oi, prazer! eu transformo produto em desejo ✨" className="w-64 md:w-80 mx-auto md:ml-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/capa/3-cabelo.webp" alt="Lara Dam" className="absolute inset-0 w-full h-full object-cover object-top" />
        </Celular>
      </section>

      {/* perfil = sobre, no formato de cabeçalho do Instagram */}
      <section className="px-5 md:px-12 py-14 max-w-4xl mx-auto">
        <div className="flex items-center gap-6 md:gap-10">
          <div className="shrink-0 w-24 h-24 md:w-36 md:h-36 rounded-full p-[3px]" style={{ background: `conic-gradient(${AZUL}, #B9A6FF, ${AZUL})` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/capa/1-sorriso.webp" alt="" className="w-full h-full rounded-full object-cover object-top border-4 border-[#0B0B0D]" />
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-bold">{s.value}</div>
                <div className="text-xs text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-6 text-white/80 leading-relaxed"><b>Lara Dam</b> · 27 anos · estrategista de conteúdo. Penso o roteiro, gravo com cara de gente e edito pra rodar como anúncio. Marcas como InfinitePay, Méliuz, Airbnb e L&apos;Oréal.</p>
        {/* stories = atalhos pros nichos */}
        <div className="flex gap-4 overflow-x-auto mt-8 pb-2 [scrollbar-width:none]">
          {NICHOS.map((n) => (
            <a key={n.slug} href={`#${n.slug}`} className="shrink-0 w-20 text-center">
              <span className="block w-20 h-20 rounded-full p-[2px]" style={{ background: AZUL }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={capaDe(n.videos[0])} alt="" loading="lazy" className="w-full h-full rounded-full object-cover border-4 border-[#0B0B0D]" />
              </span>
              <span className="block text-[11px] mt-1.5 text-white/80 truncate">{n.name}</span>
            </a>
          ))}
        </div>
      </section>

      {/* destaques em celulares */}
      <section id="reels" className="px-5 md:px-12 py-16 max-w-7xl mx-auto">
        <h2 className="font-[family-name:var(--fd-titulo)] text-5xl md:text-7xl">Os que mais <em style={{ color: AZUL }}>rodaram</em></h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
          {DESTAQUES.map((v) => (
            <div key={v.id}>
              <Celular legenda={`${v.brand} · ${v.views ?? ""} views`} className="w-64 mx-auto">
                <Thumb v={v} className="absolute inset-0 w-full h-full">
                  <span className="absolute inset-0 flex items-center justify-center"><Play className="w-14 h-14 text-white/90 fill-white/90 drop-shadow" /></span>
                </Thumb>
              </Celular>
              <p className="text-center mt-4 font-[family-name:var(--fd-titulo)] text-4xl">{v.views} <span className="text-base font-[family-name:var(--fd-corpo)] text-white/60">views</span></p>
            </div>
          ))}
        </div>
      </section>

      {/* grade por nicho, como a aba de reels do perfil */}
      <section className="py-10">
        {NICHOS.map((n) => (
          <div key={n.slug} id={n.slug} className="mt-12 scroll-mt-6">
            <div className="px-5 md:px-12 max-w-7xl mx-auto flex items-baseline gap-3">
              <h3 className="font-[family-name:var(--fd-titulo)] text-4xl">{n.name}</h3>
              <span className="text-sm text-white/50">{n.tagline}</span>
            </div>
            <div className="mt-4 flex gap-1.5 overflow-x-auto px-5 md:px-12 pb-2 snap-x [scrollbar-width:none]">
              {n.videos.map((v) => (
                <Thumb key={v.id} v={v} className="snap-start shrink-0 w-36 md:w-48 aspect-[9/16] bg-black">
                  <span className="absolute bottom-2 left-2 flex items-center gap-1 text-xs font-semibold text-white drop-shadow"><Play className="w-3.5 h-3.5 fill-white" />{v.brand}</span>
                </Thumb>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* comentários = depoimentos */}
      <section className="px-5 md:px-12 py-16 max-w-3xl mx-auto">
        <h2 className="font-[family-name:var(--fd-titulo)] text-5xl">Comentários</h2>
        <div className="mt-8 space-y-6">
          {TESTIMONIALS.slice(0, 4).map((t) => (
            <div key={t.brand} className="flex gap-3">
              <span className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: AZUL }}>{t.brand[0]}</span>
              <div>
                <span className="font-bold text-sm">{t.instagram ?? t.brand}</span> <span className="text-sm text-white/80">{t.quote}</span>
                {t.metric && <div className="text-xs text-white/50 mt-1">{t.metric.value} {t.metric.label}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* contato em formato de DM */}
      <section className="px-5 md:px-12 py-20 max-w-xl mx-auto">
        <div className="rounded-3xl border border-white/10 p-6 space-y-3">
          <div className="w-fit max-w-[80%] rounded-2xl rounded-bl-sm bg-white/10 px-4 py-2.5 text-sm">oi! vi seu portfólio 👀</div>
          <div className="w-fit max-w-[80%] rounded-2xl rounded-bl-sm bg-white/10 px-4 py-2.5 text-sm">quero um vídeo assim pra minha marca</div>
          <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm px-4 py-2.5 text-sm text-white" style={{ background: AZUL }}>bora! me conta do produto ✨</div>
          <a href={whats()} className="block text-center mt-6 py-3.5 rounded-full font-semibold text-white" style={{ background: AZUL }}>Enviar mensagem</a>
        </div>
        <p className="text-center mt-4 text-sm text-white/50">{SITE.email} · {SITE.instagram}</p>
      </section>
    </div>
  );
}
