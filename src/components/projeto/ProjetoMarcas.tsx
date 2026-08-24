"use client";

import { motion } from "framer-motion";
import { BRAND_LOGO_FILES, TESTIMONIALS } from "@/data/content";

const depoimentos = TESTIMONIALS.slice(0, 3);

/** Faixa com as logos das marcas que já gravaram com ela. */
export function ProjetoLogos() {
  const dobrado = [...BRAND_LOGO_FILES, ...BRAND_LOGO_FILES];

  return (
    <div className="overflow-hidden border-y border-pj-line py-8">
      <p className="pj-label mb-7 text-center text-pj-muted">
        Mais de 200 marcas já gravaram comigo
      </p>
      <div className="marquee-slow">
        {dobrado.map((file, i) => (
          <div
            key={`${file}-${i}`}
            className="flex h-14 w-24 shrink-0 items-center justify-center px-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/logo-1/${encodeURI(file)}`}
              alt="Marca parceira"
              loading="lazy"
              className="max-h-full max-w-full object-contain opacity-70 mix-blend-multiply"
              onError={(e) => e.currentTarget.parentElement?.remove()}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Depoimentos de marcas, em colunas com filete. */
export function ProjetoDepoimentos() {
  return (
    <div className="mt-16 grid gap-4 lg:grid-cols-3">
      {depoimentos.map((d, i) => (
        <motion.figure
          key={d.brand}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.07 }}
          className="rounded-3xl border border-pj-line bg-pj-paper p-7 sm:p-8"
        >
          <blockquote className="text-[16px] leading-relaxed sm:text-[17px]">
            {d.quote}
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            {d.logoFile && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`/logo-1/${d.logoFile}`}
                alt={d.brand}
                className="h-8 w-8 object-contain mix-blend-multiply"
              />
            )}
            <span className="min-w-0 leading-tight">
              <span className="block text-sm font-semibold">{d.brand}</span>
              {d.role && (
                <span className="block text-[13px] text-pj-muted">{d.role}</span>
              )}
            </span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
