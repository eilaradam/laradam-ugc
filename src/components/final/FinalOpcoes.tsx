"use client";

// Prévia de 3 finais novos pro portfólio (YouTube + Serviços + Depoimentos + Contato).
// Mesma paleta e fontes do site (navy, petróleo, off-white, Newsreader + Hanken). Página /final.

import { useState } from "react";
import localFont from "next/font/local";
import { ArrowUpRight, Mail, MessageCircle, Play, AtSign, Star } from "lucide-react";
import { useVideoModal } from "../VideoModalProvider";
import type { Video } from "@/data/content";

const mao = localFont({ src: "../../fonts/Caveat.woff2", weight: "400 700", display: "swap" });

const C = { navy: "#1E2A44", teal: "#1C5D63", tealClaro: "#7FC4C0", tint: "#DCEAEA", fundo: "#F4F4EF", fundo2: "#EDEDE5", suave: "#46506A", borda: "#E2E2D9" };
const WHATS = "https://wa.me/5512988729264?text=";
const EMAIL = "laradam.ugc@gmail.com";

const DEP = [
  { marca: "InfinitePay", logo: "59.png", num: "50M", rot: "views em 1 vídeo", txt: "A Lara entrega muito além do que a gente pede. Ela entende de performance e o vídeo veio pronto pra rodar como criativo, bateu recorde de CTR no Meta." },
  { marca: "Méliuz", logo: "35.png", num: "10M", rot: "views na campanha", txt: "Trabalho com vários creators e a Lara é a que mais converte. Roteiro afiado, entrega rápida e ela pega direção de brief no primeiro review." },
  { marca: "DT3", logo: "61.png", num: "4+", rot: "campanhas seguidas", txt: "Já fechamos 4 campanhas e cada uma performou melhor que a anterior. A Lara virou parte do nosso playbook de criativo." },
  { marca: "Tropical Especiarias", logo: "27.png", num: "2,4x", rot: "ROAS com ads", txt: "Amamos o resultado do vídeo criado, além da qualidade e toda a atenção para entender a demanda. Super recomendamos." },
];

const SERV = [
  { t: "Criativos pra tráfego", d: "Ads pra Meta, TikTok e YouTube feitos pra baixar seu CPA.", tags: ["Meta", "TikTok", "YouTube"], destaque: true },
  { t: "UGC pra e-commerce", d: "Vídeo de produto com cara de cliente real, pra loja vender todo dia.", tags: ["Review", "Unboxing", "Uso real"] },
  { t: "Publi no meu perfil", d: "Sua marca no @eilaradam, falando com quem já confia em mim.", tags: ["Reels", "Stories", "TikTok"] },
  { t: "Gestão em escala", d: "Vários creators, do briefing à entrega, sem dor de cabeça.", tags: ["Curadoria", "Briefing", "Entrega"] },
];

const YT = [
  { id: "zZXflzISC1c", marca: "Óculos", views: "2,3 mi" },
  { id: "4CZl_YwPgWo", marca: "Cygnuss", views: "48 mil" },
];
const ytVideo = (y: (typeof YT)[number]): Video => ({ id: `yt-${y.id}`, youtubeId: y.id, title: `YouTube Ad · ${y.marca}`, brand: y.marca, category: "ia" });

function Selo({ children, cor = C.teal }: { children: React.ReactNode; cor?: string }) {
  return <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] font-semibold" style={{ color: cor }}><span className="h-px w-8" style={{ background: cor }} />{children}</p>;
}

