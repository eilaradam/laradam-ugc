import { caveat, jakarta } from "@/lib/pfFonts";
import "../perfil/perfil.css";

// Agência: mesmo tema (fontes e tokens) do kit, mas sem os pontinhos no fundo.
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`pf pf-sem-pontos ${jakarta.variable} ${caveat.variable}`}>{children}</div>;
}
