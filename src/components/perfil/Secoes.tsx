"use client";

import { useEffect, useRef, useState } from "react";
import { Bookmark, ChevronLeft, ChevronRight, Heart, MessageCircle, Play, Plus, Search, Send } from "lucide-react";
import { CATEGORIES, VIDEOS, type Video } from "@/data/content";
import { LOGOS_ORDEM, NICHO_EMOJI, PERFIL, PUBLI, RESULTADOS, SERVICOS } from "@/data/perfil";
import { useVideoModal } from "@/components/VideoModalProvider";
import { fmtBR, usePerfil } from "./PerfilApp";

// Quantos vídeos ficam visíveis por vez em cada carrossel (os outros aparecem rolando pro lado).
const VISIVEIS = 5;

const THUMBS = ["maxresdefault.jpg", "oardefault.jpg", "oar2.jpg", "sddefault.jpg", "hqdefault.jpg", "mqdefault.jpg"];
// No celular o card é pequeno: começa pela capa média (640px) e economiza uns 4 MB na página.
const THUMBS_LEVES = ["sddefault.jpg", "hqdefault.jpg", "mqdefault.jpg"];

/* ---------- card de vídeo (9:16), prévia no hover, abre no player ---------- */
function Reel({ video, grande = false }: { video: Video; grande?: boolean }) {
  const { open } = useVideoModal();
  const [idx, setIdx] = useState(0);
  const [preview, setPreview] = useState(false);
  const [pronto, setPronto] = useState(false);
  const [leve, setLeve] = useState(false);
  useEffect(() => { if (!grande && window.innerWidth < 768) setLeve(true); }, [grande]);
  const lista = leve ? THUMBS_LEVES : THUMBS;
  const id = video.youtubeId;
  const src = video.thumbnail ?? (id ? `https://i.ytimg.com/vi/${id}/${lista[idx]}` : "");
  const proximo = () => { if (!video.thumbnail && idx < lista.length - 1) setIdx(idx + 1); };
  const nicho = CATEGORIES.find((c) => c.slug === video.category)?.name ?? video.category;
  return (
    <button className={`pf-reel ${grande ? "grande" : ""}`} onClick={() => open(video)} onMouseEnter={() => setPreview(true)} onFocus={() => setPreview(true)} aria-label={`Assistir ${video.title} (${video.brand})`} data-cursor="play">
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

function Titulo({ id, titulo, sub, extra }: { id: string; titulo: string; sub: string; extra?: React.ReactNode }) {
  return (
    <div className="pf-sec-cab">
      <div><h2 id={`${id}-titulo`}>{titulo}</h2><p className="sub">{sub}</p></div>
      {extra}
    </div>
  );
}

/* ---------- RESULTADOS: números + 2 cases grandes ---------- */
export function Resultados() {
  return (
    <section id="resultados" className="pf-sec">
      <Titulo id="resultados" titulo={RESULTADOS.titulo} sub={RESULTADOS.sub} />
      <div className="pf-numeros6">
        {RESULTADOS.numeros.map((n) => (
          <div key={n.k} className="pf-num"><b>{n.v}</b><span>{n.k}</span></div>
        ))}
      </div>
      <Destaques />
    </section>
  );
}

/* ---------- DESTAQUES: coverflow (centro nítido e grande, laterais desfocadas) ---------- */
const INTERVALO_DESTAQUES = 5000;

function Destaques() {
  const cases = RESULTADOS.cases;
  const n = cases.length;
  const [ativo, setAtivo] = useState(0);
  const pausado = useRef(false);

  const ir = (dir: 1 | -1) => setAtivo((a) => (a + dir + n) % n);

  useEffect(() => {
    const id = setInterval(() => { if (!pausado.current && !document.hidden) setAtivo((a) => (a + 1) % n); }, INTERVALO_DESTAQUES);
    return () => clearInterval(id);
  }, [n]);

  return (
    <div
      className="pf-cf-wrap"
      onMouseEnter={() => { pausado.current = true; }}
      onMouseLeave={() => { pausado.current = false; }}
      onFocusCapture={() => { pausado.current = true; }}
      onBlurCapture={() => { pausado.current = false; }}
    >
      <div className="pf-cf" aria-roledescription="carrossel" aria-label="Cases de destaque">
        {cases.map((c, i) => {
          let rel = ((i - ativo) % n + n) % n;
          if (rel > n / 2) rel -= n; // -2..1
          const pos = rel === 0 ? "centro" : rel === -1 ? "esq" : rel === 1 ? "dir" : "fora";
          const v: Video = { id: `case-${c.youtubeId}`, title: c.marca, brand: c.marca, category: c.categoria, youtubeId: c.youtubeId, thumbnail: c.capa };
          return (
            <div
              key={c.youtubeId}
              className={`pf-cf-item ${pos}`}
              aria-hidden={pos !== "centro"}
              onClickCapture={(e) => { if (pos !== "centro") { e.stopPropagation(); e.preventDefault(); setAtivo(i); } }}
            >
              <div className="pf-case">
                <Reel video={v} grande />
                <div className="txt">
                  <div className="pf-mao pf-nota">{c.nota}</div>
                  <h3>{c.marca}</h3>
                  <div className="metrica">{c.metrica}</div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-[var(--cinza)] mt-1.5">{c.onde}</div>
                  {c.stats && <div className="stats">{c.stats.map((x) => <span key={x}>{x}</span>)}</div>}
                  <p>{c.detalhe}</p>
                  <span className="dica">▶ clica no vídeo pra assistir</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pf-cf-nav">
        <button aria-label="Case anterior" onClick={() => ir(-1)}><ChevronLeft className="w-5 h-5" /></button>
        <div className="pf-cf-dots" role="tablist">
          {cases.map((c, i) => (
            <button key={c.youtubeId} role="tab" aria-selected={i === ativo} aria-label={c.marca} className={i === ativo ? "on" : ""} onClick={() => setAtivo(i)} />
          ))}
        </div>
        <button aria-label="Próximo case" onClick={() => ir(1)}><ChevronRight className="w-5 h-5" /></button>
      </div>
      <div className="text-center text-xs font-bold text-[var(--cinza)] mt-2">{cases[ativo].marca} · {ativo + 1} de {n}</div>
    </div>
  );
}

/* ---------- SERVIÇOS: o que a marca pode contratar ---------- */
export function Servicos() {
  return (
    <section id="servicos" className="pf-sec">
      <Titulo id="servicos" titulo={SERVICOS.titulo} sub={SERVICOS.sub} />
      <div className="pf-servicos">
        {SERVICOS.itens.map((it) => (
          <a key={it.nome} href={PERFIL.whatsappUrl} target="_blank" rel="noopener" className="pf-servico" data-track={`perfil_servico_${it.nome.toLowerCase().replace(/[^a-z]+/g, "_")}`}>
            <span className="e">{it.e}</span>
            {it.tag && <span className="tag">{it.tag}</span>}
            <b>{it.nome}</b>
            <p>{it.desc}</p>
            <span className="cta">Quero esse →</span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------- VÍDEOS: um carrossel por nicho (+ busca) ---------- */
function useTrilho({ videos }: { videos: Video[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [podeAnt, setPodeAnt] = useState(false);
  const [podeProx, setPodeProx] = useState(true);

  const atualizar = () => {
    const el = ref.current;
    if (!el) return;
    setPodeAnt(el.scrollLeft > 4);
    setPodeProx(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };
  useEffect(() => {
    atualizar();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
    return () => { el.removeEventListener("scroll", atualizar); window.removeEventListener("resize", atualizar); };
  }, [videos.length]);

  const rolar = (dir: 1 | -1) => ref.current?.scrollBy({ left: ref.current.clientWidth * dir, behavior: "smooth" });

  return { ref, podeAnt, podeProx, rolar };
}

function Nicho({ slug, nome, tagline, videos }: { slug: string; nome: string; tagline?: string; videos: Video[] }) {
  const { ref, podeAnt, podeProx, rolar } = useTrilho({ videos });
  if (videos.length === 0) return null;
  return (
    <div id={`nicho-${slug}`} className="pf-nicho">
      <div className="pf-nicho-cab">
        <div>
          <h3>{NICHO_EMOJI[slug] ?? "⭐"} {nome} <small>{videos.length}</small></h3>
          {tagline && <div className="tag">{tagline}</div>}
        </div>
        <div className="pf-setas" style={{ visibility: podeAnt || podeProx ? "visible" : "hidden" }}>
          <button aria-label="Anterior" onClick={() => rolar(-1)} disabled={!podeAnt}><ChevronLeft className="w-5 h-5" /></button>
          <button aria-label="Próximo" onClick={() => rolar(1)} disabled={!podeProx}><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
      <div ref={ref} className="pf-trilho">
        {videos.map((v) => <Reel key={v.id} video={v} />)}
      </div>
    </div>
  );
}

export function Videos() {
  const [busca, setBusca] = useState("");
  const nichos = CATEGORIES.filter((c) => c.slug !== "all");
  const q = busca.trim().toLowerCase();
  const resultados: Video[] = q
    ? VIDEOS.filter((v) => `${v.brand} ${v.title} ${v.category} ${nichos.find((n) => n.slug === v.category)?.name ?? ""}`.toLowerCase().includes(q))
    : [];

  return (
    <section id="videos" className="pf-sec">
      <Titulo
        id="videos"
        titulo="Meus vídeos 🎬"
        sub={`${VIDEOS.length} vídeos pra ${new Set(VIDEOS.map((v) => v.brand)).size} marcas, separados por nicho. Aparecem ${VISIVEIS} por vez: usa as setas ou desliza pro lado pra ver os outros. Clica pra assistir.`}
        extra={
          <label className="pf-busca">
            <Search className="w-4 h-4 text-[#9AA0AE]" />
            <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar marca ou nicho" aria-label="Buscar vídeos por marca ou nicho" />
          </label>
        }
      />

      {q ? (
        <>
          <div className="mt-4 flex items-center gap-3 flex-wrap font-bold">
            {resultados.length} resultado{resultados.length === 1 ? "" : "s"} pra “{busca}”
            <button className="pf-pilula" onClick={() => setBusca("")}>limpar ✕</button>
          </div>
          <div className="pf-reels">{resultados.map((v) => <Reel key={v.id} video={v} />)}</div>
          {resultados.length === 0 && <div className="mt-6 text-center font-bold text-[var(--cinza)]">Nada com esse nome ainda. Tenta “beleza”, “tech” ou o nome de uma marca. 🙂</div>}
        </>
      ) : (
        <>
          {/* atalhos pros nichos */}
          <div className="pf-pilulas">
            {nichos.map((n) => (
              <a key={n.slug} href={`#nicho-${n.slug}`} className="pf-pilula">
                {NICHO_EMOJI[n.slug]} {n.name} <span className="opacity-60">{VIDEOS.filter((v) => v.category === n.slug).length}</span>
              </a>
            ))}
          </div>
          {nichos.map((n) => (
            <Nicho key={n.slug} slug={n.slug} nome={n.name} tagline={n.tagline} videos={VIDEOS.filter((v) => v.category === n.slug)} />
          ))}
        </>
      )}
    </section>
  );
}

/* ---------- PUBLI ---------- */
export function Publi() {
  const { stats } = usePerfil();
  return (
    <section id="publi" className="pf-sec">
      <Titulo id="publi" titulo={`${PUBLI.titulo} 📱`} sub={PUBLI.sub} />
      <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
        <div className="md:col-span-5">
          <div className="pf-post">
            <div className="cab">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ensaio/cara-01.webp" alt="" style={{ objectPosition: "center 18%" }} />
              <div className="leading-tight"><div className="font-extrabold text-sm">eilaradam</div><div className="text-xs text-[var(--cinza)] font-semibold">Litoral de SP · Parceria paga</div></div>
              <span className="ml-auto text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-md bg-[var(--claro2)] text-[var(--azul)]">Publi</span>
            </div>
            <div className="foto">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={PUBLI.foto} alt="Lara Dam na janela com a cidade ao fundo" loading="lazy" style={{ objectPosition: "center 30%" }} /></div>
            <div className="acoes"><Heart /><MessageCircle /><Send /><Bookmark className="ml-auto" /></div>
            <div className="legenda"><b>{fmtBR(stats.followers)} seguidores</b><br /><b>eilaradam</b> {PUBLI.legenda}</div>
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="pf-numeros">
            <div className="pf-num"><b>{fmtBR(stats.followers)}</b><span>seguidores</span></div>
            <div className="pf-num"><b>{fmtBR(stats.reach_month)}</b><span>alcance em 30 dias</span></div>
            <div className="pf-num"><b>{stats.posts}</b><span>posts no feed</span></div>
          </div>
          <div className="mt-2 text-xs font-bold text-[var(--cinza)] flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${stats.live ? "bg-[var(--azul)] animate-pulse" : "bg-[var(--cinza)]"}`} />{stats.live ? "ao vivo, direto da API do Instagram" : "última leitura da API do Instagram"}</div>
          <div className="pf-formatos">
            {PUBLI.formatos.map((f) => (
              <div key={f.nome} className="pf-formato">
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
    </section>
  );
}

/* ---------- MARCAS ---------- */
export function Marcas() {
  const [todas, setTodas] = useState(false);
  const lista = todas ? LOGOS_ORDEM : LOGOS_ORDEM.slice(0, 24);
  return (
    <section id="marcas" className="pf-sec">
      <Titulo id="marcas" titulo="Marcas que já trabalharam comigo 🤝" sub="Mais de 200 parcerias em 2 anos, de fintech a beleza, casa e gastronomia. Algumas delas:" />
      <div className="pf-marcas">
        {lista.map((f) => (
          <div key={f} className="pf-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/logo-1/${encodeURI(f)}`} alt="Marca parceira" loading="lazy" onError={(e) => { e.currentTarget.parentElement?.remove(); }} />
          </div>
        ))}
      </div>
      {!todas && (
        <div className="mt-5 flex justify-center"><button className="pf-btn borda" onClick={() => setTodas(true)}><Plus className="w-4 h-4" /> Ver mais marcas</button></div>
      )}
    </section>
  );
}
