import BestResultsRanking from "@/components/BestResultsRanking";
import BestResultsGrid from "@/components/BestResultsGrid";
import BestResults from "@/components/BestResults";

// Página escondida só pra Lara comparar novas versões da seção
// "Os melhores resultados". Depois de escolher, aplicamos na home e apagamos.

function Label({
  n,
  title,
  desc,
}: {
  n: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="sticky top-0 z-30 bg-foreground text-background px-6 md:px-12 py-4">
      <div className="max-w-7xl mx-auto flex items-baseline gap-3 md:gap-4 flex-wrap">
        <span className="font-display font-black text-primary text-lg md:text-xl">
          {n}
        </span>
        <span className="font-display font-black uppercase tracking-tight text-sm md:text-base">
          {title}
        </span>
        <span className="text-background/60 text-xs md:text-sm">{desc}</span>
      </div>
    </div>
  );
}

export default function DestaquesPreviewPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="bg-primary text-primary-light px-6 md:px-12 py-3 text-center text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
        Preview · nova seção de resultados · vídeo menor, número em destaque
      </div>

      <Label
        n="A"
        title="Ranking"
        desc="vídeo pequeno + número gigante, lista editorial"
      />
      <BestResultsRanking />

      <Label
        n="B"
        title="Quadro de honra"
        desc="4 cases menores lado a lado, número forte embaixo"
      />
      <BestResultsGrid />

      <Label
        n="00"
        title="Atual"
        desc="o que está no ar hoje (pra comparar)"
      />
      <BestResults />
    </main>
  );
}
