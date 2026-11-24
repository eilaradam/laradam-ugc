import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Raiox from "./Raiox";

// Bônus da aula grátis Edição com Claude (24/11): formulário de 4 campos que libera o e-book com dois prompts
// (as regras de edição e o Raio-X do Reels). Contato em bio_leads (produto "Bônus aula Edição com Claude")
// e na lista_espera (interesse "raiox"). Visual igual à apresentação e ao /edicaoclaude.
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: "O seu bônus da aula · Edição com Claude · Lara Dam",
  description: "O e-book com os dois prompts da aula: as regras de edição pro seu Claude e o Raio-X do Reels.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#f1f0ea", width: "device-width", initialScale: 1 };

export default function Page() {
  return (
    <div className={poppins.variable} style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}>
      <Raiox />
    </div>
  );
}
