import type { Viewport } from "next";
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
import TagBarra from "@/components/TagBarra";

// Força layout desktop também no mobile — celular vai mostrar a página
// renderizada a 1280px, encolhida pra caber. Visitante pode pinch-zoom.
// 0.28 = 360/1280: cabe inteiro até no celular mais estreito; nos maiores o navegador
// limita o zoom pra encaixar a largura. (0.34 cortava ~130px da direita num iPhone de 390px.)
export const viewport: Viewport = {
  width: 1280,
  initialScale: 0.28,
};

export default function Home() {
  return (
    <>
      {/* Mobile-only overrides — só em dispositivos de toque (celular/tablet)
          Desktop (mouse) fica intacto. */}
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
      <Hero fundo={["/capa/1-sorriso.webp", "/capa/2-seria.webp", "/capa/3-cabelo.webp", "/capa/4-risada.webp"]} />
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
      </main>
    </>
  );
}
