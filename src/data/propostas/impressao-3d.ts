// Proposta pra marcas de impressora 3D (modelo único, a Lara manda pra várias).
// Página: ugc.laradam.com/impressao-3d (fora do menu e fora do Google).
// O nome da marca entra pelo link: ugc.laradam.com/impressao-3d?marca=Creality
// (sem ?marca, a capa diz "Para marcas de impressão 3D").
//
// Dois pacotes: só permuta (máquina + filamento, escopo menor) e completo
// (permuta + cachê). Base de preço: R$ 650 por UGC (proposta MEI Digital).
//
// Referências: os 3 primeiros são do portfólio dela (ids em content.ts); o resto
// são Shorts públicos de outros canais, achados por busca em 07/11/2026.

import type { Proposta } from "@/components/proposta/Proposta";

export const IMPRESSAO_3D: Proposta = {
  slug: "impressao-3d",
  eyebrow: "Proposta · UGC + aula com IA",
  cliente: "Para marcas de impressão 3D",
  titulo: "Vídeos que vendem a máquina e uma aula que faz o cliente imprimir no primeiro dia.",
  subtitulo:
    "Um pacote de UGCs pra anúncio, gravados por quem está começando de verdade na impressão 3D, mais uma vídeo-aula ensinando a criar peças do zero com o Claude, a IA da Anthropic. Os vídeos vendem a máquina e a aula ajuda o cliente a usar depois da compra.",
  destaques: [
    { rotulo: "UGCs pra anúncio", valor: "3 a 5 vídeos" },
    { rotulo: "Direito de uso", valor: "Até 6 meses" },
    { rotulo: "Bônus pros clientes", valor: "Aula de 3D com IA" },
  ],

  sobre:
    "Quem pensa em comprar uma impressora 3D trava em duas dúvidas: \"vou conseguir usar?\" e \"vou imprimir o quê?\". Os UGCs respondem a primeira, porque mostram uma pessoa comum tirando a máquina da caixa e imprimindo no mesmo dia. A aula responde a segunda: o cliente descreve a peça em português, o Claude cria o modelo e a impressora imprime. Ninguém precisa saber modelagem 3D.",

  diferencial: {
    titulo: "Da ideia à peça impressa, sem saber modelar.",
    texto:
      "A vídeo-aula mostra o caminho inteiro na máquina de vocês, com objetos reais da casa: um suporte de celular com nome, um organizador sob medida e uma peça de reposição. Fica gravada em módulos curtos, pra vocês colocarem no onboarding, na área do cliente, no YouTube ou mandarem junto com a compra.",
    passos: [
      { titulo: "Descrever a ideia", texto: "Em português, do jeito que se fala: \"um porta-escovas com 3 furos e meu nome na frente\"." },
      { titulo: "O Claude cria o modelo", texto: "A IA escreve o projeto da peça (OpenSCAD) e ajusta medidas, furos e encaixes quando o cliente pede." },
      { titulo: "Exportar e fatiar", texto: "O modelo vira um arquivo STL e vai pro software de fatiamento da marca, com as configurações certas." },
      { titulo: "Imprimir", texto: "A peça sai na impressora de vocês. A aula mostra o resultado e o que ajustar se precisar." },
    ],
    nota: "A aula ensina a usar o Claude, que tem plano gratuito, e não depende de outro software pago. Ela traz a marca e a máquina de vocês do começo ao fim.",
  },

  opcoesTitulo: "Pacotes",
  opcoes: [
    {
      nome: "Pacote Permuta",
      tipo: "Sem cachê",
      valor: "Máquina + 5 kg de filamento",
      descricao:
        "Pra começar a parceria sem investimento em dinheiro. A máquina vem pra minha casa e vira conteúdo de verdade.",
      inclui: [
        "3 vídeos UGC pra anúncio (unboxing, primeira impressão e objetos úteis em casa)",
        "Direito de uso em tráfego pago por 3 meses",
        "1 vídeo curto mostrando uma peça criada com o Claude, da ideia à impressão",
        "Roteiros aprovados por vocês antes da gravação",
      ],
    },
    {
      nome: "Pacote Completo",
      tipo: "Permuta + cachê",
      valor: "Máquina + 10 kg + R$ 2.500",
      descricao:
        "O pacote inteiro: mais ângulos pra testar em anúncio, uso por 6 meses e a vídeo-aula completa liberada pros seus clientes.",
      inclui: [
        "5 vídeos UGC pra anúncio, cada um com um gancho e um ângulo diferente",
        "Direito de uso em tráfego pago por 6 meses",
        "Vídeo-aula completa \"Crie peças 3D com IA\", em módulos, com a máquina de vocês",
        "Aula liberada pros seus clientes, sem prazo",
        "3 ganchos alternativos por vídeo pra teste A/B",
      ],
      destaque: true,
      badge: "Recomendado pra quem roda anúncio",
    },
  ],
  notaOpcoes:
    "A máquina e o filamento ficam comigo depois da campanha. Isso é bom pra marca, porque eu continuo imprimindo e postando no meu perfil sem custo extra. O modelo da máquina fica a critério de vocês, e o pacote se ajusta a ele.",

  incluso: [
    "Roteiro de cada vídeo aprovado antes da gravação",
    "Gravação na minha casa, com a máquina em uso real",
    "Edição, legenda e sound design",
    "Até 2 ajustes por vídeo",
    "Vídeo com e sem legenda, em 9:16",
    "Nota fiscal",
    "Entrega no Drive",
    "Uso orgânico nos perfis da marca sem prazo",
  ],
  responsabilidadesMarca: {
    titulo: "Por conta da marca",
    itens: [
      "Envio da máquina e do filamento, com frete",
      "Acesso a um contato técnico pra dúvidas durante os testes",
    ],
  },

  referenciasTitulo: "Moodboard · meu trabalho e o que já funciona em 3D",
  referenciasIntro:
    "Toque em qualquer vídeo pra assistir. Os três primeiros são meus, de produtos de tecnologia. Os outros são conteúdos de impressão 3D de outros criadores, pra mostrar o tom e os formatos que eu proponho.",
  referencias: [
    { id: "t7", porque: "Meu UGC pra Logitech: produto de tecnologia mostrado no uso real, na mesa de trabalho." },
    { id: "t-fancy", porque: "Meu UGC pra Fancy: gadget explicado em segundos, com o benefício na frente da especificação." },
    { id: "ia2", porque: "Meu UGC pra Sintra: ferramenta de IA explicada pra quem nunca usou. É o tom da aula com o Claude." },
    { video: { brand: "Referência 3D", titulo: "5 coisas impressas que você precisa ter", youtubeId: "WYw_KrrOu-M" }, porque: "Formato lista de objetos úteis. É o gancho que mais faz a pessoa imaginar a máquina em casa." },
    { video: { brand: "Referência 3D", titulo: "Coisas úteis pra imprimir", youtubeId: "5utu8rW2hig" }, porque: "Série de objetos pra casa e organização. Rende vários criativos com a mesma gravação." },
    { video: { brand: "Referência 3D", titulo: "Impressões pra organizar a casa", youtubeId: "oygXEApaeVI" }, porque: "Creator falando pra câmera, com antes e depois e a peça em uso. É o formato UGC que eu proponho pros anúncios." },
    { video: { brand: "Referência 3D", titulo: "OpenSCAD + IA", youtubeId: "eCS01HnPdSs" }, porque: "IA criando o modelo e a impressora imprimindo. É a base da aula, que eu faço em português e com a máquina de vocês." },
    { video: { brand: "Referência 3D", titulo: "Comprei minha primeira impressora", youtubeId: "zDii7WVyMCQ" }, porque: "Ângulo de iniciante: unboxing, montagem e primeira impressão. Quebra o medo de \"não vou conseguir\"." },
    { video: { brand: "Referência 3D", titulo: "Imprimir sem saber CAD, com o Claude", youtubeId: "PgetyN0tQSg" }, porque: "Prova de que o Claude já é usado pra criar peças imprimíveis. A aula leva isso pro cliente brasileiro." },
  ],

  cronograma: [
    { etapa: "Aprovação do pacote e envio da máquina", quando: "Semana 1" },
    { etapa: "Testes reais e roteiros enviados pra aprovação", quando: "Até 7 dias depois que a máquina chega" },
    { etapa: "Gravação e entrega dos UGCs", quando: "Até 15 dias depois dos roteiros aprovados" },
    { etapa: "Entrega da vídeo-aula", quando: "Até 30 dias depois que a máquina chega" },
  ],
  cronogramaNota: "O prazo começa a contar quando a máquina chega, porque eu testo de verdade antes de gravar.",

  pagamento:
    "Pacote Permuta: máquina e filamento enviados antes da gravação.\nPacote Completo: máquina e filamento antes da gravação, e o cachê 50% na assinatura e 50% na entrega.\nForma de pagamento: PIX ou boleto.\nDados para a nota fiscal: Lara Dam LTDA, CNPJ 55.446.568/0001-22.",

  proximoPasso:
    "Me diga qual pacote faz mais sentido e qual modelo de máquina vocês querem mostrar. Com isso eu mando os roteiros dos primeiros vídeos pra aprovação.",

  whatsapp: "5512988729264",
  whatsappMensagem: "Oi Lara! Vi a proposta de impressão 3D e quero conversar.",
  email: "laradam.ugc@gmail.com",

  chamada: {
    titulo: "Vamos imprimir",
    destaque: "juntos",
    texto: "Ficou alguma dúvida sobre os pacotes, a aula ou o modelo da máquina? Me chame.",
  },
  assinatura: "Lara Dam · UGC Creator · @eilaradam",
};
