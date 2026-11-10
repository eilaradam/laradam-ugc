import type { Metadata, Viewport } from "next";
import { Caveat } from "next/font/google";
import RoteiroPrompt from "./RoteiroPrompt";

// Isca do carrossel "Como eu estruturo um roteiro pra marca": o direct da automação ROTEIRO manda pra cá.
// Primeiro um cadastro curto (vira lead na lista_espera, interesse "roteiro"), depois o prompt e o checklist.
const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "O prompt que estrutura seu roteiro pra marca · Lara Dam",
  description: "O prompt que eu uso pra montar roteiro de UGC no formato que a marca aprova, depois de +100 campanhas.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#6C3CF5", width: "device-width", initialScale: 1 };

export default function Page() {
  return (
    <div className={caveat.variable}>
      <RoteiroPrompt />
    </div>
  );
}
