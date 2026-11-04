import type { Metadata, Viewport } from "next";
import Rotina from "./Rotina";

// Rotina de conteúdo do @eilaradam: pendências do dia, pauta do mês e roteiro de cada post.
// Privada (chave no link) e fora do Google. Instala como app no Mac (Chrome) e no iPhone (Tela de Início).
export const metadata: Metadata = {
  title: "Rotina · Lara Dam",
  robots: { index: false, follow: false },
  manifest: "/rotina.webmanifest",
  appleWebApp: { capable: true, title: "Rotina", statusBarStyle: "default" },
  icons: { apple: "/rotina-icone-180.png", icon: "/rotina-icone-192.png" },
};

export const viewport: Viewport = { themeColor: "#6C3CF5", width: "device-width", initialScale: 1 };

export default function Page() {
  return <Rotina />;
}
