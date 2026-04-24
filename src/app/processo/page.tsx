import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Processo from "@/components/Processo";

export const metadata: Metadata = {
  title: "Processo · Lara Dam",
  description:
    "Como eu trabalho, do briefing à entrega. Cinco passos que transformam uma marca em conteúdo que converte.",
};

export default function ProcessoPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-24">
        <Processo />
      </main>
      <Footer />
    </>
  );
}
