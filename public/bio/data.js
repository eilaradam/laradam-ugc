/* =============================================================
   CONTEUDO PADRAO (FALLBACK) DO /bio
   -------------------------------------------------------------
   O conteudo de verdade agora vem do banco (Supabase) e voce edita
   pelo admin em /admin (aba "Editar Bio"). Este arquivo so e usado
   como reserva, caso o banco fique indisponivel, pra pagina nunca
   ficar vazia.
   ============================================================= */

window.BIO_DEFAULT = {

  /* ---------- 1. PERFIL / CABECALHO ---------- */
  perfil: {
    nome: "Lara Dam",
    subtitulo: "Responda 3 perguntinhas e descubra o melhor caminho pra voce",
    // Troque pela sua foto: coloque um arquivo em  assets/perfil.jpg
    // (a mesma foto vira o fundo desfocado da pagina automaticamente)
    foto: "assets/perfil.svg",
  },

  /* ---------- REDES SOCIAIS (linha de icones) ---------- */
  redes: [
    { rede: "instagram", url: "https://instagram.com/eilaradam" },
    { rede: "tiktok",    url: "https://tiktok.com/@eilaradam" },
    { rede: "youtube",   url: "https://youtube.com/@eilaradam" },
    { rede: "linkedin",  url: "https://linkedin.com/in/laradam" },
  ],

  /* ---------- 2. CHATBOT / CONCIERGE DE IA ----------
     Funil de perguntas. A ultima resposta define qual produto
     e recomendado (pelo sistema de "tags" mais parecidas).
     Tipos de passo:  "bot" (fala) | "escolha" (botoes) | "texto" (campo)
  */
  chat: {
    tituloCard: "Como posso te ajudar hoje?",
    atendente: "Assistente da Lara",
    boasVindas: "Vou te fazer 3 perguntinhas rapidas e no final indico o melhor caminho pra voce. Bora?",
    passoInicial: "inicio",
    passos: {
      inicio: {
        tipo: "bot",
        texto: "Oi! Que bom te ver por aqui 💛 Sou a assistente da Lara. Me conta uma coisa...",
        proximo: "q1",
      },
      q1: {
        tipo: "escolha",
        texto: "O que mais combina com voce hoje?",
        opcoes: [
          { label: "Quero comecar na UGC do zero", tags: ["iniciante"], proximo: "q2" },
          { label: "Ja crio conteudo e quero escalar", tags: ["intermediario"], proximo: "q2" },
          { label: "Preciso organizar minha operacao", tags: ["gestao"], proximo: "q2" },
        ],
      },
      q2: {
        tipo: "escolha",
        texto: "Perfeito. E o seu foco AGORA e...?",
        opcoes: [
          { label: "Montar um portfolio que vende", tags: ["portfolio"], proximo: "q3" },
          { label: "Fechar mais publis", tags: ["vendas"], proximo: "q3" },
          { label: "Organizar contratos e prazos", tags: ["gestao"], proximo: "q3" },
        ],
      },
      q3: {
        tipo: "escolha",
        texto: "Ultima! Quanto voce quer investir pra dar esse passo?",
        opcoes: [
          { label: "Algo gratuito ou de baixo custo", tags: ["low"], proximo: "nome" },
          { label: "Posso investir num curso", tags: ["mid"], proximo: "nome" },
          { label: "Quero a solucao completa", tags: ["high"], proximo: "nome" },
        ],
      },
      nome: {
        tipo: "texto",
        texto: "Adorei! Como voce se chama? (assim eu personalizo a indicacao)",
        placeholder: "Digite seu nome",
        proximo: "recomendar",
      },
      recomendar: {
        tipo: "recomendar",
        // texto usa {nome} pra inserir o nome digitado
        texto: "{nome}, com base no que voce me contou, essa e a minha indicacao pra voce:",
      },
    },
  },

  /* ---------- 3 e 9. PRODUTOS (carrossel + catalogo) ----------
     "tags" servem pro chatbot recomendar o produto certo.
     "cor" e so a cor do placeholder da capa (troque por "imagem" se tiver foto).
  */
  produtos: [
    {
      id: "meumanager",
      titulo: "MeuManager",
      capaCor: "#FF5A4D",
      imagem: "",               // ex: "assets/produto1.jpg" (opcional)
      preco: "R$ 47/mes",
      descricao: "A plataforma que organiza sua vida de UGC creator: contratos, prazos, propostas, pagamentos e briefings num lugar so. Pare de perder publi por desorganizacao. Ideal pra quem ja vive de conteudo e quer escalar sem virar refem da planilha.",
      cta: "Assinar agora",
      checkout: "https://meumanager.com.br",
      tags: ["gestao", "intermediario", "high"],
    },
    {
      id: "imersao",
      titulo: "Imersao Portfolio",
      capaCor: "#FF8FA3",
      imagem: "",
      preco: "R$ 497",
      descricao: "Em poucos dias voce monta um portfolio de UGC que fecha marca. Passo a passo pratico: o que gravar, como editar, como precificar e como apresentar. Pra quem quer parar de trabalhar de graca e comecar a cobrar o que merece.",
      cta: "Quero minha vaga",
      checkout: "https://imersao.laradam.com",
      tags: ["portfolio", "intermediario", "mid"],
    },
    {
      id: "ugc-zero",
      titulo: "UGC do Zero",
      capaCor: "#F4B942",
      imagem: "",
      preco: "R$ 197",
      descricao: "O curso pra quem nunca gravou nada e quer entrar na UGC com o pe direito. Do primeiro video ate a primeira publi paga. Sem enrolacao, direto ao ponto, com exemplos reais.",
      cta: "Comecar agora",
      checkout: "https://laradam.com/ugc-do-zero",
      tags: ["iniciante", "mid", "vendas"],
    },
    {
      id: "midiakit",
      titulo: "Template de Midia Kit",
      capaCor: "#7C6CE0",
      imagem: "",
      preco: "R$ 37",
      descricao: "Modelo pronto e editavel de midia kit profissional pra voce enviar pras marcas hoje mesmo. Editavel no Canva. So trocar suas fotos e numeros. Um dos jeitos mais rapidos de parecer profissional.",
      cta: "Baixar template",
      checkout: "https://laradam.com/midia-kit",
      tags: ["iniciante", "portfolio", "low"],
    },
    {
      id: "consultoria",
      titulo: "Consultoria 1:1",
      capaCor: "#2FBF71",
      imagem: "",
      preco: "R$ 897",
      descricao: "Uma hora comigo, olhando o SEU caso. Analiso seu portfolio, sua tabela de precos e sua estrategia de prospeccao. Voce sai com um plano claro do que fazer nos proximos 90 dias.",
      cta: "Agendar consultoria",
      checkout: "https://laradam.com/consultoria",
      tags: ["vendas", "high", "intermediario"],
    },
  ],

  /* ---------- 4. LINK EXTERNO SIMPLES (ex: livro na Amazon) ---------- */
  linkExterno: {
    titulo: "O livro que mudou meu negocio",
    descricao: "A leitura que todo creator deveria fazer antes de cobrar sua primeira publi.",
    thumbCor: "#C9A227",
    imagem: "",
    url: "https://amazon.com.br",
  },

  /* ---------- 6. SPOTIFY (podcast) ----------
     Cole o link do episodio/show. Pegue em: Spotify > ... > Compartilhar > Copiar link
  */
  spotify: {
    nome: "Papo de Creator",
    // Link normal do Spotify (o site converte pro player automaticamente)
    url: "https://open.spotify.com/episode/7makk4oTQel546B0PZlDM5",
  },

  /* ---------- 7. WHATSAPP ---------- */
  whatsapp: [
    {
      categoria: "Publicidade e palestras",
      numero: "5511999999999",           // so numeros, com DDI+DDD
      numeroExibicao: "+55 11 99999-9999",
      mensagem: "Oi Lara! Vim pelo seu link na bio e quero falar sobre publi/palestra.",
      cor: "#128C7E",
    },
    {
      categoria: "Suporte MeuManager",
      numero: "5511988888888",
      numeroExibicao: "+55 11 98888-8888",
      mensagem: "Oi! Preciso de ajuda com o MeuManager.",
      cor: "#25D366",
    },
  ],

  /* ---------- 8. FEED DO INSTAGRAM (visual, imita o app) ----------
     Coloque imagens em assets/ e referencie aqui, ou deixe a cor
     que vira um placeholder bonito.
  */
  instagram: {
    usuario: "@eilaradam",
    url: "https://instagram.com/eilaradam",
    posts: [
      { cor: "#FF5A4D", imagem: "", legenda: "Bastidores de uma publi" },
      { cor: "#FF8FA3", imagem: "", legenda: "Dica de portfolio" },
      { cor: "#F4B942", imagem: "", legenda: "Antes e depois" },
      { cor: "#7C6CE0", imagem: "", legenda: "Rotina de creator" },
      { cor: "#2FBF71", imagem: "", legenda: "Como precificar" },
    ],
  },

  /* ---------- 5 e 10. MARCA DA PLATAFORMA (powered by) ---------- */
  plataforma: {
    nome: "MeuManager",
    descricao: "Pagina montada com a plataforma pra creators",
    url: "https://meumanager.com.br",
    atribuicao: "Feito com carinho por Lara Dam",
  },

  /* ---------- TITULOS DAS SECOES (mude se quiser) ---------- */
  textos: {
    tituloCarrossel: "Comeca por aqui",
    tituloCatalogo: "Todos os meus produtos",
  },
};
