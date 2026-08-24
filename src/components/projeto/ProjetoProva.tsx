"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { VIDEOS } from "@/data/content";
import VideoCard from "@/components/VideoCard";
import {
  PROJETO_ARGUMENTOS,
  PROJETO_RESULTADOS,
  PROJETO_VIDEOS_IDS,
} from "@/data/projeto";

function Icon({ name, className }: { name: string; className?: string }) {
  const C = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];
  return C ? <C className={className} /> : null;
}

const videos = PROJETO_VIDEOS_IDS.map((id) =>
  VIDEOS.find((v) => v.id === id)
).filter((v): v is (typeof VIDEOS)[number] => Boolean(v));

export default function ProjetoProva() {
  return (
    <>
      {/* Por que entrar no projeto */}
      <section className="bg-background px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary sm:text-xs">
            Por que entrar nesse projeto
          </p>
          <h2 className="font-display mt-4 max-w-3xl text-3xl leading-[1.1] tracking-tight sm:text-5xl">
            Uma reforma é o melhor contexto que existe pra mostrar um produto de casa.
          </h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {PROJETO_ARGUMENTOS.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-3xl border border-border bg-white/60 p-7 sm:p-8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-light">
                  <Icon name={a.icon} className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display mt-5 text-xl sm:text-2xl">{a.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground-soft">
                  {a.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resultados já entregues */}
      <section className="bg-background-alt px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary sm:text-xs">
            Resultados que já entreguei
          </p>
          <h2 className="font-display mt-4 max-w-3xl text-3xl leading-[1.1] tracking-tight sm:text-5xl">
            Não é teste. É o que as marcas já colheram comigo.
          </h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROJETO_RESULTADOS.map((r, i) => (
              <motion.div
                key={r.brand + r.metric}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex flex-col rounded-3xl bg-foreground p-7 text-white"
              >
                <p className="font-display text-4xl text-accent-on-dark sm:text-5xl">
                  {r.metric}
                </p>
                <p className="mt-2 text-sm leading-tight text-white/70">{r.label}</p>
                <div className="mt-auto pt-6">
                  <p className="text-sm font-semibold">{r.brand}</p>
                  <p className="mt-1 text-[13px] leading-snug text-white/55">
                    {r.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vídeos de casa e deco */}
      <section className="bg-background px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary sm:text-xs">
            Casa e decoração
          </p>
          <h2 className="font-display mt-4 max-w-3xl text-3xl leading-[1.1] tracking-tight sm:text-5xl">
            Esse nicho já é o meu terreno.
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-foreground-soft sm:text-base">
            Alguns dos vídeos que já produzi pra marcas de casa, móveis, organização e
            decoração. Clique pra assistir.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            {videos.map((v, i) => (
              <VideoCard key={v.id} video={v} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
