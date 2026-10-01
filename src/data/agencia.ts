// Página /agencia: gestão de campanhas UGC (conteúdo portado da página /gestao).
import { PERFIL } from "./perfil";

export const AG_WHATSAPP = "https://wa.me/5512988729264?text=" + encodeURIComponent("Oi Lara! Quero conversar sobre uma campanha UGC com várias creators pra minha marca.");

export const AG_NAV = [
  { id: "comparar", rotulo: "Comparar" },
  { id: "conteudos", rotulo: "Conteúdos" },
  { id: "modalidades", rotulo: "Modalidades" },
  { id: "processo", rotulo: "Processo" },
  { id: "sobre", rotulo: "Sobre" },
  { id: "duvidas", rotulo: "Dúvidas" },
  { id: "contato", rotulo: "Contato" },
];

// Capa da agência: frase, botão e um mosaico com capas das creators da rede.
export const AG_CAPA = {
  eyebrow: "Gestão de campanhas UGC · do briefing à entrega",
  titulo1: "Sua marca não precisa de mais um vídeo.",
  tituloAcento: "Precisa de uma campanha que funcione.",
  sub: "Seleção de creators, briefing, roteiro revisado, produção acompanhada e entrega no prazo. Você roda mídia. Nós rodamos a operação.",
  cta: "Quero conversar sobre minha campanha",
  ctaSub: "Diagnóstico gratuito antes de qualquer proposta. Resposta em até 24h.",
  numeros: [
    { b: "+100", t: "campanhas gerenciadas" },
    { b: "+200", t: "marcas atendidas" },
    { b: "+2.000", t: "creators em rede" },
  ],
  mosaicoLegenda: "creators da rede em campanhas recentes",
  // quantas capas entram no mosaico (pega as primeiras com capa local, pulando marcas repetidas em sequência)
  mosaicoQtd: 9, // 3 fileiras (3x3), tamanho de referência aprovado
};

// Abertura da página (opção J escolhida pela Lara em 01/10/2026): comparação "por conta × com gestão".
export const AG_VS = {
  titulo1: "Fazer UGC por conta",
  ou: "ou",
  titulo2: "com gestão?",
  sub: "A diferença entre vídeo solto e campanha que funciona está no processo. Compara:",
  semGestao: {
    k: "Por conta",
    titulo: "Sua equipe caçando creator no DM",
    itens: [
      "Mensagem em massa e resposta de quem aparece",
      "Briefing vago, cada creator entende de um jeito",
      "Roteiro sem revisão e vídeo que não serve pra ads",
      "Correr atrás de prazo e refazer entrega",
      "Ninguém lê o resultado no fim",
    ],
  },
  comGestao: {
    k: "Com a Lara",
    titulo: "Do briefing à entrega, sem retrabalho",
    itens: [
      "Casting pré-aprovado de +2.000 creators em rede",
      "Briefing co-criado e roteiro revisado antes de gravar",
      "Gravação acompanhada, revisão antes de chegar em você",
      "Entrega no prazo, com direitos de uso em contrato",
      "Relatório: o que performou e o próximo ciclo",
    ],
  },
  numeros: [
    { b: "+100", t: "campanhas gerenciadas" },
    { b: "+200", t: "marcas atendidas" },
    { b: "+2.000", t: "creators em rede" },
  ],
  cta: "Quero conversar sobre minha campanha",
  ctaSub: "Diagnóstico gratuito antes de qualquer proposta. Resposta em até 24h.",
};

export const AG_CAB = {
  usuario: "laradam.gestão",
  avatar: PERFIL.avatar,
  stats: [
    { b: "+100", t: "campanhas gerenciadas" },
    { b: "+200", t: "marcas atendidas" },
    { b: "+2.000", t: "creators em rede" },
  ],
  bioTitulo: "Gestão de campanhas UGC 🤝 do briefing à entrega",
  bio: [
    "🎯 seleção de creators, briefing, roteiro revisado, produção acompanhada",
    "📊 relatório e leitura no fim de cada ciclo",
    "📍 Atende o Brasil todo",
  ],
  balao: "Você roda mídia. **Nós rodamos a operação.** Creators certos, briefing alinhado, roteiro revisado, produção acompanhada e entrega no prazo.",
  nota: "← diagnóstico gratuito antes de qualquer proposta, resposta em até 24h",
  carimbo: "+100 campanhas",
  faixa: ["Sem retrabalho", "Sem improviso", "Processo claro", "OLX", "ZAP Imóveis", "Magalu", "Porto Seguro", "Chilli Beans", "Bonduelle", "Bauducco", "Granado", "Lancôme", "Carolina Herrera", "Calvin Klein", "Jägermeister"],
};

