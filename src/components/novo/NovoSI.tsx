"use client";

import { useState } from "react";
import { Bricolage_Grotesque, Caveat } from "next/font/google";
import { ArrowRight, Volume2 } from "lucide-react";
import { BRAND_LOGO_FILES, CATEGORIES, VIDEOS, type Video } from "@/data/content";
import { useVideoModal } from "../VideoModalProvider";
import { CAPAS_SI } from "@/data/capasSI";

// Prévia "na vibe do Seu Influencer" (/novo?estilo=si): mesmas cores e energia da plataforma
// (off-white, roxo, limão, rosa, cantos bem redondos), mas com estrutura e frases da Lara,
// sem repetir os blocos da home deles. Só números que já estão no portfólio dela.

const titulo = Bricolage_Grotesque({ subsets: ["latin"], weight: ["600", "700", "800"] });
const mao = Caveat({ subsets: ["latin"], weight: ["600", "700"] });

const C = { fundo: "#F2F1ED", roxo: "#6C3CF5", roxoClaro: "#EEE8FE", limao: "#DCFB4E", rosa: "#DB4FA0", preto: "#18181B", suave: "#5B5B66" };

const yt = (id: string, brand: string, category: string): Video => ({ id: `si-${id}`, youtubeId: id, title: brand, brand, category });
const ig = (code: string, brand: string, category: string): Video => ({
  id: `si-${code}`, instagram: code, videoLocal: `/videos-ig/${code}.mp4`, thumbnail: `/capas-ig/${code}.webp`, title: brand, brand, category,
});

type Item = { video: Video; capa: string; local?: string; nota: string };
// baralho da capa: a da frente toca muda; clicar numa de trás traz ela pra frente
const BARALHO: Item[] = [
  { video: ig("DWPVV24RIF5", "Ateliê", "gastronomia"), capa: "/capas-ig/DWPVV24RIF5.webp", local: "/videos-ig/DWPVV24RIF5.mp4", nota: "Ateliê · gastronomia" },
  { video: ig("DUtk0aqkTSe", "DT3 Office", "casa"), capa: "/capas-ig/DUtk0aqkTSe.webp", local: "/videos-ig/DUtk0aqkTSe.mp4", nota: "DT3 · casa" },
  { video: ig("Dc1KSq6xN9G", "Creamy", "beleza"), capa: "/capas-ig/Dc1KSq6xN9G.webp", local: "/videos-ig/Dc1KSq6xN9G.mp4", nota: "Creamy · beleza" },
];


// as etapas da própria plataforma, contadas do lado da Lara
const ETAPAS = [
  { n: "1", t: "Você me aprova", d: "Leio o briefing e começo pelo gancho." },
  { n: "3", t: "Roteiro", d: "Link pra você aprovar cada fala." },
  { n: "5", t: "Gravação", d: "Gravo com o roteiro aprovado." },
  { n: "6", t: "Entrega", d: "Editado pra rodar como anúncio." },
];

const CAPAS_YT = ["maxresdefault.jpg", "sddefault.jpg", "hqdefault.jpg", "mqdefault.jpg"];
// capa escolhida a dedo (Lara + produto, sem texto na frente) quando existe; senão a do YouTube
const thumb = (v: Video) =>
  (v.youtubeId && CAPAS_SI.has(v.youtubeId) ? `/si/capas/${v.youtubeId}.jpg` : null) ?? v.thumbnail ?? `https://i.ytimg.com/vi/${v.youtubeId}/${CAPAS_YT[0]}`;
function proximaCapa(img: HTMLImageElement, v: Video) {
  if (v.thumbnail || !v.youtubeId || CAPAS_SI.has(v.youtubeId)) return;
  const i = Number(img.dataset.i ?? "0") + 1;
  if (i >= CAPAS_YT.length) return;
  img.dataset.i = String(i);
  img.src = `https://i.ytimg.com/vi/${v.youtubeId}/${CAPAS_YT[i]}`;
}

