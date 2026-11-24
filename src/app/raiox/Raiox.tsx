"use client";

import { useEffect, useState } from "react";
import { RAIO_X_PROMPT } from "./prompt";
import { REGRAS_PROMPT } from "./regras";

// Mesma identidade da apresentação da aula e do /edicaoclaude: creme, branco, preto e um acento terracota.
const C = { fundo: "#f1f0ea", papel: "#f7f6f2", cartao: "#ffffff", texto: "#141414", fraco: "#55534e", apoio: "#8d8b84", acento: "#c4673f", marca: "#fdf6cf", linha: "#e4e2da" };
const MARCA = "raiox_liberado";

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
    <main className="min-h-screen pb-20" style={{ background: C.fundo, color: C.texto }}>
      <style>{`
        @media print {
          @page { margin: 14mm; }
          body, main { background: #fff !important; }
          .nao-imprime { display: none !important; }
          .parte { break-before: page; box-shadow: none !important; }
          .parte.primeira { break-before: auto; }
          .caixa-prompt { max-height: none !important; overflow: visible !important; }
        }
      `}</style>
      <div className={`mx-auto px-5 pt-8 sm:pt-12 max-w-2xl`}>
        {!liberado && (
          <header>
            <div>
              <Pilula>Aula gratuita · 24/11 · 20h</Pilula>
              <h1 className="mt-4 text-[38px] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[54px]">
                O seu <span style={{ color: C.acento }}>bônus</span> da aula
              </h1>
              <p className="mt-4 max-w-md text-[15.5px] leading-relaxed" style={{ color: C.fraco }}>
                Os dois prompts que eu mostrei na aula: as regras de edição pro seu Claude e o Raio-X do Reels. Libera na hora.
              </p>
              <AssinaturaLara />
            </div>
          </header>
        )}

        {liberado ? <Ebook /> : <Formulario origem={origem} liberar={() => { try { localStorage.setItem(MARCA, "1"); } catch {} setLiberado(true); }} />}

        <footer className="nao-imprime mt-12 flex justify-between border-t pt-4 text-[11.5px]" style={{ borderColor: C.linha, color: C.apoio }}>
          <span><b style={{ color: C.texto }}>Lara Dam</b> · Aula gratuita Edição com Claude</span>
          <span>@eilaradam</span>
        </footer>
      </div>
    </main>
  );
}

function Pilula({ children }: { children: React.ReactNode }) {
  return <span className="inline-block rounded-full px-3.5 py-1.5 text-[12px] font-semibold" style={{ background: C.texto, color: C.marca }}>{children}</span>;
}

function AssinaturaLara() {
  return (
    <div className="mt-5 flex items-center gap-3">
      <span className="rounded-full px-3 py-1 text-[11.5px] font-semibold" style={{ background: C.texto, color: C.marca }}>com Lara Dam</span>
      <span className="text-[13px]" style={{ color: C.fraco }}>@eilaradam</span>
    </div>
  );
}

