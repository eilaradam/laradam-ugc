"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS, type Testimonial } from "@/data/content";
import DebugLabel from "./DebugLabel";

export default function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="relative px-6 md:px-12 py-14 md:py-32 bg-background-alt"
    >
      <DebugLabel name="Testimonials" info="py-32 · px-12 · max-w-7xl · grid-cols-3 · gap-5" />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-16">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              Depoimentos
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl leading-[0.9] tracking-tighter max-w-3xl">
              O que dizem{" "}
              <span className="font-serif-accent italic text-primary">
                sobre o trabalho
              </span>
            </h2>
          </div>
          <p className="text-foreground-soft max-w-sm text-sm md:text-base">
            Feedback de marcas que viram a diferença de um UGC pensado pra
            performance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
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
  const logoUrl = testimonial.brandDomain
    ? `https://logo.clearbit.com/${testimonial.brandDomain}?size=128`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative p-6 md:p-8 rounded-3xl bg-background border border-foreground/5 flex flex-col gap-6 group hover:border-primary/30 transition-colors"
    >
      <Quote
        className="w-8 h-8 text-primary/25 group-hover:text-primary/60 transition-colors"
        strokeWidth={1.5}
      />

      <p className="text-foreground leading-relaxed text-sm md:text-base italic font-serif-accent">
        "{testimonial.quote}"
      </p>

      {testimonial.metric && (
        <div className="flex items-baseline gap-2 pt-4 border-t border-foreground/10">
          <span className="font-display font-black text-3xl md:text-4xl text-primary tracking-tight">
            {testimonial.metric.value}
          </span>
          <span className="text-xs uppercase tracking-wider text-foreground-soft">
            {testimonial.metric.label}
          </span>
        </div>
      )}

      <div className="flex items-center gap-3 mt-auto">
        <div className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center overflow-hidden flex-shrink-0">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={testimonial.brand}
              className="w-7 h-7 object-contain"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <span className="text-xs font-display font-bold text-foreground">
              {testimonial.brand[0]}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-foreground truncate">
            {testimonial.author}
          </div>
          <div className="text-xs text-muted truncate">
            {testimonial.role} · {testimonial.brand}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
