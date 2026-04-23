"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/data/content";
import { ArrowUpRight } from "lucide-react";

export default function Services() {
  return (
    <section
      id="servicos"
      className="px-6 md:px-12 py-20 md:py-32 bg-foreground text-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              Serviços
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl leading-[0.9] tracking-tighter max-w-3xl">
              O que podemos criar{" "}
              <span className="font-serif-accent italic text-primary">juntos</span>
            </h2>
          </div>
          <p className="text-background/60 max-w-sm text-sm md:text-base">
            Pacotes flexíveis pra marcas que querem autoridade, conversão e um
            conteúdo que não parece anúncio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-background/10 border border-background/10">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative bg-foreground p-8 md:p-10 hover:bg-primary transition-colors duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-8">
                <span className="font-display font-bold text-xs text-background/40 group-hover:text-primary-light/60">
                  0{i + 1}
                </span>
                <ArrowUpRight className="w-5 h-5 text-background/30 group-hover:text-primary-light group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-display font-bold text-xl md:text-2xl mb-3 tracking-tight">
                {s.title}
              </h3>
              <p className="text-background/60 group-hover:text-primary-light/80 text-sm leading-relaxed">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
