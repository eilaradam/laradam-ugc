import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "../perfil/perfil.css";
import "./entrada.css";

// Mesmas fontes e tokens da página /perfil (o estilo novo que a Lara aprovou).
const jakarta = Plus_Jakarta_Sans({ variable: "--pf-font", subsets: ["latin"], weight: ["500", "600", "700", "800"] });
const caveat = Caveat({ variable: "--pf-mao", subsets: ["latin"], weight: ["600"] });

export default function EntradaLayout({ children }: { children: React.ReactNode }) {
  return <div className={`pf ${jakarta.variable} ${caveat.variable}`}>{children}</div>;
}
