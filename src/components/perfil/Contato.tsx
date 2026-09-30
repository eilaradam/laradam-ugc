"use client";

import { useState } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { PERFIL } from "@/data/perfil";
import Honeypot from "@/components/Honeypot";

export default function Contato() {
  const [estado, setEstado] = useState<"parado" | "enviando" | "enviado" | "erro">("parado");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setEstado("enviando");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error(String(res.status));
      setEstado("enviado"); form.reset();
    } catch { setEstado("erro"); }
  }

  return (
    <section id="contato" className="pf-sec">
      <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-start">
        <div className="md:col-span-5">
          <h2>Manda uma mensagem ✉️</h2>
          <p className="sub">Conta um pouco sobre a marca e o que você quer alcançar. Respondo em até 48h.</p>
          <div className="pf-mao pf-nota mt-4">ou me chama direto ↓</div>
          <div className="mt-3 grid gap-2">
            {[
              { r: "WhatsApp", v: PERFIL.whatsappLabel, h: `https://wa.me/${PERFIL.whatsapp}`, cor: "var(--verde)" },
              { r: "E-mail", v: PERFIL.email, h: `mailto:${PERFIL.email}`, cor: "var(--amarelo)" },
              { r: "Instagram", v: `@${PERFIL.usuario}`, h: PERFIL.instagramUrl, cor: "var(--rosa)" },
            ].map((c) => (
              <a key={c.r} href={c.h} target={c.h.startsWith("http") ? "_blank" : undefined} rel="noopener" className="flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-[var(--ink)] font-bold transition-transform hover:-translate-y-0.5" style={{ background: c.cor }} data-track={`perfil_contato_${c.r.toLowerCase()}`}>
                <span className="text-xs uppercase tracking-widest w-20 text-[var(--ink)] opacity-70">{c.r}</span><span>{c.v}</span><ArrowUpRight className="w-4 h-4 ml-auto opacity-60" />
              </a>
            ))}
          </div>
        </div>
        <form onSubmit={onSubmit} className="md:col-span-7 pf-caixa grid gap-4">
          <Honeypot />
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="pf-campo"><label htmlFor="pf-nome">Nome</label><input id="pf-nome" name="name" required placeholder="Seu nome" /></div>
            <div className="pf-campo"><label htmlFor="pf-email">E-mail</label><input id="pf-email" name="email" type="email" required placeholder="voce@marca.com" /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="pf-campo"><label htmlFor="pf-marca">Marca</label><input id="pf-marca" name="brand" required placeholder="Nome da marca" /></div>
            <div className="pf-campo"><label htmlFor="pf-orc">Orçamento estimado</label><input id="pf-orc" name="budget" placeholder="Ex: R$ 1.000 a R$ 5.000" /></div>
          </div>
          <div className="pf-campo"><label htmlFor="pf-msg">Conta sobre o projeto</label><textarea id="pf-msg" name="message" rows={4} placeholder="Produto, formato (UGC ou publi), prazo, objetivo..." /></div>
          <div className="flex items-center gap-4 flex-wrap">
            <button type="submit" className="pf-btn azul" disabled={estado === "enviando" || estado === "enviado"} data-track="perfil_contato_submit">
              <Send className="w-4 h-4" /> {estado === "enviado" ? "Enviado! Respondo em breve" : estado === "enviando" ? "Enviando…" : "Enviar mensagem"}
            </button>
            {estado === "erro" && <span className="font-bold text-sm text-[#C0392B]">Deu erro. Tenta de novo ou me chama no WhatsApp.</span>}
          </div>
        </form>
      </div>
    </section>
  );
}
