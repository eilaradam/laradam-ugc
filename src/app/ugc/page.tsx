// Portfólio UGC: MESMA estrutura e capa da home (src/app/page.tsx), só com a
// pele do mídia kit (cores azul/branco/navy + Plus Jakarta), aplicada no layout.
// Rota de prévia; quando a Lara aprovar, a home passa a usar a mesma pele.
import type { Metadata, Viewport } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/heroes/HeroOption6";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import About from "@/components/About";
import BrandsMarquee from "@/components/BrandsMarquee";
import Services from "@/components/ServicesScrapbook";
import BestResults from "@/components/BestResults";
import CategoryGallery from "@/components/CategoryGallery";
import YouTubeAds from "@/components/YouTubeAds";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import TagBarra from "@/components/TagBarra";

export const metadata: Metadata = {
  title: "Lara Dam — UGC Creator & Content Strategist",
  description: "Portfólio de Lara Dam: UGC Creator com +500 vídeos gravados e +200 parceiros. Criativos de alta conversão para marcas que buscam destaque.",
  robots: { index: false, follow: false },
};

// Igual à home: celular mostra o layout de desktop encolhido.
export const viewport: Viewport = { width: 1280, initialScale: 0.34 };

export default function UgcPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (pointer: coarse) {
          html { font-size: 20px; }
          .lara-hero-grid { padding-top: 60px !important; }
          .lara-hero-photo { height: 640px !important; }
        }
      ` }} />
      <TagBarra />
      <main className="flex-1 pt-[var(--barra-topo,0px)]">
        <Nav />
        {/* capa do /ugc: foto do ensaio com a caixa ao lado do rosto, recortada (outras prontas: capa-caixas.webp = abraçando caixas, capa-torre.webp = torre) */}
        <Hero foto="/ensaio/capa-caixa-rosto.webp" />
        <Marquee />
        <Stats />
        <About />
        <BrandsMarquee />
        <BestResults />
        <CategoryGallery />
        <YouTubeAds />
        <Services />
        <Testimonials />
        <Contact />
        <Footer />
        <LeadCapturePopup />
      </main>
    </>
  );
}
