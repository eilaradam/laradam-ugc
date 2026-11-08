import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { caveat } from "@/lib/pfFonts";
import PortfolioLara from "@/components/nova/PortfolioLara";

// Prévia do portfólio na identidade visual da Lara, antes de virar a página principal.
// Fontes locais: next/font/google falha às vezes no build da Vercel.
const anton = localFont({ src: "../../fonts/Anton.woff2", variable: "--lr-titulo", weight: "400", display: "swap" });
const playfair = localFont({ src: "../../fonts/PlayfairDisplay-Italic.woff2", variable: "--lr-italico", weight: "700 900", style: "italic", display: "swap" });

export const metadata: Metadata = { title: "Lara Dam · UGC Creator", robots: { index: false, follow: false } };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function Nova() {
  return (
    <div className={`${anton.variable} ${playfair.variable} ${caveat.variable} flex-1`}>
      <PortfolioLara />
    </div>
  );
}
