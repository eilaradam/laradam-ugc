import type { Metadata } from "next";
import SelecaoPage from "@/components/proposta/Selecao";
import { GRANO_CREATORS } from "@/data/propostas/grano-creators";

// Seleção de creators pra Grano, sem valores. Fora do menu e fora do Google: a Lara manda o link direto.
export const metadata: Metadata = {
  title: "Creators Grano · Lara Dam",
  description: "Creators pré-selecionadas para a Grano.",
  robots: { index: false, follow: false },
};

export default function GranoCreatorsPage() {
  return <SelecaoPage d={GRANO_CREATORS} />;
}
