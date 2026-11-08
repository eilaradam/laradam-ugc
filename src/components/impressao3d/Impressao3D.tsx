"use client";

import { useCallback, useState } from "react";
import { Check, MessageCircle, Mail, ArrowDown, ArrowUpRight, Sparkles, Plus, Minus } from "lucide-react";
import { VIDEOS } from "@/data/content";
import VideoCard from "@/components/VideoCard";
import BrandsMarquee from "@/components/BrandsMarquee";
import ImpressoraIso from "./ImpressoraIso";
import SuporteIso from "./SuporteIso";

// Mini-portfólio + proposta pra marcas de impressora 3D (ugc.laradam.com/impressao-3d).
// Uma página só pra várias marcas: o nome entra pelo link (?marca=Creality).
// Ordem do funil da Lara: capa (ver) → prova e destaques (confiar) → ideia, pacotes e contato (contratar).

const WHATSAPP = "5512988729264";
const EMAIL = "laradam.ugc@gmail.com";

const NUMEROS = [
  { v: "100M+", k: "views em campanhas" },
  { v: "500+", k: "vídeos gravados" },
  { v: "200+", k: "marcas parceiras" },
  { v: "5,94x", k: "maior ROAS em anúncio" },
];

const CASES = [
  { video: VIDEOS.find((v) => v.id === "t0a")!, metrica: "+100 milhões de views", detalhe: "Recorde de CTR no Meta. Virou o criativo principal da campanha." },
  { video: VIDEOS.find((v) => v.id === "t0b")!, metrica: "+30 milhões de views", detalhe: "Campanha de cashback feita pra growth, só no TikTok." },
  {
    video: { id: "case-bready", title: "Bready", category: "gastronomia", brand: "Bready", youtubeId: "2s6BI893C74", thumbnail: "/best-bready.jpg" },
    metrica: "5,94x de ROAS",
    detalhe: "Criativo pra tráfego pago: cada R$ 1 investido voltou quase 6.",
  },
];

const TECH = [
  { id: "t7", porque: "Logitech: produto de mesa mostrado no uso real." },
  { id: "t-fancy", porque: "Fancy: gadget explicado em segundos, benefício antes da ficha técnica." },
  { id: "ia2", porque: "Sintra: IA explicada pra quem nunca usou. É o tom da aula." },
  { id: "t-infinitepay", porque: "InfinitePay Tap: 4 milhões de views com tecnologia no dia a dia." },
];

// Reels escolhidos pela Lara (07/11), baixados em public/videos-ig e tocados no player nativo.
const REFS = [
  { instagram: "DfRzLuDxSi-", brand: "@fabio.riudi", titulo: "Tudo que imprimi de \"planta\"", porque: "78 mil curtidas. Cada peça com uma função: ímã, gavetinha, porta-controle. Mostra a máquina resolvendo a casa." },
  { instagram: "DVmQcihD3h4", brand: "@home_gaabycosta", titulo: "Tudo que imprimi pra decorar a casa", porque: "23 mil curtidas. Decoração feita em casa, com a marca da impressora citada na legenda." },
  { instagram: "DTYlIabCTBu", brand: "@marlahonorato", titulo: "Tenho uma impressora 3D em casa", porque: "15 mil curtidas. Formato de conversa, como quem conta pra uma amiga: é o tom dos meus UGCs." },
];

const VIDEOS_PLANO = [
  { n: "01", nome: "Unboxing de iniciante", texto: "Da caixa à primeira peça no mesmo dia. Responde \"será que eu consigo?\"." },
  { n: "02", nome: "5 coisas que imprimi pra casa", texto: "Organizador, gancho, suporte: a máquina pagando o próprio espaço." },
  { n: "03", nome: "Criei com IA e imprimi", texto: "Peça que não existe em nenhum site, criada com o Claude em minutos." },
  { n: "04", nome: "Presente personalizado", texto: "Chaveiro e suporte com nome: o gancho de data comemorativa." },
  { n: "05", nome: "Renda extra com 3D", texto: "Peças pra vender: o ângulo de quem quer a máquina como negócio." },
];

