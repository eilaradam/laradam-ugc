"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { HeroPhoto } from "@/components/heroes/_shared";
import { SITE } from "@/data/content";
import { useT } from "@/lib/i18n";
import { WhatsAppIcon } from "./icones";

// Capa do portfólio: quem é, o que entrega e os números, sem enfeite em volta.
// Os números moram aqui (antes eram uma faixa separada logo abaixo).
export default function Capa() {
  const t = useT();
  return (
    <section id="top" className="bg-background pt-24 md:pt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-8 md:gap-12 items-end">
        <div className="md:col-span-7 pb-10 md:pb-20">
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-6"
          >
            {t.hero.badge}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-foreground leading-[0.95] tracking-tighter text-5xl md:text-7xl lg:text-[5.5rem]"
          >
            {t.hero.title1} {t.hero.title2}{" "}
            <span className="font-serif-accent italic text-primary">{t.hero.titleAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-6 text-foreground-soft text-base md:text-lg leading-relaxed max-w-md"
          >
            {t.hero.body1}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#categorias"
              data-track="capa_ver_videos"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-foreground text-background text-sm md:text-base font-semibold hover:bg-primary transition-colors"
            >
              {t.hero.ctaVideos}
              <ArrowDown className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener"
              data-track="capa_whatsapp"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-foreground/20 text-foreground text-sm md:text-base font-semibold hover:border-foreground transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              {t.hero.ctaWhats}
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 grid grid-cols-4 gap-6 border-t border-foreground/10 pt-6 max-w-2xl"
          >
            {t.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display font-black text-2xl md:text-4xl text-foreground tracking-tight">
                  {s.value}
                </dd>
                <dd className="mt-1 text-[11px] md:text-xs uppercase tracking-[0.12em] text-muted">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 flex justify-center md:justify-end self-end"
        >
          <HeroPhoto className="lara-hero-photo w-auto h-[52vh] md:h-[78vh] max-h-[760px] max-w-full object-contain object-bottom" />
        </motion.div>
      </div>
    </section>
  );
}
