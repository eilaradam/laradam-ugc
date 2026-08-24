"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Cabeçalho das seções: etiqueta com número e título grande em bold. */
export default function Cabecalho({
  n,
  chapeu,
  titulo,
  sub,
  dark = false,
  className = "",
}: {
  n: string;
  chapeu: string;
  titulo: ReactNode;
  sub?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className={className}
    >
      <div className="flex items-center gap-3">
        <span
          className={`pj-label ${dark ? "text-pj-olive-soft" : "text-pj-terra"}`}
        >
          {n}
        </span>
        <span
          className={`pj-label ${dark ? "text-pj-bg/70" : "text-pj-muted"}`}
        >
          {chapeu}
        </span>
        <span
          className={`h-px flex-1 ${dark ? "bg-pj-bg/25" : "bg-pj-line"}`}
        />
      </div>

      <h2
        className={`pj-display mt-6 max-w-[16ch] text-[2.4rem] sm:text-[3.6rem] lg:text-[4.4rem] ${
          dark ? "text-pj-bg" : "text-pj-ink"
        }`}
      >
        {titulo}
      </h2>

      {sub && (
        <p
          className={`mt-6 max-w-xl text-[15px] leading-relaxed sm:text-[17px] ${
            dark ? "text-pj-bg/70" : "text-pj-muted"
          }`}
        >
          {sub}
        </p>
      )}
    </motion.div>
  );
}
