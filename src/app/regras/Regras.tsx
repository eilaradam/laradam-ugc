"use client";

import { useEffect, useState } from "react";

// Mesma cara do carrossel: marrom com grade, faixa oliva, título amarelo-claro e cards creme.
const C = { fundo: "#33241B", grade: "rgba(255,240,200,.07)", oliva: "#9A8657", amarelo: "#F4EDB2", creme: "#FBF7F0", tinta: "#2B1E16", suave: "#6B5B4C", claro: "rgba(251,247,240,.82)" };
const MARCA = "regras_liberado";
const GRUPO = "/grupo?de=regras-pagina";

const REGRAS = [
  { t: "Margem de segurança do Reels", d: "O Instagram cobre o topo com o \"Para você\", a base com o nome e a legenda do post, e a direita com a coluna de curtir. Texto nessas áreas some ou fica cortado, então tudo que importa fica no miolo da tela. (Eu já postei título escondido embaixo do \"Para você\" rs.)" },
  { t: "Legenda branca, sem borda e sempre embaixo", d: "Borda preta, cor neon e legenda no meio da tela são a cara do vídeo editado no automático. A legenda limpa, embaixo e longe do rosto, deixa quem assiste prestar atenção em você." },
  { t: "Título atrás da cabeça, só olhando pra câmera", d: "É o efeito que mais dá cara de edição profissional, mas ele só funciona quando você fala olhando pra câmera e o texto continua legível. Em b-roll e take de produto, o título vai na frente." },
];

function Faixa({ children }: { children: React.ReactNode }) {
  return <span className="inline-block px-2.5 py-1 text-[19px] font-extrabold leading-tight sm:text-[22px]" style={{ background: C.oliva, color: C.creme }}>{children}</span>;
}

export default function Regras() {
  const [liberado, setLiberado] = useState(false);
  const [origem, setOrigem] = useState("carrossel-regras");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const o = q.get("ref") || q.get("utm_campaign");
    // a origem e a marca de "já se cadastrou" só existem no navegador
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (o) setOrigem(o.slice(0, 40));
    try { if (localStorage.getItem(MARCA)) setLiberado(true); } catch {}
  }, []);

  return (
    <main className="min-h-screen pb-16" style={{
      background: C.fundo, color: C.creme,
      backgroundImage: `linear-gradient(${C.grade} 1px, transparent 1px), linear-gradient(90deg, ${C.grade} 1px, transparent 1px)`,
      backgroundSize: "28px 28px",
    }}>
      <div className="mx-auto max-w-xl px-4 pt-7">
        <div className="flex items-center justify-between text-[14px] font-semibold" style={{ color: C.claro }}>
          <span>@eilaradam</span><span className="font-bold" style={{ color: C.creme }}>Lara Dam</span>
        </div>

        <div className="mt-9">
          <Faixa>as 3 principais regras que eu dei pro Claude</Faixa>
          <h1 className="mt-3 text-[40px] font-extrabold leading-[1.02] tracking-tight sm:text-[52px]" style={{ color: C.amarelo }}>pra editar meus vídeos</h1>
          <p className="mt-3 text-[16px] leading-relaxed" style={{ color: C.claro }}>Das regras que eu uso pra editar com o Claude, essas são as que mais mudam a cara do vídeo.</p>
        </div>

        {liberado ? <Liberado /> : <Cadastro origem={origem} liberar={() => { try { localStorage.setItem(MARCA, "1"); } catch {} setLiberado(true); }} />}
      </div>
    </main>
  );
}

