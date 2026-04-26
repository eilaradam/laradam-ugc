"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS, type Testimonial } from "@/data/content";

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

function BrandLogo({
  brand,
  domain,
}: {
  brand: string;
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

  if (!domain || errored) {
    return (
      <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center flex-shrink-0 font-display font-black text-xs tracking-tight">
        {initials}
      </div>
    );
  }

  return (
    <div className="w-10 h-10 rounded-full bg-background border border-foreground/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://logo.clearbit.com/${domain}`}
        alt={brand}
        width={40}
        height={40}
        className="w-full h-full object-contain"
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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative p-5 rounded-2xl bg-background border border-foreground/5 flex flex-col gap-4 group hover:border-primary/30 transition-colors"
    >
      <div className="flex items-center gap-3">
        <BrandLogo brand={testimonial.brand} domain={testimonial.brandDomain} />
        <div className="min-w-0 flex-1">
          <div className="font-display font-black text-foreground text-sm tracking-tight truncate">
            {testimonial.brand}
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3 fill-primary text-primary"
                strokeWidth={0}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="text-foreground-soft leading-relaxed text-xs md:text-sm">
        {testimonial.quote}
      </p>

      {testimonial.metric && (
        <div className="flex items-baseline gap-2 pt-3 border-t border-foreground/10 mt-auto">
          <span className="font-display font-black text-xl text-primary tracking-tight">
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
