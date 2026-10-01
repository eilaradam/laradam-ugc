// Proposta pra GRANO.
// Página: ugc.laradam.com/grano (fora do menu e fora do Google; a Lara manda o link direto).
//
// PRA TROCAR OS VÍDEOS DE REFERÊNCIA: mexa só em `referencias` lá embaixo.
// Cada item é o `id` de um vídeo do portfólio (src/data/content.ts) + uma linha
// de por que ele funcionou. Pode ter quantos quiser.
//
// Campos entre [colchetes] ainda precisam ser preenchidos com os detalhes reais
// da campanha (escopo, valores, datas e forma de pagamento).

import type { Proposta } from "@/components/proposta/Proposta";

export const GRANO: Proposta = {
  slug: "grano",
  eyebrow: "Proposta",
  cliente: "Grano",
  titulo: "[título da campanha]",
  subtitulo: "[o que é o vídeo em uma frase: formato, tom e objetivo]",
  destaques: [
    { rotulo: "[prazo/data]", valor: "[valor]" },
    { rotulo: "[prazo/data]", valor: "[valor]" },
    { rotulo: "[prazo/data]", valor: "[valor]" },
  ],

  sobre: "[parágrafo explicando o contexto da campanha, o que a Grano precisa e por que esse formato funciona]",

  opcoes: [
    {
      nome: "Opção 1",
      tipo: "UGC",
      valor: "R$ [valor]",
      descricao: "[o que entrega nessa opção]",
      inclui: ["[direito de uso / detalhe extra]"],
    },
    {
      nome: "Opção 2",
      tipo: "Collab",
      valor: "R$ [valor]",
      descricao: "[o que entrega nessa opção]",
      inclui: ["[direito de uso / detalhe extra]"],
      destaque: true,
    },
  ],

  incluso: [
    "Roteiro alinhado com vocês antes da gravação",
    "Gravação",
    "Edição e legenda",
    "1 rodada de ajustes",
    "Nota fiscal",
  ],

  // ↓↓↓ TROQUE AQUI. `id` = id do vídeo em src/data/content.ts.
  // Comecei com referências de food/gastronomia (Cafeza, Ateliê, Copacol);
  // troque se o produto da Grano for outra coisa.
  referencias: [
    { id: "o1", porque: "Café falando com a câmera, formato próximo e caseiro: bom tom pra uma marca de grãos." },
    { id: "g1", porque: "UGC de alimento com b-roll de preparo + depoimento: mostra produto e experiência juntos." },
    { id: "g5", porque: "Formato mais institucional, útil se a Grano quiser algo com cara de anúncio." },
  ],

  cronograma: [
    { etapa: "Roteiro e referências alinhados", quando: "[data]" },
    { etapa: "Gravação", quando: "[data]" },
    { etapa: "Entrega do vídeo", quando: "[data]" },
  ],

  pagamento: "[preencher condições: forma de pagamento, prazo e dados para a nota fiscal]",

  proximoPasso: "Assim que recebermos o descritivo da campanha, fecho o roteiro e mando pra aprovação.",

  whatsapp: "5512988729264",
  whatsappMensagem: "Oi Lara! Vi a proposta da Grano e quero fechar.",
  email: "laradam.ugc@gmail.com",
};
