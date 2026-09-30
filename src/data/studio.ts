// Conteúdo do "Lara Dam Studio" (rota /studio): o portfólio montado como uma
// ilha de edição. Cada take tem início e fim em segundos: é isso que define a
// largura do clipe na timeline e o timecode que corre no topo.

export type Take = {
  id: string;
  numero: string;
  titulo: string;   // nome curto (timeline e menu)
  slate: string;    // nome que aparece na claquete do take
  inicio: number;   // segundos
  fim: number;      // segundos
  foto: string;     // tile do clipe na timeline
};

export const TAKES: Take[] = [
  { id: "abertura", numero: "01", titulo: "Abertura", slate: "Abertura · quem grava", inicio: 0, fim: 24, foto: "/ensaio/publi-notebook.webp" },
  { id: "bin", numero: "02", titulo: "Bin UGC", slate: "Bin de mídia · UGC pra marcas", inicio: 24, fim: 96, foto: "/ensaio/ugc-caixas.webp" },
  { id: "audio", numero: "03", titulo: "Áudio", slate: "Trilha A1 · o que as marcas dizem", inicio: 96, fim: 126, foto: "/ensaio/ugc-tripe.webp" },
  { id: "exportar", numero: "04", titulo: "Exportar", slate: "Exportar · publi no @eilaradam", inicio: 126, fim: 168, foto: "/ensaio/publi-janela.webp" },
  { id: "creditos", numero: "05", titulo: "Créditos", slate: "Créditos · sobre a Lara", inicio: 168, fim: 196, foto: "/ensaio/sobre.webp" },
  { id: "renderizar", numero: "06", titulo: "Renderizar", slate: "Renderizar · fala comigo", inicio: 196, fim: 216, foto: "/ensaio/ugc-torre.webp" },
];

export const DURACAO_TOTAL = TAKES[TAKES.length - 1].fim;

export const PROJETO = {
  app: "Lara Dam Studio",
  arquivo: "portfolio_2026_FINAL_v3.lara",
  versao: "v2026.09",
  fps: 30,
};

export const ABERTURA = {
  monitorFoto: "/ensaio/publi-notebook.webp",
  hudEsq: "REC",
  hudDir: "4K · 30 FPS · AF",
  tercoTitulo: "Lara Dam",
  tercoSub: "UGC creator & influenciadora · Litoral de SP",
  claquete: [
    { k: "Produção", v: "Sua marca" },
    { k: "Direção", v: "Lara Dam" },
    { k: "Cena", v: "UGC + Publi" },
    { k: "Takes", v: "500+" },
    { k: "Views", v: "100M+" },
    { k: "Ano", v: "2026" },
  ],
  pitch1: "Vídeo que vende",
  pitch2: "pra sua marca.",
  pitch3: "Publi que conversa",
  pitch4: "no meu perfil.",
  corpo:
    "Este portfólio é uma ilha de edição. Dá play e a timeline anda sozinha, ou arrasta o playhead lá embaixo pra pular de take em take.",
  ctaPlay: "Dar play",
  ctaBin: "Abrir o bin de mídia",
};

export const BIN = {
  titulo: "Bin de mídia",
  sub: "UGC pra marcas: clipes prontos pra rodar como anúncio, abastecer e-commerce e virar playbook de criativo.",
  metadados: [
    { k: "Views", v: "100M+" },
    { k: "Clipes", v: "500+" },
    { k: "Marcas", v: "200+" },
    { k: "ROAS", v: "2.4x" },
    { k: "CPA", v: "até 38% menor" },
  ],
  melhores: ["t0a", "t0b", "t-infinitepay", "b1", "g-oliv1", "d-noroeste", "s-pharma-pdrn", "t-meidigital", "ia1", "va3"],
  presetsTitulo: "Presets",
  presetsSub: "O que dá pra aplicar na sua marca. Clica em um e ele já entra no pedido.",
  presets: [
    { id: "ugc", nome: "UGC de conversão", desc: "Vídeo autêntico pensado pra vender.", tag: "mais usado" },
    { id: "ads", nome: "Criativos pra tráfego", desc: "Ads pro Meta, TikTok e YouTube, com variações de hook." },
    { id: "roteiro", nome: "Roteiro estratégico", desc: "Script validado por performance, pra você ou pra outras creators." },
    { id: "foto", nome: "Fotos lifestyle", desc: "Imagem com direção de arte pra campanha e feed." },
    { id: "ecommerce", nome: "Pacote e-commerce", desc: "Entrega mensal pra manter a loja e o feed vivos." },
    { id: "consultoria", nome: "Consultoria UGC", desc: "Briefing, curadoria e direção de creators." },
  ],
  pluginsTitulo: "Marcas no projeto",
};

export const AUDIO = {
  titulo: "Trilha A1",
  sub: "O que as marcas dizem, do jeito que chegou. Um deles é áudio de verdade: aperta o play.",
  audioReal: { youtubeId: "rRrIpSRu90A", rotulo: "Depoimento de cliente em áudio", duracao: "13:52" },
};

