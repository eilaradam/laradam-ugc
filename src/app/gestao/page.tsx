import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gestão · Lara Dam",
  description: "Área de gestão.",
};

export default function GestaoPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-24">
        <section className="px-6 md:px-12 py-16 md:py-24 max-w-5xl mx-auto">
          <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary font-medium mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            Gestão
          </div>

          <h1 className="font-display font-black text-4xl md:text-6xl leading-[0.95] tracking-tighter text-foreground max-w-3xl">
            Em{" "}
            <span className="font-serif-accent italic text-primary">
              breve
            </span>
            .
          </h1>

          <p className="mt-6 text-foreground-soft text-base md:text-lg max-w-xl leading-relaxed">
            Esta página está sendo preparada — conta pra mim o que você quer
            mostrar aqui que eu monto (landing do MeuManager, área logada,
            dashboard de parcerias, outra coisa).
          </p>

          <div className="mt-10">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 border border-foreground/20 rounded-full text-sm font-semibold hover:bg-foreground hover:text-background transition-colors"
            >
              Voltar pro portfólio
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
