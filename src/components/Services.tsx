"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Camera,
  FileText,
  ShoppingBag,
  Sparkles,
  Target,
  Video,
  type LucideIcon,
} from "lucide-react";
import { SERVICES, type Service } from "@/data/content";

const ICONS: Record<string, LucideIcon> = {
  Video,
  Target,
  FileText,
  Camera,
  ShoppingBag,
  Sparkles,
};

export default function Services() {
  return (
    <section
      id="servicos"
      className="px-6 md:px-12 py-8 md:py-14 bg-background-alt"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 md:mb-8">
          <div>
            <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3 flex items-center gap-3">
              <span className="h-px w-6 md:w-8 bg-primary" />
              Serviços
            </div>
            <h2 className="font-display font-black text-3xl md:text-5xl leading-[0.9] tracking-tighter max-w-3xl text-foreground">
              O que podemos criar{" "}
              <span className="font-serif-accent italic text-primary">juntos</span>
            </h2>
          </div>
          <p className="text-foreground-soft max-w-sm text-xs md:text-sm">
            Pacotes flexíveis pra marcas que querem autoridade, conversão e um
            conteúdo que não parece anúncio.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-5 md:mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 md:p-5 rounded-2xl bg-background border border-foreground/10"
        >
          <div>
            <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-1">
              Pacote custom
            </div>
            <div className="font-display font-bold text-sm md:text-base leading-snug tracking-tight max-w-xl text-foreground">
              Tem uma ideia fora da caixa? Montamos o pacote do zero.
            </div>
          </div>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-light rounded-full text-xs md:text-sm font-semibold hover:bg-primary-dark transition-colors whitespace-nowrap"
          >
            Conversar
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = ICONS[service.icon] ?? Sparkles;
  const isHighlight = service.highlight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className={`relative rounded-2xl p-4 md:p-5 transition-all group ${
        isHighlight
          ? "bg-primary text-primary-light"
          : "bg-background border border-foreground/10 text-foreground hover:border-primary/40"
      }`}
    >
      {service.tag && (
        <div
          className={`absolute top-2.5 right-2.5 text-[8px] uppercase tracking-[0.15em] font-semibold px-1.5 py-0.5 rounded-full ${
            isHighlight
              ? "bg-primary-light/15 text-primary-light"
              : "bg-primary/10 text-primary"
          }`}
        >
          {service.tag}
        </div>
      )}

      <div
        className={`w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center mb-3 ${
          isHighlight
            ? "bg-primary-light/15 text-primary-light"
            : "bg-primary/10 text-primary"
        }`}
      >
        <Icon className="w-4 h-4" strokeWidth={1.8} />
      </div>

      <h3 className="font-display font-bold text-sm md:text-base tracking-tight mb-1">
        {service.title}
      </h3>

      <p
        className={`text-xs md:text-[13px] leading-snug ${
          isHighlight ? "text-primary-light/85" : "text-foreground-soft"
        }`}
      >
        {service.description}
      </p>
    </motion.div>
  );
}
