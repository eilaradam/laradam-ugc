"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

export default function About() {
  const t = useT();
  return (
    <section
      id="sobre"
      className="px-6 md:px-12 pt-4 md:pt-8 pb-4 md:pb-8 max-w-7xl mx-auto"
    >
      <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
        {/* LEFT: foto limpa */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[4/5] max-w-[280px] md:max-w-[400px] mx-auto md:ml-auto md:mr-12 w-full"
        >
          <img
            src="/2.png"
            alt="Lara Dam"
            className="w-full h-full object-cover object-center rounded-2xl md:rounded-3xl"
          />
        </motion.div>

        {/* RIGHT: texto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-4 md:mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            {t.about.tag}
          </div>

          <h2 className="font-display font-black text-3xl md:text-5xl text-foreground leading-[0.95] tracking-tighter mb-4 md:mb-6">
            {t.about.greeting1}{" "}
            <span className="text-primary font-serif-accent italic">
              {t.about.greetingName}
            </span>
          </h2>

          <p className="text-sm md:text-base text-foreground-soft leading-relaxed max-w-xl">
            {t.about.body1}
          </p>

          <p className="mt-3 md:mt-4 text-sm md:text-base text-foreground-soft leading-relaxed max-w-xl">
            {t.about.body2}
          </p>

          <div className="mt-6 md:mt-8 flex flex-wrap gap-2 md:gap-3">
            <div className="px-4 md:px-5 py-2 md:py-3 rounded-full bg-primary-light border border-primary/20">
              <span className="text-xs md:text-sm font-semibold text-primary">
                {t.about.pillBrands}
              </span>
            </div>
            <div className="px-4 md:px-5 py-2 md:py-3 rounded-full bg-foreground/5 border border-foreground/10">
              <span className="text-xs md:text-sm font-semibold text-foreground">
                {t.about.pillLocation}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
