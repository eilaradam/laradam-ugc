"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Camera,
  ChevronLeft,
  ChevronRight,
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

const SERVICE_CTAS: Record<string, string> = {
  "UGC de Conversão": "Quero UGC que converte",
  "Criativos para Tráfego": "Quero criar anúncios",
  "Roteiros Estratégicos": "Quero roteiros performáticos",
  "Fotos Lifestyle": "Quero fotos da minha marca",
  "Conteúdo E-commerce": "Quero conteúdo recorrente",
  "Consultoria UGC": "Quero uma consultoria",
};

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export default function Services() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollByPage = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * direction, behavior: "smooth" });
  };

  return (
    <section
      id="servicos"
      className="px-6 md:px-12 py-14 md:py-24 bg-background-alt"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header em 2 colunas */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-10 md:mb-14">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-5 flex items-center gap-3">
              Serviços
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <h2 className="font-display font-black uppercase tracking-tighter leading-[0.9] text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              O que podemos
              <br />
              criar{" "}
              <span className="font-serif-accent italic text-primary normal-case lowercase">
                juntos
              </span>
              :
            </h2>
          </div>

          <div className="md:pt-4">
            <p className="text-sm md:text-base uppercase tracking-wider text-foreground-soft leading-relaxed font-medium">
              Conheça os formatos em que minha gestão de campanhas UGC pode
              ajudar sua marca a conquistar mais clientes e gerar resultado
              de verdade.
            </p>
          </div>
        </div>

        {/* Carrossel horizontal com setas laterais e fade nas pontas */}
        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex gap-4 md:gap-5 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory scrollbar-hide services-fade py-2"
          >
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className="flex-shrink-0 snap-center w-[78%] sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3rem)/4)]"
              >
                <ServiceCard service={s} index={i} />
              </div>
            ))}
          </div>

          {/* Setas laterais sobrepostas */}
          <button
            onClick={() => scrollByPage(-1)}
            disabled={!canPrev}
            aria-label="Anterior"
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background border-2 border-foreground/15 items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground disabled:opacity-0 disabled:pointer-events-none transition-all shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollByPage(1)}
            disabled={!canNext}
            aria-label="Próximo"
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background border-2 border-foreground/15 items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground disabled:opacity-0 disabled:pointer-events-none transition-all shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dica de scroll no mobile */}
        <div className="mt-6 text-center md:hidden">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">
            Deslize pro lado →
          </span>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = ICONS[service.icon] ?? Sparkles;
  const cta = SERVICE_CTAS[service.title] ?? "Quero saber mais";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group h-full flex flex-col bg-background border border-foreground/10 rounded-2xl p-5 md:p-6 hover:border-primary/40 hover:shadow-lg transition-all"
    >
      <div className="mb-4">
        <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-primary-light flex items-center justify-center">
          <Icon
            className="w-5 h-5 md:w-6 md:h-6 text-primary"
            strokeWidth={1.75}
          />
        </div>
      </div>

      <h3 className="font-display font-black text-foreground text-base md:text-lg leading-tight tracking-tight mb-2">
        {service.title}
      </h3>

      <p className="text-foreground-soft text-xs md:text-sm leading-relaxed mb-5">
        {service.description}
      </p>

      <a
        href="#contato"
        className="mt-auto inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-[10px] md:text-xs hover:gap-2.5 transition-all"
      >
        <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
        <span>{cta}</span>
      </a>
    </motion.div>
  );
}
