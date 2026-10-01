// Proposta pra NILEN (perfumaria, nilen.com.br): marca começou a operar em maio
// (segundo o que a Lara me passou; não achei confirmação independente no site/IG,
// deixei "maio" por ser a única fonte que tenho), ainda pequena, precisa estruturar
// criativo pra anúncio.
// Página: ugc.laradam.com/nilen (fora do menu e fora do Google; a Lara manda o link direto).
//
// Layout dos cards de Investimento = igual ao da /grano (2 cards: claro + escuro
// com selo). Os 2 cards agora são por VOLUME mensal (10 ou 20 creators), cada um
// com um bloco "Contrato de 3 meses" (preço com desconto) no rodapé do próprio
// card (`opcoes[].contratoFixo`, novo campo genérico em Proposta.tsx).
//
// Pendências com a Lara:
// 1) `pagamento` deveria terminar com "Proposta válida até [dd/mm/aaaa]." Ela não
//    deu a data; não incluí a frase pra não deixar colchete na página.
// 2) Item 8 do pedido dela ("Hoje os dois botões apontam pra 5512988729264") ficou
//    sem dizer pra qual número trocar. Mantive o número atual até ela confirmar.

import type { Proposta } from "@/components/proposta/Proposta";

export const NILEN: Proposta = {
  slug: "nilen",
  eyebrow: "Proposta · Campanha UGC",
  cliente: "Nilen",
  titulo: "Criativos pra Nilen testar anúncio toda semana.",
  subtitulo:
    "Vocês estão dando o próximo passo em criativo e tráfego pago. Eu monto o fluxo de conteúdo pra isso virar rotina: creators certas pro perfil da Nilen, roteiro revisado por fragrância e vídeos prontos pra testar em mídia paga.",
  destaques: [
    { rotulo: "Pacotes", valor: "10 ou 20 criativos/mês" },
    { rotulo: "Nicho", valor: "Perfumaria" },
    { rotulo: "Creators", valor: "Selecionadas pelo perfil da Nilen" },
  ],

  sobre:
    "A Nilen começou a operar em maio e está dando o passo de estruturar criativo e anúncios de verdade. Eu seleciono creators da minha rede com perfil pra perfumaria, cuido do briefing por fragrância, do roteiro revisado antes da gravação e da revisão de cada vídeo antes da entrega. Vocês recebem os criativos prontos pra publicar e pra rodar em mídia paga.",

  opcoesTitulo: "Investimento",
  opcoes: [
    {
      nome: "Pacote 10 Creators",
      tipo: "Mensal",
      valor: "R$ 5.500/mês",
      descricao:
        "10 criativos UGC por mês, cada um com uma creator diferente. Ideal pra testar o formato e descobrir quais fragrâncias e ângulos convertem.",
      inclui: [
        "R$ 550 por criativo",
        "Seleção de 10 creators pelo perfil da Nilen",
        "Briefing por fragrância e roteiro revisado antes da gravação",
        "Direito de uso em anúncios por 6 meses",
      ],
      contratoFixo: {
        titulo: "Contrato de 3 meses",
        valor: "R$ 4.900/mês · R$ 490 por criativo",
        economia: "Economia de R$ 600 por mês",
      },
    },
    {
      nome: "Pacote 20 Creators",
      tipo: "Mensal",
      valor: "R$ 9.800/mês",
      descricao:
        "20 criativos novos por mês, entregues em lotes a cada 2 semanas. Volume pra renovar os anúncios antes do público cansar, sem precisar montar a operação de novo.",
      inclui: [
        "R$ 490 por criativo",
        "Seleção de 20 creators por mês",
        "Briefing por fragrância e roteiro revisado antes de cada gravação",
        "Direito de uso em anúncios por 6 meses",
      ],
      destaque: true,
      badge: "Recomendado pra quem roda anúncio",
      contratoFixo: {
        titulo: "Contrato de 3 meses",
        valor: "R$ 9.000/mês · R$ 450 por criativo",
        economia: "Economia de R$ 800 por mês",
      },
    },
  ],
  notaOpcoes:
    "Sem contrato, os pacotes seguem mês a mês e vocês pausam quando quiserem. No contrato de 3 meses, o valor fica travado durante o período. Em caso de cancelamento antes do fim, é cobrada a diferença do desconto nos meses já utilizados.",

  incluso: [
    "Diagnóstico de público e seleção das creators",
    "Briefing por fragrância, construído junto com o time da Nilen",
    "Roteiro revisado antes de cada gravação",
    "Acompanhamento da produção",
    "Até 3 ajustes por vídeo",
    "Nota fiscal",
    "Entrega no Drive: vídeo com e sem legenda, roteiro e sugestão de capa",
    "Uso de imagem: orgânico sem prazo e tráfego pago por 6 meses",
  ],

  // Prévia de exemplo do painel de acompanhamento (igual agencia.laradam.com), com
  // nomes e status de demonstração. 10 linhas pra bater com o Pacote Pontual/Contínuo
  // de 10 criativos (toolbar mostra "Nilen · 10 vídeos · 10 creators" automaticamente).
  painel: {
    titulo: "Acompanhamento da campanha",
    sub: "A Nilen recebe acesso a um painel exclusivo com cada creator, o portfólio e o status do roteiro atualizado em tempo real. Vocês sabem em que etapa está cada vídeo sem precisar pedir atualização.",
    linhas: [
      { nome: "Creator 1", cidade: "São Paulo, SP", status: "Roteiro aprovado" },
      { nome: "Creator 2", cidade: "Curitiba, PR", status: "Em gravação" },
      { nome: "Creator 3", cidade: "Belo Horizonte, MG", status: "Selecionada" },
      { nome: "Creator 4", cidade: "Porto Alegre, RS", status: "Roteiro em revisão" },
      { nome: "Creator 5", cidade: "Salvador, BA", status: "Entregue" },
      { nome: "Creator 6", cidade: "Recife, PE", status: "Selecionada" },
      { nome: "Creator 7", cidade: "Fortaleza, CE", status: "Em gravação" },
      { nome: "Creator 8", cidade: "Brasília, DF", status: "Roteiro aprovado" },
      { nome: "Creator 9", cidade: "Campinas, SP", status: "Entregue" },
      { nome: "Creator 10", cidade: "Florianópolis, SC", status: "Selecionada" },
    ],
  },

  // Trocado de título porque estes NÃO são campanhas da rede da Lara (são UGC real
  // de perfumaria de outras marcas/creators, mandados por ela como referência de tom
  // e gancho); "Campanhas que já produzimos" ficaria incorreto aqui. (Seção não
  // listada no pedido mais recente, mantida como estava.)
  referenciasTitulo: "Referências de UGC de perfumaria",
  referenciasIntro: "Toque em qualquer vídeo pra assistir. São exemplos reais de UGC de perfumaria pra pensar o tom e os ganchos dos criativos da Nilen.",
  referencias: [
    { video: { brand: "Natura", titulo: "Una Blush · promoção", instagram: "DU9JkOkEcli", thumbnail: "/capas-ig/DU9JkOkEcli.webp" }, porque: "Gancho de promoção e preço, formato direto pra campanha com cupom ou oferta." },
    { video: { brand: "Olympia Parfums", titulo: "Guia de presente · Dia dos Pais", instagram: "DbrCudTiPbX", thumbnail: "/capas-ig/DbrCudTiPbX.webp" }, porque: "Guia de presente por estilo de perfume, bom formato pra datas comemorativas." },
    { video: { brand: "Olympia Parfums", titulo: "Descoberta na loja", instagram: "DXcqWd-h7uV", thumbnail: "/capas-ig/DXcqWd-h7uV.webp" }, porque: "Storytelling de descoberta em loja física, com gancho emocional forte." },
    { video: { brand: "Amakha", titulo: "Kit Elegance Blue", instagram: "DaoMW_3DSDY", thumbnail: "/capas-ig/DaoMW_3DSDY.webp" }, porque: "Review do produto com a creator apresentando o kit, direto ao ponto." },
    { video: { brand: "Amakha", titulo: "Zaya · Dia dos Namorados", instagram: "DY0O38xCN-o", thumbnail: "/capas-ig/DY0O38xCN-o.webp" }, porque: "Gancho de data comemorativa, produto como sugestão de presente." },
    { video: { brand: "Natura", titulo: "Natura Friday · Body Splash", instagram: "DRW5WSPjnf9", thumbnail: "/capas-ig/DRW5WSPjnf9.webp" }, porque: "Formato de oferta com cupom e urgência, bom pra testar em anúncio." },
    { video: { brand: "Sahari", titulo: "Al Mas The Diamond", instagram: "DXhR92cDYWE", thumbnail: "/capas-ig/DXhR92cDYWE.webp" }, porque: "Review de 'perfume favorito do momento' com onde comprar, formato de recomendação." },
    { video: { brand: "Perfumistta", titulo: "Qual é a sua cara?", instagram: "DVLvPiuDhk5", thumbnail: "/capas-ig/DVLvPiuDhk5.webp" }, porque: "Pergunta direta ao público com cupom, bom gancho de engajamento." },
    { video: { brand: "Perfumistta", titulo: "O perfume que não sai da bolsa", instagram: "DRSGWMPDuU2", thumbnail: "/capas-ig/DRSGWMPDuU2.webp" }, porque: "Formato de rotina e preferência pessoal, com cupom." },
    { video: { brand: "Carolina Herrera", titulo: "La Bomba", instagram: "DSYK6FfkYZl", thumbnail: "/capas-ig/DSYK6FfkYZl.webp" }, porque: "Storytelling sobre a inspiração do perfume, tom mais editorial." },
    { video: { brand: "Libougie", titulo: "Perfume de bolsa", instagram: "DKM6pe0R6Oq", thumbnail: "/capas-ig/DKM6pe0R6Oq.webp" }, porque: "Foco em praticidade: perfume de bolsa pro dia a dia." },
    { video: { brand: "Bloom", titulo: "Combo Body Splash", instagram: "DcMlPm0pcrN", thumbnail: "/capas-ig/DcMlPm0pcrN.webp" }, porque: "Gancho de combo e preço, oferta clara, direto pra anúncio." },
  ],

  cronograma: [
    { etapa: "Diagnóstico, seleção das creators e envio do produto", quando: "Semana 1" },
    { etapa: "Briefing por fragrância, roteiro e gravação", quando: "Depois que a creator recebe o perfume" },
    { etapa: "Entrega do primeiro lote", quando: "Até 15 dias depois que o produto chega às creators" },
  ],
  cronogramaNota:
    "No Pacote 20 Creators, os criativos chegam em lotes a cada 2 semanas.\nO envio do perfume para cada creator e o frete ficam por conta da Nilen. O prazo começa a contar quando o produto chega.",

  pagamento:
    "Pacotes mensais e contrato de 3 meses: pagamento antecipado, até o dia 5 de cada mês.\nForma de pagamento: PIX ou boleto.\nDados para a nota fiscal: Lara Dam LTDA, CNPJ 55.446.568/0001-22.",

  proximoPasso: "Com a proposta aprovada, já parto pra seleção das creators e briefing por fragrância.",

  whatsapp: "5512988729264",
  whatsappMensagem: "Oi Lara! Vi a proposta da Nilen e quero fechar.",
  email: "laradam.ugc@gmail.com",

  chamada: {
    titulo: "Vamos",
    destaque: "começar",
    texto: "Ficou alguma dúvida sobre a proposta ou os pacotes? Fale comigo.",
  },
  assinatura: "Lara Dam · Gestão de campanhas UGC",
};
