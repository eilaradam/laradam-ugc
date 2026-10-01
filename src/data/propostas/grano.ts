// Proposta pra GRANO: campanha UGC gerenciada, 10 criativos, via rede de creators.
// Página: ugc.laradam.com/grano (fora do menu e fora do Google; a Lara manda o link direto).
//
// PRA TROCAR OS VÍDEOS DE REFERÊNCIA: mexa só em `referencias` lá embaixo. Cada
// item pode ser `{ id, porque }` (vídeo do portfólio da Lara em content.ts) ou
// `{ video: {...}, porque }` (vídeo de outra creator da rede, ex. conteúdos da
// /agencia; é o caso aqui: Frooty/Brinox/Coza/Copacol/Trisanti/Rap10 são
// marcas atendidas pela rede, não vídeos da própria Lara).
//
// Reescrita completa de copy em 01/10 (3ª leva). Dois pontos a confirmar com a Lara:
// 1) Pacote Contínuo voltou pra R$4.500/mês nesta leva (a leva anterior tinha fechado
//    R$4.900/mês com uma linha de economia). Mantive o valor desta leva por ser o mais
//    recente, mas o valor mudou pra trás e vale confirmar se foi proposital.
// 2) `pagamento` NÃO veio nesta leva (ela deixou "[forma de pagamento...]" de novo).
//    Mantive o texto já preenchido na leva anterior em vez de voltar pro placeholder.
// 3) `proximoPasso` veio com "[X] dias úteis" sem o número; tirei essa cláusula até
//    ela confirmar o prazo.

import type { Proposta } from "@/components/proposta/Proposta";

