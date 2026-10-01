// Página de entrada: "carregando" curto e depois a marca escolhe o caminho
// (Publi = mídia kit em /perfil, UGC = portfólio em /, Agência = /gestao).
// Rota de prévia; quando a Lara aprovar, vira a home.
import type { Metadata } from "next";
import Entrada from "@/components/entrada/Entrada";

export const metadata: Metadata = {
  title: "Lara Dam · por onde você quer começar?",
  description: "Publi no @eilaradam, UGC pra sua marca ou gestão de campanhas com várias creators. Escolhe o caminho.",
  robots: { index: false, follow: false },
};

export default function EntradaPage() {
  return <Entrada />;
}
