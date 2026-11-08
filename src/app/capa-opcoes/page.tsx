import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import HeroCapa from "@/components/heroes/HeroCapa";
import Stats from "@/components/Stats";

// Prévia das 3 opções de cor e fonte da capa nova, pra Lara escolher (fora do Google).
// Fontes locais: next/font/google falha às vezes no build da Vercel.
const bodoni = localFont({
  src: [
    { path: "../../fonts/BodoniModa.woff2", weight: "400 700", style: "normal" },
    { path: "../../fonts/BodoniModa-Italic.woff2", weight: "400 700", style: "italic" },
  ],
  variable: "--op-bodoni",
  display: "swap",
});
const instrument = localFont({
  src: [
    { path: "../../fonts/InstrumentSerif.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--op-instrument",
  display: "swap",
});
const fraunces = localFont({
  src: [
    { path: "../../fonts/Fraunces.woff2", weight: "300 900", style: "normal" },
    { path: "../../fonts/Fraunces-Italic.woff2", weight: "300 900", style: "italic" },
  ],
  variable: "--op-fraunces",
  display: "swap",
});

export const metadata: Metadata = { title: "Lara Dam · opções de capa", robots: { index: false, follow: false } };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

const OPCOES = [
  {
    nome: "A · Marinho + vinho (Bodoni)",
    vars: { "--background": "#F2EBE1", "--background-alt": "#E6DDD0", "--foreground": "#16223D", "--foreground-soft": "#4A5268", "--primary": "#8E2C3A", "--font-be-vietnam": "var(--op-bodoni)" },
  },
  {
    nome: "B · Preto + azul elétrico (Instrument)",
    vars: { "--background": "#F7F4EF", "--background-alt": "#ECE7DF", "--foreground": "#121212", "--foreground-soft": "#555555", "--primary": "#2F4BFF", "--font-be-vietnam": "var(--op-instrument)" },
  },
  {
    nome: "C · Café + rosa queimado (Fraunces)",
    vars: { "--background": "#EFE6DA", "--background-alt": "#E3D7C7", "--foreground": "#2A1F1A", "--foreground-soft": "#6A5A50", "--primary": "#B4476A", "--font-be-vietnam": "var(--op-fraunces)" },
  },
];

export default function CapaOpcoes() {
  return (
    <main className={`${bodoni.variable} ${instrument.variable} ${fraunces.variable} flex-1`}>
      {OPCOES.map((o) => (
        <div key={o.nome} style={o.vars as React.CSSProperties} className="bg-background border-b-8 border-black">
          <p className="sticky top-0 z-40 bg-black text-white text-sm font-bold px-4 py-2">{o.nome}</p>
          <HeroCapa />
          <Stats />
        </div>
      ))}
    </main>
  );
}