type Item = { nome: string; valor: number };
const PACOTES: {
  nome: string;
  tipo: string;
  investimento: string;
  investimentoSub: string;
  itens: Item[];
  destaque?: boolean;
}[] = [
  {
    nome: "Permuta",
    tipo: "Sem cachê",
    investimento: "Máquina + 5 kg",
    investimentoSub: "de filamento · modelo combinado entre nós",
    itens: [
      { nome: "3 vídeos UGC pra anúncio (01, 02 e 03 do plano)", valor: 1950 },
      { nome: "Direito de uso em tráfego pago por 3 meses", valor: 585 },
      { nome: "1 vídeo curto: peça criada com o Claude, da ideia à impressão", valor: 650 },
    ],
  },
  {
    nome: "Completo",
    tipo: "Permuta + cachê",
    investimento: "Máquina + 10 kg",
    investimentoSub: "de filamento + R$ 2.500 · modelo combinado entre nós",
    destaque: true,
    itens: [
      { nome: "5 vídeos UGC pra anúncio (o plano inteiro)", valor: 3250 },
      { nome: "Direito de uso em tráfego pago por 6 meses", valor: 1950 },
      { nome: "Vídeo-aula \"Crie peças 3D com IA\", liberada pros seus clientes sem prazo", valor: 2500 },
      { nome: "15 ganchos alternativos (3 por vídeo) pra teste A/B", valor: 750 },
      { nome: "1 Reels em collab no @eilaradam", valor: 850 },
    ],
  },
];

const FAQ = [
  { p: "Qual máquina entra na parceria?", r: "A gente escolhe junto. Precisa ser um modelo que vocês queiram vender e que mostre o melhor da marca no vídeo, como uma multicolor pras peças coloridas da aula. O objetivo é ficar bom pros dois lados." },
  { p: "A aula depende de algum programa pago?", r: "Não. O Claude tem plano gratuito, o OpenSCAD é gratuito, e o fatiamento é feito no software da própria marca." },
  { p: "Onde a aula fica?", r: "Vocês recebem os arquivos em módulos curtos e colocam onde quiserem: área do cliente, YouTube, onboarding ou junto com a compra." },
  { p: "E se o roteiro não agradar?", r: "Cada roteiro passa pela aprovação de vocês antes de eu gravar. Ajusto até aprovarem, e nada é gravado no escuro." },
  { p: "O que acontece com a máquina depois?", r: "Fica comigo. Eu continuo imprimindo e postando no meu perfil, e a marca segue aparecendo sem custo extra." },
];

const brl = (n: number) => "R$ " + n.toLocaleString("pt-BR");

function Rotulo({ n, children, escuro }: { n: string; children: React.ReactNode; escuro?: boolean }) {
  return (
    <div className={"mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] " + (escuro ? "text-accent-on-dark" : "text-primary")}>
      <span className={"font-serif-accent text-base italic normal-case tracking-normal " + (escuro ? "text-accent-on-dark/70" : "text-primary/70")}>{n}</span>
      <span className={"h-px w-8 " + (escuro ? "bg-accent-on-dark/50" : "bg-primary/40")} />
      {children}
    </div>
  );
}

function Pergunta({ p, r }: { p: string; r: string }) {
  const [aberta, setAberta] = useState(false);
  return (
    <div className="border-b border-border">
      <button onClick={() => setAberta(!aberta)} className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold">
        {p}
        {aberta ? <Minus size={18} className="flex-shrink-0 text-primary" /> : <Plus size={18} className="flex-shrink-0 text-primary" />}
      </button>
      {aberta && <p className="-mt-1 pb-5 leading-relaxed text-foreground-soft">{r}</p>}
    </div>
  );
}

