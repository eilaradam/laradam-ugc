"use client";

import { useEffect, useState } from "react";

// Cores da identidade da Lara: vinho, chartreuse e creme.
const V = { vinho: "#5A1230", escuro: "#2E0817", lima: "#DCFB4E", creme: "#F8F3EA", papel: "#FFFDF8", tinta: "#22181E", suave: "#6E5E64", rosa: "#FF4FA3" };
const MARCA = "widget_liberado";

const PROMPT = `Quero um widget no meu iPhone que mostre os posts que eu tenho que fazer.
Vou usar o app Scriptable (grátis).

Minha pauta está numa planilha do Google, publicada como CSV neste link:
[COLE AQUI O LINK DA SUA PLANILHA]

As colunas são:
- data (no formato do Brasil, DD/MM/AAAA)
- post (o título do post)
- status (a fazer, gravado, editado ou postado)

Cria o script completo pra eu colar no Scriptable:
- widget grande: mostra os posts de hoje e os 3 próximos que ainda não estão como "postado";
- post atrasado ganha uma etiqueta rosa dizendo há quantos dias está atrasado;
- post de hoje ganha a etiqueta HOJE em destaque;
- no topo, quantos posts eu já postei;
- cores: fundo [SUA COR DE FUNDO] e destaque [SUA COR DE DESTAQUE];
- tocar no widget abre a minha planilha;
- se a internet falhar, mostra a última versão que deu certo.

Depois me explica, passo a passo, como colar o script no Scriptable e colocar o widget na tela de início.`;

function hojeMais(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toLocaleDateString("pt-BR");
}

function baixarModelo() {
  const linhas = [
    ["data", "post", "status"],
    [hojeMais(-1), "Bastidor da gravação", "postado"],
    [hojeMais(0), "Dica completa em carrossel", "gravado"],
    [hojeMais(2), "Antes e depois", "a fazer"],
    [hojeMais(4), "Fiz com o Claude", "a fazer"],
  ];
  const csv = "﻿" + linhas.map((l) => l.map((c) => `"${c}"`).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "pauta-modelo.csv";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export default function Widget() {
  const [liberado, setLiberado] = useState(false);
  const [origem, setOrigem] = useState("widget");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const o = q.get("ref") || q.get("utm_campaign");
    // a origem e a marca de "já se cadastrou" só existem no navegador
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (o) setOrigem(o.slice(0, 40));
    try { if (localStorage.getItem(MARCA)) setLiberado(true); } catch {}
  }, []);

  return (
    <main className="min-h-screen pb-20" style={{ background: V.creme, color: V.tinta }}>
      <div className="mx-auto max-w-xl px-4 pt-8">
        <p className="text-sm font-bold" style={{ color: V.vinho }}>@eilaradam</p>

        <section className="relative mt-4 overflow-hidden rounded-[28px] p-6 sm:p-8" style={{ background: `linear-gradient(160deg, ${V.escuro} 0%, ${V.vinho} 70%, #7E1C42 100%)`, color: "#fff" }}>
          <p className="text-[26px] leading-none" style={{ fontFamily: "var(--font-caveat)", color: V.lima }}>feito com o Claude ✿</p>
          <h1 className="mt-2 text-[32px] font-extrabold leading-[1.05] tracking-tight sm:text-[40px]">Sua pauta na tela do celular</h1>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,.8)" }}>
            Um widget que mostra o que você tem que postar hoje e o que vem depois. Sem pagar app e sem saber programar.
          </p>
          <MiniWidget />
        </section>

        {liberado ? <PassoAPasso /> : <Cadastro origem={origem} liberar={() => { try { localStorage.setItem(MARCA, "1"); } catch {} setLiberado(true); }} />}
      </div>
    </main>
  );
}

