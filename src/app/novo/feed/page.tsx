import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import PortfolioFeed from "@/components/novo/PortfolioFeed";

// Arquivos locais: next/font/google quebra o build na Vercel (mesmo caso da Caveat)
const instrument = localFont({
  src: [
    { path: "../../../fonts/InstrumentSerif.woff2", weight: "400", style: "normal" },
    { path: "../../../fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--fd-titulo",
  display: "swap",
});

export const metadata: Metadata = { title: "Lara Dam · Feed", robots: { index: false, follow: false } };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function Page() {
  return (
    <div className={`${instrument.variable} flex-1`} style={{ "--fd-corpo": "var(--font-dm-sans)" } as React.CSSProperties}>
      <PortfolioFeed />
    </div>
  );
}
