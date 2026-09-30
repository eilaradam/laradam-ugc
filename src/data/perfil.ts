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
    "🎬 vídeo que vende pra sua marca (UGC, publi, criativos, roteiro)",
    "📍 Litoral de SP",
  ],
  balao: "Oi! Eu gravo **vídeo que vende** pra sua marca e faço **publi que conversa** no meu perfil. Sem cara de anúncio.",
  nota: "← me chama pra conversarmos sobre a sua empresa ou conteúdo pra sua marca",
  carimbo: "100M+ views",
};

export const FAIXA = ["500 vídeos gravados", "200 marcas", "100M+ views", "2.4x ROAS", "InfinitePay", "Méliuz", "DT3", "Logitech", "Airbnb", "Beauty Fair"];

export const NAV = [
  { id: "resultados", rotulo: "Resultados", emoji: "📊" },
  { id: "videos", rotulo: "Vídeos", emoji: "🎬" },
  { id: "publi", rotulo: "Publi", emoji: "📱" },
  { id: "marcas", rotulo: "Marcas", emoji: "🤝" },
  { id: "depoimentos", rotulo: "Depoimentos", emoji: "💬" },
  { id: "sobre", rotulo: "Sobre", emoji: "👋" },
  { id: "contato", rotulo: "Contato", emoji: "✉️" },
];

export const RESULTADOS = {
  titulo: "Números que importam 📊",
  sub: "O que o meu conteúdo já entregou pras marcas. Os vídeos abaixo são os maiores cases: clica pra assistir.",
  numeros: [
    { v: "100M+", k: "views em campanhas" },
    { v: "500+", k: "vídeos gravados" },
    { v: "200+", k: "marcas parceiras" },
    { v: "2.4x", k: "ROAS médio com ads" },
    { v: "38%", k: "de CPA a menos" },
    { v: "2 anos", k: "de estrada" },
  ],
  // Os 4 cases de destaque (mesmos do site atual). Cada um vira um card com
  // o vídeo do YouTube ao lado; a capa vem de /public/best-*.jpg.
  cases: [
    { youtubeId: "5wf8Fv2CTa4", capa: "/best-infinitepay.jpg", nota: "← o maior case", marca: "InfinitePay", categoria: "financas", metrica: "+100 milhões de views", onde: "apenas no TikTok", detalhe: "Recorde de CTR no Meta. O vídeo virou o criativo principal da campanha." },
    { youtubeId: "wesTfq67X9o", capa: "/best-meliuz.jpg", nota: "← roteiro + criativo", marca: "Méliuz", categoria: "financas", metrica: "+30 milhões de views", onde: "apenas no TikTok", detalhe: "Campanha de mercado com cashback, feita pra growth." },
    { youtubeId: "2s6BI893C74", capa: "/best-bready.jpg", nota: "← o que mais converteu", marca: "Bready", categoria: "gastronomia", metrica: "5,94x de ROAS", onde: "anúncios de performance", detalhe: "Criativo pra tráfego pago: cada R$ 1 investido voltou quase 6." },
    { youtubeId: "dgQYEfEQTvQ", capa: "/best-meliuz-cashback.jpg", nota: "← campanha 360°", marca: "Méliuz Cashback", categoria: "financas", metrica: "1.023 vídeos", onde: "campanha 360°", detalhe: "Volume com consistência: uma campanha inteira com a minha cara.", stats: ["5,6M de views", "66 mil salvamentos"] },
  ],
};

export const NICHO_EMOJI: Record<string, string> = {
  ia: "🤖", tech: "📱", gastronomia: "🍝", casa: "🛋️", beleza: "💄", financas: "💸", food: "🍹", saude: "🏃‍♀️", moda: "👗", viagem: "✈️",
};

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
