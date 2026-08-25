// Conteúdo da página /projeto (proposta de patrocínio da reforma da casa).
// TUDO que a Lara edita fica aqui. Os componentes ficam em src/components/projeto/.

export const PROJETO = {
  eyebrow: "Proposta de parceria · 2026",
  nome: "Casa Estúdio",
  titulo: "Casa Estúdio",
  subtitulo:
    "Uma reforma inteira documentada, do vazio ao ambiente pronto de gravação.",
  intro:
    "Cozinha nova com ilha, um ambiente próprio de gravação e o banheiro refeito do zero. Tudo com projeto de arquitetura e documentado em vídeo, do primeiro dia de obra ao tour final.",
  intro2:
    "Procuro marcas parceiras pra construir esse projeto comigo. Quem entra, entra na história inteira.",
  inicioObra: "Novembro de 2026",
  janelaFechamento: "Estou fechando as parcerias até o fim de outubro de 2026.",
  whatsapp: "5512988729264",
  whatsappLabel: "(12) 98872-9264",
  whatsappMensagem:
    "Oi Lara! Vi a página do Projeto Casa Estúdio e quero conversar sobre parceria.",
  email: "laradam.ugc@gmail.com",
  instagram: "eilaradam",
  // Preencha quando quiser creditar o escritório na página (deixe vazio pra esconder).
  arquiteta: { nome: "Bianca Ramos, do be.out studio", instagram: "" },
};

// Frase da faixa corrida do topo.
export const PROJETO_MARQUEE =
  "Reforma documentada do primeiro dia ao tour final";

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
    body: "Não é fundo branco nem mesa de estúdio. É a minha casa e a minha rotina, todo dia, depois da obra.",
  },
  {
    icon: "Clapperboard",
    title: "Série com começo, meio e fim",
    body: "Quem vê a demolição volta pra instalação e volta de novo pro resultado. Sua marca pega as três ondas.",
  },
  {
    icon: "TrendingUp",
    title: "Conteúdo feito pra converter",
    body: "Roteiro e formato validados em campanha: recorde de CTR no Meta e ROAS de 2.4x. Nasce pronto pra rodar como anúncio.",
  },
  {
    icon: "Infinity",
    title: "Vida longa depois da obra",
    body: "O ambiente pronto vira meu cenário fixo. Sua marca segue aparecendo meses depois, sem campanha nova.",
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
      "Ilha central, bancada em pedra, pia e marcenaria sob medida. O ambiente que mais gravo.",
    itens: [
      "Ilha com bancada e banquetas",
      "Pedra da bancada e da pia",
      "Cuba, pia e torneira",
      "Marcenaria ripada sob medida",
      "Eletrodomésticos e cooktop",
      "Iluminação, pendentes e fita de LED",
    ],
  },
  {
    slug: "estudio",
    nome: "Ambiente de gravação",
    resumo:
      "Luz, fundo e organização pra gravar todo dia sem improviso.",
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
      "Reforma do zero: revestimento, louça, metais, box e bancada.",
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
      "O que aparece no fundo de todo vídeo: cor, textura, móveis e os detalhes.",
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
  { categoria: "Mesa, cadeiras e banquetas", ambiente: "Sala e cozinha", status: "aberto" },
  { categoria: "Espelhos", ambiente: "Sala e banheiro", status: "aberto" },
  { categoria: "Piso laminado ou vinílico", ambiente: "Casa toda", status: "aberto" },
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
      "Assina o projeto comigo, do primeiro vídeo ao tour final, com exclusividade na sua categoria. Produto e cachê de produção.",
    destaque: true,
    entregas: [
      "Exclusividade na sua categoria durante toda a obra",
      "Série de 4 a 6 conteúdos dedicados",
      "Presença nas 3 fases: escolha, instalação e resultado",
      "Fotos do ambiente pronto em alta resolução",
      "Direitos de uso e impulsionamento por 6 meses",
    ],
  },
  {
    nome: "Parceiro de Ambiente",
    chamada: "Cozinha, estúdio ou banheiro",
    descricao:
      "A marca assume um ambiente inteiro e responde pela transformação dele. Produto e cachê de produção.",
    entregas: [
      "2 a 3 conteúdos dedicados ao ambiente",
      "Stories da chegada e da instalação",
      "Fotos do ambiente pronto em alta",
      "Direitos de uso por 3 meses",
    ],
  },
  {
    nome: "Parceiro de Produto",
    chamada: "Item a item",
    descricao:
      "A marca entra com um produto e com o cachê do conteúdo dele. O jeito mais simples de começar.",
    entregas: [
      "1 reel dedicado ou integração no conteúdo da obra",
      "Sequência de stories com link",
      "Direitos de uso por 3 meses",
    ],
  },
];

