"use client";

import { useEffect, useState } from "react";

// Mesmas cores da página do widget (roxo + verde-limão), pra as iscas parecerem da mesma família.
const V = { roxo: "#6C3CF5", escuro: "#1E0F4D", lima: "#DCFB4E", creme: "#F4F2EE", papel: "#FFFFFF", tinta: "#18181B", suave: "#5B5B66" };
const MARCA = "roteiro_liberado";
const LIMA = "linear-gradient(135deg,#F0FF7A 0%,#DCFB4E 50%,#B8E02A 100%)";

const PROMPT = `Você vai me ajudar a montar um roteiro de UGC pra uma marca, no formato que a marca consegue aprovar rápido.

BRIEFING DA MARCA (colei abaixo):
[COLE AQUI O BRIEFING INTEIRO, COM O LINK DO SITE DO PRODUTO]

SOBRE MIM E A GRAVAÇÃO:
- Meu nicho e como eu falo: [EX.: BELEZA, TOM DE AMIGA, DIRETO]
- Onde vou gravar: [EM CASA / NO ESPAÇO DA MARCA / NA RUA]
- Eu já tenho e uso o produto? [SIM / NÃO, VOU RECEBER]
- Duração pedida: [EX.: 30 A 45 SEGUNDOS]

ANTES DE ESCREVER:
1. Me diga em 3 linhas o que você entendeu: o produto, o público e o objetivo do vídeo.
2. Se faltar alguma informação (oferta, cupom, o que pode e o que não pode falar), me pergunte em vez de inventar.

COMO O ROTEIRO TEM QUE SER:
- 2 ganchos diferentes. Os dois precisam levar à MESMA primeira fala, porque a marca vai escolher um ou testar os dois. Se o briefing trouxer um gancho sugerido pela marca, ele é o Gancho 1.
- O gancho termina no que a primeira fala responde. Leia os dois em voz alta: tem que soar como uma conversa, e a fala não repete o gancho.
- Divida o resto em cenas. Em cada cena, escreva:
  FALA: o que eu falo, do jeito que se fala, não do jeito que se escreve.
  TELA: o que aparece na imagem, em primeira pessoa ("eu abro a caixa").
- O produto aparece em ação (usando, aplicando, abrindo), não só na minha mão.
- Preço, composição e números vão pro lettering, não pra fala.
- Termine com uma chamada só, com uma ação e o que a pessoa ganha.

O QUE NÃO PODE:
- Inventar fato, experiência ou característica do produto. Só vale o que está no briefing ou no site.
- Dizer que eu tenho, comprei ou uso o produto se eu disse que não.
- Falar "aqui em casa" se a gravação for no espaço da marca.
- Abrir falando de experiência ruim ("comprou e não gostou").
- Gancho de fórmula: "Você sabia que…", "Se você gosta de X…", "Amiga…".
- Travessão, frase de efeito no fim de cada bloco e lista de benefícios recitada.
- Palavra com duplo sentido. Leia cada frase fora de contexto.
- Promessa de saúde ou resultado garantido.

CHECAGEM FINAL (faça antes de me entregar):
- Cada gancho conecta com a primeira fala?
- Conte as palavras e calcule o tempo (umas 3,5 palavras por segundo). Cabe na duração pedida?
- Tem alguma afirmação que eu não confirmei?
- Lendo em voz alta, soa como gente falando?

ENTREGA:
Me devolva assim:
GANCHO 1 · fala · tela
GANCHO 2 · fala · tela
CENA 1, CENA 2… · fala · tela
LETTERING: o que entra escrito na tela
TEMPO: palavras e segundos
DÚVIDAS: o que eu preciso confirmar com a marca`;

const CUIDADOS: { t: string; nao: string; sim: string }[] = [
  { t: "O gancho conversa com a primeira fala", nao: "O gancho fala de uma coisa e a fala seguinte responde outra.", sim: "A primeira fala responde o que o gancho puxou." },
  { t: "Dois ganchos, o mesmo roteiro", nao: "Cada gancho precisa de um vídeo diferente.", sim: "O resto funciona com qualquer um dos dois." },
  { t: "O lugar da gravação manda no texto", nao: "\"Aqui na minha cozinha…\" gravando no espaço da marca.", sim: "\"Na sua cozinha…\"" },
  { t: "Nunca diz que tem o produto se não tem", nao: "\"Eu comprei esse forno…\"", sim: "\"Vamos ver em quanto tempo esse forno faz uma pizza?\"" },
  { t: "Lê em voz alta procurando duplo sentido", nao: "Num vídeo de travesseiro: \"o quanto eu dormi bem essa noite\" 👀", sim: "\"Precisamos falar sobre esse travesseiro.\"" },
];