function Formulario({ escuro, servico, curto }: { escuro?: boolean; servico?: string; curto?: boolean }) {
  const [estado, setEstado] = useState<"" | "enviando" | "ok">("");
  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).catch(() => null);
    setEstado(r?.ok ? "ok" : "");
  }
  const campo = `w-full rounded-xl px-4 py-3 text-sm outline-none ${escuro ? "bg-white/5 border border-white/15 text-white placeholder:text-white/40" : "bg-white border text-[#1E2A44] placeholder:text-[#7C8390]"}`;
  if (estado === "ok") return <p className={`${mao.className} text-3xl`} style={{ color: escuro ? C.tealClaro : C.teal }}>recebi! te respondo em até 48h ✨</p>;
  return (
    <form onSubmit={enviar} className="grid gap-3" style={{ borderColor: C.borda }}>
      <div className="grid sm:grid-cols-2 gap-3">
        <input name="name" required placeholder="Seu nome" className={campo} style={escuro ? {} : { borderColor: C.borda }} />
        <input name="email" type="email" required placeholder="seu@email.com" className={campo} style={escuro ? {} : { borderColor: C.borda }} />
      </div>
      {!curto && <input name="brand" placeholder="Marca / empresa" className={campo} style={escuro ? {} : { borderColor: C.borda }} />}
      <textarea name="message" rows={curto ? 3 : 4} defaultValue={servico ? `Quero ${servico.toLowerCase()}. ` : ""} placeholder="O que você precisa? Formato, prazo, quantidade…" className={campo} style={escuro ? {} : { borderColor: C.borda }} />
      <button disabled={estado === "enviando"} className="justify-self-start inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold" style={{ background: escuro ? C.tealClaro : C.navy, color: escuro ? C.navy : "#fff" }}>
        {estado === "enviando" ? "Enviando…" : "Enviar mensagem"} <ArrowUpRight className="h-4 w-4" />
      </button>
    </form>
  );
}

