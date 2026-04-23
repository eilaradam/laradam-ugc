import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import CategoryGallery from "@/components/CategoryGallery";
import Brands from "@/components/Brands";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-1">
      <Nav />
      <Hero />
      <Marquee />
      <Stats />
      <About />
      <Services />
      <CategoryGallery />
      <Brands />
      <Contact />
      <Footer />
    </main>
  );
}
