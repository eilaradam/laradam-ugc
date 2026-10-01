// Proposta pra NILEN (perfumaria, nilen.com.br): marca começou a operar em maio,
// ainda pequena, precisa estruturar criativo pra anúncio. Dois pacotes + opção de
// contrato fixo de 3 meses com desconto (ver `extra`, aparece embaixo dos cards).
// Página: ugc.laradam.com/nilen (fora do menu e fora do Google; a Lara manda o link direto).
//
// ⚠️ 3 VALORES EM ABERTO (a Lara não passou os números ainda):
// 1) opcoes[0].valor = pacote de 10 conteúdos (pontual)
// 2) opcoes[1].valor = pacote de 20 criativos/mês
// 3) extra.valor = valor mensal com desconto fechando contrato fixo de 3 meses
//
// Pagamento reaproveita a condição padrão já usada na proposta da Grano (PIX/boleto,
// CNPJ, 50/50 no pontual e mensal antecipado até dia 5); ajustar se a Lara quiser
// outra condição específica pra Nilen.

import type { Proposta } from "@/components/proposta/Proposta";

export const NILEN: Proposta = {
  slug: "nilen",
  eyebrow: "Proposta · Campanha UGC",
  cliente: "Nilen",
  titulo: "Criativos pra Nilen testar anúncio toda semana.",
  subtitulo:
    "Vocês estão dando o próximo passo em criativo e tráfego pago. A gente monta o fluxo de conteúdo pra isso virar rotina: creators certas pro perfil da Nilen, roteiro revisado por fragrância e vídeos prontos pra testar em mídia paga.",
  destaques: [
    { rotulo: "Pacotes", valor: "10 ou 20 criativos/mês" },
    { rotulo: "Nicho", valor: "Perfumaria" },
    { rotulo: "Creators", valor: "Selecionadas pelo perfil da Nilen" },
  ],

  sobre:
    "A Nilen começou a operar em maio e está dando o passo de estruturar criativo e anúncios de verdade. Selecionamos creators da nossa rede com perfil pra perfumaria, cuidamos do briefing por fragrância, do roteiro revisado antes da gravação e da revisão de cada vídeo antes da entrega. Vocês recebem os criativos prontos pra publicar e pra rodar em mídia paga.",

  opcoesTitulo: "Investimento",
  opcoes: [
    {
      nome: "Pacote 10 Conteúdos",
      tipo: "Campanha pontual",
      valor: "R$ [preencher]",
      descricao: "10 criativos UGC, cada um com uma creator diferente da rede. Ideal pra testar o formato e descobrir quais fragrâncias e ângulos convertem.",
      inclui: [
        "Seleção de 10 creators pelo perfil da Nilen",
        "Briefing por fragrância e roteiro revisado antes da gravação",
        "Acompanhamento da produção",
        "Direito de uso em anúncios",
      ],
    },
    {
      nome: "Pacote 20 Criativos",
      tipo: "Mensal",
      valor: "R$ [preencher]/mês",
      descricao: "20 criativos novos por mês, com creators diferentes a cada ciclo. Volume suficiente pra manter o funil de anúncios sempre com conteúdo novo pra testar.",
      inclui: [
        "Seleção de 20 creators por mês",
        "Briefing por fragrância e roteiro revisado antes de cada gravação",
        "Acompanhamento da produção",
        "Direito de uso em anúncios",
      ],
      destaque: true,
      badge: "Recomendado pra quem roda anúncio",
    },
  ],
  notaOpcoes: "Ambos os pacotes têm compromisso mês a mês, sem fidelidade mínima.",

  extra: {
    nome: "Contrato fixo · 3 meses",
    valor: "R$ [preencher]/mês",
    descricao: "Fechando o Pacote 20 Criativos por 3 meses direto, o valor mensal sai com desconto em relação ao mês a mês, com o mesmo escopo do pacote mensal.",
    condicao: "Valor garantido durante os 3 meses do contrato.",
  },

  incluso: [
    "Diagnóstico de público e seleção das creators",
    "Briefing por fragrância, construído junto com o time da Nilen",
    "Roteiro revisado antes de cada gravação",
    "Acompanhamento da produção",
    "1 rodada de ajustes por vídeo",
    "Nota fiscal",
  ],

  // Prévia de exemplo do painel de acompanhamento (igual agencia.laradam.com), com
  // nomes e status de demonstração; não reflete o tamanho real do pacote escolhido.
  painel: {
    titulo: "Acompanhamento da campanha",
    sub: "A Nilen recebe acesso a um painel exclusivo com cada creator, o portfólio e o status do roteiro atualizado em tempo real. Vocês sabem em que etapa está cada vídeo sem precisar pedir atualização.",
    linhas: [
      { nome: "Creator 1", cidade: "São Paulo, SP", status: "Roteiro aprovado" },
      { nome: "Creator 2", cidade: "Curitiba, PR", status: "Em gravação" },
      { nome: "Creator 3", cidade: "Belo Horizonte, MG", status: "Selecionada" },
      { nome: "Creator 4", cidade: "Porto Alegre, RS", status: "Roteiro em revisão" },
      { nome: "Creator 5", cidade: "Salvador, BA", status: "Entregue" },
    ],
  },

  referenciasTitulo: "Campanhas que já produzimos",
  referenciasIntro: "Toque em qualquer vídeo pra assistir. São referências de formato e ritmo pra pensar os criativos da Nilen.",
  // Wella/Sebastian/Neutrogena em destaque (pedido da Lara, mais próximos de beleza/perfumaria),
  // depois Magalu (melhor engajamento da rede) e alguns de OLX.
  referencias: [
    { video: { brand: "Wella", youtubeId: "15nOoGJ872g" }, porque: "UGC de beleza com o produto no centro: referência direta de tom pra campanha de perfumaria." },
    { video: { brand: "Sebastian", youtubeId: "i62BOlzvQlo" }, porque: "Outro exemplo de beleza da rede, formato que funciona bem pra linha de fragrâncias como a da Nilen." },
    { video: { brand: "Neutrogena", youtubeId: "ATz4wOA_mAc" }, porque: "Rotina com o produto como protagonista: a proximidade que buscamos pros criativos da Nilen." },
    { video: { brand: "Magalu", titulo: "Liquidação da Metade", instagram: "DLaQPpTOuQ-", thumbnail: "/capas-ig/DLaQPpTOuQ-.webp" }, porque: "Um dos vídeos de maior engajamento da rede: gancho de oferta, bom formato pra testar em anúncio." },
    { video: { brand: "Magalu", titulo: "Liquidação da Metade do Ano", instagram: "DLc8UBLxW2D", thumbnail: "/capas-ig/DLc8UBLxW2D.webp" }, porque: "Outro formato de oferta com boa resposta, referência de ritmo pra campanha paga." },
    { video: { brand: "OLX", titulo: "Taxa de liberação? Aqui não", instagram: "DLsilMggZY5", thumbnail: "/capas-ig/DLsilMggZY5.webp" }, porque: "Formato direto, resolvendo uma objeção do produto: referência de argumento pra anúncio." },
    { video: { brand: "OLX", titulo: "15 anos · cupons de aniversário", instagram: "DOZM18bj5kA", thumbnail: "/capas-ig/DOZM18bj5kA.webp" }, porque: "Gancho sazonal e promocional, outro ângulo pra testar nos criativos da Nilen." },
  ],

  cronograma: [
    { etapa: "Diagnóstico e seleção das creators", quando: "Semana 1" },
    { etapa: "Briefing por fragrância e gravações", quando: "Semana 1 e 2" },
    { etapa: "Entrega do primeiro lote de criativos", quando: "Fim da semana 2" },
  ],
  cronogramaNota: "No Pacote 20 Criativos, os lotes seguintes entram em ciclos de 30 dias.",

  pagamento:
    "Pacote 10 Conteúdos: 50% na assinatura e 50% na entrega dos vídeos.\nPacote 20 Criativos e Contrato fixo: pagamento mensal antecipado, até o dia 5 de cada mês.\nForma de pagamento: PIX ou boleto.\nDados para a nota fiscal: Lara Dam LTDA, CNPJ 55.446.568/0001-22.",

  proximoPasso: "Com a proposta aprovada, já parto pra seleção das creators e briefing por fragrância.",

  whatsapp: "5512988729264",
  whatsappMensagem: "Oi Lara! Vi a proposta da Nilen e quero fechar.",
  email: "laradam.ugc@gmail.com",

  chamada: {
    titulo: "Vamos",
    destaque: "começar",
    texto: "Ficou alguma dúvida sobre a proposta ou os pacotes? Fale com a gente.",
  },
  assinatura: "Lara Dam · Gestão de campanhas UGC",
};