export default function Impressao3D({ marca }: { marca?: string }) {
  const [pct, setPct] = useState(100);
  const onProgresso = useCallback((n: number) => setPct(n), []);
  const quem = marca || "sua marca";
  const zap = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    marca ? `Oi Lara! Sou da ${marca}, vi a proposta de impressão 3D e quero conversar.` : "Oi Lara! Vi a proposta de impressão 3D e quero conversar."
  )}`;

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* barra */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 md:px-8">
          <a href="/" className="font-display text-lg font-black tracking-tight">
            LARA DAM<span className="text-primary">.</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-foreground-soft md:flex">
            <a href="#portfolio" className="hover:text-primary">Portfólio</a>
            <a href="#ideia" className="hover:text-primary">A ideia</a>
            <a href="#pacotes" className="hover:text-primary">Pacotes</a>
          </nav>
          <a href={zap} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-primary">
            <MessageCircle size={16} /> <span><span className="hidden sm:inline">Falar no </span>WhatsApp</span>
          </a>
        </div>
      </header>

      {/* capa: nome à esquerda, foto + impressora à direita */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 pb-14 pt-10 md:grid-cols-[1.05fr_1fr] md:px-8 md:pb-20 md:pt-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-light px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
            <Sparkles size={13} /> Proposta para {marca ? `a ${marca}` : "marcas de impressão 3D"}
          </div>
          <h1 className="mt-6 font-display text-6xl font-black leading-[0.88] tracking-tighter md:text-8xl">
            Lara
            <br />
            Dam<span className="text-primary">.</span>
          </h1>
          <p className="mt-5 font-serif-accent text-2xl italic leading-snug text-foreground-soft md:text-3xl">
            UGC creator de tecnologia e IA. Agora, imprimindo em 3D.
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed">
            Eu quero mostrar a impressora {marca ? `da ${marca}` : "de vocês"} pra quem ainda tem medo de comprar a primeira, e ensinar seus clientes a criar peças do zero com o Claude, a IA da Anthropic.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#pacotes" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-background transition-transform hover:-translate-y-0.5">
              Ver os pacotes <ArrowDown size={18} />
            </a>
            <a href={zap} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3.5 font-semibold transition-colors hover:border-primary hover:text-primary">
              <MessageCircle size={18} /> Conversar
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 sm:grid-cols-4">
            {NUMEROS.map((n) => (
              <div key={n.k}>
                <dt className="font-display text-3xl font-black tracking-tight">{n.v}</dt>
                <dd className="mt-0.5 text-xs leading-snug text-muted">{n.k}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto mb-10 w-full max-w-md md:mb-0 md:max-w-none">
          <div className="relative mr-auto aspect-[4/5] w-[80%] overflow-hidden rounded-[2rem] bg-background-alt shadow-xl">
            <img src="/capa/1-sorriso.webp" alt="Lara Dam" className="h-full w-full object-cover object-top" />
          </div>
          <div className="absolute -bottom-12 right-0 w-[46%] md:-bottom-10 md:-right-4 md:w-[50%] rounded-[1.75rem] border border-border bg-background p-3 shadow-2xl">
            <ImpressoraIso className="h-auto w-full" onProgresso={onProgresso} />
            <div className="mt-1 flex items-center justify-between gap-2 px-1 pb-1 text-[11px] font-bold uppercase tracking-[0.15em]">
              <span className="text-foreground-soft">{pct < 100 ? "Imprimindo" : "Pronto"}</span>
              <span className="text-primary">{pct}%</span>
            </div>
            <div className="mx-1 mb-1 h-1.5 overflow-hidden rounded-full bg-background-alt">
              <div className="h-full rounded-full bg-primary transition-[width] duration-200" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <div className="absolute right-0 top-8 rotate-3 rounded-2xl bg-foreground px-4 py-3 text-background shadow-lg">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-on-dark">Exclusivo</div>
            <div className="text-sm font-semibold">1 marca de 3D só</div>
          </div>
        </div>
      </section>

      <BrandsMarquee />

      {/* cases */}
      <section id="portfolio" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 md:px-8 md:py-24">
        <Rotulo n="01">Meus maiores cases</Rotulo>
        <h2 className="max-w-3xl font-display text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
          Vídeo que eu faço vira <span className="font-serif-accent italic text-primary">criativo principal</span>.
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {CASES.map((c, i) => (
            <div key={c.video.id}>
              <VideoCard video={c.video} index={i} size="sm" />
              <div className="mt-4 font-display text-2xl font-black tracking-tight">{c.metrica}</div>
              <p className="mt-1 text-sm leading-relaxed text-foreground-soft">{c.detalhe}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-muted">Tecnologia e IA</div>
            <h3 className="mt-2 font-display text-3xl font-black tracking-tight">Já faço isso com gadget e IA</h3>
          </div>
          <a href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            Portfólio completo <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">
          {TECH.map((t, i) => {
            const v = VIDEOS.find((x) => x.id === t.id);
            if (!v) return null;
            return (
              <div key={t.id}>
                <VideoCard video={v} index={i} size="sm" />
                <p className="mt-3 text-sm leading-relaxed text-foreground-soft">{t.porque}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* a ideia */}
      <section id="ideia" className="scroll-mt-16 bg-background-alt">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <Rotulo n="02">A ideia</Rotulo>
          <h2 className="max-w-3xl font-display text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Quem pensa em comprar uma impressora 3D trava em duas perguntas.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              { q: "\"Vou conseguir usar?\"", r: "Os UGCs respondem.", d: "Uma pessoa comum, sem experiência, tirando a máquina da caixa e imprimindo no mesmo dia. É o anúncio que quebra o medo." },
              { q: "\"Vou imprimir o quê?\"", r: "A aula responde.", d: "O cliente descreve a peça em português, o Claude cria o modelo e a impressora imprime. Ninguém precisa saber modelagem 3D." },
            ].map((b) => (
              <div key={b.q} className="rounded-3xl border border-border bg-background p-7 md:p-9">
                <div className="font-serif-accent text-3xl italic leading-tight text-foreground-soft md:text-4xl">{b.q}</div>
                <div className="mt-5 font-display text-2xl font-black text-primary">{b.r}</div>
                <p className="mt-2 leading-relaxed text-foreground-soft">{b.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-muted">O plano de vídeos</div>
            <ol className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {VIDEOS_PLANO.map((v) => (
                <li key={v.n} className="rounded-2xl border border-border bg-background p-5">
                  <div className="font-serif-accent text-2xl italic text-primary">{v.n}</div>
                  <div className="mt-2 font-semibold leading-snug">{v.nome}</div>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground-soft">{v.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* o diferencial: a aula com o Claude */}
      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <Rotulo n="03" escuro>O diferencial</Rotulo>
          <h2 className="max-w-3xl font-display text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Da ideia à peça impressa, <span className="font-serif-accent italic text-accent-on-dark">sem saber modelar</span>.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-background/75">
            A vídeo-aula mostra o caminho inteiro, na máquina de vocês e com objetos reais da casa. É o tipo de conteúdo que faz o cliente usar a impressora na primeira semana, e quem usa recomenda.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.25fr_0.8fr]">
            {/* 1. pedido */}
            <div className="flex flex-col rounded-3xl border border-background/15 bg-background/5 p-6">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent-on-dark">1 · O cliente pede</div>
              <div className="mt-5 self-end rounded-2xl rounded-br-md bg-accent-on-dark px-4 py-3 text-sm font-medium leading-relaxed text-foreground">
                Cria um suporte de celular com o nome &quot;ANA&quot; em relevo na frente, com uma trava pro celular não escorregar.
              </div>
              <div className="mt-3 rounded-2xl rounded-bl-md bg-background/10 px-4 py-3 text-sm leading-relaxed text-background/85">
                Pronto! Fiz o modelo com base, encosto inclinado e o nome em relevo. Quer que eu deixe mais alto?
              </div>
            </div>
            {/* 2. a peça */}
            <div className="flex flex-col overflow-hidden rounded-3xl border border-background/15 bg-[#151E33] p-6">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent-on-dark">2 · O Claude cria a peça</div>
              <SuporteIso className="mx-auto my-2 h-auto w-full max-w-[300px]" />
              <div className="flex flex-wrap justify-center gap-2">
                {["Medidas sob medida", "Encosto inclinado", "Nome em relevo"].map((c) => (
                  <span key={c} className="rounded-full border border-background/15 px-3 py-1 text-xs text-background/75">{c}</span>
                ))}
              </div>
            </div>
            {/* 3. impressão */}
            <div className="flex flex-col rounded-3xl border border-background/15 bg-background/5 p-6">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent-on-dark">3 · STL, fatiar e imprimir</div>
              <ul className="mt-5 space-y-3 text-sm text-background/85">
                {["Exporta suporte.stl", "Abre no fatiador da marca", "Imprime na máquina de vocês"].map((s) => (
                  <li key={s} className="flex items-start gap-2.5">
                    <Check size={16} className="mt-0.5 flex-shrink-0 text-accent-on-dark" /> {s}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6 text-sm leading-relaxed text-background/60">Em módulos curtos, pra colocar no onboarding, na área do cliente ou no YouTube.</div>
            </div>
          </div>
        </div>
      </section>

      {/* moodboard */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Rotulo n="04">Moodboard</Rotulo>
        <h2 className="max-w-3xl font-display text-4xl font-black leading-[0.95] tracking-tight md:text-5xl">
          O que já funciona em impressão 3D, com a minha cara.
        </h2>
        <p className="mt-4 max-w-2xl text-foreground-soft">Reels de impressão 3D que já funcionaram com o público brasileiro e mostram o tom e os formatos que eu proponho. Toque pra assistir.</p>
        <div className="mx-auto mt-10 grid max-w-xs grid-cols-1 gap-8 sm:max-w-none sm:grid-cols-3 sm:gap-5">
          {REFS.map((r, i) => (
            <div key={r.instagram}>
              <VideoCard
                video={{ id: `ref-${r.instagram}`, title: r.titulo, category: "", brand: r.brand, instagram: r.instagram, thumbnail: `/capas-ig/${r.instagram}.webp`, videoLocal: `/videos-ig/${r.instagram}.mp4` }}
                index={i}
                size="sm"
              />
              <p className="mt-3 text-sm leading-relaxed text-foreground-soft">{r.porque}</p>
            </div>
          ))}
        </div>
      </section>

      {/* pacotes */}
      <section id="pacotes" className="scroll-mt-16 bg-background-alt">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <Rotulo n="05">Pacotes</Rotulo>
          <h2 className="max-w-3xl font-display text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Vocês mandam a máquina. <span className="font-serif-accent italic text-primary">Eu faço ela vender.</span>
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {PACOTES.map((pk) => {
              const total = pk.itens.reduce((s, i) => s + i.valor, 0);
              const d = pk.destaque;
              return (
                <div key={pk.nome} className={"relative flex flex-col rounded-3xl border p-7 md:p-9 " + (d ? "border-primary bg-foreground text-background shadow-2xl" : "border-border bg-background")}>
                  {d && (
                    <span className="absolute -top-3 left-7 rounded-full bg-accent-on-dark px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">
                      Recomendado
                    </span>
                  )}
                  <div className={"text-[11px] font-semibold uppercase tracking-[0.25em] " + (d ? "text-accent-on-dark" : "text-primary")}>
                    Pacote {pk.nome} · {pk.tipo}
                  </div>
                  <ul className="mt-6 space-y-3">
                    {pk.itens.map((i) => (
                      <li key={i.nome} className="flex items-start justify-between gap-4 text-sm">
                        <span className="flex items-start gap-2">
                          <Check size={16} className={"mt-0.5 flex-shrink-0 " + (d ? "text-accent-on-dark" : "text-primary")} />
                          {i.nome}
                        </span>
                        <span className={"flex-shrink-0 tabular-nums " + (d ? "text-background/55" : "text-muted")}>{brl(i.valor)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={"mt-6 flex items-baseline justify-between border-t pt-4 text-sm " + (d ? "border-background/15" : "border-border")}>
                    <span className={d ? "text-background/70" : "text-foreground-soft"}>Valor de mercado</span>
                    <span className="font-semibold tabular-nums line-through decoration-2 opacity-70">{brl(total)}</span>
                  </div>
                  <div className="mt-auto pt-6">
                    <div className={"text-[11px] font-bold uppercase tracking-[0.2em] " + (d ? "text-accent-on-dark" : "text-primary")}>Vocês investem</div>
                    <div className="mt-1 font-display text-4xl font-black leading-none tracking-tight md:text-5xl">{pk.investimento}</div>
                    <div className={"mt-1.5 font-semibold " + (d ? "text-background/80" : "text-foreground-soft")}>{pk.investimentoSub}</div>
                    <a
                      href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Oi Lara! ${marca ? `Sou da ${marca}. ` : ""}Quero o Pacote ${pk.nome} da proposta de impressão 3D.`)}`}
                      target="_blank"
                      rel="noopener"
                      className={
                        "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold transition-transform hover:-translate-y-0.5 " +
                        (d ? "bg-accent-on-dark text-foreground" : "bg-foreground text-background")
                      }
                    >
                      Quero o Pacote {pk.nome}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-center text-sm text-foreground-soft">
            Os pacotes são um ponto de partida. Se outro formato fizer mais sentido pra vocês, a gente monta junto.
          </p>

          <div className="mt-8 rounded-3xl border border-dashed border-primary/50 bg-primary-light p-6 md:p-8">
            <div className="font-display text-2xl font-black text-primary">Exclusividade de categoria</div>
            <p className="mt-2 max-w-3xl leading-relaxed">
              Eu vou fechar com <strong>uma única marca de impressão 3D</strong>. Enquanto a parceria durar, não gravo pra concorrente, e no meu perfil a impressora que aparece é a de vocês.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["Roteiro aprovado por vocês antes de gravar", "Edição, legenda e sound design", "Vídeo com e sem legenda, em 9:16", "Nota fiscal e entrega no Drive"].map((i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3.5 text-sm font-medium">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-background">
                  <Check size={14} />
                </span>
                {i}
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-sm text-muted">
            Envio da máquina e do filamento por conta da marca. Cachê do Pacote Completo: 50% na assinatura e 50% na entrega, por PIX ou boleto. Lara Dam LTDA, CNPJ 55.446.568/0001-22.
          </p>
        </div>
      </section>

      {/* como funciona */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2">
          <div>
            <Rotulo n="06">Como funciona</Rotulo>
            <ol className="relative ml-2 border-l-2 border-primary/30 pl-7">
              {[
                { e: "Vocês escolhem o pacote e mandam a máquina", q: "Semana 1" },
                { e: "Eu testo de verdade e mando os roteiros", q: "Até 7 dias depois que a máquina chega" },
                { e: "Gravo e entrego os UGCs", q: "Até 15 dias depois dos roteiros aprovados" },
                { e: "Entrego a vídeo-aula", q: "Até 30 dias depois que a máquina chega" },
              ].map((c) => (
                <li key={c.e} className="relative pb-7 last:pb-0">
                  <span className="absolute -left-[37px] top-1 h-4 w-4 rounded-full border-4 border-background bg-primary" />
                  <div className="font-semibold">{c.e}</div>
                  <div className="text-sm text-foreground-soft">{c.q}</div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <Rotulo n="07">Perguntas</Rotulo>
            <div className="border-t border-border">
              {FAQ.map((f) => (
                <Pergunta key={f.p} p={f.p} r={f.r} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* contato */}
      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8 md:pb-24">
        <div className="grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[2rem] bg-foreground p-8 text-background md:grid-cols-[1.3fr_1fr] md:p-12">
          <div>
            <h2 className="font-display text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
              Vamos imprimir <span className="font-serif-accent italic text-accent-on-dark">juntos</span>?
            </h2>
            <p className="mt-4 max-w-md text-background/75">
              Me diga qual pacote faz sentido pra {quem} e qual máquina vocês querem mostrar. Eu mando os roteiros dos primeiros vídeos pra aprovação.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={zap} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-accent-on-dark px-6 py-3.5 font-semibold text-foreground transition-transform hover:-translate-y-0.5">
                <MessageCircle size={18} /> Falar no WhatsApp
              </a>
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3.5 font-semibold transition-colors hover:border-accent-on-dark hover:text-accent-on-dark">
                <Mail size={18} /> {EMAIL}
              </a>
            </div>
          </div>
          <div className="mx-auto w-full max-w-xs rounded-[1.5rem] bg-background p-3">
            <ImpressoraIso className="h-auto w-full" />
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-muted">Lara Dam · UGC Creator · @eilaradam</p>
      </section>
    </main>
  );
}
