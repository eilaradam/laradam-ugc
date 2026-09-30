"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#ugc", label: "UGC", emoji: "🎬" },
  { href: "#publi", label: "Publi", emoji: "📱" },
  { href: "#sobre", label: "Sobre", emoji: "👋" },
  { href: "#contato", label: "Contato", emoji: "✉️" },
];

export default function NovoNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b-2 border-foreground transition-colors ${
          scrolled ? "bg-background" : "bg-background/90"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-5 md:px-8 py-3">
          <a href="#top" className="font-display font-black text-foreground text-base md:text-lg tracking-tight">
            LARA DAM<span className="text-primary">.</span>
          </a>

          <div className="hidden md:flex items-center gap-7">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs uppercase tracking-[0.15em] text-foreground/70 hover:text-primary transition-colors font-semibold"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contato"
              data-track="novo_nav_trabalhe_comigo"
              className="text-[11px] md:text-xs font-bold bg-foreground text-background px-4 md:px-5 py-2 md:py-2.5 rounded-md border-2 border-foreground whitespace-nowrap"
              style={{ boxShadow: "3px 3px 0 0 var(--primary)" }}
            >
              Trabalhe comigo
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Menu"
              className="md:hidden w-9 h-9 text-foreground flex items-center justify-center"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] md:hidden bg-foreground text-background flex flex-col"
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <span className="font-display font-black text-base tracking-tight">
                LARA DAM<span className="text-accent-on-dark">.</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar"
                className="w-10 h-10 rounded-md border border-background/20 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center gap-6 px-6">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display font-black text-4xl tracking-tight flex items-center gap-4"
                >
                  <span className="text-3xl">{l.emoji}</span>
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="px-6 pb-10 text-xs uppercase tracking-wider text-background/40 text-center">
              laradam.ugc@gmail.com · @eilaradam
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
