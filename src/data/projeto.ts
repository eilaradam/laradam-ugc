// Conteúdo da página /projeto (proposta de patrocínio da reforma da casa).
// TUDO que a Lara edita fica aqui. Os componentes ficam em src/components/projeto/.

export const PROJETO = {
  eyebrow: "Proposta de parceria · 2026",
  nome: "Casa Estúdio",
  titulo: "Casa Estúdio",
  subtitulo:
    "Uma reforma inteira documentada, do vazio ao ambiente pronto de gravação.",
  intro:
    "Sou a Lara Dam, UGC creator e estrategista de conteúdo. Nos últimos 2 anos gravei mais de 500 vídeos para mais de 200 marcas e acumulei mais de 100 milhões de views. Agora estou reformando a minha casa com projeto de arquitetura e transformando cada etapa em conteúdo: cozinha nova com ilha, um ambiente próprio de gravação e a reforma completa do banheiro.",
  intro2:
    "Estou procurando marcas parceiras para construir esse projeto comigo. Quem entra, entra na história inteira: a escolha, a chegada, a instalação, o resultado e a rotina depois de pronto.",
  inicioObra: "Setembro de 2026",
  janelaFechamento: "Estou fechando as parcerias até o fim de agosto de 2026.",
  whatsapp: "5512988729264",
  whatsappLabel: "(12) 98872-9264",
  whatsappMensagem:
    "Oi Lara! Vi a página do Projeto Casa Estúdio e quero conversar sobre parceria.",
  email: "laradam.ugc@gmail.com",
  instagram: "eilaradam",
  // Preencha quando quiser creditar o escritório na página (deixe vazio pra esconder).
  arquiteta: { nome: "", instagram: "" },
};

// Números que já foram entregues. Mesmos dados do portfólio principal.
export const PROJETO_NUMEROS = [
  { value: "500+", label: "Vídeos gravados" },
  { value: "200+", label: "Marcas parceiras" },
  { value: "140M+", label: "Views em campanhas" },
  { value: "2 anos", label: "De estrada em UGC" },
];

export const PROJETO_RESULTADOS = [
  {
    metric: "100M",
    label: "views em um único vídeo",
    brand: "InfinitePay",
    note: "Recorde de CTR da marca no Meta.",
  },
  {
    metric: "30M",
    label: "views na campanha de mercado",
    brand: "Méliuz",
    note: "Roteiro e criativo pensados pra growth.",
  },
  {
    metric: "2.4x",
    label: "de ROAS em criativo pago",
    brand: "Campanha de performance",
    note: "CPA reduzido em até 38%.",
  },
  {
    metric: "4+",
    label: "campanhas seguidas",
    brand: "DT3",
    note: "Virou playbook de criativo da marca.",
  },
];

// Por que a marca deveria entrar nesse projeto.
export const PROJETO_ARGUMENTOS = [
  {
    icon: "Home",
    title: "O produto aparece em uso real",
    body: "Não é fundo branco nem mesa de estúdio. É a minha casa, a minha rotina e o produto sendo usado todo dia depois da obra.",
  },
  {
    icon: "Clapperboard",
    title: "Série com começo, meio e fim",
    body: "Reforma prende audiência. Quem vê a demolição volta pra ver a instalação e volta de novo pro resultado final. A marca pega as três ondas.",
  },
  {
    icon: "TrendingUp",
    title: "Conteúdo feito pra converter",
    body: "Roteiro, gancho e formato validados em campanhas que já bateram recorde de CTR e ROAS de 2.4x. O vídeo nasce pronto pra rodar como criativo.",
  },
  {
    icon: "Infinity",
    title: "Vida longa depois da obra",
    body: "O ambiente pronto vira cenário fixo dos meus conteúdos. Sua marca continua aparecendo meses depois da entrega, sem custo novo.",
  },
];

// O escopo da obra, ambiente por ambiente.
export type Ambiente = {
  slug: string;
  nome: string;
  resumo: string;
  itens: string[];
};

