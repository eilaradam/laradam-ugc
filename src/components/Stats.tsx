"use client";

import { motion } from "framer-motion";
import { STATS } from "@/data/content";

export default function Stats() {
  return (
    <section className="px-6 md:px-12 py-14 md:py-32 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-6 flex items-center gap-3"
      >
        <span className="h-px w-8 bg-primary" />
        Os números
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-background p-6 md:p-10"
          >
            <div className="font-display font-black text-4xl md:text-6xl text-foreground tracking-tight">
              {s.value}
            </div>
            <div className="mt-2 text-xs md:text-sm uppercase tracking-wider text-muted">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
