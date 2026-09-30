"use client";

import { useState } from "react";
import { Play, Plus } from "lucide-react";
import { BRAND_LOGO_FILES, CATEGORIES, VIDEOS, type Video } from "@/data/content";
import { FEED, MELHORES, NICHO_EMOJI, PUBLI } from "@/data/perfil";
import { useVideoModal } from "@/components/VideoModalProvider";
import { fmtBR, usePerfil } from "./PerfilApp";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";

export default function Grade() {
  const { aba } = usePerfil();
  if (aba === "reels") return <Reels />;
  if (aba === "publi") return <Publi />;
  if (aba === "marcas") return <Marcas />;
  return <Feed />;
}

/* ---------- FEED: mosaico com fotos e cards coloridos ---------- */
function Feed() {
  const { ir } = usePerfil();
  const { open } = useVideoModal();
  return (
    <div className="pf-grade">
      {FEED.map((t, i) => {
        if (t.tipo === "texto") {
          return (
            <button key={i} className={`pf-tile txt ${t.cor}`} onClick={() => ir({ aba: t.aba, alvo: t.alvo })}>
              <span className="emoji">{t.emoji}</span>
              <span><h3>{t.titulo}</h3><p>{t.corpo}</p></span>
              <span className="cta" style={t.cor === "azul" ? { background: "#fff", color: "var(--azul)" } : undefined}>{t.cta}</span>
            </button>
          );
        }
        const video = t.video ? VIDEOS.find((v) => v.id === t.video) : undefined;
        return (
          <button key={i} className="pf-tile" onClick={() => (video ? open(video) : ir({ aba: t.aba, alvo: t.alvo }))} data-cursor={video ? "play" : undefined}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.src} alt="" style={{ objectPosition: t.posicao }} loading={i > 2 ? "lazy" : undefined} />
            <span className="ic">
              {t.icone === "play" && <svg viewBox="0 0 24 24" fill="#14213D"><path d="M5 3l14 9-14 9z" /></svg>}
              {t.icone === "grade" && <svg viewBox="0 0 24 24" fill="none" stroke="#14213D" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 3v18" /></svg>}
              {t.icone === "pessoa" && <svg viewBox="0 0 24 24" fill="none" stroke="#14213D" strokeWidth="2.5"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>}
            </span>
            {t.cap && <span className="cap">{t.cap}</span>}
            {t.pill && <span className={`pill ${t.pillClaro ? "claro" : ""}`}>{t.pill}</span>}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- REELS: todos os vídeos, com filtro por nicho e busca ---------- */
const THUMBS = ["maxresdefault.jpg", "oardefault.jpg", "oar2.jpg", "sddefault.jpg", "hqdefault.jpg", "mqdefault.jpg"];

function Reel({ video }: { video: Video }) {
  const { open } = useVideoModal();
  const [idx, setIdx] = useState(0);
  const [preview, setPreview] = useState(false);
  const [pronto, setPronto] = useState(false);
  const id = video.youtubeId;
  const src = video.thumbnail ?? (id ? `https://i.ytimg.com/vi/${id}/${THUMBS[idx]}` : "");
  const proximo = () => { if (!video.thumbnail && idx < THUMBS.length - 1) setIdx(idx + 1); };
  const nicho = CATEGORIES.find((c) => c.slug === video.category)?.name ?? video.category;
  return (
    <button className="pf-reel" onClick={() => open(video)} onMouseEnter={() => setPreview(true)} onFocus={() => setPreview(true)} aria-label={`Assistir ${video.title} (${video.brand})`} data-cursor="play">
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" loading="lazy" onError={proximo} onLoad={(e) => { if (!video.thumbnail && e.currentTarget.naturalWidth <= 120) proximo(); }} />
      )}
      {preview && id && (
        <iframe src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&controls=0&playlist=${id}&modestbranding=1&rel=0&playsinline=1`} className={pronto ? "pronto" : ""} onLoad={() => setPronto(true)} allow="autoplay; encrypted-media" tabIndex={-1} title="" />
      )}
      {video.views && <span className="views">▶ {video.views}</span>}
      <span className="play"><span><Play className="w-4 h-4 fill-white ml-0.5" /></span></span>
      <span className="marca"><small>{NICHO_EMOJI[video.category] ?? ""} {nicho}</small>{video.brand}</span>
    </button>
  );
}

function Reels() {
  const { busca, setBusca } = usePerfil();
  const [nicho, setNicho] = useState("melhores");
  const [limite, setLimite] = useState(12);
  const nichos = CATEGORIES.filter((c) => c.slug !== "all");
  const q = busca.trim().toLowerCase();

  let lista: Video[] = q
    ? VIDEOS.filter((v) => `${v.brand} ${v.title} ${v.category} ${nichos.find((n) => n.slug === v.category)?.name ?? ""}`.toLowerCase().includes(q))
    : nicho === "melhores"
      ? MELHORES.map((id) => VIDEOS.find((v) => v.id === id)).filter((v): v is Video => Boolean(v))
      : VIDEOS.filter((v) => v.category === nicho);
  const visiveis = lista.slice(0, limite);

  return (
    <div>
      {q ? (
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          <span className="font-bold">{lista.length} resultado{lista.length === 1 ? "" : "s"} pra “{busca}”</span>
          <button className="pf-pilula" onClick={() => setBusca("")}>limpar ✕</button>
        </div>
      ) : (
        <div className="pf-pilulas">
          <button className={`pf-pilula ${nicho === "melhores" ? "on" : ""}`} onClick={() => { setNicho("melhores"); setLimite(12); }}>⭐ Melhores</button>
          {nichos.map((n) => (
            <button key={n.slug} className={`pf-pilula ${nicho === n.slug ? "on" : ""}`} onClick={() => { setNicho(n.slug); setLimite(12); }}>
              {NICHO_EMOJI[n.slug]} {n.name} <span className="opacity-60">{VIDEOS.filter((v) => v.category === n.slug).length}</span>
            </button>
          ))}
        </div>
      )}
      <div className="pf-reels">
        {visiveis.map((v) => <Reel key={v.id} video={v} />)}
      </div>
      {lista.length === 0 && <div className="mt-6 text-center font-bold text-[var(--cinza)]">Nada com esse nome ainda. Tenta “beleza”, “tech” ou o nome de uma marca. 🙂</div>}
      {lista.length > limite && (
        <div className="mt-5 flex justify-center">
          <button className="pf-btn borda" onClick={() => setLimite((l) => l + 12)}><Plus className="w-4 h-4" /> Carregar mais {Math.min(12, lista.length - limite)}</button>
        </div>
      )}
    </div>
  );
}

/* ---------- PUBLI: post do IG + números ao vivo + formatos ---------- */
function Publi() {
  const { stats } = usePerfil();
  return (
    <div className="grid md:grid-cols-12 gap-6 md:gap-8 mt-5 items-start">
      <div className="md:col-span-5">
        <div className="pf-post">
          <div className="cab">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ensaio/cara-01.webp" alt="" style={{ objectPosition: "center 18%" }} />
            <div className="leading-tight"><div className="font-extrabold text-sm">eilaradam</div><div className="text-xs text-[var(--cinza)] font-semibold">Litoral de SP · Parceria paga</div></div>
            <span className="ml-auto text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-md bg-[var(--amarelo)]">Publi</span>
          </div>
          <div className="foto">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={PUBLI.foto} alt="Lara Dam na janela com a cidade ao fundo" loading="lazy" style={{ objectPosition: "center 30%" }} /></div>
          <div className="acoes"><Heart /><MessageCircle /><Send /><Bookmark className="ml-auto" /></div>
          <div className="legenda"><b>{fmtBR(stats.followers)} seguidores</b><br /><b>eilaradam</b> {PUBLI.legenda}</div>
        </div>
      </div>
      <div className="md:col-span-7">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{PUBLI.titulo}</h2>
        <p className="mt-2 text-[var(--cinza)] font-semibold">{PUBLI.sub}</p>
        <div className="pf-numeros mt-4">
          <div className="pf-num" style={{ background: "var(--rosa)" }}><b>{fmtBR(stats.followers)}</b><span>seguidores</span></div>
          <div className="pf-num" style={{ background: "var(--amarelo)" }}><b>{fmtBR(stats.reach_month)}</b><span>alcance em 30 dias</span></div>
          <div className="pf-num" style={{ background: "var(--verde)" }}><b>{stats.posts}</b><span>posts no feed</span></div>
        </div>
        <div className="mt-2 text-xs font-bold text-[var(--cinza)] flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${stats.live ? "bg-[var(--azul)] animate-pulse" : "bg-[var(--cinza)]"}`} />{stats.live ? "ao vivo, direto da API do Instagram" : "última leitura da API do Instagram"}</div>
        <div className="pf-formatos">
          {PUBLI.formatos.map((f, i) => (
            <div key={f.nome} className="pf-formato" style={{ background: ["var(--lilas)", "var(--pessego)", "var(--menta)", "var(--azul2)"][i] }}>
              <div className="e">{f.e}</div><b>{f.nome}</b><p>{f.desc}</p>
            </div>
          ))}
        </div>
        <ul className="mt-4 grid gap-2">
          {PUBLI.porques.map((p) => <li key={p} className="flex gap-2 font-semibold text-sm"><span>✅</span><span>{p}</span></li>)}
        </ul>
        <a href="#contato" className="pf-btn azul mt-5" data-track="perfil_publi_cta">Quero uma publi com a Lara</a>
      </div>
    </div>
  );
}

/* ---------- MARCADAS: as marcas ---------- */
function Marcas() {
  return (
    <div>
      <div className="mt-5 flex items-end justify-between gap-4 flex-wrap">
        <div><h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Marcas que me marcaram 🤝</h2><p className="mt-1 text-[var(--cinza)] font-semibold">Mais de 200 parcerias em 2 anos. Algumas delas:</p></div>
      </div>
      <div className="pf-marcas">
        {BRAND_LOGO_FILES.map((f) => (
          <div key={f} className="pf-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/logo-1/${encodeURI(f)}`} alt="Marca parceira" loading="lazy" onError={(e) => { e.currentTarget.parentElement?.remove(); }} />
          </div>
        ))}
      </div>
    </div>
  );
}
