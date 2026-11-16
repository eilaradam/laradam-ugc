"use client";

import { useEffect, useState } from "react";

// Mesma cara do carrossel: marrom com grade, faixa oliva, título amarelo-claro e cards creme.
const C = { fundo: "#33241B", grade: "rgba(255,240,200,.07)", oliva: "#9A8657", amarelo: "#F4EDB2", creme: "#FBF7F0", tinta: "#2B1E16", suave: "#6B5B4C", claro: "rgba(251,247,240,.82)" };
const MARCA = "renda_liberado";
const GRUPO = "/grupo?de=renda-pagina";

type Item = { t: string; d: string[]; num?: string };
const ITENS: Item[] = [
  {
    t: "Parei de depender só do UGC gravado em casa",
    d: [
      "O vídeo que eu gravo em casa continua sendo a base, mas é onde o valor é mais baixo e a concorrência é maior. Quando ele é a única entrada, o mês depende de quantas campanhas você passa.",
      "Esse mês eu somei outras frentes em cima dele, e são elas que estão aqui embaixo.",
    ],
  },
  {
    t: "Comecei a oferecer meu trabalho presencial",
    num: "2 trabalhos em SP · R$ 6.050",
    d: [
      "Foi o que mais fez diferença. Gravei no espaço das marcas, em São Paulo, e isso mudou a conversa: em vez de 1 vídeo, eu fechei pacote. Foram de 3 a 7 vídeos por marca, uma média de 5.",
      "Como a marca já está pagando pra eu estar lá, faz sentido gravar vários vídeos no mesmo dia. E o deslocamento eu cobro à parte, separado do valor dos vídeos.",
      "Na média, cada vídeo presencial saiu por uns R$ 600. Na plataforma, minha média é de R$ 474 por campanha.",
    ],
  },
  {
    t: "Me posicionei pra fechar com marca gringa",
    num: "4 marcas · USD 2.080",
    d: [
      "Recebi vários e-mails de agências de fora, que procuram creator pelo conteúdo. O que me ajudou a ser encontrada: nicho claro no perfil e um e-mail fácil de achar.",
      "Entendi o valor de mercado de lá e passei a cobrar mais. Na média, cada vídeo gringo saiu por uns USD 300, perto de R$ 1.500. É mais de três vezes o que eu ganho por campanha na plataforma.",
    ],
  },
  {
    t: "Negociei do jeito que agência de fora negocia",
    d: [
      "Preço separado por item: o vídeo, os formatos extras (vertical, horizontal, quadrado), cada mês de uso em anúncio, o post no meu perfil e o TikTok. Assim a marca monta o pacote e você não dá nada de graça.",
      "Abri o valor mais alto e deixei espaço pra negociar. Agência sempre faz contraproposta.",
      "Pergunto antes de fechar: prazo do roteiro, da primeira versão e da entrega final, idioma, exclusividade e o material da marca.",
      "Prazo de pagamento: agência de fora costuma pagar de 30 a 60 dias depois da fatura, por PayPal, Wise ou Tipalti. Eu sempre peço 50% adiantado. Nem toda agência aceita, mas não custa pedir.",
    ],
  },
  {
    t: "Me inscrevi mais na Seu Influencer",
    num: "20 campanhas · R$ 9.480",
    d: [
      "Passei a me inscrever todo dia, logo que a campanha aparece. Vou fazer um conteúdo só sobre isso no perfil, com tudo o que eu mudei por lá.",
    ],
  },
  {
    t: "Comecei a fazer gestão de campanha",
    num: "2 marcas · R$ 14.000",
    d: [
      "Além de gravar, eu cuido das campanhas de UGC de duas marcas como UGC Manager: escolho as creators, acompanho os roteiros e as entregas. É o mesmo mercado, só que do outro lado.",
    ],
  },
];

function Faixa({ children }: { children: React.ReactNode }) {
  return <span className="inline-block px-2.5 py-1 text-[19px] font-extrabold leading-tight sm:text-[22px]" style={{ background: C.oliva, color: C.creme }}>{children}</span>;
}

export default function Renda() {
  const [liberado, setLiberado] = useState(false);
  const [origem, setOrigem] = useState("renda-ugc");

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
          <Faixa>o que eu fiz nos últimos 30 dias</Faixa>
          <h1 className="mt-3 text-[40px] font-extrabold leading-[1.02] tracking-tight sm:text-[52px]" style={{ color: C.amarelo }}>pra fechar R$ 45 mil com UGC</h1>
          <p className="mt-3 text-[16px] leading-relaxed" style={{ color: C.claro }}>Sem contar curso nem mentoria. Abaixo, cada mudança com o número que ela trouxe.</p>
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
      <h2 className="text-[20px] font-bold">Libera o passo a passo aqui</h2>
      <p className="mt-1 text-[14.5px] leading-relaxed" style={{ color: C.suave }}>Preenche rapidinho e tudo aparece na hora.</p>
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
        {indo ? "Liberando…" : "Quero ver"}
      </button>
      <p className="mt-3 text-center text-xs" style={{ color: C.suave }}>Seus dados ficam só comigo. Nada de spam.</p>
    </form>
  );
}

function Liberado() {
  return (
    <>
      <ol className="mt-8 space-y-4">
        {ITENS.map((r, i) => (
          <li key={r.t} className="flex gap-4 rounded-[22px] p-5 sm:p-6" style={{ background: C.creme, color: C.tinta }}>
            <span className="text-[30px] font-extrabold leading-none" style={{ color: C.oliva }}>{String(i + 1).padStart(2, "0")}</span>
            <div className="min-w-0">
              <p className="text-[17px] font-bold leading-snug">{r.t}</p>
              {r.num && <p className="mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-[13px] font-bold" style={{ background: C.amarelo, color: C.tinta }}>{r.num}</p>}
              {r.d.map((p, j) => (
                <p key={j} className="mt-2 text-[15px] leading-relaxed" style={{ color: "#4A3B30" }}>{p}</p>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12">
        <Faixa>e tem uma coisa que me fez ganhar tempo pra tudo isso</Faixa>
        <h2 className="mt-3 text-[40px] font-extrabold leading-[1.02] tracking-tight sm:text-[48px]" style={{ color: C.amarelo }}>aula gratuita</h2>
        <p className="mt-3 text-[20px] font-bold">24/11, terça, 20h</p>
        <p className="mt-3 text-[16px] leading-relaxed" style={{ color: C.claro }}>Eu edito meus vídeos com o Claude, e é isso que me deixa tempo pra gravar presencial, negociar com gringa e me inscrever todo dia. Na aula eu mostro como fazer o Claude editar com as suas regras e a cara do seu perfil. O link sai só no grupo do WhatsApp.</p>
        <a href={GRUPO} className="mt-6 block w-full rounded-full py-4 text-center text-[17px] font-bold" style={{ background: C.amarelo, color: C.tinta }}>Entrar no grupo da aula 👉</a>
      </div>

      <p className="mt-10 text-center text-sm" style={{ color: C.claro }}>Te vejo lá 🤎 <b style={{ color: C.creme }}>@eilaradam</b></p>
    </>
  );
}
