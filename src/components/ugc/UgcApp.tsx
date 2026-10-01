"use client";

import { VIDEOS } from "@/data/content";
import { UGC_CAB, UGC_NAV, UGC_WHATSAPP } from "@/data/ugc";
import Cabecalho, { type CabConfig } from "@/components/perfil/Cabecalho";
import { Marcas, Resultados, Servicos, Videos } from "@/components/perfil/Secoes";
import DMs from "@/components/perfil/DMs";
import Sobre from "@/components/perfil/Sobre";
import Contato from "@/components/perfil/Contato";
import Rodape from "@/components/perfil/Rodape";

// Portfólio UGC (/ugc): mesma estrutura do mídia kit, sem a parte de publi.
export default function UgcApp() {
  const cab: CabConfig = {
    usuario: UGC_CAB.usuario,
    avatar: UGC_CAB.avatar,
    cta: { rotulo: "💬 Trabalhe comigo", href: UGC_WHATSAPP, track: "ugc_trabalhe_comigo" },
    segundo: { rotulo: "Ver os vídeos", href: "#videos", track: "ugc_ver_videos" },
    stats: [
      { b: String(VIDEOS.length), t: "vídeos no portfólio" },
      { b: "200+", t: "marcas" },
      { b: "100M+", t: "views em campanhas" },
      { b: "2.4x", t: "ROAS médio" },
    ],
    bioTitulo: UGC_CAB.bioTitulo,
    bio: UGC_CAB.bio,
    bioLink: { rotulo: "📩 prefere formulário? trabalhe comigo por aqui", href: "#contato" },
    balao: UGC_CAB.balao,
    nota: UGC_CAB.nota,
    carimbo: UGC_CAB.carimbo,
    faixa: UGC_CAB.faixa,
    nav: UGC_NAV,
    topoCta: { rotulo: "Trabalhe comigo →", href: UGC_WHATSAPP },
  };

  return (
    <>
      <Cabecalho cab={cab} />
      <main className="pf-wrap">
        <Resultados />
        <Servicos />
        <Videos />
        <Marcas />
        <DMs />
        <Sobre />
        <Contato />
        <Rodape zap={UGC_WHATSAPP} track="ugc_zap_fixo" />
      </main>
    </>
  );
}
