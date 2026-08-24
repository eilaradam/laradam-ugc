"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Cabeçalho editorial das seções: número, filete, chapéu e título grande. */
export default function Cabecalho({
  n,
  chapeu,
  titulo,
  sub,
  dark = false,
}: {
  n: string;
  chapeu: string;
  titulo: ReactNode;
  sub?: string;
  dark?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
    >
      <div className="flex items-center gap-4">
        <span
          className={`font-display text-sm ${
            dark ? "text-accent-on-dark" : "text-primary"
          }`}
        >
          {n}
        </span>
        <span
          className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${
            dark ? "text-accent-on-dark" : "text-primary"
          }`}
        >
          {chapeu}
        </span>
        <span
          className={`h-px flex-1 ${dark ? "bg-white/20" : "bg-foreground/15"}`}
        />
      </div>

      <h2
        className={`font-display mt-7 max-w-4xl text-[2.15rem] leading-[1.05] tracking-tight sm:text-[3.4rem] ${
          dark ? "text-white" : "text-foreground"
        }`}
      >
        {titulo}
      </h2>

      {sub && (
        <p
          className={`mt-5 max-w-2xl text-[15px] leading-relaxed sm:text-base ${
            dark ? "text-white/65" : "text-foreground-soft"
          }`}
        >
          {sub}
        </p>
      )}
    </motion.div>
  );
}
