import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import PortfolioRevista from "@/components/novo/PortfolioRevista";

// Arquivos locais: next/font/google quebra o build na Vercel (mesmo caso da Caveat)
const bodoni = localFont({
  src: [
    { path: "../../../fonts/BodoniModa.woff2", weight: "400 700", style: "normal" },
    { path: "../../../fonts/BodoniModa-Italic.woff2", weight: "400 700", style: "italic" },
  ],
  variable: "--rv-titulo",
  display: "swap",
});

export const metadata: Metadata = { title: "Lara Dam · Revista", robots: { index: false, follow: false } };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function Page() {
  return (
    <div className={`${bodoni.variable} flex-1`} style={{ "--rv-corpo": "var(--font-dm-sans)" } as React.CSSProperties}>
      <PortfolioRevista />
    </div>
  );
}
