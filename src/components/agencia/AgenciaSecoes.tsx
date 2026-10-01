"use client";

import { useState } from "react";
import { ChevronDown, Send } from "lucide-react";
import type { Video } from "@/data/content";
import { AG_CONTATO, AG_CONTEUDOS, AG_FAQ, AG_MARCAS, AG_MODALIDADES, AG_PROCESSO, AG_WHATSAPP } from "@/data/agencia";
import { PERFIL } from "@/data/perfil";
import { Nicho } from "@/components/perfil/Secoes";
import Honeypot from "@/components/Honeypot";

function Titulo({ titulo, sub }: { titulo: string; sub: string }) {
  return <div className="pf-sec-cab"><div><h2>{titulo}</h2><p className="sub">{sub}</p></div></div>;
}

export function Conteudos() {
  const videos: Video[] = AG_CONTEUDOS.videos.map((v, i) => ({ id: `ag-${i}-${v.youtubeId}`, title: v.brand, brand: v.brand, category: "gestão", youtubeId: v.youtubeId }));
  return (
    <section id="conteudos" className="pf-sec">
      <Titulo titulo={AG_CONTEUDOS.titulo} sub={AG_CONTEUDOS.sub} />
      <Nicho slug="gestao" nome="Creators da rede" tagline="Vídeos gerenciados do briefing à entrega" videos={videos} />
    </section>
  );
}