export const PROJETO_AMBIENTES: Ambiente[] = [
  {
    slug: "cozinha",
    nome: "Cozinha com ilha",
    resumo:
      "O coração do projeto e o ambiente que mais gravo. Ilha central nova, bancada em pedra, pia e marcenaria sob medida.",
    itens: [
      "Ilha central com bancada",
      "Pedra da bancada e da pia",
      "Cuba, pia e torneira",
      "Marcenaria sob medida",
      "Eletrodomésticos e cooktop",
      "Iluminação e pendentes",
    ],
  },
  {
    slug: "estudio",
    nome: "Ambiente de gravação",
    resumo:
      "Um cantinho da casa virando estúdio de verdade: luz, fundo e organização pensados pra gravar todo dia.",
    itens: [
      "Iluminação profissional",
      "Fundo cênico e painéis",
      "Mesa, cadeira e setup",
      "Tratamento acústico",
      "Estantes e organização",
      "Cortina e blackout",
    ],
  },
  {
    slug: "banheiro",
    nome: "Banheiro completo",
    resumo:
      "Reforma do zero: revestimento, louça, metais, box e bancada. Ambiente de rotina, ótimo pra beleza e cuidados pessoais.",
    itens: [
      "Louças e cuba",
      "Metais e chuveiro",
      "Box de vidro",
      "Bancada em pedra",
      "Revestimento e porcelanato",
      "Espelho, gabinete e iluminação",
    ],
  },
  {
    slug: "geral",
    nome: "Acabamento e decoração",
    resumo:
      "O que amarra a casa inteira e aparece no fundo de todo vídeo: cor, textura, móveis e os detalhes.",
    itens: [
      "Tinta e pintura",
      "Piso e revestimento",
      "Móveis e estofados",
      "Tapetes, cortinas e têxteis",
      "Plantas e vasos",
      "Climatização e smart home",
    ],
  },
];

// Categorias de parceiro que ainda estão abertas.
// status: "aberto" | "conversando" | "fechado"
export type BuscaItem = {
  categoria: string;
  ambiente: string;
  status: "aberto" | "conversando" | "fechado";
  marca?: string; // preencha quando fechar, aparece no lugar do status
};

export const PROJETO_BUSCA: BuscaItem[] = [
  { categoria: "Pedra e marmoraria", ambiente: "Cozinha e banheiro", status: "aberto" },
  { categoria: "Cuba, pia e torneira", ambiente: "Cozinha", status: "aberto" },
  { categoria: "Marcenaria sob medida", ambiente: "Cozinha e banheiro", status: "aberto" },
  { categoria: "Eletrodomésticos", ambiente: "Cozinha", status: "aberto" },
  { categoria: "Cooktop, coifa e forno", ambiente: "Cozinha", status: "aberto" },
  { categoria: "Utensílios e organização", ambiente: "Cozinha", status: "aberto" },
  { categoria: "Iluminação e pendentes", ambiente: "Casa toda", status: "aberto" },
  { categoria: "Revestimento e porcelanato", ambiente: "Cozinha e banheiro", status: "aberto" },
  { categoria: "Tinta e pintura", ambiente: "Casa toda", status: "aberto" },
  { categoria: "Louças e metais", ambiente: "Banheiro", status: "aberto" },
  { categoria: "Box e vidraçaria", ambiente: "Banheiro", status: "aberto" },
  { categoria: "Iluminação de estúdio", ambiente: "Ambiente de gravação", status: "aberto" },
  { categoria: "Câmera, tripé e microfone", ambiente: "Ambiente de gravação", status: "aberto" },
  { categoria: "Mesa, cadeira e home office", ambiente: "Ambiente de gravação", status: "aberto" },
  { categoria: "Móveis e estofados", ambiente: "Casa toda", status: "aberto" },
  { categoria: "Tapetes, cortinas e têxteis", ambiente: "Casa toda", status: "aberto" },
  { categoria: "Decoração, quadros e vasos", ambiente: "Casa toda", status: "aberto" },
  { categoria: "Climatização e smart home", ambiente: "Casa toda", status: "aberto" },
];

// Formatos de parceria.
export type Plano = {
  nome: string;
  chamada: string;
  descricao: string;
  destaque?: boolean;
  entregas: string[];
};

export const PROJETO_PLANOS: Plano[] = [
  {
    nome: "Parceiro do Projeto",
    chamada: "Uma marca por categoria",
    descricao:
      "Pra quem quer assinar o projeto junto comigo, do primeiro vídeo ao tour final. Formato com exclusividade na categoria.",
    destaque: true,
    entregas: [
      "Exclusividade na sua categoria durante toda a obra",
      "Série de 4 a 6 conteúdos dedicados",
      "Presença nas 3 fases: escolha, instalação e resultado",
      "Sequências de stories com link e caixinha de perguntas",
      "Ensaio de fotos do ambiente pronto, em alta resolução",
      "Direitos de uso e impulsionamento por 6 meses",
      "Depoimento em vídeo pro canal da marca",
      "Destaque no tour final do antes e depois",
    ],
  },
  {
    nome: "Parceiro de Ambiente",
    chamada: "Cozinha, estúdio ou banheiro",
    descricao:
      "A marca assume um ambiente inteiro e aparece como responsável pela transformação daquele espaço.",
    entregas: [
      "2 a 3 conteúdos dedicados ao ambiente",
      "Stories da chegada e da instalação",
      "Fotos do ambiente pronto em alta resolução",
      "Aparição no tour do antes e depois",
      "Direitos de uso por 3 meses",
    ],
  },
  {
    nome: "Parceiro de Produto",
    chamada: "Permuta item a item",
    descricao:
      "A marca envia o produto e recebe conteúdo. O jeito mais simples de entrar no projeto.",
    entregas: [
      "1 reel dedicado ou integração no conteúdo da obra",
      "Sequência de stories com link",
      "Fotos do produto no ambiente real",
      "Direitos de uso por 3 meses",
    ],
  },
];

