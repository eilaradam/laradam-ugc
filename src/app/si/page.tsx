import type { Metadata } from "next";
import NovoSI from "@/components/novo/NovoSI";

// Portfólio 2.0 só pra quem chega do Seu Influencer (link do mídia kit: /si?si=perfil).
// O portfólio principal (/) continua igual. Fora do Google: é uma página de teste.
export const metadata: Metadata = {
  title: "Lara Dam · UGC que vira venda",
  description: "+1000 vídeos pra +300 marcas, do gancho ao CTA.",
  robots: { index: false, follow: false },
};

export default function PortfolioSeuInfluencer() {
  return <NovoSI />;
}
