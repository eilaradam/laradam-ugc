"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Mic, Pause, Play } from "lucide-react";
import { useVideoModal } from "./VideoModalProvider";
import type { Video } from "@/data/content";
import { useT } from "@/lib/i18n";

type YtPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  unMute: () => void;
  mute: () => void;
  setVolume: (v: number) => void;
  seekTo: (s: number, allowSeekAhead?: boolean) => void;
  destroy: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement | string,
        opts: Record<string, unknown>
      ) => YtPlayer;
      PlayerState: { ENDED: 0; PLAYING: 1; PAUSED: 2; BUFFERING: 3; CUED: 5 };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

type Stat = { value: string; label: string };

type Highlight = {
  youtubeId: string;
  brand: string;
  brandDomain: string; // usado pelo Clearbit pro logo
  metric: string; // ex: "+ 50 milhões de views"
  platform: string; // ex: "apenas no TikTok"
  stats?: Stat[]; // se presente, substitui metric/platform por lista vertical
};

// Dados estruturais (não traduzem) — id, brand, domain
const HIGHLIGHTS_BASE = [
  {
    youtubeId: "5wf8Fv2CTa4",
    brand: "InfinitePay",
    brandDomain: "infinitepay.io",
  },
  {
    youtubeId: "wesTfq67X9o",
    brand: "Méliuz",
    brandDomain: "meliuz.com.br",
  },
  {
    youtubeId: "2s6BI893C74",
    brand: "Bready",
    brandDomain: "bready.com.br",
  },
  {
    youtubeId: "dgQYEfEQTvQ",
    brand: "Méliuz Cashback",
    brandDomain: "meliuz.com.br",
  },
];

const AUTOPLAY_INTERVAL = 5000;

// Áudio de cliente — https://youtube.com/shorts/rRrIpSRu90A
const AUDIO_TESTIMONIAL = {
  youtubeId: "rRrIpSRu90A",
  duration: "13:52",
};

export default function BestResults() {
  const t = useT();
  return (
    <section
      id="destaques"
      className="px-6 md:px-12 py-6 md:py-10 bg-background relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-12 items-start">
        {/* Coluna esquerda — título + áudio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-5 md:sticky md:top-28 self-start"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            {t.bestResults.tag}
          </div>

          <h2 className="font-display font-black text-4xl md:text-6xl leading-[0.9] tracking-tighter text-foreground">
            {t.bestResults.title1}{" "}
            <span className="font-serif-accent italic text-primary">
              {t.bestResults.titleAccent}
            </span>
          </h2>

          <p className="mt-4 text-foreground-soft text-base md:text-lg max-w-md">
            {t.bestResults.eyeline}
          </p>

          <p className="mt-5 text-foreground-soft text-sm md:text-base max-w-md leading-relaxed">
            {t.bestResults.body1Pre}
            <span className="font-bold text-foreground">
              {t.bestResults.body1ViewsHi}
            </span>
            {t.bestResults.body1Mid}
            <span className="font-bold text-foreground">
              {t.bestResults.body1Cpa}
            </span>
            {t.bestResults.body1Mid2}
            <span className="font-bold text-foreground">
              {t.bestResults.body1Roas}
            </span>
            {t.bestResults.body1End}
          </p>

          <div className="mt-8 md:mt-10">
            <AudioTestimonialCard />
          </div>
        </motion.div>

        {/* Coluna direita — carrossel de vídeos verticais com autoplay */}
        <div className="md:col-span-7">
          <HighlightsCarousel />
        </div>
      </div>
    </section>
  );
}

