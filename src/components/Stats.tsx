"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { STATS } from "@/data/content";

export default function Stats() {
  return (
    <section className="px-6 md:px-12 py-8 md:py-10 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 md:gap-x-8 md:divide-x md:divide-foreground/10"
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="flex flex-col md:pl-6 first:md:pl-0"
          >
            <div className="font-display font-black text-2xl md:text-3xl text-foreground tracking-tight leading-none">
              <AnimatedValue value={s.value} />
            </div>
            <div className="mt-1 text-[11px] md:text-xs uppercase tracking-[0.15em] text-muted">
              {s.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/**
 * Recebe strings tipo "500+", "100M+", "2 anos" e anima o número de 0 até o valor,
 * preservando o sufixo. Dispara quando entra no viewport.
 */
function AnimatedValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [display, setDisplay] = useState("0");

  const parsed = parseStatValue(value);

  useEffect(() => {
    if (!inView) return;
    if (parsed.target === null) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, parsed.target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        const n = Math.round(v);
        setDisplay(`${parsed.prefix}${n}${parsed.suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, parsed.target, parsed.prefix, parsed.suffix, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}

/**
 * Separa "500+" → { target: 500, suffix: "+" }
 *        "100M+" → { target: 100, suffix: "M+" }
 *        "2 anos" → { target: 2, suffix: " anos" }
 */
function parseStatValue(value: string): {
  target: number | null;
  prefix: string;
  suffix: string;
} {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  if (!match) return { target: null, prefix: "", suffix: "" };
  const [, prefix, num, suffix] = match;
  const n = Number(num);
  if (Number.isNaN(n)) return { target: null, prefix: "", suffix: "" };
  return { target: n, prefix, suffix };
}
