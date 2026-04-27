import Link from "next/link";

const OPTIONS = [
  { slug: "capa-1", name: "Capa 1 — Editorial Soft", desc: "Card peachy contido, serif Fraunces, padrão decorativo" },
  { slug: "capa-2", name: "Capa 2 — Magazine Cover", desc: "Foto full-bleed, masthead, tipografia gigante estilo Vogue" },
  { slug: "capa-3", name: "Capa 3 — Bento Grid", desc: "Cells modulares: foto + título + stats + CTA" },
  { slug: "capa-4", name: "Capa 4 — Brutalist Bold", desc: "Tipografia massiva, bordas duras, alto contraste" },
  { slug: "capa-5", name: "Capa 5 — Minimal Centered", desc: "Centralizado, foto circular, serif elegante, whitespace" },
  { slug: "capa-6", name: "Capa 6 — Split com UGC backdrop", desc: "Split screen, 'UGC' gigante atrás da foto, bubbles flutuantes, CTA verde-oliva" },
];

export default function CapasIndex() {
  return (
    <main className="min-h-screen bg-background px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display font-black text-3xl md:text-5xl tracking-tighter text-foreground mb-3">
          5 opções de capa
        </h1>
        <p className="text-foreground-soft text-base md:text-lg mb-12">
          Clica em cada uma pra ver o resultado completo.
        </p>

        <div className="space-y-3">
          {OPTIONS.map((opt) => (
            <Link
              key={opt.slug}
              href={`/${opt.slug}`}
              className="group flex items-center justify-between gap-6 p-5 md:p-6 rounded-2xl border border-foreground/10 hover:border-primary/40 hover:bg-primary-light/40 transition-all"
            >
              <div className="min-w-0">
                <div className="font-display font-black text-foreground text-lg md:text-xl tracking-tight group-hover:text-primary transition-colors">
                  {opt.name}
                </div>
                <div className="text-foreground-soft text-sm md:text-base mt-1">
                  {opt.desc}
                </div>
              </div>
              <span className="text-primary text-2xl md:text-3xl font-light group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-foreground/10">
          <Link href="/" className="text-sm text-foreground-soft hover:text-primary transition-colors">
            ← Voltar pra home atual
          </Link>
        </div>
      </div>
    </main>
  );
}
