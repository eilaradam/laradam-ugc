import type { Metadata } from "next";
import Impressao3D from "@/components/impressao3d/Impressao3D";

// Link curto por marca: /impressao-3d/bambu-lab (mesmo conteúdo de /impressao-3d?marca=Bambu Lab).
// Nomes com grafia própria (QIDI, Up3D) ficam no mapa; slug fora dele vira "Palavra Palavra".
const NOMES: Record<string, string> = {
  elegoo: "Elegoo",
  "bambu-lab": "Bambu Lab",
  qidi: "QIDI",
  artillery: "Artillery",
  snapmaker: "Snapmaker",
  anycubic: "Anycubic",
  flashforge: "Flashforge",
  sovol: "Sovol",
  creality: "Creality",
  prusa: "Prusa",
  sethi3d: "Sethi3D",
  gtmax3d: "GTMax3D",
  "3be": "3be",
  up3d: "Up3D",
  printit3d: "Printit3D",
  "filamentos-3d-brasil": "Filamentos 3D Brasil",
  voolt3d: "Voolt3D",
  wishbox: "Wishbox",
  "3d-fila": "3D Fila",
};

const nomeDoSlug = (slug: string) =>
  NOMES[slug] ??
  slug
    .split("-")
    .filter(Boolean)
    .map((p) => p[0]!.toUpperCase() + p.slice(1))
    .join(" ")
    .slice(0, 40);

export const metadata: Metadata = {
  title: "Proposta Impressão 3D · Lara Dam",
  description: "UGCs pra anúncio + vídeo-aula de criação de peças 3D com IA.",
  robots: { index: false, follow: false },
};

export default async function Impressao3DMarcaPage({ params }: { params: Promise<{ marca: string }> }) {
  const { marca } = await params;
  return <Impressao3D marca={nomeDoSlug(decodeURIComponent(marca).toLowerCase())} />;
}
