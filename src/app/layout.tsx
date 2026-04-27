import type { Metadata } from "next";
import { Be_Vietnam_Pro, DM_Sans, Fraunces } from "next/font/google";
import VideoModalProvider from "@/components/VideoModalProvider";
import CustomCursor from "@/components/CustomCursor";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Lara Dam — UGC Creator & Content Strategist",
  description:
    "Portfólio de Lara Dam: UGC Creator com +500 vídeos gravados e +200 parceiros. Criativos de alta conversão para marcas que buscam destaque.",
  openGraph: {
    title: "Lara Dam — UGC Creator",
    description: "+500 vídeos · +200 parceiros · 100M+ views",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${beVietnam.variable} ${dmSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <CustomCursor />
          <VideoModalProvider>{children}</VideoModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
