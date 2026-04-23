"use client";

import { motion } from "framer-motion";

type Result = {
  views: string;
  brand: string;
  title: string;
  platform?: string;
};

const RESULTS: Result[] = [
  {
    views: "50M",
    brand: "InfinitePay",
    title: "Bolsa",
    platform: "TikTok",
  },
  {
    views: "10M",
    brand: "Méliuz",
    title: "Compras",
    platform: "TikTok",
  },
  {
    views: "1M",
    brand: "Dolly",
    title: "Missão Impossível",
    platform: "TikTok",
  },
];

export default function BestResults() {
  return (
    <section
      id="destaques"
      className="px-6 md:px-12 py-14 md:py-32 bg-background relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-16 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            Os melhores resultados
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl leading-[0.9] tracking-tighter">
            Conteúdos que{" "}
            <span className="font-serif-accent italic text-primary">
              estouraram
            </span>
          </h2>
          <p className="mt-4 text-foreground-soft text-sm md:text-base max-w-lg">
            Criativos que saíram do feed e viraram fenômeno — milhões de views,
            milhares de compras, marcas que viraram parceiras de longo prazo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
          {RESULTS.map((r, i) => (
            <motion.div
              key={r.brand}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group relative p-8 md:p-10 bg-background transition-colors duration-300 ${
                i === 0 ? "md:bg-primary md:text-primary-light" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-8 md:mb-16">
                <span
                  className={`text-[10px] uppercase tracking-wider font-semibold ${
                    i === 0 ? "md:text-primary-light/70" : "text-muted"
                  }`}
                >
                  0{i + 1} / Top 3
                </span>
                {r.platform && (
                  <span
                    className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      i === 0
                        ? "md:border-primary-light/30 md:text-primary-light/80"
                        : "border-foreground/15 text-foreground-soft"
                    }`}
                  >
                    {r.platform}
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-display font-black text-7xl md:text-8xl leading-none tracking-tighter">
                  {r.views}
                </span>
                <span
                  className={`text-sm md:text-base font-medium ${
                    i === 0 ? "md:text-primary-light/80" : "text-foreground-soft"
                  }`}
                >
                  views
                </span>
              </div>

              <div className="mt-8 md:mt-10">
                <div
                  className={`text-[10px] uppercase tracking-[0.2em] mb-1 ${
                    i === 0 ? "md:text-primary-light/60" : "text-muted"
                  }`}
                >
                  {r.brand}
                </div>
                <div className="font-display font-bold text-xl md:text-2xl tracking-tight">
                  {r.title}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
