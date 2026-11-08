import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import PortfolioFeed from "@/components/novo/PortfolioFeed";

const instrument = Instrument_Serif({ variable: "--fd-titulo", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });

export const metadata: Metadata = { title: "Lara Dam · Feed", robots: { index: false, follow: false } };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function Page() {
  return (
    <div className={`${instrument.variable} flex-1`} style={{ "--fd-corpo": "var(--font-dm-sans)" } as React.CSSProperties}>
      <PortfolioFeed />
    </div>
  );
}