function MiniWidget() {
  const linhas = [
    { tag: "HOJE", bg: V.lima, cor: V.tinta, t: "Dica completa em carrossel", s: "gravado" },
    { tag: "em 2 dias", bg: "#fff", cor: V.vinho, t: "Antes e depois", s: "a fazer" },
    { tag: "em 4 dias", bg: "#fff", cor: V.vinho, t: "Fiz com o Claude", s: "a fazer" },
  ];
  return (
    <div className="mt-6 w-full max-w-[300px] rounded-[22px] p-4 shadow-xl" style={{ background: V.vinho, border: "1px solid rgba(255,255,255,.12)" }} aria-label="Exemplo do widget">
      <div className="flex items-baseline justify-between">
        <b className="text-[15px]" style={{ color: V.lima }}>Pra hoje</b>
        <span className="text-[10px]" style={{ color: "rgba(255,255,255,.65)" }}>12 postados</span>
      </div>
      <ul className="mt-2.5 flex flex-col gap-2">
        {linhas.map((l) => (
          <li key={l.t} className="flex items-center gap-2">
            <span className="w-[58px] flex-shrink-0 rounded-md py-0.5 text-center text-[10px] font-bold" style={{ background: l.bg, color: l.cor }}>{l.tag}</span>
            <span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold">{l.t}</span>
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,.55)" }}>{l.s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Cadastro({ origem, liberar }: { origem: string; liberar: () => void }) {
  const [f, setF] = useState({ nome: "", email: "", whatsapp: "", instagram: "", website: "" });
  const [indo, setIndo] = useState(false);
  const [erro, setErro] = useState("");
  const campo = "mt-1 w-full rounded-xl border bg-white px-3.5 py-3 text-[16px] outline-none focus:border-[#5A1230]";
  const mudar = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (indo) return;
    setErro("");
    setIndo(true);
    try {
      const r = await fetch("/api/widget-lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...f, origem }) });
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
    <form onSubmit={enviar} className="mt-5 rounded-[24px] p-5 shadow-sm sm:p-6" style={{ background: V.papel, border: "1px solid #EFE6D8" }}>
      <h2 className="text-xl font-extrabold">Libera o passo a passo</h2>
      <p className="mt-1 text-[14.5px]" style={{ color: V.suave }}>Preenche rapidinho que ele aparece na hora, com o prompt pronto pra colar no Claude.</p>
      <label className="mt-4 block text-sm font-bold">Seu nome
        <input className={campo} style={{ borderColor: "#E6DCCD" }} value={f.nome} onChange={mudar("nome")} required maxLength={120} autoComplete="given-name" />
      </label>
      <label className="mt-3 block text-sm font-bold">Seu melhor e-mail
        <input className={campo} style={{ borderColor: "#E6DCCD" }} type="email" value={f.email} onChange={mudar("email")} required maxLength={160} autoComplete="email" inputMode="email" />
      </label>
      <label className="mt-3 block text-sm font-bold">WhatsApp <span className="font-normal" style={{ color: V.suave }}>(opcional)</span>
        <input className={campo} style={{ borderColor: "#E6DCCD" }} value={f.whatsapp} onChange={mudar("whatsapp")} maxLength={40} autoComplete="tel" inputMode="tel" placeholder="(11) 99999-9999" />
      </label>
      <label className="mt-3 block text-sm font-bold">@ do Instagram <span className="font-normal" style={{ color: V.suave }}>(opcional)</span>
        <input className={campo} style={{ borderColor: "#E6DCCD" }} value={f.instagram} onChange={mudar("instagram")} maxLength={60} autoCapitalize="none" placeholder="@seuperfil" />
      </label>
      {/* isca pra robô: gente de verdade não vê nem preenche */}
      <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" value={f.website} onChange={mudar("website")} name="website" />
      {erro && <p className="mt-3 rounded-lg px-3 py-2 text-sm font-semibold" style={{ background: "#FDE7EF", color: "#9B1C4A" }}>{erro}</p>}
      <button type="submit" disabled={indo} className="mt-5 w-full rounded-full py-3.5 text-[16px] font-extrabold disabled:opacity-60"
        style={{ background: "linear-gradient(135deg,#F0FF7A 0%,#DCFB4E 50%,#B8E02A 100%)", color: V.escuro }}>
        {indo ? "Liberando…" : "Quero o passo a passo"}
      </button>
      <p className="mt-3 text-center text-xs" style={{ color: V.suave }}>Seus dados ficam só comigo. Nada de spam.</p>
    </form>
  );
}

function Passo({ n, titulo, children }: { n: number; titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-4 rounded-[24px] p-5 sm:p-6" style={{ background: V.papel, border: "1px solid #EFE6D8" }}>
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl text-xl font-extrabold" style={{ background: V.lima, color: V.escuro }}>{n}</span>
        <h2 className="text-[19px] font-extrabold leading-tight">{titulo}</h2>
      </div>
      <div className="mt-3 space-y-2.5 text-[15.5px] leading-relaxed" style={{ color: "#3A2E33" }}>{children}</div>
    </section>
  );
}

function PassoAPasso() {
  const [copiou, setCopiou] = useState(false);
  const copiar = async () => {
    try { await navigator.clipboard.writeText(PROMPT); } catch { return; }
    setCopiou(true);
    setTimeout(() => setCopiou(false), 2500);
  };
  return (
    <>
      <p className="mt-6 px-1 text-[26px] leading-tight" style={{ fontFamily: "var(--font-caveat)", color: V.vinho }}>Prontinho! Bora montar o seu 👇</p>
      <p className="px-1 text-[15px]" style={{ color: V.suave }}>Leva uns 15 minutos. Você vai precisar do Google Planilhas, do Claude e do app Scriptable (todos grátis).</p>

      <Passo n={1} titulo="Monte sua pauta numa planilha">
        <p>Abre o Google Planilhas e cria uma planilha com três colunas: <b>data</b>, <b>post</b> e <b>status</b>. Uma linha pra cada post.</p>
        <p>No status, usa sempre as mesmas palavras: <b>a fazer</b>, <b>gravado</b>, <b>editado</b> ou <b>postado</b>.</p>
        <button type="button" onClick={baixarModelo} className="mt-1 rounded-full px-4 py-2 text-sm font-bold" style={{ background: V.creme, color: V.vinho, border: `1.5px solid ${V.vinho}` }}>
          ⬇ Baixar planilha modelo
        </button>
        <p className="text-sm" style={{ color: V.suave }}>No Google Planilhas: Arquivo → Importar → Fazer upload, e escolhe esse arquivo.</p>
      </Passo>

      <Passo n={2} titulo="Publique a planilha">
        <p>No computador, vai em <b>Arquivo → Compartilhar → Publicar na Web</b>. Escolhe a aba da pauta e o formato <b>Valores separados por vírgula (.csv)</b>. Toca em Publicar e copia o link.</p>
        <p className="rounded-xl px-3.5 py-2.5 text-[14px]" style={{ background: "#FFF6D6" }}>⚠️ Quem tiver esse link consegue ver a planilha. Coloca só a pauta, nada pessoal.</p>
      </Passo>

      <Passo n={3} titulo="Peça o widget pro Claude">
        <p>Copia o prompt abaixo, cola no Claude e troca o que está entre colchetes: o link da sua planilha e as suas cores.</p>
        <div className="relative mt-2 rounded-2xl p-4" style={{ background: V.escuro, color: "#F4ECEF" }}>
          <pre className="max-h-[340px] overflow-auto whitespace-pre-wrap text-[13.5px] leading-relaxed" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{PROMPT}</pre>
        </div>
        <button type="button" onClick={copiar} className="mt-2 w-full rounded-full py-3 text-[15px] font-extrabold"
          style={copiou ? { background: V.vinho, color: "#fff" } : { background: "linear-gradient(135deg,#F0FF7A 0%,#DCFB4E 50%,#B8E02A 100%)", color: V.escuro }}>
          {copiou ? "Copiado ✓" : "Copiar o prompt"}
        </button>
      </Passo>

      <Passo n={4} titulo="Cole o código no Scriptable">
        <p>Baixa o <b>Scriptable</b> na App Store (é grátis). Abre, toca no <b>+</b> lá em cima, cola o código que o Claude te deu e dá um nome, tipo <b>Pauta</b>.</p>
        <p>Toca no ▶ embaixo pra testar. Se aparecer sua pauta, deu certo. Se der erro, copia a mensagem e manda pro Claude que ele arruma.</p>
      </Passo>

      <Passo n={5} titulo="Coloque na tela de início">
        <p>Segura o dedo na tela de início até os ícones tremerem, toca no <b>+</b> (ou em Editar → Adicionar widget), procura <b>Scriptable</b> e escolhe o tamanho <b>grande</b>.</p>
        <p>Depois toca no widget ainda tremendo, em <b>Script</b>, e escolhe o <b>Pauta</b>. Pronto ✿</p>
      </Passo>

      <section className="mt-4 rounded-[24px] p-5 sm:p-6" style={{ background: V.vinho, color: "#fff" }}>
        <p className="text-[24px] leading-none" style={{ fontFamily: "var(--font-caveat)", color: V.lima }}>pra usar no dia a dia</p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px]" style={{ color: "rgba(255,255,255,.88)" }}>
          <li>Mudou a pauta? Mexe na planilha pelo app do Google Planilhas. O widget acompanha sozinho (o iPhone atualiza de tempos em tempos).</li>
          <li>Postou? Troca o status pra <b>postado</b> e ele sai da lista.</li>
          <li>O Scriptable é só pra iPhone. No Android, a mesma ideia funciona com o app KWGT: pede pro Claude adaptar.</li>
        </ul>
      </section>

      <p className="mt-8 text-center text-sm" style={{ color: V.suave }}>
        Fez o seu? Me marca no story <b style={{ color: V.vinho }}>@eilaradam</b> que eu quero ver 💜
      </p>
    </>
  );
}
