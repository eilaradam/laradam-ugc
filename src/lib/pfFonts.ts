import localFont from "next/font/local";
import { Plus_Jakarta_Sans } from "next/font/google";

// Fontes das páginas no estilo do mídia kit (/perfil, /ugc, /agencia, /entrada).
export const jakarta = Plus_Jakarta_Sans({ variable: "--pf-font", subsets: ["latin"], weight: ["500", "600", "700", "800"] });
// Arquivo local: a Caveat do Google quebrou o build na Vercel em 04/11/2026.
export const caveat = localFont({ src: "../fonts/Caveat.woff2", variable: "--pf-mao", weight: "400 700", display: "swap" });
