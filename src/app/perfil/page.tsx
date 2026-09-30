// Portfólio novo: o site inteiro é um perfil de Instagram (direção C escolhida
// pela Lara em 30/09/2026), com os stickers da direção A (balão, carimbo,
// anotação à mão, faixa de estrelas, tira de expressões). Rota de prévia.
import type { Metadata } from "next";
import PerfilApp from "@/components/perfil/PerfilApp";

export const metadata: Metadata = {
  title: "Lara Dam · UGC creator & influenciadora",
  description: "Vídeo que vende pra sua marca e publi que conversa no @eilaradam. +500 vídeos, +200 marcas, 100M+ views.",
  robots: { index: false, follow: false },
};

export default function PerfilPage() {
  return <PerfilApp />;
}
