// Página /ugc: o portfólio UGC no estilo do mídia kit.
import { PERFIL } from "./perfil";

export const UGC_WHATSAPP = "https://wa.me/5512988729264?text=" + encodeURIComponent("Oi Lara! Vi seu portfólio UGC e quero conversar sobre vídeos pra minha marca.");

export const UGC_NAV = [
  { id: "resultados", rotulo: "Resultados", emoji: "📊" },
  { id: "servicos", rotulo: "Serviços", emoji: "🛠️" },
  { id: "videos", rotulo: "Vídeos", emoji: "🎬" },
  { id: "marcas", rotulo: "Marcas", emoji: "🤝" },
  { id: "depoimentos", rotulo: "Depoimentos", emoji: "💬" },
  { id: "sobre", rotulo: "Sobre", emoji: "👋" },
  { id: "contato", rotulo: "Contato", emoji: "✉️" },
];

export const UGC_CAB = {
  usuario: PERFIL.usuario,
  avatar: PERFIL.avatar,
  bioTitulo: "Lara Dam 🎬 UGC creator",
  bio: [
    "🎬 vídeo que vende pra sua marca: UGC, criativos pra tráfego e roteiro",
    "📦 pra rodar como anúncio, no e-commerce e nas redes da marca",
    "📍 Litoral de SP",
  ],
  balao: "Oi! Eu gravo **vídeo que vende** pra sua marca, com cara de gente de verdade. Pronto pra rodar como anúncio.",
  nota: "← me chama pra conversarmos sobre conteúdo pra sua marca",
  carimbo: "100M+ views",
  faixa: ["500 vídeos gravados", "200 marcas", "100M+ views", "2.4x ROAS", "InfinitePay", "Méliuz", "DT3", "Logitech", "Airbnb", "Beauty Fair"],
};