// foto com borda branca e levemente inclinada, igual aos slides da aula
function FotoLara({ src, giro, className = "" }: { src: string; giro: number; className?: string }) {
  return (
    <div className={className}>
      <div className="mx-auto w-full max-w-[280px] rounded-[26px] bg-white p-2.5" style={{ transform: `rotate(${giro}deg)`, boxShadow: "0 18px 40px rgba(20,20,20,.14)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="Lara Dam" className="aspect-[4/5] w-full rounded-[20px] object-cover" />
      </div>
    </div>
  );
}

function Rotulo({ children }: { children: React.ReactNode }) {
  return <p className="text-[11.5px] font-semibold uppercase tracking-[.14em]" style={{ color: C.acento }}>{"// "}{children}</p>;
}

function Formulario({ origem, liberar }: { origem: string; liberar: () => void }) {
  const [f, setF] = useState({ nome: "", whatsapp: "", email: "", achou: "", website: "" });
  const [anonimo, setAnonimo] = useState(false);
  const [indo, setIndo] = useState(false);
  const [erro, setErro] = useState("");
  const campo = "mt-1.5 w-full rounded-2xl border px-4 py-3 text-[16px] font-normal outline-none transition focus:border-[#141414]";
  const mudar = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (indo) return;
    setErro("");
    setIndo(true);
    try {
      const r = await fetch("/api/raiox-lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...f, anonimo, origem }) });
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
    <form onSubmit={enviar} className="relative mt-8 max-w-xl rounded-[28px] p-6 sm:mt-10 sm:p-7" style={{ background: C.cartao }}>
      <Rotulo>Bônus da aula</Rotulo>
      <h2 className="mt-2 text-[20px] font-extrabold tracking-[-0.01em]">Leva 20 segundos</h2>
      <label className="mt-4 block text-[14px] font-semibold">Seu nome
        <input className={campo} style={{ borderColor: C.linha, background: C.papel }} value={f.nome} onChange={mudar("nome")} required maxLength={120} autoComplete="given-name" />
      </label>
      <label className="mt-3 block text-[14px] font-semibold">Seu WhatsApp com DDD
        <input className={campo} style={{ borderColor: C.linha, background: C.papel }} value={f.whatsapp} onChange={mudar("whatsapp")} required maxLength={40} autoComplete="tel" inputMode="tel" placeholder="(11) 99999-9999" pattern="[^0-9]*([0-9][^0-9]*){10,}" title="Coloca o número com DDD" />
      </label>
      <label className="mt-3 block text-[14px] font-semibold">Seu e-mail
        <input className={campo} style={{ borderColor: C.linha, background: C.papel }} type="email" value={f.email} onChange={mudar("email")} required maxLength={160} autoComplete="email" inputMode="email" />
      </label>
      <label className="mt-3 block text-[14px] font-semibold">O que você achou da aula? <span className="font-normal" style={{ color: C.apoio }}>(opcional)</span>
        <textarea className={`${campo} h-24 resize-none`} style={{ borderColor: C.linha, background: C.papel }} value={f.achou} onChange={mudar("achou")} maxLength={2000} placeholder="Pode ser sincera, é isso que me faz melhorar a próxima." />
      </label>
      <label className="mt-2 flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5" style={{ borderColor: anonimo ? C.texto : C.linha, background: C.papel }}>
        <input type="checkbox" checked={anonimo} onChange={(e) => setAnonimo(e.target.checked)} className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[#141414]" />
        <span className="text-[13px] leading-snug" style={{ color: C.fraco }}>
          <b style={{ color: C.texto }}>Mandar a opinião no anônimo.</b> Ela chega pra mim separada do seu cadastro, sem nome, e-mail nem horário.
        </span>
      </label>
      {/* isca pra robô: gente de verdade não vê nem preenche */}
      <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" value={f.website} onChange={mudar("website")} name="website" />
      {erro && <p className="mt-4 rounded-2xl px-4 py-3 text-[14px] font-semibold" style={{ background: C.marca, color: C.texto }}>{erro}</p>}
      <button type="submit" disabled={indo} className="mt-5 w-full rounded-full py-3.5 text-[16px] font-semibold text-white transition disabled:opacity-60" style={{ background: C.texto }}>
        {indo ? "Liberando..." : "Quero o meu bônus"}
      </button>
      <p className="mt-3 text-center text-[13px]" style={{ color: C.apoio }}>Seus dados ficam só comigo.</p>
    </form>
  );
}

const PARTES = [
  { id: "criterio", n: "Parte 1", t: "Antes de pedir: o critério" },
  { id: "formula", n: "Parte 2", t: "A fórmula do pedido" },
  { id: "regras", n: "Parte 3", t: "Prompt 1: as regras de edição" },
  { id: "raiox", n: "Parte 4", t: "Prompt 2: o Raio-X do Reels" },
  { id: "proximo", n: "Parte 5", t: "O próximo passo" },
];

function Parte({ id, n, titulo, children, primeira }: { id: string; n: string; titulo: string; children: React.ReactNode; primeira?: boolean }) {
  return (
    <section id={id} className={`parte mt-5 scroll-mt-6 rounded-[28px] p-6 sm:p-8 ${primeira ? "primeira" : ""}`} style={{ background: C.cartao }}>
      <Rotulo>{n}</Rotulo>
      <h2 className="mt-2 text-[24px] font-extrabold leading-tight tracking-[-0.01em] sm:text-[28px]">{titulo}</h2>
      {children}
    </section>
  );
}

function Ebook() {
  return (
    <>
      {/* capa do e-book */}
      <section className="parte primeira grid items-center gap-6 pt-2 sm:grid-cols-[1.3fr_.7fr]">
        <div>
          <Pilula>Aula gratuita · 24/11 · 20h</Pilula>
          <h1 className="mt-4 text-[38px] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[48px]">
            Edição com <span style={{ color: C.acento }}>Claude</span>
          </h1>
          <p className="mt-2 text-[17px] font-semibold" style={{ color: C.fraco }}>o bônus da aula</p>
          <AssinaturaLara />
        </div>
        <FotoLara src="/edicaoclaude/midia/lara-sobre.webp" giro={-3} className="hidden sm:block" />
      </section>

      <div className="nao-imprime mt-5 rounded-[28px] p-6 sm:p-8" style={{ background: C.cartao }}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Rotulo>Índice</Rotulo>
          <button type="button" onClick={() => window.print()} className="rounded-full px-4 py-2 text-[13px] font-semibold text-white" style={{ background: C.texto }}>Baixar em PDF</button>
        </div>
        <ol className="mt-4 grid gap-2">
          {PARTES.map((p) => (
            <li key={p.id}>
              <a href={`#${p.id}`} className="flex items-baseline gap-3 rounded-2xl px-4 py-3 transition hover:opacity-80" style={{ background: C.papel }}>
                <span className="text-[12px] font-semibold" style={{ color: C.acento }}>{p.n}</span>
                <span className="text-[15px] font-semibold">{p.t}</span>
              </a>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-[13px]" style={{ color: C.apoio }}>Salva esta página: ela abre direto no bônus sempre que você voltar neste aparelho.</p>
      </div>

      <Parte id="criterio" n="Parte 1" titulo="Antes de pedir: o critério">
        <p className="mt-3 text-[15.5px] leading-relaxed" style={{ color: C.fraco }}>Os 6 erros que entregam que o vídeo foi feito com IA. É isso que você olha antes de pedir qualquer coisa.</p>
        <ol className="mt-5 grid gap-3">
          {[
            ["Gancho fraco", "Quem assiste decide no primeiro segundo. O gancho pode ser falado, visual ou sonoro."],
            ["Pausas e repetições", "Cada silêncio é uma chance de a pessoa sair."],
            ["Legenda difícil de ler", "Ou a legenda de todo mundo."],
            ["Tela parada", "Sem zoom, sem rastreio de rosto, sem B-roll."],
            ["Áudio e sound", "Sempre os mesmos efeitos, que já estão saturando."],
            ["A área que o Instagram cobre", "Texto embaixo dos botões e da legenda do próprio Instagram."],
          ].map(([t, d], i) => (
            <li key={t} className="flex gap-4 rounded-2xl p-4" style={{ background: C.papel }}>
              <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full text-[14px] font-bold" style={{ background: C.texto, color: C.marca }}>{i + 1}</span>
              <div>
                <p className="text-[15.5px] font-bold leading-snug">{t}</p>
                <p className="mt-0.5 text-[14.5px] leading-relaxed" style={{ color: C.fraco }}>{d}</p>
              </div>
            </li>
          ))}
        </ol>
        <ZonaSegura />
      </Parte>

      <Parte id="formula" n="Parte 2" titulo="A fórmula do pedido">
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[["Onde", "o segundo exato"], ["Como está", "o que você vê"], ["Como quero", "o que você quer"], ["Referência", "print ou vídeo"]].map(([t, d], i) => (
            <div key={t} className="rounded-2xl p-4" style={{ background: i === 3 ? C.marca : C.papel }}>
              <p className="text-[15px] font-bold">{t}</p>
              <p className="mt-0.5 text-[13px]" style={{ color: C.fraco }}>{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border p-4" style={{ borderColor: C.linha }}>
            <p className="text-[12px] font-semibold uppercase tracking-[.12em]" style={{ color: C.apoio }}>Pedido ruim</p>
            <p className="mt-2 text-[15.5px] font-semibold">&quot;Arruma a legenda.&quot;</p>
          </div>
          <div className="rounded-2xl p-4" style={{ background: C.texto, color: "#fff" }}>
            <p className="text-[12px] font-semibold uppercase tracking-[.12em]" style={{ color: C.marca }}>Pedido bom</p>
            <p className="mt-2 text-[15.5px] font-semibold leading-relaxed">&quot;No segundo 12, a legenda está em cima do meu rosto. Quero embaixo, numa linha só. Segue o print.&quot;</p>
          </div>
        </div>
        <p className="mt-5 rounded-2xl p-4 text-[15px] leading-relaxed" style={{ background: C.papel }}>
          <b>O passo final:</b> depois que ele corrigir, peça pra ele <b>salvar como regra</b>. Assim cada correção vira regra, e o seu Claude aprende com você.
        </p>
      </Parte>

      <Parte id="regras" n="Parte 3" titulo="Prompt 1: as regras de edição pro seu Claude">
        <p className="mt-3 text-[15.5px] leading-relaxed" style={{ color: C.fraco }}>O básico: o seu Claude passa a editar sempre do mesmo jeito, sem você repetir.</p>
        <Passos itens={[
          ["Crie um projeto no Claude chamado \"Edição\"", "No menu da esquerda, em Projetos."],
          ["Cole o texto nas instruções do projeto", "Use o botão aqui embaixo pra copiar."],
          ["Edite os próximos vídeos dentro desse projeto", "Toda conversa ali já começa com as regras."],
        ]} />
        <CaixaPrompt id="regras-prompt" texto={REGRAS_PROMPT} botao="Copiar as regras" />
      </Parte>

      <Parte id="raiox" n="Parte 4" titulo="Prompt 2: o Raio-X do Reels">
        <p className="mt-3 text-[15.5px] leading-relaxed" style={{ color: C.fraco }}>
          A revisão avançada. Você manda os prints de um Reels e o Claude devolve o diagnóstico com a medida exata pra corrigir. <b style={{ color: C.texto }}>Roda no Claude gratuito</b>: ele só olha, não edita.
        </p>
        <Passos itens={[
          ["Copia o prompt", "No botão aqui embaixo."],
          ["Cola numa conversa nova do Claude", "Pode ser o Claude gratuito. Ele vai pedir os prints."],
          ["Manda os 5 prints, a fala e a duração", "Primeiro quadro, um com título, um com legenda, um com o seu rosto e o último quadro. Depois cola a fala do vídeo e diz quantos segundos ele tem."],
        ]} />
        <CaixaPrompt id="raiox-prompt" texto={RAIO_X_PROMPT} botao="Copiar o Raio-X" />
      </Parte>

      <section id="proximo" className="parte mt-5 scroll-mt-6 rounded-[28px] p-6 sm:p-8" style={{ background: C.texto, color: "#fff" }}>
        <p className="text-[11.5px] font-semibold uppercase tracking-[.14em]" style={{ color: C.marca }}>{"// "}Parte 5</p>
        <h2 className="mt-2 text-[24px] font-extrabold leading-tight sm:text-[28px]">O próximo passo</h2>
        <p className="mt-4 text-[16px] leading-relaxed" style={{ color: "rgba(255,255,255,.82)" }}>
          Isso é o começo. Na Turma 05 você leva o kit completo: 8 skills, uma pra cada etapa da edição, a biblioteca de sons e títulos, o Estúdio, os formatos que vendem, a skill de roteiro e a identidade de cada marca no seu vídeo.
        </p>
        <p className="mt-6 text-[15px] font-semibold" style={{ color: C.marca }}>R$297 · 7 dias de garantia</p>
        <a href="https://ugc.laradam.com/edicaoclaude" className="nao-imprime mt-3 inline-block rounded-full px-6 py-3.5 text-[15px] font-semibold" style={{ background: C.marca, color: C.texto }}>Conhecer a Turma 05</a>
        <p className="mt-3 text-[13px]" style={{ color: "rgba(255,255,255,.6)" }}>Carrinho fecha em 01/12.</p>
      </section>

      <p className="mt-6 text-center text-[14px]" style={{ color: C.fraco }}>Qualquer dúvida, me chama no Instagram @eilaradam.</p>
      <p className="mt-1 text-center text-[13px]" style={{ color: C.apoio }}>Obrigada por ter ficado até o final · @eilaradam</p>
    </>
  );
}

function Passos({ itens }: { itens: string[][] }) {
  return (
    <ol className="mt-5 grid gap-2">
      {itens.map(([t, d], i) => (
        <li key={t} className="flex gap-4 rounded-2xl p-4" style={{ background: C.papel }}>
          <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full text-[14px] font-bold" style={{ background: C.marca, color: C.texto }}>{i + 1}</span>
          <div>
            <p className="text-[15px] font-bold leading-snug">{t}</p>
            <p className="mt-0.5 text-[14px] leading-relaxed" style={{ color: C.fraco }}>{d}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function CaixaPrompt({ id, texto, botao }: { id: string; texto: string; botao: string }) {
  const [aviso, setAviso] = useState("");
  const copiar = async () => {
    try { await navigator.clipboard.writeText(texto); setAviso("Copiado! Agora cola no Claude."); }
    catch { const t = document.getElementById(id) as HTMLTextAreaElement | null; t?.focus(); t?.select(); setAviso("Selecionei o texto: é só copiar."); }
  };
  return (
    <div className="mt-5 rounded-[22px] p-4 sm:p-5" style={{ background: C.texto }}>
      <textarea id={id} readOnly value={texto} className="nao-imprime h-72 w-full resize-none rounded-2xl p-4 font-mono text-[12.5px] leading-relaxed outline-none" style={{ background: "rgba(255,255,255,.07)", color: "#eeece6" }} />
      {/* no PDF o texto sai inteiro, sem a caixa de rolagem */}
      <pre className="caixa-prompt hidden whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-white print:block">{texto}</pre>
      <button type="button" onClick={copiar} className="nao-imprime mt-4 w-full rounded-full py-3.5 text-[15.5px] font-semibold" style={{ background: C.marca, color: C.texto }}>{botao}</button>
      {aviso && <p className="nao-imprime mt-2 text-center text-[13.5px] font-semibold" style={{ color: C.marca }}>{aviso}</p>}
    </div>
  );
}

// Desenho da tela do Reels (1080 x 1920) com as áreas que a interface do Instagram cobre.
function ZonaSegura() {
  const cobre = "rgba(196,103,63,.22)";
  return (
    <figure className="mt-6 flex flex-col items-center gap-5 rounded-2xl p-5 sm:flex-row sm:items-center" style={{ background: C.papel }}>
      <svg viewBox="-40 -40 1160 2000" className="w-[170px] flex-shrink-0" role="img" aria-label="Tela do Reels com a área segura no meio e as áreas cobertas pelo Instagram nas bordas">
        <rect x="-30" y="-30" width="1140" height="1980" rx="110" fill={C.texto} />
        <rect x="0" y="0" width="1080" height="1920" rx="80" fill="#fff" />
        <rect x="0" y="0" width="1080" height="250" fill={cobre} />
        <rect x="0" y="1560" width="1080" height="360" fill={cobre} />
        <rect x="0" y="250" width="100" height="1310" fill={cobre} />
        <rect x="980" y="250" width="100" height="1310" fill={cobre} />
        <rect x="920" y="1250" width="60" height="310" fill={cobre} />
        <path d="M100 250 H980 V1250 H920 V1560 H100 Z" fill={C.marca} stroke={C.texto} strokeWidth="6" strokeDasharray="22 16" />
        <text x="540" y="860" textAnchor="middle" fontSize="88" fontWeight="700" fill={C.texto}>área segura</text>
        <text x="540" y="150" textAnchor="middle" fontSize="62" fill={C.acento}>250 px</text>
        <text x="540" y="1760" textAnchor="middle" fontSize="62" fill={C.acento}>abaixo de 1560 px</text>
        <circle cx="1010" cy="1330" r="34" fill={C.acento} opacity=".55" />
        <circle cx="1010" cy="1440" r="34" fill={C.acento} opacity=".55" />
      </svg>
      <figcaption className="text-[14px] leading-relaxed" style={{ color: C.fraco }}>
        <p className="font-bold" style={{ color: C.texto }}>Num vídeo de 1080 x 1920:</p>
        <ul className="mt-2 grid gap-1.5">
          <li>Nada acima de <b style={{ color: C.texto }}>250 px</b></li>
          <li>Nada abaixo de <b style={{ color: C.texto }}>1560 px</b></li>
          <li><b style={{ color: C.texto }}>100 px</b> livres em cada lateral</li>
          <li>Abaixo de <b style={{ color: C.texto }}>1250 px</b>, nada depois de <b style={{ color: C.texto }}>920 px</b> (curtir e comentar)</li>
        </ul>
        <p className="mt-3 flex items-center gap-2 text-[12.5px]"><span className="inline-block h-3 w-3 rounded" style={{ background: cobre }} /> o que o Instagram cobre</p>
      </figcaption>
    </figure>
  );
}
