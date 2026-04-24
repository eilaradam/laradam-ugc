"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Camera,
  FileText,
  MessageSquare,
  Scissors,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type Step = {
  num: string;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  description: string;
  bullets: string[];
  duration: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    title: "Briefing estratégico",
    shortTitle: "Briefing",
    icon: MessageSquare,
    description:
      "A gente conversa pra entender a marca, o público, o objetivo da campanha e a métrica que importa. Sem briefing genérico.",
    bullets: [
      "Call de ~30min pra alinhar expectativa",
      "Análise do tom de voz e posicionamento",
      "Definição de KPI real (não só view)",
    ],
    duration: "~1 dia",
  },
  {
    num: "02",
    title: "Roteiro validado",
    shortTitle: "Roteiro",
    icon: FileText,
    description:
      "Escrevo o roteiro pensando em retenção dos 3 primeiros segundos. Você aprova antes de qualquer câmera ligar.",
    bullets: [
      "Hook testado em vídeos anteriores",
      "Estrutura de conversão (problema → solução → CTA)",
      "1 review incluso, revisões extras sob demanda",
    ],
    duration: "2-3 dias",
  },
  {
    num: "03",
    title: "Gravação cinematográfica",
    shortTitle: "Gravação",
    icon: Camera,
    description:
      "Luz natural, setup minimalista, direção de arte pensada pro produto aparecer no seu melhor ângulo.",
    bullets: [
      "Gravado em iPhone 15 Pro Max · 4K",
      "Múltiplas tomadas pra cada cena",
      "Captação de áudio limpa",
    ],
    duration: "1 dia",
  },
  {
    num: "04",
    title: "Edição performática",
    shortTitle: "Edição",
    icon: Scissors,
    description:
      "Cada corte pensado pra prender atenção. Legenda, ritmo e sound design que fazem o vídeo rodar como criativo de performance.",
    bullets: [
      "Cortes rítmicos (3-5 segundos)",
      "Legenda dinâmica estilo TikTok",
      "Trilha com direitos liberados",
    ],
    duration: "2-4 dias",
  },
  {
    num: "05",
    title: "Entrega + acompanhamento",
    shortTitle: "Entrega",
    icon: Sparkles,
    description:
      "Você recebe o vídeo nos formatos que precisa (9:16, 1:1, 16:9) + relatório dos primeiros dias rodando.",
    bullets: [
      "Formatos cortados pra cada plataforma",
      "Acompanhamento das métricas por 7 dias",
      "Sugestão de otimização pro próximo",
    ],
    duration: "1 dia",
  },
];

export default function Processo() {
  return (
    <>
      {/* Header */}
      <section className="px-6 md:px-12 py-12 md:py-20 max-w-7xl mx-auto">
        <div className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-primary" />
          Como eu trabalho
        </div>
        <h1 className="font-display font-black text-4xl md:text-7xl leading-[0.9] tracking-tighter max-w-4xl text-foreground">
          Do briefing até o{" "}
          <span className="font-serif-accent italic text-primary">
            vídeo rodando
          </span>
        </h1>
        <p className="mt-6 text-foreground-soft text-base md:text-lg max-w-2xl leading-relaxed">
          Processo de 5 passos que já rodou +500 vezes. Cada etapa existe pra
          eliminar surpresa e garantir que o vídeo entregue o que o brief
          prometeu.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="px-4 py-2 rounded-full bg-primary-light border border-primary/20">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Prazo médio: 7-10 dias
            </span>
          </div>
          <div className="px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10">
            <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
              1 revisão inclusa
            </span>
          </div>
        </div>
      </section>

      {/* Timeline vertical de passos */}
      <section className="px-6 md:px-12 pb-12 md:pb-20 max-w-7xl mx-auto">
        <div className="relative">
          {/* linha vertical conectando os passos */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-primary/20" />

          <div className="space-y-8 md:space-y-12">
            {STEPS.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 md:mt-20 p-8 md:p-12 rounded-3xl bg-foreground text-background text-center"
        >
          <div className="font-serif-accent italic text-primary text-lg md:text-xl mb-3">
            Pronto pra começar?
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl leading-[0.95] tracking-tighter mb-6">
            Vamos montar{" "}
            <span className="font-serif-accent italic text-primary">
              o roteiro
            </span>{" "}
            da sua próxima campanha.
          </h2>
          <a
            href="/#contato"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-light rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            Fale com a Lara
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </section>
    </>
  );
}

function StepCard({ step, index }: { step: Step; index: number }) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-16 md:pl-24"
    >
      {/* Círculo com ícone na linha */}
      <div className="absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary text-primary-light flex items-center justify-center shadow-lg">
        <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.8} />
      </div>

      {/* Conteúdo */}
      <div className="bg-background border border-foreground/10 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-display font-black text-primary text-sm tracking-widest">
                {step.num}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
                / {step.duration}
              </span>
            </div>
            <h3 className="font-display font-black text-2xl md:text-3xl text-foreground leading-tight tracking-tight">
              {step.title}
            </h3>
          </div>
        </div>

        <p className="text-foreground-soft text-sm md:text-base leading-relaxed mb-5">
          {step.description}
        </p>

        <ul className="space-y-2">
          {step.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-3 text-sm text-foreground"
            >
              <span className="flex-shrink-0 w-1 h-1 rounded-full bg-primary mt-2" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
