"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { PERFIL } from "@/data/perfil";
import Cabecalho from "./Cabecalho";
import { Marcas, Publi, Resultados, Videos } from "./Secoes";
import DMs from "./DMs";
import Sobre from "./Sobre";
import Contato from "./Contato";

export type LiveStats = { followers: number; reach_month: number; posts: number; live: boolean };
const PerfilCtx = createContext<{ stats: LiveStats } | null>(null);
export function usePerfil() {
  const c = useContext(PerfilCtx);
  if (!c) throw new Error("usePerfil fora do PerfilApp");
  return c;
}

const ENDPOINT = "https://mfrmnquvwwuxraqgemyh.supabase.co/functions/v1/ig-public-stats";

export function fmtBR(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(".", ",") + "M";
  if (n >= 10_000) return Math.round(n / 1000) + " mil";
  if (n >= 1_000) return (n / 1000).toFixed(1).replace(".", ",") + " mil";
  return String(n);
}

// Página única que rola: cartão do perfil, depois cada bloco em ordem.
export default function PerfilApp() {
  const [stats, setStats] = useState<LiveStats>({ ...PERFIL.fallback, live: false });

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(ENDPOINT, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => { if (typeof d?.followers === "number") setStats({ followers: d.followers, reach_month: d.reach_month, posts: d.posts, live: true }); })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  return (
    <PerfilCtx.Provider value={{ stats }}>
      <Cabecalho />
      <main className="pf-wrap">
        <Sobre />
        <Resultados />
        <Videos />
        <Publi />
        <Marcas />
        <DMs />
        <Contato />
        <div className="pf-rodape">© {new Date().getFullYear()} Lara Dam · UGC creator & influenciadora · Litoral de SP · {PERFIL.email}</div>
      </main>
    </PerfilCtx.Provider>
  );
}
