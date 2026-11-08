// celRight: quanto a foto sai pela direita no celular (padrão -42%); menos negativo mostra mais o lado direito da foto
// pcRight: distância da foto até a borda direita no computador (padrão 0); maior leva a foto pra esquerda
export type FotoFundo = { src: string; cor: string; celRight?: string; pcRight?: string };

// Foto de fundo da capa: só a primeira da lista, com um zoom lento ao abrir (capa-zoom no globals.css).
// A Lara cansou do loop trocando as 4 fotos; pra mudar a foto, troque a ordem da lista na página.
// A foto vertical fica à direita, numa parede da mesma cor dela, com a borda esquerda
// se misturando na parede.
// modo "bloco": no celular a foto fica num quadro abaixo do texto, em vez de fundo da capa.
export default function FundoTrocando({ fotos, modo = "fundo", className = "" }: { fotos: FotoFundo[]; modo?: "fundo" | "bloco"; className?: string }) {
  const bloco = modo === "bloco";
  const f = fotos[0];
  if (!f) return null;

  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute inset-0" style={{ background: f.cor }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={f.src}
          alt=""
          fetchPriority="high"
          className={`capa-zoom ${bloco ? "absolute inset-0 w-full h-full object-cover object-top" : "absolute right-[var(--cel-right,-42%)] md:right-[var(--pc-right,0px)] top-0 h-full w-auto max-w-none object-cover object-top"}`}
          style={bloco ? undefined : {
            ...(f.celRight ? { "--cel-right": f.celRight } : {}),
            ...(f.pcRight ? { "--pc-right": f.pcRight } : {}),
            maskImage: "linear-gradient(to right, transparent 0%, black 22%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 22%)",
          }}
        />
      </div>
      {/* clareia a esquerda pra o texto ler bem em cima da parede */}
      {!bloco && <div className="absolute inset-0 bg-gradient-to-r from-background from-30% via-background/50 via-45% to-transparent to-60%" />}
    </div>
  );
}
