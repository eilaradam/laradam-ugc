// Portfólio NOVO (duas frentes: UGC pra marcas + Publi no @eilaradam) com as
// fotos do ensaio de setembro/2026. Rota de prévia: fora do menu e não indexada.
// Quando a Lara aprovar, é só trocar o conteúdo de src/app/page.tsx por este.
import type { Metadata } from "next";
import NovoNav from "@/components/novo/NovoNav";
import NovoHero from "@/components/novo/NovoHero";
import TiraDeCaras from "@/components/novo/TiraDeCaras";
import FrenteUGC from "@/components/novo/FrenteUGC";
import FrentePubli from "@/components/novo/FrentePubli";
import NovoSobre from "@/components/novo/NovoSobre";
import Testimonials from "@/components/Testimonials";
import BrandsMarquee from "@/components/BrandsMarquee";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Lara Dam · UGC Creator & Influenciadora",
  description:
    "Portfólio de Lara Dam: UGC pra marcas (vídeos que convertem) e publi no @eilaradam (alcance real). +500 vídeos, +200 marcas, 100M+ views.",
  robots: { index: false, follow: false },
};

export default function NovoPortfolio() {
  return (
    <>
      <NovoNav />
      <main className="flex-1">
        <NovoHero />
        <TiraDeCaras />
        <FrenteUGC />
        <Testimonials />
        <BrandsMarquee />
        <FrentePubli />
        <NovoSobre />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
