import type { Metadata, Viewport } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Gestao from "@/components/Gestao";

export const metadata: Metadata = {
  title: "Gestão UGC · Lara Dam",
  description:
    "Gestão de UGC end-to-end: creators, briefing, produção e conteúdo autêntico pra orgânico e mídia. Fale com a Lara.",
};

// Força layout desktop também no mobile — igual à home
export const viewport: Viewport = {
  width: 1280,
  initialScale: 0.34,
};

export default function GestaoPage() {
  return (
    <>
      {/* Tipografia +25% no touch (igual à home) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (pointer: coarse) {
              html { font-size: 20px; }
            }
          `,
        }}
      />
      <Nav />
      <main className="flex-1">
        <Gestao />
      </main>
      <Footer />
    </>
  );
}
