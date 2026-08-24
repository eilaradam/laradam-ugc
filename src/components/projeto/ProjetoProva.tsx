"use client";

import { motion } from "framer-motion";
import { VIDEOS } from "@/data/content";
import VideoCard from "@/components/VideoCard";
import {
  PROJETO_ARGUMENTOS,
  PROJETO_RESULTADOS,
  PROJETO_VIDEOS_IDS,
} from "@/data/projeto";
import Cabecalho from "./Cabecalho";
import { ProjetoDepoimentos, ProjetoLogos } from "./ProjetoMarcas";

const videos = PROJETO_VIDEOS_IDS.map((id) =>
  VIDEOS.find((v) => v.id === id)
).filter((v): v is (typeof VIDEOS)[number] => Boolean(v));

export default function ProjetoProva() {
  return (
    <>
      {/* Por que entrar */}
      <section className="bg-pj-bg px-5 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Cabecalho
            n="04"
            chapeu="Por que entrar"
            centro
            titulo="Uma reforma é o melhor lugar pra mostrar um produto de casa."
            className="mx-auto"
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {PROJETO_ARGUMENTOS.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-3xl border border-pj-line bg-pj-paper p-7 sm:p-9"
              >
                <span className="pj-label text-pj-terra">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="pj-display mt-3 text-[1.5rem] sm:text-[1.9rem]">
                  {a.title}
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-pj-muted">
                  {a.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resultados + vídeos */}
      <section className="bg-pj-bg2 px-5 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Cabecalho
            n="05"
            chapeu="Resultados"
            centro
            titulo="Não é teste. É o que as marcas já colheram comigo."
            className="mx-auto"
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                <p className="mt-1 text-[13px] leading-snug text-pj-muted">
                  {r.note}
                </p>
              </motion.div>
            ))}
          </div>

          {/* os vídeos que eu já entreguei */}
          <div className="mt-20 text-center">
            <span className="pj-label text-pj-muted">Casa e decoração</span>
            <h3 className="pj-display mx-auto mt-4 max-w-[18ch] text-[1.9rem] sm:text-[2.6rem]">
              Esse nicho já é o meu terreno.
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-pj-muted">
              Vídeos que já produzi pra marcas de casa, móveis, organização e
              decoração. Clique pra assistir.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {videos.map((v, i) => (
              <VideoCard key={v.id} video={v} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Feedback das marcas */}
      <section className="bg-pj-bg px-5 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Cabecalho
            n="06"
            chapeu="Feedback das marcas"
            centro
            titulo="O que elas falam depois de gravar comigo."
            className="mx-auto"
          />

          <ProjetoDepoimentos />

          <div className="mt-16">
            <ProjetoLogos />
          </div>
        </div>
      </section>
    </>
  );
}
