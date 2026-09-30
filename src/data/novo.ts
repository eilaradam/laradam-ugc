// Conteúdo da página /novo: portfólio com as duas frentes (UGC pra marcas +
// Publi no @eilaradam) usando as fotos do ensaio de setembro/2026.
// As fotos ficam em /public/ensaio/*.webp (exportadas do ensaio YBAF_LaraDam).
// Pra trocar uma foto: exporta o arquivo pra /public/ensaio e muda o caminho aqui.

export const NOVO_SITE = {
  nome: "Lara Dam",
  cargo: "UGC Creator & Influenciadora",
  local: "Litoral de SP",
  instagram: "eilaradam",
  instagramUrl: "https://instagram.com/eilaradam",
  whatsapp: "5512988729264",
};

export const FOTOS = {
  capa: "/ensaio/capa.webp",
  ugcCaixas: "/ensaio/ugc-caixas.webp",
  ugcTripe: "/ensaio/ugc-tripe.webp",
  ugcNotebook: "/ensaio/ugc-notebook.webp",
  ugcTorre: "/ensaio/ugc-torre.webp",
  publiJanela: "/ensaio/publi-janela.webp",
  publiCidade: "/ensaio/publi-cidade.webp",
  publiNotebook: "/ensaio/publi-notebook.webp",
  sobre: "/ensaio/sobre.webp",
  sobreSofa: "/ensaio/sobre-sofa.webp",
  avatar: "/ensaio/cara-01.webp",
};

// Números macro (mesmos do site atual)
export const NUMEROS = [
  { valor: "100M+", rotulo: "views acumulados", emoji: "👀" },
  { valor: "500+", rotulo: "vídeos gravados", emoji: "🎬" },
  { valor: "200+", rotulo: "marcas parceiras", emoji: "🤝" },
  { valor: "2.4x", rotulo: "ROAS médio", emoji: "📈" },
];

export const CAPA = {
  eyebrow: "UGC Creator & Influenciadora · Litoral de SP",
  titulo1: "Conteúdo que vende.",
  titulo2: "Pra sua marca",
  titulo3: "e no meu perfil.",
  corpo:
    "Sou a Lara Dam. Crio vídeos que convertem pra marcas (UGC) e divulgo no meu perfil pra uma audiência que confia em mim (publi). Escolhe por onde quer começar:",
  frentes: [
    {
      emoji: "🎬",
      titulo: "UGC pra sua marca",
      corpo: "Vídeos, criativos e roteiros feitos pra rodar como anúncio e vender no e-commerce.",
      cta: "Ver a frente UGC",
      href: "#ugc",
      cor: "teal",
    },
    {
      emoji: "📱",
      titulo: "Publi no meu perfil",
      corpo: "Reels, stories e collab no @eilaradam, com alcance real e audiência que comenta.",
      cta: "Ver a frente Publi",
      href: "#publi",
      cor: "rosa",
    },
  ],
};

// Tira de expressões (série frontal do ensaio). Uma cara pra cada segundo do roteiro.
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

// Cores por categoria (tons que conversam com navy + petróleo + creme)
export type CorTag = "teal" | "mostarda" | "terracota" | "oliva" | "azul" | "rosa";
export const CORES: Record<CorTag, { bg: string; texto: string; forte: string }> = {
  teal: { bg: "#DCEAEA", texto: "#174C51", forte: "#1C5D63" },
  mostarda: { bg: "#F6E7B8", texto: "#6B4E00", forte: "#E7B24C" },
  terracota: { bg: "#F1D7CB", texto: "#7A3A26", forte: "#B4654A" },
  oliva: { bg: "#E3E7CF", texto: "#3F4C2A", forte: "#93A06C" },
  azul: { bg: "#DCE4F2", texto: "#2F4A7A", forte: "#7F9DCB" },
  rosa: { bg: "#F3D9DF", texto: "#7E3548", forte: "#C46B7D" },
};

