"use client";

import { useEffect, useState } from "react";

// Roxo + verde-limão: as mesmas cores do widget da rotina que aparece no reels.
const V = { vinho: "#6C3CF5", escuro: "#1E0F4D", lima: "#DCFB4E", creme: "#F4F2EE", papel: "#FFFFFF", tinta: "#18181B", suave: "#5B5B66" };
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
- post atrasado ganha uma etiqueta vermelha dizendo há quantos dias está atrasado;
- post de hoje ganha a etiqueta HOJE em destaque;
- no topo, quantos posts eu já postei;
- cores: fundo [SUA COR DE FUNDO] e destaque [SUA COR DE DESTAQUE];
- tocar no widget abre a minha planilha;
- se a internet falhar, mostra a última versão que deu certo.

Depois me explica, passo a passo, como colar o script no Scriptable e colocar o widget na tela de início.`;

function DesenhoPlanilha() {
  const linhas = [
    ["10/11", "Bastidor da gravação", "postado"],
    ["11/11", "Dica em carrossel", "gravado"],
    ["13/11", "Antes e depois", "a fazer"],
    ["15/11", "Fiz com o Claude", "a fazer"],
  ];
  const cor: Record<string, string> = { postado: "#1E8E3E", gravado: "#B06000", "a fazer": "#5B5B66" };
  const cel = "border px-2 py-1.5 text-[12.5px] whitespace-nowrap overflow-hidden text-ellipsis";
  return (
    <div className="mt-2 overflow-hidden rounded-xl border shadow-sm" style={{ borderColor: "#DADCE0", background: "#fff" }} aria-label="Exemplo da planilha">
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: "#F1F3F4", borderBottom: "1px solid #DADCE0" }}>
        <span className="grid h-5 w-4 place-items-center rounded-[3px] text-[9px] font-bold text-white" style={{ background: "#1E8E3E" }}>▦</span>
        <span className="text-[12px] font-semibold" style={{ color: "#3C4043" }}>Minha pauta</span>
      </div>
      <table className="w-full table-fixed border-collapse" style={{ color: "#202124" }}>
        <colgroup><col style={{ width: 26 }} /><col style={{ width: "22%" }} /><col /><col style={{ width: "26%" }} /></colgroup>
        <thead>
          <tr style={{ background: "#F8F9FA", color: "#5F6368" }}>
            <th className={cel + " text-[10px] font-normal"} style={{ borderColor: "#E2E3E5" }}></th>
            {["A", "B", "C"].map((l) => <th key={l} className={cel + " text-[10px] font-normal"} style={{ borderColor: "#E2E3E5" }}>{l}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={cel + " text-center text-[10px]"} style={{ borderColor: "#E2E3E5", background: "#F8F9FA", color: "#5F6368" }}>1</td>
            {["data", "post", "status"].map((h) => <td key={h} className={cel + " font-bold"} style={{ borderColor: "#E2E3E5" }}>{h}</td>)}
          </tr>
          {linhas.map((l, i) => (
            <tr key={l[1]}>
              <td className={cel + " text-center text-[10px]"} style={{ borderColor: "#E2E3E5", background: "#F8F9FA", color: "#5F6368" }}>{i + 2}</td>
              <td className={cel} style={{ borderColor: "#E2E3E5" }}>{l[0]}</td>
              <td className={cel} style={{ borderColor: "#E2E3E5" }}>{l[1]}</td>
              <td className={cel + " font-semibold"} style={{ borderColor: "#E2E3E5", color: cor[l[2]] }}>{l[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
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

        <section className="relative mt-4 overflow-hidden rounded-[28px] p-6 sm:p-8" style={{ background: `linear-gradient(160deg, ${V.escuro} 0%, #3D1FA3 55%, ${V.vinho} 100%)`, color: "#fff" }}>
          <p className="text-[26px] leading-none" style={{ fontFamily: "var(--font-caveat)", color: V.lima }}>feito com o Claude ✿</p>
          <h1 className="mt-2 text-[32px] font-extrabold leading-[1.05] tracking-tight sm:text-[40px]">Sua semana na tela do celular</h1>
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
  const campo = "mt-1 w-full rounded-xl border bg-white px-3.5 py-3 text-[16px] outline-none focus:border-[#6C3CF5]";
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
    <form onSubmit={enviar} className="mt-5 rounded-[24px] p-5 shadow-sm sm:p-6" style={{ background: V.papel, border: "1px solid #E7E4F0" }}>
      <h2 className="text-xl font-extrabold">Libera o passo a passo</h2>
      <p className="mt-1 text-[14.5px]" style={{ color: V.suave }}>Preenche rapidinho que ele aparece na hora, com o prompt pronto pra colar no Claude.</p>
      <label className="mt-4 block text-sm font-bold">Seu nome
        <input className={campo} style={{ borderColor: "#DCD8EA" }} value={f.nome} onChange={mudar("nome")} required maxLength={120} autoComplete="given-name" />
      </label>
      <label className="mt-3 block text-sm font-bold">Seu melhor e-mail
        <input className={campo} style={{ borderColor: "#DCD8EA" }} type="email" value={f.email} onChange={mudar("email")} required maxLength={160} autoComplete="email" inputMode="email" />
      </label>
      <label className="mt-3 block text-sm font-bold">WhatsApp <span className="font-normal" style={{ color: V.suave }}>(opcional)</span>
        <input className={campo} style={{ borderColor: "#DCD8EA" }} value={f.whatsapp} onChange={mudar("whatsapp")} maxLength={40} autoComplete="tel" inputMode="tel" placeholder="(11) 99999-9999" />
      </label>
      <label className="mt-3 block text-sm font-bold">@ do Instagram <span className="font-normal" style={{ color: V.suave }}>(opcional)</span>
        <input className={campo} style={{ borderColor: "#DCD8EA" }} value={f.instagram} onChange={mudar("instagram")} maxLength={60} autoCapitalize="none" placeholder="@seuperfil" />
      </label>
      {/* isca pra robô: gente de verdade não vê nem preenche */}
      <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" value={f.website} onChange={mudar("website")} name="website" />
      {erro && <p className="mt-3 rounded-lg px-3 py-2 text-sm font-semibold" style={{ background: "#FFF1E6", color: "#9A3412" }}>{erro}</p>}
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
    <section className="mt-4 rounded-[24px] p-5 sm:p-6" style={{ background: V.papel, border: "1px solid #E7E4F0" }}>
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl text-xl font-extrabold" style={{ background: V.lima, color: V.escuro }}>{n}</span>
        <h2 className="text-[19px] font-extrabold leading-tight">{titulo}</h2>
      </div>
      <div className="mt-3 space-y-2.5 text-[15.5px] leading-relaxed" style={{ color: "#33313A" }}>{children}</div>
    </section>
  );
}

