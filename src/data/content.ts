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
  { slug: "casa", name: "Casa & Deco", tagline: "Ambientes que inspiram" },
  { slug: "food", name: "Food & Bebidas", tagline: "Mercado, cafés e sabores" },
  { slug: "tech", name: "Tech", tagline: "Apps e gadgets em linguagem humana" },
  { slug: "moda", name: "Moda", tagline: "Outfits que contam história" },
  { slug: "viagem", name: "Viagem", tagline: "Experiências & destinos" },
  { slug: "suplemento", name: "Suplementos", tagline: "Rotina & performance" },
  { slug: "cabelo", name: "Cabelo", tagline: "Do wash day ao transformation" },
];

export type Video = {
  id: string;
  title: string;
  category: string;
  brand: string;
  views?: string;
  youtubeId?: string;
  thumbnail?: string;
  featured?: boolean;
};

export const VIDEOS: Video[] = [
  // DESTAQUES (seção FeaturedVideos)
  { id: "f1", title: "Bolsa InfinitePay", category: "tech", brand: "InfinitePay", views: "50M", featured: true },
  { id: "f2", title: "Compras Méliuz", category: "food", brand: "Méliuz", views: "10M", featured: true },
  { id: "f3", title: "Missão Impossível", category: "gastronomia", brand: "Dolly", views: "1M", featured: true },

  // GASTRONOMIA
  { id: "g1", title: "Ateliê", category: "gastronomia", brand: "Ateliê", youtubeId: "0FhBNV71z9A" },
  { id: "g2", title: "Rap10", category: "gastronomia", brand: "Rap10", youtubeId: "orhbzi_XYiA" },
  { id: "g3", title: "Rap10 Protagonista", category: "gastronomia", brand: "Rap10", views: "330k" },
  { id: "g4", title: "China review", category: "gastronomia", brand: "Rap10", views: "353k" },
  { id: "g5", title: "Massa perfeita", category: "gastronomia", brand: "Barilla" },
  { id: "g6", title: "Delícia do dia", category: "gastronomia", brand: "Nestlé" },
  { id: "g7", title: "Jantar express", category: "gastronomia", brand: "Knorr" },
  { id: "g8", title: "Receita viral", category: "gastronomia", brand: "Sadia" },

  // BELEZA
  { id: "b1", title: "Skincare noturno", category: "beleza", brand: "L'Oréal", views: "500k", youtubeId: "6kvtFKsPQPw" },
  { id: "b2", title: "Box Magenta", category: "beleza", brand: "Box Magenta", youtubeId: "XwhHAl2LJ6k" },
  { id: "b3", title: "Box Magenta", category: "beleza", brand: "Box Magenta", youtubeId: "cDRldAKYyKU" },
  { id: "b4", title: "Cand Óculos", category: "beleza", brand: "Cand", youtubeId: "JPz1wMt_R4I" },
  { id: "b5", title: "Quintal", category: "beleza", brand: "Quintal", youtubeId: "U_T_I-vcM7k" },
  { id: "b6", title: "Bem Me Fiz", category: "beleza", brand: "Bem Me Fiz", youtubeId: "P3UrVHbwI9g" },
  { id: "b7", title: "Review hidratante", category: "beleza", brand: "Nivea" },
  { id: "b8", title: "Rotina de manhã", category: "beleza", brand: "Eudora" },

  // CASA & DECO
  { id: "d1", title: "DT3", category: "casa", brand: "DT3", youtubeId: "Imt3HZDlCXU" },
  { id: "d2", title: "Coza", category: "casa", brand: "Coza", youtubeId: "1Fm5v3bSdKM" },
  { id: "d3", title: "Coala", category: "casa", brand: "Coala", youtubeId: "plSEfBiygVw" },
  { id: "d4", title: "Mez Móveis", category: "casa", brand: "Mez Móveis", youtubeId: "R-y96AP_NLo" },
  { id: "d5", title: "Mez Móveis", category: "casa", brand: "Mez Móveis", youtubeId: "mEc4A2oJ0_w" },
  { id: "d6", title: "DT3", category: "casa", brand: "DT3", youtubeId: "JwblS_1IReM" },
  { id: "d7", title: "Vinagreen", category: "casa", brand: "Vinagreen", youtubeId: "8T_dTUk5oX4" },

  // FOOD & BEBIDAS
  { id: "o1", title: "Cafeza", category: "food", brand: "Cafeza", youtubeId: "R-PC_tGXdFk" },
  { id: "o2", title: "Tropical", category: "food", brand: "Tropical", youtubeId: "bUf0ItCQdUU" },
  { id: "o3", title: "Tropical", category: "food", brand: "Tropical", youtubeId: "vFmYLAliwIk" },
  { id: "o4", title: "Smoo Sorvete", category: "food", brand: "Smoo", youtubeId: "AXzcHi_Qq_Y" },
  { id: "o5", title: "Bonduelle", category: "food", brand: "Bonduelle" },
  { id: "o6", title: "Mercado do mês", category: "food", brand: "Assaí" },

  // TECH
  { id: "t1", title: "App Decolar", category: "tech", brand: "Decolar", youtubeId: "Y8nN7CMb73U" },
  { id: "t2", title: "BV Financeiro", category: "tech", brand: "BV", youtubeId: "2NMavMHi4jM" },
  { id: "t3", title: "BV Financeiro", category: "tech", brand: "BV", youtubeId: "Q_n4uwkxiDo" },
  { id: "t4", title: "Voy Saúde", category: "tech", brand: "Voy", youtubeId: "sIqDyvDsaZA" },
  { id: "t5", title: "Unboxing tech", category: "tech", brand: "Samsung" },
  { id: "t6", title: "Review smartwatch", category: "tech", brand: "Apple" },

  // MODA
  { id: "m1", title: "Outfit do dia", category: "moda", brand: "Lust", youtubeId: "nV1oWxv_J_4" },
  { id: "m2", title: "Midas Time", category: "moda", brand: "Midas Time", youtubeId: "wZgUdGFouNA" },
  { id: "m3", title: "Look de inverno", category: "moda", brand: "C&A" },
  { id: "m4", title: "Tendência 2026", category: "moda", brand: "Zara" },

  // VIAGEM
  { id: "va1", title: "OKA House", category: "viagem", brand: "OKA House", youtubeId: "7TzuVW8847A" },
  { id: "va2", title: "OKA House", category: "viagem", brand: "OKA House", youtubeId: "DzIWctdbjgg" },

  // SUPLEMENTOS
  { id: "s1", title: "Untamed", category: "suplemento", brand: "Untamed", youtubeId: "lnrpiDm9TjE" },

  // CABELO (placeholders — trocar quando subir os vídeos reais)
  { id: "c1", title: "Wash day", category: "cabelo", brand: "Kerastase", views: "200k" },
  { id: "c2", title: "Cachos definidos", category: "cabelo", brand: "Salon Line" },
  { id: "c3", title: "Reconstrução", category: "cabelo", brand: "Wella" },
  { id: "c4", title: "Low poo", category: "cabelo", brand: "Lola" },
];

// Marcas reais que a Lara já trabalhou (destaque na seção Brands)
export const BRANDS = [
  "InfinitePay",
  "Méliuz",
  "Dolly",
  "Rap10",
  "L'Oréal",
  "Decolar",
  "BV Financeiro",
  "DT3",
  "Coza",
  "Coala",
  "Mez Móveis",
  "Vinagreen",
  "Box Magenta",
  "OKA House",
  "Lust",
  "Untamed",
];
