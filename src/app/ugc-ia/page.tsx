import type { Metadata, Viewport } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import UgcIa from "@/components/UgcIa";

export const metadata: Metadata = {
  title: "UGC para marcas de IA · Lara Dam",
  description:
    "Vídeo UGC para marcas de inteligência artificial no Brasil, com creators que já usam IA no trabalho. Monte o pacote na calculadora.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { width: 1280, initialScale: 0.34 };

export default function UgcIaPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `@media (pointer: coarse){ html { font-size: 20px; } }` }} />
      <Nav />
      <main className="flex-1">
        <UgcIa />
      </main>
      <Footer />
    </>
  );
}