export function Modalidades() {
  return (
    <section id="modalidades" className="pf-sec">
      <Titulo titulo={AG_MODALIDADES.titulo} sub={AG_MODALIDADES.sub} />
      <div className="ag-modal">
        {AG_MODALIDADES.cards.map((c) => (
          <div key={c.nome} className={`ag-card ${c.tag ? "on" : ""}`}>
            {c.tag && <span className="tag">{c.tag}</span>}
            <h3>{c.nome}</h3>
            <p className="pitch">{c.pitch}</p>
            <ul>{c.bullets.map((b) => <li key={b}>✅ {b}</li>)}</ul>
            <p className="ideal"><b>Ideal pra:</b> {c.ideal}</p>
            <a href={AG_WHATSAPP} target="_blank" rel="noopener" className="pf-btn azul" data-track={`agencia_modalidade_${c.nome.split(" ")[0].toLowerCase()}`}>{c.cta}</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Processo() {
  return (
    <section id="processo" className="pf-sec">
      <Titulo titulo={AG_PROCESSO.titulo} sub={AG_PROCESSO.sub} />
      <ol className="ag-etapas">
        {AG_PROCESSO.etapas.map((e) => (
          <li key={e.n} className="ag-etapa">
            <span className="n">{e.n}</span>
            <div><b>{e.t}</b><p>{e.d}</p></div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function MarcasTexto() {
  return (
    <section id="marcas" className="pf-sec">
      <Titulo titulo={AG_MARCAS.titulo} sub={AG_MARCAS.sub} />
      <div className="pf-pilulas">
        {AG_MARCAS.nomes.map((n) => <span key={n} className="pf-pilula ag-marca">🤝 {n}</span>)}
      </div>
    </section>
  );
}

export function FAQ() {
  const [aberta, setAberta] = useState<number | null>(0);
  return (
    <section id="duvidas" className="pf-sec">
      <Titulo titulo={AG_FAQ.titulo} sub={AG_FAQ.sub} />
      <div className="ag-faq">
        {AG_FAQ.itens.map((it, i) => (
          <div key={it.q} className={`ag-faq-item ${aberta === i ? "on" : ""}`}>
            <button onClick={() => setAberta(aberta === i ? null : i)} aria-expanded={aberta === i}>
              <span>{it.q}</span><ChevronDown className="w-5 h-5" />
            </button>
            {aberta === i && <p>{it.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

export function ContatoAgencia() {
  const [estado, setEstado] = useState<"parado" | "enviando" | "enviado" | "erro">("parado");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setEstado("enviando");
    try {
      const res = await fetch("/api/gestao-leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error(String(res.status));
      setEstado("enviado"); form.reset();
    } catch { setEstado("erro"); }
  }
  const o = AG_CONTATO.opcoes;
  return (
    <section id="contato" className="pf-sec">
      <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-start">
        <div className="md:col-span-5">
          <h2>{AG_CONTATO.titulo}</h2>
          <p className="sub">{AG_CONTATO.sub}</p>
          <div className="pf-mao pf-nota mt-4">{AG_CONTATO.nota}</div>
          <div className="mt-3 grid gap-2">
            <a href={AG_WHATSAPP} target="_blank" rel="noopener" className="flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-[var(--ink)] font-bold bg-white transition-transform hover:-translate-y-0.5" data-track="agencia_contato_whatsapp"><span className="text-xs uppercase tracking-widest w-20 opacity-70">WhatsApp</span><span>{PERFIL.whatsappLabel}</span></a>
            <a href={`mailto:${PERFIL.email}`} className="flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-[var(--ink)] font-bold bg-[var(--claro2)] transition-transform hover:-translate-y-0.5" data-track="agencia_contato_email"><span className="text-xs uppercase tracking-widest w-20 opacity-70">E-mail</span><span>{PERFIL.email}</span></a>
          </div>
        </div>
        <form onSubmit={onSubmit} className="md:col-span-7 pf-caixa grid gap-4">
          <Honeypot />
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="pf-campo"><label htmlFor="ag-nome">Nome completo</label><input id="ag-nome" name="name" required placeholder="Seu nome" /></div>
            <div className="pf-campo"><label htmlFor="ag-email">E-mail</label><input id="ag-email" name="email" type="email" required placeholder="voce@marca.com" /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="pf-campo"><label htmlFor="ag-zap">WhatsApp</label><input id="ag-zap" name="whatsapp" placeholder="(  )" /></div>
            <div className="pf-campo"><label htmlFor="ag-empresa">Empresa</label><input id="ag-empresa" name="company" required placeholder="Nome da empresa" /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="pf-campo"><label htmlFor="ag-cargo">Cargo</label><select id="ag-cargo" name="role" defaultValue="">{["", ...o.roles].map((x) => <option key={x} value={x}>{x || "Selecione"}</option>)}</select></div>
            <div className="pf-campo"><label htmlFor="ag-site">Site</label><input id="ag-site" name="site" placeholder="suamarca.com.br" /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="pf-campo"><label htmlFor="ag-mod">Modalidade de interesse</label><select id="ag-mod" name="modality" defaultValue="">{["", ...o.modalities].map((x) => <option key={x} value={x}>{x || "Selecione"}</option>)}</select></div>
            <div className="pf-campo"><label htmlFor="ag-obj">Objetivo principal</label><select id="ag-obj" name="goal" defaultValue="">{["", ...o.goals].map((x) => <option key={x} value={x}>{x || "Selecione"}</option>)}</select></div>
          </div>
          <div className="pf-campo"><label htmlFor="ag-orc">Orçamento estimado</label><select id="ag-orc" name="budget" defaultValue="">{["", ...o.budgets].map((x) => <option key={x} value={x}>{x || "Selecione"}</option>)}</select></div>
          <div className="pf-campo"><label htmlFor="ag-msg">Conta sobre o projeto</label><textarea id="ag-msg" name="message" rows={4} placeholder="Prazo, momento da marca, o que você já tentou..." /></div>
          <div className="flex items-center gap-4 flex-wrap">
            <button type="submit" className="pf-btn azul" disabled={estado === "enviando" || estado === "enviado"} data-track="agencia_contato_submit">
              <Send className="w-4 h-4" /> {estado === "enviado" ? AG_CONTATO.enviado : estado === "enviando" ? "Enviando…" : "Quero conversar sobre minha campanha"}
            </button>
            {estado === "erro" && <span className="font-bold text-sm text-[#C0392B]">{AG_CONTATO.erro}</span>}
          </div>
        </form>
      </div>
    </section>
  );
}
