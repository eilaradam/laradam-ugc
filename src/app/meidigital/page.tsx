import type { Metadata } from "next";
import PropostaPage from "@/components/proposta/Proposta";
import { MEIDIGITAL } from "@/data/propostas/meidigital";

// Proposta pra MEI Digital. Fora do menu e fora do Google: a Lara manda o link direto.
export const metadata: Metadata = {
  title: "Proposta MEI Digital · Prêmio Reclame Aqui 2026 · Lara Dam",
  description: "Proposta de vídeo para a campanha do Prêmio Reclame Aqui 2026 da MEI Digital.",
  robots: { index: false, follow: false },
};

export default function MeiDigitalPage() {
  return <PropostaPage p={MEIDIGITAL} />;
}
