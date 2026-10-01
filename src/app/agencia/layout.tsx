import { caveat, jakarta } from "@/lib/pfFonts";
import "../perfil/perfil.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`pf ${jakarta.variable} ${caveat.variable}`}>{children}</div>;
}
