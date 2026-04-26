export const SITE = {
  name: "Lara Dam",
  role: "UGC Creator & Content Strategist",
  location: "Litoral de SP, Brasil",
  email: "laradam.ugc@gmail.com",
  instagram: "@eilaradam",
  tiktok: "@eilaradam",
  // TODO: substituir pelo número real (formato internacional sem + nem espaços)
  whatsapp: "5513999999999",
  whatsappLabel: "WhatsApp",
};

export const STATS = [
  { value: "500+", label: "Vídeos gravados" },
  { value: "200+", label: "Parceiros" },
  { value: "100M+", label: "Views acumulados" },
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
  greeting: "Oie, eu sou a Lara Dam",
  body: "Tenho 27 anos e sou UGC Creator e estrategista de conteúdo no Litoral de SP. Com 2 anos de experiência, meu trabalho é focado em criar conexões reais e estratégias de alta conversão para marcas que buscam destaque. Com uma bagagem sólida de mais de 500 vídeos gravados e parcerias com mais de 200 parceiros, utilizo meu olhar analítico para transformar produtos em desejos de consumo — garantindo autoridade e resultados concretos através de um conteúdo autêntico e humano.",
};

export type Service = {
  title: string;
  description: string;
  icon: string; // nome do ícone Lucide
  tag?: string;
  highlight?: boolean;
};

export const SERVICES: Service[] = [
  {
    title: "UGC de Conversão",
    description: "Vídeos autênticos pensados pra vender.",
    icon: "Video",
    tag: "Mais pedido",
    highlight: true,
  },
  {
    title: "Criativos para Tráfego",
    description: "Ads otimizados pro Meta, TikTok e YouTube.",
    icon: "Target",
  },
  {
    title: "Roteiros Estratégicos",
    description: "Scripts validados por performance.",
    icon: "FileText",
  },
  {
    title: "Fotos Lifestyle",
    description: "Imagens com direção de arte pra campanhas.",
    icon: "Camera",
  },
  {
    title: "Conteúdo E-commerce",
    description: "Pacotes mensais pra manter o feed vivo.",
    icon: "ShoppingBag",
  },
  {
    title: "Consultoria UGC",
    description: "Briefing, curadoria e direção de creators.",
    icon: "Sparkles",
  },
];

export type Category = {
  slug: string;
  name: string;
  tagline: string;
};

export const CATEGORIES: Category[] = [
  { slug: "all", name: "Todos", tagline: "" },
  { slug: "beleza", name: "Beleza", tagline: "Produtos que viram ritual" },
  { slug: "casa", name: "Casa & Deco", tagline: "Ambientes que inspiram" },
  { slug: "gastronomia", name: "Gastronomia", tagline: "Comida que dá água na boca" },
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
  landscape?: boolean; // abre o modal em 16:9 ao invés de 9:16 (vertical)
  audioOnly?: boolean; // toca o áudio mas esconde o vídeo com overlay de waveform
};

