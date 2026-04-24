"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#categorias", label: "Categorias" },
  { href: "/#contato", label: "Contato" },
];

const GESTAO_LINK = { href: "/gestao", label: "Gestão" };

export default function Nav() {
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
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-3 md:px-8 pt-3 md:pt-4"
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between gap-3 md:gap-6 px-3 md:px-6 py-2.5 md:py-3 rounded-full transition-all duration-300 ${
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

          {/* Desktop links */}
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

          <div className="flex items-center gap-2">
            <a
              href={GESTAO_LINK.href}
              className="hidden md:inline-flex text-[11px] md:text-sm font-semibold border border-background/20 text-background px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-background hover:text-foreground transition-colors whitespace-nowrap"
            >
              {GESTAO_LINK.label}
            </a>
            <a
              href="/#contato"
              className="text-[11px] md:text-sm font-semibold bg-primary text-primary-light px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-primary-dark transition-colors whitespace-nowrap"
            >
              Trabalhe comigo
            </a>
            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Menu"
              className="md:hidden w-9 h-9 rounded-full border border-background/15 text-background flex items-center justify-center hover:bg-background hover:text-foreground transition-colors"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
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
                LARA DAM<span className="text-primary">.</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar"
                className="w-10 h-10 rounded-full border border-background/15 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center gap-6 px-6">
              {[...LINKS, GESTAO_LINK].map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="font-display font-black text-4xl tracking-tight hover:text-primary transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>

            <div className="px-6 pb-10 space-y-4">
              <a
                href="#contato"
                onClick={() => setOpen(false)}
                className="block w-full text-center bg-primary text-primary-light px-6 py-4 rounded-full font-semibold"
              >
                Trabalhe comigo
              </a>
              <div className="text-xs uppercase tracking-wider text-background/40 text-center">
                laradam.ugc@gmail.com · @eilaradam
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
