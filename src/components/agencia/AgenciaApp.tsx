"use client";

import { useEffect, useState } from "react";
import { AG_NAV, AG_VS, AG_WHATSAPP } from "@/data/agencia";
import Rodape from "@/components/perfil/Rodape";
import { Conteudos, ContatoAgencia, FAQ, MarcasTexto, Modalidades, Processo } from "./AgenciaSecoes";

// Agência (/agencia), opção J: abre com a comparação "por conta × com gestão",
// depois modalidades, processo, cases, marcas, dúvidas e contato. Sem foto na abertura.
export default function AgenciaApp() {
  const [ativo, setAtivo] = useState("");
  useEffect(() => {
    const els = AG_NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setAtivo(e.target.id); }), { rootMargin: "-40% 0px -50% 0px" });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="ag-j">
      <header className="pf-topo">
        <div className="pf-wrap pf-topo-linha">
          <a href="#top" className="pf-marca">laradam<span>.gestão</span></a>
          <nav className="pf-menu" aria-label="Seções">
            {AG_NAV.map((n) => <a key={n.id} href={`#${n.id}`} className={ativo === n.id ? "on" : ""}>{n.rotulo}</a>)}
          </nav>
          <a href={AG_WHATSAPP} target="_blank" rel="noopener" className="pf-topo-cta" data-track="agencia_topo_whatsapp">Quero conversar →</a>
        </div>
      </header>

      <main className="pf-wrap" id="top">
        {/* abertura: a comparação */}
        <section id="comparar" className="ag-hero">
          <h1>{AG_VS.titulo1} <span>{AG_VS.ou}</span> {AG_VS.titulo2}</h1>
          <p>{AG_VS.sub}</p>
          <div className="ag-vs">
            <div className="ag-lado a">
              <span className="k">{AG_VS.semGestao.k}</span>
              <h2>{AG_VS.semGestao.titulo}</h2>
              <ul>{AG_VS.semGestao.itens.map((i) => <li key={i}><i>❌</i><span>{i}</span></li>)}</ul>
            </div>
            <div className="ag-lado b">
              <span className="k">{AG_VS.comGestao.k}</span>
              <h2>{AG_VS.comGestao.titulo}</h2>
              <ul>{AG_VS.comGestao.itens.map((i) => <li key={i}><i>✅</i><span>{i}</span></li>)}</ul>
            </div>
            <div className="ag-vsb" aria-hidden>VS</div>
          </div>
          <div className="ag-hero-rod">
            <div className="ag-nums">
              {AG_VS.numeros.map((n) => <div key={n.t}><b>{n.b}</b><span>{n.t}</span></div>)}
            </div>
            <div className="ag-cta">
              <a href={AG_WHATSAPP} target="_blank" rel="noopener" className="pf-btn azul" data-track="agencia_hero_whatsapp">💬 {AG_VS.cta}</a>
              <small>{AG_VS.ctaSub}</small>
            </div>
          </div>
        </section>

        <Modalidades />
        <Processo />
        <Conteudos />
        <MarcasTexto />
        <FAQ />
        <ContatoAgencia />
        <Rodape zap={AG_WHATSAPP} zapRotulo="💬 Conversar sobre minha campanha" track="agencia_zap_fixo" />
      </main>
    </div>
  );
}
