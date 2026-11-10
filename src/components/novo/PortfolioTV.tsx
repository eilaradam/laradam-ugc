"use client";

import { DESTAQUES, NICHOS, SITE, STATS, TESTIMONIALS, Thumb, whats } from "./dados";

// Direção "Canal de TV": cada nicho é um canal, os destaques são o horário nobre.
const VERMELHO = "#FF3B30";
const CREME = "#F3EDE4";

export default function PortfolioTV() {
  return (
    <div className="min-h-screen font-[family-name:var(--tv-corpo)]" style={{ background: "#0D0D0F", color: CREME }}>
      {/* barra do canal */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-10 h-14 border-b border-white/10 bg-[#0D0D0F]/90 backdrop-blur">
        <div className="font-[family-name:var(--tv-titulo)] text-xl tracking-wide">LARA DAM <span style={{ color: VERMELHO }}>TV</span></div>
        <nav className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] text-white/60">
          <a href="#nobre" className="hover:text-white">Horário nobre</a>
          <a href="#grade" className="hover:text-white">Programação</a>
          <a href="#bastidores" className="hover:text-white">Bastidores</a>
        </nav>
        <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em]">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: VERMELHO }} /> No ar
        </span>
      </header>

      {/* capa: nome à esquerda, foto à direita (dentro da "tela") */}
      <section className="grid md:grid-cols-[1.1fr_1fr] gap-10 items-center px-4 md:px-10 pt-10 md:pt-16 pb-14 max-w-7xl mx-auto">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-white/50">CANAL 01 · UGC CREATOR · LITORAL DE SP</p>
          <h1 className="font-[family-name:var(--tv-titulo)] uppercase leading-[0.95] mt-4 text-[22vw] md:text-[10rem]">
            Lara<br />Dam
          </h1>
          <p className="mt-6 max-w-md text-lg text-white/75">Vídeos que param o dedo no feed e viram venda. Roteiro, gravação e edição com cara de gente de verdade.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={whats()} className="px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider" style={{ background: VERMELHO, color: "#fff" }}>Anunciar no canal</a>
            <a href="#nobre" className="px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider border border-white/25">Ver programação</a>
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border-[10px] border-[#1c1c20] shadow-[0_0_80px_rgba(255,59,48,0.15)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/capa/1-sorriso.webp" alt="Lara Dam" className="absolute inset-0 w-full h-full object-cover object-top" />
            <div className="absolute inset-0 pointer-events-none opacity-[0.12]" style={{ backgroundImage: "repeating-linear-gradient(0deg, #000 0 1px, transparent 1px 3px)" }} />
            <span className="absolute top-4 left-4 px-2.5 py-1 rounded text-[11px] font-bold tracking-widest text-white" style={{ background: VERMELHO }}>● AO VIVO</span>
            <span className="absolute bottom-4 right-4 font-mono text-xs text-black/70">CH 01</span>
          </div>
        </div>
      </section>

      {/* faixa de notícias */}
      <div className="overflow-hidden border-y border-white/10 py-3" style={{ background: VERMELHO }}>
        <div className="marquee-slow font-[family-name:var(--tv-titulo)] uppercase text-lg text-white">
          {[0, 1].map((k) => (
            <span key={k} className="flex gap-10 pr-10">
              {STATS.map((s) => <span key={s.label}>{s.value} {s.label}</span>)}
              <span>Plantão: InfinitePay bate recorde de CTR no Meta</span>
              <span>Méliuz: 10M de views em campanha</span>
            </span>
          ))}
        </div>
      </div>

      {/* horário nobre = 3 destaques */}
      <section id="nobre" className="px-4 md:px-10 py-16 max-w-7xl mx-auto">
        <p className="font-mono text-xs tracking-[0.3em]" style={{ color: VERMELHO }}>20H · HORÁRIO NOBRE</p>
        <h2 className="font-[family-name:var(--tv-titulo)] uppercase text-5xl md:text-7xl mt-2">Mais assistidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">
          {DESTAQUES.map((v, i) => (
            <Thumb key={v.id} v={v} className="aspect-[9/16] rounded-2xl bg-black">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <span className="absolute top-3 left-4 font-[family-name:var(--tv-titulo)] text-7xl text-white/90 drop-shadow">{i + 1}</span>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="font-[family-name:var(--tv-titulo)] uppercase text-3xl">{v.views ?? ""} views</div>
                <div className="text-sm text-white/70">{v.brand}</div>
              </div>
            </Thumb>
          ))}
        </div>
      </section>

      {/* grade de programação = fileiras por nicho */}
      <section id="grade" className="py-10">
        <div className="px-4 md:px-10 max-w-7xl mx-auto">
          <p className="font-mono text-xs tracking-[0.3em] text-white/50">GRADE DE PROGRAMAÇÃO</p>
          <h2 className="font-[family-name:var(--tv-titulo)] uppercase text-5xl md:text-7xl mt-2">Escolha o canal</h2>
        </div>
        {NICHOS.map((n, i) => (
          <div key={n.slug} className="mt-10">
            <div className="px-4 md:px-10 max-w-7xl mx-auto flex items-baseline gap-4">
              <span className="font-mono text-sm px-2 py-0.5 rounded border border-white/20">CH {String(i + 2).padStart(2, "0")}</span>
              <h3 className="font-[family-name:var(--tv-titulo)] uppercase text-3xl">{n.name}</h3>
              <span className="hidden md:inline text-sm text-white/50">{n.tagline}</span>
            </div>
            <div className="mt-4 flex gap-3 overflow-x-auto px-4 md:px-10 pb-2 snap-x [scrollbar-width:none]">
              {n.videos.map((v) => (
                <Thumb key={v.id} v={v} className="snap-start shrink-0 w-36 md:w-44 aspect-[9/16] rounded-xl bg-black ring-1 ring-white/10 hover:ring-2 hover:ring-[#FF3B30]">
                  <span className="absolute bottom-2 left-2 text-[11px] font-semibold bg-black/60 px-1.5 py-0.5 rounded">{v.brand}</span>
                </Thumb>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* bastidores = sobre + comentários ao vivo */}
      <section id="bastidores" className="px-4 md:px-10 py-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-white/50">BASTIDORES</p>
          <h2 className="font-[family-name:var(--tv-titulo)] uppercase text-5xl md:text-6xl mt-2">Quem apresenta</h2>
          <p className="mt-6 text-white/75 text-lg leading-relaxed">Oie, eu sou a Lara. Em 3 anos foram mais de 1000 vídeos e 300 marcas. Eu penso o roteiro como estrategista, gravo como gente comum e edito pra o vídeo rodar como anúncio.</p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 p-4">
                <div className="font-[family-name:var(--tv-titulo)] text-4xl" style={{ color: VERMELHO }}>{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-white/60 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: VERMELHO }} />Chat ao vivo</p>
          <div className="mt-4 space-y-4">
            {TESTIMONIALS.slice(0, 4).map((t) => (
              <div key={t.brand} className="text-sm leading-relaxed">
                <span className="font-bold" style={{ color: VERMELHO }}>{t.brand}</span>{" "}
                <span className="text-white/80">{t.quote}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* contato */}
      <section className="px-4 md:px-10 py-20 text-center border-t border-white/10">
        <h2 className="font-[family-name:var(--tv-titulo)] uppercase text-6xl md:text-8xl">Seu produto<br />no ar</h2>
        <a href={whats()} className="inline-block mt-8 px-8 py-4 rounded-full font-bold uppercase tracking-wider text-white" style={{ background: VERMELHO }}>Chamar no WhatsApp</a>
        <p className="mt-4 text-sm text-white/50">{SITE.email} · {SITE.instagram}</p>
      </section>
    </div>
  );
}