export const PROJETO_FORMATOS_TEXTO =
  "Em todos os formatos a marca entra com o produto e com o cachê da produção. O que muda é o tamanho da entrega. Me conta o que funciona pra sua marca que eu monto a proposta.";

// Cronograma da obra.
export const PROJETO_CRONOGRAMA = [
  {
    quando: "Setembro e outubro",
    titulo: "Seleção das marcas",
    body: "Projeto aprovado com a arquiteta e fechamento das parcerias. É agora que a sua marca entra.",
  },
  {
    quando: "Novembro",
    titulo: "Começa a obra",
    body: "Demolição, bastidores e o conteúdo do antes. A audiência entra na história junto comigo.",
  },
  {
    quando: "Dezembro",
    titulo: "Instalação",
    body: "Chegada dos materiais, marcenaria, pedra, louças e iluminação. Fase de unboxing e de mostrar cada escolha.",
  },
  {
    quando: "Janeiro",
    titulo: "Revelação",
    body: "Acabamento, decoração e o tour completo do antes e depois. O conteúdo de maior alcance do projeto.",
  },
  {
    quando: "Depois",
    titulo: "Vida no ambiente pronto",
    body: "A casa vira meu cenário fixo. Sua marca segue aparecendo na rotina, sem campanha nova.",
  },
];

// Paleta e materiais do projeto (tirados dos renders da arquiteta).
export const PROJETO_PALETA = [
  { cor: "#93A06C", nome: "Verde oliva", onde: "Parede da cozinha" },
  { cor: "#E8DEC9", nome: "Bege ripado", onde: "Painel da sala" },
  { cor: "#6A4630", nome: "Madeira nogueira", onde: "Marcenaria e bancada" },
  { cor: "#F1F0E8", nome: "Granilite branco", onde: "Tampo da bancada" },
  { cor: "#B4654A", nome: "Terracota", onde: "Espelho arco e detalhes" },
];


// Tour 3D do apartamento (arquivo estático em public/projeto/3d/).
export const PROJETO_TOUR = {
  url: "/projeto/3d",
  titulo: "Entre no apê antes de decidir.",
  texto:
    "Um modelo 3D do apartamento pra você girar, aproximar e ver de qualquer ângulo. Dá pra escolher o ambiente, ver de cima e imaginar exatamente onde o seu produto entra na casa.",
  chamada: "Abrir em tela cheia",
};

// Quem assina o projeto (foto + recado pra marca).
export const PROJETO_SOBRE = {
  foto: "/projeto/lara-sobre.webp",
  fotoAlt: "Lara Dam",
  nome: "Lara Dam",
  cargo: "UGC Creator e estrategista de conteúdo",
  local: "Litoral de SP",
  bullets: [
    "Experiência de 2 anos gravando publicidades",
    "Roteiro, gravação, edição e entrega, tudo comigo",
    "Casa e decoração é um dos meus nichos fortes",
  ],
  recado:
    "A reforma é aqui em casa mesmo, onde eu vivo e gravo. Então tudo que entrar agora vai continuar aparecendo depois que a obra terminar, porque eu vou usar de verdade. Quem vem junto nessa não aparece num vídeo solto, vem pra história inteira.",
  assinatura: "Lara",
};

