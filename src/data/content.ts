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
  { slug: "tech", name: "Tech & Apps", tagline: "Apps e gadgets em linguagem humana" },
  { slug: "moda", name: "Moda", tagline: "Outfits que contam história" },
  { slug: "viagem", name: "Viagem", tagline: "Experiências & destinos" },
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
  // DESTAQUES
  { id: "f1", title: "Bolsa InfinitePay", category: "tech", brand: "InfinitePay", views: "50M", featured: true },
  { id: "f2", title: "Compras Méliuz", category: "food", brand: "Méliuz", views: "10M", featured: true },
  { id: "f3", title: "Missão Impossível", category: "gastronomia", brand: "Dolly", views: "1M", featured: true },

  // GASTRONOMIA
  { id: "g1", title: "Ateliê", category: "gastronomia", brand: "Ateliê", youtubeId: "0FhBNV71z9A" },
  { id: "g2", title: "Ateliê", category: "gastronomia", brand: "Ateliê", youtubeId: "XmjA7cpCPfQ" },
  { id: "g3", title: "Rap10", category: "gastronomia", brand: "Rap10", youtubeId: "orhbzi_XYiA" },
  { id: "g4", title: "Rap10", category: "gastronomia", brand: "Rap10", youtubeId: "It7GiFzsOe0" },
  { id: "g5", title: "Copacol", category: "gastronomia", brand: "Copacol", youtubeId: "Kq93tU1dYuA" },
  { id: "g6", title: "Tropical", category: "gastronomia", brand: "Tropical", youtubeId: "QgCK-EJKTm0" },
  { id: "g7", title: "Rap10 Protagonista", category: "gastronomia", brand: "Rap10", views: "330k" },
  { id: "g8", title: "China review", category: "gastronomia", brand: "Rap10", views: "353k" },

  // BELEZA
  { id: "b1", title: "Skincare noturno", category: "beleza", brand: "L'Oréal", views: "500k", youtubeId: "6kvtFKsPQPw" },
  { id: "b2", title: "Inglot", category: "beleza", brand: "Inglot", youtubeId: "0g1pFDhxi-4" },
  { id: "b3", title: "Rituaria", category: "beleza", brand: "Rituaria", youtubeId: "Yt_UjtmiMgg" },
  { id: "b4", title: "Rituaria", category: "beleza", brand: "Rituaria", youtubeId: "CzO13_qS6Fs" },
  { id: "b5", title: "Musquee", category: "beleza", brand: "Musquee", youtubeId: "ctKWcVRF35k" },
  { id: "b6", title: "Quintal", category: "beleza", brand: "Quintal", youtubeId: "U_T_I-vcM7k" },
  { id: "b7", title: "Quintal", category: "beleza", brand: "Quintal", youtubeId: "aTe89tMdv28" },
  { id: "b8", title: "Quintal", category: "beleza", brand: "Quintal", youtubeId: "UCgbmlmT618" },
  { id: "b9", title: "Amobeleza", category: "beleza", brand: "Amobeleza", youtubeId: "V5gvw_l08go" },
  { id: "b10", title: "Belleton", category: "beleza", brand: "Belleton", youtubeId: "_d2dByXfvIw" },
  { id: "b11", title: "Rarissima", category: "beleza", brand: "Rarissima", youtubeId: "dj9LD5x8MWI" },
  { id: "b12", title: "Box Magenta", category: "beleza", brand: "Box Magenta", youtubeId: "XwhHAl2LJ6k" },
  { id: "b13", title: "Box Magenta", category: "beleza", brand: "Box Magenta", youtubeId: "cDRldAKYyKU" },
  { id: "b14", title: "Cand Óculos", category: "beleza", brand: "Cand", youtubeId: "JPz1wMt_R4I" },
  { id: "b15", title: "Bem Me Fiz", category: "beleza", brand: "Bem Me Fiz", youtubeId: "P3UrVHbwI9g" },
  { id: "b16", title: "Botox", category: "beleza", brand: "Botox", youtubeId: "YOmm3Zi87PE" },

  // CASA & DECO
  { id: "d1", title: "DT3", category: "casa", brand: "DT3", youtubeId: "Imt3HZDlCXU" },
  { id: "d2", title: "DT3", category: "casa", brand: "DT3", youtubeId: "JwblS_1IReM" },
  { id: "d3", title: "DT3", category: "casa", brand: "DT3", youtubeId: "RPNeR2ANyrM" },
  { id: "d4", title: "Coza", category: "casa", brand: "Coza", youtubeId: "1Fm5v3bSdKM" },
  { id: "d5", title: "Coala", category: "casa", brand: "Coala", youtubeId: "plSEfBiygVw" },
  { id: "d6", title: "Coala", category: "casa", brand: "Coala", youtubeId: "tClA-xjxP68" },
  { id: "d7", title: "Mez Móveis", category: "casa", brand: "Mez Móveis", youtubeId: "R-y96AP_NLo" },
  { id: "d8", title: "Mez Móveis", category: "casa", brand: "Mez Móveis", youtubeId: "mEc4A2oJ0_w" },
  { id: "d9", title: "Vinagreen", category: "casa", brand: "Vinagreen", youtubeId: "8T_dTUk5oX4" },
  { id: "d10", title: "Offertus", category: "casa", brand: "Offertus", youtubeId: "ucf6vv64SNY" },
  { id: "d11", title: "Velds", category: "casa", brand: "Velds", youtubeId: "TZK3XeajRyI" },
  { id: "d12", title: "Velds", category: "casa", brand: "Velds", youtubeId: "i9dHLO0VlFk" },
  { id: "d13", title: "Lumai", category: "casa", brand: "Lumai", youtubeId: "2y9Xe6Q5eMc" },
  { id: "d14", title: "Lumai", category: "casa", brand: "Lumai", youtubeId: "0Mkvi_n-bFU" },

  // FOOD & BEBIDAS
  { id: "o1", title: "Cafeza", category: "food", brand: "Cafeza", youtubeId: "R-PC_tGXdFk" },
  { id: "o2", title: "Tropical", category: "food", brand: "Tropical", youtubeId: "bUf0ItCQdUU" },
  { id: "o3", title: "Tropical", category: "food", brand: "Tropical", youtubeId: "vFmYLAliwIk" },
  { id: "o4", title: "Smoo Sorvete", category: "food", brand: "Smoo", youtubeId: "AXzcHi_Qq_Y" },

  // TECH & APPS
  { id: "t1", title: "App Decolar", category: "tech", brand: "Decolar", youtubeId: "Y8nN7CMb73U" },
  { id: "t2", title: "BV Financeiro", category: "tech", brand: "BV", youtubeId: "2NMavMHi4jM" },
  { id: "t3", title: "BV Financeiro", category: "tech", brand: "BV", youtubeId: "Q_n4uwkxiDo" },
  { id: "t4", title: "Voy Saúde", category: "tech", brand: "Voy", youtubeId: "sIqDyvDsaZA" },
  { id: "t5", title: "Méliuz App", category: "tech", brand: "Méliuz", youtubeId: "GPcPWfWmA3A" },
  { id: "t6", title: "Focus", category: "tech", brand: "Focus", youtubeId: "GvLjL_Ru19U" },
  { id: "t7", title: "Logitech", category: "tech", brand: "Logitech", youtubeId: "sspAuh3TFqw" },
  { id: "t8", title: "Logitech", category: "tech", brand: "Logitech", youtubeId: "xyaWdRi9pK4" },
  { id: "t9", title: "Reclame Aqui", category: "tech", brand: "Reclame Aqui", youtubeId: "DxiroerLBGw" },
  { id: "t10", title: "Gamma", category: "tech", brand: "Gamma", youtubeId: "nZQoMA114MA" },

  // MODA
  { id: "m1", title: "Outfit do dia", category: "moda", brand: "Lust", youtubeId: "nV1oWxv_J_4" },
  { id: "m2", title: "Midas Time", category: "moda", brand: "Midas Time", youtubeId: "wZgUdGFouNA" },
  { id: "m3", title: "Midas Time", category: "moda", brand: "Midas Time", youtubeId: "t2aysMm2INg" },
  { id: "m4", title: "Midas Time", category: "moda", brand: "Midas Time", youtubeId: "QE-bUfK8z14" },
  { id: "m5", title: "Rarissima", category: "moda", brand: "Rarissima", youtubeId: "_YF_bwGgC0Y" },
  { id: "m6", title: "Rarissima", category: "moda", brand: "Rarissima", youtubeId: "Nhq12rZkpa8" },

  // VIAGEM
  { id: "va1", title: "OKA House", category: "viagem", brand: "OKA House", youtubeId: "7TzuVW8847A" },
  { id: "va2", title: "OKA House", category: "viagem", brand: "OKA House", youtubeId: "DzIWctdbjgg" },
  { id: "va3", title: "Airbnb", category: "viagem", brand: "Airbnb", youtubeId: "s5iwpfzgxbI" },
  { id: "va4", title: "Airbnb", category: "viagem", brand: "Airbnb", youtubeId: "wUxGOQ3QwFw" },

];

// Marcas reais que a Lara já trabalhou (vitrine na seção Brands)
export const BRANDS = [
  "InfinitePay",
  "Méliuz",
  "Dolly",
  "Decolar",
  "Logitech",
  "Rap10",
  "L'Oréal",
  "Inglot",
  "Rituaria",
  "Box Magenta",
  "Quintal",
  "Bem Me Fiz",
  "DT3",
  "Coza",
  "Coala",
  "Mez Móveis",
  "Airbnb",
  "OKA House",
  "Reclame Aqui",
  "BV Financeiro",
];
