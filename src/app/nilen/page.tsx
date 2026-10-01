import type { Metadata } from "next";
import PropostaPage from "@/components/proposta/Proposta";
import { NILEN } from "@/data/propostas/nilen";

// Proposta pra Nilen. Fora do menu e fora do Google: a Lara manda o link direto.
export const metadata: Metadata = {
  title: "Proposta Nilen · Lara Dam",
  description: "Proposta de gestão de campanha UGC para a Nilen.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Proposta Nilen · Lara Dam",
    description: "Proposta de gestão de campanha UGC para a Nilen.",
  },
  twitter: {
    title: "Proposta Nilen · Lara Dam",
    description: "Proposta de gestão de campanha UGC para a Nilen.",
  },
};

export default function NilenPage() {
  return <PropostaPage p={NILEN} />;
}