export default function RoteiroPrompt() {
  const [liberado, setLiberado] = useState(false);
  const [origem, setOrigem] = useState("roteiro");

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
          <p className="text-[26px] leading-none" style={{ fontFamily: "var(--font-caveat)", color: V.lima }}>depois de +100 campanhas ✿</p>
          <h1 className="mt-2 text-[32px] font-extrabold leading-[1.05] tracking-tight sm:text-[40px]">O prompt que estrutura seu roteiro pra marca</h1>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,.8)" }}>
            Você cola o briefing, ele devolve o roteiro com 2 ganchos, falas por cena e o que aparece na tela. No formato que a marca consegue aprovar rápido.
          </p>
          <MiniRoteiro />
        </section>

        {liberado ? <Liberado /> : <Cadastro origem={origem} liberar={() => { try { localStorage.setItem(MARCA, "1"); } catch {} setLiberado(true); }} />}
      </div>
    </main>
  );
}

function MiniRoteiro() {
  return (
    <div className="mt-6 w-full max-w-[320px] rounded-[22px] bg-white p-4 shadow-xl" style={{ color: V.tinta }} aria-label="Exemplo de roteiro">
      <p className="text-[10px] font-bold uppercase tracking-[.14em]" style={{ color: V.suave }}>Ganchos · escolher um</p>
      {[
        ["1", "Para de usar amaciante na sua roupa de treino."],
        ["2", "Tem um jeito de lavar roupa de treino que parece cuidado, mas pode atrapalhar."],
      ].map(([n, t]) => (
        <div key={n} className="mt-2 flex gap-2 rounded-xl border px-3 py-2" style={{ borderColor: "#E7E4F0" }}>
          <b className="text-[15px]" style={{ color: V.roxo }}>{n}</b>
          <span className="text-[12.5px] leading-snug">“{t}”</span>
        </div>
      ))}
      <p className="mt-3 text-[10px] font-bold uppercase tracking-[.14em]" style={{ color: V.suave }}>Cena 1 · o porquê</p>
      <p className="mt-1 text-[12.5px] leading-snug">Roupa de treino é feita pra deixar o suor sair, e o amaciante pode criar uma camada no tecido…</p>
      <p className="mt-1 text-[11px]" style={{ color: V.suave }}><b>Tela</b> Close do tecido da roupa de treino.</p>
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
      const r = await fetch("/api/roteiro-lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...f, origem }) });
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
      <h2 className="text-xl font-extrabold">Libera o prompt</h2>
      <p className="mt-1 text-[14.5px]" style={{ color: V.suave }}>Preenche rapidinho que ele aparece na hora, pronto pra colar no Claude ou no ChatGPT.</p>
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
        {indo ? "Liberando…" : "Quero o prompt"}
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
        <pre className="max-h-[340px] overflow-auto whitespace-pre-wrap text-[13px] leading-relaxed" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{texto}</pre>
      </div>
      <button type="button" onClick={copiar} className="mt-2 w-full rounded-full py-3 text-[15px] font-extrabold" style={copiou ? { background: V.roxo, color: "#fff" } : { background: LIMA, color: V.escuro }}>
        {copiou ? "Copiado ✓" : "Copiar o prompt"}
      </button>
    </>
  );
}

function Liberado() {
  return (
    <>
      <p className="mt-6 px-1 text-[26px] leading-tight" style={{ fontFamily: "var(--font-caveat)", color: V.roxo }}>Prontinho! Bora montar o seu 👇</p>

      <Passo n={1} titulo="Copie o prompt">
        <p>Cola numa conversa nova no Claude ou no ChatGPT. Troca o que está entre colchetes e cola o briefing da marca onde está indicado.</p>
        <BotaoCopiar texto={PROMPT} />
      </Passo>

      <Passo n={2} titulo="Responda o que ele perguntar">
        <p>Antes de escrever, ele te diz o que entendeu e pergunta o que faltou no briefing. Responde com calma: é isso que evita roteiro com informação inventada.</p>
      </Passo>

      <Passo n={3} titulo="Revise com estes 5 cuidados">
        <p>São os que eu repito em todo roteiro. Lê o seu procurando cada um:</p>
        <ul className="mt-1 space-y-3">
          {CUIDADOS.map((c, i) => (
            <li key={c.t} className="rounded-2xl p-3.5" style={{ background: V.creme }}>
              <p className="text-[15px] font-extrabold">{i + 1}. {c.t}</p>
              <p className="mt-1 text-[14px]"><span aria-hidden>❌</span> {c.nao}</p>
              <p className="text-[14px]"><span aria-hidden>✅</span> {c.sim}</p>
            </li>
          ))}
        </ul>
      </Passo>

      <Passo n={4} titulo="Leia em voz alta antes de mandar">
        <p>Se alguma frase não soa como você falando, reescreve com as suas palavras. O prompt monta a estrutura, mas o jeito de falar tem que ser o seu.</p>
      </Passo>

      <p className="mt-8 text-center text-sm" style={{ color: V.suave }}>
        Usou e a marca aprovou? Me conta no direct <b style={{ color: V.roxo }}>@eilaradam</b> 💜
      </p>
    </>
  );
}
