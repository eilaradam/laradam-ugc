// Opções minimalistas da seção "O que podemos criar juntos?" pra Lara escolher (fora do Google).
import type { Metadata, Viewport } from "next";
import { ServicosIcones, ServicosNumerados, ServicosDestaque } from "@/components/servicos/ServicosMin";

export const metadata: Metadata = { title: "Serviços: opções", robots: { index: false, follow: false } };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

function Rotulo({ n, nome }: { n: number; nome: string }) {
  return (
    <div className="sticky top-0 z-40 bg-black text-white text-center py-3 text-sm font-semibold tracking-wide">
      Opção {n} · {nome}
    </div>
  );
}

export default function Page() {
  return (
    <main>
      <Rotulo n={1} nome="Ícones" />
      <ServicosIcones id="opcao-a" />
      <Rotulo n={2} nome="Numerados" />
      <ServicosNumerados id="opcao-b" />
      <Rotulo n={3} nome="Com destaque" />
      <ServicosDestaque id="opcao-c" />
      <div id="contato" className="py-16 text-center text-muted">(aqui fica o contato no site)</div>
    </main>
  );
}
