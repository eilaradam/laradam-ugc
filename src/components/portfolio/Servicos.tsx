"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useT } from "@/lib/i18n";

// Formatos que a marca pode contratar: lista simples, numerada, que leva pro contato.
export default function Servicos() {
  const t = useT();
  const s = t.services;
  return (
    <section id="servicos" className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-12 gap-10 md:gap-12">
        <div className="md:col-span-4">
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">{s.tag}</p>
          <h2 className="font-display font-black text-4xl md:text-5xl leading-[0.95] tracking-tighter text-foreground">
            {s.title1} {s.title2}{" "}
            <span className="font-serif-accent italic text-primary">{s.titleAccent}</span>?
          </h2>
          <p className="mt-5 text-foreground-soft text-base leading-relaxed">{s.intro}</p>
          <a
            href="#contato"
            data-track="servicos_cta"
            className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-primary transition-colors"
          >
            {t.hero.cta}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <ol className="md:col-span-8 grid sm:grid-cols-2 gap-px bg-foreground/10 rounded-2xl overflow-hidden border border-foreground/10">
          {s.items.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-background p-6 md:p-8"
            >
              <span className="font-display text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display font-bold text-xl md:text-2xl text-foreground">{item.title}</h3>
              <p className="mt-2 text-foreground-soft text-base leading-relaxed">{item.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
