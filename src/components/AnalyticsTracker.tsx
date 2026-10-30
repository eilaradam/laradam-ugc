"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/tracking";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  // Page view a cada mudança de rota
  useEffect(() => {
    if (!pathname) return;
    track("page_view", pathname);
  }, [pathname]);

  // Click delegado em qualquer elemento com data-track
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest("[data-track]") as HTMLElement | null;
      if (!el) return;
      const name = el.getAttribute("data-track");
      if (!name) return;
      const meta: Record<string, string> = {};
      const metaAttr = el.getAttribute("data-track-meta");
      if (metaAttr) meta.meta = metaAttr;
      track("button_click", name, meta);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true } as EventListenerOptions);
  }, []);

  // Até onde a visita chegou: marcos de rolagem e cada seção que apareceu na tela (uma vez por página)
  useEffect(() => {
    if (!pathname) return;
    const marcos = [25, 50, 75, 100];
    const vistos = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (window.scrollY / max) * 100;
      for (const m of marcos) {
        if (pct >= m - 2 && !vistos.has(m)) {
          vistos.add(m);
          track("button_click", `scroll_${m}`);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const secoes = new Set<string>();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).id;
          if (e.isIntersecting && id && !secoes.has(id)) {
            secoes.add(id);
            track("button_click", `secao_${id}`);
          }
        }
      },
      { threshold: 0.3 }
    );
    // espera a página montar antes de procurar as seções
    const t = setTimeout(() => {
      document.querySelectorAll("main section[id], main [id^='cat-']").forEach((el) => obs.observe(el));
    }, 500);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
      obs.disconnect();
    };
  }, [pathname]);

  return null;
}
