import type { Metadata, Viewport } from "next";
import { Caveat } from "next/font/google";
import Edicao from "./Edicao";

// Lista da aula grátis "Edição com Claude" (26/11, 20h). A automação EDIÇÃO no direct manda pra cá
// até o grupo abrir em 18/11. Cadastro (lista_espera, interesse "edicao") libera o checklist das 7 regras.
const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "Aula grátis: Edição com Claude · Lara Dam",
  description: "Entra na lista da aula grátis de 26/11 e recebe na hora o checklist das 7 regras que eu ensinei pro meu editor de IA.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#6C3CF5", width: "device-width", initialScale: 1 };

export default function Page() {
  return (
    <div className={caveat.variable}>
      <Edicao />
    </div>
  );
}