export const GRANO: Proposta = {
  slug: "grano",
  eyebrow: "Proposta · Campanha UGC",
  cliente: "Grano",
  titulo: "10 creators, 10 criativos, prontos em 2 semanas.",
  subtitulo:
    "Campanha UGC com gestão completa, do briefing à entrega: 10 vídeos produzidos por creators selecionadas na nossa rede, prontos pra rodar no feed e em anúncios.",
  destaques: [
    { rotulo: "Criativos", valor: "10" },
    { rotulo: "Prazo", valor: "2 semanas" },
    { rotulo: "Creators", valor: "Selecionadas pelo perfil da Grano" },
  ],

  sobre:
    "Selecionamos 10 creators da nossa rede de mais de 2.000 perfis com base no público e no tom da Grano. A partir daí, cuidamos de toda a operação: briefing, roteiro, acompanhamento da gravação e revisão de cada vídeo antes da entrega. A Grano aprova o briefing e recebe os 10 criativos prontos pra publicar e usar em mídia paga.",

  opcoesTitulo: "Investimento",
  opcoes: [
    {
      nome: "Pacote Pontual",
      tipo: "Campanha única",
      valor: "R$ 5.500",
      descricao:
        "10 criativos UGC, cada um com uma creator diferente, sem compromisso de recorrência. Ideal pra testar o formato e descobrir quais ângulos convertem.",
      inclui: [
        "R$ 550 por criativo",
        "Seleção de 10 creators pelo perfil da Grano",
        "Briefing e roteiro revisados antes da gravação",
        "Direito de uso em anúncios",
      ],
    },
    {
      nome: "Pacote Contínuo",
      tipo: "Recorrente",
      valor: "R$ 4.500/mês",
      descricao:
        "10 criativos novos por mês, com creators diferentes a cada ciclo. Vocês renovam os anúncios antes do público cansar, sem precisar montar a operação de novo.",
      inclui: [
        "R$ 450 por criativo",
        "Seleção de 10 creators por mês",
        "Briefing e roteiro revisados antes de cada gravação",
        "Direito de uso em anúncios",
      ],
      destaque: true,
      badge: "Recomendado pra quem roda anúncio",
    },
  ],
  notaOpcoes: "Compromisso mínimo de 3 meses. Depois disso, segue mês a mês até vocês decidirem pausar.",

  incluso: [
    "Diagnóstico de público e seleção das creators",
    "Briefing construído junto com o time da Grano",
    "Roteiro revisado antes de cada gravação",
    "Acompanhamento da produção",
    "1 rodada de ajustes por vídeo",
    "Nota fiscal",
  ],

  // Prévia do painel de acompanhamento (igual agencia.laradam.com), com nomes e status de exemplo:
  // não são creators reais nem confirmadas pra campanha, é só pra mostrar como fica o processo.
  // videosQtd/creatorsQtd mostram o tamanho real da campanha (10); as linhas abaixo são só ilustração (5).
  painel: {
    titulo: "Acompanhamento da campanha",
    sub: "A Grano recebe acesso a um painel exclusivo com cada creator, o portfólio e o status do roteiro atualizado em tempo real. Vocês sabem em que etapa está cada vídeo sem precisar pedir atualização.",
    videosQtd: 10,
    creatorsQtd: 10,
    linhas: [
      { nome: "Creator 1", cidade: "São Paulo, SP", status: "Roteiro aprovado" },
      { nome: "Creator 2", cidade: "Curitiba, PR", status: "Em gravação" },
      { nome: "Creator 3", cidade: "Belo Horizonte, MG", status: "Selecionada" },
      { nome: "Creator 4", cidade: "Porto Alegre, RS", status: "Roteiro em revisão" },
      { nome: "Creator 5", cidade: "Salvador, BA", status: "Entregue" },
    ],
  },

  referenciasTitulo: "Campanhas que já produzimos",
  referenciasIntro: "Toque em qualquer vídeo pra assistir. São referências de formato e tom pra campanha da Grano.",
  // Melhores (maior engajamento) de cada marca na rede, puxados de AG_CONTEUDOS (src/data/agencia.ts).
  // Trisanti e Rap10 não têm título próprio no YouTube (só o nome da marca), por isso ficam sem `titulo`.
  referencias: [
    { video: { brand: "Brinox", titulo: "5 motivos · Ceramiclife Loft", instagram: "DUY_qQwAmRW", thumbnail: "/capas-ig/DUY_qQwAmRW.webp" }, porque: "O vídeo de maior engajamento da campanha da Brinox: demonstração de produto com argumento claro." },
    { video: { brand: "Copacol", titulo: "Peixe que não gruda na grelha", instagram: "DIR8uSzPDE5", thumbnail: "/capas-ig/DIR8uSzPDE5.webp" }, porque: "Receita com o produto como protagonista. É a referência mais próxima do que propomos pra Grano." },
    { video: { brand: "Frooty", titulo: "Campanha", instagram: "DRiMzoBET65", thumbnail: "/capas-ig/DRiMzoBET65.webp" }, porque: "Alimento no dia a dia, formato leve e natural." },
    { video: { brand: "Trisanti", youtubeId: "fDjZz6kMjMY" }, porque: "Referência de tom pra categoria de alimentos da rede." },
    { video: { brand: "Rap10", youtubeId: "sb9PHTUVBvc" }, porque: "Outro exemplo de UGC gastronômico produzido pela rede." },
    { video: { brand: "Coza", titulo: "Cesto de lavanderia", instagram: "DbI8BXWgbXU", thumbnail: "/capas-ig/DbI8BXWgbXU.webp" }, porque: "Uso prático do produto na rotina, com boa retenção." },
  ],

  cronograma: [
    { etapa: "Seleção das creators e briefing", quando: "Semana 1" },
    { etapa: "Roteiros aprovados e gravações", quando: "Semanas 1 e 2" },
    { etapa: "Entrega dos 10 vídeos", quando: "Fim da semana 2" },
  ],

  // Mantido da leva anterior: esta leva voltou a deixar "[forma de pagamento...]" sem preencher.
  pagamento:
    "Pacote Pontual: 50% na assinatura e 50% na entrega dos vídeos.\nPacote Contínuo: pagamento mensal antecipado, até o dia 5 de cada mês.\nForma de pagamento: PIX ou boleto.\nDados para a nota fiscal: Lara Dam LTDA, CNPJ 55.446.568/0001-22.",

  // "em até [X] dias úteis" ainda sem o número; pendente com a Lara.
  proximoPasso: "Com a proposta aprovada, iniciamos a seleção das creators e enviamos o briefing pra validação da Grano.",

  whatsapp: "5512988729264",
  whatsappMensagem: "Oi Lara! Vi a proposta da Grano e quero fechar.",
  email: "laradam.ugc@gmail.com",

  chamada: {
    titulo: "Vamos",
    destaque: "começar",
    texto: "Ficou alguma dúvida sobre a proposta ou os pacotes? Fale com a gente.",
  },
  assinatura: "Lara Dam · Gestão de campanhas UGC",
};
