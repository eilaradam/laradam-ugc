import type { Metadata } from "next";
import { Newsreader, Hanken_Grotesk } from "next/font/google";
import VideoModalProvider from "@/components/VideoModalProvider";
import CustomCursor from "@/components/CustomCursor";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

// Rebranding: display serifado Newsreader + corpo Hanken Grotesk.
// Mantém os nomes de variável (--font-be-vietnam / --font-dm-sans) pra
// não precisar mexer nas classes .font-display / font-sans do globals.
const beVietnam = Newsreader({
  variable: "--font-be-vietnam",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const dmSans = Hanken_Grotesk({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
      className={`${beVietnam.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <AnalyticsTracker />
          <CustomCursor />
          <VideoModalProvider>{children}</VideoModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
