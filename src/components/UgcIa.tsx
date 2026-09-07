"use client";

/* ============================================================================
   UGC para marcas de IA — modelo aberto de proposta, em tres idiomas.
   A pagina e pra marca estrangeira, entao ela abre perguntando o idioma antes
   de qualquer coisa. Os textos vivem em src/data/ugcIaCopy.ts, fora do i18n do
   site: o dicionario global so tem pt e en, e nao vale quebrar o resto do site
   pra acrescentar espanhol numa pagina so.
   ========================================================================== */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, ChevronDown, Mail, MessageCircle, AtSign } from "lucide-react";
import { BRAND_LOGO_FILES } from "@/data/content";
import { COPY, IDIOMAS, type Idioma } from "@/data/ugcIaCopy";
import { useLang } from "@/lib/i18n";

const PALETTE: React.CSSProperties = {
  ["--mm-orange" as string]: "#FF5824",
  ["--mm-orange-deep" as string]: "#E0430F",
  ["--mm-pink" as string]: "#FFCFD2",
};

/* Preco por creator. Enquanto for null, o painel mostra o ESCOPO em vez de
   dinheiro: melhor nao mostrar numero nenhum do que mostrar um chutado. */
const PRECO_CREATOR: number | null = null;

const WA_NUMERO = "5512988729264";
const WA_EXIBE = "+55 12 98872-9264";   // internacional: quem le e de fora
const EMAIL = "laradam.ugc@gmail.com";
const IG = "eilaradam";

const BRANDS_TEXT = [
  "OLX", "ZAP Imóveis", "Magalu", "Méliuz", "Porto Seguro", "Chilli Beans",
  "Bonduelle", "Bauducco", "Granado", "Lancôme", "Carolina Herrera",
  "Calvin Klein", "Jägermeister", "Bioderma", "Neutrogena", "YSL", "Wella",
  "Knorr", "Brinox", "Coza", "Mont Blanc", "Jean Paul Gaultier", "Huawei",
];

const VIDEOS: string[] = ["", "", "", "", "", ""];

/** **negrito** vira <strong>, pra copy ficar legivel no dicionario */
function Rico({ txt }: { txt: string }) {
  return (
    <>
      {txt.split(/\*\*(.+?)\*\*/g).map((p, i) =>
        i % 2 ? <strong key={i} className="font-bold text-black">{p}</strong> : <span key={i}>{p}</span>
      )}
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="font-display font-black text-black tabular-nums text-xl md:text-2xl">{value}</span>
      <span className="uppercase tracking-wider text-black/60 text-[10px] md:text-xs">{label}</span>
    </div>
  );
}

