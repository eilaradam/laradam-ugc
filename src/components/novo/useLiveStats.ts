"use client";

import { useEffect, useState } from "react";
import { FRENTE_PUBLI } from "@/data/novo";

export type LiveStats = {
  followers: number;
  reach_month: number;
  posts: number;
  updated_at: string | null;
  live: boolean; // true = veio do endpoint; false = fallback
};

// Endpoint público (cache de ~30 min) com os números reais do @eilaradam.
const ENDPOINT =
  "https://mfrmnquvwwuxraqgemyh.supabase.co/functions/v1/ig-public-stats";

const FALLBACK: LiveStats = {
  ...FRENTE_PUBLI.fallback,
  updated_at: null,
  live: false,
};

export function useLiveStats(): LiveStats {
  const [stats, setStats] = useState<LiveStats>(FALLBACK);

  useEffect(() => {
    let alive = true;
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    fetch(ENDPOINT, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => {
        if (!alive || !d || typeof d.followers !== "number") return;
        setStats({
          followers: d.followers,
          reach_month: d.reach_month,
          posts: d.posts,
          updated_at: d.updated_at || null,
          live: true,
        });
      })
      .catch(() => {
        /* mantém o fallback */
      })
      .finally(() => clearTimeout(t));
    return () => {
      alive = false;
      clearTimeout(t);
      ctrl.abort();
    };
  }, []);

  return stats;
}

// 16039 -> "16 mil" · 367702 -> "368 mil" · 1135241 -> "1,1M"
export function fmtBR(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(".", ",") + "M";
  if (n >= 10_000) return Math.round(n / 1000) + " mil";
  if (n >= 1_000) return (n / 1000).toFixed(1).replace(".", ",") + " mil";
  return String(n);
}

// 16039 -> "16.039"
export function fmtInteiro(n: number): string {
  return n.toLocaleString("pt-BR");
}
