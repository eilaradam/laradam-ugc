"use client";

import { Search } from "lucide-react";
import { DESTAQUES, FAIXA, PERFIL } from "@/data/perfil";
import { fmtBR, usePerfil } from "./PerfilApp";

function negrito(t: string) {
  return t.split(/(\*\*[^*]+\*\*)/g).map((p, i) => (p.startsWith("**") ? <b key={i}>{p.slice(2, -2)}</b> : <span key={i}>{p}</span>));
}

export default function Cabecalho() {
  const { busca, setBusca, stats, ir, aba, setAba } = usePerfil();
  const faixa = [...FAIXA, ...FAIXA];

  return (
    <>
      <header className="pf-topo">
        <div className="pf-wrap">
          <a href="#top" className="pf-marca">lara<span>dam</span>.ugc</a>
          <label className="pf-busca">
            <Search className="w-4 h-4 text-[#9AA0AE]" />
            <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar marca, nicho ou formato" aria-label="Buscar vídeos por marca ou nicho" />
          </label>
          <a href="#contato" className="pf-topo-cta hidden sm:inline">Trabalhe comigo →</a>
        </div>
      </header>

      <div className="pf-wrap" id="top">
        {/* cartão do perfil */}
        <section className="pf-card">
          <div className="pf-avatar">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PERFIL.avatar} alt="Lara Dam" style={{ objectPosition: "center 18%" }} />
          </div>
          <div>
            <div className="pf-nome">
              <h1>{PERFIL.usuario}</h1>
              <svg width="26" height="26" viewBox="0 0 24 24" aria-label="verificada"><circle cx="12" cy="12" r="11" fill="#2350D8" /><path d="M7 12.5l3 3 7-7" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <a href="#contato" className="pf-btn azul" data-track="perfil_trabalhe_comigo">Trabalhe comigo</a>
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
              <a href="#contato">ugc.laradam.com/trabalhe-comigo</a>
            </div>
            <div className="pf-balao">{negrito(PERFIL.balao)}</div>
            <div className="pf-mao pf-nota mt-5 md:mt-6">{PERFIL.nota}</div>
          </div>
          <div className="pf-carimbo" style={{ right: 18, top: -16 }}>{PERFIL.carimbo}</div>
        </section>

        {/* faixa de estrelas */}
        <div className="pf-faixa" aria-hidden>
          <div className="pf-rola">{faixa.map((t, i) => <span key={i}><i>★</i> {t}</span>)}</div>
        </div>

        {/* destaques */}
        <nav className="pf-destaques" aria-label="Destaques">
          {DESTAQUES.map((d) => (
            <button key={d.id} className="pf-dest" onClick={() => ir({ aba: d.aba, alvo: d.alvo })}>
              {d.foto ? (
                <span className="bola">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={d.foto} alt="" style={{ objectPosition: "center 20%" }} /></span>
              ) : (
                <span className="bola cor" style={{ background: d.cor }}>{d.emoji}</span>
              )}
              {d.rotulo}
            </button>
          ))}
        </nav>

        {/* abas */}
        <div className="pf-abas" id="grade" role="tablist">
          {([
            ["feed", "Feed", <svg key="f" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" /></svg>],
            ["reels", "Reels", <svg key="r" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9z" /></svg>],
            ["publi", "Publi", <svg key="p" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7 7 .6-5.3 4.6L18.5 21 12 17.3 5.5 21l1.8-6.8L2 9.6 9 9z" /></svg>],
            ["marcas", "Marcadas", <svg key="m" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0z" /><circle cx="12" cy="12" r="3" /></svg>],
          ] as const).map(([id, rotulo, icone]) => (
            <button key={id} role="tab" aria-selected={aba === id} className={`pf-aba ${aba === id ? "on" : ""}`} onClick={() => setAba(id)}>
              {icone} {rotulo}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
