"use client";

import { useEffect, useState } from "react";

// Configuração do cabeçalho (topo fixo + cartão de perfil + faixa). Cada página
// (/perfil, /ugc, /agencia) passa a sua.
export type CabConfig = {
  usuario: string;
  avatar: string;
  cta: { rotulo: string; href: string; track: string };
  segundo?: { rotulo: string; href: string; track: string; externo?: boolean };
  stats: { b: string; t: string }[];
  bioTitulo: string;
  bio: string[];
  bioLink?: { rotulo: string; href: string };
  balao: string;
  nota: string;
  carimbo: string;
  faixa: string[];
  nav: { id: string; rotulo: string; emoji: string }[];
  topoCta: { rotulo: string; href: string };
};

function negrito(t: string) {
  return t.split(/(\*\*[^*]+\*\*)/g).map((p, i) => (p.startsWith("**") ? <b key={i}>{p.slice(2, -2)}</b> : <span key={i}>{p}</span>));
}

export default function Cabecalho({ cab }: { cab: CabConfig }) {
  const [ativo, setAtivo] = useState("");
  const faixa = [...cab.faixa, ...cab.faixa];

  // marca no menu a seção que está na tela
  useEffect(() => {
    const els = cab.nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setAtivo(e.target.id); }); },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [cab.nav]);

  return (
    <>
      <header className="pf-topo">
        <div className="pf-wrap pf-topo-linha">
          <a href="#top" className="pf-marca">lara<span>dam</span>.ugc</a>
          <nav className="pf-menu" aria-label="Seções">
            {cab.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className={ativo === n.id ? "on" : ""}>
                <span className="e">{n.emoji}</span> {n.rotulo}
              </a>
            ))}
          </nav>
          <a href={cab.topoCta.href} target="_blank" rel="noopener" className="pf-topo-cta" data-track={`${cab.cta.track}_topo`}>{cab.topoCta.rotulo}</a>
        </div>
      </header>

      <div className="pf-wrap" id="top">
        <section className="pf-card">
          <div className="pf-avatar">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cab.avatar} alt="Lara Dam" />
          </div>
          <div>
            <div className="pf-nome">
              <h1>{cab.usuario}</h1>
              <svg width="26" height="26" viewBox="0 0 24 24" aria-label="verificada"><circle cx="12" cy="12" r="11" fill="#2350D8" /><path d="M7 12.5l3 3 7-7" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <a href={cab.cta.href} target="_blank" rel="noopener" className="pf-btn azul" data-track={cab.cta.track}>{cab.cta.rotulo}</a>
              {cab.segundo && (
                <a href={cab.segundo.href} target={cab.segundo.externo ? "_blank" : undefined} rel="noopener" className="pf-btn" data-track={cab.segundo.track}>{cab.segundo.rotulo}</a>
              )}
            </div>
            <div className="pf-stats">
              {cab.stats.map((s) => <span key={s.t}><b>{s.b}</b> {s.t}</span>)}
            </div>
            <div className="pf-bio">
              <div className="n">{cab.bioTitulo}</div>
              {cab.bio.map((l) => <div key={l}>{l}</div>)}
              {cab.bioLink && <a href={cab.bioLink.href}>{cab.bioLink.rotulo}</a>}
            </div>
            <div className="pf-balao">{negrito(cab.balao)}</div>
            <div className="pf-mao pf-nota mt-5 md:mt-6">{cab.nota}</div>
          </div>
          <div className="pf-carimbo" style={{ right: 18, top: -16 }}>{cab.carimbo}</div>
        </section>

        <div className="pf-faixa" aria-hidden>
          <div className="pf-rola">{faixa.map((t, i) => <span key={i}><i>★</i> {t}</span>)}</div>
        </div>
      </div>
    </>
  );
}
