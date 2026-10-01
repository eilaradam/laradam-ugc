// Proposta pra GRANO: campanha UGC gerenciada, 10 criativos, via rede de creators.
// Página: ugc.laradam.com/grano (fora do menu e fora do Google; a Lara manda o link direto).
//
// PRA TROCAR OS VÍDEOS DE REFERÊNCIA: mexa só em `referencias` lá embaixo. Cada
// item pode ser `{ id, porque }` (vídeo do portfólio da Lara em content.ts) ou
// `{ video: {...}, porque }` (vídeo de outra creator da rede, ex. conteúdos da
// /agencia — é o caso aqui: Frooty/Brinox/Coza/Copacol/Trisanti/Rap10 são
// marcas atendidas pela rede, não vídeos da própria Lara).
//
// ⚠️ VALOR: não encontrei uma base de preço por criativo/campanha salva (nem no
// repo, nem no Drive, nem no Supabase do CRM — o campo "valor_medio" do CRM só
// existe no front, sem dado salvo). `opcoes[0].valor` ficou como placeholder:
// a Lara precisa passar o número pra eu completar e publicar de novo.

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
    { rotulo: "Cronograma", valor: "2 semanas" },
    { rotulo: "Creators", valor: "Pré-aprovadas" },
  ],

  sobre:
    "Campanha fechada de 10 criativos UGC pra Grano, com creators selecionadas na minha rede e toda a operação sob minha gestão: briefing, roteiro, produção e revisão antes da entrega. Em 2 semanas você tem os 10 vídeos prontos pra publicar e usar em mídia paga.",

  opcoes: [
    {
      nome: "Campanha Grano",
      tipo: "UGC gerenciado",
      valor: "R$ [preencher: valor total pra 10 criativos]",
      descricao: "10 vídeos UGC, cada um com uma creator diferente da rede, roteiro revisado por mim antes da gravação.",
      inclui: [
        "Seleção de 10 creators pelo perfil da Grano",
        "Briefing e roteiro revisado antes da gravação",
        "Produção acompanhada e 1 rodada de ajustes por vídeo",
        "Direito de uso em anúncios",
      ],
      destaque: true,
    },
  ],

  incluso: [
    "Diagnóstico e seleção das creators",
    "Briefing co-criado com vocês",
    "Roteiro revisado antes de cada gravação",
    "Produção acompanhada",
    "1 rodada de ajustes por vídeo",
    "Nota fiscal",
  ],

  // Prévia do painel de acompanhamento (igual agencia.laradam.com), com nomes e status de exemplo —
  // não são creators reais nem confirmadas pra campanha, é só pra mostrar como fica o processo.
  painel: {
    titulo: "Como fica o acompanhamento da sua campanha",
    sub: "Um painel só da Grano, com cada creator, o status do roteiro e do conteúdo em tempo real. Exemplo de como fica assim que a campanha começa:",
    linhas: [
      { nome: "Creator 01", perfil: "Gastronomia · receitas do dia a dia", status: "Roteiro aprovado" },
      { nome: "Creator 02", perfil: "Lifestyle · rotina saudável", status: "Em gravação" },
      { nome: "Creator 03", perfil: "Mãe · praticidade na cozinha", status: "Selecionada" },
      { nome: "Creator 04", perfil: "Fitness · pré/pós treino", status: "Roteiro em revisão" },
      { nome: "Creator 05", perfil: "Casa · organização e despensa", status: "Entregue" },
      { nome: "Creator 06", perfil: "Gastronomia · receitas rápidas", status: "Selecionada" },
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
    { etapa: "Seleção das creators e briefing", quando: "Semana 1" },
    { etapa: "Roteiro revisado e gravações", quando: "Semana 1 e 2" },
    { etapa: "Entrega dos 10 vídeos", quando: "Fim da semana 2" },
  ],

  pagamento: "[preencher condições: forma de pagamento, prazo e dados para a nota fiscal]",

  proximoPasso: "Assim que aprovar a proposta, já parto pra seleção das creators e briefing da campanha.",

  whatsapp: "5512988729264",
  whatsappMensagem: "Oi Lara! Vi a proposta da Grano e quero fechar.",
  email: "laradam.ugc@gmail.com",
};
