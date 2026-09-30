import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./studio.css";

// Fontes próprias do estúdio (diferentes do resto do site):
// display = Bricolage Grotesque, corpo = Instrument Sans, timecode/UI = JetBrains Mono.
const display = Bricolage_Grotesque({
  variable: "--st-font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
const corpo = Instrument_Sans({
  variable: "--st-font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const mono = JetBrains_Mono({
  variable: "--st-font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`studio ${display.variable} ${corpo.variable} ${mono.variable}`}>
      {children}
    </div>
  );
}
