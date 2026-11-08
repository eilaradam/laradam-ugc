import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import PortfolioLeuna from "@/components/nova/PortfolioLeuna";

// Prévia do portfólio no modelo que a Lara escolheu, antes de virar a página principal.
// Fonte local: next/font/google falha às vezes no build da Vercel.
const merriweather = localFont({ src: "../../fonts/Merriweather.woff2", variable: "--lv-serif", weight: "700 900", display: "swap" });

export const metadata: Metadata = { title: "Lara Dam · UGC Creator", robots: { index: false, follow: false } };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function Nova() {
  return (
    <div className={`${merriweather.variable} flex-1`}>
      <PortfolioLeuna />
    </div>
  );
}
