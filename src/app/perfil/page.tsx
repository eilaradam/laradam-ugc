// Portfólio novo: o site inteiro é um perfil de Instagram (direção C escolhida
// pela Lara em 30/09/2026), com os stickers da direção A (balão, carimbo,
// anotação à mão, faixa de estrelas, tira de expressões). Rota de prévia.
import type { Metadata } from "next";
import PerfilApp from "@/components/perfil/PerfilApp";

const TITULO = "Lara Dam · UGC creator & influenciadora";
const DESCRICAO = "Vídeo que vende pra sua marca e publi que conversa no @eilaradam. +500 vídeos, +200 marcas, 100M+ views em campanhas. Litoral de SP.";
const OG = "https://ugc.laradam.com/ensaio/og-perfil.jpg";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  // Prévia: sai do Google até virar a home. Aí é só tirar esta linha.
  robots: { index: false, follow: false },
  openGraph: {
    title: TITULO,
    description: DESCRICAO,
    url: "https://ugc.laradam.com/perfil",
    siteName: "Lara Dam",
    locale: "pt_BR",
    type: "website",
    images: [{ url: OG, width: 1200, height: 630, alt: "Lara Dam, UGC creator & influenciadora" }],
  },
  twitter: { card: "summary_large_image", title: TITULO, description: DESCRICAO, images: [OG] },
};

export default function PerfilPage() {
  return <PerfilApp />;
}