function YtCard({ y, grande }: { y: (typeof YT)[number]; grande?: boolean }) {
  const { open } = useVideoModal();
  return (
    <button type="button" onClick={() => open(ytVideo(y))} className="group relative block w-full overflow-hidden rounded-2xl aspect-video text-left">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://i.ytimg.com/vi/${y.id}/maxresdefault.jpg`} alt={y.marca} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
      <span className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-white/90 ${grande ? "h-16 w-16" : "h-11 w-11"}`}><Play className={grande ? "h-6 w-6" : "h-4 w-4"} fill={C.navy} style={{ color: C.navy }} /></span>
      <span className="absolute top-3 right-3 rounded-full bg-[#E3342F] px-2.5 py-1 text-[11px] font-bold text-white">{y.views} views</span>
      <span className="absolute bottom-3 left-4 text-sm font-semibold text-white">{y.marca}</span>
    </button>
  );
}

/* contato escolhido pela Lara em 09/11: foto + 3 caminhos + formulário (vai no fim do portfólio) */
export function ContatoNovo({ id = "contato" }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-16 px-6 md:px-12 py-16 md:py-20" style={{ background: C.navy, color: "#fff" }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ensaio/avatar.webp" alt="Lara Dam" className="h-20 w-20 rounded-full object-cover border-4" style={{ borderColor: C.tealClaro }} />
          <h2 className="font-display mt-6 text-4xl md:text-6xl font-semibold leading-[1.05]">Bora fazer seu<br />próximo <em style={{ color: C.tealClaro }}>criativo</em>?</h2>
          <p className="mt-4 text-white/70 max-w-sm">Agenda aberta pra novembro e dezembro. Respondo em até 48h.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={WHATS + encodeURIComponent("Oi Lara! Vim pelo seu portfólio.")} className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold" style={{ background: C.tealClaro, color: C.navy }}><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-bold"><Mail className="h-4 w-4" /> E-mail</a>
            <a href="https://instagram.com/eilaradam" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-bold"><AtSign className="h-4 w-4" /> @eilaradam</a>
          </div>
        </div>
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 md:p-8"><Formulario escuro /></div>
      </div>
    </section>
  );
}

/* ---------------- OPÇÃO 1: Prova primeiro ---------------- */
function Opcao1() {
  const [ativo, setAtivo] = useState(0);
  return (
    <div style={{ background: C.fundo, color: C.navy }}>
      {/* números grandes das marcas, depoimento troca ao clicar */}
      <section className="px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <Selo>Resultados de quem já contratou</Selo>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 border-y" style={{ borderColor: C.borda }}>
            {DEP.map((d, i) => (
              <button key={d.marca} type="button" onClick={() => setAtivo(i)} className={`text-left px-4 md:px-6 py-7 transition-colors ${i ? "md:border-l" : ""} ${i % 2 ? "border-l md:border-l" : ""}`} style={{ borderColor: C.borda, background: ativo === i ? "#fff" : "transparent" }}>
                <span className="font-display block text-5xl md:text-6xl font-semibold tracking-tight" style={{ color: ativo === i ? C.teal : C.navy }}>{d.num}</span>
                <span className="mt-1 block text-sm" style={{ color: C.suave }}>{d.rot}</span>
                <span className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: C.suave }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/logo-1/${d.logo}`} alt="" className="h-6 w-6 rounded-full object-contain bg-white" /> {d.marca}
                </span>
              </button>
            ))}
          </div>
          <blockquote className="mt-8 max-w-3xl">
            <div className="flex gap-0.5" style={{ color: C.teal }}>{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4" fill="currentColor" />)}</div>
            <p className="font-display mt-3 text-2xl md:text-3xl leading-snug italic">“{DEP[ativo].txt}”</p>
            <footer className="mt-3 text-sm" style={{ color: C.suave }}>— {DEP[ativo].marca}</footer>
          </blockquote>
        </div>
      </section>

      {/* serviços numerados + youtube como mais um serviço */}
      <section className="px-6 md:px-12 py-16" style={{ background: C.fundo2 }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-[0.8fr_1.2fr] gap-10">
          <div>
            <Selo>Serviços</Selo>
            <h2 className="font-display mt-4 text-4xl md:text-5xl font-semibold leading-tight">O que a gente<br />pode <em style={{ color: C.teal }}>criar juntos</em></h2>
            <p className={`${mao.className} mt-4 text-2xl -rotate-2`} style={{ color: C.teal }}>o mais pedido é o 01 ↓</p>
          </div>
          <ol className="divide-y" style={{ borderColor: C.borda }}>
            {SERV.map((s, i) => (
              <li key={s.t} className="group py-5 grid grid-cols-[3rem_1fr_auto] items-start gap-4 border-t" style={{ borderColor: C.borda }}>
                <span className="font-display text-2xl" style={{ color: C.teal }}>0{i + 1}</span>
                <div>
                  <p className="text-lg font-bold">{s.t}</p>
                  <p className="text-sm mt-1" style={{ color: C.suave }}>{s.d}</p>
                  <p className="mt-2 text-xs uppercase tracking-wider" style={{ color: C.suave }}>{s.tags.join(" · ")}</p>
                </div>
                <a href={`#contato-1`} className="rounded-full border px-4 py-2 text-xs font-bold transition-colors group-hover:bg-[#1E2A44] group-hover:text-white" style={{ borderColor: C.navy }}>Quero esse</a>
              </li>
            ))}
            <li className="py-5 grid grid-cols-[3rem_1fr] gap-4 border-t" style={{ borderColor: C.borda }}>
              <span className="font-display text-2xl" style={{ color: C.teal }}>05</span>
              <div>
                <p className="text-lg font-bold">Ads pro YouTube</p>
                <p className="text-sm mt-1 mb-4" style={{ color: C.suave }}>Vídeo horizontal pensado pro YouTube Ads.</p>
                <div className="grid grid-cols-2 gap-3 max-w-md">{YT.map((y) => <YtCard key={y.id} y={y} />)}</div>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <ContatoNovo id="contato-1" />
    </div>
  );
}