export const AG_OQUEFACO = {
  titulo: "Gestão completa. Sem montar time interno. 🎯",
  sub: "Eu opero a campanha de ponta a ponta. Você define o objetivo, eu entrego o que vai pro ar.",
  itens: [
    { e: "🔎", nome: "Seleção de creators", desc: "Hunting com critério, não mensagem em massa. Perfil alinhado com sua persona, histórico de entrega, nicho compatível e disponibilidade real. Você recebe creators pré-aprovados." },
    { e: "📝", nome: "Briefing co-criado", desc: "Construído junto com você, traduzindo posicionamento de marca em direção criativa que o creator entende e executa. Briefing claro é metade do trabalho." },
    { e: "✍️", nome: "Roteiros revisados", desc: "Toda campanha minha tem roteiro revisado por mim antes do creator gravar. É onde mais campanha desanda no mercado, e onde mais cuido pra não desandar a sua." },
    { e: "🎥", nome: "Produção acompanhada", desc: "Acompanhamento direto com cada creator. Cobrança de prazo, ajuste de execução, suporte técnico. Você não vai ficar correndo atrás de ninguém." },
    { e: "✅", nome: "Revisão antes da entrega", desc: "Antes do material chegar em você, ele já passou por revisão. Você recebe entrega, não rascunho." },
    { e: "📊", nome: "Relatório e leitura", desc: "Leitura clara do que performou, o que saturou e o que vamos testar no próximo ciclo. Decisão baseada em dado, não em achismo." },
  ],
};

export type AgVideo = { brand: string; nicho: string; youtubeId?: string; instagram?: string; thumbnail?: string; titulo?: string; externo?: boolean; engajamento?: number };

