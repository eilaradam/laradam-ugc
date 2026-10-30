// 3 versões da seção "O que podemos criar juntos?" pra Lara escolher (fora do Google).
import type { Metadata, Viewport } from "next";
import { Caveat } from "next/font/google";
import ServicosLista from "@/components/servicos/ServicosLista";
import ServicosStories from "@/components/servicos/ServicosStories";
import ServicosScrap from "@/components/servicos/ServicosScrap";

const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = { title: "Serviços: 3 opções", robots: { index: false, follow: false } };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

function Rotulo({ letra, nome }: { letra: string; nome: string }) {
  return (
    <div className="sticky top-0 z-40 bg-black text-white text-center py-3 text-sm font-semibold tracking-wide">
      Versão {letra} · {nome}
    </div>
  );
}

export default function Page() {
  return (
    <main className={caveat.variable}>
      <Rotulo letra="A" nome="Lista editorial" />
      <ServicosLista id="opcao-a" />
      <Rotulo letra="B" nome="Stories" />
      <ServicosStories id="opcao-b" />
      <Rotulo letra="C" nome="Scrapbook" />
      <ServicosScrap id="opcao-c" />
      <div id="contato" className="py-16 text-center text-muted">(aqui fica o contato no site)</div>
    </main>
  );
}
