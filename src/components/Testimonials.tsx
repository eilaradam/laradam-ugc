"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS, type Testimonial } from "@/data/content";

// Emoji de pessoa rotativo por índice (substitui foto/logo no avatar)
const AVATAR_EMOJIS = ["👩‍💼", "🧑‍💼", "👨‍💼"];

export default function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="px-6 md:px-12 py-8 md:py-14 bg-background-alt"
    >
      <div className="max-w-4xl mx-auto">
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

        <div className="grid md:grid-cols-3 gap-3">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.brand} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  const emoji = AVATAR_EMOJIS[index % AVATAR_EMOJIS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative p-4 md:p-5 rounded-2xl bg-background border border-foreground/5 flex flex-col gap-4 group hover:border-primary/30 transition-colors"
    >
      <Quote
        className="w-5 h-5 text-primary/25 group-hover:text-primary/60 transition-colors"
        strokeWidth={1.5}
      />

      <p className="text-foreground leading-snug text-xs md:text-sm italic font-serif-accent">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {testimonial.metric && (
        <div className="flex items-baseline gap-2 pt-3 border-t border-foreground/10">
          <span className="font-display font-black text-xl md:text-2xl text-primary tracking-tight">
            {testimonial.metric.value}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-foreground-soft">
            {testimonial.metric.label}
          </span>
        </div>
      )}

      <div className="flex items-center gap-2.5 mt-auto">
        <div className="w-8 h-8 rounded-full bg-primary-light border border-primary/15 flex items-center justify-center flex-shrink-0 text-base">
          <span aria-hidden>{emoji}</span>
        </div>
        <div className="min-w-0">
          <div className="text-xs font-semibold text-foreground truncate">
            {testimonial.author}
          </div>
          <div className="text-[10px] text-muted truncate">
            {testimonial.role} · {testimonial.brand}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
