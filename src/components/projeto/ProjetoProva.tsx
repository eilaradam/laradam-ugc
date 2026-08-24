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
import Cabecalho from "./Cabecalho";
import { ProjetoDepoimentos } from "./ProjetoMarcas";

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
      <section className="bg-background-alt px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Cabecalho
            n="02"
            chapeu="Por que entrar"
            titulo={
              <>
                Uma reforma é o melhor lugar do mundo pra mostrar um produto de
                casa.
              </>
            }
          />

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-border sm:grid-cols-2">
            {PROJETO_ARGUMENTOS.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="bg-background p-8 sm:p-10"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-light">
                  <Icon name={a.icon} className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display mt-6 text-2xl leading-tight sm:text-[1.7rem]">
                  {a.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground-soft">
                  {a.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resultados e depoimentos */}
      <section className="bg-background px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Cabecalho
            n="03"
            chapeu="Resultados"
            titulo={
              <>
                Não é teste. É o que as marcas{" "}
                <span className="font-serif-accent text-primary">já colheram</span>{" "}
                comigo.
              </>
            }
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROJETO_RESULTADOS.map((r, i) => (
              <motion.div
                key={r.brand + r.metric}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex flex-col rounded-3xl bg-foreground p-7 text-white"
              >
                <p className="font-display text-[2.75rem] leading-none text-accent-on-dark">
                  {r.metric}
                </p>
                <p className="mt-3 text-sm leading-tight text-white/70">
                  {r.label}
                </p>
                <div className="mt-auto pt-8">
                  <p className="text-sm font-semibold">{r.brand}</p>
                  <p className="mt-1 text-[13px] leading-snug text-white/55">
                    {r.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <ProjetoDepoimentos />
        </div>
      </section>

      {/* Vídeos de casa e deco */}
      <section className="bg-background-alt px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Cabecalho
            n="04"
            chapeu="Casa e decoração"
            titulo="Esse nicho já é o meu terreno."
            sub="Vídeos que já produzi pra marcas de casa, móveis, organização e decoração. Clique pra assistir."
          />

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            {videos.map((v, i) => (
              <VideoCard key={v.id} video={v} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
