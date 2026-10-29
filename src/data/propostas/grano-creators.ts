// Apresentação de creators pra GRANO (via Cris Lopes, Saudabe).
// Página: ugc.laradam.com/grano/creators (fora do menu e fora do Google; a Lara manda o link direto).
//
// Dados levantados em 29/10/2026 direto nos perfis do Instagram (Claude in Chrome):
// - viewsReel = mediana das views dos 6 reels mais recentes (fixados fora). Mediana e não média
//   porque um viral distorce: a @heydebbiie tem um reel de 113 mil e os outros em torno de 2,5 mil.
// - melhorReel = maior views entre esses 6.
// - engajamento = (curtidas + comentários) / seguidores, média dos 3 posts mais recentes.
//   null quando o perfil esconde as curtidas.
// - foto: salvas em public/creators-grano (cadastro da rede + prints que a Lara mandou), porque o
//   link de foto do Instagram expira.
//
// Página só de apresentação: sem valores (esses ficam na proposta, ugc.laradam.com/grano).
// viewsReel/melhorReel/engajamento null = ainda sem dado (ex. perfil recém-incluído).

export type CreatorGrano = {
  username: string;
  nome: string;
  nicho: string;
  seguidores: number;
  viewsReel: number | null;
  melhorReel: number | null;
  engajamento: number | null;
  tiktok?: string;
  foto?: string;
  exemplos: string[];
};

