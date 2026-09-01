import { getSupabase } from "@/lib/supabase";
import type { HeroFoto } from "@/data/content";
import { HERO_FOTOS } from "@/data/content";

/**
 * Banner da capa. A Lara cria e troca pelo /admin conforme a época
 * (Black Friday, Natal, Dia das Mães...). Só um fica ativo por vez.
 * Se o banco estiver fora do ar ou vazio, o site cai no BANNER_PADRAO
 * e a capa nunca aparece quebrada.
 */
export type Banner = {
  id?: string;
  nome: string;
  ativo?: boolean;
  eyebrow: string;
  titulo: string;
  destaque: string;
  sublinha: string;
  cta_texto: string;
  cta_link: string;
  link_texto: string;
  link_href: string;
  fotos: HeroFoto[];
};

export const BANNER_PADRAO: Banner = {
  nome: "Padrão",
  eyebrow: "UGC Creator & Content Strategist",
  titulo: "conteúdo que",
  destaque: "converte.",
  sublinha: "Sou a Lara Dam: +500 vídeos, +200 marcas parceiras e +100M de views.",
  cta_texto: "Agendar uma conversa",
  cta_link: "#contato",
  link_texto: "Ver portfólio",
  link_href: "#categorias",
  fotos: HERO_FOTOS,
};

/** Completa o que vier vazio do banco com o padrão, campo a campo. */
export function normalizaBanner(b: Partial<Banner> | null | undefined): Banner {
  if (!b) return BANNER_PADRAO;
  const texto = (v: unknown, padrao: string) =>
    typeof v === "string" && v.trim() ? v.trim() : padrao;
  const fotos = Array.isArray(b.fotos) ? b.fotos.filter((f) => f && f.src) : [];
  return {
    id: b.id,
    nome: texto(b.nome, BANNER_PADRAO.nome),
    eyebrow: texto(b.eyebrow, BANNER_PADRAO.eyebrow),
    titulo: texto(b.titulo, BANNER_PADRAO.titulo),
    destaque: texto(b.destaque, BANNER_PADRAO.destaque),
    sublinha: texto(b.sublinha, BANNER_PADRAO.sublinha),
    cta_texto: texto(b.cta_texto, BANNER_PADRAO.cta_texto),
    cta_link: texto(b.cta_link, BANNER_PADRAO.cta_link),
    link_texto: texto(b.link_texto, BANNER_PADRAO.link_texto),
    link_href: texto(b.link_href, BANNER_PADRAO.link_href),
    fotos: fotos.length ? fotos : BANNER_PADRAO.fotos,
  };
}

export async function getBannerAtivo(): Promise<Banner> {
  try {
    const { data } = await getSupabase()
      .from("hero_banners")
      .select("*")
      .eq("ativo", true)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    return normalizaBanner(data as Partial<Banner> | null);
  } catch {
    return BANNER_PADRAO;
  }
}