/* ============================== PORTAO DE IDIOMA ============================== */
function Portao({ onEscolher }: { onEscolher: (i: Idioma) => void }) {
  return (
    <div className="fixed inset-0 z-[100] bg-[#FAF8F4] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg text-center"
      >
        <p className="font-display font-black text-black text-xl md:text-2xl tracking-tight uppercase">
          Lara <span className="text-[var(--mm-orange)]">Dam.</span>
        </p>
        <h1 className="mt-8 font-display font-black text-black text-2xl md:text-3xl leading-tight tracking-tighter">
          {COPY.pt.porta.titulo}
        </h1>
        <p className="mt-1 text-sm text-black/50">
          {COPY.en.porta.titulo} · {COPY.es.porta.titulo}
        </p>
        <div className="mt-10 grid gap-3">
          {IDIOMAS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => onEscolher(l.id)}
              className="w-full flex items-center gap-4 rounded-2xl border-2 border-black/10 bg-white px-5 py-4 text-left hover:border-[var(--mm-orange)] transition-colors group"
            >
              <span className="text-2xl">{l.bandeira}</span>
              <span className="flex-1 font-bold text-black">{l.nativo}</span>
              <ArrowRight className="w-4 h-4 text-black/25 group-hover:text-[var(--mm-orange)] transition-colors" />
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function TrocaIdioma({ lang, set }: { lang: Idioma; set: (i: Idioma) => void }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white p-1">
      {IDIOMAS.map((l) => (
        <button
          key={l.id}
          type="button"
          onClick={() => set(l.id)}
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide transition-colors ${
            lang === l.id ? "bg-[var(--mm-orange)] text-white" : "text-black/45 hover:text-black"
          }`}
        >
          {l.id}
        </button>
      ))}
    </div>
  );
}

/* ================================== SEÇÕES ================================== */
function Hero({ t, lang, set }: { t: typeof COPY.pt; lang: Idioma; set: (i: Idioma) => void }) {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F4] text-black pt-24 md:pt-28 pb-0">
      <div className="relative max-w-6xl mx-auto px-6 md:px-12 pt-6 md:pt-10 pb-10 md:pb-14">
        <div className="mb-6"><TrocaIdioma lang={lang} set={set} /></div>
        <h1 className="font-display font-black text-black text-3xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tighter uppercase">
          {t.hero.titulo}
        </h1>
        <p className="mt-2 md:mt-3 font-display font-bold text-[var(--mm-orange)] text-base md:text-lg lg:text-xl tracking-tight">
          {t.hero.sub}
        </p>
        <p className="mt-4 text-sm md:text-base max-w-xl leading-relaxed text-black/75">
          {t.hero.corpo} <span className="text-black font-semibold">{t.hero.negrito}</span>
        </p>
        <div className="mt-5">
          <a
            href="#calculadora"
            className="inline-flex items-center gap-2 bg-[var(--mm-orange)] text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wide hover:bg-[var(--mm-orange-deep)] transition-colors"
          >
            {t.hero.botao}
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <p className="mt-2 text-[11px] md:text-xs text-black/55">{t.hero.miudo}</p>
        </div>
        <div className="mt-6 flex flex-nowrap items-center gap-x-3 text-black/70 border-t border-black/10 pt-3 overflow-x-auto whitespace-nowrap">
          {t.hero.stats.map(([v, l], i) => (
            <span key={l} className="flex items-center gap-3">
              {i > 0 && <span className="text-black/20">|</span>}
              <Stat value={v} label={l} />
            </span>
          ))}
        </div>
      </div>
      <div className="relative bg-[var(--mm-orange)] py-3 md:py-4 overflow-hidden">
        <div className="marquee-slow">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 md:gap-5 text-xs md:text-sm uppercase tracking-[0.25em] font-bold text-white whitespace-nowrap">
              {t.hero.faixa.map((f) => (
                <span key={f} className="flex items-center gap-3 md:gap-5">
                  <span>{f}</span>
                  <span className="text-white/70">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio({ t }: { t: typeof COPY.pt }) {
  return (
    <section className="bg-[#FAF8F4] py-14 md:py-20 border-t border-black/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter uppercase text-black">
          {t.portfolio.t1} <span className="text-[var(--mm-orange)]">{t.portfolio.t2}</span>
        </h2>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
          {VIDEOS.map((src, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-white border-2 border-black/10">
              <div className="aspect-[9/16] bg-black/[0.04] flex items-center justify-center">
                {src ? (
                  <video src={src} controls playsInline preload="metadata" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center px-2">
                    <Play className="w-5 h-5 mx-auto text-black/20 mb-1.5" />
                    <p className="text-[10px] text-black/35 leading-tight">{t.portfolio.vazio}</p>
                  </div>
                )}
              </div>
              <div className="p-2.5">
                <p className="text-[10px] text-black/50 leading-tight">{t.portfolio.nichos[i]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Angulos({ t }: { t: typeof COPY.pt }) {
  return (
    <section className="bg-white py-14 md:py-20 border-t border-black/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter text-black uppercase max-w-3xl">
          {t.angulos.t1} <span className="text-[var(--mm-orange)]">{t.angulos.t2}</span>
        </h2>
        <p className="mt-4 text-base md:text-lg text-black/75 max-w-2xl leading-relaxed">{t.angulos.corpo}</p>
        <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-4 md:gap-5">
          {t.angulos.cards.map((c, i) => (
            <motion.div
              key={c.tag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl p-6 md:p-7 bg-white border-2 border-black/10"
            >
              <span className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-wider text-[var(--mm-orange)] bg-[var(--mm-pink)] rounded-full px-3 py-1">
                {c.tag}
              </span>
              <h3 className="font-display font-black text-lg md:text-xl tracking-tight uppercase mt-4 mb-2 text-black">{c.titulo}</h3>
              <p className="text-sm md:text-base text-black/70 leading-relaxed">{c.corpo}</p>
              <div className="mt-5 pt-4 border-t border-black/10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3">{t.angulos.rotulo}</p>
                {c.ganchos.map((g) => (
                  <p key={g} className="font-display font-bold text-base md:text-lg leading-snug text-black mb-2.5 pl-3 border-l-2 border-[var(--mm-orange)]">
                    {g}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Processo({ t }: { t: typeof COPY.pt }) {
  return (
    <section className="bg-white py-14 md:py-20 border-t border-black/10">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter uppercase text-black">
          {t.etapas.t1} <span className="text-[var(--mm-orange)]">{t.etapas.t2}</span>
        </h2>
        <div className="mt-10 md:mt-14 relative">
          <div className="absolute left-5 md:left-7 top-2 bottom-2 w-px bg-black/15" />
          <div className="space-y-6 md:space-y-8">
            {t.etapas.itens.map(([titulo, corpo], i) => (
              <motion.div
                key={titulo}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative pl-14 md:pl-20"
              >
                <div className="absolute left-0 top-0 w-10 h-10 md:w-14 md:h-14 rounded-full bg-[var(--mm-orange)] text-white flex items-center justify-center font-display font-black text-sm md:text-base">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display font-black text-lg md:text-xl tracking-tight uppercase mb-2 mt-1.5 md:mt-2.5 text-black">{titulo}</h3>
                <p className="text-sm md:text-base text-black/75 leading-relaxed">{corpo}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Calculadora({ t }: { t: typeof COPY.pt }) {
  const [modo, setModo] = useState<"creators" | "orcamento">("creators");
  const [creators, setCreators] = useState(5);
  const [orcamento, setOrcamento] = useState(10);
  const [angulos, setAngulos] = useState(2);
  const [ganchos, setGanchos] = useState(2);
  const [ratios, setRatios] = useState(3);

  const verba = orcamento * 5000;
  const n = modo === "orcamento" && PRECO_CREATOR ? Math.max(1, Math.floor(verba / PRECO_CREATOR)) : creators;
  const variacoes = n * angulos * ganchos;
  const arquivos = variacoes * ratios;
  const porAngulo = angulos ? Math.round(variacoes / angulos) : 0;
  const dinheiro = (v: number) => "R$ " + Math.round(v).toLocaleString("pt-BR");

  const Seg = ({ v, set, opts, label, dica }: { v: number; set: (n: number) => void; opts: number[]; label: string; dica: string }) => (
    <div className="mb-6 last:mb-0">
      <p className="text-xs md:text-sm font-bold text-black mb-2.5">{label}</p>
      <div className="flex gap-2">
        {opts.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => set(o)}
            className={`flex-1 rounded-xl py-2.5 font-display font-black text-base transition-colors border-2 ${
              v === o ? "bg-[var(--mm-orange)] border-[var(--mm-orange)] text-white" : "bg-white border-black/10 text-black/60 hover:border-black/25"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      <p className="mt-2 text-[11px] md:text-xs text-black/50 leading-relaxed">{dica}</p>
    </div>
  );

  return (
    <section id="calculadora" className="bg-[#FAF8F4] py-14 md:py-20 border-t border-black/10 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter text-black uppercase max-w-3xl">
          {t.calc.t1} <span className="text-[var(--mm-orange)]">{t.calc.t2}</span>
        </h2>
        <div className="mt-10 md:mt-14 rounded-2xl overflow-hidden border-2 border-black/10 bg-white">
          <div className="flex border-b-2 border-black/10">
            {(["creators", "orcamento"] as const).map((m, i) => (
              <button
                key={m}
                type="button"
                onClick={() => setModo(m)}
                className={`flex-1 py-4 text-xs md:text-sm font-bold uppercase tracking-wide transition-colors ${
                  modo === m ? "bg-white text-[var(--mm-orange)]" : "bg-black/[0.03] text-black/50 hover:text-black/70"
                }`}
              >
                {t.calc.abas[i]}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-[1fr_340px]">
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <div className="flex justify-between items-baseline mb-2.5">
                  <p className="text-xs md:text-sm font-bold text-black">
                    {modo === "creators" ? t.calc.creators : t.calc.orcamento}
                  </p>
                  <span className="font-display font-black text-2xl text-[var(--mm-orange)]">
                    {modo === "creators" ? creators : PRECO_CREATOR ? dinheiro(verba) : "—"}
                  </span>
                </div>
                {modo === "creators" ? (
                  <input type="range" min={1} max={15} value={creators} onChange={(e) => setCreators(Number(e.target.value))} className="w-full accent-[var(--mm-orange)]" />
                ) : (
                  <input type="range" min={1} max={30} value={orcamento} onChange={(e) => setOrcamento(Number(e.target.value))} className="w-full accent-[var(--mm-orange)]" />
                )}
                <p className="mt-2 text-[11px] md:text-xs text-black/50">
                  {modo === "creators" ? t.calc.dicaCreators : t.calc.dicaOrcamento}
                </p>
              </div>
              <Seg v={angulos} set={setAngulos} opts={[1, 2]} label={t.calc.angulos} dica={t.calc.dicaAngulos} />
              <Seg v={ganchos} set={setGanchos} opts={[1, 2, 3]} label={t.calc.ganchos} dica={t.calc.dicaGanchos} />
              <Seg v={ratios} set={setRatios} opts={[1, 2, 3]} label={t.calc.ratios} dica={t.calc.dicaRatios} />
            </div>
            <div className="bg-black text-white p-6 md:p-8 flex flex-col justify-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                {PRECO_CREATOR ? t.calc.investimento : t.calc.recebe}
              </p>
              <p className="font-display font-black text-3xl md:text-4xl leading-none mt-2">
                {PRECO_CREATOR ? dinheiro(n * PRECO_CREATOR) : `${arquivos} ${t.calc.arquivosLabel}`}
              </p>
              <p className="text-sm text-white/60 mt-1.5">
                {n} {n === 1 ? t.calc.creatorSing : t.calc.creatorPlur}
              </p>
              <div className="mt-6 pt-5 border-t border-white/20 space-y-2.5">
                {[variacoes, arquivos, porAngulo].map((v, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-white/60">{t.calc.linhas[i]}</span>
                    <span className="font-display font-black tabular-nums">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="px-6 md:px-8 py-4 border-t-2 border-black/10 text-xs md:text-sm text-black/60 leading-relaxed">
            {angulos > 1 && porAngulo < 6 && (
              <span className="text-[var(--mm-orange-deep)] font-semibold">{t.calc.aviso(porAngulo)}</span>
            )}
            {t.calc.rodape}
          </div>
        </div>
      </div>
    </section>
  );
}

function Marcas({ t }: { t: typeof COPY.pt }) {
  const LOGOS = BRAND_LOGO_FILES.slice(0, 12);
  return (
    <section className="bg-white py-14 md:py-20 border-t border-black/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-nowrap items-center justify-center gap-x-4 md:gap-x-6 text-black/70 overflow-x-auto whitespace-nowrap pb-2">
          {t.marcas.stats.map(([v, l], i) => (
            <span key={l} className="flex items-center gap-4 md:gap-6">
              {i > 0 && <span className="text-black/20">|</span>}
              <Stat value={v} label={l} />
            </span>
          ))}
        </div>
        <div className="mt-12 md:mt-16 grid grid-cols-3 md:grid-cols-6 gap-x-6 gap-y-10 items-center">
          {LOGOS.map((file) => (
            <img key={file} src={`/logo-1/${encodeURI(file)}`} alt="" loading="lazy"
              className="h-8 md:h-10 w-full object-contain opacity-70 hover:opacity-100 transition-opacity" />
          ))}
        </div>
      </div>
      <div className="mt-12 md:mt-16 overflow-hidden border-y border-black/10 py-4">
        <div className="marquee-slow">
          {BRANDS_TEXT.concat(BRANDS_TEXT).map((b, i) => (
            <div key={`${b}-${i}`} className="flex items-center gap-4 text-sm md:text-base font-semibold text-black whitespace-nowrap">
              {b}
              <span className="text-[var(--mm-orange)]">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SobreMim({ t }: { t: typeof COPY.pt }) {
  return (
    <section className="bg-[#FAF8F4] py-14 md:py-20 border-t border-black/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
        <div>
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[var(--mm-orange)] mb-3">{t.sobre.eyebrow}</p>
          <h2 className="font-display font-black text-3xl md:text-5xl leading-none tracking-tighter text-black">
            {t.sobre.nome} <span className="text-[var(--mm-orange)] italic">{t.sobre.sobrenome}</span>
          </h2>
          <div className="mt-6 space-y-4 text-sm md:text-base text-black/75 leading-relaxed">
            {t.sobre.p.map((p, i) => <p key={i}><Rico txt={p} /></p>)}
          </div>
        </div>
        <div className="relative">
          <img src="/lara-sobre.jpg" alt="Lara Dam" className="w-full rounded-[2rem] object-cover shadow-lg" />
        </div>
      </div>
    </section>
  );
}

function Perguntas({ t }: { t: typeof COPY.pt }) {
  const [aberta, setAberta] = useState(0);
  return (
    <section className="bg-white py-14 md:py-20 border-t border-black/10">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter text-black uppercase mb-10 md:mb-12">
          {t.faq.t1} <span className="text-[var(--mm-orange)]">{t.faq.t2}</span>
        </h2>
        <div className="space-y-3">
          {t.faq.itens.map(([q, a], i) => {
            const isOpen = i === aberta;
            return (
              <div key={q} className="rounded-2xl border-2 border-black/10 overflow-hidden bg-white">
                <button type="button" onClick={() => setAberta(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 md:px-6 py-4 md:py-5">
                  <span className="font-semibold text-sm md:text-base text-black">{q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 text-black/40 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && <p className="px-5 md:px-6 pb-5 text-sm md:text-base text-black/70 leading-relaxed">{a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contato({ t }: { t: typeof COPY.pt }) {
  const CANAIS = [
    { icon: MessageCircle, rot: t.contato.wa, val: WA_EXIBE, href: `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(t.contato.waMsg)}` },
    { icon: Mail, rot: t.contato.email, val: EMAIL, href: `mailto:${EMAIL}` },
    { icon: AtSign, rot: t.contato.ig, val: `@${IG}`, href: `https://instagram.com/${IG}` },
  ];
  return (
    <section className="bg-black text-white py-14 md:py-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter uppercase text-center">
          {t.contato.t1} <span className="text-[var(--mm-orange)]">{t.contato.t2}</span>
        </h2>
        <p className="mt-4 text-center text-sm md:text-base text-white/60">{t.contato.sub}</p>
        <div className="mt-10 grid md:grid-cols-3 gap-3 md:gap-4">
          {CANAIS.map((c) => (
            <a key={c.rot} href={c.href} target="_blank" rel="noopener"
              className="rounded-2xl border-2 border-white/15 hover:border-[var(--mm-orange)] transition-colors p-5 md:p-6 flex flex-col gap-3">
              <c.icon className="w-5 h-5 text-[var(--mm-orange)]" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">{c.rot}</p>
                <p className="font-bold text-sm md:text-base mt-0.5 break-all">{c.val}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function UgcIa() {
  const [lang, setLangLocal] = useState<Idioma | null>(null);
  const [pronto, setPronto] = useState(false);
  const site = useLang();

  useEffect(() => {
    try {
      const salvo = localStorage.getItem("ugcIaLang");
      if (salvo === "pt" || salvo === "en" || salvo === "es") setLangLocal(salvo);
    } catch { /* sem storage, mostra o portao */ }
    setPronto(true);
  }, []);

  const escolher = (i: Idioma) => {
    setLangLocal(i);
    try { localStorage.setItem("ugcIaLang", i); } catch { /* segue sem lembrar */ }
    /* O menu do site so fala pt e en. Em espanhol deixo o menu em ingles, que e
       o mais proximo, em vez de quebrar os rotulos dele. */
    site.setLang(i === "pt" ? "pt" : "en");
    if (typeof document !== "undefined") {
      document.documentElement.lang = i === "pt" ? "pt-BR" : i === "es" ? "es" : "en";
    }
  };

  if (!pronto) return <div className="min-h-screen bg-[#FAF8F4]" />;
  if (!lang) return <Portao onEscolher={escolher} />;

  const t = COPY[lang] as typeof COPY.pt;
  return (
    <div style={PALETTE}>
      <Hero t={t} lang={lang} set={escolher} />
      <Portfolio t={t} />
      <Angulos t={t} />
      <Processo t={t} />
      <Calculadora t={t} />
      <Marcas t={t} />
      <SobreMim t={t} />
      <Perguntas t={t} />
      <Contato t={t} />
    </div>
  );
}
