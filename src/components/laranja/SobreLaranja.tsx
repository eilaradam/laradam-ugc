"use client";

import { motion } from "framer-motion";
import { useLang, useT } from "@/lib/i18n";
import { Brilho, Etiqueta, Risquinhos } from "./pecas";

// Renderiza **trecho** como <strong>
function renderBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-background">{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

// "Quem é a Lara?" em fundo preto, foto num quadro laranja com etiquetas por cima.
export default function SobreLaranja() {
  const t = useT();
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section id="sobre" className="bg-foreground text-background px-5 md:px-8 py-16 md:py-24 border-t-4 border-primary">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto w-full max-w-[340px] md:max-w-[400px]"
        >
          <div className="relative rounded-[2rem] bg-primary pt-8 px-8 overflow-hidden">
            <Brilho className="absolute top-5 left-5 w-6 h-6 text-foreground" />
            <Brilho className="absolute bottom-24 right-5 w-4 h-4 text-foreground/70" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/lara-fundo.png" alt="Lara Dam" className="relative w-full h-auto" />
          </div>
          <span className="absolute -left-3 bottom-16 -rotate-6 rounded-full bg-foreground text-background border-2 border-background px-3.5 py-1.5 text-xs font-semibold">
            UGC Creator
          </span>
          <span className="absolute -right-3 bottom-8 rotate-3 rounded-full bg-background text-foreground border-2 border-foreground px-3.5 py-1.5 text-xs font-semibold">
            Content Strategist
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <Etiqueta escuro>{t.about.tag}</Etiqueta>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight leading-[1.05]">
            {en ? "Who is " : "Quem é a "}
            <span className="relative inline-block text-accent-on-dark">
              Lara?
              <Risquinhos className="absolute -right-7 -top-2 w-7 h-7 text-background" />
            </span>
          </h2>
          <p className="mt-5 text-sm md:text-base text-background/70 leading-relaxed max-w-xl">{renderBold(t.about.body1)}</p>
          <p className="mt-3 text-sm md:text-base text-background/70 leading-relaxed max-w-xl">{renderBold(t.about.body2)}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary text-foreground px-4 py-2 text-sm font-semibold">{t.about.pillBrands}</span>
            <span className="rounded-full border border-background/25 px-4 py-2 text-sm font-semibold">{t.about.pillLocation}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
