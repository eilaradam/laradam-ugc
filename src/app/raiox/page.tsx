import type { Metadata, Viewport } from "next";
import { Caveat } from "next/font/google";
import Raiox from "./Raiox";

// Raio-X do Reels: liberado no fim da aula grátis de Edição com Claude, pra quem preencher o formulário.
// Respostas em bio_leads (produto "Raio-X do Reels") e contato na lista_espera (interesse "raiox").
const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "Raio-X do Reels · Lara Dam",
  description: "O prompt que revisa o seu Reels antes de entregar pra marca: gancho, enquadramento, zona morta, legenda, título e ritmo, com a medida exata.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#6C3CF5", width: "device-width", initialScale: 1 };

export default function Page() {
  return (
    <div className={caveat.variable}>
      <Raiox />
    </div>
  );
}
