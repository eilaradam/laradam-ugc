import type { Metadata } from "next";
import Link from "next/link";

// Vitrine das 3 direções novas do portfólio, pra Lara escolher (fora do Google)
export const metadata: Metadata = { title: "Lara Dam · portfólios novos", robots: { index: false, follow: false } };

const DIRECOES = [
  { href: "/novo/tv", nome: "Canal de TV", desc: "Cada nicho é um canal. Destaques no horário nobre, depoimentos no chat ao vivo.", fundo: "#0D0D0F", cor: "#F3EDE4", destaque: "#FF3B30", foto: "/capa/1-sorriso.webp" },
  { href: "/novo/revista", nome: "Revista", desc: "Capa de revista de moda, matéria de capa com os destaques e entrevista no lugar do Sobre.", fundo: "#EFE7DC", cor: "#16233F", destaque: "#B3261E", foto: "/capa/2-seria.webp" },
  { href: "/novo/feed", nome: "Feed", desc: "Tudo na língua do Reels: celulares, perfil, stories por nicho e contato em formato de DM.", fundo: "#0B0B0D", cor: "#F4EFE8", destaque: "#4C6FFF", foto: "/capa/3-cabelo.webp" },
];

export default function Novo() {
  return (
    <main className="flex-1 px-4 md:px-10 py-12 bg-[#F3EDE4] text-[#16233F]">
      <h1 className="font-display text-5xl md:text-7xl">3 portfólios novos</h1>
      <p className="mt-3 text-lg opacity-70">Escolha uma direção. Todas seguem o funil: Capa, Destaques, Sobre, Nichos e Contato.</p>
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {DIRECOES.map((d) => (
          <Link key={d.href} href={d.href} className="group rounded-3xl overflow-hidden border border-black/10 hover:-translate-y-1 transition-transform" style={{ background: d.fundo, color: d.cor }}>
            <div className="relative aspect-[4/3] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={d.foto} alt="" className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold">{d.nome} <span style={{ color: d.destaque }}>→</span></h2>
              <p className="mt-2 text-sm opacity-75">{d.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
