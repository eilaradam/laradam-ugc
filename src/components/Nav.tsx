"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#destaques", label: "Destaques" },
  { href: "#categorias", label: "Categorias" },
  { href: "#marcas", label: "Marcas" },
  { href: "#contato", label: "Contato" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4"
    >
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 md:px-6 py-3 rounded-full transition-all duration-300 ${
          scrolled
            ? "bg-foreground/95 backdrop-blur-lg border border-foreground/10 shadow-lg"
            : "bg-foreground/80 backdrop-blur-md"
        }`}
      >
        <a
          href="#top"
          className="font-display font-black text-background text-sm md:text-base tracking-tight"
        >
          LARA DAM<span className="text-primary">.</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-[0.15em] text-background/80 hover:text-primary transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contato"
          className="text-xs md:text-sm font-semibold bg-primary text-primary-light px-4 py-2 rounded-full hover:bg-primary-dark transition-colors"
        >
          Trabalhe comigo
        </a>
      </div>
    </motion.nav>
  );
}
