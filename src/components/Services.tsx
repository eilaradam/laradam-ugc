"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Camera,
  Check,
  FileText,
  ShoppingBag,
  Sparkles,
  Target,
  Video,
  type LucideIcon,
} from "lucide-react";
import { SERVICES, type Service } from "@/data/content";
import DebugLabel from "./DebugLabel";

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
      className="relative px-6 md:px-12 py-14 md:py-32 bg-foreground text-background"
    >
      <DebugLabel name="Services" info="py-32 · px-12 · max-w-7xl · gap-5 grid-cols-3" />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-16">
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

        {/* Bento grid: card highlight ocupa 2 colunas no desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>

        {/* CTA abaixo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 md:mt-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 md:p-10 rounded-3xl bg-primary text-primary-light"
        >
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-primary-light/70 mb-2">
              Pacote custom
            </div>
            <div className="font-display font-black text-2xl md:text-4xl leading-tight tracking-tight max-w-xl">
              Tem uma ideia fora da caixa? Montamos o pacote do zero pra sua marca.
            </div>
          </div>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-light text-primary rounded-full font-semibold hover:bg-background transition-colors whitespace-nowrap"
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
      className={`relative rounded-3xl p-6 md:p-8 border transition-all cursor-default group ${
        isHighlight
          ? "bg-primary text-primary-light border-primary lg:col-span-2 lg:row-span-1"
          : "bg-foreground border-background/10 hover:border-primary/50"
      }`}
    >
      {/* Tag (ex: "Mais pedido") */}
      {service.tag && (
        <div className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.15em] font-semibold px-2.5 py-1 rounded-full bg-background/20 text-background backdrop-blur">
          {service.tag}
        </div>
      )}

      {/* Header com ícone e número */}
      <div className="flex items-start justify-between mb-6">
        <div
          className={`w-11 h-11 md:w-12 md:h-12 rounded-2xl flex items-center justify-center ${
            isHighlight
              ? "bg-primary-light/15 text-primary-light"
              : "bg-primary/15 text-primary"
          }`}
        >
          <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.8} />
        </div>
        <span
          className={`font-display font-bold text-xs ${
            isHighlight ? "text-primary-light/50" : "text-background/30"
          }`}
        >
          0{index + 1}
        </span>
      </div>

      <h3 className="font-display font-bold text-xl md:text-2xl mb-2 tracking-tight">
        {service.title}
      </h3>

      <p
        className={`text-sm leading-relaxed mb-5 ${
          isHighlight ? "text-primary-light/80" : "text-background/60"
        }`}
      >
        {service.description}
      </p>

      {/* Features list */}
      <ul className="space-y-1.5">
        {service.features.map((f) => (
          <li
            key={f}
            className={`flex items-start gap-2 text-xs md:text-sm ${
              isHighlight ? "text-primary-light/90" : "text-background/70"
            }`}
          >
            <Check
              className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                isHighlight ? "text-primary-light" : "text-primary"
              }`}
              strokeWidth={2.5}
            />
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
