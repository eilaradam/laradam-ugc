import type { Metadata, Viewport } from "next";
import { Anton } from "next/font/google";
import PortfolioTV from "@/components/novo/PortfolioTV";

const anton = Anton({ variable: "--tv-titulo", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = { title: "Lara Dam TV", robots: { index: false, follow: false } };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function Page() {
  return (
    <div className={`${anton.variable} flex-1`} style={{ "--tv-corpo": "var(--font-dm-sans)" } as React.CSSProperties}>
      <PortfolioTV />
    </div>
  );
}
