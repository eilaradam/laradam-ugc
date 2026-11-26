import type { Metadata, Viewport } from "next";
import { Caveat } from "next/font/google";
import Animacoes from "./Animacoes";

// Guia "Animações com o Claude · Episódio 1: Skincare" (isca do reels; o direct da automação CLAUDE UGC manda pra cá).
// Cadastro de 4 campos (lista_espera, interesse animacoes-claude) e depois o guia com os prompts e o botão da Turma 5.
const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "Animações com o Claude · Skincare · Lara Dam",
  description: "Os prompts pra criar, com as suas fotos, as 3 animações do episódio 1: varal de produtos, produto no rosto e carrinho dos favoritos.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#F8F1DF", width: "device-width", initialScale: 1 };

export default function Page() {
  return (
    <div className={caveat.variable}>
      <Animacoes />
    </div>
  );
}
