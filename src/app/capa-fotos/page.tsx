import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/heroes/HeroOption6";

// Prévia: a capa atual do site com cada opção de foto, pra Lara escolher (fora do Google)
export const metadata: Metadata = { title: "Lara Dam · opções de foto da capa", robots: { index: false, follow: false } };

const OPCOES = [
  { n: "Atual", src: "/capa/1-sorriso.webp", cor: "#D7CDC4" },
  { n: "03", src: "/capa/opcoes/03.webp", cor: "#BCB4B0" },
  { n: "06", src: "/capa/opcoes/06.webp", cor: "#D3C9C0" },
  { n: "08", src: "/capa/opcoes/08.webp", cor: "#D4C9C0" },
  { n: "09", src: "/capa/opcoes/09.webp", cor: "#D4C9C0" },
  { n: "10", src: "/capa/opcoes/10.webp", cor: "#D6CBC3" },
  { n: "13", src: "/capa/opcoes/13.webp", cor: "#C8B4A9" },
  { n: "26", src: "/capa/opcoes/26.webp", cor: "#BCB8B5" },
];

export default function CapaFotos() {
  return (
    <main className="flex-1">
      <Nav />
      {OPCOES.map((o) => (
        <div key={o.n} id={`foto-${o.n}`} className="relative border-b-8 border-black">
          <p className="absolute top-20 left-0 z-50 bg-black text-white text-lg font-bold px-4 py-2">Foto {o.n}</p>
          <Hero fundo={[{ src: o.src, cor: o.cor }]} />
        </div>
      ))}
    </main>
  );
}
