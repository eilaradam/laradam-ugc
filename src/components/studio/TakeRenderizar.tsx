"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Play, X } from "lucide-react";
import { PROJETO, RENDERIZAR } from "@/data/studio";
import Honeypot from "@/components/Honeypot";
import Take from "./Take";
import { useStudio } from "./StudioApp";

type Estado = "parado" | "renderizando" | "pronto" | "erro";

export default function TakeRenderizar() {
  const { pedido, setPedido } = useStudio();
  const [estado, setEstado] = useState<Estado>("parado");
  const [progresso, setProgresso] = useState(0);

  // barra "renderizando" enquanto a API responde
  useEffect(() => {
    if (estado !== "renderizando") return;
    setProgresso(8);
    const id = setInterval(() => setProgresso((p) => Math.min(92, p + Math.random() * 14)), 220);
    return () => clearInterval(id);
  }, [estado]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const itens = pedido.length ? `Pedido: ${pedido.join(", ")}\n\n` : "";
    data.message = itens + (data.message || "");
    setEstado("renderizando");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error(String(res.status));
      setProgresso(100);
      setEstado("pronto");
      form.reset();
      setPedido([]);
    } catch {
      setEstado("erro");
    }
  }

  return (
    <Take id="renderizar" direita={<span className="st-chip-claro st-chip" role="status" aria-atomic="true">fila: {pedido.length} {pedido.length === 1 ? "item" : "itens"}</span>}>
      <div className="mb-6">
        <h2 className="st-display font-extrabold text-4xl md:text-6xl leading-[0.98] tracking-tight">{RENDERIZAR.titulo}</h2>
        <p className="mt-3 text-[var(--st-ink-2)] text-base md:text-lg max-w-xl">{RENDERIZAR.sub}</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <form onSubmit={onSubmit} className="lg:col-span-7 st-painel">
          <div className="st-painel-topo"><span className="st-semaforo"><i /><i /><i /></span><span className="font-bold">Fila de renderização</span><span className="opacity-60">/ novo projeto</span></div>
          <div className="p-4 md:p-5 grid gap-4">
            <Honeypot />
            {/* itens do pedido (presets e formatos escolhidos nos takes anteriores) */}
            {pedido.length > 0 && (
              <div>
                <div className="st-mono text-[10px] uppercase tracking-widest text-[var(--st-ink-2)] mb-2">No pedido</div>
                <div className="flex flex-wrap gap-2">
                  {pedido.map((p) => (
                    <span key={p} className="st-chip st-chip-claro text-[11px] normal-case tracking-normal">
                      {p}
                      <button type="button" aria-label={`Tirar ${p}`} onClick={() => setPedido(pedido.filter((x) => x !== p))} className="ml-1 opacity-60 hover:opacity-100"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="st-campo"><label htmlFor="st-nome">Nome</label><input id="st-nome" name="name" required placeholder="Seu nome" /></div>
              <div className="st-campo"><label htmlFor="st-email">E-mail</label><input id="st-email" name="email" type="email" required placeholder="voce@marca.com" /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="st-campo"><label htmlFor="st-marca">Projeto (marca)</label><input id="st-marca" name="brand" required placeholder="Nome da marca" /></div>
              <div className="st-campo"><label htmlFor="st-orc">Orçamento estimado</label><input id="st-orc" name="budget" placeholder="Ex: R$ 1.000 a R$ 5.000" /></div>
            </div>
            <div className="st-campo"><label htmlFor="st-msg">Notas do projeto</label><textarea id="st-msg" name="message" rows={4} placeholder="Produto, objetivo, onde o vídeo vai rodar, prazo..." /></div>

            {estado !== "parado" && (
              <div className="grid gap-2">
                <div className="st-progresso"><i style={{ width: `${estado === "pronto" ? 100 : progresso}%` }} /></div>
                <div className="st-mono text-[11px] uppercase tracking-widest flex items-center gap-2" style={{ color: estado === "erro" ? "var(--st-rec)" : "var(--st-ink-2)" }}>
                  {estado === "renderizando" && <>{RENDERIZAR.enviando}… {Math.round(progresso)}%</>}
                  {estado === "pronto" && <><Check className="w-3.5 h-3.5" /> {RENDERIZAR.pronto}</>}
                  {estado === "erro" && RENDERIZAR.erro}
                </div>
              </div>
            )}

            <div>
              <button type="submit" className="st-botao" disabled={estado === "renderizando" || estado === "pronto"}>
                <Play className="w-4 h-4 fill-white" /> {estado === "pronto" ? "Enviado" : RENDERIZAR.botao}
              </button>
            </div>
          </div>
        </form>

        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="st-painel">
            <div className="st-painel-topo"><span className="st-semaforo"><i /><i /><i /></span><span className="font-bold">Saídas</span><span className="opacity-60">/ canais diretos</span></div>
            <ul className="divide-y-2 divide-[var(--st-blue-line)]">
              {RENDERIZAR.saidas.map((s) => (
                <li key={s.rotulo}>
                  <a href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--st-blue-soft)] transition-colors">
                    <span className="st-mono text-[10px] uppercase tracking-widest w-20 text-[var(--st-ink-2)]">{s.rotulo}</span>
                    <span className="font-bold text-sm">{s.valor}</span>
                    <ArrowUpRight className="w-4 h-4 ml-auto opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="st-mono text-[10px] uppercase tracking-widest text-[var(--st-ink-2)] leading-relaxed">
            © {new Date().getFullYear()} {PROJETO.app} · {PROJETO.arquivo}
            <br />UGC creator & influenciadora · Litoral de SP · Brasil
          </div>
        </div>
      </div>
    </Take>
  );
}
