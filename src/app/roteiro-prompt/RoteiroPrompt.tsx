"use client";

import { useEffect, useState } from "react";

// Mesmas cores do carrossel "Como eu entrego um roteiro pra marca": papel creme, marrom, caramelo e amarelo-manteiga.
const V = { papel: "#EFE8DC", cartao: "#FFFFFF", tinta: "#3B2416", caramelo: "#8B6142", acento: "#9A5F36", manteiga: "#FFF3B0", suave: "#7A6555", linha: "#E2D6C6" };
const MARCA = "roteiro_liberado";
const MODELO_COPIA = "https://docs.google.com/document/d/1gGXLrKakzYmVUhJ5Xww4-B_l5iUa-6eSYWOUkZnQThs/copy";

const PROMPT = `Quero criar, com a sua ajuda, um sistema pra enviar meus roteiros de UGC pras marcas de um jeito profissional e receber o feedback delas por e-mail.

Eu não sei programar. Me guie um passo de cada vez e espere eu confirmar antes de seguir pro próximo.

COMO EU QUERO QUE FUNCIONE:
- Eu escrevo cada roteiro numa Planilha do Google, uma aba por roteiro, com as colunas: Parte (Gancho 1, Gancho 2, Cena 1, Cena 2…), Áudio (o que eu falo), Imagem (o que aparece) e Referência (link de vídeo ou foto).
- Cada roteiro vira um link de uma página bonita, com o nome e o logo da marca, que eu mando pra empresa.
- Nessa página, a marca consegue:
  1. escolher um dos 2 ganchos;
  2. deixar um comentário em qualquer cena;
  3. clicar em "Aprovar roteiro", escrevendo o nome de quem aprovou.
- Toda vez que a marca escolhe o gancho, comenta ou aprova, eu recebo um e-mail na hora, com o nome da marca, o que ela escreveu e o link do roteiro. Tudo fica salvo também numa aba "Feedback" da planilha.
- Referência em link vira um botão "Ver referência". Foto aparece dentro da cena.
- Visual limpo e profissional, que funcione bem no celular, nas cores [SUAS CORES, EX.: CREME E MARROM].

COMO FAZER:
- Use Google Apps Script ligado à planilha, publicado como "App da Web" (grátis, sem servidor e sem cartão).
- O e-mail é enviado pelo próprio Apps Script, pra este endereço: [SEU E-MAIL].

O QUE EU PRECISO QUE VOCÊ ME ENTREGUE:
1. Como montar a planilha (nome das abas e das colunas, com um roteiro de exemplo preenchido).
2. O código completo, pronto pra colar.
3. O passo a passo pra publicar e gerar o link, incluindo como autorizar o acesso quando o Google pedir.
4. Como criar o link de um roteiro novo depois.
5. Como testar antes de mandar pra marca (abrir o link numa aba anônima e fazer um comentário de teste).

Se der algum erro, eu te mando o print e você me ajuda a arrumar.`;

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

      <Passo n={1} titulo="Comece hoje: faça sua cópia do modelo">
        <p>É o modelo que eu uso: cabeçalho com a marca, status de aprovação, os 2 ganchos pra marca escolher e a tabela de <b>áudio, imagem e referência</b> em cada cena.</p>
        <a href={MODELO_COPIA} target="_blank" rel="noopener noreferrer" className="mt-1 block w-full rounded-full py-3 text-center text-[15px] font-extrabold text-white" style={{ background: V.caramelo }}>
          Fazer minha cópia no Google Docs
        </a>
        <p className="text-sm" style={{ color: V.suave }}>Precisa estar logada no Google. A cópia vai pro seu Drive e é só sua.</p>
      </Passo>

      <Passo n={2} titulo="Mande o link pra marca">
        <p>Preenche o roteiro e clica em <b>Compartilhar</b> → em “Acesso geral” escolhe <b>Qualquer pessoa com o link</b> → muda pra <b>Comentarista</b> → <b>Copiar link</b>.</p>
        <p>A marca escolhe o gancho, comenta direto na fala e marca o ✅ APROVADO, sem mexer no seu texto. Cada comentário chega no seu e-mail, mandado pelo próprio Google.</p>
      </Passo>

      <Passo n={3} titulo="Quer o seu sistema, igual ao meu?">
        <p>Com este prompt, o Claude monta com você uma página de entrega: a marca escolhe o gancho, comenta cada cena e aprova, e o feedback chega no seu e-mail. Tudo grátis, usando o Google.</p>
        <BotaoCopiar texto={PROMPT} />
        <p className="text-sm" style={{ color: V.suave }}>Cola numa conversa nova no Claude e vai seguindo um passo de cada vez. Deu erro? Manda o print pra ele.</p>
      </Passo>

      <p className="mt-8 text-center text-sm" style={{ color: V.suave }}>
        Entregou assim e a marca amou? Me conta no direct <b style={{ color: V.acento }}>@eilaradam</b> 💛
      </p>
    </>
  );
}
