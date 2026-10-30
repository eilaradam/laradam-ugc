// Prévia das 4 direções visuais pro portfólio (só pra Lara escolher; fora do Google).
import type { Metadata, Viewport } from "next";
import { Anton, Caveat } from "next/font/google";
import Direcoes from "./Direcoes";

const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = {
  title: "Direções do portfólio",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { width: 1280, initialScale: 0.28 };

export default function Page() {
  return (
    <div className={`${anton.variable} ${caveat.variable}`}>
      <Direcoes />
    </div>
  );
}
