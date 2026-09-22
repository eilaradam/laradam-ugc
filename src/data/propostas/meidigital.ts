// Proposta pra MEI Digital · Prêmio Reclame Aqui 2026.
// Página: ugc.laradam.com/meidigital (fora do menu e fora do Google; a Lara manda o link direto).
//
// PRA TROCAR OS VÍDEOS DE REFERÊNCIA: mexa só em `referencias` lá embaixo.
// Cada item é o `id` de um vídeo do portfólio (src/data/content.ts) + uma linha
// de por que ele funcionou. Pode ter quantos quiser.

import type { Proposta } from "@/components/proposta/Proposta";

export const MEIDIGITAL: Proposta = {
  slug: "meidigital",
  eyebrow: "Proposta · setembro de 2026",
  cliente: "MEI Digital",
  titulo: "Prêmio Reclame Aqui 2026",
  subtitulo:
    "Vídeo com o meu rosto, em formato orgânico, pra levar direto à votação na categoria de soluções para microempresas.",
  destaques: [
    { rotulo: "Votação até", valor: "05/11" },
    { rotulo: "Conteúdo rodando", valor: "todo outubro" },
    { rotulo: "Gravação", valor: "28 a 30/09" },
  ],

  sobre:
    "Vídeo com meu rosto, em formato orgânico, no estilo do vídeo que gravamos no carro, pensado pra levar direto à votação do Prêmio Reclame Aqui na categoria de soluções para microempresas. A votação vai até 05/11, então o foco é ter o conteúdo rodando durante todo o mês de outubro.",

  opcoes: [
    {
      nome: "Opção 1",
      tipo: "UGC",
      valor: "R$ 650",
      descricao:
        "1 vídeo entregue editado e legendado para publicação no perfil da MEI Digital.",
      inclui: ["Direito de uso em anúncios com link direto para a votação até 05/11"],
    },
    {
      nome: "Opção 2",
      tipo: "Collab",
      valor: "R$ 850",
      descricao:
        "1 Reels publicado em collab no meu perfil e no perfil da MEI Digital.",
      inclui: ["Direito de uso em anúncios com link direto para a votação até 05/11"],
      destaque: true,
    },
  ],
  notaOpcoes:
    "Nas duas opções o impulsionamento já está incluso, por isso o orçamento com ads não aparece separado.",

  extra: {
    nome: "Vídeo extra · Comunidade no WhatsApp",
    valor: "+ R$ 450",
    descricao:
      "Vídeo divulgando a comunidade da MEI Digital: avisos de DAS, novidades, posts do blog, alertas de golpe e o sorteio de R$ 1.000 para quem preencher o formulário. Formato UGC para o perfil de vocês, com direito de uso em anúncios por 30 dias a partir da publicação.",
    condicao:
      "Valor especial válido fechando junto com o vídeo do prêmio, já que a gravação acontece no mesmo dia.",
  },

  incluso: [
    "Roteiro alinhado com vocês antes da gravação",
    "Gravação",
    "Edição e legenda",
    "1 rodada de ajustes",
    "Nota fiscal",
  ],

  // ↓↓↓ TROQUE AQUI. `id` = id do vídeo em src/data/content.ts.
  referencias: [
    { id: "t9", porque: "O vídeo do Reclame Aqui: mesmo tom e mesma linguagem que a campanha pede." },
    { id: "t0a", porque: "Fintech pra quem empreende: 100M de views e recorde de CTR no Meta." },
    { id: "t0b", porque: "Explicação simples de produto financeiro, sem cara de anúncio." },
  ],

  cronograma: [
    { etapa: "Roteiro e referências alinhados", quando: "até 26/09" },
    { etapa: "Gravação", quando: "entre 28 e 30/09" },
    { etapa: "Entrega do vídeo do prêmio", quando: "até 01/10" },
    { etapa: "Vídeo da comunidade", quando: "na data do lançamento da comunidade" },
  ],

  pagamento: "[preencher condições: forma de pagamento, prazo e dados para a nota fiscal]",

  proximoPasso:
    "Assim que recebermos o descritivo do vídeo do prêmio, fecho o roteiro e mando pra aprovação.",

  whatsapp: "5512988729264",
  whatsappMensagem: "Oi Lara! Vi a proposta do Prêmio Reclame Aqui e quero fechar.",
  email: "laradam.ugc@gmail.com",
};
