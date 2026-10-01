"use client";

import { useEffect, useState } from "react";
import { FAIXA, NAV, PERFIL } from "@/data/perfil";
import { fmtBR, usePerfil } from "./PerfilApp";

function negrito(t: string) {
  return t.split(/(\*\*[^*]+\*\*)/g).map((p, i) => (p.startsWith("**") ? <b key={i}>{p.slice(2, -2)}</b> : <span key={i}>{p}</span>));
}

export default function Cabecalho() {
  const { stats } = usePerfil();
  const [ativo, setAtivo] = useState("");
  const faixa = [...FAIXA, ...FAIXA];

  // marca no menu a seção que está na tela
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setAtivo(e.target.id); }); },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <header className="pf-topo">
        <div className="pf-wrap pf-topo-linha">
          <a href="#top" className="pf-marca">lara<span>dam</span>.ugc</a>
          <nav className="pf-menu" aria-label="Seções">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className={ativo === n.id ? "on" : ""}>
                <span className="e">{n.emoji}</span> {n.rotulo}
              </a>
            ))}
          </nav>
          <a href={PERFIL.whatsappUrl} target="_blank" rel="noopener" className="pf-topo-cta" data-track="perfil_topo_whatsapp">Trabalhe comigo →</a>
        </div>
      </header>

      <div className="pf-wrap" id="top">
        <section className="pf-card">
          <div className="pf-avatar">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PERFIL.avatar} alt="Lara Dam" style={{ objectPosition: "center 18%" }} />
          </div>
          <div>
            <div className="pf-nome">
              <h1>{PERFIL.usuario}</h1>
              <svg width="26" height="26" viewBox="0 0 24 24" aria-label="verificada"><circle cx="12" cy="12" r="11" fill="#2350D8" /><path d="M7 12.5l3 3 7-7" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <a href={PERFIL.whatsappUrl} target="_blank" rel="noopener" className="pf-btn azul" data-track="perfil_trabalhe_comigo">💬 Trabalhe comigo</a>
              <a href={PERFIL.instagramUrl} target="_blank" rel="noopener" className="pf-btn" data-track="perfil_instagram">Ver no Instagram</a>
            </div>
            <div className="pf-stats">
              <span><b>{stats.posts}</b> posts</span>
              <span><b>{fmtBR(stats.followers)}</b> seguidores</span>
              <span><b>100M+</b> views em campanhas</span>
              <span><b>200+</b> marcas</span>
            </div>
            <div className="pf-bio">
              <div className="n">{PERFIL.bioTitulo}</div>
              {PERFIL.bio.map((l) => <div key={l}>{l}</div>)}
              <a href="#contato">📩 prefere formulário? trabalhe comigo por aqui</a>
            </div>
            <div className="pf-balao">{negrito(PERFIL.balao)}</div>
            <div className="pf-mao pf-nota mt-5 md:mt-6">{PERFIL.nota}</div>
          </div>
          <div className="pf-carimbo" style={{ right: 18, top: -16 }}>{PERFIL.carimbo}</div>
        </section>

        <div className="pf-faixa" aria-hidden>
          <div className="pf-rola">{faixa.map((t, i) => <span key={i}><i>★</i> {t}</span>)}</div>
        </div>

      </div>
    </>
  );
}
