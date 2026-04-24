"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ABOUT } from "@/data/content";

export default function About() {
  return (
    <section
      id="sobre"
      className="px-6 md:px-12 pt-8 md:pt-14 pb-6 md:pb-12 max-w-7xl mx-auto"
    >
      <div className="grid md:grid-cols-12 gap-8 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:col-span-5 md:sticky md:top-32 self-start"
        >
          <PhotoSlot />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="md:col-span-7"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            Sobre mim
          </div>

          <h2 className="font-display font-black text-3xl md:text-5xl text-foreground leading-[0.9] tracking-tighter mb-8 whitespace-nowrap">
            Oie, eu sou a{" "}
            <span className="text-primary font-serif-accent italic">
              Lara Dam
            </span>
          </h2>

          <p className="text-sm md:text-base text-foreground-soft leading-relaxed max-w-2xl">
            {ABOUT.body}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="px-5 py-3 rounded-full bg-primary-light border border-primary/20">
              <span className="text-sm font-semibold text-primary">
                +200 marcas parceiras
              </span>
            </div>
            <div className="px-5 py-3 rounded-full bg-foreground/5 border border-foreground/10">
              <span className="text-sm font-semibold text-foreground">
                Litoral de SP · Brasil
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PhotoSlot() {
  // Quando /public/lara-sobre.jpg existir, mostra a foto.
  // Se der erro (arquivo ainda não foi subido), mostra o placeholder.
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative">
      {/* Anotação: canto superior direito, rotacionada */}
      {!hasError && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 6 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -top-4 -right-2 md:-top-6 md:-right-6 z-10 pointer-events-none"
        >
          <div className="bg-primary-light border border-primary/30 rounded-2xl px-3 py-2 shadow-md">
            <div className="font-serif-accent italic text-primary text-sm md:text-base leading-none">
              +500 vídeos <span className="not-italic">✦</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Emoji câmera — flutua tipo handheld (lado esquerdo) */}
      {!hasError && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute top-1/4 -left-4 md:-left-8 z-10 pointer-events-none text-3xl md:text-4xl"
        >
          <motion.span
            animate={{
              y: [0, -8, 0, 4, 0],
              rotate: [0, 4, 0, -4, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block drop-shadow-md"
          >
            🎥
          </motion.span>
        </motion.div>
      )}

      {/* Emoji claquete — animação de "bater" (lado direito) */}
      {!hasError && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute top-2/3 -right-3 md:-right-8 z-10 pointer-events-none text-3xl md:text-4xl"
        >
          <motion.span
            animate={{ rotate: [-12, -2, -12, -2, -12] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
            className="inline-block origin-bottom-left drop-shadow-md"
          >
            🎬
          </motion.span>
        </motion.div>
      )}

      {/* Anotação: canto inferior esquerdo */}
      {!hasError && (
        <motion.div
          initial={{ opacity: 0, y: 10, rotate: -8 }}
          whileInView={{ opacity: 1, y: 0, rotate: 3 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -bottom-3 -left-3 md:-bottom-5 md:-left-6 z-10 pointer-events-none"
        >
          <div className="font-serif-accent italic text-foreground text-sm md:text-base bg-background border border-foreground/15 rounded-full px-3 py-1.5 shadow-sm">
            27 anos
          </div>
        </motion.div>
      )}

    <div className="aspect-[4/5] relative overflow-hidden rounded-3xl bg-foreground/5 border border-foreground/10">
      {!hasError ? (
        <img
          src="/lara-sobre.jpg"
          alt="Lara Dam, UGC Creator"
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-foreground/5" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="font-display font-black text-[16vw] md:text-[8vw] text-foreground/5">
              LD
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-background/80 backdrop-blur-sm border border-foreground/10">
            <div className="text-[10px] uppercase tracking-wider text-muted">
              Em breve
            </div>
            <div className="text-sm font-semibold text-foreground">
              Salve a foto em public/lara-sobre.jpg
            </div>
          </div>
        </>
      )}

      {/* Fraunces subtle caption over photo */}
      {!hasError && (
        <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-foreground/80 backdrop-blur-md text-background">
          <div className="text-[10px] uppercase tracking-[0.2em] text-background/60">
            Lara Dam
          </div>
          <div className="text-sm font-serif-accent italic">
            UGC Creator · est. 2024
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
