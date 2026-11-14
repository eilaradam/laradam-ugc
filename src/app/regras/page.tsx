import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Regras from "./Regras";

// Isca do carrossel "as 3 principais regras que eu dei pro Claude pra editar meus vídeos" (14/11).
// A automação do carrossel manda pra cá: cadastro curto (lista_espera, interesse "edicao") → as 3 regras
// + convite pra aula grátis de 24/11 com o botão do grupo.
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: "3 regras pra editar com o Claude · Lara Dam",
  description: "As 3 principais regras que eu dei pro Claude pra editar meus vídeos.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#33241B", width: "device-width", initialScale: 1 };

export default function Page() {
  return (
    <div className={poppins.variable} style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}>
      <Regras />
    </div>
  );
}