export const GRANO_CREATORS = {
  cliente: "Grano",
  titulo: "Creators pré-selecionadas pra Grano",
  subtitulo:
    "Perfis da nossa rede nos nichos de alimentação saudável, rotina em família e esporte. Cada um aparece com os números reais do Instagram, pra Grano escolher vendo os dados.",
  atualizado: "Dados levantados nos perfis em 29/10/2026.",

  ate10k: {
    titulo: "Nano e micro · até 15 mil seguidores",
    creators: [
      {
        username: "heydebbiie",
        nome: "Debbiie",
        nicho: "Gastronomia, maternidade e rotina · Porto Alegre",
        seguidores: 3179,
        viewsReel: 2463,
        melhorReel: 113000,
        engajamento: 2.6,
        foto: "/creators-grano/heydebbiie.jpg",
        exemplos: ["https://www.instagram.com/p/DTv15WMgZ83/", "https://www.instagram.com/p/Dce2bsoNU1V/"],
      },
      {
        username: "receitasda.anna",
        nome: "Ana Julia",
        nicho: "Receitas equilibradas, práticas e tradicionais",
        seguidores: 770,
        viewsReel: 1334,
        melhorReel: 3776,
        engajamento: 5.9,
        foto: "/creators-grano/receitasda.anna.jpg",
        exemplos: ["https://www.instagram.com/reel/DeE2aHPxqHX/", "https://www.instagram.com/reel/DeUjfiaPwUO/"],
      },
      {
        username: "paveoufricasse",
        nome: "Marina Ré",
        nicho: "Receitas e dicas · restaurantes que voltaria",
        seguidores: 7964,
        viewsReel: 2148,
        melhorReel: 2679,
        engajamento: 1.1,
        foto: "/creators-grano/paveoufricasse.jpg",
        exemplos: ["https://www.instagram.com/reel/De2e7G8h4Fx/", "https://www.instagram.com/reel/DfAyfFDB37N/"],
      },
      {
        username: "pedropelacozinha",
        nome: "Pedro Henrique Brasil",
        nicho: "Cozinheiro profissional · gastronomia com história e técnica",
        seguidores: 11270,
        viewsReel: 2304,
        melhorReel: 9327,
        engajamento: 0.4,
        foto: "/creators-grano/pedropelacozinha.jpg",
        exemplos: ["https://www.instagram.com/reel/DeWrbBwRrDu/", "https://www.instagram.com/reel/Deh2hPZJ4Cy/"],
      },
      {
        username: "lauracquadros",
        nome: "Laura Quadros",
        nicho: "Lifestyle, gastronomia e experiências · Florianópolis",
        seguidores: 11969,
        viewsReel: 4334,
        melhorReel: 43700,
        engajamento: 5.2,
        foto: "/creators-grano/lauracquadros.jpg",
        exemplos: ["https://www.instagram.com/p/DewrmyQxGQN/", "https://www.instagram.com/p/Dd1gWkjRRLR/"],
      },
    ] as CreatorGrano[],
  },

  maiores: {
    titulo: "Perfis maiores · de 15 mil a 83 mil seguidores",
    creators: [
      {
        username: "tonybuere",
        nome: "Tony Buere",
        nicho: "Receitas e lugares pro date · São Paulo",
        seguidores: 15131,
        viewsReel: 4421,
        melhorReel: 21300,
        engajamento: null,
        foto: "/creators-grano/tonybuere.jpg",
        exemplos: ["https://www.instagram.com/reel/De-Ntb9x3Hx/", "https://www.instagram.com/reel/Dd2HkhoRjec/"],
      },
      {
        username: "lanaiplocki",
        nome: "Lanai",
        nicho: "Personal chef · comida, bebida e hospitalidade · Rio de Janeiro",
        seguidores: 18991,
        viewsReel: 25500,
        melhorReel: 43500,
        engajamento: 2.2,
        foto: "/creators-grano/lanaiplocki.jpg",
        exemplos: ["https://www.instagram.com/reel/DfDWMH2vYma/", "https://www.instagram.com/reel/DchHtf_O0hr/"],
      },
      {
        username: "docenathalia",
        nome: "Nathália",
        nicho: "Gastronomia e confeitaria · formada em Gastronomia",
        seguidores: 19039,
        viewsReel: 6143,
        melhorReel: 15100,
        engajamento: 1.3,
        foto: "/creators-grano/docenathalia.jpg",
        exemplos: ["https://www.instagram.com/reel/DeiNuKDABYD/", "https://www.instagram.com/reel/DfBFilPgaT1/"],
      },
      {
        username: "nathaliaandreani",
        nome: "Nathália Andreani",
        nicho: "Receitas com diversão · Timbó, SC",
        seguidores: 29754,
        viewsReel: 38900,
        melhorReel: 97300,
        engajamento: 0.5,
        foto: "/creators-grano/nathaliaandreani.jpg",
        exemplos: ["https://www.instagram.com/reel/De4uio0vmVF/", "https://www.instagram.com/reel/De10TTyx3aZ/"],
      },
      {
        username: "bygisellesamayoa",
        nome: "Gi Samayoa",
        nicho: "Beleza e criatividade",
        seguidores: 30331,
        viewsReel: 9082,
        melhorReel: 32000,
        engajamento: 1.9,
        foto: "/creators-grano/bygisellesamayoa.jpg",
        exemplos: ["https://www.instagram.com/reel/DekXA-dBiQG/", "https://www.instagram.com/reel/DeAU6gMJaM8/"],
      },
      {
        username: "vinivision_",
        nome: "Vinícius",
        nicho: "Lifestyle, cozinha, arte e decor",
        seguidores: 32486,
        viewsReel: 6082,
        melhorReel: 22000,
        engajamento: 0.9,
        foto: "/creators-grano/vinivision_.jpg",
        exemplos: ["https://www.instagram.com/reel/DemMVf7A1kE/", "https://www.instagram.com/reel/Dec4XWSxLMp/"],
      },
      {
        username: "letsmil",
        nome: "Letícia Tavares",
        nicho: "Gastronomia, lifestyle e criatividade · São Paulo",
        seguidores: 81525,
        viewsReel: 270000,
        melhorReel: 4800000,
        engajamento: 8.2,
        foto: "/creators-grano/letsmil.jpg",
        exemplos: ["https://www.instagram.com/reel/De10478xu5G/", "https://www.instagram.com/reel/DeMhrOkRyYE/"],
      },
      {
        username: "me_arriscandonacozinha",
        nome: "Madye Cardoso",
        nicho: "Receitas saudáveis e sem complicação · São Paulo",
        seguidores: 82910,
        viewsReel: 8604,
        melhorReel: 30600,
        engajamento: 0.5,
        foto: "/creators-grano/me_arriscandonacozinha.jpg",
        exemplos: ["https://www.instagram.com/reel/DesI7eMJXVg/", "https://www.instagram.com/reel/De5CbqWPght/"],
      },
    ] as CreatorGrano[],
  },

  whatsapp: "5512988729264",
  whatsappMensagem: "Oi Lara! Vi as creators da Grano e quero conversar sobre a seleção.",
  email: "laradam.ugc@gmail.com",
};
