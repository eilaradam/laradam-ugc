import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Renda from "./Renda";

// Entrega do Reels "R$ 45 mil com UGC" (CTA RENDA UGC). Cadastro curto (lista_espera, origem renda-ugc) → o que ela
// mudou nos últimos 30 dias + convite pra aula grátis de 24/11 com o botão do grupo.
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: "O que eu fiz nos últimos 30 dias · Lara Dam",
  description: "O que eu mudei pra fechar R$ 45 mil com UGC em 30 dias.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#33241B", width: "device-width", initialScale: 1 };

export default function Page() {
  return (
    <div className={poppins.variable} style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}>
      <Renda />
    </div>
  );
}
