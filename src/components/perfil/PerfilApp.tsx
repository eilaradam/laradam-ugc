"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { FAIXA, NAV, PERFIL } from "@/data/perfil";
import Cabecalho, { type CabConfig } from "./Cabecalho";
import Rodape from "./Rodape";
import { Audiencia, Marcas, Publi, Resultados, Servicos } from "./Secoes";
import DMs from "./DMs";
import Sobre from "./Sobre";
import Contato from "./Contato";

export type LiveStats = { followers: number; reach_month: number; posts: number; engagement_rate: number | null; live: boolean };
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
      .then((d) => { if (typeof d?.followers === "number") setStats({ followers: d.followers, reach_month: d.reach_month, posts: d.posts, engagement_rate: typeof d?.engagement_rate === "number" ? d.engagement_rate : null, live: true }); })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  const cab: CabConfig = {
    usuario: PERFIL.usuario,
    avatar: PERFIL.avatar,
    cta: { rotulo: "💬 Trabalhe comigo", href: PERFIL.whatsappUrl, track: "perfil_trabalhe_comigo" },
    segundo: { rotulo: "Ver no Instagram", href: PERFIL.instagramUrl, track: "perfil_instagram", externo: true },
    stats: [
      { b: String(stats.posts), t: "posts" },
      { b: fmtBR(stats.followers), t: "seguidores" },
      { b: "100M+", t: "views em campanhas" },
      { b: "200+", t: "marcas" },
    ],
    bioTitulo: PERFIL.bioTitulo,
    bio: PERFIL.bio,
    bioLink: { rotulo: "📩 prefere formulário? trabalhe comigo por aqui", href: "#contato" },
    balao: PERFIL.balao,
    nota: PERFIL.nota,
    carimbo: PERFIL.carimbo,
    faixa: FAIXA,
    nav: NAV,
    topoCta: { rotulo: "Trabalhe comigo →", href: PERFIL.whatsappUrl },
  };

  return (
    <PerfilCtx.Provider value={{ stats }}>
      <Cabecalho cab={cab} />
      <main className="pf-wrap">
        <Sobre />
        <Audiencia />
        <Resultados />
        <Servicos />
        <Publi />
        <Marcas />
        <DMs />
        <Contato />
        <Rodape track="perfil_zap_fixo" />
      </main>
    </PerfilCtx.Provider>
  );
}
