"use client";

import { useEffect, useState } from "react";

// Roxo + verde-limão: a família das páginas "feito com o Claude" (mesmas cores do /widget).
const V = { roxo: "#6C3CF5", escuro: "#1E0F4D", lima: "#DCFB4E", creme: "#F4F2EE", papel: "#FFFFFF", tinta: "#18181B", suave: "#5B5B66" };
const MARCA = "edicao_liberado";
const LIMA = "linear-gradient(135deg,#F0FF7A 0%,#DCFB4E 50%,#B8E02A 100%)";

// As 7 regras do carrossel C1 ("7 regras que eu ensinei pro meu editor de IA").
const REGRAS: { t: string; d: string }[] = [
  { t: "Nada de texto nas zonas mortas", d: "Topo, rodapé e a lateral direita do Reels ficam embaixo dos botões e da legenda do Instagram. Título e legenda moram no meio da tela." },
  { t: "Legenda branca, embaixo", d: "Branca, com uma sombra leve, no terço de baixo e acima da zona morta. Lê em qualquer fundo e não cobre o rosto." },
  { t: "B-roll cobre o take inteiro", d: "Quando entra uma imagem de apoio, ela fica até o fim daquela fala. Cortar no meio da frase dá cara de amador." },
  { t: "Título atrás da cabeça só olhando pra câmera", d: "O efeito do texto atrás de você só funciona quando você está de frente. Virou de lado, o título vai pra frente." },
  { t: "Ruído removido antes de tudo", d: "Primeiro limpa o áudio, depois corta. Senão você ajusta o corte duas vezes." },
  { t: "Confira a embalagem espelhada", d: "A câmera frontal espelha o rótulo. Antes de entregar pra marca, confere se o nome do produto aparece certo." },
  { t: "Corte só o trecho repetido", d: "Tira o take que você errou e repetiu, mas mantém o respiro entre as frases. Corte demais deixa a fala atropelada." },
];

export default function Edicao() {
  const [liberado, setLiberado] = useState(false);
  const [origem, setOrigem] = useState("edicao");

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
        <p className="text-sm font-bold" style={{ color: V.roxo }}>@eilaradam</p>

        <section className="relative mt-4 overflow-hidden rounded-[28px] p-6 sm:p-8" style={{ background: `linear-gradient(160deg, ${V.escuro} 0%, #3D1FA3 55%, ${V.roxo} 100%)`, color: "#fff" }}>
          <p className="text-[26px] leading-none" style={{ fontFamily: "var(--font-caveat)", color: V.lima }}>aula grátis ao vivo ✿</p>
          <h1 className="mt-2 text-[32px] font-extrabold leading-[1.05] tracking-tight sm:text-[40px]">Edição com Claude</h1>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,.8)" }}>
            Dia <b style={{ color: "#fff" }}>26/11, quinta, às 20h</b>, eu vou editar um vídeo de marca ao vivo com o Claude, do bruto ao final.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["cortes", "ruído", "legenda", "b-roll", "título atrás da cabeça"].map((t) => (
              <span key={t} className="rounded-full px-3 py-1 text-[12.5px] font-bold" style={{ background: "rgba(255,255,255,.12)", color: V.lima }}>{t}</span>
            ))}
          </div>
        </section>

        {liberado ? <Liberado /> : <Cadastro origem={origem} liberar={() => { try { localStorage.setItem(MARCA, "1"); } catch {} setLiberado(true); }} />}
      </div>
    </main>
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
      const r = await fetch("/api/edicao-lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...f, origem }) });
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
      <h2 className="text-xl font-extrabold">Garante seu lugar na aula</h2>
      <p className="mt-1 text-[14.5px]" style={{ color: V.suave }}>O link do grupo da aula chega no seu WhatsApp no dia 18/11. E o checklist das 7 regras que eu ensinei pro meu editor de IA libera agora.</p>
      <label className="mt-4 block text-sm font-bold">Seu nome
        <input className={campo} style={{ borderColor: "#DCD8EA" }} value={f.nome} onChange={mudar("nome")} required maxLength={120} autoComplete="given-name" />
      </label>
      <label className="mt-3 block text-sm font-bold">WhatsApp
        <input className={campo} style={{ borderColor: "#DCD8EA" }} value={f.whatsapp} onChange={mudar("whatsapp")} required maxLength={40} autoComplete="tel" inputMode="tel" placeholder="(11) 99999-9999" />
      </label>
      <label className="mt-3 block text-sm font-bold">Seu melhor e-mail
        <input className={campo} style={{ borderColor: "#DCD8EA" }} type="email" value={f.email} onChange={mudar("email")} required maxLength={160} autoComplete="email" inputMode="email" />
      </label>
      <label className="mt-3 block text-sm font-bold">@ do Instagram <span className="font-normal" style={{ color: V.suave }}>(opcional)</span>
        <input className={campo} style={{ borderColor: "#DCD8EA" }} value={f.instagram} onChange={mudar("instagram")} maxLength={60} autoCapitalize="none" placeholder="@seuperfil" />
      </label>
      {/* isca pra robô: gente de verdade não vê nem preenche */}
      <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" value={f.website} onChange={mudar("website")} name="website" />
      {erro && <p className="mt-3 rounded-lg px-3 py-2 text-sm font-semibold" style={{ background: "#FFF1E6", color: "#9A3412" }}>{erro}</p>}
      <button type="submit" disabled={indo} className="mt-5 w-full rounded-full py-3.5 text-[16px] font-extrabold disabled:opacity-60" style={{ background: LIMA, color: V.escuro }}>
        {indo ? "Salvando…" : "Quero participar"}
      </button>
      <p className="mt-3 text-center text-xs" style={{ color: V.suave }}>Seus dados ficam só comigo. Nada de spam.</p>
    </form>
  );
}

