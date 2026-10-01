import { caveat, jakarta } from "@/lib/pfFonts";
import "../perfil/perfil.css";
import "./entrada.css";

export default function EntradaLayout({ children }: { children: React.ReactNode }) {
  return <div className={`pf en-azul ${jakarta.variable} ${caveat.variable}`}>{children}</div>;
}
