"use client";

import { Play } from "lucide-react";
import { SERVICES } from "@/data/content";
import { DESTAQUES, NICHOS, SITE, STATS, TESTIMONIALS, Thumb, whats } from "@/components/novo/dados";

// Portfólio copiando de perto o modelo "Leuna Studio" que a Lara escolheu (08/11/2026):
// creme + vinho, serifa pesada, cabeça recortada com borda de adesivo, moldura rosa e dourada,
// listras azuis em "My content style" com pastas vinho e gráficos em "Creator highlights".
const CREME = "#FDF5E6";
const VINHO = "#6B1D1D";
const AZUL = "#B8D1EA";
const AZUL_FUNDO = "#C9DCEF";
const ROSA = "#F3B7C3";
const OURO = "#D4A548";

const serif = "font-[family-name:var(--lv-serif)]";
const listras = { backgroundImage: `repeating-linear-gradient(90deg, ${AZUL} 0 46px, ${CREME} 46px 92px)` };
// contorno branco de adesivo em volta do recorte
const adesivo = {
  filter:
    "drop-shadow(5px 0 0 #fff) drop-shadow(-5px 0 0 #fff) drop-shadow(0 5px 0 #fff) drop-shadow(0 -5px 0 #fff) drop-shadow(0 10px 14px rgba(60,20,20,0.25))",
};

function Titulo({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`${serif} font-black uppercase text-center text-3xl md:text-[2.6rem] leading-none ${className}`} style={{ color: VINHO }}>{children}</h2>;
}

function Pasta({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a href="#trabalhos" className={`relative block w-36 md:w-44 hover:-translate-y-1 transition-transform ${className}`}>
      <span className="absolute -top-2.5 left-0 w-1/2 h-4 rounded-t-md" style={{ background: VINHO }} />
      <span className="absolute -top-4 left-2 text-xl">🎀</span>
      <span className={`relative block rounded-md rounded-tl-none px-4 pt-6 pb-4 shadow-lg ${serif} font-bold text-base md:text-lg leading-tight`} style={{ background: VINHO, color: CREME }}>
        {children}
      </span>
    </a>
  );
}