// Vídeos gerenciados pela agência (outras creators). YouTube = capa automática;
// Instagram = capa local em /public/capas-ig/<código>.webp (o IG não deixa puxar).
export const AG_CONTEUDOS = {
  titulo: "Conteúdos gerenciados pelo nosso time",
  sub: "Campanhas com várias creators, por marca. Desliza pro lado e clica pra assistir.",
  videos: [
    // Coza (Instagram, out/2026)
    { brand: "Coza", nicho: "casa", instagram: "Ddmx8TpR2_c", thumbnail: "/capas-ig/Ddmx8TpR2_c.webp", titulo: "Zip Vácuo · kit hóspede", engajamento: 58 },
    { brand: "Coza", nicho: "casa", instagram: "DdO1UKmB-AH", thumbnail: "/capas-ig/DdO1UKmB-AH.webp", titulo: "Linha Modo Bambu", engajamento: 46 },
    { brand: "Coza", nicho: "casa", instagram: "DdCodtuReFZ", thumbnail: "/capas-ig/DdCodtuReFZ.webp", titulo: "Linha Puffer", engajamento: 81 },
    { brand: "Coza", nicho: "casa", instagram: "DcrzFNpxgT2", thumbnail: "/capas-ig/DcrzFNpxgT2.webp", titulo: "Linha Puffer", engajamento: 50 },
    { brand: "Coza", nicho: "casa", instagram: "DcejObxR_2a", thumbnail: "/capas-ig/DcejObxR_2a.webp", titulo: "Saco a vácuo na mala", engajamento: 49 },
    { brand: "Coza", nicho: "casa", instagram: "DcZj-sOx0dm", thumbnail: "/capas-ig/DcZj-sOx0dm.webp", titulo: "Saco Zip Vácuo", engajamento: 52 },
    { brand: "Coza", nicho: "casa", instagram: "DbRTjSqhSH6", thumbnail: "/capas-ig/DbRTjSqhSH6.webp", titulo: "Linha Dry · geladeira", engajamento: 85 },
    { brand: "Coza", nicho: "casa", instagram: "DbI8BXWgbXU", thumbnail: "/capas-ig/DbI8BXWgbXU.webp", titulo: "Cesto de lavanderia", engajamento: 113 },
    // Little Duck (Instagram, 2026) — puxado pra cima a pedido da Lara
    { brand: "Little Duck", nicho: "casa", instagram: "DUjAJxnjdZe", thumbnail: "/capas-ig/DUjAJxnjdZe.webp", titulo: "Sofá de brincar · vale a pena?", engajamento: 42 },
    { brand: "Little Duck", nicho: "casa", instagram: "DSXnRGlDQSH", thumbnail: "/capas-ig/DSXnRGlDQSH.webp", titulo: "Conheça a fábrica", engajamento: 681 },
    // Frooty (Instagram, set/out 2026)
    { brand: "Frooty", nicho: "food", instagram: "DSYQzfmERiN", thumbnail: "/capas-ig/DSYQzfmERiN.webp", titulo: "#RoxosPorFrooty", engajamento: 96 },
    { brand: "Frooty", nicho: "food", instagram: "DSI1HbikZge", thumbnail: "/capas-ig/DSI1HbikZge.webp", titulo: "Pós-corrida", engajamento: 144 },
    { brand: "Frooty", nicho: "food", instagram: "DSBG8z5kbxf", thumbnail: "/capas-ig/DSBG8z5kbxf.webp", titulo: "Na rotina", engajamento: 87 },
    { brand: "Frooty", nicho: "food", instagram: "DR0QwBGEfxK", thumbnail: "/capas-ig/DR0QwBGEfxK.webp", titulo: "#RoxoPorFrooty", engajamento: 93 },
    { brand: "Frooty", nicho: "food", instagram: "DRrg9RUkWB8", thumbnail: "/capas-ig/DRrg9RUkWB8.webp", titulo: "Açaí no seu ritmo", engajamento: 97 },
    { brand: "Frooty", nicho: "food", instagram: "DRiMzoBET65", thumbnail: "/capas-ig/DRiMzoBET65.webp", titulo: "Campanha", engajamento: 254 },
    { brand: "Frooty", nicho: "food", instagram: "DPMpsJkCV4j", thumbnail: "/capas-ig/DPMpsJkCV4j.webp", titulo: "Super Cremoso", engajamento: 77 },
    { brand: "Frooty", nicho: "food", instagram: "DPXFbq4kavM", thumbnail: "/capas-ig/DPXFbq4kavM.webp", titulo: "Super Cremoso", engajamento: 62 },
    // Sofá na Caixa (Instagram, set/out 2026)
    { brand: "Sofá na Caixa", nicho: "casa", instagram: "DUYTg6RAnhB", thumbnail: "/capas-ig/DUYTg6RAnhB.webp", titulo: "Sofá modular", engajamento: 23 },
    { brand: "Sofá na Caixa", nicho: "casa", instagram: "DUTyzAsjb75", thumbnail: "/capas-ig/DUTyzAsjb75.webp", titulo: "Modular na rotina", engajamento: 30 },
    { brand: "Sofá na Caixa", nicho: "casa", instagram: "DRAwgoyjzLz", thumbnail: "/capas-ig/DRAwgoyjzLz.webp", titulo: "Por dentro da fábrica", engajamento: 0 },
    // OLX (Instagram, 2025/2026)
    { brand: "OLX", nicho: "tech", instagram: "DPy_nAwDbxO", thumbnail: "/capas-ig/DPy_nAwDbxO.webp", titulo: "Review Kawasaki Z750", engajamento: 58 },
    { brand: "OLX", nicho: "tech", instagram: "DP1nqeuD4mF", thumbnail: "/capas-ig/DP1nqeuD4mF.webp", titulo: "Review Kawasaki Z900", engajamento: 77 },
    { brand: "OLX", nicho: "tech", instagram: "DOZM18bj5kA", thumbnail: "/capas-ig/DOZM18bj5kA.webp", titulo: "15 anos · cupons de aniversário", engajamento: 135 },
    { brand: "OLX", nicho: "tech", instagram: "DNWCcthRGYA", thumbnail: "/capas-ig/DNWCcthRGYA.webp", titulo: "AntiGolpe · papo fora do app", engajamento: 75 },
    { brand: "OLX", nicho: "tech", instagram: "DM-0qNsvdrg", thumbnail: "/capas-ig/DM-0qNsvdrg.webp", titulo: "Financiamento de moto no app", externo: true, engajamento: 0 },
    { brand: "OLX", nicho: "tech", instagram: "DLsilMggZY5", thumbnail: "/capas-ig/DLsilMggZY5.webp", titulo: "Taxa de liberação? Aqui não", engajamento: 175 },
    { brand: "OLX", nicho: "tech", instagram: "DKhtWaoi2sq", thumbnail: "/capas-ig/DKhtWaoi2sq.webp", titulo: "A realidade de morar sozinho", engajamento: 49 },
    { brand: "OLX", nicho: "tech", instagram: "DKscQ9IAuLU", thumbnail: "/capas-ig/DKscQ9IAuLU.webp", titulo: "Desapegados do mês", engajamento: 67 },
    { brand: "OLX", nicho: "tech", instagram: "DKc6At1PtC8", thumbnail: "/capas-ig/DKc6At1PtC8.webp", titulo: "Vale a pena carro híbrido?", engajamento: 60 },
    { brand: "OLX", nicho: "tech", instagram: "DJ5ES3Xub8x", thumbnail: "/capas-ig/DJ5ES3Xub8x.webp", titulo: "Manutenção preventiva", engajamento: 52 },
    { brand: "OLX", nicho: "tech", instagram: "DJSAogQvEAz", thumbnail: "/capas-ig/DJSAogQvEAz.webp", titulo: "Dia das Mães · desapega", engajamento: 85 },
    { brand: "OLX", nicho: "tech", instagram: "DHmLuhpNWQt", thumbnail: "/capas-ig/DHmLuhpNWQt.webp", titulo: "A amiga que compra tudo na OLX", engajamento: 112 },
    // ZAP Imóveis (Instagram, 2025/2026)
    { brand: "Zap Imóveis", nicho: "casa", instagram: "DRQCBemkVEK", thumbnail: "/capas-ig/DRQCBemkVEK.webp", titulo: "Festival da Mudança · Black Friday", engajamento: 46 },
    { brand: "Zap Imóveis", nicho: "casa", instagram: "DQmrUK6lI34", thumbnail: "/capas-ig/DQmrUK6lI34.webp", titulo: "Guia de bairros · Liberdade", engajamento: 55 },
    { brand: "Zap Imóveis", nicho: "casa", instagram: "DP4PU94jLpu", thumbnail: "/capas-ig/DP4PU94jLpu.webp", titulo: "Guia de bairros · Barra Funda", engajamento: 44 },
    { brand: "Zap Imóveis", nicho: "casa", instagram: "DPMpWcFAjhJ", thumbnail: "/capas-ig/DPMpWcFAjhJ.webp", titulo: "Top 5 cozinhas dos sonhos", engajamento: 54 },
    { brand: "Zap Imóveis", nicho: "casa", instagram: "DOWzhaCjJP5", thumbnail: "/capas-ig/DOWzhaCjJP5.webp", titulo: "Vantagens de morar em casa grande", engajamento: 54 },
    { brand: "Zap Imóveis", nicho: "casa", instagram: "DLlFk99pWvL", thumbnail: "/capas-ig/DLlFk99pWvL.webp", titulo: "Festival da Mudança", engajamento: 63 },
    { brand: "Zap Imóveis", nicho: "casa", instagram: "DIcBndMP5DC", thumbnail: "/capas-ig/DIcBndMP5DC.webp", titulo: "POV: a amiga exigente", engajamento: 274 },
    { brand: "Zap Imóveis", nicho: "casa", instagram: "DIRTQ5YNag4", thumbnail: "/capas-ig/DIRTQ5YNag4.webp", titulo: "Tentando achar o apê dos sonhos", engajamento: 73 },
    // Brinox (Instagram, 2026)
    { brand: "Brinox", nicho: "casa", instagram: "DUY_qQwAmRW", thumbnail: "/capas-ig/DUY_qQwAmRW.webp", titulo: "5 motivos · Ceramiclife Loft", engajamento: 609 },
    { brand: "Brinox", nicho: "casa", instagram: "DUDyLcVjbUH", thumbnail: "/capas-ig/DUDyLcVjbUH.webp", titulo: "Primeiro jogo de panelas", engajamento: 285 },
    { brand: "Brinox", nicho: "casa", instagram: "DTgWK53ErIb", thumbnail: "/capas-ig/DTgWK53ErIb.webp", titulo: "Panela que não gruda", engajamento: 315 },
    { brand: "Brinox", nicho: "casa", instagram: "DWM8J0yjyLA", thumbnail: "/capas-ig/DWM8J0yjyLA.webp", titulo: "Ceramiclife Loft · casa dos sonhos", engajamento: 398 },
    // Copacol (Instagram, 2025/2026)
    { brand: "Copacol", nicho: "gastronomia", instagram: "DUY_yYNCKRx", thumbnail: "/capas-ig/DUY_yYNCKRx.webp", titulo: "Salada com frango desfiado", engajamento: 110 },
    { brand: "Copacol", nicho: "gastronomia", instagram: "DLlHPbNNuC4", thumbnail: "/capas-ig/DLlHPbNNuC4.webp", titulo: "Ajudinha na cozinha", engajamento: 41 },
    { brand: "Copacol", nicho: "gastronomia", instagram: "DLnlWIDyK_S", thumbnail: "/capas-ig/DLnlWIDyK_S.webp", titulo: "Filé de tilápia · 3 receitas", engajamento: 67 },
    { brand: "Copacol", nicho: "gastronomia", instagram: "DJSUfuZPuZh", thumbnail: "/capas-ig/DJSUfuZPuZh.webp", titulo: "Patê de tilápia", engajamento: 136 },
    { brand: "Copacol", nicho: "gastronomia", instagram: "DIR8uSzPDE5", thumbnail: "/capas-ig/DIR8uSzPDE5.webp", titulo: "Peixe que não gruda na grelha", engajamento: 208 },
    // Magalu (Instagram, influenciadoras diferentes, campanha Liquidação da Metade do Ano)
    { brand: "Magalu", nicho: "casa", instagram: "DLar1CxO9dY", thumbnail: "/capas-ig/DLar1CxO9dY.webp", titulo: "Liquidação da Metade · papelaria", engajamento: 0 },
    { brand: "Magalu", nicho: "casa", instagram: "DLaQPpTOuQ-", thumbnail: "/capas-ig/DLaQPpTOuQ-.webp", titulo: "Liquidação da Metade", engajamento: 274 },
    { brand: "Magalu", nicho: "casa", instagram: "DLbE5YXp7nn", thumbnail: "/capas-ig/DLbE5YXp7nn.webp", titulo: "Item que ficou no carrinho", engajamento: 0 },
    { brand: "Magalu", nicho: "casa", instagram: "DLcyqYpRd8a", thumbnail: "/capas-ig/DLcyqYpRd8a.webp", titulo: "Comprar com desconto", engajamento: 0 },
    { brand: "Magalu", nicho: "casa", instagram: "DLc8UBLxW2D", thumbnail: "/capas-ig/DLc8UBLxW2D.webp", titulo: "Liquidação da Metade do Ano", engajamento: 118 },
    // YouTube (já estavam na página de gestão)
    { brand: "Sebastian", nicho: "beleza", youtubeId: "i62BOlzvQlo", engajamento: 2 },
    { brand: "OLX", nicho: "tech", youtubeId: "ukZSk1h_Y2Q", engajamento: 1919 },
    { brand: "Frooty", nicho: "food", youtubeId: "9WjJTAbJsms", engajamento: 1 },
    { brand: "Zap Imóveis", nicho: "casa", youtubeId: "3qKBJccHlg8", engajamento: 411 },
    { brand: "Brinox", nicho: "casa", youtubeId: "H5nVICmwGog", engajamento: 0 },
    { brand: "Wella", nicho: "beleza", youtubeId: "15nOoGJ872g", engajamento: 2 },
    { brand: "Trisanti", nicho: "gastronomia", youtubeId: "fDjZz6kMjMY", engajamento: 3 },
    { brand: "Rap10", nicho: "gastronomia", youtubeId: "sb9PHTUVBvc", engajamento: 0 },
    { brand: "Neutrogena", nicho: "beleza", youtubeId: "ATz4wOA_mAc", engajamento: 0 },
    { brand: "Automotivo", nicho: "tech", youtubeId: "ZnoQzWTTSHM", engajamento: 0 },
    { brand: "OLX", nicho: "tech", youtubeId: "_76b4s5tOZQ", engajamento: 988 },
    { brand: "Frooty", nicho: "food", youtubeId: "ij5dOFY29ZI", engajamento: 0 },
    { brand: "Zap Imóveis", nicho: "casa", youtubeId: "pqUrs6-l8Lg", engajamento: 2302 },
    { brand: "Brinox", nicho: "casa", youtubeId: "XhDRsx2Q2MM", engajamento: 0 },
    { brand: "Trisanti", nicho: "gastronomia", youtubeId: "SNAvEW9DO7M", engajamento: 1 },
    { brand: "Rap10", nicho: "gastronomia", youtubeId: "lvxaMi4GaVc", engajamento: 0 },
    { brand: "OLX", nicho: "tech", youtubeId: "Dc9D0nj7n3U", engajamento: 1980 },
    { brand: "Zap Imóveis", nicho: "casa", youtubeId: "q4RDtGGGcDc", engajamento: 926 },
    { brand: "OLX", nicho: "tech", youtubeId: "bg-wyhCzVkQ", engajamento: 0 },
    { brand: "Zap Imóveis", nicho: "casa", youtubeId: "8y0eXGsfHv4", engajamento: 1 },
  ] as AgVideo[],
  // marcas com 3+ vídeos ganham fileira própria; o resto vai em "Mais marcas"
  minimoFileira: 3,
  // marcas do mesmo segmento que dividem uma única fileira (pedido da Lara: Sofá na
  // Caixa e Little Duck são as duas de móveis infantis/sofá, ficam juntas)
  grupoFileira: { "Sofá na Caixa": "Sofá na Caixa & Little Duck", "Little Duck": "Sofá na Caixa & Little Duck" } as Record<string, string>,
};

