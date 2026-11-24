"use client";

import { useEffect, useState } from "react";
import { RAIO_X_PROMPT } from "./prompt";

// Roxo + verde-limão: a família das páginas "feito com o Claude" (mesmas cores do /edicao e do /widget).
const V = { roxo: "#6C3CF5", escuro: "#1E0F4D", lima: "#DCFB4E", creme: "#F4F2EE", papel: "#FFFFFF", tinta: "#18181B", suave: "#5B5B66", borda: "#DCD8EA" };
const LIMA = "linear-gradient(135deg,#F0FF7A 0%,#DCFB4E 50%,#B8E02A 100%)";
const MARCA = "raiox_liberado";

const EDITA = ["Sim, eu mesma edito", "Às vezes, depende do trabalho", "Não, pago alguém pra editar", "Não faço vídeo pra marca ainda"];
const VIDEOS = ["Nenhum ainda", "De 1 a 3", "De 4 a 10", "Mais de 10"];
const TRAVA = ["O corte, tirar pausa e erro", "A legenda", "Os títulos e as animações", "O som e a música", "O tempo que leva"];

export default function Raiox() {
  const [liberado, setLiberado] = useState(false);
  const [origem, setOrigem] = useState("aula-edicao");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const o = q.get("ref") || q.get("utm_campaign");
    // a origem e a marca de "já respondeu" só existem no navegador
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (o) setOrigem(o.slice(0, 40));
    try { if (localStorage.getItem(MARCA)) setLiberado(true); } catch {}
  }, []);

  return (
    <main className="min-h-screen pb-20" style={{ background: V.creme, color: V.tinta }}>
      <div className="mx-auto max-w-xl px-4 pt-8">
        <p className="text-sm font-bold" style={{ color: V.roxo }}>@eilaradam</p>

        <section className="relative mt-4 overflow-hidden rounded-[28px] p-6 sm:p-8" style={{ background: `linear-gradient(160deg, ${V.escuro} 0%, #3D1FA3 55%, ${V.roxo} 100%)`, color: "#fff" }}>
          <p className="text-[26px] leading-none" style={{ fontFamily: "var(--font-caveat)", color: V.lima }}>só pra quem ficou até o final ✿</p>
          <h1 className="mt-2 text-[34px] font-extrabold leading-[1.05] tracking-tight sm:text-[42px]">Raio-X do Reels</h1>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,.82)" }}>
            O prompt que eu uso antes de entregar vídeo pra marca. Você manda <b style={{ color: "#fff" }}>5 prints de um Reels</b>, a fala e a duração, e o Claude te devolve o diagnóstico com a medida exata pra corrigir.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["gancho", "enquadramento", "zona morta", "legenda", "título no rosto", "ritmo"].map((t) => (
              <span key={t} className="rounded-full px-3 py-1 text-[12.5px] font-bold" style={{ background: "rgba(255,255,255,.12)", color: V.lima }}>{t}</span>
            ))}
          </div>
          <p className="mt-4 text-[13px]" style={{ color: "rgba(255,255,255,.7)" }}>Funciona até no Claude gratuito: ele só olha, não edita.</p>
        </section>

        {liberado ? <Liberado /> : <Formulario origem={origem} liberar={() => { try { localStorage.setItem(MARCA, "1"); } catch {} setLiberado(true); }} />}
      </div>
    </main>
  );
}

