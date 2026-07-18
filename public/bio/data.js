/* =============================================================
   CONTEUDO PADRAO (FALLBACK) DO /bio
   -------------------------------------------------------------
   O conteudo de verdade vem do banco (Supabase) e voce edita
   pelo admin em creators.laradam.com (aba "Link na Bio"). Este
   arquivo so e usado como reserva, caso o banco fique indisponivel,
   pra pagina nunca ficar vazia.
   ============================================================= */

window.BIO_DEFAULT = {

  /* ---------- 1. PERFIL / CABECALHO ---------- */
  perfil: {
    nome: "Lara Dam",
    subtitulo: "Use o chat e descubra o melhor caminho para você!",
    foto: "assets/perfil.svg",
  },

  /* ---------- REDES SOCIAIS (linha de icones) ---------- */
  redes: [
    { rede: "instagram", url: "https://instagram.com/eilaradam" },
    { rede: "tiktok",    url: "https://www.tiktok.com/@eularadam" },
    { rede: "youtube",   url: "https://youtube.com/@eilaradam" },
    { rede: "linkedin",  url: "https://linkedin.com/in/laradam" },
  ],

  /* ---------- 2. CHATBOT / CONCIERGE DE IA ----------
     Funil RAMIFICADO. Pergunta o nome logo no inicio (pra falar
     direto com a pessoa), bifurca em 4 caminhos e leva cada um
     pra oferta certa. Cada opcao pode ter:
       proximo  -> id do proximo passo
       produto  -> id da oferta a recomendar no final (curso ou servico)
       contexto -> texto que entra na mensagem de WhatsApp dos servicos
       tags     -> so pra analytics / fallback de recomendacao
     Tipos de passo: "bot" | "texto" | "escolha" | "lead" | "recomendar"
     Em qualquer texto, {nome} vira o nome digitado.
  */
  chat: {
    tituloCard: "Como posso te ajudar hoje?",
    atendente: "Assistente da Lara",
    boasVindas: "Vou te fazer umas perguntinhas rápidas e no final te mostro o melhor caminho pra você. Bora?",
    passoInicial: "inicio",
    passos: {
      inicio: {
        tipo: "bot",
        texto: "Oi! Que bom te ver por aqui 💛 Sou a assistente da Lara.",
        proximo: "nome",
      },
      nome: {
        tipo: "texto",
        texto: "Antes de começar, como você se chama?",
        placeholder: "Seu nome",
        proximo: "q1",
      },

      /* ---- Pergunta 1: a bifurcacao ---- */
      q1: {
        tipo: "escolha",
        texto: "Prazer, {nome}! Me conta: o que mais combina com você hoje?",
        opcoes: [
          { label: "Quero começar na UGC do zero",              proximo: "q2a", tags: ["creator", "iniciante"] },
          { label: "Já crio conteúdo e quero escalar",          proximo: "q2b", tags: ["creator", "escalar"] },
          { label: "Sou marca e quero conteúdo UGC",            proximo: "q2c", tags: ["marca", "conteudo"] },
          { label: "Sou marca e preciso organizar minha operação", proximo: "q2d", tags: ["marca", "operacao"] },
        ],
      },

      /* ---- Caminho A: creator do zero ---- */
      q2a: {
        tipo: "escolha",
        texto: "Que fase boa, {nome} 💛 Qual seu foco pra dar o primeiro passo?",
        opcoes: [
          { label: "Aprender do zero a criar conteúdo",     proximo: "lead", produto: "ugc-zero" },
          { label: "Montar um portfólio que fecha marca",   proximo: "lead", produto: "portfolio-claude" },
          { label: "Já quero automatizar meu Instagram",    proximo: "lead", produto: "automacao-ig" },
        ],
      },

      /* ---- Caminho B: creator escalando ---- */
      q2b: {
        tipo: "escolha",
        texto: "Você já tá na estrada, {nome}! O que mais te trava hoje?",
        opcoes: [
          { label: "Organizar contratos, prazos e pagamentos", proximo: "lead", produto: "meumanager" },
          { label: "Fazer meu portfólio vender melhor",        proximo: "lead", produto: "portfolio-claude" },
          { label: "Automatizar meu Instagram e DMs",          proximo: "lead", produto: "automacao-ig" },
          { label: "Virar UGC Manager e gerenciar creators",   proximo: "lead", produto: "ugc-manager" },
        ],
      },

      /* ---- Caminho C: marca quer conteudo ---- */
      q2c: {
        tipo: "escolha",
        texto: "Que ótimo, {nome}! Como posso te ajudar com conteúdo?",
        opcoes: [
          { label: "Preciso de vídeos UGC pra anúncios e redes", proximo: "lead", produto: "servico-conteudo", contexto: "preciso de vídeos UGC pra anúncios e redes" },
          { label: "Quero uma criadora recorrente pra marca",    proximo: "lead", produto: "servico-conteudo", contexto: "quero uma criadora recorrente pra minha marca" },
          { label: "Quero entender como funciona e valores",     proximo: "lead", produto: "servico-conteudo", contexto: "quero entender como funciona e os valores" },
        ],
      },

      /* ---- Caminho D: marca quer organizar operacao ---- */
      q2d: {
        tipo: "escolha",
        texto: "Entendi, {nome}. Você prefere...?",
        opcoes: [
          { label: "Aprender a gerenciar creators eu mesma",        proximo: "lead", produto: "ugc-manager" },
          { label: "Terceirizar: a Lara e o time cuidam de tudo",   proximo: "lead", produto: "servico-agencia", contexto: "quero terceirizar minha operação de creators com você e seu time" },
          { label: "Contratar creators em escala",                  proximo: "lead", produto: "servico-agencia", contexto: "preciso contratar creators em escala" },
        ],
      },

      /* ---- Final: captura de contato (nome ja vem preenchido) ---- */
      lead: {
        tipo: "lead",
        texto: "Prontinho, {nome}! Sua recomendação já tá aqui 💛 Confirma seu contato pra eu te enviar e a gente continuar de onde parou.",
        proximo: "recomendar",
      },
      recomendar: {
        tipo: "recomendar",
        texto: "{nome}, com base no que você me contou, essa é a minha indicação pra você:",
      },
    },
  },

  /* ---------- 3 e 9. PRODUTOS / CURSOS (carrossel + catalogo) ----------
     Ordem = ordem que aparece na pagina. Os 3 primeiros vao no "Comece por aqui".
     checkout: link da pagina de venda. ENQUANTO estiver vazio, o botao
     leva pro WhatsApp ("quero saber mais") pra nao ficar link morto.
     waMsg: corpo da mensagem de WhatsApp ({oferta} vira o titulo).
  */
  produtos: [
    {
      id: "meumanager",
      titulo: "MeuManager",
      capaCor: "#FF5A4D",
      imagem: "",
      preco: "R$ 47/mês",
      descricao: "A plataforma que organiza sua vida de creator num lugar só: contratos, prazos, propostas, pagamentos e briefings. Pare de perder publi por desorganização e escale sem virar refém da planilha.",
      cta: "Assinar agora",
      ctaWhats: "Quero saber mais",
      checkout: "https://meumanager.com/login",
      waMsg: "Quero saber mais sobre o {oferta}.",
      tags: ["creator", "gestao", "escalar"],
    },
    {
      id: "portfolio-claude",
      titulo: "Portfolio com Claude",
      capaCor: "#FF8FA3",
      imagem: "",
      preco: "R$ 197",
      descricao: "A gravação da imersão onde você monta, do zero, um portfólio de UGC que fecha marca, usando a Claude como sua parceira de criação. Assista no seu tempo, quantas vezes quiser.",
      cta: "Quero minha vaga",
      ctaWhats: "Quero saber mais",
      checkout: "https://imersao.laradam.com/",
      waMsg: "Fiquei interessada no {oferta} e quero saber mais.",
      tags: ["creator", "portfolio", "iniciante"],
    },
    {
      id: "ugc-manager",
      titulo: "Seja uma UGC Manager",
      capaCor: "#7C6CE0",
      imagem: "",
      preco: "R$ 697",
      descricao: "O treinamento pra você sair de creator e virar UGC Manager: aprenda a montar um time, captar marcas e gerenciar campanhas de creators do início ao fim.",
      cta: "Quero entrar",
      ctaWhats: "Quero saber mais",
      checkout: "",
      waMsg: "Quero virar UGC Manager e me interessei no {oferta}.",
      tags: ["gestao", "manager", "operacao"],
    },
    {
      id: "ugc-zero",
      titulo: "UGC do Zero",
      capaCor: "#F4B942",
      imagem: "",
      preco: "R$ 197",
      descricao: "O curso pra quem nunca gravou nada e quer entrar na UGC com o pé direito. Do primeiro vídeo até a primeira publi paga, sem enrolação e com exemplos reais.",
      cta: "Quero começar",
      ctaWhats: "Quero saber mais",
      checkout: "",
      waMsg: "Quero começar na UGC e me interessei no {oferta}.",
      tags: ["creator", "iniciante"],
    },
    {
      id: "automacao-ig",
      titulo: "Automação Instagram com Claude",
      capaCor: "#2FBF71",
      imagem: "",
      preco: "R$ 297",
      descricao: "Aprenda a automatizar seu Instagram com a Claude: respostas de DM, comentários e captação de leads no piloto automático, sem parecer robô e sem depender de ferramenta cara.",
      cta: "Quero automatizar",
      ctaWhats: "Quero saber mais",
      checkout: "https://pay.kiwify.com.br/P4X2IfL",
      waMsg: "Quero automatizar meu Instagram e me interessei no {oferta}.",
      tags: ["creator", "automacao", "escalar"],
    },
  ],

  /* ---------- SERVICOS (so aparecem no chat, pro publico MARCA) ----------
     Sempre levam pro seu WhatsApp com uma mensagem que ja te conta
     quem e a pessoa (nome) e o que ela precisa ({contexto}).
  */
  servicos: [
    {
      id: "servico-conteudo",
      titulo: "Conteúdo UGC com a Lara",
      capaCor: "#25C47A",
      imagem: "",
      preco: "Sob consulta",
      descricao: "Vídeos UGC autênticos que convertem pra sua marca. Roteiro, gravação e entrega no jeitinho que performa nas redes e nos anúncios.",
      ctaWhats: "Chamar no WhatsApp",
      numero: "5512988729264",
      waMsg: "Sou marca e {contexto}. Podemos conversar sobre você criar conteúdo pra gente?",
      tags: ["marca", "conteudo"],
    },
    {
      id: "servico-agencia",
      titulo: "Gestão de Creators",
      capaCor: "#128C7E",
      imagem: "",
      preco: "Sob consulta",
      descricao: "A gente cuida da sua operação de creators de ponta a ponta: seleção, briefing, acompanhamento e entrega, pra sua marca escalar conteúdo sem dor de cabeça.",
      ctaWhats: "Chamar no WhatsApp",
      numero: "5512988729264",
      waMsg: "Sou marca e {contexto}. Bora conversar sobre gestão de creators / agência?",
      tags: ["marca", "agencia", "operacao"],
    },
  ],

  /* ---------- 4. LINK EXTERNO SIMPLES ---------- */
  linkExterno: {
    titulo: "Produtos que uso na criação de conteúdo",
    descricao: "Câmera, luz, apps e os gadgets que uso pra gravar todo dia. Minha lista testada e aprovada.",
    thumbCor: "#C9A227",
    imagem: "",
    url: "https://collshp.com/laradam?view=storefront",
  },

  /* ---------- 6. SPOTIFY (podcast) ---------- */
  spotify: {
    nome: "Papo de Creator",
    url: "https://open.spotify.com/episode/7makk4oTQel546B0PZlDM5",
  },

  /* ---------- 7. WHATSAPP ---------- */
  whatsapp: [
    {
      categoria: "Publicidade, UGC e Palestras",
      numero: "5512988729264",
      numeroExibicao: "(12) 98872-9264",
      mensagem: "Oi Lara! Vim pelo seu link na bio e quero falar sobre publi, UGC ou palestra.",
      cor: "#128C7E",
    },
  ],

  /* ---------- 8. FEED DO INSTAGRAM (visual) ---------- */
  instagram: {
    usuario: "@eilaradam",
    url: "https://instagram.com/eilaradam",
    posts: [
      { cor: "#FF5A4D", imagem: "assets/ig1.jpg", legenda: "Portfolio UGC",             link: "https://www.instagram.com/p/DatP5-FvQTu/" },
      { cor: "#FF8FA3", imagem: "assets/ig2.jpg", legenda: "Onde comecou tudo",          link: "https://www.instagram.com/p/DaiOGEzobvd/" },
      { cor: "#F4B942", imagem: "assets/ig3.jpg", legenda: "Skills do meu Claudinho",    link: "https://www.instagram.com/p/DaQk5QJEbN4/?img_index=1" },
      { cor: "#7C6CE0", imagem: "assets/ig4.jpg", legenda: "Tipos de creators que marcas contratam", link: "https://www.instagram.com/p/DZ8lALHEcCC/?img_index=1" },
    ],
  },

  /* ---------- 5 e 10. MARCA DA PLATAFORMA (powered by) ---------- */
  plataforma: {
    nome: "MeuManager",
    descricao: "Pagina montada com a plataforma pra creators",
    url: "https://meumanager.com",
    atribuicao: "Feito com carinho por Lara Dam",
  },

  /* ---------- TITULOS DAS SECOES ---------- */
  textos: {
    tituloCarrossel: "Comece por aqui",
    tituloCatalogo: "Todos os meus produtos",
  },
};
