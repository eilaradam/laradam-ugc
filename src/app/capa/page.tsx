// Rota escondida pra Lara ver a capa nova antes de trocar a do site.
// O conteúdo do banner vem do Supabase (tabela hero_banners), editável no /admin.
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import HeroCapaGrande from "@/components/heroes/HeroCapaGrande";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import { getBannerAtivo } from "@/lib/banner";

export const metadata: Metadata = {
  title: "Capa nova · Lara Dam",
  robots: { index: false, follow: false },
};

// Refaz a página a cada 30s: ela edita no /admin e vê no site quase na hora.
export const revalidate = 30;

export default async function CapaPreview() {
  const banner = await getBannerAtivo();
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <HeroCapaGrande banner={banner} />
      <Marquee />
      <Stats />
      <Footer />
    </main>
  );
}