export const FRENTE_UGC = {
  eyebrow: "Frente 1 · UGC pra marcas",
  titulo1: "Vídeos feitos",
  tituloAcento: "pra vender",
  corpo:
    "Conteúdo com cara de gente de verdade, pensado de hook a CTA pra rodar como anúncio, abastecer o e-commerce e virar playbook de criativo da sua marca.",
  numeros: [
    { valor: "100M+", rotulo: "views em campanhas" },
    { valor: "2.4x", rotulo: "ROAS médio com ads" },
    { valor: "38%", rotulo: "de CPA a menos" },
    { valor: "200+", rotulo: "marcas atendidas" },
  ],
  feedTitulo: "O portfólio",
  feedCorpo: "Filtra por nicho ou fica nos melhores. Clica pra assistir.",
  // ids de vídeos de content.ts que aparecem na aba "Melhores"
  melhores: [
    "t0a", "t0b", "t-infinitepay", "b1", "g-oliv1", "d-noroeste",
    "s-pharma-pdrn", "t-meidigital", "ia1", "va3",
  ],
  servicosTitulo1: "O que a gente pode",
  servicosAcento: "criar junto",
  servicos: [
    { emoji: "🎬", titulo: "UGC de Conversão", corpo: "Vídeos autênticos pensados pra vender.", cor: "teal" as CorTag, tag: "Mais pedido" },
    { emoji: "🎯", titulo: "Criativos pra Tráfego", corpo: "Ads otimizados pro Meta, TikTok e YouTube.", cor: "mostarda" as CorTag },
    { emoji: "✍️", titulo: "Roteiros Estratégicos", corpo: "Scripts validados por performance.", cor: "terracota" as CorTag },
    { emoji: "📸", titulo: "Fotos Lifestyle", corpo: "Imagens com direção de arte pra campanhas.", cor: "oliva" as CorTag },
    { emoji: "🛍️", titulo: "Conteúdo E-commerce", corpo: "Pacotes mensais pra manter o feed vivo.", cor: "azul" as CorTag },
    { emoji: "✨", titulo: "Consultoria UGC", corpo: "Briefing, curadoria e direção de creators.", cor: "rosa" as CorTag },
  ],
  etapasTitulo1: "Como",
  etapasAcento: "funciona",
  etapas: [
    {
      numero: "01",
      titulo: "Briefing",
      corpo: "Você me conta o produto, o objetivo e onde o vídeo vai rodar. Eu devolvo proposta e roteiro pra aprovar.",
      foto: "/ensaio/ugc-notebook.webp",
      cor: "mostarda" as CorTag,
    },
    {
      numero: "02",
      titulo: "Gravação",
      corpo: "Gravo com luz, áudio limpo e a naturalidade de quem usa o produto de verdade. Variações de hook inclusas.",
      foto: "/ensaio/ugc-tripe.webp",
      cor: "teal" as CorTag,
    },
    {
      numero: "03",
      titulo: "Entrega",
      corpo: "Vídeo editado, com legenda, no formato de cada canal e com os direitos de uso combinados em contrato.",
      foto: "/ensaio/ugc-torre.webp",
      cor: "terracota" as CorTag,
    },
  ],
};

export const FRENTE_PUBLI = {
  eyebrow: "Frente 2 · Publi no @eilaradam",
  titulo1: "Um perfil que",
  tituloAcento: "conversa",
  titulo2: "com quem compra",
  corpo:
    "Divulgação no meu Instagram com a minha cara e a minha voz. Audiência real, que comenta, salva e volta. Os números abaixo são ao vivo, direto da API do Instagram.",
  // fallback caso o endpoint ao vivo não responda (valores de 30/09/2026)
  fallback: { followers: 16039, reach_month: 367702, posts: 141 },
  formatos: [
    { emoji: "🎬", titulo: "Reels", corpo: "Vídeo no feed com roteiro e edição pensados pra alcance.", cor: "rosa" as CorTag },
    { emoji: "⚡", titulo: "Stories", corpo: "Sequência com CTA, caixinha de pergunta e link direto.", cor: "mostarda" as CorTag },
    { emoji: "🖼️", titulo: "Carrossel", corpo: "Post no feed com direção de arte e copy que segura até o fim.", cor: "azul" as CorTag },
    { emoji: "🤝", titulo: "Collab", corpo: "Publicação em conjunto, somando a minha audiência com a da marca.", cor: "oliva" as CorTag },
  ],
  porques: [
    { emoji: "🗣️", titulo: "Com a minha cara", corpo: "A publi entra no meu feed como conteúdo, não como anúncio disfarçado. É assim que a audiência confia." },
    { emoji: "💬", titulo: "Audiência que responde", corpo: "Quem me segue é creator, empreendedora e gente que compra o que eu testo. Comentário e DM viram conversa." },
    { emoji: "📊", titulo: "Relatório depois", corpo: "Você recebe os números da publicação: alcance, visualizações, salvamentos e cliques." },
  ],
  cta: "Quero uma publi com a Lara",
};

export const SOBRE = {
  eyebrow: "Sobre mim",
  titulo1: "Oie, eu sou a",
  nome: "Lara Dam",
  corpo1:
    "Tenho 27 anos, moro no Litoral de SP e há 2 anos vivo de criar conteúdo. Comecei gravando UGC pra marcas e hoje faço as duas coisas: crio vídeos que rodam como anúncio pra mais de 200 marcas e divulgo no meu perfil pra uma audiência que acompanha meus bastidores.",
  corpo2:
    "Também ensino outras creators a organizar a carreira, então entendo os dois lados da mesa: o da marca que precisa de resultado e o da creator que precisa de briefing claro.",
  pills: ["+200 marcas parceiras", "Litoral de SP · Brasil", "@eilaradam"],
  galeria: [
    { src: "/ensaio/gal-espelho.webp", legenda: "bastidores", giro: -3 },
    { src: "/ensaio/gal-porta.webp", legenda: "cor", giro: 2 },
    { src: "/ensaio/gal-adesivo.webp", legenda: "sem filtro", giro: -2 },
    { src: "/ensaio/gal-notebook.webp", legenda: "estratégia", giro: 3 },
    { src: "/ensaio/gal-sorriso.webp", legenda: "risada", giro: -2 },
    { src: "/ensaio/gal-pb.webp", legenda: "P&B", giro: 2 },
  ],
};
