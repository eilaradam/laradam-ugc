"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLang, useT } from "@/lib/i18n";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const t = useT();
  const { lang, setLang } = useLang();

  const LINKS = [
    { href: "/#sobre", label: t.nav.sobre },
    { href: "/#servicos", label: t.nav.servicos },
    { href: "/#categorias", label: t.nav.categorias },
    { href: "/#contato", label: t.nav.contato },
  ];

  const GESTAO_LINK = { href: "/gestao", label: t.nav.gestao };

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-[0_4px_10px_0_rgba(0,0,0,0.3)] ${
          scrolled
            ? "bg-background/85 backdrop-blur-lg border-b border-foreground/10"
            : "bg-background/60 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 md:gap-6 px-5 md:px-8 py-3 md:py-3.5">
          <a
            href="#top"
            className="font-display font-black text-foreground text-sm md:text-base tracking-tight"
          >
            LARA DAM<span className="text-primary">.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs uppercase tracking-[0.15em] text-foreground/70 hover:text-primary transition-colors font-medium"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <a
              href={GESTAO_LINK.href}
              className="hidden md:inline-flex text-xs uppercase tracking-[0.15em] font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              {GESTAO_LINK.label}
            </a>
            {/* Toggle PT/EN */}
            <div className="flex items-center text-[10px] md:text-xs font-bold uppercase tracking-wider border border-foreground/15 rounded-full overflow-hidden">
              <button
                onClick={() => setLang("pt")}
                className={`px-2 py-1 transition-colors ${
                  lang === "pt"
                    ? "bg-foreground text-background"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                PT
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-1 transition-colors ${
                  lang === "en"
                    ? "bg-foreground text-background"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                EN
              </button>
            </div>
            <a
              href="/#contato"
              className="text-[11px] md:text-xs font-semibold bg-foreground text-background px-4 md:px-5 py-2 md:py-2.5 hover:bg-primary transition-colors whitespace-nowrap"
            >
              {t.nav.trabalheComigo}
            </a>
            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Menu"
              className="md:hidden w-9 h-9 text-foreground flex items-center justify-center hover:text-primary transition-colors"
            >
              <Menu className="w-5 h-5" />
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
                {t.nav.trabalheComigo}
              </a>
              <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                <button
                  onClick={() => setLang("pt")}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    lang === "pt"
                      ? "bg-background text-foreground"
                      : "text-background/60"
                  }`}
                >
                  PT
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    lang === "en"
                      ? "bg-background text-foreground"
                      : "text-background/60"
                  }`}
                >
                  EN
                </button>
              </div>
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
