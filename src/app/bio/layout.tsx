import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Lara Dam — Links",
  description:
    "Portfólio, orçamento, mentoria e tudo sobre Lara Dam. Pra marcas e creators.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function BioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
