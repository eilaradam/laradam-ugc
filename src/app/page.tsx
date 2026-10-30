import type { Viewport } from "next";
import Nav from "@/components/Nav";
import Capa from "@/components/portfolio/Capa";
import BrandsMarquee from "@/components/BrandsMarquee";
import Resultados from "@/components/portfolio/Resultados";
import Galeria from "@/components/portfolio/Galeria";
import YouTubeAds from "@/components/YouTubeAds";
import Testimonials from "@/components/Testimonials";
import Servicos from "@/components/portfolio/Servicos";
import About from "@/components/About";
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
        {/* Ordem pensada pra marca: quem é + números, quem já confiou, prova (resultados e vídeos do nicho dela),
            o que dá pra contratar, e só então o "sobre" e o contato. */}
        <Capa />
        <BrandsMarquee />
        <Resultados />
        <Galeria />
        <YouTubeAds />
        <Testimonials />
        <Servicos />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