const PROMPT_ANDROID = `Monta a minha pauta de posts do Instagram desta semana em forma de checklist, pra eu colar numa nota do Google Keep.

Uma linha por post, neste formato:
SEG 10/11 · título curto do post

Sobre mim: [O QUE VOCÊ POSTA, EX.: UGC, BELEZA, ROTINA]
Quantos posts por semana: [EX.: 3]
Ideias que eu já tenho: [SE TIVER, ESCREVE AQUI]

Só a lista, sem explicação.`;

function BotaoCopiar({ texto }: { texto: string }) {
  const [copiou, setCopiou] = useState(false);
  const copiar = async () => {
    try { await navigator.clipboard.writeText(texto); } catch { return; }
    setCopiou(true);
    setTimeout(() => setCopiou(false), 2500);
  };
  return (
    <>
      <div className="relative mt-2 rounded-2xl p-4" style={{ background: V.escuro, color: "#EEEAFB" }}>
        <pre className="max-h-[300px] overflow-auto whitespace-pre-wrap text-[13.5px] leading-relaxed" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{texto}</pre>
      </div>
      <button type="button" onClick={copiar} className="mt-2 w-full rounded-full py-3 text-[15px] font-extrabold"
        style={copiou ? { background: V.vinho, color: "#fff" } : { background: "linear-gradient(135deg,#F0FF7A 0%,#DCFB4E 50%,#B8E02A 100%)", color: V.escuro }}>
        {copiou ? "Copiado ✓" : "Copiar o prompt"}
      </button>
    </>
  );
}

