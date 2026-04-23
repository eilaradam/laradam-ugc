export const SITE = {
  name: "Lara Dam",
  role: "UGC Creator & Content Strategist",
  location: "Litoral de SP, Brasil",
  email: "laradam.ugc@gmail.com",
  instagram: "@laradam.ugc",
  tiktok: "@laradam.ugc",
};

export const STATS = [
  { value: "500+", label: "Vídeos gravados" },
  { value: "200+", label: "Parceiros" },
  { value: "60M+", label: "Views acumulados" },
  { value: "2 anos", label: "De experiência" },
];

export const MARQUEE_ITEMS = [
  "UGC de Conversão",
  "Criativos de Alta Performance",
  "Roteiros Estratégicos",
  "Fotos Lifestyle",
  "Conteúdo E-commerce",
  "Consultoria UGC",
  "Publipost",
];

export const ABOUT = {
  greeting: "Oi, eu sou a Lara Dam",
  body: "Tenho 26 anos e sou UGC Creator e estrategista de conteúdo no Litoral de SP. Com 2 anos de experiência, meu trabalho é focado em criar conexões reais e estratégias de alta conversão para marcas que buscam destaque. Com uma bagagem sólida de mais de 500 vídeos gravados e parcerias com mais de 200 parceiros, utilizo meu olhar analítico para transformar produtos em desejos de consumo — garantindo autoridade e resultados concretos através de um conteúdo autêntico e humano.",
};

export const SERVICES = [
  {
    title: "UGC de Conversão",
    description: "Vídeos autênticos que vendem — pensados pra converter, não só engajar.",
  },
  {
    title: "Criativos para Tráfego",
    description: "Roteiros e edições otimizadas pra ads no Meta, TikTok e YouTube.",
  },
  {
    title: "Roteiros Estratégicos",
    description: "Scripts validados por performance, com hooks e CTAs testados.",
  },
  {
    title: "Fotos Lifestyle",
    description: "Imagens para campanhas e e-commerce, com direção de arte.",
  },
  {
    title: "Conteúdo E-commerce",
    description: "Pacotes mensais de conteúdo pra marcas que vivem de DTC.",
  },
  {
    title: "Consultoria UGC",
    description: "Gestão de campanha, briefing e direção de outros creators.",
  },
];

export type Category = {
  slug: string;
  name: string;
  tagline: string;
};

export const CATEGORIES: Category[] = [
  { slug: "all", name: "Todos", tagline: "" },
  { slug: "gastronomia", name: "Gastronomia", tagline: "Comida que dá água na boca" },
  { slug: "beleza", name: "Beleza", tagline: "Produtos que viram ritual" },
  { slug: "cabelo", name: "Cabelo", tagline: "Do wash day ao transformation" },
  { slug: "moda", name: "Moda", tagline: "Outfits que contam história" },
  { slug: "tech", name: "Tech", tagline: "Gadgets em linguagem humana" },
  { slug: "casa", name: "Casa & Deco", tagline: "Ambientes que inspiram" },
  { slug: "food", name: "Food", tagline: "Mercado, receitas e sabores" },
];

export type Video = {
  id: string;
  title: string;
  category: string;
  brand: string;
  views?: string;
  // YouTube unlisted ID (trocar pelos reais depois)
  youtubeId?: string;
  // Preview vertical thumbnail URL (placeholder até subir os reais)
  thumbnail?: string;
  featured?: boolean;
};

