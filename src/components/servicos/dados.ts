import { VIDEOS, type Video } from "@/data/content";
import { SERVICOS } from "@/components/ServicesScrapbook";

export { SERVICOS };

// 3 trabalhos por serviço pros leques/colagens (vídeo do portfólio ou foto do ensaio no publi post)
export type Peca = { video?: Video; foto?: string };
const v = (id: string): Peca | null => {
  const video = VIDEOS.find((x) => x.youtubeId === id);
  return video ? { video } : null;
};
export const PECAS: Peca[][] = [
  [v("5wf8Fv2CTa4"), v("wesTfq67X9o"), v("J7_OQ-y0v0g")],
  [v("08Bl9O930Kg"), v("IcBBViuO6Gw"), v("TbRE2_mezCg")],
  [{ foto: "/capa/3-cabelo.webp" }, { foto: "/ensaio/capa-caixa-rosto.webp" }, { foto: "/capa/4-risada.webp" }],
  [v("AXzcHi_Qq_Y"), v("R-PC_tGXdFk"), v("vFmYLAliwIk")],
].map((l) => l.filter(Boolean) as Peca[]);

export const videoDoServico = (i: number): Video | null => {
  const s = SERVICOS[i];
  return s.youtubeId ? { id: `servico-${i}`, title: s.titulo, category: "tech", brand: s.marca ?? "", youtubeId: s.youtubeId } : null;
};