function HighlightsCarousel() {
  const t = useT();

  // Funde a parte estrutural com o texto traduzido (metric/platform/stats)
  const localized: Highlight[] = HIGHLIGHTS_BASE.map((h, i) => {
    const tx = t.bestResults.highlights[i];
    return {
      ...h,
      metric: tx?.metric ?? "",
      platform: tx?.platform ?? "",
      stats: tx?.stats,
    };
  });

  const looped = [...localized, ...localized, ...localized];

  const scrollerRef = useRef<HTMLDivElement>(null);
  const isJumping = useRef(false);
  const isPaused = useRef(false);

  const jumpBy = (el: HTMLDivElement, delta: number) => {
    const prev = el.style.scrollBehavior;
    el.style.scrollBehavior = "auto";
    el.scrollLeft = el.scrollLeft + delta;
    void el.offsetHeight;
    el.style.scrollBehavior = prev;
  };

  // Centraliza no bloco do meio ao montar
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const oneCopyWidth = el.scrollWidth / 3;
    const prev = el.style.scrollBehavior;
    el.style.scrollBehavior = "auto";
    el.scrollLeft = oneCopyWidth;
    void el.offsetHeight;
    el.style.scrollBehavior = prev;
  }, []);

  // Detecta fim do scroll e teleporta se passou do limite
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let timeout: ReturnType<typeof setTimeout> | null = null;
    const checkLoop = () => {
      if (isJumping.current) return;
      const oneCopyWidth = el.scrollWidth / 3;
      if (el.scrollLeft < oneCopyWidth * 0.5) {
        isJumping.current = true;
        jumpBy(el, oneCopyWidth);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => { isJumping.current = false; });
        });
      } else if (el.scrollLeft > oneCopyWidth * 1.5) {
        isJumping.current = true;
        jumpBy(el, -oneCopyWidth);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => { isJumping.current = false; });
        });
      }
    };

    const onScroll = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(checkLoop, 180);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const oneCopyWidth = el.scrollWidth / 3;
    if (direction === 1 && el.scrollLeft > oneCopyWidth * 1.5) {
      isJumping.current = true;
      jumpBy(el, -oneCopyWidth);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { isJumping.current = false; });
      });
    } else if (direction === -1 && el.scrollLeft < oneCopyWidth * 0.5) {
      isJumping.current = true;
      jumpBy(el, oneCopyWidth);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { isJumping.current = false; });
      });
    }
    const firstCard = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard?.offsetWidth ?? el.clientWidth * 0.5;
    const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap || "16") || 16;
    el.scrollBy({ left: (cardWidth + gap) * direction, behavior: "smooth" });
  };

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused.current) return;
      const el = scrollerRef.current;
      if (!el) return;
      if (document.hidden) return;
      scrollByCard(1);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => { isPaused.current = true; }}
      onMouseLeave={() => { isPaused.current = false; }}
      onTouchStart={() => { isPaused.current = true; }}
      onTouchEnd={() => { isPaused.current = false; }}
    >
      <div
        ref={scrollerRef}
        className="flex gap-4 md:gap-6 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory scrollbar-hide py-2 items-stretch"
      >
        {looped.map((h, i) => (
          <CarouselSlide
            key={`${h.brand}-${i}`}
            highlight={h}
            index={i}
            scrollerRef={scrollerRef}
          />
        ))}
      </div>

      {/* Setas discretas */}
      <button
        onClick={() => scrollByCard(-1)}
        aria-label="Anterior"
        className="hidden md:flex absolute left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-background/80 backdrop-blur border border-foreground/10 items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/40 hover:bg-background transition-all"
      >
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
      </button>
      <button
        onClick={() => scrollByCard(1)}
        aria-label="Próximo"
        className="hidden md:flex absolute right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-background/80 backdrop-blur border border-foreground/10 items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/40 hover:bg-background transition-all"
      >
        <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}

// Slide com detecção de "card central" via IntersectionObserver:
// quando >85% visível dentro do scroller → ativo (sem blur), senão → opacidade baixa + blur sutil
function CarouselSlide({
  highlight,
  index,
  scrollerRef,
}: {
  highlight: Highlight;
  index: number;
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const slideRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const el = slideRef.current;
    const root = scrollerRef.current;
    if (!el || !root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsActive(entry.intersectionRatio > 0.85);
        }
      },
      {
        root,
        threshold: [0, 0.5, 0.85, 0.95, 1],
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [scrollerRef]);

  return (
    <div
      ref={slideRef}
      className={`flex-shrink-0 snap-center w-[80%] sm:w-[60%] md:w-[55%] lg:w-[50%] flex transition-all duration-500 ${
        isActive
          ? "opacity-100 blur-0 scale-100"
          : "opacity-30 blur-[2px] scale-95"
      }`}
    >
      <HighlightCard highlight={highlight} index={index} />
    </div>
  );
}

