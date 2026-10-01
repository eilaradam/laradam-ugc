// Proposta pra GRANO: campanha UGC gerenciada, 10 criativos, via rede de creators.
// Página: ugc.laradam.com/grano (fora do menu e fora do Google; a Lara manda o link direto).
//
// PRA TROCAR OS VÍDEOS DE REFERÊNCIA: mexa só em `referencias` lá embaixo. Cada
// item pode ser `{ id, porque }` (vídeo do portfólio da Lara em content.ts) ou
// `{ video: {...}, porque }` (vídeo de outra creator da rede, ex. conteúdos da
// /agencia — é o caso aqui: Frooty/Brinox/Coza/Copacol/Trisanti/Rap10 são
// marcas atendidas pela rede, não vídeos da própria Lara).
//
// Ajuste de 01/10 (2ª leva): preço do contínuo subiu pra R$490/criativo, direito de
// uso detalhado, bloco de responsabilidades da marca, cronograma de 3 semanas e
// condições de pagamento completas.

import type { Proposta } from "@/components/proposta/Proposta";

export const GRANO: Proposta = {
  slug: "grano",
  eyebrow: "Proposta · campanha UGC",
  cliente: "Grano",
  titulo: "10 creators, uma campanha, um mês de conteúdo.",
  subtitulo:
    "Campanha UGC gerenciada por mim, do briefing à entrega: 10 criativos com creators selecionadas no meu banco, prontos pra rodar no seu feed e em anúncios.",
  destaques: [
    { rotulo: "Criativos", valor: "10" },
    { rotulo: "Cronograma", valor: "3 semanas" },
    { rotulo: "Creators", valor: "Pré-aprovadas" },
  ],

  sobre:
    "Campanha fechada de 10 criativos UGC pra Grano, com creators selecionadas na minha rede e toda a operação sob minha gestão: briefing, roteiro, produção e revisão antes da entrega. Em 3 semanas você tem os 10 vídeos prontos pra publicar e usar em mídia paga.",

  opcoes: [
    {
      nome: "Pacote Pontual",
      tipo: "Campanha única",
      valor: "R$ 5.500",
      descricao: "10 criativos UGC, cada um com uma creator diferente da rede, sem compromisso de recorrência.",
      inclui: [
        "R$ 550 por criativo",
        "Seleção de 10 creators pelo perfil da Grano",
        "Briefing e roteiro revisado antes da gravação",
        "Uso orgânico sem prazo: redes sociais, site e e-commerce da marca",
        "Uso em tráfego pago por 6 meses a partir da entrega de cada vídeo",
        "Renovação do tráfego pago sob consulta",
      ],
    },
    {
      nome: "Pacote Contínuo",
      tipo: "Recorrente · mínimo 3 meses",
      valor: "R$ 4.900/mês",
      descricao: "10 criativos UGC por mês, com creators renovadas e a operação rodando todo mês.",
      inclui: [
        "R$ 490 por criativo",
        "Seleção de 10 creators por mês",
        "Briefing e roteiro revisado antes de cada gravação",
        "Uso orgânico sem prazo: redes sociais, site e e-commerce da marca",
        "Uso em tráfego pago por 6 meses a partir da entrega de cada vídeo",
        "Renovação do tráfego pago sob consulta",
      ],
      destaque: true,
      badge: "Mais econômico",
      economia: "R$ 600 a menos por mês",
    },
  ],
  notaOpcoes: "No pacote contínuo o compromisso mínimo é de 3 meses. Depois disso, segue mês a mês, com aviso prévio de 30 dias para cancelar.",

  incluso: [
    "Diagnóstico e seleção das creators",
    "Briefing co-criado com vocês",
    "Roteiro revisado antes de cada gravação",
    "Produção acompanhada",
    "1 rodada de ajustes por vídeo",
    "Nota fiscal",
    "Creator reserva já aprovada por vocês, para cobrir imprevistos",
    "Revisão interna de cada vídeo antes de chegar até vocês",
  ],

  responsabilidadesMarca: {
    titulo: "O que precisamos de vocês",
    itens: [
      "Envio dos produtos para as creators, com frete por conta da marca",
      "Aprovação do briefing e dos perfis selecionados",
      "Retorno sobre roteiros e vídeos em até 2 dias úteis",
    ],
  },

  // Prévia do painel de acompanhamento (igual agencia.laradam.com), com nomes e status de exemplo —
  // não são creators reais nem confirmadas pra campanha, é só pra mostrar como fica o processo.
  painel: {
    titulo: "Como fica o acompanhamento da sua campanha",
    sub: "Um painel só da Grano, com cada creator, o portfólio e o status do roteiro em tempo real. Exemplo de como fica assim que a campanha começa:",
    linhas: [
      { nome: "Creator 1", cidade: "São Paulo, SP", status: "Roteiro aprovado" },
      { nome: "Creator 2", cidade: "Curitiba, PR", status: "Em gravação" },
      { nome: "Creator 3", cidade: "Belo Horizonte, MG", status: "Selecionada" },
      { nome: "Creator 4", cidade: "Porto Alegre, RS", status: "Roteiro em revisão" },
      { nome: "Creator 5", cidade: "Salvador, BA", status: "Entregue" },
    ],
  },

  // Melhores (maior engajamento) de cada marca na rede, puxados de AG_CONTEUDOS (src/data/agencia.ts).
  referencias: [
    { video: { brand: "Brinox", titulo: "5 motivos · Ceramiclife Loft", instagram: "DUY_qQwAmRW", thumbnail: "/capas-ig/DUY_qQwAmRW.webp" }, porque: "O vídeo de maior engajamento da rede pra Brinox: demonstração de produto com argumento claro." },
    { video: { brand: "Frooty", titulo: "Campanha", instagram: "DRiMzoBET65", thumbnail: "/capas-ig/DRiMzoBET65.webp" }, porque: "UGC de alimento/bebida com bom resultado: formato leve, do dia a dia." },
    { video: { brand: "Copacol", titulo: "Peixe que não gruda na grelha", instagram: "DIR8uSzPDE5", thumbnail: "/capas-ig/DIR8uSzPDE5.webp" }, porque: "Receita + produto, tom de gastronomia: referência direta pra Grano." },
    { video: { brand: "Coza", titulo: "Cesto de lavanderia", instagram: "DbI8BXWgbXU", thumbnail: "/capas-ig/DbI8BXWgbXU.webp" }, porque: "Uso prático do produto no dia a dia, com boa retenção." },
    { video: { brand: "Trisanti", youtubeId: "fDjZz6kMjMY" }, porque: "Referência de tom pra categoria de alimentos da rede." },
    { video: { brand: "Rap10", youtubeId: "sb9PHTUVBvc" }, porque: "Outro exemplo de UGC gastronômico produzido pela rede." },
  ],

  cronograma: [
    { etapa: "Diagnóstico, seleção das creators e briefing", quando: "Semana 1" },
    { etapa: "Roteiros aprovados e gravações", quando: "Semana 2" },
    { etapa: "Entrega dos 10 vídeos", quando: "Semana 3" },
  ],
  cronogramaNota: "Prazo contado a partir do recebimento do produto pelas creators.",

  pagamento:
    "Pacote Pontual: 50% na assinatura e 50% na entrega dos vídeos.\nPacote Contínuo: pagamento mensal antecipado, até o dia 5 de cada mês.\nForma de pagamento: PIX ou boleto.\nDados para a nota fiscal: Lara Dam LTDA, CNPJ 55.446.568/0001-22.",

  proximoPasso: "Assim que aprovar a proposta, já parto pra seleção das creators e briefing da campanha.",

  whatsapp: "5512988729264",
  whatsappMensagem: "Oi Lara! Vi a proposta da Grano e quero fechar.",
  email: "laradam.ugc@gmail.com",
};
