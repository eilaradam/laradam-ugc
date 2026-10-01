import { jakarta } from "@/lib/pfFonts";
import "./skin.css";

// /ugc = a home de sempre, com a pele do mídia kit (cores + fonte).
export default function UgcLayout({ children }: { children: React.ReactNode }) {
  return <div className={`skin-kit ${jakarta.variable}`}>{children}</div>;
}
