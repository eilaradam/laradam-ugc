"use client";

import { motion } from "framer-motion";
import { VIDEOS } from "@/data/content";
import VideoCard from "@/components/VideoCard";
import { PROJETO_RESULTADOS, PROJETO_VIDEOS_IDS } from "@/data/projeto";
import Cabecalho from "./Cabecalho";
import { ProjetoDepoimentos, ProjetoLogos } from "./ProjetoMarcas";

const videos = PROJETO_VIDEOS_IDS.map((id) =>
  VIDEOS.find((v) => v.id === id)
).filter((v): v is (typeof VIDEOS)[number] => Boolean(v));

export default function ProjetoProva() {
  return (
    <section className="bg-pj-bg2 px-5 py-14 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-[1400px]">
        <Cabecalho
          n="04"
          chapeu="Resultados"
          centro
          titulo="Não é teste. É o que as marcas já colheram comigo."
          className="mx-auto"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROJETO_RESULTADOS.map((r, i) => (
            <motion.div
              key={r.brand + r.metric}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-3xl bg-pj-paper p-7"
            >
              <p className="pj-display text-[3rem] text-pj-olive sm:text-[3.6rem]">
                {r.metric}
              </p>
              <p className="mt-2 text-[14px] leading-tight">{r.label}</p>
              <p className="mt-4 text-sm font-semibold">{r.brand}</p>
              <p className="mt-1 text-[13px] leading-snug text-pj-muted">{r.note}</p>
            </motion.div>
          ))}
        </div>

        {/* vídeos de casa e decoração */}
        <div className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="pj-label text-pj-muted">Casa e decoração</p>
              <h3 className="pj-display mt-4 max-w-[16ch] text-[1.8rem] sm:text-[2.4rem]">
                Esse nicho já é o meu terreno.
              </h3>
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-pj-muted">
              Alguns dos vídeos que já produzi pra marcas de casa, móveis,
              reforma e organização. Clique pra assistir.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {videos.map((v, i) => (
              <VideoCard key={v.id} video={v} index={i} />
            ))}
          </div>
        </div>

        {/* o que as marcas dizem */}
        <ProjetoDepoimentos />
        <div className="mt-10">
          <ProjetoLogos />
        </div>
      </div>
    </section>
  );
}
