"use client";

import { motion } from "framer-motion";
import { BRANDS, type Brand } from "@/data/content";
import DebugLabel from "./DebugLabel";

export default function Brands() {
  return (
    <section id="marcas" className="relative px-6 md:px-12 py-14 md:py-32">
      <DebugLabel name="Brands" info="py-32 · px-12 · max-w-7xl · grid-cols-5 (20 logos, aspect 5:3)" />
      <div className="max-w-7xl mx-auto">
        <div className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-primary" />
          Marcas parceiras
        </div>
        <h2 className="font-display font-black text-4xl md:text-6xl leading-[0.9] tracking-tighter mb-4 max-w-4xl">
          Elas já apostaram em mim.{" "}
          <span className="font-serif-accent italic text-primary">
            Você será a próxima?
          </span>
        </h2>
        <p className="text-foreground-soft max-w-xl mb-10 md:mb-16">
          Uma amostra das +200 marcas que já trabalhamos juntas — de startups a
          gigantes do mercado.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-foreground/10 border border-foreground/10">
          {BRANDS.map((brand, i) => (
            <BrandCell key={brand.name} brand={brand} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandCell({ brand, index }: { brand: Brand; index: number }) {
  const logoUrl = brand.domain
    ? `https://logo.clearbit.com/${brand.domain}?size=200`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="bg-background aspect-[5/3] flex items-center justify-center hover:bg-primary-light transition-colors group p-6 md:p-8 relative overflow-hidden"
    >
      {logoUrl ? (
        <>
          <img
            src={logoUrl}
            alt={brand.name}
            loading="lazy"
            className="max-w-full max-h-full object-contain transition-all duration-300 filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100"
            onError={(e) => {
              // Se Clearbit falhar, mostra o nome da marca como fallback
              e.currentTarget.style.display = "none";
              const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = "flex";
            }}
          />
          <span className="hidden absolute inset-0 items-center justify-center font-display font-bold text-base md:text-lg text-foreground/60 group-hover:text-primary transition-colors tracking-tight text-center px-2">
            {brand.name}
          </span>
        </>
      ) : (
        <span className="font-display font-bold text-base md:text-lg text-foreground/60 group-hover:text-primary transition-colors tracking-tight text-center">
          {brand.name}
        </span>
      )}
    </motion.div>
  );
}
