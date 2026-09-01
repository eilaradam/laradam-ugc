// Rota escondida pra Lara ver a capa nova antes de trocar a do site.
// Não está no menu e não é indexada. Se ela aprovar, o HeroCapaGrande sobe
// pro src/app/page.tsx no lugar do <Hero />.
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import HeroCapaGrande from "@/components/heroes/HeroCapaGrande";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Capa nova · Lara Dam",
  robots: { index: false, follow: false },
};

export default function CapaPreview() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <HeroCapaGrande />
      <Marquee />
      <Stats />
      <Footer />
    </main>
  );
}
