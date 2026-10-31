"use client";

import { motion } from "framer-motion";
import { useLang, useT } from "@/lib/i18n";

// Menu em pílula preta flutuando no topo (versão laranja). No celular só logo + botão,
// porque os links ficam no MenuEmbaixo.
export default function NavLaranja() {
  const t = useT();
  const { lang, setLang } = useLang();
  const LINKS = [
    { href: "#top", label: lang === "en" ? "Home" : "Início" },
    { href: "#sobre", label: t.nav.sobre },
    { href: "#categorias", label: t.nav.categorias },
    { href: "#servicos", label: t.nav.servicos },
    { href: "/gestao", label: t.nav.gestao },
  ];

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-[calc(var(--barra-topo,0px)+12px)] left-0 right-0 z-50 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 rounded-full bg-foreground text-background pl-2 pr-2 py-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
        <a href="#top" data-track="nav_logo" className="flex items-center gap-2 pl-1">
          <span className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary text-primary-light flex items-center justify-center font-display font-extrabold text-base">
            L
          </span>
          <span className="font-display font-bold text-sm md:text-base tracking-tight">
            Lara Dam<span className="text-primary-light">.</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              data-track={`nav_link_${l.href.replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "")}`}
              className={`text-[13px] font-medium transition-colors ${i === 0 ? "text-primary-light" : "text-background/80 hover:text-primary-light"}`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center text-[10px] md:text-[11px] font-bold rounded-full border border-background/20 overflow-hidden">
            {(["pt", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                data-track={`lang_${l}`}
                className={`px-2.5 py-1.5 uppercase transition-colors ${lang === l ? "bg-background text-foreground" : "text-background/60 hover:text-background"}`}
              >
                {l}
              </button>
            ))}
          </div>
          <a
            href="#contato"
            data-track="nav_trabalhe_comigo"
            className="rounded-full bg-background text-foreground px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-[13px] font-semibold hover:bg-primary hover:text-primary-light transition-colors whitespace-nowrap"
          >
            {t.nav.trabalheComigo}
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
