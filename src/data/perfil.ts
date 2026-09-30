// Conteúdo da página /perfil (o site como um perfil de Instagram).
// Fotos em /public/ensaio. Vídeos, depoimentos e logos vêm de content.ts.

export const PERFIL = {
  usuario: "eilaradam",
  instagramUrl: "https://instagram.com/eilaradam",
  whatsapp: "5512988729264",
  whatsappLabel: "(12) 98872-9264",
  email: "laradam.ugc@gmail.com",
  avatar: "/ensaio/cara-01.webp",
  fallback: { followers: 16039, reach_month: 367702, posts: 141 },
  bioTitulo: "Lara Dam 👋 UGC creator & influenciadora",
  bio: [
    "🎬 vídeo que vende pra sua marca (UGC, criativos, roteiro)",
    "📱 publi que conversa no meu perfil (reels, stories, collab)",
    "📍 Litoral de SP · 🤝 InfinitePay, Méliuz, DT3, Logitech, Airbnb",
  ],
  balao: "Oi! Eu gravo **vídeo que vende** pra sua marca e faço **publi que conversa** no meu perfil. Sem cara de anúncio.",
  nota: "← me chama que eu respondo em até 48h",
  carimbo: "100M+ views",
};

export const FAIXA = ["500 vídeos gravados", "200 marcas", "100M+ views", "2.4x ROAS", "InfinitePay", "Méliuz", "DT3", "Logitech", "Airbnb", "Beauty Fair"];

export type Aba = "feed" | "reels" | "publi" | "marcas";

export type Destaque = { id: string; rotulo: string; foto?: string; emoji?: string; cor?: string; aba?: Aba; alvo?: string };
export const DESTAQUES: Destaque[] = [
  { id: "ugc", rotulo: "UGC", foto: "/ensaio/ugc-caixas.webp", aba: "reels", alvo: "grade" },
  { id: "publi", rotulo: "Publi", foto: "/ensaio/publi-janela.webp", aba: "publi", alvo: "grade" },
  { id: "marcas", rotulo: "Marcas", emoji: "🤝", cor: "var(--amarelo)", aba: "marcas", alvo: "grade" },
  { id: "bastidores", rotulo: "Bastidores", foto: "/ensaio/ugc-tripe.webp", alvo: "caras" },
  { id: "depoimentos", rotulo: "Depoimentos", emoji: "💬", cor: "var(--rosa)", alvo: "depoimentos" },
  { id: "sobre", rotulo: "Sobre", foto: "/ensaio/sobre.webp", alvo: "sobre" },
  { id: "contato", rotulo: "Contato", emoji: "✉️", cor: "var(--lilas)", alvo: "contato" },
];

export type Tile =
  | { tipo: "foto"; src: string; posicao?: string; pill?: string; pillClaro?: boolean; cap?: string; icone: "play" | "grade" | "pessoa"; aba?: Aba; alvo?: string; video?: string }
  | { tipo: "texto"; cor: "azul" | "amarelo" | "rosa" | "verde" | "lilas" | "pessego" | "menta"; emoji: string; titulo: string; corpo: string; cta: string; aba?: Aba; alvo?: string };

export const FEED: Tile[] = [
  { tipo: "foto", src: "/ensaio/capa.webp", posicao: "center 20%", pill: "100M+ views", icone: "play", video: "t0a" },
  { tipo: "texto", cor: "azul", emoji: "🎬", titulo: "Vídeo que vende pra sua marca", corpo: "UGC de conversão, criativos pra tráfego e roteiro validado por performance.", cta: "Ver os reels", aba: "reels", alvo: "grade" },
  { tipo: "foto", src: "/ensaio/ugc-caixas.webp", posicao: "center 30%", pill: "📦 e-commerce", pillClaro: true, icone: "grade", aba: "reels", alvo: "grade" },
  { tipo: "foto", src: "/ensaio/publi-janela.webp", posicao: "center 25%", pill: "Publi · Parceria paga", cap: "16 mil seguidores · 368 mil de alcance no mês", icone: "play", aba: "publi", alvo: "grade" },
  { tipo: "texto", cor: "amarelo", emoji: "📈", titulo: "2.4x de ROAS. 200+ marcas.", corpo: "Conteúdo que virou playbook de criativo pra InfinitePay, Méliuz e DT3.", cta: "Ver as marcas", aba: "marcas", alvo: "grade" },
  { tipo: "foto", src: "/ensaio/caixas-0009.webp", posicao: "center 40%", pill: "🎥 bastidores", pillClaro: true, icone: "play", alvo: "caras" },
  { tipo: "texto", cor: "rosa", emoji: "💬", titulo: "“A Lara é a creator que mais converte.”", corpo: "Méliuz · roteiro + criativo pra growth", cta: "Ler depoimentos", alvo: "depoimentos" },
  { tipo: "foto", src: "/ensaio/sobre-sofa.webp", posicao: "center 25%", pill: "👋 sobre a Lara", pillClaro: true, icone: "pessoa", alvo: "sobre" },
  { tipo: "texto", cor: "lilas", emoji: "✉️", titulo: "Quer gravar comigo?", corpo: "Conta o projeto e eu respondo em até 48h.", cta: "Chamar a Lara", alvo: "contato" },
];

