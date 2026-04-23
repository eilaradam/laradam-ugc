"use client";

import { motion } from "framer-motion";
import { BRANDS } from "@/data/content";

export default function Brands() {
  return (
    <section id="marcas" className="px-6 md:px-12 py-20 md:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-primary" />
          Marcas parceiras
        </div>
        <h2 className="font-display font-black text-5xl md:text-7xl leading-[0.9] tracking-tighter mb-4 max-w-4xl">
          Elas já apostaram em mim.{" "}
          <span className="font-serif-accent italic text-primary">
            Você será a próxima?
          </span>
        </h2>
        <p className="text-foreground-soft max-w-xl mb-12 md:mb-16">
          Uma amostra das +200 marcas que já trabalhamos juntas — de startups a
          gigantes do mercado.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="bg-background py-10 md:py-14 flex items-center justify-center hover:bg-primary-light transition-colors group"
            >
              <span className="font-display font-bold text-xl md:text-2xl text-foreground/60 group-hover:text-primary transition-colors tracking-tight">
                {brand}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
