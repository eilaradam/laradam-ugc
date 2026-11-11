import type { Metadata, Viewport } from "next";
import Pagamentos from "./Pagamentos";

// Pagamentos das marcas que ainda não caíram: quantos dias desde que terminei o conteúdo.
// Privada (mesma chave da rotina) e fora do Google. Instala como app no Mac e no iPhone.
export const metadata: Metadata = {
  title: "Pagamentos · Lara Dam",
  robots: { index: false, follow: false },
  manifest: "/pagamentos.webmanifest",
  appleWebApp: { capable: true, title: "Pagamentos", statusBarStyle: "default" },
  icons: { apple: "/entregas-icone-180.png", icon: "/entregas-icone-192.png" },
};

export const viewport: Viewport = { themeColor: "#18181B", width: "device-width", initialScale: 1 };

export default function Page() {
  return <Pagamentos />;
}
