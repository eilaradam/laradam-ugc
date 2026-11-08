import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import PortfolioTV from "@/components/novo/PortfolioTV";

// Arquivo local: next/font/google quebra o build na Vercel (mesmo caso da Caveat)
const anton = localFont({ src: "../../../fonts/Anton.woff2", variable: "--tv-titulo", weight: "400", display: "swap" });

export const metadata: Metadata = { title: "Lara Dam TV", robots: { index: false, follow: false } };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function Page() {
  return (
    <div className={`${anton.variable} flex-1`} style={{ "--tv-corpo": "var(--font-dm-sans)" } as React.CSSProperties}>
      <PortfolioTV />
    </div>
  );
}
