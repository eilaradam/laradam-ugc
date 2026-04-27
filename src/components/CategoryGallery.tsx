"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VIDEOS } from "@/data/content";
import VideoCard from "./VideoCard";
import { useT } from "@/lib/i18n";

type LocalCategory = { slug: string; name: string; tagline: string };

export default function CategoryGallery() {
  const t = useT();
  const rows: LocalCategory[] = t.categories.items;

  return (
    <section
      id="categorias"
      className="px-6 md:px-12 py-6 md:py-10 bg-background-alt"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12">
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            {t.categories.tag}
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl leading-[0.9] tracking-tighter max-w-4xl">
            {t.categories.title1}{" "}
            <span className="font-serif-accent italic text-primary">
              {t.categories.titleAccent}
            </span>{" "}
            {t.categories.title2}
          </h2>
          <p className="mt-4 text-foreground-soft max-w-xl">
            {t.categories.intro}
          </p>

          {/* Pills de atalho pra cada nicho */}
          <div className="mt-6 md:mt-8 flex flex-wrap gap-2">
            {rows.map((cat) => (
              <a
                key={cat.slug}
                href={`#cat-${cat.slug}`}
                className="px-3.5 py-1.5 rounded-full bg-background border border-foreground/10 text-xs md:text-sm font-semibold text-foreground hover:bg-primary hover:text-primary-light hover:border-primary transition-colors"
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-10 md:space-y-14">
          {rows.map((cat) => (
            <CategoryRow key={cat.slug} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryRow({ category }: { category: LocalCategory }) {
  const t = useT();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const videos = VIDEOS.filter((v) => v.category === category.slug);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [videos.length]);

  const scrollByPage = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    // avança 1 página inteira (largura visível = ~4 cards no desktop)
    const amount = el.clientWidth * direction;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (videos.length === 0) {
    return (
      <motion.div
        id={`cat-${category.slug}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="scroll-mt-24"
      >
        <CategoryHeader category={category} count={0} />
        <div className="py-12 text-muted text-sm italic">
          {t.categories.comingSoon}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      id={`cat-${category.slug}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="group scroll-mt-24"
    >
      <CategoryHeader category={category} count={videos.length}>
        <div className="flex gap-2">
          <button
            aria-label="Anterior"
            onClick={() => scrollByPage(-1)}
            disabled={!canPrev}
            className="w-10 h-10 rounded-full border border-foreground/15 flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            aria-label="Próximo"
            onClick={() => scrollByPage(1)}
            disabled={!canNext}
            className="w-10 h-10 rounded-full border border-foreground/15 flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </CategoryHeader>

      <div
        ref={scrollerRef}
        className="flex gap-4 md:gap-6 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory scrollbar-hide"
      >
        {videos.map((v, i) => (
          <div
            key={v.id}
            className="flex-shrink-0 snap-start w-[calc((100%-1rem)/2)] sm:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-4.5rem)/4)]"
          >
            <VideoCard video={v} index={i} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CategoryHeader({
  category,
  count,
  children,
}: {
  category: LocalCategory;
  count: number;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5 md:mb-6">
      <div>
        <div className="flex items-baseline gap-3">
          <h3 className="font-display font-black text-2xl md:text-4xl tracking-tighter text-foreground">
            {category.name}
          </h3>
          <span className="font-display font-bold text-xs md:text-sm text-muted">
            {String(count).padStart(2, "0")}
          </span>
        </div>
        {category.tagline && (
          <p className="font-serif-accent italic text-foreground-soft text-sm md:text-base mt-1">
            {category.tagline}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