export const AG_MODALIDADES = {
  titulo: "Três formas de trabalhar. Você escolhe.",
  sub: "Pacote mensal, campanha pontual ou consultoria. Todas com contrato e escopo claro.",
  cards: [
    { nome: "Pacote mensal recorrente", tag: "mais escolhido", pitch: "Operação contínua pra quem já roda UGC com volume.", bullets: ["Volume mensal definido", "Entrega recorrente, sempre com creators novos no banco", "Briefing, roteiro, produção e revisão inclusos", "Suporte direto durante o mês inteiro"], ideal: "Marcas que já validaram UGC e querem escalar com previsibilidade.", cta: "Quero o plano mensal" },
    { nome: "Campanha pontual", pitch: "Campanha com começo, meio e fim, escopo fechado.", bullets: ["Sempre a partir de 15 criativos", "Lançamento, ativação sazonal ou teste pontual", "Briefing, roteiro, produção e revisão", "Entrega em prazo definido"], ideal: "Marcas que querem testar UGC com qualidade ou têm necessidade pontual em datas específicas.", cta: "Quero uma campanha pontual" },
    { nome: "Consultoria estratégica", pitch: "Estrutura pro seu time aplicar, sem terceirizar a execução.", bullets: ["Diagnóstico do que já é feito hoje", "Processos de gestão de UGC pro seu time", "Briefing modelo + framework de seleção", "Acompanhamento de implementação"], ideal: "Marcas com operação interna que querem profissionalizar o que já fazem.", cta: "Quero a consultoria" },
  ],
};

