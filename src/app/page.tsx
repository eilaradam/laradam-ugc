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
import MenuEmbaixo from "@/components/MenuEmbaixo";

// Força layout desktop também no mobile — celular vai mostrar a página
// renderizada a 1280px, encolhida pra caber. Visitante pode pinch-zoom.
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function Home() {
  return (
    <>

      <TagBarra />
      <main className="flex-1 pt-[var(--barra-topo,0px)] pb-16 md:pb-0">
        <Nav menuEmbaixo />
      <Hero
        fundo={[
          { src: "/capa/1-sorriso.webp", cor: "#D7CDC4" },
          { src: "/capa/2-seria.webp", cor: "#D9D0C9" },
          { src: "/capa/3-cabelo.webp", cor: "#D6CDC5" },
          { src: "/capa/4-risada.webp", cor: "#DAD1CA" },
        ]}
      />
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
        <MenuEmbaixo />
      </main>
    </>
  );
}