export const NICHO_EMOJI: Record<string, string> = {
  ia: "🤖", tech: "📱", gastronomia: "🍝", casa: "🛋️", beleza: "💄", financas: "💸", food: "🍹", saude: "🏃‍♀️", moda: "👗", viagem: "✈️",
};
export const MELHORES = ["t0a", "t0b", "t-infinitepay", "b1", "g-oliv1", "d-noroeste", "s-pharma-pdrn", "t-meidigital", "ia1", "va3", "d1", "s1"];

export const CARAS = [
  { src: "/ensaio/cara-01.webp", legenda: "o hook" },
  { src: "/ensaio/cara-02.webp", legenda: "chegou o produto" },
  { src: "/ensaio/cara-03.webp", legenda: "o problema" },
  { src: "/ensaio/cara-04.webp", legenda: "a dúvida" },
  { src: "/ensaio/cara-05.webp", legenda: "o segredo" },
  { src: "/ensaio/cara-06.webp", legenda: "a novidade" },
  { src: "/ensaio/cara-07.webp", legenda: "o teste" },
  { src: "/ensaio/cara-08.webp", legenda: "a reação" },
  { src: "/ensaio/cara-09.webp", legenda: "o resultado" },
  { src: "/ensaio/cara-10.webp", legenda: "o antes" },
  { src: "/ensaio/cara-11.webp", legenda: "a prova" },
  { src: "/ensaio/cara-12.webp", legenda: "o CTA" },
];

export const PUBLI = {
  titulo: "Publi no @eilaradam",
  sub: "A sua marca no meu feed, com a minha cara e a minha voz. Os números são ao vivo, direto da API do Instagram.",
  foto: "/ensaio/publi-janela.webp",
  legenda: "a sua marca no meu feed, do jeito que a minha audiência já gosta de ver 🫶",
  formatos: [
    { e: "🎬", nome: "Reels", desc: "Vídeo no feed com roteiro e edição pensados pra alcance." },
    { e: "⚡", nome: "Stories", desc: "Sequência com CTA, caixinha de pergunta e link direto." },
    { e: "🖼️", nome: "Carrossel", desc: "Post com direção de arte e copy que segura até o fim." },
    { e: "🤝", nome: "Collab", desc: "Publicação em conjunto, somando as duas audiências." },
  ],
  porques: [
    "Entra no feed como conteúdo, não como anúncio disfarçado.",
    "Quem me segue é creator, empreendedora e gente que compra o que eu testo.",
    "Você recebe alcance, views, salvamentos e cliques depois da publicação.",
  ],
};

export const SOBRE = {
  foto: "/ensaio/sobre.webp",
  titulo: "Oie, eu sou a Lara Dam 👋",
  p1: "Tenho 27 anos, moro no Litoral de SP e há 2 anos vivo de criar conteúdo. Comecei gravando UGC pra marcas e hoje faço as duas coisas: vídeo que roda como anúncio pra mais de 200 marcas e publi no meu perfil, pra uma audiência que acompanha meus bastidores.",
  p2: "Também ensino outras creators a organizar a carreira. Então entendo os dois lados da mesa: o da marca que precisa de resultado e o da creator que precisa de briefing claro.",
  pills: ["+200 marcas parceiras", "Litoral de SP · Brasil", "500+ vídeos", "2 anos de estrada"],
  ficha: [
    { k: "Formatos", v: "9:16 · 16:9 · 4:5" },
    { k: "Entrega", v: "Editado, com legenda e variações de hook" },
    { k: "Direitos de uso", v: "Combinados em contrato" },
    { k: "Prazo", v: "A partir de 7 dias" },
  ],
};