/* ---------------- OPÇÃO 2: Escolha e já pede ---------------- */
function Opcao2() {
  const [serv, setServ] = useState(0);
  return (
    <div style={{ background: C.fundo, color: C.navy }}>
      {/* depoimentos em faixa que corre */}
      <section className="py-14 overflow-hidden" style={{ background: C.teal }}>
        <div className="flex w-max gap-5 animate-[final-corre_45s_linear_infinite] hover:[animation-play-state:paused]">
          {[...DEP, ...DEP].map((d, i) => (
            <figure key={i} className="w-[340px] shrink-0 rounded-3xl bg-white p-6" style={{ transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}>
              <div className="flex items-center justify-between">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/logo-1/${d.logo}`} alt={d.marca} className="h-9 w-auto max-w-[90px] object-contain" />
                <span className="font-display text-3xl font-semibold" style={{ color: C.teal }}>{d.num}</span>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed">“{d.txt}”</p>
              <figcaption className="mt-4 text-xs uppercase tracking-wider" style={{ color: C.suave }}>{d.marca} · {d.rot}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* serviço escolhido vira o começo da mensagem */}
      <section id="contato-2" className="px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <Selo>Contato</Selo>
          <h2 className="font-display mt-4 text-4xl md:text-6xl font-semibold leading-tight max-w-3xl">Me conta o que você precisa <em style={{ color: C.teal }}>e eu já te respondo</em></h2>
          <div className="mt-10 grid md:grid-cols-[1fr_1fr] gap-8">
            <div>
              <p className={`${mao.className} text-2xl mb-3`} style={{ color: C.teal }}>1. escolhe um ↓</p>
              <div className="grid gap-3">
                {SERV.map((s, i) => (
                  <button key={s.t} type="button" onClick={() => setServ(i)} className="text-left rounded-2xl border-2 p-5 transition-all" style={{ borderColor: serv === i ? C.navy : C.borda, background: serv === i ? C.navy : "#fff", color: serv === i ? "#fff" : C.navy }}>
                    <span className="flex items-center justify-between font-bold text-lg">{s.t}{s.destaque && <span className="rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-wider" style={{ background: C.tealClaro, color: C.navy }}>mais pedido</span>}</span>
                    <span className="block text-sm mt-1" style={{ opacity: 0.75 }}>{s.d}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className={`${mao.className} text-2xl mb-3`} style={{ color: C.teal }}>2. manda pra mim ↓</p>
              <div className="rounded-3xl bg-white border p-6 md:p-8" style={{ borderColor: C.borda }}>
                <Formulario key={serv} servico={SERV[serv].t} curto />
                <p className="mt-5 pt-5 border-t text-sm flex flex-wrap gap-x-5 gap-y-2" style={{ borderColor: C.borda, color: C.suave }}>
                  prefere direto?
                  <a href={WHATS + encodeURIComponent(`Oi Lara! Quero ${SERV[serv].t.toLowerCase()}.`)} className="font-bold" style={{ color: C.teal }}>WhatsApp →</a>
                  <a href={`mailto:${EMAIL}`} className="font-bold" style={{ color: C.teal }}>{EMAIL}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* youtube em faixa escura enxuta */}
      <section className="px-6 md:px-12 py-12" style={{ background: C.navy, color: "#fff" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-[0.7fr_1.3fr] gap-8 items-center">
          <div>
            <Selo cor={C.tealClaro}>Também faço</Selo>
            <h3 className="font-display mt-3 text-3xl font-semibold">Ads pro <span style={{ color: "#FF4B4B" }}>YouTube</span></h3>
            <p className="mt-2 text-white/70 text-sm">Horizontal, com gancho nos 5 primeiros segundos, antes do botão de pular.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">{YT.map((y) => <YtCard key={y.id} y={y} />)}</div>
        </div>
      </section>
      <style>{`@keyframes final-corre{to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

/* ---------------- OPÇÃO 3: Bilhete pessoal ---------------- */
function Opcao3() {
  return (
    <div style={{ background: C.fundo, color: C.navy }}>
      {/* youtube grande, um em destaque */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1.4fr_0.6fr] gap-6 items-end">
          <div>
            <Selo>YouTube Ads</Selo>
            <h2 className="font-display mt-4 mb-6 text-4xl md:text-5xl font-semibold">2,3 milhões de views <em style={{ color: C.teal }}>em um anúncio</em></h2>
            <YtCard y={YT[0]} grande />
          </div>
          <div className="grid gap-3">
            <YtCard y={YT[1]} />
            <p className={`${mao.className} text-2xl -rotate-3 text-center`} style={{ color: C.teal }}>dá o play com som ↑</p>
          </div>
        </div>
      </section>

      {/* serviços em cards coloridos com depoimento de quem contratou aquele serviço */}
      <section className="px-6 md:px-12 py-16" style={{ background: C.fundo2 }}>
        <div className="max-w-6xl mx-auto">
          <Selo>Como posso ajudar</Selo>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERV.map((s, i) => {
              const d = DEP[i];
              const fundo = [C.navy, C.teal, "#fff", C.tint][i];
              const tinta = i < 2 ? "#fff" : C.navy;
              return (
                <div key={s.t} className="rounded-3xl p-6 flex flex-col" style={{ background: fundo, color: tinta, transform: `rotate(${[-1.2, 0.8, -0.6, 1.1][i]}deg)` }}>
                  <span className="font-display text-sm opacity-70">0{i + 1}</span>
                  <p className="font-display mt-2 text-2xl font-semibold leading-tight">{s.t}</p>
                  <p className="mt-2 text-sm opacity-80">{s.d}</p>
                  <div className="mt-auto pt-6">
                    <p className="text-sm italic opacity-90">“{d.txt.split(".")[0]}.”</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-wider opacity-70">{d.marca} · {d.num} {d.rot}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* contato como bilhete com foto polaroid */}
      <section id="contato-3" className="px-6 md:px-12 py-16 md:py-24" style={{ background: C.navy }}>
        <div className="max-w-5xl mx-auto relative rounded-[2rem] p-7 md:p-12 grid md:grid-cols-[0.8fr_1.2fr] gap-10" style={{ background: "#FBFAF5", color: C.navy }}>
          <div className="relative">
            <div className="bg-white p-3 pb-10 shadow-xl -rotate-3 w-[220px] mx-auto md:mx-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/capa/5-pb-rindo.webp" alt="Lara Dam" className="aspect-[4/5] w-full object-cover object-top" />
              <p className={`${mao.className} absolute bottom-2 left-0 right-0 text-center text-2xl`}>oi, sou a Lara!</p>
            </div>
          </div>
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">Vamos criar algo <em style={{ color: C.teal }}>juntos</em>?</h2>
            <p className="mt-3" style={{ color: C.suave }}>Me conta da sua marca. Eu leio tudo e respondo em até 48h, com ideia de gancho já na primeira mensagem.</p>
            <div className="mt-6"><Formulario /></div>
            <p className="mt-6 text-sm flex flex-wrap gap-x-5 gap-y-2" style={{ color: C.suave }}>
              <a href={WHATS + encodeURIComponent("Oi Lara! Vim pelo seu portfólio.")} className="font-bold" style={{ color: C.teal }}>WhatsApp (12) 98872-9264</a>
              <a href={`mailto:${EMAIL}`} className="font-bold" style={{ color: C.teal }}>{EMAIL}</a>
              <a href="https://instagram.com/eilaradam" className="font-bold" style={{ color: C.teal }}>@eilaradam</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const OPCOES = [
  { n: 1, nome: "Prova primeiro", sub: "Números grandes das marcas, serviços numerados (YouTube vira o 05) e contato com 3 caminhos.", C: Opcao1 },
  { n: 2, nome: "Escolha e já pede", sub: "Depoimentos correndo numa faixa, e o serviço que a marca escolhe já vira o começo da mensagem.", C: Opcao2 },
  { n: 3, nome: "Bilhete pessoal", sub: "YouTube em destaque, cada serviço com o depoimento de quem contratou, contato em bilhete com polaroid.", C: Opcao3 },
];

export default function FinalOpcoes() {
  return (
    <main style={{ background: C.navy }}>
      {OPCOES.map(({ n, nome, sub, C: Comp }) => (
        <div key={n}>
          <div className="sticky top-0 z-40 px-6 md:px-12 py-3 flex flex-wrap items-baseline gap-x-4" style={{ background: "#0F1626", color: "#fff" }}>
            <span className="font-display text-xl font-semibold">Opção {n} · {nome}</span>
            <span className="text-sm text-white/60">{sub}</span>
          </div>
          <Comp />
        </div>
      ))}
    </main>
  );
}
