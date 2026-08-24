"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Ornamento from "./Ornamento";

/** Cabeçalho das seções. `centro` deixa centralizado com ornamento em cima. */
export default function Cabecalho({
  n,
  chapeu,
  titulo,
  sub,
  dark = false,
  centro = false,
  className = "",
}: {
  n: string;
  chapeu: string;
  titulo: ReactNode;
  sub?: string;
  dark?: boolean;
  centro?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className={`${centro ? "flex flex-col items-center text-center" : ""} ${className}`}
    >
      {centro ? (
        <>
          <Ornamento
            className={`h-7 w-7 ${dark ? "text-pj-olive-soft" : "text-pj-olive-soft"}`}
          />
          <span
            className={`pj-label mt-5 ${dark ? "text-pj-bg/60" : "text-pj-muted"}`}
          >
            {n} · {chapeu}
          </span>
        </>
      ) : (
        <div className="flex items-center gap-3">
          <span className={`pj-label ${dark ? "text-pj-olive-soft" : "text-pj-terra"}`}>
            {n}
          </span>
          <span className={`pj-label ${dark ? "text-pj-bg/70" : "text-pj-muted"}`}>
            {chapeu}
          </span>
          <span className={`h-px flex-1 ${dark ? "bg-pj-bg/25" : "bg-pj-line"}`} />
        </div>
      )}

      <h2
        className={`pj-display mt-5 text-[2.2rem] sm:text-[3.2rem] lg:text-[3.9rem] ${
          centro ? "max-w-[20ch]" : "max-w-[16ch]"
        } ${dark ? "text-pj-bg" : "text-pj-ink"}`}
      >
        {titulo}
      </h2>

      {sub && (
        <p
          className={`mt-5 max-w-xl text-[15px] leading-relaxed sm:text-[17px] ${
            dark ? "text-pj-bg/70" : "text-pj-muted"
          }`}
        >
          {sub}
        </p>
      )}
    </motion.div>
  );
}
