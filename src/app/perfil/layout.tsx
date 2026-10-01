import { caveat, jakarta } from "@/lib/pfFonts";
import "../perfil/perfil.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`pf pf-kit ${jakarta.variable} ${caveat.variable}`}>{children}</div>;
}
