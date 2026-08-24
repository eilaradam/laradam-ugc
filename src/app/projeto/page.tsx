import type { Metadata } from "next";
import ProjetoHero from "@/components/projeto/ProjetoHero";
import { ProjetoLogos } from "@/components/projeto/ProjetoMarcas";
import ProjetoSobre from "@/components/projeto/ProjetoSobre";
import ProjetoProva from "@/components/projeto/ProjetoProva";
import ProjetoEscopo from "@/components/projeto/ProjetoEscopo";
import ProjetoParceria from "@/components/projeto/ProjetoParceria";
import ProjetoContato from "@/components/projeto/ProjetoContato";

// Página de proposta pra marcas. Fora do menu e fora do Google:
// o acesso é pelo link que a Lara manda direto pra marca.
export const metadata: Metadata = {
  title: "Projeto Casa Estúdio · Proposta de parceria · Lara Dam",
  description:
    "Reforma completa documentada em conteúdo: cozinha com ilha, ambiente de gravação e banheiro. Proposta de parceria para marcas de casa, decoração e tecnologia.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Projeto Casa Estúdio · Lara Dam",
    description:
      "Uma reforma inteira documentada, do vazio ao ambiente pronto de gravação. Proposta de parceria para marcas.",
    type: "website",
    images: [
      {
        url: "https://ugc.laradam.com/projeto/og.jpg",
        width: 1200,
        height: 630,
        alt: "Projeto Casa Estúdio · Lara Dam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projeto Casa Estúdio · Lara Dam",
    description:
      "Uma reforma inteira documentada, do vazio ao ambiente pronto de gravação.",
    images: ["https://ugc.laradam.com/projeto/og.jpg"],
  },
};

export default function ProjetoPage() {
  return (
    <main className="flex-1">
      <ProjetoHero />
      <ProjetoLogos />
      <ProjetoSobre />
      <ProjetoProva />
      <ProjetoEscopo />
      <ProjetoParceria />
      <ProjetoContato />
    </main>
  );
}