// Videos placeholder — Lara vai trocar pelos reais (YouTube IDs)
// Estrutura: ~8 vídeos por categoria pra alimentar o carrossel
export const VIDEOS: Video[] = [
  // DESTAQUES (aparecem na seção FeaturedVideos)
  { id: "f1", title: "Bolsa InfinitePay", category: "tech", brand: "InfinitePay", views: "50M", featured: true },
  { id: "f2", title: "Compras Méliuz", category: "food", brand: "Méliuz", views: "10M", featured: true },
  { id: "f3", title: "Missão Impossível", category: "gastronomia", brand: "Dolly", views: "1M", featured: true },

  // GASTRONOMIA (8)
  { id: "g1", title: "Rap10 Protagonista", category: "gastronomia", brand: "Rap10", views: "330k" },
  { id: "g2", title: "China review", category: "gastronomia", brand: "Rap10", views: "353k" },
  { id: "g3", title: "Massa perfeita", category: "gastronomia", brand: "Barilla" },
  { id: "g4", title: "Delícia do dia", category: "gastronomia", brand: "Nestlé" },
  { id: "g5", title: "Café da manhã", category: "gastronomia", brand: "Nescau" },
  { id: "g6", title: "Receita viral", category: "gastronomia", brand: "Sadia" },
  { id: "g7", title: "Jantar express", category: "gastronomia", brand: "Knorr" },
  { id: "g8", title: "Doce caseiro", category: "gastronomia", brand: "Nestlé" },

  // BELEZA (8)
  { id: "b1", title: "Skincare noturno", category: "beleza", brand: "L'Oréal", views: "500k", youtubeId: "6kvtFKsPQPw" },
  { id: "b2", title: "Review hidratante", category: "beleza", brand: "Nivea" },
  { id: "b3", title: "Rotina de manhã", category: "beleza", brand: "Eudora" },
  { id: "b4", title: "Make do dia", category: "beleza", brand: "Avon" },
  { id: "b5", title: "Batom favorito", category: "beleza", brand: "Ruby Rose" },
  { id: "b6", title: "Base que cobre tudo", category: "beleza", brand: "Maybelline" },
  { id: "b7", title: "Perfume viciante", category: "beleza", brand: "O Boticário" },
  { id: "b8", title: "Protetor solar", category: "beleza", brand: "Anasol" },

  // CABELO (8)
  { id: "c1", title: "Wash day", category: "cabelo", brand: "Kerastase", views: "200k" },
  { id: "c2", title: "Cachos definidos", category: "cabelo", brand: "Salon Line" },
  { id: "c3", title: "Reconstrução", category: "cabelo", brand: "Wella" },
  { id: "c4", title: "Low poo", category: "cabelo", brand: "Lola" },
  { id: "c5", title: "Óleo capilar", category: "cabelo", brand: "Pantene" },
  { id: "c6", title: "Shampoo favorito", category: "cabelo", brand: "Seda" },
  { id: "c7", title: "Antes e depois", category: "cabelo", brand: "TRESemmé" },
  { id: "c8", title: "Transformation", category: "cabelo", brand: "Elseve" },

  // MODA (8)
  { id: "m1", title: "Outfit do dia", category: "moda", brand: "Lust", youtubeId: "nV1oWxv_J_4" },
  { id: "m2", title: "Look de inverno", category: "moda", brand: "C&A" },
  { id: "m3", title: "Tendência 2026", category: "moda", brand: "Zara" },
  { id: "m4", title: "Acessórios", category: "moda", brand: "Morana" },
  { id: "m5", title: "Jeans perfeito", category: "moda", brand: "Levi's" },
  { id: "m6", title: "Look festa", category: "moda", brand: "Shein" },
  { id: "m7", title: "Básicos", category: "moda", brand: "Hering" },
  { id: "m8", title: "Calçados", category: "moda", brand: "Arezzo" },

  // TECH (8)
  { id: "t1", title: "App Decolar", category: "tech", brand: "Decolar", youtubeId: "Y8nN7CMb73U" },
  { id: "t2", title: "Review smartwatch", category: "tech", brand: "Apple" },
  { id: "t3", title: "Fone sem fio", category: "tech", brand: "JBL" },
  { id: "t4", title: "App útil", category: "tech", brand: "InfinitePay" },
  { id: "t5", title: "Setup do dia", category: "tech", brand: "Logitech" },
  { id: "t6", title: "Gadget novo", category: "tech", brand: "Xiaomi" },
  { id: "t7", title: "Câmera review", category: "tech", brand: "Sony" },
  { id: "t8", title: "Notebook", category: "tech", brand: "Lenovo" },

  // CASA & DECO (8)
  { id: "d1", title: "Setup DT3", category: "casa", brand: "DT3", youtubeId: "Imt3HZDlCXU" },
  { id: "d2", title: "Organização cozinha", category: "casa", brand: "Ordene" },
  { id: "d3", title: "Cantinho leitura", category: "casa", brand: "Mobly" },
  { id: "d4", title: "Decoração sala", category: "casa", brand: "Etna" },
  { id: "d5", title: "Plantas indoor", category: "casa", brand: "Leroy Merlin" },
  { id: "d6", title: "Iluminação", category: "casa", brand: "Philips" },
  { id: "d7", title: "Quarto dos sonhos", category: "casa", brand: "MadeiraMadeira" },
  { id: "d8", title: "Banho aromático", category: "casa", brand: "Via Aroma" },

  // FOOD (8)
  { id: "o1", title: "Bonduelle", category: "food", brand: "Bonduelle" },
  { id: "o2", title: "Mercado do mês", category: "food", brand: "Assaí" },
  { id: "o3", title: "Lanche prático", category: "food", brand: "Bauducco" },
  { id: "o4", title: "Bebida gelada", category: "food", brand: "Coca-Cola" },
  { id: "o5", title: "Snack saudável", category: "food", brand: "Belvita" },
  { id: "o6", title: "Yogurte", category: "food", brand: "Danone" },
  { id: "o7", title: "Barra de cereal", category: "food", brand: "Trio" },
  { id: "o8", title: "Café especial", category: "food", brand: "Melitta" },
];

export const BRANDS = [
  "InfinitePay",
  "Méliuz",
  "Dolly",
  "Rap10",
  "Bonduelle",
  "L'Oréal",
  "Kerastase",
  "Renner",
  "Tok&Stok",
  "Samsung",
  "Nivea",
  "O Boticário",
  "Natura",
  "Ambev",
  "Nestlé",
  "Unilever",
];
