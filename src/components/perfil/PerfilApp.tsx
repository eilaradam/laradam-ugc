"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { PERFIL, type Aba } from "@/data/perfil";
import Cabecalho from "./Cabecalho";
import Grade from "./Grade";
import Caras from "./Caras";
import DMs from "./DMs";
import Sobre from "./Sobre";
import Contato from "./Contato";

export type LiveStats = { followers: number; reach_month: number; posts: number; live: boolean };

type Ctx = {
  aba: Aba;
  setAba: (a: Aba) => void;
  busca: string;
  setBusca: (s: string) => void;
  stats: LiveStats;
  ir: (opts: { aba?: Aba; alvo?: string }) => void;
};
const PerfilCtx = createContext<Ctx | null>(null);
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

export default function PerfilApp() {
  const [aba, setAba] = useState<Aba>("feed");
  const [busca, setBuscaState] = useState("");
  const [stats, setStats] = useState<LiveStats>({ ...PERFIL.fallback, live: false });

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(ENDPOINT, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => { if (typeof d?.followers === "number") setStats({ followers: d.followers, reach_month: d.reach_month, posts: d.posts, live: true }); })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  // busca digitada leva pra aba de reels e filtra os vídeos
  const setBusca = useCallback((s: string) => {
    setBuscaState(s);
    if (s.trim()) setAba("reels");
  }, []);

  const ir = useCallback(({ aba: a, alvo }: { aba?: Aba; alvo?: string }) => {
    if (a) setAba(a);
    if (alvo) {
      requestAnimationFrame(() => {
        document.getElementById(alvo)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  return (
    <PerfilCtx.Provider value={{ aba, setAba, busca, setBusca, stats, ir }}>
      <Cabecalho />
      <main className="pf-wrap">
        <Grade />
        <Caras />
        <DMs />
        <Sobre />
        <Contato />
        <div className="pf-rodape">© {new Date().getFullYear()} Lara Dam · UGC creator & influenciadora · Litoral de SP · {PERFIL.email}</div>
      </main>
    </PerfilCtx.Provider>
  );
}
