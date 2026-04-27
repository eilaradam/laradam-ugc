"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS, type Testimonial } from "@/data/content";

// Triplica pra ilusão de loop infinito
const LOOPED_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

const AUTOPLAY_INTERVAL = 4500; // ms

export default function Testimonials() {
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
    // Avança/volta a largura de UM card (não a página inteira)
    const firstCard = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard?.offsetWidth ?? el.clientWidth * 0.25;
    const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap || "16") || 16;
    el.scrollBy({ left: (cardWidth + gap) * direction, behavior: "smooth" });
  };

  // Autoplay — avança 1 card por vez
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
    <section
      id="depoimentos"
      className="px-6 md:px-12 py-8 md:py-14 bg-background-alt"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 md:mb-8">
          <div>
            <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3 flex items-center gap-3">
              <span className="h-px w-6 md:w-8 bg-primary" />
              Depoimentos
            </div>
            <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter">
              O que dizem{" "}
              <span className="font-serif-accent italic text-primary">
                sobre o trabalho
              </span>
            </h2>
          </div>
          <p className="text-foreground-soft max-w-xs text-xs md:text-sm">
            Feedback de marcas que viram a diferença de um UGC pensado pra
            performance.
          </p>
        </div>

        {/* Carrossel infinito com autoplay */}
        <div
          className="relative"
          onMouseEnter={() => { isPaused.current = true; }}
          onMouseLeave={() => { isPaused.current = false; }}
          onTouchStart={() => { isPaused.current = true; }}
          onTouchEnd={() => { isPaused.current = false; }}
        >
          <div
            ref={scrollerRef}
            className="flex gap-4 md:gap-5 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory scrollbar-hide services-fade py-2 items-stretch"
          >
            {LOOPED_TESTIMONIALS.map((t, i) => (
              <div
                key={`${t.brand}-${i}`}
                className="flex-shrink-0 snap-center w-[78%] sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-2rem)/3)] flex"
              >
                <TestimonialCard testimonial={t} index={i} />
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollByCard(-1)}
            aria-label="Anterior"
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background border-2 border-foreground/15 items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-all shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollByCard(1)}
            aria-label="Próximo"
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background border-2 border-foreground/15 items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-all shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function BrandLogo({
  brand,
  logoFile,
  domain,
}: {
  brand: string;
  logoFile?: string;
  domain?: string;
}) {
  const [errored, setErrored] = useState(false);
  const initials = brand
    .replace(/[^A-Za-z0-9 ]/g, "")
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const src = logoFile
    ? `/logo-1/${logoFile}`
    : domain
    ? `https://logo.clearbit.com/${domain}`
    : null;

  if (!src || errored) {
    return (
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-foreground text-background flex items-center justify-center flex-shrink-0 font-display font-black text-base tracking-tight shadow-md ring-4 ring-background">
        {initials}
      </div>
    );
  }

  return (
    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center flex-shrink-0 overflow-hidden shadow-md ring-4 ring-background">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={brand}
        width={80}
        height={80}
        className="w-full h-full object-contain p-1"
        onError={() => setErrored(true)}
      />
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % TESTIMONIALS.length) * 0.06 }}
      className="relative w-full pt-10 pb-4 px-5 md:px-6 rounded-2xl bg-background border border-foreground/5 flex flex-col items-center text-center gap-2 group hover:border-primary/30 transition-colors mt-9 md:mt-10"
    >
      {/* Logo: posicionado overflow no topo */}
      <div className="absolute -top-9 md:-top-10 left-1/2 -translate-x-1/2">
        <BrandLogo
          brand={testimonial.brand}
          logoFile={testimonial.logoFile}
          domain={testimonial.brandDomain}
        />
      </div>

      {/* Nome da marca */}
      <div className="font-display font-black text-foreground text-[14px] tracking-tight">
        {testimonial.brand}
      </div>

      {/* Estrelas */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="w-3 h-3 fill-primary text-primary"
            strokeWidth={0}
          />
        ))}
      </div>

      {/* Role opcional */}
      {testimonial.role && (
        <div className="text-[10px] uppercase tracking-wider text-muted">
          {testimonial.role}
        </div>
      )}

      {/* Comentário */}
      <p className="text-foreground-soft leading-snug text-[11px] flex-1 mt-1">
        {testimonial.quote}
      </p>

      {/* Resultado / métrica */}
      {testimonial.metric && (
        <div className="flex flex-col items-center pt-2 border-t border-foreground/10 w-full mt-1.5">
          <span className="font-display font-black text-[14px] text-primary tracking-tight leading-tight">
            {testimonial.metric.value}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-foreground-soft">
            {testimonial.metric.label}
          </span>
        </div>
      )}
    </motion.div>
  );
}
