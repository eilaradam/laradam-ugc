import type { Metadata, Viewport } from "next";
import Entregas from "./Entregas";

// Entregas pendentes das campanhas (roteiro e conteúdo), com prazo e o que está esperando a marca.
// Privada (mesma chave da rotina) e fora do Google. Instala como app no Mac e no iPhone.
export const metadata: Metadata = {
  title: "Entregas · Lara Dam",
  robots: { index: false, follow: false },
  manifest: "/entregas.webmanifest",
  appleWebApp: { capable: true, title: "Entregas", statusBarStyle: "default" },
  icons: { apple: "/entregas-icone-180.png", icon: "/entregas-icone-192.png" },
};

export const viewport: Viewport = { themeColor: "#18181B", width: "device-width", initialScale: 1 };

export default function Page() {
  return <Entregas />;
}
