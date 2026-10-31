import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import NavLaranja from "@/components/laranja/NavLaranja";
import HeroLaranja from "@/components/laranja/HeroLaranja";
import FaixaLaranja from "@/components/laranja/FaixaLaranja";
import SobreLaranja from "@/components/laranja/SobreLaranja";
import ServicosLaranja from "@/components/laranja/ServicosLaranja";
import Stats from "@/components/Stats";
import BrandsMarquee from "@/components/BrandsMarquee";
import BestResults from "@/components/BestResults";
import CategoryGallery from "@/components/CategoryGallery";
import YouTubeAds from "@/components/YouTubeAds";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import TagBarra from "@/components/TagBarra";
import MenuEmbaixo from "@/components/MenuEmbaixo";

// Prévia da versão laranja (creme + preto + laranja), fora do Google até a Lara aprovar.
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = { title: "Lara Dam — versão laranja", robots: { index: false, follow: false } };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function Laranja() {
  return (
    <div className={`tema-laranja ${outfit.variable} flex-1 flex flex-col`}>
      <TagBarra />
      <main className="flex-1 pt-[var(--barra-topo,0px)] pb-16 md:pb-0">
        <NavLaranja />
        <HeroLaranja
          fundo={[
            { src: "/capa/1-sorriso.webp", cor: "#D7CDC4" },
            { src: "/capa/2-seria.webp", cor: "#D9D0C9" },
            { src: "/capa/3-cabelo.webp", cor: "#D6CDC5" },
            { src: "/capa/4-risada.webp", cor: "#DAD1CA" },
          ]}
        />
        <FaixaLaranja />
        <Stats />
        <SobreLaranja />
        <BrandsMarquee />
        <BestResults />
        <CategoryGallery />
        <YouTubeAds />
        <ServicosLaranja />
        <Testimonials />
        <Contact />
        <Footer />
        <MenuEmbaixo />
      </main>
    </div>
  );
}