export const AG_PROCESSO = {
  titulo: "Cinco etapas. Sem mistério, sem milagre.",
  sub: "Esse é o processo que rodei em mais de 100 campanhas. Cada etapa existe porque, sem ela, alguma coisa quebra.",
  etapas: [
    { n: "01", t: "Diagnóstico", d: "Antes de qualquer proposta, conversa de diagnóstico. Eu preciso entender seu produto, seu público, o que você já tentou e onde está hoje. Sem isso, qualquer proposta é chute." },
    { n: "02", t: "Estratégia e seleção", d: "Definimos juntos o objetivo da campanha, os ângulos que vamos testar e o perfil de creator ideal. A partir daí, eu seleciono os creators dentro do meu banco e te apresento já filtrados." },
    { n: "03", t: "Briefing e roteiro", d: "Briefing co-criado, roteiro revisado por mim antes da gravação. Cada creator recebe direção clara, não margem pra interpretação." },
    { n: "04", t: "Produção e acompanhamento", d: "Os creators gravam, eu acompanho. Quando chega ajuste, é antes de você ver. Quando chega entrega na sua mão, já passou por filtro." },
    { n: "05", t: "Entrega e leitura", d: "Material entregue dentro do prazo combinado. Ao final, leitura do que funcionou e plano pro próximo ciclo." },
  ],
};

