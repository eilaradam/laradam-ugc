// Página /agencia: gestão de campanhas UGC (conteúdo portado da página /gestao).
import { PERFIL } from "./perfil";

export const AG_WHATSAPP = "https://wa.me/5512988729264?text=" + encodeURIComponent("Oi Lara! Quero conversar sobre uma campanha UGC com várias creators pra minha marca.");

export const AG_NAV = [
  { id: "comparar", rotulo: "Comparar" },
  { id: "modalidades", rotulo: "Modalidades" },
  { id: "processo", rotulo: "Processo" },
  { id: "conteudos", rotulo: "Cases" },
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

export const AG_CONTEUDOS = {
  titulo: "Conteúdos gerenciados pelo nosso time",
  sub: "Conheça algumas creators que poderão criar para a sua marca. Desliza pro lado e clica pra assistir.",
  videos: [
    { youtubeId: "i62BOlzvQlo", brand: "Sebastian" },
    { youtubeId: "ukZSk1h_Y2Q", brand: "OLX" },
    { youtubeId: "9WjJTAbJsms", brand: "Frooty" },
    { youtubeId: "3qKBJccHlg8", brand: "Zap Imóveis" },
    { youtubeId: "H5nVICmwGog", brand: "Brinox" },
    { youtubeId: "15nOoGJ872g", brand: "Wella" },
    { youtubeId: "fDjZz6kMjMY", brand: "Trisanti" },
    { youtubeId: "sb9PHTUVBvc", brand: "Rap10" },
    { youtubeId: "ATz4wOA_mAc", brand: "Neutrogena" },
    { youtubeId: "ZnoQzWTTSHM", brand: "Automotivo" },
    { youtubeId: "_76b4s5tOZQ", brand: "OLX" },
    { youtubeId: "ij5dOFY29ZI", brand: "Frooty" },
    { youtubeId: "pqUrs6-l8Lg", brand: "Zap Imóveis" },
    { youtubeId: "XhDRsx2Q2MM", brand: "Brinox" },
    { youtubeId: "SNAvEW9DO7M", brand: "Trisanti" },
    { youtubeId: "lvxaMi4GaVc", brand: "Rap10" },
    { youtubeId: "Dc9D0nj7n3U", brand: "OLX" },
    { youtubeId: "q4RDtGGGcDc", brand: "Zap Imóveis" },
    { youtubeId: "bg-wyhCzVkQ", brand: "OLX" },
    { youtubeId: "8y0eXGsfHv4", brand: "Zap Imóveis" },
  ],
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
  foto: "/ensaio/publi-notebook.webp",
  fotoAlt: "Lara Dam com celular e notebook no estúdio",
  titulo: "Eu sou a Lara Dam 👋",
  p1: "Fui uma das primeiras pessoas no Brasil a falar publicamente sobre gestão de campanhas UGC. Não porque planejei. Porque já estava fazendo. Antes de existir nome bonito pra isso, eu já organizava creator, escrevia briefing, revisava roteiro, cobrava prazo e entregava campanha que funcionava.",
  p2: "Em mais de 100 campanhas, com marcas como OLX, ZAP Imóveis, Magalu, Porto Seguro e Chilli Beans, uma coisa ficou clara: o que separa campanha boa de campanha que dá errado não é talento isolado de creator. É processo. Eu não acredito em fórmula mágica. Acredito em fazer o básico bem feito.",
  nichosTitulo: "De creator pra creator",
  pills: ["🎬 +100 campanhas", "👥 +1.200 creators em rede", "🤝 +200 marcas", "📍 Litoral de SP"],
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
