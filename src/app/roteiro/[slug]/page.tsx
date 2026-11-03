import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { Poppins } from "next/font/google";
import { supabaseAdmin } from "@/lib/supabase";
import type { Nota, RoteiroConteudo, RoteiroPublico } from "@/lib/roteiro";
import { sendRoteiroAviso } from "@/lib/resend";
import RoteiroPage, { type Item } from "@/components/roteiro/RoteiroPage";

// Roteiro compartilhado com a marca. Link direto, fora do menu e do Google.
const poppins = Poppins({ variable: "--rt-font", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ k?: string; lang?: string }>;
};

const CAMPOS = "id, slug, chave_lara, conteudo, gancho_escolhido, gancho_escolhido_por, aprovado_em, aprovado_por, updated_at, visualizacoes";

async function buscar(slug: string) {
  const { data } = await supabaseAdmin().from("roteiros_marca").select(CAMPOS).eq("slug", slug).maybeSingle();
  return data;
}

// Prévia de link (WhatsApp, Gmail, Slack…) e robôs não contam como a marca abrindo.
const NAO_CONTA = /bot|crawl|spider|preview|facebookexternalhit|whatsapp|telegram|slack|discord|twitter|linkedin|skype|curl|wget|headless/i;

type Linha = NonNullable<Awaited<ReturnType<typeof buscar>>>;

// Os roteiros do mesmo grupo (vários pra mesma marca), na ordem em que foram criados.
async function buscarGrupo(r: Linha): Promise<Linha[]> {
  const grupo = (r.conteudo as RoteiroConteudo).grupo;
  if (!grupo) return [r];
  const { data } = await supabaseAdmin()
    .from("roteiros_marca")
    .select(CAMPOS)
    .eq("conteudo->>grupo", grupo)
    .order("created_at", { ascending: true });
  return data?.length ? data : [r];
}

async function contarVisita(r: Linha, grupo: Linha[]) {
  const ua = (await headers()).get("user-agent") ?? "";
  if (!ua || NAO_CONTA.test(ua)) return;
  const n = (r.visualizacoes ?? 0) + 1;
  await supabaseAdmin().from("roteiros_marca").update({ visualizacoes: n, visto_em: new Date().toISOString() }).eq("id", r.id);
  // num grupo, o aviso sai só uma vez
  const jaAbriuOutra = grupo.some((g) => g.id !== r.id && (g.visualizacoes ?? 0) > 0);
  if (n === 1 && !jaAbriuOutra) {
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
  const { k, lang } = await searchParams;
  const r = await buscar(slug);
  if (!r) notFound();

  const lara = typeof k === "string" && k === r.chave_lara;
  const grupo = await buscarGrupo(r);
  if (!lara) await contarVisita(r, grupo);

  const { data: notas } = await supabaseAdmin()
    .from("roteiros_marca_notas")
    .select("roteiro_id, id, parent_id, alvo, tipo, autor, autor_lara, texto, original, sugerido, status, created_at")
    .in("roteiro_id", grupo.map((g) => g.id))
    .order("created_at", { ascending: true });

  const itens: Item[] = grupo.map((g) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, chave_lara, visualizacoes, ...roteiro } = g;
    return {
      inicial: roteiro as RoteiroPublico,
      notas: (notas ?? []).filter((n) => n.roteiro_id === id) as Nota[],
      chave: lara ? chave_lara : undefined,
    };
  });

  return (
    <div className={poppins.variable}>
      <RoteiroPage itens={itens} atual={r.slug} lang={lang} />
    </div>
  );
}
