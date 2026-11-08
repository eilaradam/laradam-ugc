import type { Metadata, Viewport } from "next";
import { Bodoni_Moda } from "next/font/google";
import PortfolioRevista from "@/components/novo/PortfolioRevista";

const bodoni = Bodoni_Moda({ variable: "--rv-titulo", subsets: ["latin"], weight: ["400", "600", "700"], style: ["normal", "italic"] });

export const metadata: Metadata = { title: "Lara Dam · Revista", robots: { index: false, follow: false } };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function Page() {
  return (
    <div className={`${bodoni.variable} flex-1`} style={{ "--rv-corpo": "var(--font-dm-sans)" } as React.CSSProperties}>
      <PortfolioRevista />
    </div>
  );
}
