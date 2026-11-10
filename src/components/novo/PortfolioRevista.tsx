"use client";

import { DESTAQUES, NICHOS, SITE, STATS, TESTIMONIALS, Thumb, whats } from "./dados";

// Direção "Revista": a capa é capa de revista de moda, o resto vira as matérias da edição.
const CREME = "#EFE7DC";
const MARINHO = "#16233F";
const VERMELHO = "#B3261E";

export default function PortfolioRevista() {
  return (
    <div className="min-h-screen font-[family-name:var(--rv-corpo)]" style={{ background: CREME, color: MARINHO }}>
      {/* capa da revista: nome à esquerda, foto à direita */}
      <section className="grid md:grid-cols-2 min-h-[100svh]">
        <div className="flex flex-col justify-between px-5 md:px-12 py-8 md:py-12 order-1">
          <div className="flex justify-between text-[11px] uppercase tracking-[0.25em] border-b pb-3" style={{ borderColor: MARINHO }}>
            <span>Edição Nº 03</span><span>Novembro 2026</span><span>R$ 0,00</span>
          </div>
          <div className="py-10">
            <p className="italic text-lg" style={{ color: VERMELHO }}>A creator que faz o produto virar desejo</p>
            <h1 className="font-[family-name:var(--rv-titulo)] leading-[0.82] tracking-tight text-[26vw] md:text-[11rem] mt-2">
              Lara<br /><em className="font-normal">Dam</em>
            </h1>
          </div>
          <ul className="space-y-4">
            <li className="border-t pt-3" style={{ borderColor: MARINHO }}>
              <span className="font-[family-name:var(--rv-titulo)] text-4xl" style={{ color: VERMELHO }}>140M+</span>
              <span className="block text-sm uppercase tracking-wider">views acumuladas em 3 anos</span>
            </li>
            <li className="border-t pt-3" style={{ borderColor: MARINHO }}>
              <span className="font-[family-name:var(--rv-titulo)] text-2xl italic">Exclusivo:</span>{" "}
              <span>o vídeo que bateu recorde de CTR no Meta</span>
            </li>
            <li className="border-t pt-3 flex items-center justify-between" style={{ borderColor: MARINHO }}>
              <span className="text-sm uppercase tracking-wider">300 marcas · 1000 vídeos</span>
              <a href={whats()} className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white" style={{ background: MARINHO }}>Contratar</a>
            </li>
          </ul>
        </div>
        <div className="relative min-h-[70svh] order-2" style={{ background: "#D7CDC4" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/capa/2-seria.webp" alt="Lara Dam" className="absolute inset-0 w-full h-full object-cover object-top" />
          <span className="absolute bottom-6 right-6 font-[family-name:var(--rv-titulo)] italic text-white text-xl drop-shadow">“Conteúdo com cara de gente”</span>
        </div>
      </section>

      {/* sumário */}
      <section className="px-5 md:px-12 py-16 max-w-6xl mx-auto">
        <h2 className="font-[family-name:var(--rv-titulo)] text-6xl md:text-8xl italic">Nesta edição</h2>
        <div className="grid md:grid-cols-4 gap-6 mt-10">
          {[["01", "Matéria de capa", "#capa"], ["02", "Entrevista", "#entrevista"], ["03", "Editorias", "#editorias"], ["04", "Anuncie", "#anuncie"]].map(([n, t, h]) => (
            <a key={n} href={h} className="border-t-2 pt-3 group" style={{ borderColor: MARINHO }}>
              <span className="font-[family-name:var(--rv-titulo)] text-5xl" style={{ color: VERMELHO }}>{n}</span>
              <span className="block mt-1 uppercase tracking-wider text-sm group-hover:underline">{t}</span>
            </a>
          ))}
        </div>
      </section>

      {/* matéria de capa = 3 destaques */}
      <section id="capa" className="px-5 md:px-12 py-16 max-w-6xl mx-auto border-t" style={{ borderColor: `${MARINHO}33` }}>
        <p className="text-xs uppercase tracking-[0.3em]" style={{ color: VERMELHO }}>01 · Matéria de capa</p>
        <h2 className="font-[family-name:var(--rv-titulo)] text-5xl md:text-7xl mt-3 max-w-3xl leading-[0.95]">Três vídeos que <em>mudaram o jogo</em> pra marca</h2>
        <div className="mt-12 space-y-16">
          {DESTAQUES.map((v, i) => {
            const t = TESTIMONIALS.find((x) => x.brand === v.brand);
            return (
              <article key={v.id} className={`grid md:grid-cols-[280px_1fr] gap-8 md:gap-14 items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}>
                <Thumb v={v} className="aspect-[9/16] w-full max-w-[280px] mx-auto md:mx-0 shadow-2xl">
                  <span className="absolute top-3 left-3 bg-white text-[11px] font-bold uppercase tracking-widest px-2 py-1" style={{ color: MARINHO }}>▶ Assistir</span>
                </Thumb>
                <div className="[direction:ltr]">
                  <div className="font-[family-name:var(--rv-titulo)] text-7xl md:text-9xl" style={{ color: VERMELHO }}>{v.views ?? "—"}</div>
                  <div className="uppercase tracking-[0.2em] text-sm mt-1">views · {v.brand}</div>
                  {t && <blockquote className="font-[family-name:var(--rv-titulo)] italic text-2xl md:text-3xl leading-snug mt-6 max-w-xl">“{t.quote}”</blockquote>}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* entrevista = sobre em pergunta e resposta */}
      <section id="entrevista" className="py-20" style={{ background: MARINHO, color: CREME }}>
        <div className="px-5 md:px-12 max-w-6xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <div className="relative aspect-[3/4]" style={{ background: "#D9D0C9" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/capa/4-risada.webp" alt="Lara Dam rindo" className="absolute inset-0 w-full h-full object-cover object-top" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] opacity-70">02 · Entrevista</p>
            <h2 className="font-[family-name:var(--rv-titulo)] text-5xl md:text-6xl mt-3 italic">“Eu gravo como gente, mas penso como estrategista.”</h2>
            <dl className="mt-8 space-y-6">
              <div><dt className="font-bold uppercase tracking-wider text-sm">Quem é você?</dt><dd className="mt-1 opacity-85">Lara, 27 anos, UGC creator e estrategista de conteúdo no litoral de SP.</dd></div>
              <div><dt className="font-bold uppercase tracking-wider text-sm">O que você entrega?</dt><dd className="mt-1 opacity-85">Roteiro, gravação e edição prontos pra rodar como anúncio, com gancho que não parece de todo mundo.</dd></div>
              <div><dt className="font-bold uppercase tracking-wider text-sm">Em números?</dt><dd className="mt-1 opacity-85">{STATS.map((s) => `${s.value} ${s.label.toLowerCase()}`).join(" · ")}.</dd></div>
            </dl>
          </div>
        </div>
      </section>

      {/* editorias = fileiras por nicho */}
      <section id="editorias" className="py-20">
        <div className="px-5 md:px-12 max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: VERMELHO }}>03 · Editorias</p>
          <h2 className="font-[family-name:var(--rv-titulo)] text-5xl md:text-7xl mt-3">Por assunto</h2>
        </div>
        {NICHOS.map((n) => (
          <div key={n.slug} className="mt-12">
            <div className="px-5 md:px-12 max-w-6xl mx-auto flex items-baseline justify-between border-b pb-2" style={{ borderColor: MARINHO }}>
              <h3 className="font-[family-name:var(--rv-titulo)] text-3xl md:text-4xl italic">{n.name}</h3>
              <span className="text-xs uppercase tracking-wider opacity-70">{n.videos.length} vídeos</span>
            </div>
            <div className="mt-5 flex gap-4 overflow-x-auto px-5 md:px-12 pb-2 snap-x [scrollbar-width:none]">
              {n.videos.map((v) => (
                <figure key={v.id} className="snap-start shrink-0 w-36 md:w-44">
                  <Thumb v={v} className="aspect-[9/16] w-full" />
                  <figcaption className="text-xs uppercase tracking-wider mt-2">{v.brand}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* anuncie = contato */}
      <section id="anuncie" className="px-5 md:px-12 py-24 text-center border-t-4 border-double" style={{ borderColor: MARINHO }}>
        <p className="text-xs uppercase tracking-[0.3em]" style={{ color: VERMELHO }}>04 · Anuncie</p>
        <h2 className="font-[family-name:var(--rv-titulo)] text-6xl md:text-8xl mt-3">Sua marca na<br /><em>próxima edição</em></h2>
        <a href={whats()} className="inline-block mt-10 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white" style={{ background: VERMELHO }}>Falar com a Lara</a>
        <p className="mt-4 text-sm opacity-70">{SITE.email} · {SITE.instagram}</p>
      </section>
    </div>
  );
}
