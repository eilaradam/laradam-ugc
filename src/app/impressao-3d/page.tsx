import type { Metadata } from "next";
import Impressao3D from "@/components/impressao3d/Impressao3D";

// Proposta pra marcas de impressora 3D. Fora do menu e fora do Google: a Lara manda o link direto.
// O nome da marca vem do link: /impressao-3d?marca=Creality
export const metadata: Metadata = {
  title: "Proposta Impressão 3D · Lara Dam",
  description: "UGCs pra anúncio + vídeo-aula de criação de peças 3D com IA.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Proposta Impressão 3D · Lara Dam",
    description: "UGCs pra anúncio + vídeo-aula de criação de peças 3D com IA.",
  },
};

export default async function Impressao3DPage({ searchParams }: { searchParams: Promise<{ marca?: string | string[] }> }) {
  const { marca } = await searchParams;
  const nome = (Array.isArray(marca) ? marca[0] : marca)?.trim().slice(0, 40) || undefined;
  return <Impressao3D marca={nome} />;
}
