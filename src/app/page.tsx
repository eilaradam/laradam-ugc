import type { Viewport } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/heroes/HeroOption6";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import About from "@/components/About";
import BrandsMarquee from "@/components/BrandsMarquee";
import Services from "@/components/Services";
import BestResults from "@/components/BestResults";
import CategoryGallery from "@/components/CategoryGallery";
import YouTubeAds from "@/components/YouTubeAds";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LeadCapturePopup from "@/components/LeadCapturePopup";

// Força layout desktop também no mobile — celular vai mostrar a página
// renderizada a 1280px, encolhida pra caber. Visitante pode pinch-zoom.
export const viewport: Viewport = {
  width: 1280,
  initialScale: 0.34,
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
          .lara-popup {
            top: 50% !important;
            left: 50% !important;
            right: auto !important;
            bottom: auto !important;
            transform: translate(-50%, -50%) !important;
            width: 420px !important;
            inset-inline: auto !important;
          }
        }
      ` }} />
      <main className="flex-1">
        <Nav />
      <Hero />
      <Marquee />
      <Stats />
      <About />
      <BrandsMarquee />
      <Services />
      <BestResults />
      <CategoryGallery />
      <YouTubeAds />
      <Testimonials />
      <Contact />
      <Footer />
        <LeadCapturePopup />
      </main>
    </>
  );
}
