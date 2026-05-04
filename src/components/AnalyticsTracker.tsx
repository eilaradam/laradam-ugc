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

  return null;
}
