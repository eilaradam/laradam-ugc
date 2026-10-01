// Conteúdo da página /perfil (o site como um perfil de Instagram).
// Fotos em /public/ensaio. Vídeos, depoimentos e logos vêm de content.ts.

export const PERFIL = {
  usuario: "eilaradam",
  instagramUrl: "https://instagram.com/eilaradam",
  whatsapp: "5512988729264",
  whatsappLabel: "(12) 98872-9264",
  // mensagem que já chega pronta quando a marca clica em "Trabalhe comigo"
  whatsappUrl: "https://wa.me/5512988729264?text=" + encodeURIComponent("Oi Lara! Vi seu portfólio e quero conversar sobre conteúdo pra minha marca."),
  tiktok: "eularadam",
  tiktokUrl: "https://www.tiktok.com/@eularadam",
  email: "laradam.ugc@gmail.com",
  avatar: "/ensaio/avatar.webp", // foto do sofá, já recortada no rosto
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
  { id: "sobre", rotulo: "Sobre", emoji: "👋" },
  { id: "resultados", rotulo: "Resultados", emoji: "📊" },
  { id: "servicos", rotulo: "Serviços", emoji: "🛠️" },
  { id: "publi", rotulo: "Publi", emoji: "📱" },
  { id: "marcas", rotulo: "Marcas", emoji: "🤝" },
  { id: "depoimentos", rotulo: "Depoimentos", emoji: "💬" },
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
    { v: "+45%", k: "vendas no e-commerce com ads" },
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

export const PUBLI = {
  titulo: "Publi no @eilaradam",
  sub: "A sua marca no meu feed, com a minha cara e a minha voz. Os números são ao vivo, direto da API do Instagram.",
  foto: "/ensaio/publi-risada.webp", // P&B, risada com a mão no cabelo
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

// Publis reais do @eilaradam, ordenadas por curtidas (mais pra menos). `likes`/`comments`
// conferidos à mão pela Lara direto no Instagram (01/10): o `ig_insights_cache` do Supabase
// só traz o campo like_count/comments_count da API básica, que é SEMPRE orgânico e não soma
// o engajamento de quando o post rodou como anúncio (Partnership Ad) — por isso os números
// de curtida/comentário batiam baixo pra posts impulsionados. `saved`/`reach`/`views` vêm do
// endpoint de insights (mais confiável, não confirmado individualmente). Vídeo baixado
// localmente e tocado num player nativo, sem o embed do Instagram. "Tuyo Brasil" não deu pra baixar
// (post não embedável nem pelo conector pago); abre no Instagram em vez do player.
export type PubliReal = {
  id: string;
  brand: string;
  instagram: string;
  thumbnail: string;
  videoLocal?: string;
  externo?: boolean;
  likes: number;
  comments: number;
  saved: number;
  reach: number;
  views: number;
};

export const PUBLIS_REAIS: PubliReal[] = [
  { id: "pub1", brand: "Ateliê", instagram: "DWPVV24RIF5", thumbnail: "/capas-ig/DWPVV24RIF5.webp", videoLocal: "/videos-ig/DWPVV24RIF5.mp4", likes: 7209, comments: 19, saved: 68, reach: 5135, views: 6871 },
  { id: "pub2", brand: "Lemon Cash", instagram: "DZP-u0lRVVr", thumbnail: "/capas-ig/DZP-u0lRVVr.webp", videoLocal: "/videos-ig/DZP-u0lRVVr.mp4", likes: 3695, comments: 97, saved: 61, reach: 4203, views: 6111 },
  { id: "pub3", brand: "Lemon Cash", instagram: "DZvPC4JRnO3", thumbnail: "/capas-ig/DZvPC4JRnO3.webp", videoLocal: "/videos-ig/DZvPC4JRnO3.mp4", likes: 3157, comments: 25, saved: 18, reach: 2925, views: 4030 },
  { id: "pub4", brand: "BF Colchões", instagram: "DSFvE1JkQCi", thumbnail: "/capas-ig/DSFvE1JkQCi.webp", videoLocal: "/videos-ig/DSFvE1JkQCi.mp4", likes: 807, comments: 22, saved: 43, reach: 4880, views: 7168 },
  { id: "pub5", brand: "DT3 Office", instagram: "DUtk0aqkTSe", thumbnail: "/capas-ig/DUtk0aqkTSe.webp", videoLocal: "/videos-ig/DUtk0aqkTSe.mp4", likes: 580, comments: 71, saved: 169, reach: 7662, views: 10632 },
  { id: "pub6", brand: "Inglot", instagram: "DKxTbCNAADz", thumbnail: "/capas-ig/DKxTbCNAADz.webp", videoLocal: "/videos-ig/DKxTbCNAADz.mp4", likes: 354, comments: 49, saved: 165, reach: 5915, views: 9715 },
  { id: "pub7", brand: "Gamma", instagram: "DPWpciuke14", thumbnail: "/capas-ig/DPWpciuke14.webp", videoLocal: "/videos-ig/DPWpciuke14.mp4", likes: 304, comments: 53, saved: 111, reach: 4684, views: 7898 },
  { id: "pub8", brand: "Tuyo Brasil", instagram: "DACMidayzrP", thumbnail: "/capas-ig/DACMidayzrP.webp", externo: true, likes: 292, comments: 31, saved: 127, reach: 8391, views: 11961 },
  { id: "pub9", brand: "Vozo AI", instagram: "Dcv_kiiRJdM", thumbnail: "/capas-ig/Dcv_kiiRJdM.webp", videoLocal: "/videos-ig/Dcv_kiiRJdM.mp4", likes: 187, comments: 205, saved: 68, reach: 2514, views: 4949 },
  { id: "pub10", brand: "Creamy", instagram: "Dc1KSq6xN9G", thumbnail: "/capas-ig/Dc1KSq6xN9G.webp", videoLocal: "/videos-ig/Dc1KSq6xN9G.mp4", likes: 154, comments: 15, saved: 25, reach: 1782, views: 3025 },
];

export const SOBRE = {
  foto: "/ensaio/sobre-caixas.webp",
  fotoAlt: "Lara Dam sentada no estúdio entre caixas, com o notebook",
  fichaTitulo: "Ficha técnica de uma campanha comigo",
  titulo: "Oie, eu sou a Lara Dam 👋",
  p1: "Tenho 27 anos, moro no Litoral de SP e há 2 anos vivo de criar conteúdo. Comecei gravando UGC pra marcas e hoje faço as duas coisas: vídeo que roda como anúncio pra mais de 200 marcas e publi no meu perfil, pra uma audiência que acompanha meus bastidores.",
  p2: "Também ensino outras creators a organizar a carreira. Então entendo os dois lados da mesa: o da marca que precisa de resultado e o da creator que precisa de briefing claro.",
  nichosTitulo: "Nichos que mais gravo",
  pills: ["💸 Finanças", "💄 Beleza", "🛋️ Casa & Deco", "📱 Tech & Apps", "🍝 Gastronomia"],
  ficha: [
    { k: "Formatos", v: "9:16 · 16:9 · 4:5" },
    { k: "Entrega", v: "Editado, com legenda e variações de hook" },
    { k: "Direitos de uso", v: "Combinados em contrato" },
    { k: "Prazo", v: "A partir de 7 dias" },
  ],
};

// Serviços (o que a marca pode contratar). Clicar leva pro WhatsApp com a mensagem pronta.
export const SERVICOS = {
  titulo: "O que você pode contratar 🛠️",
  sub: "Seis formatos de trabalho. Escolhe o que faz sentido pra sua marca e me chama.",
  itens: [
    { e: "🎬", nome: "UGC de conversão", desc: "Vídeo autêntico pensado pra vender: hook, prova e CTA.", tag: "mais pedido" },
    { e: "🎯", nome: "Criativos pra tráfego", desc: "Ads pro Meta, TikTok e YouTube, com variações de hook." },
    { e: "✍️", nome: "Roteiro estratégico", desc: "Script validado por performance, pra você ou pra outras creators." },
    { e: "📸", nome: "Fotos lifestyle", desc: "Imagem com direção de arte pra campanha e feed." },
    { e: "🛍️", nome: "Pacote e-commerce", desc: "Entrega mensal pra manter a loja e o feed vivos." },
    { e: "✨", nome: "Consultoria UGC", desc: "Briefing, curadoria e direção de creators." },
  ],
};

// Ordem dos logos em /public/logo-1 pra página /perfil: marcas grandes primeiro,
// sem repetidas (Huawei, Jägermeister, Artex, SPC, Sofá na Caixa, Chilli Beans,
// OLX, Rap10, Terramazonia aparecem 2x na pasta) e sem o 43 (logo do WhatsApp).
export const LOGOS_ORDEM: string[] = [
  59, 35, 36, 61, 3, 60, 46, 21, 62, 6, 14, 11, 12, 27, 28, 20, 7, 17, 39, 31, 24, 22, 2, 13,
  10, 8, 25, 1, 4, 5, 9, 15, 18, 19, 23, 26, 29, 30, 32, 33, 38, 40, 41, 42, 47, 48, 50, 51, 52, 54, 55,
].map((n) => `${n}.png`);
