import type { Metadata, Viewport } from "next";
import { Caveat } from "next/font/google";
import Widget from "./Widget";

// Passo a passo do widget de pauta no iPhone (isca do reels; o direct da automação WIDGET manda pra cá).
// Primeiro um cadastro curto (vira lead na lista_espera), depois o passo a passo com o prompt.
const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "Sua semana na tela do celular · Lara Dam",
  description: "O passo a passo com o prompt pronto pra colar no Claude e ter sua pauta na tela do celular.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#6C3CF5", width: "device-width", initialScale: 1 };

export default function Page() {
  return (
    <div className={caveat.variable}>
      <Widget />
    </div>
  );
}
