// Página /agencia: gestão de campanhas UGC (conteúdo portado da página /gestao).
import { PERFIL } from "./perfil";

export const AG_WHATSAPP = "https://wa.me/5512988729264?text=" + encodeURIComponent("Oi Lara! Quero conversar sobre uma campanha UGC com várias creators pra minha marca.");

export const AG_NAV = [
  { id: "comparar", rotulo: "Comparar" },
  { id: "modalidades", rotulo: "Modalidades" },
  { id: "processo", rotulo: "Processo" },
  { id: "conteudos", rotulo: "Cases" },
  { id: "sobre", rotulo: "Sobre" },
  { id: "duvidas", rotulo: "Dúvidas" },
  { id: "contato", rotulo: "Contato" },
];

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
      "Casting pré-aprovado de +1.200 creators em rede",
      "Briefing co-criado e roteiro revisado antes de gravar",
      "Gravação acompanhada, revisão antes de chegar em você",
      "Entrega no prazo, com direitos de uso em contrato",
      "Relatório: o que performou e o próximo ciclo",
    ],
  },
  numeros: [
    { b: "+100", t: "campanhas gerenciadas" },
    { b: "+200", t: "marcas atendidas" },
    { b: "+1.200", t: "creators em rede" },
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
    { b: "+1.200", t: "creators em rede" },
  ],
  bioTitulo: "Gestão de campanhas UGC 🤝 do briefing à entrega",
  bio: [
    "🎯 seleção de creators, briefing, roteiro revisado, produção acompanhada",
    "📊 relatório e leitura no fim de cada ciclo",
    "📍 Litoral de SP · atende o Brasil todo",
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

export type AgVideo = { brand: string; nicho: string; youtubeId?: string; instagram?: string; thumbnail?: string; titulo?: string; externo?: boolean };

// Vídeos gerenciados pela agência (outras creators). YouTube = capa automática;
// Instagram = capa local em /public/capas-ig/<código>.webp (o IG não deixa puxar).
export const AG_CONTEUDOS = {
  titulo: "Conteúdos gerenciados pelo nosso time",
  sub: "Campanhas com várias creators, por marca. Desliza pro lado e clica pra assistir.",
  videos: [
    // Coza (Instagram, out/2026)
    { brand: "Coza", nicho: "casa", instagram: "Ddmx8TpR2_c", thumbnail: "/capas-ig/Ddmx8TpR2_c.webp", titulo: "Zip Vácuo · kit hóspede" },
    { brand: "Coza", nicho: "casa", instagram: "DdO1UKmB-AH", thumbnail: "/capas-ig/DdO1UKmB-AH.webp", titulo: "Linha Modo Bambu" },
    { brand: "Coza", nicho: "casa", instagram: "DdCodtuReFZ", thumbnail: "/capas-ig/DdCodtuReFZ.webp", titulo: "Linha Puffer" },
    { brand: "Coza", nicho: "casa", instagram: "DcrzFNpxgT2", thumbnail: "/capas-ig/DcrzFNpxgT2.webp", titulo: "Linha Puffer" },
    { brand: "Coza", nicho: "casa", instagram: "DcejObxR_2a", thumbnail: "/capas-ig/DcejObxR_2a.webp", titulo: "Saco a vácuo na mala" },
    { brand: "Coza", nicho: "casa", instagram: "DcZj-sOx0dm", thumbnail: "/capas-ig/DcZj-sOx0dm.webp", titulo: "Saco Zip Vácuo" },
    { brand: "Coza", nicho: "casa", instagram: "DbRTjSqhSH6", thumbnail: "/capas-ig/DbRTjSqhSH6.webp", titulo: "Linha Dry · geladeira" },
    { brand: "Coza", nicho: "casa", instagram: "DbI8BXWgbXU", thumbnail: "/capas-ig/DbI8BXWgbXU.webp", titulo: "Cesto de lavanderia" },
    // Frooty (Instagram, set/out 2026)
    { brand: "Frooty", nicho: "food", instagram: "DSYQzfmERiN", thumbnail: "/capas-ig/DSYQzfmERiN.webp", titulo: "#RoxosPorFrooty" },
    { brand: "Frooty", nicho: "food", instagram: "DSI1HbikZge", thumbnail: "/capas-ig/DSI1HbikZge.webp", titulo: "Pós-corrida" },
    { brand: "Frooty", nicho: "food", instagram: "DSBG8z5kbxf", thumbnail: "/capas-ig/DSBG8z5kbxf.webp", titulo: "Na rotina" },
    { brand: "Frooty", nicho: "food", instagram: "DR0QwBGEfxK", thumbnail: "/capas-ig/DR0QwBGEfxK.webp", titulo: "#RoxoPorFrooty" },
    { brand: "Frooty", nicho: "food", instagram: "DRrg9RUkWB8", thumbnail: "/capas-ig/DRrg9RUkWB8.webp", titulo: "Açaí no seu ritmo" },
    { brand: "Frooty", nicho: "food", instagram: "DRiMzoBET65", thumbnail: "/capas-ig/DRiMzoBET65.webp", titulo: "Campanha" },
    { brand: "Frooty", nicho: "food", instagram: "DPMpsJkCV4j", thumbnail: "/capas-ig/DPMpsJkCV4j.webp", titulo: "Super Cremoso" },
    { brand: "Frooty", nicho: "food", instagram: "DPXFbq4kavM", thumbnail: "/capas-ig/DPXFbq4kavM.webp", titulo: "Super Cremoso" },
    // Sofá na Caixa (Instagram, set/out 2026)
    { brand: "Sofá na Caixa", nicho: "casa", instagram: "DUYTg6RAnhB", thumbnail: "/capas-ig/DUYTg6RAnhB.webp", titulo: "Sofá modular" },
    { brand: "Sofá na Caixa", nicho: "casa", instagram: "DUTyzAsjb75", thumbnail: "/capas-ig/DUTyzAsjb75.webp", titulo: "Modular na rotina" },
    { brand: "Sofá na Caixa", nicho: "casa", instagram: "DRAwgoyjzLz", thumbnail: "/capas-ig/DRAwgoyjzLz.webp", titulo: "Por dentro da fábrica" },
    // OLX (Instagram, 2025/2026)
    { brand: "OLX", nicho: "tech", instagram: "DPy_nAwDbxO", thumbnail: "/capas-ig/DPy_nAwDbxO.webp", titulo: "Review Kawasaki Z750" },
    { brand: "OLX", nicho: "tech", instagram: "DP1nqeuD4mF", thumbnail: "/capas-ig/DP1nqeuD4mF.webp", titulo: "Review Kawasaki Z900" },
    { brand: "OLX", nicho: "tech", instagram: "DOZM18bj5kA", thumbnail: "/capas-ig/DOZM18bj5kA.webp", titulo: "15 anos · cupons de aniversário" },
    { brand: "OLX", nicho: "tech", instagram: "DNWCcthRGYA", thumbnail: "/capas-ig/DNWCcthRGYA.webp", titulo: "AntiGolpe · papo fora do app" },
    { brand: "OLX", nicho: "tech", instagram: "DM-0qNsvdrg", thumbnail: "/capas-ig/DM-0qNsvdrg.webp", titulo: "Financiamento de moto no app", externo: true },
    { brand: "OLX", nicho: "tech", instagram: "DLsilMggZY5", thumbnail: "/capas-ig/DLsilMggZY5.webp", titulo: "Taxa de liberação? Aqui não" },
    { brand: "OLX", nicho: "tech", instagram: "DKhtWaoi2sq", thumbnail: "/capas-ig/DKhtWaoi2sq.webp", titulo: "A realidade de morar sozinho" },
    { brand: "OLX", nicho: "tech", instagram: "DKscQ9IAuLU", thumbnail: "/capas-ig/DKscQ9IAuLU.webp", titulo: "Desapegados do mês" },
    { brand: "OLX", nicho: "tech", instagram: "DKc6At1PtC8", thumbnail: "/capas-ig/DKc6At1PtC8.webp", titulo: "Vale a pena carro híbrido?" },
    { brand: "OLX", nicho: "tech", instagram: "DJ5ES3Xub8x", thumbnail: "/capas-ig/DJ5ES3Xub8x.webp", titulo: "Manutenção preventiva" },
    { brand: "OLX", nicho: "tech", instagram: "DJSAogQvEAz", thumbnail: "/capas-ig/DJSAogQvEAz.webp", titulo: "Dia das Mães · desapega" },
    { brand: "OLX", nicho: "tech", instagram: "DHmLuhpNWQt", thumbnail: "/capas-ig/DHmLuhpNWQt.webp", titulo: "A amiga que compra tudo na OLX" },
    // ZAP Imóveis (Instagram, 2025/2026)
    { brand: "Zap Imóveis", nicho: "casa", instagram: "DRQCBemkVEK", thumbnail: "/capas-ig/DRQCBemkVEK.webp", titulo: "Festival da Mudança · Black Friday" },
    { brand: "Zap Imóveis", nicho: "casa", instagram: "DQmrUK6lI34", thumbnail: "/capas-ig/DQmrUK6lI34.webp", titulo: "Guia de bairros · Liberdade" },
    { brand: "Zap Imóveis", nicho: "casa", instagram: "DP4PU94jLpu", thumbnail: "/capas-ig/DP4PU94jLpu.webp", titulo: "Guia de bairros · Barra Funda" },
    { brand: "Zap Imóveis", nicho: "casa", instagram: "DPMpWcFAjhJ", thumbnail: "/capas-ig/DPMpWcFAjhJ.webp", titulo: "Top 5 cozinhas dos sonhos" },
    { brand: "Zap Imóveis", nicho: "casa", instagram: "DOWzhaCjJP5", thumbnail: "/capas-ig/DOWzhaCjJP5.webp", titulo: "Vantagens de morar em casa grande" },
    { brand: "Zap Imóveis", nicho: "casa", instagram: "DLlFk99pWvL", thumbnail: "/capas-ig/DLlFk99pWvL.webp", titulo: "Festival da Mudança" },
    { brand: "Zap Imóveis", nicho: "casa", instagram: "DIcBndMP5DC", thumbnail: "/capas-ig/DIcBndMP5DC.webp", titulo: "POV: a amiga exigente" },
    { brand: "Zap Imóveis", nicho: "casa", instagram: "DIRTQ5YNag4", thumbnail: "/capas-ig/DIRTQ5YNag4.webp", titulo: "Tentando achar o apê dos sonhos" },
    // Brinox (Instagram, 2026)
    { brand: "Brinox", nicho: "casa", instagram: "DUY_qQwAmRW", thumbnail: "/capas-ig/DUY_qQwAmRW.webp", titulo: "5 motivos · Ceramiclife Loft" },
    { brand: "Brinox", nicho: "casa", instagram: "DUDyLcVjbUH", thumbnail: "/capas-ig/DUDyLcVjbUH.webp", titulo: "Primeiro jogo de panelas" },
    { brand: "Brinox", nicho: "casa", instagram: "DTgWK53ErIb", thumbnail: "/capas-ig/DTgWK53ErIb.webp", titulo: "Panela que não gruda" },
    { brand: "Brinox", nicho: "casa", instagram: "DWM8J0yjyLA", thumbnail: "/capas-ig/DWM8J0yjyLA.webp", titulo: "Ceramiclife Loft · casa dos sonhos" },
    // Copacol (Instagram, 2025/2026)
    { brand: "Copacol", nicho: "gastronomia", instagram: "DUY_yYNCKRx", thumbnail: "/capas-ig/DUY_yYNCKRx.webp", titulo: "Salada com frango desfiado" },
    { brand: "Copacol", nicho: "gastronomia", instagram: "DLlHPbNNuC4", thumbnail: "/capas-ig/DLlHPbNNuC4.webp", titulo: "Ajudinha na cozinha" },
    { brand: "Copacol", nicho: "gastronomia", instagram: "DLnlWIDyK_S", thumbnail: "/capas-ig/DLnlWIDyK_S.webp", titulo: "Filé de tilápia · 3 receitas" },
    { brand: "Copacol", nicho: "gastronomia", instagram: "DJSUfuZPuZh", thumbnail: "/capas-ig/DJSUfuZPuZh.webp", titulo: "Patê de tilápia" },
    { brand: "Copacol", nicho: "gastronomia", instagram: "DIR8uSzPDE5", thumbnail: "/capas-ig/DIR8uSzPDE5.webp", titulo: "Peixe que não gruda na grelha" },
    // Little Duck (Instagram, 2026)
    { brand: "Little Duck", nicho: "casa", instagram: "DUjAJxnjdZe", thumbnail: "/capas-ig/DUjAJxnjdZe.webp", titulo: "Sofá de brincar · vale a pena?" },
    { brand: "Little Duck", nicho: "casa", instagram: "DSXnRGlDQSH", thumbnail: "/capas-ig/DSXnRGlDQSH.webp", titulo: "Conheça a fábrica" },
    // YouTube (já estavam na página de gestão)
    { brand: "Sebastian", nicho: "beleza", youtubeId: "i62BOlzvQlo" },
    { brand: "OLX", nicho: "tech", youtubeId: "ukZSk1h_Y2Q" },
    { brand: "Frooty", nicho: "food", youtubeId: "9WjJTAbJsms" },
    { brand: "Zap Imóveis", nicho: "casa", youtubeId: "3qKBJccHlg8" },
    { brand: "Brinox", nicho: "casa", youtubeId: "H5nVICmwGog" },
    { brand: "Wella", nicho: "beleza", youtubeId: "15nOoGJ872g" },
    { brand: "Trisanti", nicho: "gastronomia", youtubeId: "fDjZz6kMjMY" },
    { brand: "Rap10", nicho: "gastronomia", youtubeId: "sb9PHTUVBvc" },
    { brand: "Neutrogena", nicho: "beleza", youtubeId: "ATz4wOA_mAc" },
    { brand: "Automotivo", nicho: "tech", youtubeId: "ZnoQzWTTSHM" },
    { brand: "OLX", nicho: "tech", youtubeId: "_76b4s5tOZQ" },
    { brand: "Frooty", nicho: "food", youtubeId: "ij5dOFY29ZI" },
    { brand: "Zap Imóveis", nicho: "casa", youtubeId: "pqUrs6-l8Lg" },
    { brand: "Brinox", nicho: "casa", youtubeId: "XhDRsx2Q2MM" },
    { brand: "Trisanti", nicho: "gastronomia", youtubeId: "SNAvEW9DO7M" },
    { brand: "Rap10", nicho: "gastronomia", youtubeId: "lvxaMi4GaVc" },
    { brand: "OLX", nicho: "tech", youtubeId: "Dc9D0nj7n3U" },
    { brand: "Zap Imóveis", nicho: "casa", youtubeId: "q4RDtGGGcDc" },
    { brand: "OLX", nicho: "tech", youtubeId: "bg-wyhCzVkQ" },
    { brand: "Zap Imóveis", nicho: "casa", youtubeId: "8y0eXGsfHv4" },
  ] as AgVideo[],
  // marcas com 3+ vídeos ganham fileira própria; o resto vai em "Mais marcas"
  minimoFileira: 3,
};

export const AG_MODALIDADES = {
  titulo: "Três formas de trabalhar. Você escolhe.",
  sub: "Pacote mensal, campanha pontual ou consultoria. Todas com contrato e escopo claro.",
  cards: [
    { nome: "Pacote mensal recorrente", tag: "mais escolhido", pitch: "Operação contínua pra quem já roda UGC com volume.", bullets: ["Volume mensal definido", "Entrega recorrente, sempre com creators novos no banco", "Briefing, roteiro, produção e revisão inclusos", "Suporte direto durante o mês inteiro"], ideal: "Marcas que já validaram UGC e querem escalar com previsibilidade.", cta: "Quero o plano mensal" },
    { nome: "Campanha pontual", pitch: "Campanha com começo, meio e fim, escopo fechado.", bullets: ["Lançamento, ativação sazonal ou teste pontual", "Escopo fechado de creators e entregas", "Briefing, roteiro, produção e revisão", "Entrega em prazo definido"], ideal: "Marcas que querem testar UGC com qualidade ou têm necessidade pontual em datas específicas.", cta: "Quero uma campanha pontual" },
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

export const AG_MARCAS = {
  titulo: "Marcas que já passaram pela operação",
  sub: "Mais de 200 marcas atendidas em campanhas com várias creators. Algumas delas:",
  nomes: ["OLX", "ZAP Imóveis", "Magalu", "Méliuz", "Porto Seguro", "Chilli Beans", "Bonduelle", "Bauducco", "Granado", "Lancôme", "Carolina Herrera", "Calvin Klein", "Jägermeister", "Brinox", "Wella", "Trisanti", "Rap10", "Neutrogena", "Frooty", "Sebastian"],
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
  pills: ["De creator pra creator", "+100 campanhas", "+1.200 creators em rede", "Litoral de SP"],
  fichaTitulo: "Como funciona uma campanha comigo",
  ficha: [
    { k: "Diagnóstico", v: "Gratuito, antes de qualquer proposta" },
    { k: "Resposta", v: "Em até 24h" },
    { k: "Campanha pontual", v: "3 a 5 creators em 3 a 5 semanas" },
    { k: "Contrato", v: "Tudo formalizado, sem surpresa" },
  ],
};

export const AG_FAQ = {
  titulo: "Perguntas que recebo com frequência",
  sub: "Se a sua não estiver aqui, me chama.",
  itens: [
    { q: "O que é UGC e por que minha marca precisa disso?", a: "UGC é conteúdo produzido por pessoas reais, com cara de pessoa real. Funciona porque audiência confia em pessoa, não em propaganda. Se sua marca roda mídia paga, redes sociais ou quer presença digital constante, UGC é o formato que mais retém atenção e gera conversão hoje." },
    { q: "Como vocês selecionam os creators?", a: "A partir de um banco com mais de 1.200 perfis ativos, filtramos por nicho, perfil de audiência, estilo de entrega e histórico. Você recebe creators pré-aprovados que fazem sentido pra sua marca, não uma lista genérica." },
    { q: "Quanto tempo leva uma campanha do início à entrega?", a: "Depende do escopo, mas pra te dar uma referência: campanha pontual com 3 a 5 creators leva entre 3 e 5 semanas. Pacote mensal entrega volume contínuo a partir do primeiro mês." },
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