function PassoAPasso() {
  const [cel, setCel] = useState<"iphone" | "android" | null>(null);
  useEffect(() => {
    // abre já no celular de quem está vendo
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCel(/android/i.test(navigator.userAgent) ? "android" : "iphone");
  }, []);
  const aba = (k: "iphone" | "android", t: string) => (
    <button type="button" onClick={() => setCel(k)} className="flex-1 rounded-full py-2.5 text-[15px] font-extrabold"
      style={cel === k ? { background: V.vinho, color: "#fff" } : { background: "transparent", color: V.vinho }}>
      {t}
    </button>
  );
  return (
    <>
      <p className="mt-6 px-1 text-[26px] leading-tight" style={{ fontFamily: "var(--font-caveat)", color: V.vinho }}>Prontinho! Bora montar o seu 👇</p>
      <div className="mt-2 flex gap-1 rounded-full p-1" style={{ background: V.papel, border: "1px solid #E7E4F0" }}>
        {aba("iphone", "iPhone")}
        {aba("android", "Android")}
      </div>

      {cel === "android" ? (
        <>
          <p className="mt-3 px-1 text-[15px]" style={{ color: V.suave }}>Leva uns 5 minutos. Você só precisa do Claude e do Google Keep (já vem no Android).</p>
          <Passo n={1} titulo="Peça sua pauta pro Claude">
            <p>Copia o prompt, cola no Claude e troca o que está entre colchetes.</p>
            <BotaoCopiar texto={PROMPT_ANDROID} />
          </Passo>
          <Passo n={2} titulo="Cole numa nota do Keep">
            <p>Abre o <b>Google Keep</b>, cria uma nota chamada <b>Minha semana</b> e cola a lista. Toca nos três pontinhos → <b>Mostrar caixas de seleção</b> pra virar checklist.</p>
          </Passo>
          <Passo n={3} titulo="Coloque na tela de início">
            <p>Segura o dedo num espaço vazio da tela → <b>Widgets</b> → <b>Keep</b> → <b>Nota única</b>, e escolhe a nota <b>Minha semana</b>.</p>
            <p>Postou? Marca o quadradinho e ele risca na hora ✿</p>
          </Passo>
        </>
      ) : (
        <>
          <p className="mt-3 px-1 text-[15px]" style={{ color: V.suave }}>Leva uns 15 minutos. Você vai precisar do Google Planilhas, do Claude e do app Scriptable (todos grátis).</p>
          <Passo n={1} titulo="Crie uma planilha">
            <p>Pode ser no <b>Google Planilhas</b>. Coloca três colunas, <b>data</b>, <b>post</b> e <b>status</b>, e uma linha pra cada post. Fica assim:</p>
            <DesenhoPlanilha />
          </Passo>
          <Passo n={2} titulo="Pegue o link da planilha">
            <p>No computador: <b>Arquivo → Compartilhar → Publicar na Web</b>, formato <b>.csv</b>. Copia o link que aparecer.</p>
            <p className="text-sm" style={{ color: V.suave }}>Quem tiver esse link vê a planilha, então coloca só a pauta.</p>
          </Passo>
          <Passo n={3} titulo="Peça o widget pro Claude">
            <p>Copia o prompt, cola no Claude e troca o que está entre colchetes.</p>
            <BotaoCopiar texto={PROMPT} />
          </Passo>
          <Passo n={4} titulo="Coloque na tela de início">
            <p>Baixa o <b>Scriptable</b> na App Store, toca no <b>+</b>, cola o código do Claude e salva como <b>Pauta</b>.</p>
            <p>Na tela de início, segura o dedo → <b>Editar → Adicionar widget</b> → <b>Scriptable</b> (grande). Toca no widget, em <b>Script</b>, escolhe <b>Pauta</b>. Pronto ✿</p>
            <p className="text-sm" style={{ color: V.suave }}>Deu erro? Copia a mensagem e manda pro Claude que ele arruma.</p>
          </Passo>
        </>
      )}

      <p className="mt-8 text-center text-sm" style={{ color: V.suave }}>
        Fez o seu? Me marca no story <b style={{ color: V.vinho }}>@eilaradam</b> que eu quero ver 💜
      </p>
    </>
  );
}