export type AgMarca = { name: string; domain: string };

export const AG_MARCAS = {
  titulo: "Marcas que já passaram pela operação",
  sub: "Mais de 200 marcas atendidas em campanhas com várias creators. Algumas delas:",
  // domain = pra puxar a logo via unavatar.io (logo.clearbit.com não respondeu nos testes)
  lista: [
    { name: "OLX", domain: "olx.com.br" },
    { name: "ZAP Imóveis", domain: "zapimoveis.com.br" },
    { name: "Magalu", domain: "magazineluiza.com.br" },
    { name: "Méliuz", domain: "meliuz.com.br" },
    { name: "Porto Seguro", domain: "portoseguro.com.br" },
    { name: "Chilli Beans", domain: "chillibeans.com.br" },
    { name: "Bonduelle", domain: "bonduelle.com.br" },
    { name: "Bauducco", domain: "bauducco.com.br" },
    { name: "Granado", domain: "granado.com.br" },
    { name: "Lancôme", domain: "lancome.com.br" },
    { name: "Carolina Herrera", domain: "carolinaherrera.com" },
    { name: "Calvin Klein", domain: "calvinklein.com.br" },
    { name: "Jägermeister", domain: "jagermeister.com" },
    { name: "Brinox", domain: "brinox.com.br" },
    { name: "Wella", domain: "wella.com" },
    { name: "Trisanti", domain: "trisanti.com.br" },
    { name: "Rap10", domain: "rap10.com.br" },
    { name: "Neutrogena", domain: "neutrogena.com.br" },
    { name: "Frooty", domain: "frooty.com.br" },
    { name: "Sebastian", domain: "sebastianprofessional.com" },
    { name: "Coza", domain: "coza.com.br" },
    { name: "Sofá na Caixa", domain: "sofanacaixa.com.br" },
    { name: "Little Duck", domain: "littleduck.com.br" },
    { name: "Copacol", domain: "copacol.com.br" },
  ] as AgMarca[],
};

