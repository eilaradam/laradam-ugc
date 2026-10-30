import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { Poppins } from "next/font/google";
import { supabaseAdmin } from "@/lib/supabase";
import type { Nota, RoteiroConteudo, RoteiroPublico } from "@/lib/roteiro";
import { sendRoteiroAviso } from "@/lib/resend";
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
    .select("id, slug, chave_lara, conteudo, gancho_escolhido, gancho_escolhido_por, aprovado_em, aprovado_por, updated_at, visualizacoes")
    .eq("slug", slug)
    .maybeSingle();
  return data;
}

// Prévia de link (WhatsApp, Gmail, Slack…) e robôs não contam como a marca abrindo.
const NAO_CONTA = /bot|crawl|spider|preview|facebookexternalhit|whatsapp|telegram|slack|discord|twitter|linkedin|skype|curl|wget|headless/i;

async function contarVisita(r: { id: string; slug: string; chave_lara: string; conteudo: unknown; visualizacoes: number | null }) {
  const ua = (await headers()).get("user-agent") ?? "";
  if (!ua || NAO_CONTA.test(ua)) return;
  const n = (r.visualizacoes ?? 0) + 1;
  await supabaseAdmin().from("roteiros_marca").update({ visualizacoes: n, visto_em: new Date().toISOString() }).eq("id", r.id);
  if (n === 1) {
    const marca = (r.conteudo as RoteiroConteudo).marca;
    await sendRoteiroAviso({
      assunto: `👀 ${marca} abriu o roteiro`,
      linhas: [`A marca abriu o roteiro ${marca} pela primeira vez.`],
      link: `https://ugc.laradam.com/roteiro/${r.slug}?k=${r.chave_lara}`,
    }).catch(() => {});
  }
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
  const { id, chave_lara, visualizacoes, ...roteiro } = r;
  const lara = typeof k === "string" && k === chave_lara;
  if (!lara) await contarVisita(r);

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
