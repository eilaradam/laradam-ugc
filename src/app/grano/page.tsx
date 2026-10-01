import type { Metadata } from "next";
import PropostaPage from "@/components/proposta/Proposta";
import { GRANO } from "@/data/propostas/grano";

// Proposta pra Grano. Fora do menu e fora do Google: a Lara manda o link direto.
export const metadata: Metadata = {
  title: "Proposta Grano · Lara Dam",
  description: "Proposta de vídeo para a Grano.",
  robots: { index: false, follow: false },
};

export default function GranoPage() {
  return <PropostaPage p={GRANO} />;
}