export const AG_SOBRE = {
  k: "Quem opera a campanha",
  fotos: [
    { src: "/ensaio/publi-notebook.webp", alt: "Lara Dam com celular e notebook no estúdio", posicao: "center 25%" },
    { src: "/ensaio/ugc-tripe.webp", alt: "Lara Dam no estúdio com tripé e caixas", posicao: "center 30%" },
    { src: "/ensaio/sobre-caixas.webp", alt: "Lara Dam sentada entre caixas com o notebook", posicao: "center 80%" },
  ],
  titulo: "Eu sou a Lara Dam",
  p1: "Fui uma das primeiras pessoas no Brasil a falar publicamente sobre gestão de campanhas UGC. Não porque planejei. Porque já estava fazendo: organizando creator, escrevendo briefing, revisando roteiro, cobrando prazo e entregando campanha que funcionava.",
  p2: "Em mais de 100 campanhas, com marcas como OLX, ZAP Imóveis, Magalu, Porto Seguro e Chilli Beans, uma coisa ficou clara: o que separa campanha boa de campanha que dá errado não é talento isolado de creator. É processo. Eu não acredito em fórmula mágica. Acredito em fazer o básico bem feito.",
  pills: ["De creator pra creator", "+100 campanhas", "+2.000 creators em rede"],
  fichaTitulo: "Como funciona uma campanha comigo",
  ficha: [
    { k: "Diagnóstico", v: "Gratuito, antes de qualquer proposta" },
    { k: "Resposta", v: "Em até 24h" },
    { k: "Campanha pontual", v: "A partir de 15 creators, 3 a 4 semanas" },
    { k: "Contrato", v: "Tudo formalizado, sem surpresa" },
  ],
};