function TextoCapa() {
  return (
        <div>
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold" style={{ background: C.roxoClaro, color: C.roxo }}>
            <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: C.roxo }} /> UGC Creator · agenda aberta
          </span>
          <h1 className={`${titulo.className} mt-6 text-5xl lg:text-[4.8rem] font-extrabold tracking-[-0.045em] leading-[0.92]`} style={{ color: C.preto }}>
            Lara Dam.
            <span className="block">
              UGC que{" "}
              <span className="relative inline-block px-3" style={{ color: C.preto }}>
                <span className="absolute inset-x-0 bottom-1 top-3 -rotate-1 rounded-xl" style={{ background: C.limao }} />
                <span className="relative">vira venda.</span>
              </span>
            </span>
          </h1>
          <p className="mt-6 max-w-md text-lg" style={{ color: C.suave }}>
            Do gancho ao CTA, com roteiro aprovado antes de gravar. Dá o play e vê se combina com a sua marca.
          </p>

          <dl className="mt-8 grid grid-cols-3 max-w-md overflow-hidden rounded-3xl bg-white shadow-sm">
            {[["+500", "vídeos"], ["+300", "marcas"], ["140M+", "views"]].map(([n, k], i) => (
              <div key={k} className={`px-5 py-4 ${i ? "border-l border-black/5" : ""}`}>
                <dt className={`${titulo.className} text-3xl font-extrabold tracking-tight`} style={{ color: i === 1 ? C.roxo : C.preto }}>{n}</dt>
                <dd className="text-sm" style={{ color: C.suave }}>{k}</dd>
              </div>
            ))}
          </dl>

          <a href="#nichos" className="mt-8 inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-base font-bold text-white shadow-lg" style={{ background: C.roxo }}>
            Ver vídeos do meu nicho <ArrowRight className="h-4 w-4" />
          </a>
        </div>
  );
}

// logos grandes correndo numa faixa branca
function Logos({ compacta }: { compacta?: boolean }) {
  return (
    <div className={`${compacta ? "mt-10" : "mt-16"} border-y border-black/5 bg-white py-7 overflow-hidden`}>
      <div className="flex w-max items-center gap-16 si-logos">
        {[...BRAND_LOGO_FILES, ...BRAND_LOGO_FILES].map((f, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={`/logo-1/${encodeURI(f)}`} alt="" className="h-20 w-auto max-w-[170px] object-contain" />
        ))}
      </div>
    </div>
  );
}

function CapaBaralho() {
  const { open } = useVideoModal();
  const [ordem, setOrdem] = useState([0, 1, 2]);
  const frente = BARALHO[ordem[0]];
  return (
    <section className="pt-28 pb-10">
      <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
        <TextoCapa />

        {/* baralho de vídeos */}
        <div className="relative mx-auto h-[540px] w-[340px]">
          {ordem.slice().reverse().map((idx, pos) => {
            const it = BARALHO[idx];
            const atras = 2 - pos; // 0 = frente
            const naFrente = atras === 0;
            return (
              <button
                key={it.video.id}
                type="button"
                onClick={() => (naFrente ? open(it.video) : setOrdem([idx, ...ordem.filter((o) => o !== idx)]))}
                data-track={`si_baralho_${it.video.brand}`}
                className="absolute left-1/2 top-0 w-[280px] aspect-[9/16] -translate-x-1/2 overflow-hidden rounded-[2rem] border-[5px] border-white shadow-2xl transition-all duration-500"
                style={{ transform: `translateX(calc(-50% + ${atras * 34}px)) rotate(${atras * 6}deg) scale(${1 - atras * 0.06})`, zIndex: 10 - atras }}
              >
                {naFrente && it.local ? (
                  <video key={it.local} src={it.local} poster={it.capa} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={it.capa} alt={it.video.brand} className="absolute inset-0 h-full w-full object-cover" />
                )}
                {naFrente && (
                  <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white">
                    <Volume2 className="h-3 w-3" /> toque pra ouvir
                  </span>
                )}
              </button>
            );
          })}
          <span className={`${mao.className} absolute -bottom-2 -left-10 z-20 -rotate-6 text-[26px] leading-none`} style={{ color: C.roxo }}>
            ↖ {frente.nota}
            <span className="block text-xl" style={{ color: C.suave }}>clica nos de trás pra trocar</span>
          </span>
        </div>
      </div>

      <Logos />
    </section>
  );
}

