import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import ProjetoHero from "@/components/projeto/ProjetoHero";
import ProjetoSobre from "@/components/projeto/ProjetoSobre";
import ProjetoAmbientes from "@/components/projeto/ProjetoAmbientes";
import ProjetoTour from "@/components/projeto/ProjetoTour";
import ProjetoProva from "@/components/projeto/ProjetoProva";
import ProjetoEscopo from "@/components/projeto/ProjetoEscopo";
import ProjetoParceria from "@/components/projeto/ProjetoParceria";
import ProjetoContato from "@/components/projeto/ProjetoContato";

// Tipografia so desta pagina (o resto do site segue Newsreader + Hanken).
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Pagina de proposta pra marcas. Fora do menu e fora do Google:
// o acesso e pelo link que a Lara manda direto pra marca.
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
    <main className={`${archivo.variable} font-pj flex-1 bg-pj-bg text-pj-ink`}>
      <ProjetoHero />
      <ProjetoSobre />
      <ProjetoAmbientes />
      <ProjetoTour />
      <ProjetoProva />
      <ProjetoEscopo />
      <ProjetoParceria />
      <ProjetoContato />
    </main>
  );
}
