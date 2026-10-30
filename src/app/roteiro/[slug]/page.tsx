import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Poppins } from "next/font/google";
import { supabaseAdmin } from "@/lib/supabase";
import type { Nota, RoteiroConteudo, RoteiroPublico } from "@/lib/roteiro";
import RoteiroPage from "@/components/roteiro/RoteiroPage";

// Roteiro compartilhado com a marca. Link direto, fora do menu e do Google.
const poppins = Poppins({ variable: "--rt-font", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ k?: string }>;
};

async function buscar(slug: string) {
  const db = supabaseAdmin();
  const { data } = await db
    .from("roteiros_marca")
    .select("id, slug, chave_lara, conteudo, gancho_escolhido, gancho_escolhido_por, aprovado_em, aprovado_por, updated_at")
    .eq("slug", slug)
    .maybeSingle();
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = await buscar(slug);
  const marca = (r?.conteudo as RoteiroConteudo | undefined)?.marca;
  return {
    title: marca ? `Roteiro ${marca} · Lara Dam` : "Roteiro · Lara Dam",
    description: "Roteiro de vídeo UGC pra revisar, comentar e aprovar.",
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const { k } = await searchParams;
  const r = await buscar(slug);
  if (!r) notFound();

  const { data: notas } = await supabaseAdmin()
    .from("roteiros_marca_notas")
    .select("id, parent_id, alvo, tipo, autor, autor_lara, texto, original, sugerido, status, created_at")
    .eq("roteiro_id", r.id)
    .order("created_at", { ascending: true });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, chave_lara, ...roteiro } = r;
  const lara = typeof k === "string" && k === chave_lara;

  return (
    <div className={poppins.variable}>
      <RoteiroPage
        inicial={roteiro as RoteiroPublico}
        notasIniciais={(notas ?? []) as Nota[]}
        chave={lara ? k : undefined}
      />
    </div>
  );
}
