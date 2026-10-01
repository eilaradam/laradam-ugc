"use client";

import { AG_CAB, AG_NAV, AG_SOBRE, AG_WHATSAPP } from "@/data/agencia";
import Cabecalho, { type CabConfig } from "@/components/perfil/Cabecalho";
import Sobre from "@/components/perfil/Sobre";
import Rodape from "@/components/perfil/Rodape";
import { Conteudos, ContatoAgencia, FAQ, MarcasTexto, Modalidades, OQueFaco, Processo } from "./AgenciaSecoes";

// Agência (/agencia): gestão de campanhas UGC com várias creators, no estilo do mídia kit.
export default function AgenciaApp() {
  const cab: CabConfig = {
    usuario: AG_CAB.usuario,
    avatar: AG_CAB.avatar,
    cta: { rotulo: "💬 Quero conversar", href: AG_WHATSAPP, track: "agencia_trabalhe_comigo" },
    segundo: { rotulo: "Ver as modalidades", href: "#modalidades", track: "agencia_ver_modalidades" },
    stats: AG_CAB.stats,
    bioTitulo: AG_CAB.bioTitulo,
    bio: AG_CAB.bio,
    bioLink: { rotulo: "📩 prefere formulário? conta sobre a sua campanha aqui", href: "#contato" },
    balao: AG_CAB.balao,
    nota: AG_CAB.nota,
    carimbo: AG_CAB.carimbo,
    faixa: AG_CAB.faixa,
    nav: AG_NAV,
    topoCta: { rotulo: "Quero conversar →", href: AG_WHATSAPP },
  };

  return (
    <>
      <Cabecalho cab={cab} />
      <main className="pf-wrap">
        <OQueFaco />
        <Conteudos />
        <Modalidades />
        <Processo />
        <MarcasTexto />
        <Sobre dados={AG_SOBRE} />
        <FAQ />
        <ContatoAgencia />
        <Rodape zap={AG_WHATSAPP} zapRotulo="💬 Conversar sobre minha campanha" track="agencia_zap_fixo" />
      </main>
    </>
  );
}
