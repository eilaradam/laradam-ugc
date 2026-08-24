"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { BRAND_LOGO_FILES, TESTIMONIALS } from "@/data/content";

const depoimentos = TESTIMONIALS.slice(0, 3);

/** Faixa de logos das marcas que já trabalharam com ela. */
export function ProjetoLogos() {
  const dobrado = [...BRAND_LOGO_FILES, ...BRAND_LOGO_FILES];

  return (
    <section className="overflow-hidden border-b border-border bg-background py-10 sm:py-12">
      <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
        Mais de 200 marcas já gravaram comigo
      </p>
      <div className="marquee-slow">
        {dobrado.map((file, i) => (
          <div
            key={`${file}-${i}`}
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-background-alt p-1.5 sm:h-20 sm:w-20"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/logo-1/${encodeURI(file)}`}
              alt="Marca parceira"
              loading="lazy"
              className="max-h-full max-w-full object-contain"
              onError={(e) => e.currentTarget.parentElement?.remove()}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/** Depoimentos de marcas que já trabalharam com ela. */
export function ProjetoDepoimentos() {
  return (
    <div className="mt-14 grid gap-5 lg:grid-cols-3">
      {depoimentos.map((d, i) => (
        <motion.figure
          key={d.brand}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.07 }}
          className="flex flex-col rounded-3xl border border-border bg-background p-7 sm:p-8"
        >
          <Quote className="h-6 w-6 text-primary/40" />
          <blockquote className="mt-5 text-[15px] leading-relaxed text-foreground">
            {d.quote}
          </blockquote>
          <figcaption className="mt-auto flex items-center gap-3 pt-7">
            {d.logoFile && (
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-background-alt p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/logo-1/${d.logoFile}`}
                  alt={d.brand}
                  className="max-h-full max-w-full object-contain"
                />
              </span>
            )}
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-foreground">
                {d.brand}
              </span>
              {/* usa o papel do trabalho (o número da métrica conflita com o
                  card de resultados: 50M no depoimento x 100M no vídeo) */}
              {d.role && (
                <span className="block text-[13px] text-muted">{d.role}</span>
              )}
            </span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
