"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { PERFIL } from "@/data/perfil";
import Cabecalho from "./Cabecalho";
import { Marcas, Publi, Resultados, Servicos, Videos } from "./Secoes";
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
        <Servicos />
        <Videos />
        <Publi />
        <Marcas />
        <DMs />
        <Contato />
        <footer className="pf-rodape">
          <div className="links">
            <a href={PERFIL.instagramUrl} target="_blank" rel="noopener">Instagram @{PERFIL.usuario}</a>
            <a href={PERFIL.tiktokUrl} target="_blank" rel="noopener">TikTok @{PERFIL.tiktok}</a>
            <a href="/gestao">Gestão de campanhas</a>
            <a href={`mailto:${PERFIL.email}`}>{PERFIL.email}</a>
          </div>
          <div>© {new Date().getFullYear()} Lara Dam · UGC creator & influenciadora · Litoral de SP</div>
        </footer>
      </main>
      {/* botão fixo de WhatsApp (só no celular) */}
      <a href={PERFIL.whatsappUrl} target="_blank" rel="noopener" className="pf-zap-fixo" data-track="perfil_zap_fixo" aria-label="Chamar a Lara no WhatsApp">💬 Chamar no WhatsApp</a>
    </PerfilCtx.Provider>
  );
}