export const EXPORTAR = {
  titulo: "Exportar pro Instagram",
  sub: "Publi no @eilaradam com a minha cara e a minha voz. Os números do destino são ao vivo, direto da API do Instagram.",
  fallback: { followers: 16039, reach_month: 367702, posts: 141 },
  preset: "Instagram · 1080 x 1920 · 9:16",
  formatos: [
    { id: "reels", nome: "Reels", desc: "Vídeo no feed com roteiro e edição pensados pra alcance.", padrao: true },
    { id: "stories", nome: "Stories", desc: "Sequência com CTA, caixinha de pergunta e link direto.", padrao: true },
    { id: "carrossel", nome: "Carrossel", desc: "Post com direção de arte e copy que segura até o fim.", padrao: false },
    { id: "collab", nome: "Collab", desc: "Publicação em conjunto, somando as duas audiências.", padrao: false },
  ],
  porques: [
    { t: "Entra como conteúdo", d: "A publi vai pro feed do jeito que a audiência já gosta de ver, não como anúncio disfarçado." },
    { t: "Audiência que responde", d: "Quem me segue é creator, empreendedora e gente que compra o que eu testo. Comentário vira conversa." },
    { t: "Relatório depois", d: "Você recebe alcance, visualizações, salvamentos e cliques da publicação." },
  ],
  legenda: "a sua marca no meu feed, do jeito que a minha audiência já gosta de ver 🫶",
  cta: "Exportar pedido",
  foto: "/ensaio/publi-janela.webp",
};

export const CREDITOS = {
  titulo: "Créditos",
  sub: "Quem está atrás (e na frente) da câmera.",
  fotoMakingOf: "/ensaio/sobre.webp",
  bio1: "Oie, eu sou a Lara Dam. Tenho 27 anos, moro no Litoral de SP e há 2 anos vivo de criar conteúdo. Comecei gravando UGC pra marcas e hoje faço as duas coisas: vídeo que roda como anúncio pra mais de 200 marcas e publi no meu perfil, pra uma audiência que acompanha meus bastidores.",
  bio2: "Também ensino outras creators a organizar a carreira. Então entendo os dois lados da mesa: o da marca que precisa de resultado e o da creator que precisa de briefing claro.",
  lista: [
    { k: "Direção", v: "Lara Dam" },
    { k: "Roteiro", v: "Lara Dam" },
    { k: "Câmera", v: "Lara Dam (e um tripé fiel)" },
    { k: "Edição", v: "Lara Dam" },
    { k: "Locação", v: "Litoral de SP" },
    { k: "Idade", v: "27 anos" },
    { k: "Tempo de estrada", v: "2 anos" },
    { k: "Marcas", v: "200+" },
    { k: "Clipes gravados", v: "500+" },
    { k: "Views", v: "100M+" },
    { k: "Recorde", v: "CTR no Meta (InfinitePay)" },
    { k: "Também faz", v: "Ensina creators a organizar a carreira" },
    { k: "Agradecimentos", v: "InfinitePay, Méliuz, DT3, Beauty Fair, Velds" },
    { k: "Fotos", v: "Ensaio de setembro de 2026" },
  ],
  filme: [
    { src: "/ensaio/cara-01.webp", legenda: "hook" },
    { src: "/ensaio/cara-02.webp", legenda: "chegou" },
    { src: "/ensaio/cara-03.webp", legenda: "problema" },
    { src: "/ensaio/cara-04.webp", legenda: "dúvida" },
    { src: "/ensaio/cara-05.webp", legenda: "segredo" },
    { src: "/ensaio/cara-06.webp", legenda: "novidade" },
    { src: "/ensaio/cara-07.webp", legenda: "teste" },
    { src: "/ensaio/cara-08.webp", legenda: "reação" },
    { src: "/ensaio/cara-09.webp", legenda: "resultado" },
    { src: "/ensaio/cara-10.webp", legenda: "antes" },
    { src: "/ensaio/cara-11.webp", legenda: "prova" },
    { src: "/ensaio/cara-12.webp", legenda: "cta" },
  ],
};

export const RENDERIZAR = {
  titulo: "Renderizar",
  sub: "Conta o projeto e aperta renderizar. Respondo em até 48h.",
  saidas: [
    { rotulo: "WhatsApp", valor: "(12) 98872-9264", href: "https://wa.me/5512988729264" },
    { rotulo: "E-mail", valor: "laradam.ugc@gmail.com", href: "mailto:laradam.ugc@gmail.com" },
    { rotulo: "Instagram", valor: "@eilaradam", href: "https://instagram.com/eilaradam" },
  ],
  botao: "Renderizar",
  enviando: "Renderizando",
  pronto: "Render concluído. Respondo em até 48h.",
  erro: "Deu erro no render. Tenta de novo ou me chama no WhatsApp.",
};