export const AG_FAQ = {
  titulo: "Perguntas que recebo com frequência",
  sub: "Se a sua não estiver aqui, me chama.",
  itens: [
    { q: "O que é UGC e por que minha marca precisa disso?", a: "UGC é conteúdo produzido por pessoas reais, com cara de pessoa real. Funciona porque audiência confia em pessoa, não em propaganda. Se sua marca roda mídia paga, redes sociais ou quer presença digital constante, UGC é o formato que mais retém atenção e gera conversão hoje." },
    { q: "Como vocês selecionam os creators?", a: "A partir de um banco com mais de 2 mil perfis ativos, filtramos por nicho, perfil de audiência, estilo de entrega e histórico. Você recebe creators pré-aprovados que fazem sentido pra sua marca, não uma lista genérica." },
    { q: "Quanto tempo leva uma campanha do início à entrega?", a: "Depende do escopo, mas pra te dar uma referência: campanha pontual com 15 creators leva entre 3 e 4 semanas. Pacote mensal entrega volume contínuo a partir do primeiro mês." },
    { q: "Vocês fazem só o vídeo ou cuidam da estratégia?", a: "Cuidamos da estratégia também. Pra mim, vídeo solto sem direção é onde a maioria das marcas perde dinheiro. Briefing, roteiro e ângulo criativo são parte do que entrego." },
    { q: "Preciso enviar briefing pronto?", a: "Não. Briefing é construído junto com você. Eu pergunto o que precisa ser perguntado pra ter direção clara, e te entrego o briefing finalizado pra você aprovar antes de qualquer creator começar." },
    { q: "Os vídeos são pra orgânico ou pra mídia paga?", a: "Os dois. Eu adapto o formato e o ângulo dependendo de onde você vai usar. Vídeo pra orgânico tem lógica diferente de vídeo pra ads, e isso entra no planejamento." },
    { q: "E se uma entrega não vier do jeito que esperávamos?", a: "Antes de chegar em você, eu já revisei. Se ainda assim algo precisa ajustar, ajustamos sem custo adicional dentro do escopo combinado. Faz parte do processo." },
    { q: "Vocês garantem resultado em vendas ou ROAS?", a: "Não garanto venda nem ROAS, e quem garante isso na primeira campanha está te enganando. O que garanto é entrega bem feita, conteúdo com lógica e processo claro. Resultado de venda depende da sua oferta, do seu funil e do seu produto. UGC bem feito é peça do quebra-cabeça, não o quebra-cabeça inteiro." },
    { q: "Como funciona a cobrança?", a: "Pacote mensal: contrato com valor fixo mensal, definido conforme volume. Campanha pontual: orçamento fechado, pago em parcelas conforme escopo. Consultoria: valor definido após diagnóstico. Tudo formalizado em contrato. Sem surpresa." },
    { q: "Como começo?", a: "Me chama no WhatsApp ou preenche o formulário abaixo, agendamos uma conversa de diagnóstico, e a partir dali eu monto proposta sob medida pra sua marca. Conversa não tem custo." },
  ],
};

export const AG_CONTATO = {
  titulo: "Vamos conversar sobre sua campanha?",
  sub: "Diagnóstico gratuito antes de qualquer proposta. Resposta em até 24h.",
  nota: "ou me chama direto ↓",
  opcoes: {
    roles: ["Marketing", "Growth / Performance", "Founder / C-level", "Social Media", "Outro"],
    modalities: ["Pacote mensal recorrente", "Campanha pontual", "Consultoria estratégica", "Não sei ainda, quero diagnóstico"],
    goals: ["Conteúdo pra mídia paga", "Always-on no TikTok/Instagram", "Lançamento de campanha", "Presença digital da marca"],
    budgets: ["Até R$ 5.000", "R$ 5.000 a R$ 15.000", "R$ 15.000 a R$ 50.000", "+R$ 50.000", "A definir"],
  },
  enviado: "Recebido! 🚀 Entro em contato em até 24h.",
  erro: "Deu erro. Tenta de novo ou me chama no WhatsApp.",
};
