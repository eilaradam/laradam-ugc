import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import RoteiroPrompt from "./RoteiroPrompt";

// Isca do carrossel "Como eu entrego um roteiro pra marca": o direct da automação ROTEIRO manda pra cá.
// Primeiro um cadastro curto (vira lead na lista_espera, interesse "roteiro"), depois o prompt e o modelo no Google Docs.
// Mesma letra e cores do carrossel "Como eu entrego um roteiro pra marca" (creme, marrom e amarelo).
const mont = Montserrat({ subsets: ["latin"], weight: ["300", "500", "700", "800", "900"], variable: "--font-mont" });

export const metadata: Metadata = {
  title: "Entregue seu roteiro como eu entrego · Lara Dam",
  description: "O prompt que eu criei com o Claude + o modelo no Google Docs pra entregar roteiro pra marca, depois de +100 campanhas.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#3B2416", width: "device-width", initialScale: 1 };

export default function Page() {
  return (
    <div className={mont.variable} style={{ fontFamily: "var(--font-mont), Montserrat, Arial, sans-serif" }}>
      <RoteiroPrompt />
    </div>
  );
}
