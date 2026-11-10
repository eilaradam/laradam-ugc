import type { Metadata } from "next";
import FinalOpcoes from "@/components/final/FinalOpcoes";

// Prévia: 3 opções de final do portfólio pra Lara escolher. Fora do Google.
export const metadata: Metadata = { title: "Opções de final · Lara Dam", robots: { index: false, follow: false } };

export default function Page() {
  return <FinalOpcoes />;
}
