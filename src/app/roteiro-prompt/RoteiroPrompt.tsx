"use client";

import { useEffect, useState } from "react";

// Mesmas cores do carrossel "Como eu entrego um roteiro pra marca": papel creme, marrom, caramelo e amarelo-manteiga.
const V = { papel: "#EFE8DC", cartao: "#FFFFFF", tinta: "#3B2416", caramelo: "#8B6142", acento: "#9A5F36", manteiga: "#FFF3B0", suave: "#7A6555", linha: "#E2D6C6" };
const MARCA = "roteiro_liberado";
const MODELO_COPIA = "https://docs.google.com/document/d/1g7JCc1FxuayZvrMP2qiouwOxG7rH64R5zL8DTePIWb8/copy";

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
- Divida o resto em cenas. Em cada cena: FALA (o que eu falo, do jeito que se fala) e TELA (o que aparece, em primeira pessoa: "eu abro a caixa").
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

ENTREGA (vou colar num modelo do Google Docs, então devolva exatamente nestas partes):
A IDEIA DO VÍDEO: 2 ou 3 linhas
NO SET: o que precisa aparecer
GANCHOS: tabela com as colunas Gancho | Fala | Tela (2 linhas)
ROTEIRO: tabela com as colunas Cena | Fala | Tela | Referência (a referência, deixe "[link ou foto]" pra eu preencher)
LETTERING: o que entra escrito na tela
TEMPO: palavras e segundos
DÚVIDAS: o que eu preciso confirmar com a marca`;

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
    <main className="min-h-screen pb-20" style={{ background: V.papel, color: V.tinta }}>
      <div className="mx-auto max-w-xl px-4 pt-10">
        <header className="text-center">
          <p className="text-[17px] font-extrabold leading-tight">Lara Dam</p>
          <p className="text-[14px] font-medium" style={{ color: V.tinta }}>UGC e IA pra creator</p>
        </header>

        <h1 className="mt-8 text-center text-[38px] font-black leading-[1.02] tracking-[-0.03em] sm:text-[48px]" style={{ textWrap: "balance" }}>
          Entregue seu roteiro <span style={{ color: V.acento }}>como eu entrego</span>
        </h1>

        <Faixa>
          O <b style={{ color: V.manteiga }}>prompt</b> que eu criei com o Claude + o <b style={{ color: V.manteiga }}>modelo no Google Docs</b>
        </Faixa>

        <MiniEntrega />

        {liberado ? <Liberado /> : <Cadastro origem={origem} liberar={() => { try { localStorage.setItem(MARCA, "1"); } catch {} setLiberado(true); }} />}
      </div>
    </main>
  );
}

/** A faixa caramelo dos slides. */
function Faixa({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto mt-5 rounded-[22px] px-5 py-4 text-center text-[17px] font-light leading-snug text-white shadow-[0_10px_30px_rgba(59,36,22,.18)]" style={{ background: V.caramelo }}>
      {children}
    </div>
  );
}

function MiniEntrega() {
  return (
    <div className="mt-6 rounded-[22px] p-4 shadow-[0_14px_40px_rgba(59,36,22,.12)]" style={{ background: V.cartao }} aria-label="Exemplo de entrega">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#E8796B" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#E9C45B" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#86C27A" }} />
        <span className="ml-2 text-[11px] font-bold uppercase tracking-[.14em]" style={{ color: V.suave }}>Ganchos · escolha um</span>
      </div>
      {[
        ["1", "Para de usar amaciante na sua roupa de treino.", true],
        ["2", "Tem um jeito de lavar roupa de treino que parece cuidado, mas pode atrapalhar.", false],
      ].map(([n, t, sel]) => (
        <div key={String(n)} className="mt-2.5 flex gap-2.5 rounded-xl border px-3 py-2.5" style={{ borderColor: sel ? V.caramelo : V.linha, boxShadow: sel ? `0 0 0 2px ${V.caramelo}33` : undefined }}>
          <b className="text-[16px]" style={{ color: V.caramelo }}>{String(n)}</b>
          <span className="text-[13px] leading-snug">“{String(t)}”</span>
        </div>
      ))}
      <div className="mt-3 rounded-xl px-3 py-2.5" style={{ background: V.manteiga }}>
        <p className="text-[12.5px] leading-snug">Roupa de treino é feita pra deixar o suor sair…</p>
      </div>
      <p className="mt-2 text-[12px]" style={{ color: V.suave }}><b style={{ color: V.tinta }}>Marina</b> comentou: “Amei esse argumento!” 💛</p>
    </div>
  );
}

function Cadastro({ origem, liberar }: { origem: string; liberar: () => void }) {
  const [f, setF] = useState({ nome: "", email: "", whatsapp: "", instagram: "", website: "" });
  const [indo, setIndo] = useState(false);
  const [erro, setErro] = useState("");
  const campo = "mt-1 w-full rounded-xl border bg-white px-3.5 py-3 text-[16px] outline-none focus:border-[#8B6142]";
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
    <form onSubmit={enviar} className="mt-6 rounded-[24px] p-5 shadow-sm sm:p-6" style={{ background: V.cartao, border: `1px solid ${V.linha}` }}>
      <h2 className="text-[22px] font-black tracking-[-0.02em]">Libera o <span style={{ color: V.acento }}>prompt e o modelo</span></h2>
      <p className="mt-1 text-[14.5px]" style={{ color: V.suave }}>Preenche rapidinho que eles aparecem na hora.</p>
      <label className="mt-4 block text-sm font-bold">Seu nome
        <input className={campo} style={{ borderColor: V.linha }} value={f.nome} onChange={mudar("nome")} required maxLength={120} autoComplete="given-name" />
      </label>
      <label className="mt-3 block text-sm font-bold">WhatsApp
        <input className={campo} style={{ borderColor: V.linha }} value={f.whatsapp} onChange={mudar("whatsapp")} required maxLength={40} autoComplete="tel" inputMode="tel" placeholder="(11) 99999-9999" />
      </label>
      <label className="mt-3 block text-sm font-bold">Seu melhor e-mail
        <input className={campo} style={{ borderColor: V.linha }} type="email" value={f.email} onChange={mudar("email")} required maxLength={160} autoComplete="email" inputMode="email" />
      </label>
      <label className="mt-3 block text-sm font-bold">@ do Instagram <span className="font-normal" style={{ color: V.suave }}>(opcional)</span>
        <input className={campo} style={{ borderColor: V.linha }} value={f.instagram} onChange={mudar("instagram")} maxLength={60} autoCapitalize="none" placeholder="@seuperfil" />
      </label>
      {/* isca pra robô: gente de verdade não vê nem preenche */}
      <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" value={f.website} onChange={mudar("website")} name="website" />
      {erro && <p className="mt-3 rounded-lg px-3 py-2 text-sm font-semibold" style={{ background: "#FCEBDD", color: "#8A3B12" }}>{erro}</p>}
      <button type="submit" disabled={indo} className="mt-5 w-full rounded-full py-3.5 text-[16px] font-extrabold text-white disabled:opacity-60" style={{ background: V.caramelo }}>
        {indo ? "Liberando…" : "Quero o prompt e o modelo"}
      </button>
      <p className="mt-3 text-center text-xs" style={{ color: V.suave }}>Seus dados ficam só comigo. Nada de spam.</p>
    </form>
  );
}

function Passo({ n, titulo, children }: { n: number; titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-4 rounded-[24px] p-5 sm:p-6" style={{ background: V.cartao, border: `1px solid ${V.linha}` }}>
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl text-xl font-black text-white" style={{ background: V.caramelo }}>{n}</span>
        <h2 className="text-[19px] font-extrabold leading-tight">{titulo}</h2>
      </div>
      <div className="mt-3 space-y-2.5 text-[15.5px] leading-relaxed" style={{ color: "#4A3426" }}>{children}</div>
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
      <div className="relative mt-2 rounded-2xl p-4" style={{ background: V.tinta, color: "#F3EBDD" }}>
        <pre className="max-h-[320px] overflow-auto whitespace-pre-wrap text-[13px] leading-relaxed" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{texto}</pre>
      </div>
      <button type="button" onClick={copiar} className="mt-2 w-full rounded-full py-3 text-[15px] font-extrabold" style={copiou ? { background: V.tinta, color: "#fff" } : { background: V.manteiga, color: V.tinta, border: `1px solid ${V.caramelo}55` }}>
        {copiou ? "Copiado ✓" : "Copiar o prompt"}
      </button>
    </>
  );
}

function Liberado() {
  return (
    <>
      <p className="mt-8 text-center text-[26px] font-black tracking-[-0.02em]">Prontinho! <span style={{ color: V.acento }}>Bora entregar o seu</span> 👇</p>

      <Passo n={1} titulo="Monte o roteiro com o prompt">
        <p>Cola numa conversa nova no Claude ou no ChatGPT, troca o que está entre colchetes e cola o briefing da marca. Antes de escrever, ele te diz o que entendeu e pergunta o que faltou.</p>
        <BotaoCopiar texto={PROMPT} />
      </Passo>

      <Passo n={2} titulo="Faça a sua cópia do modelo">
        <p>O modelo já vem com o status de aprovação, os 2 ganchos pra marca escolher e a tabela de cenas com fala, tela e referência.</p>
        <a href={MODELO_COPIA} target="_blank" rel="noopener noreferrer" className="mt-1 block w-full rounded-full py-3 text-center text-[15px] font-extrabold text-white" style={{ background: V.caramelo }}>
          Fazer minha cópia no Google Docs
        </a>
        <p className="text-sm" style={{ color: V.suave }}>Precisa estar logada no Google. A cópia vai pro seu Drive e é só sua.</p>
      </Passo>

      <Passo n={3} titulo="Cole o roteiro e as referências">
        <p>Cola cada parte que o prompt devolveu no lugar dela. Na coluna <b>Referência</b>, coloca o link de um vídeo ou uma foto de como você imagina a cena.</p>
      </Passo>

      <Passo n={4} titulo="Mande o link pra marca">
        <p>No Docs, clica em <b>Compartilhar</b> → em “Acesso geral” escolhe <b>Qualquer pessoa com o link</b> → muda pra <b>Comentarista</b> → <b>Copiar link</b>.</p>
        <p>Assim a marca escolhe o gancho, comenta direto na fala e marca o ✅ Aprovado, sem mexer no seu texto.</p>
      </Passo>

      <Passo n={5} titulo="Acompanhe pelo e-mail">
        <p>Cada comentário da marca chega no seu e-mail, mandado pelo próprio Google. Você responde ali mesmo no Docs e, quando aparecer o ✅, é só gravar 🎬</p>
      </Passo>

      <p className="mt-8 text-center text-sm" style={{ color: V.suave }}>
        Entregou assim e a marca amou? Me conta no direct <b style={{ color: V.acento }}>@eilaradam</b> 💛
      </p>
    </>
  );
}