function HighlightCard({
  highlight,
  index,
}: {
  highlight: Highlight;
  index: number;
}) {
  const { open } = useVideoModal();

  const video: Video = {
    id: `highlight-${highlight.brand}`,
    title: `Case ${highlight.brand}`,
    category: "tech",
    brand: highlight.brand,
    youtubeId: highlight.youtubeId || undefined,
    views: highlight.metric.replace("+ ", "").replace(" milhões de views", "M"),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08 }}
      className="flex flex-col w-full"
    >
      {/* Brand "logo" — texto estilizado em display font (mais confiável que Clearbit) */}
      <div className="h-8 md:h-10 flex items-center justify-center mb-3 md:mb-4">
        <span className="font-display font-black text-foreground text-lg md:text-xl tracking-tight uppercase">
          {highlight.brand}
        </span>
      </div>

      {/* Vídeo vertical */}
      <button
        onClick={() => open(video)}
        data-cursor="play"
        className="group relative w-full aspect-[9/16] overflow-hidden rounded-2xl bg-foreground cursor-pointer"
      >
        {highlight.youtubeId ? (
          <img
            src={`https://i.ytimg.com/vi/${highlight.youtubeId}/maxresdefault.jpg`}
            alt={highlight.brand}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = `https://i.ytimg.com/vi/${highlight.youtubeId}/hqdefault.jpg`;
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground-soft to-primary/30 flex items-center justify-center">
            <div className="text-background/50 text-center p-4">
              <Play className="w-10 h-10 mx-auto mb-2 opacity-60" />
              <div className="text-[10px] uppercase tracking-wider font-semibold">
                {highlight.brand}
              </div>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center">
            <Play className="w-4 h-4 md:w-5 md:h-5 text-primary-light fill-primary-light ml-0.5" />
          </div>
        </div>
      </button>

      {/* Métricas abaixo — lista vertical se tiver stats[], senão métrica única */}
      {highlight.stats && highlight.stats.length > 0 ? (
        <dl className="mt-4 md:mt-5 divide-y divide-foreground/10 border-t border-foreground/10">
          {highlight.stats.map((s) => (
            <div
              key={s.label}
              className="flex items-baseline justify-between py-2"
            >
              <dt className="text-[11px] md:text-xs uppercase tracking-wider text-muted">
                {s.label}
              </dt>
              <dd className="font-display font-black text-base md:text-lg tracking-tight text-foreground tabular-nums">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <div className="mt-4 md:mt-5 text-center">
          <div className="font-display font-bold text-foreground text-base md:text-xl tracking-tight">
            <span className="font-black">
              {highlight.metric.split(" de ")[0]}
            </span>
            {highlight.metric.includes(" de ") && (
              <>
                {" de "}
                {highlight.metric.split(" de ")[1]}
              </>
            )}
          </div>
          <div className="text-sm md:text-base text-foreground-soft mt-0.5">
            {highlight.platform}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Carrega a YT IFrame API uma única vez, mesmo se múltiplos componentes usarem
let ytApiLoader: Promise<void> | null = null;
function loadYtApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (ytApiLoader) return ytApiLoader;

  ytApiLoader = new Promise<void>((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    if (!document.querySelector("script[data-yt-api]")) {
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      s.dataset.ytApi = "1";
      s.async = true;
      document.head.appendChild(s);
    }
  });
  return ytApiLoader;
}

function AudioTestimonialCard() {
  const t = useT();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<YtPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasId = Boolean(AUDIO_TESTIMONIAL.youtubeId);

  // Pré-carrega o player assim que o componente entra em viewport.
  // Usa IntersectionObserver pra não baixar o player se a pessoa nunca rolar até aqui.
  useEffect(() => {
    if (!hasId || !containerRef.current) return;
    const el = containerRef.current;
    let cancelled = false;

    const init = async () => {
      await loadYtApi();
      if (cancelled || !containerRef.current || !window.YT) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: AUDIO_TESTIMONIAL.youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          disablekb: 1,
          iv_load_policy: 3,
        },
        events: {
          onReady: (e: { target: YtPlayer }) => {
            // pré-buffer: muta + dá play + pausa, pra forçar o YouTube a
            // baixar os primeiros segundos, aí o play real é instantâneo
            try {
              e.target.mute();
              e.target.playVideo();
              setTimeout(() => {
                try {
                  e.target.pauseVideo();
                  e.target.seekTo(0, true);
                  e.target.unMute();
                  e.target.setVolume(100);
                } catch {}
                setIsReady(true);
              }, 400);
            } catch {
              setIsReady(true);
            }
          },
          onStateChange: (e: { data: number }) => {
            // 0 = ended, 1 = playing, 2 = paused
            if (e.data === 0 || e.data === 2) setIsPlaying(false);
            if (e.data === 1) setIsPlaying(true);
          },
        },
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((en) => en.isIntersecting)) {
          init();
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      try {
        playerRef.current?.destroy();
      } catch {}
    };
  }, [hasId]);

  const toggle = () => {
    if (!hasId) return;
    const player = playerRef.current;
    if (!player) return;
    try {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.unMute();
        player.setVolume(100);
        player.playVideo();
      }
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={!isReady}
      className="w-full max-w-md relative rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden disabled:cursor-wait"
    >
      {/* Container onde a YT API injeta o iframe. Fica atrás da UI. */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-0"
        aria-hidden
      />

      {/* UI na frente cobre visualmente o iframe */}
      <div className="relative z-10 flex items-center gap-3 p-3 md:p-4 bg-[#e9e4db] border border-foreground/5 rounded-3xl">
        {/* Play/Pause */}
        <div
          className={`flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${
            isPlaying
              ? "bg-primary text-primary-light"
              : "bg-foreground text-background hover:bg-primary"
          }`}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 md:w-5 md:h-5 fill-current" />
          ) : (
            <Play className="w-4 h-4 md:w-5 md:h-5 fill-current ml-0.5" />
          )}
        </div>

        {/* Waveform + metadata */}
        <div className="flex-1 min-w-0">
          <Waveform playing={isPlaying} />
          <div className="flex items-center justify-between mt-1.5 text-[10px] md:text-xs text-foreground/50 font-medium tabular-nums">
            <span>{isPlaying ? t.bestResults.audioCardNow : "0:01"}</span>
            <span>{AUDIO_TESTIMONIAL.duration}</span>
          </div>
        </div>

        {/* Velocidade + mic — decorativo (estilo WhatsApp) */}
        <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
          <span className="text-[10px] md:text-xs font-semibold text-foreground/60 bg-background/60 rounded-full px-2 py-0.5">
            1,5x
          </span>
          <Mic className="w-4 h-4 text-foreground/40" strokeWidth={2} />
        </div>
      </div>
    </button>
  );
}

// Waveform fake estilo WhatsApp — barras animam quando playing
function Waveform({ playing = false }: { playing?: boolean }) {
  const HEIGHTS = [
    30, 55, 42, 70, 50, 85, 60, 40, 72, 48, 88, 55, 65, 38, 52, 78, 45, 92,
    60, 50, 80, 42, 68, 55, 36, 72, 58, 48, 82, 52, 40, 68, 54, 88, 62, 44,
    76, 50, 38, 64,
  ];
  const progress = playing ? 1 : 0.15;

  return (
    <div className="flex items-center gap-[2px] h-6 md:h-7 w-full">
      {HEIGHTS.map((h, i) => {
        const played = i / HEIGHTS.length < progress;
        return (
          <span
            key={i}
            className={`flex-1 rounded-full origin-center ${
              played ? "bg-primary" : "bg-foreground/35"
            } ${playing ? "wave-bar" : ""}`}
            style={
              {
                height: `${h}%`,
                animationDelay: `${(i % 10) * 80}ms`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
