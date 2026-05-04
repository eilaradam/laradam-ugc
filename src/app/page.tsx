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
      {/* Aumenta tipografia global em 30% só na home (rem-based) */}
      <style dangerouslySetInnerHTML={{ __html: 'html { font-size: 20.8px; }' }} />
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
