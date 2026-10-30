"use client";

import { motion } from "framer-motion";
import { useVideoModal } from "@/components/VideoModalProvider";
import { SERVICOS, videoDoServico } from "./dados";

const mao = { fontFamily: "var(--font-caveat), cursive" };
const NOTAS = ["#FFE27A", "#DCEAEA", "#FFD9C7", "#E6E0F5"];

// Versão C: scrapbook. Papel pontilhado, cada serviço numa polaroid com fita,
// legenda à mão, post-it com o que entra e o resultado num selo carimbado.
export default function ServicosScrap({ id = "servicos" }: { id?: string }) {
  const { open } = useVideoModal();
  return (
    <section
      id={id}
      className="px-6 md:px-12 py-16 md:py-24 text-foreground"
      style={{ background: "#F4EFE6", backgroundImage: "radial-gradient(rgba(30,42,68,0.08) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-3xl md:text-4xl text-primary -rotate-2 mb-3" style={mao}>o que eu faço ✿</div>
        <h2 className="mt-2 font-display font-black text-4xl md:text-6xl leading-[0.95] tracking-tighter">
          O que podemos{" "}
          <span className="relative inline-block">
            criar
            <svg viewBox="0 0 300 30" className="absolute -bottom-2 left-0 w-full" fill="none" aria-hidden>
              <path d="M4 20 C 80 6, 200 4, 296 14" stroke="var(--primary)" strokeWidth="7" strokeLinecap="round" />
            </svg>
          </span>{" "}
          juntos?
        </h2>

        <div className="mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-14 md:gap-x-8">
          {SERVICOS.map((s, i) => {
            const video = videoDoServico(i);
            const rot = [-3, 2, -2, 3][i];
            return (
              <motion.div
                key={s.titulo}
                initial={{ opacity: 0, y: 24, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: rot }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative"
              >
                <button
                  type="button"
                  disabled={!video}
                  onClick={() => video && open(video)}
                  data-track={`servico_video_${i + 1}`}
                  className="relative block w-full bg-white p-2 md:p-3 pb-10 md:pb-14 shadow-xl text-left disabled:cursor-default"
                >
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-20 md:w-24 bg-[#E9DFC8]/90 shadow-sm rotate-[-4deg]"
                    style={{ clipPath: "polygon(3% 0,97% 4%,100% 96%,0 100%)" }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.capa} alt="" loading="lazy" className="w-full aspect-[4/5] object-cover object-top" />
                  <span className="absolute bottom-2 md:bottom-3 inset-x-2 text-center text-xl md:text-3xl leading-none" style={mao}>
                    {s.titulo.toLowerCase()}
                  </span>
                  {s.resultado && (
                    <span
                      className="absolute -top-4 -right-3 md:-right-4 w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-dashed border-primary bg-background/95 text-primary flex flex-col items-center justify-center text-center rotate-12 leading-none shadow"
                    >
                      <span className="font-display font-black text-sm md:text-base">{s.resultado.split(" ")[0]}</span>
                      <span className="text-[9px] md:text-[10px] font-bold uppercase mt-0.5">{s.resultado.split(" ").slice(1).join(" ")}</span>
                    </span>
                  )}
                </button>
                <div
                  className="relative mt-3 ml-auto w-[92%] p-3 md:p-4 shadow-md"
                  style={{ background: NOTAS[i], transform: `rotate(${-rot * 1.5}deg)` }}
                >
                  <p className="text-lg md:text-2xl leading-tight" style={mao}>{s.texto}</p>
                  <p className="mt-2 text-base md:text-xl" style={mao}>{s.tags.map((t) => `✓ ${t}`).join("  ")}</p>
                  <a href="#contato" data-track={`servico_quero_${i + 1}`} className="mt-2 inline-block text-xl md:text-2xl font-bold text-primary" style={mao}>
                    quero esse →
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
