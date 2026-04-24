import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Gestao from "@/components/Gestao";

export const metadata: Metadata = {
  title: "Gestão UGC · Lara Dam",
  description:
    "Gestão de UGC end-to-end: creators, briefing, produção e conteúdo autêntico pra orgânico e mídia. Fale com a Lara.",
};

export default function GestaoPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Gestao />
      </main>
      <Footer />
    </>
  );
}
