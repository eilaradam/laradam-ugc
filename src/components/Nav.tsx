"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLang, useT } from "@/lib/i18n";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [gestaoNotice, setGestaoNotice] = useState(false);
  const t = useT();
  const { lang, setLang } = useLang();

  const LINKS = [
    { href: "/#sobre", label: t.nav.sobre },
    { href: "/#servicos", label: t.nav.servicos },
    { href: "/#categorias", label: t.nav.categorias },
    { href: "/#contato", label: t.nav.contato },
  ];

  const GESTAO_LINK = { href: "/gestao", label: t.nav.gestao };

  const showGestaoNotice = () => {
    setGestaoNotice(true);
    window.setTimeout(() => setGestaoNotice(false), 2400);
  };

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
            data-track="nav_logo"
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
                data-track={`nav_link_${l.href.replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "")}`}
                className="text-xs uppercase tracking-[0.15em] text-foreground/70 hover:text-primary transition-colors font-medium"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <button
              type="button"
              onClick={showGestaoNotice}
              data-track="nav_gestao"
              className="hidden md:inline-flex text-xs uppercase tracking-[0.15em] font-medium text-foreground/70 hover:text-primary transition-colors cursor-pointer"
            >
              {GESTAO_LINK.label}
            </button>
            {/* Toggle PT/EN */}
            <div className="flex items-center text-[10px] md:text-xs font-bold uppercase tracking-wider border border-foreground/15 rounded-full overflow-hidden">
              <button
                onClick={() => setLang("pt")}
                data-track="lang_pt"
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
                data-track="lang_en"
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
              data-track="nav_trabalhe_comigo"
              className="text-[11px] md:text-xs font-semibold bg-foreground text-background px-4 md:px-5 py-2 md:py-2.5 hover:bg-primary transition-colors whitespace-nowrap"
            >
              {t.nav.trabalheComigo}
            </a>
            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Menu"
              data-track="mobile_menu_open"
              className="md:hidden w-9 h-9 text-foreground flex items-center justify-center hover:text-primary transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Gestão coming soon notice */}
      <AnimatePresence>
        {gestaoNotice && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 md:top-24 left-1/2 -translate-x-1/2 z-[70] pointer-events-none"
          >
            <div className="bg-foreground text-background text-xs md:text-sm font-semibold uppercase tracking-[0.18em] px-5 py-3 shadow-lg whitespace-nowrap">
              {t.nav.gestaoComingSoon}<span className="text-primary">.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  data-track={`mobile_nav_${l.href.replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "")}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="font-display font-black text-4xl tracking-tight hover:text-primary transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.button
                type="button"
                onClick={() => {
                  setOpen(false);
                  showGestaoNotice();
                }}
                data-track="mobile_nav_gestao"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + LINKS.length * 0.05 }}
                className="font-display font-black text-4xl tracking-tight hover:text-primary transition-colors text-left cursor-pointer"
              >
                {GESTAO_LINK.label}
              </motion.button>
            </nav>

            <div className="px-6 pb-10 space-y-4">
              <a
                href="#contato"
                onClick={() => setOpen(false)}
                data-track="mobile_trabalhe_comigo"
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
