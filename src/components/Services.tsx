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
      className="px-6 md:px-12 py-14 md:py-32 bg-background-alt"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-16">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              Serviços
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl leading-[0.9] tracking-tighter max-w-3xl text-foreground">
              O que podemos criar{" "}
              <span className="font-serif-accent italic text-primary">juntos</span>
            </h2>
          </div>
          <p className="text-foreground-soft max-w-sm text-sm md:text-base">
            Pacotes flexíveis pra marcas que querem autoridade, conversão e um
            conteúdo que não parece anúncio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 md:mt-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 p-6 md:p-8 rounded-3xl bg-background border border-foreground/10"
        >
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-primary mb-2">
              Pacote custom
            </div>
            <div className="font-display font-black text-xl md:text-2xl leading-tight tracking-tight max-w-xl text-foreground">
              Tem uma ideia fora da caixa? Montamos o pacote do zero.
            </div>
          </div>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-light rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors whitespace-nowrap"
          >
            Conversar
            <ArrowUpRight className="w-4 h-4" />
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
      className={`relative rounded-3xl p-6 md:p-7 transition-all group ${
        isHighlight
          ? "bg-primary text-primary-light lg:col-span-1"
          : "bg-background border border-foreground/10 text-foreground hover:border-primary/40"
      }`}
    >
      {service.tag && (
        <div
          className={`absolute top-4 right-4 text-[9px] uppercase tracking-[0.15em] font-semibold px-2 py-0.5 rounded-full ${
            isHighlight
              ? "bg-primary-light/15 text-primary-light"
              : "bg-primary/10 text-primary"
          }`}
        >
          {service.tag}
        </div>
      )}

      <div
        className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-5 ${
          isHighlight
            ? "bg-primary-light/15 text-primary-light"
            : "bg-primary/10 text-primary"
        }`}
      >
        <Icon className="w-5 h-5" strokeWidth={1.8} />
      </div>

      <h3 className="font-display font-bold text-lg md:text-xl tracking-tight mb-1.5">
        {service.title}
      </h3>

      <p
        className={`text-sm leading-relaxed ${
          isHighlight ? "text-primary-light/85" : "text-foreground-soft"
        }`}
      >
        {service.description}
      </p>
    </motion.div>
  );
}