function Cadastro({ origem, liberar }: { origem: string; liberar: () => void }) {
  const [f, setF] = useState({ nome: "", email: "", whatsapp: "", instagram: "", website: "" });
  const [indo, setIndo] = useState(false);
  const [erro, setErro] = useState("");
  const campo = "mt-1 w-full rounded-xl border bg-white px-3.5 py-3 text-[16px] font-normal outline-none focus:border-[#9A8657]";
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
    } catch {
      setErro("Sem conexão. Tenta de novo?");
      setIndo(false);
    }
  };

  return (
    <form onSubmit={enviar} className="relative mt-8 rounded-[24px] p-5 sm:p-6" style={{ background: C.creme, color: C.tinta }}>
      <h2 className="text-[20px] font-bold">Libera as 3 regras aqui</h2>
      <p className="mt-1 text-[14.5px] leading-relaxed" style={{ color: C.suave }}>Preenche rapidinho e as regras aparecem na hora.</p>
      <label className="mt-4 block text-sm font-semibold">Seu nome
        <input className={campo} style={{ borderColor: "#E4DACB" }} value={f.nome} onChange={mudar("nome")} required maxLength={120} autoComplete="given-name" />
      </label>
      <label className="mt-3 block text-sm font-semibold">WhatsApp
        <input className={campo} style={{ borderColor: "#E4DACB" }} value={f.whatsapp} onChange={mudar("whatsapp")} required maxLength={40} autoComplete="tel" inputMode="tel" placeholder="(11) 99999-9999" />
      </label>
      <label className="mt-3 block text-sm font-semibold">Seu melhor e-mail
        <input className={campo} style={{ borderColor: "#E4DACB" }} type="email" value={f.email} onChange={mudar("email")} required maxLength={160} autoComplete="email" inputMode="email" />
      </label>
      <label className="mt-3 block text-sm font-semibold">@ do Instagram <span className="font-normal" style={{ color: C.suave }}>(opcional)</span>
        <input className={campo} style={{ borderColor: "#E4DACB" }} value={f.instagram} onChange={mudar("instagram")} maxLength={60} autoCapitalize="none" placeholder="@seuperfil" />
      </label>
      {/* isca pra robô: gente de verdade não vê nem preenche */}
      <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" value={f.website} onChange={mudar("website")} name="website" />
      {erro && <p className="mt-3 rounded-lg px-3 py-2 text-sm font-semibold" style={{ background: "#F6E7D8", color: "#7A3A12" }}>{erro}</p>}
      <button type="submit" disabled={indo} className="mt-5 w-full rounded-full py-3.5 text-[16px] font-bold disabled:opacity-60" style={{ background: C.fundo, color: C.amarelo }}>
        {indo ? "Liberando…" : "Quero as 3 regras"}
      </button>
      <p className="mt-3 text-center text-xs" style={{ color: C.suave }}>Seus dados ficam só comigo. Nada de spam.</p>
    </form>
  );
}

function Liberado() {
  return (
    <>
      <ol className="mt-8 space-y-4">
        {REGRAS.map((r, i) => (
          <li key={r.t} className="flex gap-4 rounded-[22px] p-5 sm:p-6" style={{ background: C.creme, color: C.tinta }}>
            <span className="text-[30px] font-extrabold leading-none" style={{ color: C.oliva }}>{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="text-[17px] font-bold leading-snug">{r.t}</p>
              <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "#4A3B30" }}>{r.d}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12">
        <Faixa>essas são só 3 das minhas regras</Faixa>
        <h2 className="mt-3 text-[40px] font-extrabold leading-[1.02] tracking-tight sm:text-[48px]" style={{ color: C.amarelo }}>o resto eu mostro ao vivo</h2>
        <p className="mt-3 text-[20px] font-bold">aula gratuita · 24/11, terça, 20h</p>
        <p className="mt-3 text-[16px] leading-relaxed" style={{ color: C.claro }}>Na aula eu ensino o Claude a editar com as suas regras e com a cara do seu perfil, do vídeo bruto até o pronto pra postar. O link da aula sai só no grupo do WhatsApp.</p>
        <a href={GRUPO} className="mt-6 block w-full rounded-full py-4 text-center text-[17px] font-bold" style={{ background: C.amarelo, color: C.tinta }}>Entrar no grupo da aula 👉</a>
      </div>

      <p className="mt-10 text-center text-sm" style={{ color: C.claro }}>Te vejo lá 🤎 <b style={{ color: C.creme }}>@eilaradam</b></p>
    </>
  );
}
