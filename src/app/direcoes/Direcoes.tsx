"use client";

import { VIDEOS, type Video } from "@/data/content";
import VideoCard from "@/components/VideoCard";

const F = "/direcoes/";
const NUMEROS = [
  { v: "140M+", l: "views em campanhas" },
  { v: "500+", l: "vídeos gravados" },
  { v: "300+", l: "marcas atendidas" },
  { v: "3 anos", l: "de experiência" },
];
const pega = (ids: string[]) => ids.map((id) => VIDEOS.find((v) => v.youtubeId === id)).filter(Boolean) as Video[];
// uma amostra variada (finanças, gastronomia, beleza, casa, tech)
const AMOSTRA = pega(["wesTfq67X9o", "UeU757r2FUw", "dgQYEfEQTvQ", "0VDR45qTci8", "5wf8Fv2CTa4", "K31BzOy3qt0"]);
// completa com outros vídeos se algum da lista sair do portfólio
const amostra = [...AMOSTRA, ...VIDEOS.filter((v) => !AMOSTRA.includes(v))].slice(0, 6);

// os 4 resultados reais que já estão no portfólio (seção "Os melhores resultados")
const REAIS = [
  { youtubeId: "5wf8Fv2CTa4", brand: "InfinitePay", capa: "/best-infinitepay.jpg", v: "100M", l: "views no TikTok" },
  { youtubeId: "wesTfq67X9o", brand: "Méliuz", capa: "/best-meliuz.jpg", v: "30M", l: "views no TikTok" },
  { youtubeId: "2s6BI893C74", brand: "Bready", capa: "/best-bready.jpg", v: "5,94x", l: "de ROAS" },
  { youtubeId: "dgQYEfEQTvQ", brand: "Méliuz Cashback", capa: "/best-meliuz-cashback.jpg", v: "1.023", l: "vídeos na campanha 360°" },
];

const anton = { fontFamily: "var(--font-anton), Impact, sans-serif" };
const mao = { fontFamily: "var(--font-caveat), cursive" };

export default function Direcoes() {
  return (
    <div className="bg-[#1a1a1a]">
      <nav className="fixed top-0 inset-x-0 z-50 flex justify-center gap-2 py-3 bg-black/80 backdrop-blur text-white text-sm">
        {["Revista", "Scrapbook", "Ousada", "Feed"].map((n, i) => (
          <a key={n} href={`#d${i + 1}`} className="px-4 py-1.5 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors">
            {i + 1}. {n}
          </a>
        ))}
      </nav>
      <Revista />
      <Scrapbook />
      <Ousada />
      <Feed />
    </div>
  );
}

function Rotulo({ n, nome, desc, escuro }: { n: number; nome: string; desc: string; escuro?: boolean }) {
  return (
    <div className={`absolute top-16 right-6 z-30 max-w-xs rounded-xl px-4 py-3 text-xs shadow-lg ${escuro ? "bg-white text-black" : "bg-black text-white"}`}>
      <b>Direção {n}: {nome}</b>
      <div className="opacity-70 mt-0.5">{desc}</div>
    </div>
  );
}

