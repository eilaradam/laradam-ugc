"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORIES, VIDEOS, type Category } from "@/data/content";
import VideoCard from "./VideoCard";

export default function CategoryGallery() {
  // todas as categorias menos "all"
  const rows = CATEGORIES.filter((c) => c.slug !== "all");

  return (
    <section
      id="categorias"
      className="px-6 md:px-12 py-20 md:py-32 bg-background-alt"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            Categorias
          </div>
          <h2 className="font-display font-black text-5xl md:text-7xl leading-[0.9] tracking-tighter max-w-4xl">
            Que tipo de{" "}
            <span className="font-serif-accent italic text-primary">
              conteúdo
            </span>{" "}
            você precisa?
          </h2>
          <p className="mt-4 text-foreground-soft max-w-xl">
            Navegue pelos nichos. Cada linha é uma especialidade — deslize pro
            lado pra ver mais.
          </p>
        </div>

        <div className="space-y-16 md:space-y-20">
          {rows.map((cat) => (
            <CategoryRow key={cat.slug} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryRow({ category }: { category: Category }) {
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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <CategoryHeader category={category} count={0} />
        <div className="py-12 text-muted text-sm italic">
          Em breve nessa categoria.
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="group"
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

      <div className="relative -mx-6 md:-mx-12">
        {/* Edge fades */}
        <div
          className={`pointer-events-none absolute top-0 bottom-0 left-0 w-12 md:w-16 bg-gradient-to-r from-background-alt to-transparent z-10 transition-opacity ${
            canPrev ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`pointer-events-none absolute top-0 bottom-0 right-0 w-12 md:w-16 bg-gradient-to-l from-background-alt to-transparent z-10 transition-opacity ${
            canNext ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          ref={scrollerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory scrollbar-hide px-6 md:px-12"
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
      </div>
    </motion.div>
  );
}

function CategoryHeader({
  category,
  count,
  children,
}: {
  category: Category;
  count: number;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5 md:mb-6">
      <div>
        <div className="flex items-baseline gap-3">
          <h3 className="font-display font-black text-3xl md:text-5xl tracking-tighter text-foreground">
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