export const VIDEOS: Video[] = [
  // GASTRONOMIA
  { id: "g1", title: "Ateliê", category: "gastronomia", brand: "Ateliê", youtubeId: "0FhBNV71z9A" },
  { id: "g2", title: "Ateliê", category: "gastronomia", brand: "Ateliê", youtubeId: "XmjA7cpCPfQ" },
  { id: "g3", title: "Rap10", category: "gastronomia", brand: "Rap10", youtubeId: "orhbzi_XYiA" },
  { id: "g4", title: "Rap10", category: "gastronomia", brand: "Rap10", youtubeId: "It7GiFzsOe0" },
  { id: "g5", title: "Copacol", category: "gastronomia", brand: "Copacol", youtubeId: "Kq93tU1dYuA" },
  { id: "g6", title: "Tropical", category: "gastronomia", brand: "Tropical", youtubeId: "QgCK-EJKTm0" },

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
  { id: "t0a", title: "InfinitePay", category: "tech", brand: "InfinitePay", youtubeId: "5wf8Fv2CTa4", views: "100M", featured: true },
  { id: "t0b", title: "Méliuz", category: "tech", brand: "Méliuz", youtubeId: "wesTfq67X9o", views: "30M", featured: true },
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

export type Testimonial = {
  quote: string;
  author?: string;
  role?: string;
  brand: string;
  brandDomain?: string; // logo do cliente no card via Clearbit (fallback)
  logoFile?: string; // arquivo local em /public/logo-1/ (preferido)
  metric?: { value: string; label: string }; // ex: "3.2M views" / "Primeira campanha"
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "A Lara entrega muito além do que a gente pede. Ela entende de performance e o vídeo veio pronto pra rodar como criativo, bateu recorde de CTR no Meta.",
    brand: "InfinitePay",
    logoFile: "59.png",
    role: "Vídeo recorde no Meta",
    metric: { value: "50M", label: "views em 1 vídeo" },
  },
  {
    quote:
      "Trabalho com vários creators e a Lara é a que mais converte. Roteiro afiado, entrega rápida e ela pega direção de brief no primeiro review.",
    brand: "Méliuz",
    logoFile: "35.png",
    role: "Roteiro + criativo pra growth",
    metric: { value: "10M", label: "views · campanha mercado" },
  },
  {
    quote:
      "Já fechamos 4 campanhas e cada uma performou melhor que a anterior. A Lara virou parte do nosso playbook de criativo.",
    brand: "DT3",
    logoFile: "61.png",
    role: "Playbook de criativo recorrente",
    metric: { value: "4+", label: "campanhas ativas" },
  },
  {
    quote:
      "Lara foi incrível na criação do conteúdo para nossa campanha. Muito criativa, excelente comunicação e de uma sensibilidade ímpar. Amamos!",
    brand: "Essence in Brows",
    role: "UGC pra marca de beleza",
    metric: { value: "+320K", label: "alcance orgânico" },
  },
  {
    quote:
      "A Lara desempenhou um trabalho incrível. Amamos o resultado do vídeo criado, além da qualidade e toda a atenção para entender a demanda. Super recomendamos.",
    brand: "Tropical Especiarias",
    logoFile: "27.png",
    role: "Conteúdo pra e-commerce + ads",
    metric: { value: "+2.4x", label: "ROAS · e-commerce com ads" },
  },
  {
    quote:
      "O trabalho da Lara foi incrível. Ela fez a cobertura completa do evento, filmou cada detalhe e isso agregou DEMAIS pras marcas. Foi a creator que mais gerou conteúdo pra BF em 2024 — converteram muito!",
    brand: "Beauty Fair",
    role: "Conteúdo em evento presencial",
    metric: { value: "+30", label: "vídeos durante o evento BF" },
  },
  {
    quote:
      "Lara entregou um material muito legal e bem feito. Com certeza vamos querer trabalhar novamente!",
    brand: "Terramazonia",
    role: "Campanha de receitas",
    metric: { value: "+180K", label: "alcance no reels" },
  },
  {
    quote:
      "Alto nível de domínio em UGC: roteiro coeso, narrativa clara, performance natural na frente da câmera e edição precisa. Comunicação fluida em todas as etapas. Uma parceria que agrega valor real.",
    brand: "Velds",
    logoFile: "28.png",
    role: "Conteúdo pra e-commerce + ads",
    metric: { value: "+45%", label: "vendas no e-commerce com ads" },
  },
];

// Lista de arquivos de logo em /public/logo-1/ (usada pelo BrandsMarquee).
// 60 logos em PNG transparente, nomeados 1.png - 60.png
export const BRAND_LOGO_FILES: string[] = Array.from(
  { length: 60 },
  (_, i) => `${i + 1}.png`
);

// Marcas reais que a Lara já trabalhou (usada na seção Brands — vitrine em grid)
// logo: caminho local em /public/logos/*.png (prioridade 1)
// domain: fallback pra logo.clearbit.com se o arquivo local não existir
export type Brand = {
  name: string;
  logo?: string;
  domain?: string;
};

export const BRANDS: Brand[] = [
  { name: "InfinitePay", logo: "infinitepay.png", domain: "infinitepay.io" },
  { name: "Méliuz", logo: "meliuz.png", domain: "meliuz.com.br" },
  { name: "Dolly", logo: "dolly.png", domain: "dolly.com.br" },
  { name: "Decolar", logo: "decolar.png", domain: "decolar.com" },
  { name: "Airbnb", logo: "airbnb.png", domain: "airbnb.com.br" },
  { name: "Logitech", logo: "logitech.png", domain: "logitech.com" },
  { name: "L'Oréal", logo: "loreal.png", domain: "loreal.com" },
  { name: "Reclame Aqui", logo: "reclameaqui.png", domain: "reclameaqui.com.br" },
  { name: "BV Financeiro", logo: "bv.png", domain: "bv.com.br" },
  { name: "Rap10", logo: "rap10.png", domain: "rap10.com.br" },
  { name: "Inglot", logo: "inglot.png", domain: "inglot.com" },
  { name: "Box Magenta", logo: "boxmagenta.png", domain: "boxmagenta.com.br" },
  { name: "Quintal", logo: "quintal.png", domain: "quintaldemanu.com.br" },
  { name: "Bem Me Fiz", logo: "bemmefiz.png", domain: "bemmefiz.com.br" },
  { name: "DT3", logo: "dt3.png", domain: "dt3sports.com.br" },
  { name: "Coza", logo: "coza.png", domain: "coza.com.br" },
  { name: "Coala", logo: "coala.png", domain: "coalacolchoes.com.br" },
  { name: "Mez Móveis", logo: "mezmoveis.png", domain: "mezmoveis.com.br" },
  { name: "OKA House", logo: "okahouse.png", domain: "okahouse.com.br" },
  { name: "Rituaria", logo: "rituaria.png", domain: "rituaria.com.br" },
];