type Adesivo = { item: Item; tocar: boolean; numero: string; txt: string; cor: string; tinta: string; giro: number };
// os quatro rodam sozinhos, mudos: cortes de 12 s em /public/si (o clique abre o vídeo inteiro com som)
const ADESIVOS: Adesivo[] = [
  { item: { video: yt("2s6BI893C74", "Bready", "gastronomia"), capa: "/best-bready.jpg", local: "/si/bready.mp4", nota: "" }, tocar: true, numero: "5,94x", txt: "de ROAS", cor: C.roxo, tinta: "#fff", giro: -3 },
  { item: { ...BARALHO[0], local: "/si/atelie.mp4" }, tocar: true, numero: "+500", txt: "vídeos como esse", cor: C.limao, tinta: C.preto, giro: 2 },
  { item: { video: yt("wesTfq67X9o", "Méliuz", "financas"), capa: "/best-meliuz.jpg", local: "/si/meliuz.mp4", nota: "" }, tocar: true, numero: "+30M", txt: "de views", cor: C.rosa, tinta: "#fff", giro: -2 },
  { item: { video: yt("5wf8Fv2CTa4", "InfinitePay", "financas"), capa: "/best-infinitepay.jpg", local: "/si/infinitepay.mp4", nota: "" }, tocar: true, numero: "+100M", txt: "de views", cor: C.preto, tinta: "#fff", giro: 3 },
];