function Liberado() {
  return (
    <>
      <p className="mt-6 px-1 text-[26px] leading-tight" style={{ fontFamily: "var(--font-caveat)", color: V.roxo }}>Você tá na lista! 💜</p>
      <section className="mt-2 rounded-[24px] p-5 sm:p-6" style={{ background: V.papel, border: "1px solid #E7E4F0" }}>
        <p className="text-[15.5px] leading-relaxed">No dia <b>18/11</b> eu te mando no WhatsApp o link do grupo da aula. A aula é dia <b>26/11, às 20h</b>, ao vivo. Já coloca no calendário!</p>
      </section>

      <section className="mt-4 rounded-[24px] p-5 sm:p-6" style={{ background: V.papel, border: "1px solid #E7E4F0" }}>
        <p className="text-[12px] font-bold uppercase tracking-[.14em]" style={{ color: V.roxo }}>Seu presente</p>
        <h2 className="mt-1 text-[22px] font-extrabold leading-tight">As 7 regras que eu ensinei pro meu editor de IA</h2>
        <p className="mt-1 text-[14.5px]" style={{ color: V.suave }}>Vale pra quem edita com IA ou no app. Salva esta página e confere antes de entregar o próximo vídeo.</p>
        <ol className="mt-4 space-y-3">
          {REGRAS.map((r, i) => (
            <li key={r.t} className="flex gap-3 rounded-2xl p-3.5" style={{ background: V.creme }}>
              <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl text-[16px] font-extrabold" style={{ background: V.lima, color: V.escuro }}>{i + 1}</span>
              <div>
                <p className="text-[15.5px] font-extrabold leading-snug">{r.t}</p>
                <p className="mt-0.5 text-[14px] leading-relaxed" style={{ color: "#33313A" }}>{r.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-8 text-center text-sm" style={{ color: V.suave }}>
        Na aula eu mostro tudo isso acontecendo ao vivo. Te vejo lá 💜 <b style={{ color: V.roxo }}>@eilaradam</b>
      </p>
    </>
  );
}