function Card({ titulo, children, className = "" }: { titulo: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-2xl bg-white/85 p-5 pt-8 shadow-sm ${className}`}>
      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-5 py-1.5 text-[11px] font-bold uppercase tracking-wider shadow" style={{ background: CREME, color: VINHO }}>
        {titulo}
        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45" style={{ background: VINHO }} />
      </span>
      {children}
    </div>
  );
}

// Pizza em SVG com a quantidade real de vídeos por nicho
function Pizza() {
  const tons = [VINHO, "#8E3A3A", "#A85656", "#C27676", "#D99A9A", "#E9BDBD", "#5A1414", "#7D2A2A", "#B66666"];
  const total = NICHOS.reduce((s, n) => s + n.videos.length, 0);
  let acc = 0;
  const fatias = NICHOS.map((n, i) => {
    const ini = (acc / total) * Math.PI * 2;
    acc += n.videos.length;
    const fim = (acc / total) * Math.PI * 2;
    const p = (a: number) => `${50 + 46 * Math.sin(a)} ${50 - 46 * Math.cos(a)}`;
    return { d: `M50 50 L${p(ini)} A46 46 0 ${fim - ini > Math.PI ? 1 : 0} 1 ${p(fim)} Z`, cor: tons[i % tons.length], n };
  });
  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 100 100" className="w-32 h-32 shrink-0">
        {fatias.map((f) => <path key={f.n.slug} d={f.d} fill={f.cor} stroke="#fff" strokeWidth="0.8" />)}
      </svg>
      <ul className="text-xs space-y-1">
        {fatias.map((f) => (
          <li key={f.n.slug} className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: f.cor }} />{f.n.name} · {f.n.videos.length}</li>
        ))}
      </ul>
    </div>
  );
}

export default function PortfolioLeuna() {
  const maxViews = 100;
  return (
    <div className="min-h-screen font-sans" style={{ background: CREME, color: VINHO }}>
      {/* menu */}
      <header className="max-w-6xl mx-auto px-5 md:px-10 py-6 flex justify-between md:justify-end items-center">
        <span className={`${serif} font-black text-lg md:hidden`}>Lara Dam</span>
        <nav className="flex gap-5 md:gap-12 text-xs md:text-sm font-semibold">
          <a href="#sobre">Sobre mim</a>
          <a href="#trabalhos">Trabalhos</a>
          <a href="#depoimentos" className="hidden sm:inline">Depoimentos</a>
          <a href="#servicos" className="hidden sm:inline">Serviços</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      {/* capa */}
      <section className="max-w-6xl mx-auto px-5 md:px-10 grid grid-cols-[1.3fr_1fr] gap-4 md:gap-10 items-center pt-4 md:pt-10 pb-16 md:pb-24">
        <div>
          <h1 className={`${serif} font-black text-[7.4vw] md:text-[3.4rem] leading-[1.08]`}>
            Histórias reais.<br />Vídeos criativos.<br />Conteúdo que vende.
          </h1>
          <p className="mt-4 md:mt-6 text-xs md:text-lg max-w-lg leading-relaxed">
            Oi, eu sou a Lara Dam: crio vídeos que param o dedo no feed, apresentam o seu produto do jeito mais natural e fazem a marca se conectar com quem compra.
          </p>
          <a href="#trabalhos" className="inline-block mt-5 md:mt-8 rounded-full px-5 md:px-7 py-2 md:py-3 text-xs md:text-sm font-semibold shadow-md" style={{ background: VINHO, color: CREME }}>
            Ver meus trabalhos
          </a>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/nova/rosto.webp" alt="Lara Dam" fetchPriority="high" className="w-full max-w-[420px] justify-self-end" style={adesivo} />
      </section>

      {/* sobre */}
      <section id="sobre" className="max-w-6xl mx-auto px-5 md:px-10 grid grid-cols-[0.9fr_1.1fr] gap-6 md:gap-14 items-center">
        <div className="relative rounded-xl p-3 md:p-5 shadow-xl" style={{ background: `linear-gradient(135deg, ${ROSA}, #E79CAE 50%, ${ROSA})`, border: `4px solid ${OURO}` }}>
          {["-top-2 -left-2", "-top-2 -right-2", "-bottom-2 -left-2", "-bottom-2 -right-2"].map((pos) => (
            <span key={pos} className={`absolute ${pos} w-5 h-5 md:w-7 md:h-7 rounded-full`} style={{ background: `radial-gradient(circle at 35% 35%, #F7DB8F, ${OURO} 60%, #9C7425)` }} />
          ))}
          <div className="p-1.5" style={{ border: `3px solid ${OURO}` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ensaio/publi-janela.webp" alt="Lara Dam sorrindo na janela" className="w-full aspect-[4/5] object-cover" />
          </div>
        </div>
        <div>
          <p className="text-[10px] md:text-sm uppercase tracking-[0.15em]">Um pouco sobre mim</p>
          <h2 className={`${serif} font-black text-[5.6vw] md:text-[2.6rem] leading-tight mt-2 md:mt-3`}>Estrategista por natureza,<br />curiosa de coração.</h2>
          <p className="mt-3 md:mt-5 text-xs md:text-lg leading-relaxed">
            Eu crio UGC com <b>personalidade</b>: cada vídeo nasce do porquê real do produto e fica natural no feed, sem perder a <b>visão da sua marca</b>. Em 3 anos foram mais de 1000 vídeos e 300 marcas.
          </p>
          <p className="mt-3 md:mt-4 text-xs md:text-lg font-bold">Bora dar vida à sua ideia.</p>
        </div>
      </section>

      {/* experiência, habilidades, plataformas */}
      <section className="max-w-6xl mx-auto px-5 md:px-10 grid grid-cols-3 gap-4 md:gap-10 pt-12 md:pt-16 pb-14 md:pb-20 text-[10px] md:text-sm">
        <div>
          <h3 className={`${serif} font-bold uppercase text-xs md:text-lg`}>Experiência</h3>
          <div className="mt-3 border-l-2 pl-3 md:pl-4 space-y-5" style={{ borderColor: VINHO }}>
            <div><p className="italic opacity-80">2023 – hoje</p><p className="font-bold uppercase">UGC Creator</p><p>+300 marcas, +1000 vídeos</p></div>
            <div><p className="italic opacity-80">2023 – hoje</p><p className="font-bold uppercase">Estrategista de conteúdo</p><p>Roteiro e criativos pra tráfego</p></div>
          </div>
        </div>
        <div>
          <h3 className={`${serif} font-bold uppercase text-xs md:text-lg`}>Habilidades</h3>
          <div className="mt-3 border-l-2 pl-3 md:pl-4 space-y-5" style={{ borderColor: VINHO }}>
            <div><p className="font-bold uppercase">Estratégia</p><p>Roteiro, gancho, pesquisa de marca</p></div>
            <div><p className="font-bold uppercase">Produção</p><p>Gravação, edição e sound design</p></div>
          </div>
        </div>
        <div>
          <h3 className={`${serif} font-bold uppercase text-xs md:text-lg`}>Em números</h3>
          <div className="mt-3 space-y-1">
            {STATS.map((s) => <p key={s.label}><b>{s.value}</b> {s.label.toLowerCase()}</p>)}
          </div>
          <h3 className={`${serif} font-bold uppercase text-xs md:text-lg mt-4`}>Onde roda</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["Reels", "TikTok", "Shorts", "Meta Ads"].map((p) => <span key={p} className="rounded px-2 py-1 font-semibold" style={{ background: AZUL }}>{p}</span>)}
          </div>
        </div>
      </section>

      {/* meu estilo de conteúdo: listras + pastas */}
      <section style={listras} className="pt-10 md:pt-14">
        <Titulo>Meu estilo de conteúdo</Titulo>
        <div className="relative max-w-4xl mx-auto h-[380px] md:h-[520px] mt-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/nova/corpo.webp" alt="Lara Dam com caixas" className="absolute left-1/2 -translate-x-1/2 bottom-0 h-full w-auto" style={adesivo} />
          <Pasta className="absolute left-0 md:left-10 top-[12%]">{NICHOS[0]?.name}</Pasta>
          <Pasta className="absolute left-0 md:left-16 top-[58%]">{NICHOS[1]?.name}</Pasta>
          <Pasta className="absolute right-0 md:right-10 top-[12%]">{NICHOS[3]?.name}</Pasta>
          <Pasta className="absolute right-0 md:right-16 top-[58%]">{NICHOS[4]?.name}</Pasta>
        </div>
      </section>
      <div className="h-6 md:h-8" style={{ background: CREME }} />
      <section style={listras} className="pt-10 pb-14">
        <Titulo>Destaques<br />da creator</Titulo>
      </section>

      {/* destaques com gráficos (dados reais do portfólio) */}
      <section style={{ background: AZUL_FUNDO }} className="px-5 md:px-10 pt-14 pb-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <Card titulo="Vídeos por nicho"><Pizza /></Card>
          <Card titulo="Views dos destaques">
            <div className="space-y-3 mt-1">
              {DESTAQUES.map((v) => {
                const n = parseFloat(v.views ?? "0");
                return (
                  <div key={v.id} className="flex items-center gap-3 text-xs">
                    <span className="w-20 shrink-0 font-semibold">{v.brand}</span>
                    <span className="h-6 rounded" style={{ width: `${Math.max(8, (n / maxViews) * 100)}%`, background: VINHO }} />
                    <span className="font-bold">{v.views}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mt-10">
          <Card titulo="Resultados das marcas">
            <ul className="space-y-2 text-xs">
              {TESTIMONIALS.filter((t) => t.metric).slice(0, 5).map((t) => (
                <li key={t.brand} className="flex justify-between gap-2 rounded-full px-3 py-1.5" style={{ background: `${VINHO}12` }}>
                  <span className="font-semibold">{t.brand}</span><b>{t.metric!.value}</b>
                </li>
              ))}
            </ul>
          </Card>
          <Card titulo="Os 3 mais vistos">
            <div className="grid grid-cols-3 gap-2">
              {DESTAQUES.map((v) => (
                <Thumb key={v.id} v={v} className="aspect-[9/16] rounded-lg">
                  <span className="absolute inset-0 flex items-center justify-center"><Play className="w-6 h-6 text-white fill-white drop-shadow" /></span>
                </Thumb>
              ))}
            </div>
          </Card>
          <Card titulo="Em números">
            <div className="grid grid-cols-2 gap-3 text-center">
              {STATS.map((s) => (
                <div key={s.label}><div className={`${serif} font-black text-2xl`}>{s.value}</div><div className="text-[11px]">{s.label}</div></div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* trabalhos: fileiras por nicho */}
      <section id="trabalhos" className="py-16 md:py-20">
        <Titulo>Meus trabalhos</Titulo>
        {NICHOS.map((n) => (
          <div key={n.slug} className="mt-10">
            <div className="max-w-6xl mx-auto px-5 md:px-10">
              <span className={`inline-block rounded-md px-4 py-1.5 ${serif} font-bold`} style={{ background: VINHO, color: CREME }}>{n.name}</span>
            </div>
            <div className="mt-4 flex gap-3 overflow-x-auto px-5 md:px-[max(2.5rem,calc((100vw-72rem)/2+2.5rem))] pb-3 snap-x [scrollbar-width:none]">
              {n.videos.map((v) => (
                <figure key={v.id} className="snap-start shrink-0 w-36 md:w-44">
                  <Thumb v={v} className="aspect-[9/16] w-full rounded-xl shadow-md">
                    <span className="absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: CREME }}><Play className="w-3.5 h-3.5 ml-0.5" style={{ color: VINHO, fill: VINHO }} /></span>
                  </Thumb>
                  <figcaption className="text-xs font-semibold mt-1.5">{v.brand}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* depoimentos */}
      <section id="depoimentos" style={{ background: AZUL_FUNDO }} className="px-5 md:px-10 py-16">
        <Titulo>O que as marcas dizem</Titulo>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mt-12">
          {TESTIMONIALS.slice(0, 3).map((t) => (
            <Card key={t.brand} titulo={t.brand}>
              <p className="text-sm leading-relaxed">“{t.quote}”</p>
              {t.metric && <p className="mt-3 text-xs font-bold">{t.metric.value} {t.metric.label}</p>}
            </Card>
          ))}
        </div>
      </section>

      {/* serviços */}
      <section id="servicos" className="px-5 md:px-10 py-16">
        <Titulo>Serviços</Titulo>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">
          {SERVICES.slice(0, 5).map((s) => (
            <div key={s.title} className="relative pt-3">
              <span className="absolute top-0.5 left-0 w-1/2 h-4 rounded-t-md" style={{ background: VINHO }} />
              <div className="relative rounded-md rounded-tl-none p-5 min-h-[150px] shadow-lg" style={{ background: VINHO, color: CREME }}>
                <h3 className={`${serif} font-bold text-lg leading-tight`}>{s.title}</h3>
                <p className="text-sm mt-2 opacity-90">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* contato */}
      <section id="contato" style={listras} className="px-5 py-16">
        <div className="max-w-2xl mx-auto rounded-3xl px-6 py-12 text-center shadow-xl" style={{ background: CREME }}>
          <h2 className={`${serif} font-black text-3xl md:text-5xl leading-tight`}>Bora criar junto?</h2>
          <p className="mt-4 text-sm md:text-base">Me conta do seu produto que eu te mando uma ideia de roteiro.</p>
          <a href={whats()} className="inline-block mt-7 rounded-full px-8 py-3.5 font-semibold shadow-md" style={{ background: VINHO, color: CREME }}>Chamar no WhatsApp</a>
          <p className="mt-5 text-sm">{SITE.email} · {SITE.instagram}</p>
        </div>
      </section>
    </div>
  );
}
