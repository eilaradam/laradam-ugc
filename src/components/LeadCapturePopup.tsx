"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useT } from "@/lib/i18n";

const DISMISS_KEY = "lead-popup-dismissed-at";
const SUBMITTED_KEY = "lead-popup-submitted";
const DISMISS_DAYS = 7;
const SCROLL_THRESHOLD = 0.35; // 35% de scroll
const TIME_THRESHOLD_MS = 10_000; // 10 segundos

export default function LeadCapturePopup() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Track quando o popup aparece (impressão)
    if (open) {
      import("@/lib/tracking").then(({ track }) =>
        track("button_click", "popup_shown")
      );
    }
  }, [open]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Já enviou alguma vez? Não mostra mais.
    if (localStorage.getItem(SUBMITTED_KEY)) return;

    // Foi dismissed nos últimos 7 dias? Não mostra.
    const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || 0);
    if (dismissedAt && Date.now() - dismissedAt < DISMISS_DAYS * 86400_000) {
      return;
    }

    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setOpen(true);
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      if (window.scrollY / max >= SCROLL_THRESHOLD) trigger();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const timeout = setTimeout(trigger, TIME_THRESHOLD_MS);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timeout);
    };
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setOpen(false);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erro ao enviar");
      localStorage.setItem(SUBMITTED_KEY, "1");
      setSubmitted(true);
      setTimeout(() => setOpen(false), 2200);
    } catch {
      setError(t.popup.error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={dismiss}
            className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lara-popup fixed inset-x-4 bottom-4 md:inset-x-auto md:right-6 md:bottom-6 md:w-[380px] z-[81] bg-background rounded-3xl shadow-2xl border border-foreground/10 p-5 md:p-6"
          >
            <button
              onClick={dismiss}
              aria-label="Fechar"
              data-track="popup_close"
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-foreground/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {!submitted ? (
              <>
                <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-2">
                  {t.popup.tag}
                </div>
                <h3 className="font-display font-black text-foreground text-xl md:text-2xl leading-tight tracking-tight mb-2">
                  {t.popup.title}
                </h3>
                <p className="text-foreground-soft text-xs md:text-sm leading-relaxed mb-4">
                  {t.popup.body}
                </p>

                <form onSubmit={onSubmit} className="space-y-2.5">
                  <input
                    name="name"
                    placeholder={t.popup.name}
                    required
                    className="w-full bg-background border border-foreground/10 rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder={t.popup.email}
                    required
                    className="w-full bg-background border border-foreground/10 rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder={t.popup.phone}
                    className="w-full bg-background border border-foreground/10 rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                  />

                  {error && (
                    <div className="text-xs text-red-600">{error}</div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    data-track="popup_submit"
                    className="w-full bg-primary text-primary-light py-2.5 rounded-xl text-sm font-bold hover:bg-primary-dark transition-colors disabled:opacity-60"
                  >
                    {submitting ? t.popup.sending : t.popup.cta}
                  </button>
                  <p className="text-[10px] text-foreground/40 text-center pt-1">
                    {t.popup.privacy}
                  </p>
                </form>
              </>
            ) : (
              <div className="py-4 text-center">
                <div className="text-3xl mb-2">✨</div>
                <h3 className="font-display font-black text-foreground text-lg mb-1">
                  {t.popup.successTitle}
                </h3>
                <p className="text-foreground-soft text-sm">
                  {t.popup.successBody}
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
