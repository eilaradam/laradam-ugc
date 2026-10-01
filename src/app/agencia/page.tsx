// Agência: gestão de campanhas UGC com várias creators, no estilo do mídia kit.
// Rota de prévia; quando a Lara aprovar, substitui a /gestao.
import type { Metadata } from "next";
import AgenciaApp from "@/components/agencia/AgenciaApp";

const TITULO = "Lara Dam · Gestão de campanhas UGC";
const DESCRICAO = "Várias creators pro seu negócio: seleção, briefing, roteiro revisado, produção acompanhada e entrega no prazo. +100 campanhas, +1.200 creators em rede.";
const OG = "https://ugc.laradam.com/ensaio/og-perfil.jpg";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  robots: { index: false, follow: false },
  openGraph: { title: TITULO, description: DESCRICAO, url: "https://ugc.laradam.com/agencia", siteName: "Lara Dam", locale: "pt_BR", type: "website", images: [{ url: OG, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: TITULO, description: DESCRICAO, images: [OG] },
};

export default function AgenciaPage() {
  return <AgenciaApp />;
}