function Opcoes({ nome, titulo, opcoes, valor, mudar }: { nome: string; titulo: string; opcoes: string[]; valor: string; mudar: (v: string) => void }) {
  return (
    <fieldset className="mt-5">
      <legend className="text-sm font-bold">{titulo}</legend>
      <div className="mt-2 grid gap-2">
        {opcoes.map((o) => {
          const on = valor === o;
          return (
            <label key={o} className="flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 text-[15px]" style={{ borderColor: on ? V.roxo : V.borda, background: on ? "#F1ECFF" : "#fff", fontWeight: on ? 700 : 400 }}>
              <input type="radio" name={nome} value={o} checked={on} onChange={() => mudar(o)} required className="h-4 w-4 accent-[#6C3CF5]" />
              {o}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function Formulario({ origem, liberar }: { origem: string; liberar: () => void }) {
  const [f, setF] = useState({ nome: "", email: "", whatsapp: "", instagram: "", edita: "", videos: "", trava: "", website: "" });
  const [indo, setIndo] = useState(false);
  const [erro, setErro] = useState("");
  const campo = "mt-1 w-full rounded-xl border bg-white px-3.5 py-3 text-[16px] outline-none focus:border-[#6C3CF5]";
  const mudar = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });
  const marcar = (k: "edita" | "videos" | "trava") => (v: string) => setF({ ...f, [k]: v });

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (indo) return;
    setErro("");
    if (!f.edita || !f.videos || !f.trava) { setErro("Responde as 3 perguntas de múltipla escolha."); return; }
    setIndo(true);
    try {
      const r = await fetch("/api/raiox-lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...f, origem }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) { setErro(j.error || "Não consegui salvar agora. Tenta de novo?"); setIndo(false); return; }
      liberar();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setErro("Sem conexão. Tenta de novo?");
      setIndo(false);
    }
  };

  return (
    <form onSubmit={enviar} className="mt-5 rounded-[24px] p-5 shadow-sm sm:p-6" style={{ background: V.papel, border: "1px solid #E7E4F0" }}>
      <h2 className="text-xl font-extrabold">Preenche e o Raio-X libera na hora</h2>
      <p className="mt-1 text-[14.5px]" style={{ color: V.suave }}>Leva menos de um minuto. Todas as perguntas são obrigatórias.</p>
      <label className="mt-4 block text-sm font-bold">Seu nome
        <input className={campo} style={{ borderColor: V.borda }} value={f.nome} onChange={mudar("nome")} required maxLength={120} autoComplete="given-name" />
      </label>
      <label className="mt-3 block text-sm font-bold">Seu melhor e-mail
        <input className={campo} style={{ borderColor: V.borda }} type="email" value={f.email} onChange={mudar("email")} required maxLength={160} autoComplete="email" inputMode="email" />
      </label>
      <label className="mt-3 block text-sm font-bold">Seu WhatsApp com DDD
        <input className={campo} style={{ borderColor: V.borda }} value={f.whatsapp} onChange={mudar("whatsapp")} required maxLength={40} autoComplete="tel" inputMode="tel" placeholder="(11) 99999-9999" pattern="[^0-9]*([0-9][^0-9]*){10,}" title="Coloca o número com DDD" />
      </label>
      <label className="mt-3 block text-sm font-bold">Seu @ no Instagram
        <input className={campo} style={{ borderColor: V.borda }} value={f.instagram} onChange={mudar("instagram")} required maxLength={60} autoCapitalize="none" autoCorrect="off" placeholder="@seuperfil" />
      </label>
      <Opcoes nome="edita" titulo="Você edita seus próprios vídeos hoje?" opcoes={EDITA} valor={f.edita} mudar={marcar("edita")} />
      <Opcoes nome="videos" titulo="Quantos vídeos você entrega por mês?" opcoes={VIDEOS} valor={f.videos} mudar={marcar("videos")} />
      <Opcoes nome="trava" titulo="Qual é a parte da edição que mais te trava?" opcoes={TRAVA} valor={f.trava} mudar={marcar("trava")} />
      {/* isca pra robô: gente de verdade não vê nem preenche */}
      <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" value={f.website} onChange={mudar("website")} name="website" />
      {erro && <p className="mt-4 rounded-lg px-3 py-2 text-sm font-semibold" style={{ background: "#FFF1E6", color: "#9A3412" }}>{erro}</p>}
      <button type="submit" disabled={indo} className="mt-6 w-full rounded-full py-3.5 text-[16px] font-extrabold disabled:opacity-60" style={{ background: LIMA, color: V.escuro }}>
        {indo ? "Liberando…" : "Quero o Raio-X"}
      </button>
      <p className="mt-3 text-center text-xs" style={{ color: V.suave }}>Seus dados ficam só comigo. Nada de spam.</p>
    </form>
  );
}

function Liberado() {
  const [copiado, setCopiado] = useState("");
  const copiar = async () => {
    try { await navigator.clipboard.writeText(RAIO_X_PROMPT); setCopiado("Copiado! Agora cola no Claude."); }
    catch { const t = document.getElementById("raiox-prompt") as HTMLTextAreaElement | null; t?.focus(); t?.select(); setCopiado("Selecionei o texto: é só copiar."); }
  };
  return (
    <>
      <p className="mt-6 px-1 text-[26px] leading-tight" style={{ fontFamily: "var(--font-caveat)", color: V.roxo }}>Pronto, é seu! 💜</p>
      <section className="mt-2 rounded-[24px] p-5 sm:p-6" style={{ background: V.papel, border: "1px solid #E7E4F0" }}>
        <p className="text-[15.5px] leading-relaxed">O Raio-X está aqui embaixo. Salva esta página pra usar sempre antes de entregar um vídeo. Qualquer coisa, chama a <b>Isa</b> no WhatsApp.</p>
      </section>

      <section className="mt-4 rounded-[24px] p-5 sm:p-6" style={{ background: V.papel, border: "1px solid #E7E4F0" }}>
        <p className="text-[12px] font-bold uppercase tracking-[.14em]" style={{ color: V.roxo }}>Como usar</p>
        <ol className="mt-3 space-y-3">
          {[
            ["Copia o prompt", "No botão aqui embaixo."],
            ["Cola numa conversa nova do Claude", "Pode ser o Claude gratuito. Ele vai pedir os prints."],
            ["Manda os 5 prints, a fala e a duração", "Primeiro quadro, um com título, um com legenda, um com o seu rosto e o último quadro. Depois cola a fala do vídeo e diz quantos segundos ele tem."],
          ].map(([t, d], i) => (
            <li key={t} className="flex gap-3 rounded-2xl p-3.5" style={{ background: V.creme }}>
              <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl text-[16px] font-extrabold" style={{ background: V.lima, color: V.escuro }}>{i + 1}</span>
              <div>
                <p className="text-[15.5px] font-extrabold leading-snug">{t}</p>
                <p className="mt-0.5 text-[14px] leading-relaxed" style={{ color: "#33313A" }}>{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-4 rounded-[24px] p-5 sm:p-6" style={{ background: V.escuro, color: "#fff" }}>
        <p className="text-[12px] font-bold uppercase tracking-[.14em]" style={{ color: V.lima }}>O prompt</p>
        <textarea id="raiox-prompt" readOnly value={RAIO_X_PROMPT} className="mt-3 h-72 w-full resize-none rounded-2xl p-4 font-mono text-[12.5px] leading-relaxed" style={{ background: "rgba(255,255,255,.08)", color: "#EDEAF7" }} />
        <button type="button" onClick={copiar} className="mt-4 w-full rounded-full py-3.5 text-[16px] font-extrabold" style={{ background: LIMA, color: V.escuro }}>Copiar o Raio-X</button>
        {copiado && <p className="mt-2 text-center text-sm font-semibold" style={{ color: V.lima }}>{copiado}</p>}
      </section>

      <p className="mt-8 text-center text-sm" style={{ color: V.suave }}>
        Obrigada por ter ficado até o final 💜 <b style={{ color: V.roxo }}>@eilaradam</b>
      </p>
    </>
  );
}
