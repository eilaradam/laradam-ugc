"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ABOUT } from "@/data/content";

export default function About() {
  return (
    <section
      id="sobre"
      className="px-6 md:px-12 pt-14 md:pt-32 pb-6 md:pb-12 max-w-7xl mx-auto"
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

          <h2 className="font-display font-black text-4xl md:text-6xl text-foreground leading-[0.9] tracking-tighter mb-8">
            {ABOUT.greeting.split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-3">
                {word === "Lara" || word === "Dam" ? (
                  <span className="text-primary font-serif-accent italic">
                    {word}
                  </span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h2>

          <p className="text-lg md:text-xl text-foreground-soft leading-relaxed max-w-2xl">
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
  );
}