/* ---------------- 1. REVISTA ---------------- */
function Revista() {
  const navy = "#1E2A44";
  return (
    <section id="d1" className="relative bg-[#ECE7E1] text-[#1E2A44] overflow-hidden">
      <Rotulo n={1} nome="Revista / editorial" desc="Sua foto como capa de revista, nome gigante no topo, chamadas de capa." />
      <div className="relative h-[880px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={F + "largo-marinho.webp"} alt="" className="absolute inset-0 w-full h-full object-cover object-[70%_30%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#ECE7E1] via-[#ECE7E1]/70 to-transparent" />
        <div className="relative px-14 pt-24">
          <div className="flex items-end justify-between border-b border-[#1E2A44]/30 pb-3">
            <div className="font-display font-black leading-[0.8] tracking-[-0.04em] text-[11rem]">LARA DAM</div>
            <div className="text-right text-[11px] uppercase tracking-[0.3em] pb-6 leading-relaxed">
              Edição nº 03<br />UGC Creator<br />Outubro 2026
            </div>
          </div>
          <div className="mt-14 max-w-xl">
            <div className="text-[11px] uppercase tracking-[0.35em] mb-4">Matéria de capa</div>
            <h1 className="font-display font-black text-7xl leading-[0.92] tracking-tight">
              Criando conteúdo que <span className="font-serif-accent italic font-medium">converte</span>
            </h1>
            <p className="mt-6 text-lg max-w-md opacity-80">De hook a CTA, cada segundo pensado pra performar.</p>
            <ul className="mt-10 space-y-4 border-l-2 pl-5" style={{ borderColor: navy }}>
              <li><b className="font-display text-3xl">140M+</b> <span className="uppercase text-xs tracking-[0.2em] ml-2">views em campanhas</span></li>
              <li><b className="font-display text-3xl">500+</b> <span className="uppercase text-xs tracking-[0.2em] ml-2">vídeos para 300+ marcas</span></li>
              <li><b className="font-display text-3xl">3 anos</b> <span className="uppercase text-xs tracking-[0.2em] ml-2">de UGC que vende</span></li>
            </ul>
            <a className="mt-10 inline-block px-8 py-4 bg-[#1E2A44] text-[#ECE7E1] text-sm uppercase tracking-[0.2em]">Trabalhe comigo</a>
          </div>
        </div>
      </div>
      <div className="px-14 py-16 bg-[#F6F3EF]">
        <div className="flex items-baseline justify-between border-b border-[#1E2A44]/20 pb-3 mb-8">
          <h2 className="font-display font-black text-4xl">Nesta edição</h2>
          <span className="text-[11px] uppercase tracking-[0.3em]">Vídeos por nicho · p. 12</span>
        </div>
        <div className="grid grid-cols-6 gap-5">
          {amostra.map((v, i) => (
            <div key={v.id}>
              <VideoCard video={v} index={i} />
              <div className="mt-2 text-[11px] uppercase tracking-[0.2em] opacity-60">p. {String(12 + i * 4).padStart(2, "0")}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 2. SCRAPBOOK ---------------- */
function Fita({ className = "" }: { className?: string }) {
  return <span className={`absolute h-7 w-24 bg-[#E9DFC8]/80 shadow-sm ${className}`} style={{ clipPath: "polygon(3% 0,97% 4%,100% 96%,0 100%)" }} />;
}
function Polaroid({ src, legenda, rot, className = "" }: { src: string; legenda: string; rot: number; className?: string }) {
  return (
    <figure className={`absolute bg-white p-3 pb-12 shadow-xl ${className}`} style={{ transform: `rotate(${rot}deg)` }}>
      <Fita className="-top-4 left-1/2 -translate-x-1/2 rotate-[-4deg]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={F + src} alt="" className="w-full aspect-[4/5] object-cover" />
      <figcaption className="absolute bottom-2 inset-x-0 text-center text-2xl text-[#1E2A44]" style={mao}>{legenda}</figcaption>
    </figure>
  );
}
function Scrapbook() {
  return (
    <section
      id="d2"
      className="relative overflow-hidden text-[#1E2A44]"
      style={{ background: "#F4EFE6", backgroundImage: "radial-gradient(rgba(30,42,68,0.07) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
    >
      <Rotulo n={2} nome="Bastidor / scrapbook" desc="Polaroids, fita adesiva, letra de mão e post-it. Próximo e divertido." />
      <div className="relative h-[900px] px-16 pt-24">
        <div className="relative z-10 max-w-[560px]">
          <div className="text-4xl text-[#1C5D63] -rotate-2" style={mao}>oi, eu sou a Lara! ✿</div>
          <h1 className="mt-3 font-display font-black text-7xl leading-[0.95] tracking-tight">
            Criando conteúdo que{" "}
            <span className="relative inline-block">
              converte
              <svg viewBox="0 0 300 30" className="absolute -bottom-3 left-0 w-full" fill="none"><path d="M4 20 C 80 6, 200 4, 296 14" stroke="#1C5D63" strokeWidth="6" strokeLinecap="round" /></svg>
            </span>
          </h1>
          <p className="mt-8 text-lg max-w-md opacity-80">UGC Creator há 3 anos. Roteiro, gravação e edição pensados pra vender, do gancho ao CTA.</p>
          <div className="mt-10 flex items-center gap-6">
            <a className="px-8 py-4 rounded-full bg-[#1E2A44] text-white font-semibold">Bora criar juntos?</a>
            <span className="text-3xl rotate-[-4deg]" style={mao}>← me chama!</span>
          </div>
        </div>
        <Polaroid src="sorriso.webp" legenda="essa sou eu :)" rot={-6} className="w-[300px] left-[640px] top-[90px] z-10" />
        <Polaroid src="despenteado.webp" legenda="dia de gravação" rot={5} className="w-[260px] left-[930px] top-[60px]" />
        <Polaroid src="caixa.webp" legenda="+300 marcas" rot={8} className="w-[250px] left-[880px] top-[430px] z-20" />
        <Polaroid src="sofa-deitada.webp" legenda="editando..." rot={-4} className="w-[240px] left-[600px] top-[500px]" />
        <div className="absolute left-[80px] top-[640px] w-[230px] h-[190px] bg-[#FFE27A] shadow-lg rotate-[-3deg] p-5 z-20" style={mao}>
          <div className="text-5xl font-bold leading-none">140M+</div>
          <div className="text-2xl mt-1">views em campanhas</div>
          <div className="text-xl mt-3 opacity-70">+500 vídeos gravados ♡</div>
        </div>
        <div className="absolute left-[350px] top-[700px] text-3xl rotate-[3deg]" style={mao}>InfinitePay, Méliuz, Bready…</div>
      </div>
      <div className="px-16 pb-20">
        <div className="text-4xl mb-6 -rotate-1" style={mao}>alguns trabalhos que eu amo ↓</div>
        <div className="grid grid-cols-6 gap-6">
          {amostra.map((v, i) => (
            <div key={v.id} className="bg-white p-2 pb-8 shadow-md relative" style={{ transform: `rotate(${[-2, 1.5, -1, 2, -1.5, 1][i % 6]}deg)` }}>
              <Fita className="-top-3 left-1/2 -translate-x-1/2 w-16 h-5" />
              <VideoCard video={v} index={i} />
              <div className="absolute bottom-1 inset-x-0 text-center text-xl" style={mao}>{v.brand}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 3. OUSADA ---------------- */
function Ousada() {
  const cores = ["#7FC4C0", "#F5B301", "#F4F4EF", "#7FC4C0"];
  return (
    <section id="d3" className="relative overflow-hidden bg-[#1E2A44] text-[#F4F4EF]">
      <Rotulo n={3} nome="Ousada e colorida" desc="Tipografia gigante, blocos de cor, números como protagonistas." escuro />
      <div className="relative h-[780px] px-14 pt-24">
        <div className="absolute right-14 top-24 w-[430px] h-[600px] bg-[#7FC4C0] rotate-[4deg]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={F + "risada.webp"} alt="" className="absolute right-20 top-20 w-[430px] h-[600px] object-cover -rotate-[2deg] shadow-2xl" />
        <div className="relative z-10 uppercase leading-[0.85]" style={anton}>
          <div className="text-[9.5rem]">Conteúdo</div>
          <div className="text-[9.5rem] text-[#7FC4C0]">que converte</div>
        </div>
        <p className="relative z-10 mt-8 text-xl max-w-lg text-[#F4F4EF]/80">Sou a Lara, UGC Creator. Vídeo com gancho nos primeiros segundos, roteiro pronto e foco em venda.</p>
        <div className="relative z-10 mt-12 flex gap-4">
          {NUMEROS.map((n, i) => (
            <div key={n.v} className="px-6 py-5 text-[#1E2A44]" style={{ background: cores[i], transform: `rotate(${[-2, 1, -1, 2][i]}deg)` }}>
              <div className="text-5xl leading-none" style={anton}>{n.v}</div>
              <div className="text-xs uppercase font-bold tracking-wider mt-1">{n.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#F5B301] text-[#1E2A44] py-4 overflow-hidden whitespace-nowrap text-4xl uppercase" style={anton}>
        UGC de conversão ✦ criativos pra tráfego ✦ roteiro que vende ✦ UGC de conversão ✦ criativos pra tráfego ✦ roteiro que vende ✦
      </div>
      <div className="px-14 py-16 bg-[#F4F4EF] text-[#1E2A44]">
        <div className="text-7xl uppercase mb-8" style={anton}>Resultados <span className="text-[#1C5D63]">reais</span></div>
        <div className="grid grid-cols-4 gap-6">
          {REAIS.map((r, i) => (
            <div key={r.youtubeId}>
              <VideoCard video={{ id: "o-" + r.youtubeId, title: r.brand, category: "tech", brand: r.brand, youtubeId: r.youtubeId, thumbnail: r.capa }} index={i} />
              <div className="mt-3 text-5xl" style={anton}>{r.v}</div>
              <div className="text-xs uppercase font-bold tracking-wider opacity-60">{r.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 4. FEED ---------------- */
function Feed() {
  const nichos = [
    { n: "Beleza", id: "beleza" }, { n: "Casa", id: "casa" }, { n: "Comida", id: "gastronomia" },
    { n: "Tech", id: "tech" }, { n: "Finanças", id: "financas" }, { n: "Moda", id: "moda" }, { n: "Saúde", id: "saude" },
  ];
  const grade = [...amostra, ...VIDEOS.filter((v) => v.category === "beleza").slice(0, 3)].slice(0, 9);
  return (
    <section id="d4" className="relative bg-white text-[#1E2A44] min-h-[900px]">
      <Rotulo n={4} nome="Feed / redes sociais" desc="O site vira um perfil: bio, destaques por nicho e grade de vídeos." />
      <div className="max-w-[980px] mx-auto px-6 pt-24 pb-20">
        <div className="flex items-center gap-16">
          <div className="p-1.5 rounded-full" style={{ background: "conic-gradient(#1C5D63,#7FC4C0,#F5B301,#1C5D63)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={F + "sorriso.webp"} alt="" className="w-44 h-44 rounded-full object-cover object-top border-4 border-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold">eilaradam</h1>
              <span className="w-5 h-5 rounded-full bg-[#1C5D63] text-white text-[11px] flex items-center justify-center">✓</span>
              <a className="ml-4 px-5 py-2 rounded-lg bg-[#1E2A44] text-white text-sm font-semibold">Trabalhe comigo</a>
              <a className="px-5 py-2 rounded-lg bg-[#EFEFEF] text-sm font-semibold">WhatsApp</a>
            </div>
            <div className="mt-5 flex gap-10 text-base">
              <span><b>500+</b> vídeos</span><span><b>140M</b> views</span><span><b>300+</b> marcas</span>
            </div>
            <div className="mt-5 leading-relaxed">
              <b>Lara Dam</b> · UGC Creator & Content Strategist<br />
              🎬 Criando conteúdo que converte, do gancho ao CTA<br />
              📍 Litoral de SP · 3 anos de UGC<br />
              <span className="text-[#1C5D63] font-semibold">InfinitePay · Méliuz · Bready · Huawei</span>
            </div>
          </div>
        </div>
        <div className="mt-12 flex gap-8">
          {nichos.map((c) => {
            const v = VIDEOS.find((x) => x.category === c.id);
            return (
              <div key={c.id} className="text-center">
                <div className="w-20 h-20 rounded-full p-[3px] bg-[#E2E2D9]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {v?.youtubeId && <img src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`} alt="" className="w-full h-full rounded-full object-cover border-2 border-white" />}
                </div>
                <div className="mt-2 text-xs font-semibold">{c.n}</div>
              </div>
            );
          })}
        </div>
        <div className="mt-10 border-t border-[#E2E2D9] flex justify-center gap-14 text-xs uppercase tracking-[0.15em] font-semibold">
          <span className="border-t-2 border-[#1E2A44] pt-4 -mt-px">▦ Vídeos</span><span className="pt-4 opacity-50">★ Resultados</span><span className="pt-4 opacity-50">❝ Depoimentos</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          {grade.map((v, i) => (
            <div key={v.id + i} className="[&_.rounded-2xl]:rounded-none">
              <VideoCard video={v} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