export const PROJETO_FORMATOS_TEXTO =
  "Trabalho com permuta (produto por conteúdo), patrocínio em dinheiro e condições especiais de compra com contrapartida em conteúdo. Dá pra combinar os três. Me conta o que faz sentido pra sua marca e eu monto a proposta.";

// Cronograma da obra.
export const PROJETO_CRONOGRAMA = [
  {
    quando: "Agosto",
    titulo: "Seleção das marcas",
    body: "Projeto aprovado com a arquiteta e fechamento das parcerias. É agora que a sua marca entra.",
  },
  {
    quando: "Setembro",
    titulo: "Começa a obra",
    body: "Demolição, bastidores e o conteúdo do antes. A audiência entra na história junto comigo.",
  },
  {
    quando: "Outubro",
    titulo: "Instalação",
    body: "Chegada dos materiais, marcenaria, pedra, louças e iluminação. Fase de unboxing e de mostrar cada escolha.",
  },
  {
    quando: "Novembro",
    titulo: "Revelação",
    body: "Acabamento, decoração e o tour completo do antes e depois. O conteúdo de maior alcance do projeto.",
  },
  {
    quando: "Depois",
    titulo: "Vida no ambiente pronto",
    body: "A casa vira meu cenário fixo. Sua marca segue aparecendo na rotina, sem campanha nova.",
  },
];

// Antes e depois. Coloque as imagens em public/projeto/ e escreva o caminho aqui.
// Enquanto os dois campos estiverem vazios, o card não aparece na página.
// Se a seção inteira estiver vazia, ela some do site.
export type AntesDepois = {
  ambiente: string;
  legenda: string;
  antes: string; // ex: "/projeto/cozinha-antes.jpg"
  depois: string; // ex: "/projeto/cozinha-depois.jpg"
};

export const PROJETO_ANTES_DEPOIS: AntesDepois[] = [
  {
    ambiente: "Cozinha",
    legenda: "Como está hoje e o projeto da arquiteta com a ilha central.",
    antes: "",
    depois: "",
  },
  {
    ambiente: "Ambiente de gravação",
    legenda: "O canto que vira estúdio.",
    antes: "",
    depois: "",
  },
  {
    ambiente: "Banheiro",
    legenda: "Reforma completa, do revestimento aos metais.",
    antes: "",
    depois: "",
  },
];

// Vídeos de casa e decoração que já entreguei (ids do array VIDEOS em content.ts).
export const PROJETO_VIDEOS_IDS = [
  "d-coza2",
  "d1",
  "d7",
  "d13",
  "d11",
  "d5",
  "d9",
  "d4",
];

export const PROJETO_FAQ = [
  {
    q: "Como funciona a permuta?",
    a: "A marca envia (ou instala) o produto e a contrapartida é o conteúdo combinado no contrato. Não cobro cachê nesse formato, só alinho o volume de entregas com o valor do item.",
  },
  {
    q: "Posso participar com um item só?",
    a: "Pode. O formato Parceiro de Produto existe exatamente pra isso. Um item, um pacote de conteúdo.",
  },
  {
    q: "Tenho exclusividade na minha categoria?",
    a: "No formato Parceiro do Projeto, sim: uma marca por categoria durante toda a obra. Nos outros formatos a exclusividade é combinada caso a caso.",
  },
  {
    q: "Posso usar os vídeos nos meus anúncios?",
    a: "Sim. Todos os formatos incluem direitos de uso, e o material já é entregue pensado pra rodar como criativo de performance.",
  },
  {
    q: "Onde o conteúdo é publicado?",
    a: "No meu Instagram e TikTok, além dos arquivos em alta entregues pra marca usar nos canais dela.",
  },
  {
    q: "Quem assina o projeto?",
    a: "A obra tem projeto de arquitetura, então cada escolha de material tem justificativa técnica e vai ser mostrada assim no conteúdo.",
  },
];