// GALERIA "COMO VAI FICAR" (o painel/carrossel do topo da página).
// Coloque as imagens em public/projeto/galeria/ e liste aqui na ordem que quer mostrar.
// Enquanto a lista estiver vazia, o topo da página fica só com o texto.
export type Render = {
  src: string; // ex: "/projeto/galeria/cozinha-01.jpg"
  titulo: string;
  legenda?: string;
};

export const PROJETO_GALERIA: Render[] = [
  {
    src: "/projeto/galeria/01-estar.webp",
    titulo: "Sala de estar",
    legenda: "Painel ripado, iluminação indireta e o sofá em frente ao canto de gravação.",
  },
  {
    src: "/projeto/galeria/02-cozinha-ilha.webp",
    titulo: "Cozinha com ilha",
    legenda: "Bancada em granilite, marcenaria em nogueira e a parede verde oliva.",
  },
  {
    src: "/projeto/galeria/03-canto-gravacao.webp",
    titulo: "O canto de gravação",
    legenda: "Espelho arco, plantas e luz controlada: o cenário fixo dos vídeos.",
  },
  {
    src: "/projeto/galeria/04-jantar-cozinha.webp",
    titulo: "Jantar e cozinha integrados",
    legenda: "Mesa, pendente de madeira e a ilha com banquetas logo atrás.",
  },
  {
    src: "/projeto/galeria/05-ilha-banquetas.webp",
    titulo: "Ilha e banquetas",
    legenda: "O ponto de café da manhã e de gravação de receita.",
  },
  {
    src: "/projeto/galeria/06-estar-cortina.webp",
    titulo: "Estar e cortina",
    legenda: "Rack em madeira, cortina de linho e a parede de quadros.",
  },
  {
    src: "/projeto/galeria/07-jantar.webp",
    titulo: "Mesa de jantar",
    legenda: "Onde entram as receitas, os utensílios e a mesa posta.",
  },
  {
    src: "/projeto/galeria/08-integrado.webp",
    titulo: "Vista geral",
    legenda: "Sala, jantar e cozinha em um ambiente só.",
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
    legenda: "Como está hoje e o projeto: ilha com bancada, marcenaria ripada e parede verde oliva.",
    antes: "",
    depois: "",
  },
  {
    ambiente: "Ambiente de gravação",
    legenda: "O canto da sala que vira estúdio, com o painel ripado de fundo.",
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
// Vídeos escolhidos pela Lara pra essa página (ids do array VIDEOS em content.ts)
export const PROJETO_VIDEOS_IDS = [
  "d-unipega",    // Unipega
  "t-reforma100", // Reforma100
  "d7",           // Mez Móveis
  "d10",          // Offertus
  "d1",           // DT3
  "d8",           // Mez Móveis
  "d11",          // Velds
  "d2",           // DT3
];

export const PROJETO_FAQ = [
  {
    q: "Como funciona o pagamento?",
    a: "São duas partes. A marca entra com o produto, que é enviado ou instalado aqui e vira parte da obra, e com o cachê da produção do conteúdo. O produto é o material do projeto e o conteúdo é o meu trabalho, então cada um tem o seu valor. Fecho tudo em contrato antes de começar, com volume de entregas e prazos combinados.",
  },
  {
    q: "Posso participar com um item só?",
    a: "Pode. O formato Parceiro de Produto existe exatamente pra isso: um item, um pacote de conteúdo e um cachê proporcional ao pacote.",
  },
  {
    q: "Tenho exclusividade na minha categoria?",
    a: "No formato Parceiro do Projeto, sim: uma marca por categoria durante toda a obra. Nos outros formatos a exclusividade é combinada caso a caso.",
  },
  {
    q: "Posso usar os vídeos nos meus anúncios?",
    a: "Sim. Todos os formatos incluem direitos de uso, e o material já é entregue pensado pra rodar como criativo de performance. Publico no meu Instagram e TikTok e mando os arquivos em alta pra marca.",
  },
];
