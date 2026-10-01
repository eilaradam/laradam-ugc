// Portfólio UGC no estilo do mídia kit. Rota de prévia; quando a Lara aprovar,
// o portfólio antigo (/) sai e este assume.
import type { Metadata } from "next";
import UgcApp from "@/components/ugc/UgcApp";

const TITULO = "Lara Dam · UGC pra sua marca";
const DESCRICAO = "Vídeo que vende: UGC, criativos pra tráfego e roteiro, prontos pra rodar como anúncio. +500 vídeos, +200 marcas, 100M+ views.";
const OG = "https://ugc.laradam.com/ensaio/og-perfil.jpg";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  robots: { index: false, follow: false },
  openGraph: { title: TITULO, description: DESCRICAO, url: "https://ugc.laradam.com/ugc", siteName: "Lara Dam", locale: "pt_BR", type: "website", images: [{ url: OG, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: TITULO, description: DESCRICAO, images: [OG] },
};

export default function UgcPage() {
  return <UgcApp />;
}