/** 2: mural 2x2 com adesivos de número colados nos vídeos */
function CapaAdesivos() {
  const { open } = useVideoModal();
  return (
    <section className="pt-24 pb-6">
      <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
        <TextoCapa />
        <div className="grid grid-cols-2 gap-4 mx-auto w-full max-w-[370px]">
          {ADESIVOS.map((a, i) => (
            <button key={a.item.video.id} type="button" onClick={() => open(a.item.video)}
              className={`relative aspect-[9/14] rounded-[1.6rem] border-[5px] border-white shadow-xl ${i % 2 ? "mt-10" : ""}`}
              style={{ transform: `rotate(${a.giro}deg)` }}>
              <span className="absolute inset-0 overflow-hidden rounded-[1.3rem]">
                {a.tocar && a.item.local ? (
                  <video src={a.item.local} poster={a.item.capa} autoPlay muted loop playsInline className="h-full w-full object-cover" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.item.capa} alt={a.item.video.brand} className="h-full w-full object-cover" />
                )}
              </span>
              <span className="absolute -bottom-4 -left-3 rounded-2xl px-3.5 py-2 text-left shadow-lg" style={{ background: a.cor, color: a.tinta, transform: `rotate(${-a.giro * 2}deg)` }}>
                <span className={`${titulo.className} block text-2xl font-extrabold leading-none`}>{a.numero}</span>
                <span className="block text-xs font-semibold opacity-90">{a.txt}{a.item.video.brand === "Ateliê" ? "" : ` · ${a.item.video.brand}`}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <Logos compacta />
    </section>
  );
}

/** 3: celular com stories passando sozinhos, barrinhas de progresso em cima */
function CapaStories() {
  const { open } = useVideoModal();
  const [i, setI] = useState(0);
  const atual = BARALHO[i];
  const proximo = () => setI((n) => (n + 1) % BARALHO.length);
  return (
    <section className="pt-28 pb-10">
      <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
        <TextoCapa />
        <div className="relative mx-auto">
          <span className="absolute -inset-6 -z-0 rotate-6 rounded-[3rem]" style={{ background: C.limao }} />
          <button type="button" onClick={() => open(atual.video)}
            className="relative z-10 block w-[300px] aspect-[9/16] overflow-hidden rounded-[2.4rem] border-[8px] shadow-2xl" style={{ borderColor: C.preto, background: C.preto }}>
            <video key={atual.local} src={atual.local} poster={atual.capa} autoPlay muted playsInline onEnded={proximo}
              onTimeUpdate={(e) => { if (e.currentTarget.currentTime > 7) proximo(); }} className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute inset-x-3 top-3 flex gap-1.5">
              {BARALHO.map((b, n) => (
                <span key={b.video.id} className="h-1 flex-1 overflow-hidden rounded-full bg-white/40">
                  <span className={`block h-full bg-white ${n === i ? "story-anda" : ""}`} style={{ width: n < i ? "100%" : n === i ? undefined : "0%" }} />
                </span>
              ))}
            </span>
            <span className="absolute left-3 top-7 flex items-center gap-2 text-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/capa/1-sorriso.webp" alt="" className="h-8 w-8 rounded-full object-cover ring-2" style={{ ["--tw-ring-color" as string]: C.roxo }} />
              <span className="text-sm font-semibold drop-shadow">laradam · {atual.video.brand}</span>
            </span>
            <span className="absolute bottom-4 inset-x-4 rounded-2xl bg-white/90 px-4 py-2.5 text-center text-sm font-bold" style={{ color: C.preto }}>
              <Volume2 className="mr-1 inline h-4 w-4" /> toque pra ouvir
            </span>
          </button>
        </div>
      </div>
      <Logos />
      <style>{`.story-anda { animation: story-anda 7s linear forwards; } @keyframes story-anda { from { width: 0% } to { width: 100% } }`}</style>
    </section>
  );
}

/** 4: vitrine roxa com duas colunas de vídeo correndo e os números grudados */
function CapaVitrine() {
  const { open } = useVideoModal();
  const todos: Item[] = [
    ...BARALHO,
    { video: yt("2s6BI893C74", "Bready", "gastronomia"), capa: "/best-bready.jpg", nota: "5,94x de ROAS" },
    { video: yt("5wf8Fv2CTa4", "InfinitePay", "financas"), capa: "/best-infinitepay.jpg", nota: "+100M de views" },
    { video: yt("wesTfq67X9o", "Méliuz", "financas"), capa: "/best-meliuz.jpg", nota: "+30M de views" },
  ];
  const cols = [todos.filter((_, n) => n % 2 === 0), todos.filter((_, n) => n % 2 === 1)];
  return (
    <section className="pt-28 pb-10">
      <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
        <TextoCapa />
        <div className="vitrine relative h-[580px] overflow-hidden rounded-[2.5rem] p-4 grid grid-cols-2 gap-4" style={{ background: C.roxo }}>
          {cols.map((col, c) => (
            <div key={c} className={`vitrine-col flex flex-col gap-4 ${c ? "vitrine-desce" : "vitrine-sobe"}`}>
              {[...col, ...col].map((it, n) => (
                <button key={`${it.video.id}-${n}`} type="button" onClick={() => open(it.video)} className="relative aspect-[9/14] overflow-hidden rounded-[1.4rem] bg-white/10">
                  {it.local && n === 0 ? (
                    <video src={it.local} poster={it.capa} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={it.capa} alt={it.video.brand} className="absolute inset-0 h-full w-full object-cover" />
                  )}
                  {!it.local && (
                    <span className="absolute left-2.5 bottom-2.5 rounded-xl px-2.5 py-1 text-xs font-bold" style={{ background: C.limao, color: C.preto }}>{it.nota}</span>
                  )}
                </button>
              ))}
            </div>
          ))}
          <span className="pointer-events-none absolute inset-x-0 top-0 h-16" style={{ background: `linear-gradient(${C.roxo}, transparent)` }} />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-16" style={{ background: `linear-gradient(transparent, ${C.roxo})` }} />
        </div>
      </div>
      <Logos />
      <style>{`
        .vitrine-sobe { animation: vitrine-sobe 40s linear infinite; }
        .vitrine-desce { animation: vitrine-sobe 46s linear infinite reverse; }
        .vitrine:hover .vitrine-col { animation-play-state: paused; }
        @keyframes vitrine-sobe { from { transform: translateY(0) } to { transform: translateY(-50%) } }
        @media (prefers-reduced-motion: reduce) { .vitrine-col { animation: none; } }
      `}</style>
    </section>
  );
}

const CAPAS = { baralho: CapaBaralho, adesivos: CapaAdesivos, stories: CapaStories, vitrine: CapaVitrine } as const;
export type CapaSI = keyof typeof CAPAS;

// etapas numa faixa só: pouco texto, pra não segurar quem quer ver vídeo
function ComoFunciona() {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-5">
        <div className="rounded-[2rem] px-7 py-8 md:px-10 grid md:grid-cols-[0.9fr_2.1fr] gap-6 items-center" style={{ background: C.roxo }}>
          <h2 className={`${titulo.className} text-3xl font-extrabold tracking-[-0.03em] leading-tight text-white`}>
            Depois que você <span style={{ color: C.limao }}>me aprova</span>
          </h2>
          <ol className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ETAPAS.map((e) => (
              <li key={e.t} className="rounded-2xl bg-white px-4 py-3.5">
                <p className="flex items-center gap-2 font-bold" style={{ color: C.preto }}>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full text-xs" style={{ background: C.limao }}>{e.n}</span>
                  {e.t}
                </p>
                <p className="mt-1.5 text-sm leading-snug" style={{ color: C.suave }}>{e.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ordem dos nichos pelo que mais aprova no Seu Influencer (03/11: beleza e moda na frente, IA tem pouco vídeo)
const ORDEM_NICHOS = ["beleza", "moda", "saude", "casa", "gastronomia", "food", "tech", "financas", "ia", "viagem"];
const ordemNicho = (slug: string) => { const i = ORDEM_NICHOS.indexOf(slug); return i < 0 ? 99 : i; };

function Nichos() {
  const { open } = useVideoModal();
  const nichos = CATEGORIES.filter((c) => c.slug !== "all")
    .map((c) => ({ ...c, videos: VIDEOS.filter((v) => v.category === c.slug && (v.youtubeId || v.videoLocal)) }))
    .filter((c) => c.videos.length >= 3)
    .sort((a, b) => ordemNicho(a.slug) - ordemNicho(b.slug));
  const [ativo, setAtivo] = useState(nichos[0]?.slug);
  const n = nichos.find((x) => x.slug === ativo) ?? nichos[0];
  return (
    <section id="nichos" className="py-20">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className={`${titulo.className} text-5xl font-extrabold tracking-[-0.04em]`} style={{ color: C.preto }}>
          Qual é o seu nicho?
        </h2>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {nichos.map((x) => (
            <button key={x.slug} type="button" onClick={() => setAtivo(x.slug)}
              className="rounded-full px-5 py-2.5 text-[15px] font-semibold transition-colors"
              style={x.slug === n.slug ? { background: C.preto, color: "#fff" } : { background: "#fff", color: C.preto }}>
              {x.name} <span className="opacity-50">{x.videos.length}</span>
            </button>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {n.videos.slice(0, 12).map((v) => (
            <button key={v.id} type="button" onClick={() => open(v)} className="group relative aspect-[9/16] overflow-hidden rounded-[1.4rem] bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumb(v)} alt={v.brand} onError={(e) => proximaCapa(e.currentTarget, v)}
                onLoad={(e) => { if (e.currentTarget.naturalWidth <= 120) proximaCapa(e.currentTarget, v); }}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-left text-sm font-semibold text-white">{v.brand}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Sobre() {
  return (
    <section id="sobre" className="py-14">
      <div className="max-w-4xl mx-auto px-5 flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center text-center md:text-left">
        <div className="relative w-[200px] flex-shrink-0">
          <span className="absolute -inset-3 -rotate-3 rounded-[2rem]" style={{ background: C.rosa }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/capa/1-sorriso.webp" alt="Lara Dam" className="relative aspect-square w-full rounded-[1.6rem] object-cover object-[70%_20%]" />
        </div>
        <div>
          <span className={`${mao.className} text-2xl -rotate-2 inline-block`} style={{ color: C.roxo }}>oie, prazer!</span>
          <h2 className={`${titulo.className} text-4xl font-extrabold tracking-[-0.04em]`} style={{ color: C.preto }}>Eu sou a Lara Dam.</h2>
          <p className="mt-3 max-w-xl text-lg leading-relaxed" style={{ color: C.suave }}>
            27 anos, <b style={{ color: C.preto }}>UGC Creator e estrategista de conteúdo</b> no Litoral de SP. Mais de 500 vídeos pra mais de 300 marcas,
            com recorde de CTR no Meta e CPA até 38% menor.
          </p>
          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
            {["+100 campanhas aprovadas no Seu Influencer", "InfinitePay", "Méliuz", "DT3"].map((t, i) => (
              <span key={t} className="rounded-full px-3.5 py-1.5 text-sm font-semibold" style={i ? { background: "#fff", color: C.preto } : { background: C.limao, color: C.preto }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Fim() {
  return (
    <section className="pb-24 pt-6">
      <div className="max-w-6xl mx-auto px-5">
        <div className="rounded-[2.5rem] px-8 py-14 text-center" style={{ background: C.preto }}>
          <h2 className={`${titulo.className} text-4xl md:text-6xl font-extrabold tracking-[-0.04em] text-white`}>
            Curtiu? <span style={{ color: C.limao }}>Me aprova na campanha</span>
            <span className="block">que eu começo pelo gancho.</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="https://app.seuinfluencer.com/" className="rounded-2xl px-7 py-4 text-base font-bold" style={{ background: C.roxo, color: "#fff" }}>
              Voltar pro Seu Influencer
            </a>
            <a href="https://ugc.laradam.com/" className="rounded-2xl bg-white px-7 py-4 text-base font-bold" style={{ color: C.preto }}>
              Ver o portfólio completo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function NovoSI({ capa = "adesivos" }: { capa?: CapaSI }) {
  const Capa = CAPAS[capa] ?? CapaAdesivos;
  return (
    <main className="min-h-screen" style={{ background: C.fundo }}>
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur" style={{ background: `${C.fundo}e6` }}>
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <span className={`${titulo.className} text-2xl font-extrabold tracking-tight`} style={{ color: C.preto }}>
            lara<span style={{ color: C.roxo }}>dam</span>
          </span>
          <div className="hidden md:flex gap-8 text-[15px] font-semibold" style={{ color: C.suave }}>
            <a href="#nichos">Nichos</a><a href="#sobre">Sobre</a>
          </div>
          <a href="#nichos" className="rounded-2xl px-5 py-2.5 text-sm font-bold" style={{ background: C.limao, color: C.preto }}>Ver vídeos</a>
        </div>
      </nav>
      <Capa />
      <Nichos />
      <Sobre />
      <ComoFunciona />
      <Fim />
      <style>{`
        .si-logos { animation: si-logos 80s linear infinite; }
        @keyframes si-logos { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .si-logos { animation: none; } }
      `}</style>
    </main>
  );
}
