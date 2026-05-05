"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "pt" | "en";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "en" || saved === "pt") setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = l === "pt" ? "pt-BR" : "en";
    }
  };

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggle: () => setLang(lang === "pt" ? "en" : "pt"),
    }),
    [lang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

type Stat = { value: string; label: string };
type ServiceItem = { title: string; description: string; cta: string };
type CategoryItem = { slug: string; name: string; tagline: string };
type TestimonialItem = {
  quote: string;
  role: string;
  metricLabel: string;
};
type HighlightItem = {
  metric: string;
  platform: string;
  stats?: Stat[];
};

export type Dict = {
  nav: {
    sobre: string;
    servicos: string;
    categorias: string;
    contato: string;
    gestao: string;
    gestaoComingSoon: string;
    trabalheComigo: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    titleAccent: string;
    body1: string;
    metrics: string;
    cta: string;
    saibaMais: string;
    bubble1Title: string;
    bubble1Sub: string;
    bubble2Title: string;
    bubble2Sub: string;
  };
  marquee: string[];
  stats: Stat[];
  about: {
    tag: string;
    greeting1: string;
    greetingName: string;
    body1: string;
    body2: string;
    pillBrands: string;
    pillLocation: string;
    etapa: string;
    primeiroContato: string;
    criacao: string;
    entrega: string;
    bubblePerfeitaTitle: string;
    bubblePerfeitaSub: string;
  };
  brandsMarquee: { title: string };
  services: {
    tag: string;
    title1: string;
    title2: string;
    titleAccent: string;
    intro: string;
    scrollHint: string;
    items: ServiceItem[];
  };
  bestResults: {
    tag: string;
    title1: string;
    titleAccent: string;
    eyeline: string;
    body1Pre: string;
    body1ViewsHi: string;
    body1Mid: string;
    body1Cpa: string;
    body1Mid2: string;
    body1Roas: string;
    body1End: string;
    audioCardTitle: string;
    audioCardNow: string;
    highlights: HighlightItem[];
  };
  categories: {
    tag: string;
    title1: string;
    titleAccent: string;
    title2: string;
    intro: string;
    comingSoon: string;
    items: CategoryItem[];
  };
  youtubeAds: {
    tag: string;
    title1: string;
    title2: string;
    subline1: string;
    subline2: string;
    subline3: string;
    bodyPre: string;
    bodyAccent: string;
    bodyEnd: string;
    viewsLabel: string;
  };
  testimonials: {
    tag: string;
    title1: string;
    titleAccent: string;
    intro: string;
    quotes: TestimonialItem[];
  };
  contact: {
    tag: string;
    title1: string;
    titleAccent: string;
    titleEnd: string;
    body: string;
    name: string;
    namePh: string;
    email: string;
    emailPh: string;
    brand: string;
    brandPh: string;
    budget: string;
    budgetPh: string;
    message: string;
    messagePh: string;
    send: string;
    sending: string;
    sent: string;
  };
  footer: {
    role: string;
  };
  popup: {
    tag: string;
    title: string;
    body: string;
    name: string;
    email: string;
    phone: string;
    cta: string;
    sending: string;
    privacy: string;
    successTitle: string;
    successBody: string;
    error: string;
  };
  gestao: {
    hero: {
      tag: string;
      titleLine1: string;
      titleLine2: string;
      subtitle: string;
      body: string;
      bodyBold: string;
      cta: string;
      ctaSub: string;
      stats: { campanhas: string; marcas: string; creators: string };
      bubble: string;
    };
    marquee: { item1: string; item2: string; item3: string };
    cases: {
      title1: string;
      title2: string;
      subtitle: string;
      stats: { campanhas: string; creators: string; videos: string };
      emBreve: string;
    };
    oQueFaco: {
      title1: string;
      title2: string;
      body: string;
      etapa: string;
      de: string;
      items: { titulo: string; tagShort: string; texto: string }[];
    };
    modalidades: {
      title1: string;
      title2: string;
      maisEscolhido: string;
      idealPara: string;
      cards: {
        name: string;
        pitch: string;
        bullets: string[];
        ideal: string;
        cta: string;
      }[];
    };
    processo: {
      title1: string;
      title2: string;
      body: string;
      etapas: { n: string; title: string; body: string }[];
    };
    quemSou: {
      eyebrow: string;
      title: string;
      titleAccent: string;
      paragraphs: string[];
      brandsHighlight: string;
    };
    faq: {
      title1: string;
      title2: string;
      items: { q: string; a: string }[];
    };
    ctaFinal: {
      title1: string;
      title2: string;
      paragraphs: string[];
      cta: string;
      ctaSub: string;
    };
    contactForm: {
      tag: string;
      title1: string;
      title2: string;
      subtitle: string;
      successEmoji: string;
      successTitle: string;
      successBody: string;
      labels: {
        name: string;
        email: string;
        whatsapp: string;
        company: string;
        role: string;
        site: string;
        modality: string;
        goal: string;
        budget: string;
        message: string;
      };
      placeholders: { whatsapp: string; message: string };
      options: {
        roles: string[];
        modalities: string[];
        goals: string[];
        budgets: string[];
      };
      next: string;
      back: string;
      submit: string;
    };
  };
};

const dict: Record<Lang, Dict> = {
  pt: {
    nav: {
      sobre: "Sobre",
      servicos: "Serviços",
      categorias: "Categorias",
      contato: "Contato",
      gestao: "Gestão",
      gestaoComingSoon: "Disponível em breve",
      trabalheComigo: "Trabalhe comigo",
    },
    hero: {
      badge: "UGC Creator & Content Strategist · Disponível 2026",
      title1: "Criando conteúdo",
      title2: "que",
      titleAccent: "converte",
      body1: "De hook a CTA, cada segundo pensado pra performar.",
      metrics:
        "+500 vídeos  |  +200 marcas parceiras  |  100M+ views.",
      cta: "Quero criar com a Lara",
      saibaMais: "Saiba mais →",
      bubble1Title: "A entrega foi perfeita!",
      bubble1Sub: "Super alinhada",
      bubble2Title: "Recorde de CTR no Meta",
      bubble2Sub: "+100M views · InfinitePay",
    },
    marquee: [
      "UGC de Conversão",
      "Criativos de Alta Performance",
      "Roteiros Estratégicos",
      "Fotos Lifestyle",
      "Conteúdo E-commerce",
      "Consultoria UGC",
      "Publipost",
    ],
    stats: [
      { value: "500+", label: "Vídeos gravados" },
      { value: "200+", label: "Parceiros" },
      { value: "100M+", label: "Views acumulados" },
      { value: "2 anos", label: "De experiência" },
    ],
    about: {
      tag: "Sobre mim",
      greeting1: "Oie, eu sou a",
      greetingName: "Lara Dam",
      body1:
        "Tenho **27 anos**, sou **UGC Creator e estrategista de conteúdo** no Litoral de SP. Em **2 anos**, gravei mais de **500 vídeos** e trabalhei com mais de **200 marcas**, criando conexões reais e estratégias de alta conversão. Meu olhar analítico transforma produto em desejo de consumo, com **conteúdo autêntico** que gera autoridade e resultado.",
      body2:
        "Mais de **140M de views** em campanhas, **recorde de CTR no Meta**, **CPA reduzido em até 38%** e **ROAS de 2.4x**. Conteúdo que virou playbook de criativo pra marcas como **InfinitePay**, **Méliuz** e **DT3**.",
      pillBrands: "+200 marcas parceiras",
      pillLocation: "Litoral de SP · Brasil",
      etapa: "Etapa",
      primeiroContato: "Primeiro contato",
      criacao: "Criação",
      entrega: "Entrega",
      bubblePerfeitaTitle: "A entrega foi perfeita!",
      bubblePerfeitaSub: "Super alinhada",
    },
    brandsMarquee: { title: "Marcas que confiam no meu trabalho" },
    services: {
      tag: "Serviços",
      title1: "O que podemos",
      title2: "criar",
      titleAccent: "juntos",
      intro:
        "Conheça os formatos em que minha gestão de campanhas UGC pode ajudar sua marca a conquistar mais clientes e gerar resultado de verdade.",
      scrollHint: "Deslize pro lado →",
      items: [
        {
          title: "UGC de Conversão",
          description: "Vídeos autênticos pensados pra vender.",
          cta: "Quero UGC que converte",
        },
        {
          title: "Criativos para Tráfego",
          description: "Ads otimizados pro Meta, TikTok e YouTube.",
          cta: "Quero criar anúncios",
        },
        {
          title: "Roteiros Estratégicos",
          description: "Scripts validados por performance.",
          cta: "Quero roteiros performáticos",
        },
        {
          title: "Fotos Lifestyle",
          description: "Imagens com direção de arte pra campanhas.",
          cta: "Quero fotos da minha marca",
        },
        {
          title: "Conteúdo E-commerce",
          description: "Pacotes mensais pra manter o feed vivo.",
          cta: "Quero conteúdo recorrente",
        },
        {
          title: "Consultoria UGC",
          description: "Briefing, curadoria e direção de creators.",
          cta: "Quero uma consultoria",
        },
      ],
    },
    bestResults: {
      tag: "Conteúdos que estouraram",
      title1: "Os melhores",
      titleAccent: "resultados",
      eyeline: "Será que você já me viu por aí? 👀",
      body1Pre: "Mais de ",
      body1ViewsHi: "140M de views",
      body1Mid: " em campanhas — recorde de CTR no Meta, CPA reduzido em até ",
      body1Cpa: "38%",
      body1Mid2: " e ROAS de ",
      body1Roas: "2.4x",
      body1End:
        ". Conteúdo que virou playbook de criativo pra marcas como InfinitePay, Méliuz e DT3.",
      audioCardTitle: "Depoimento de cliente",
      audioCardNow: "agora",
      highlights: [
        { metric: "+ 100 milhões de views", platform: "apenas no TikTok" },
        { metric: "+ 30 milhões de views", platform: "apenas no TikTok" },
        { metric: "5,94x de ROAS", platform: "anúncios de performance" },
        {
          metric: "1.023 vídeos",
          platform: "campanha 360°",
          stats: [
            { value: "5,6M", label: "visualizações totais" },
            { value: "66k", label: "salvamentos totais" },
          ],
        },
      ],
    },
    categories: {
      tag: "Categorias",
      title1: "Que tipo de",
      titleAccent: "conteúdo",
      title2: "você precisa?",
      intro:
        "Navegue pelos nichos. Cada linha é uma especialidade — deslize pro lado pra ver mais.",
      comingSoon: "Em breve nessa categoria.",
      items: [
        {
          slug: "beleza",
          name: "Beleza",
          tagline: "Produtos que viram ritual",
        },
        { slug: "casa", name: "Casa & Deco", tagline: "Ambientes que inspiram" },
        {
          slug: "gastronomia",
          name: "Gastronomia",
          tagline: "Comida que dá água na boca",
        },
        {
          slug: "food",
          name: "Drinks e Sobremesas",
          tagline: "Bebidas, doces e sabores que viram desejo",
        },
        {
          slug: "tech",
          name: "Tech & Apps",
          tagline: "Apps e gadgets em linguagem humana",
        },
        { slug: "moda", name: "Moda", tagline: "Outfits que contam história" },
        {
          slug: "viagem",
          name: "Viagem",
          tagline: "Experiências & destinos",
        },
      ],
    },
    youtubeAds: {
      tag: "YouTube Ads",
      title1: "Sua marca no",
      title2: "YouTube",
      subline1: "Mais visibilidade,",
      subline2: "mais estratégia,",
      subline3: "mais resultado!",
      bodyPre: "Tudo isso com vídeos pensados para o ",
      bodyAccent: "YouTube Ads",
      bodyEnd: ".",
      viewsLabel: "views",
    },
    testimonials: {
      tag: "Depoimentos",
      title1: "O que dizem",
      titleAccent: "sobre o trabalho",
      intro:
        "Feedback de marcas que viram a diferença de um UGC pensado pra performance.",
      quotes: [
        {
          quote:
            "A Lara entrega muito além do que a gente pede. Ela entende de performance e o vídeo veio pronto pra rodar como criativo, bateu recorde de CTR no Meta.",
          role: "Vídeo recorde no Meta",
          metricLabel: "views em 1 vídeo",
        },
        {
          quote:
            "Trabalho com vários creators e a Lara é a que mais converte. Roteiro afiado, entrega rápida e ela pega direção de brief no primeiro review.",
          role: "Roteiro + criativo pra growth",
          metricLabel: "views · campanha mercado",
        },
        {
          quote:
            "Já fechamos 4 campanhas e cada uma performou melhor que a anterior. A Lara virou parte do nosso playbook de criativo.",
          role: "Playbook de criativo recorrente",
          metricLabel: "campanhas ativas",
        },
        {
          quote:
            "A Lara desempenhou um trabalho incrível. Amamos o resultado do vídeo criado, além da qualidade e toda a atenção para entender a demanda. Super recomendamos.",
          role: "Conteúdo pra e-commerce + ads",
          metricLabel: "ROAS · e-commerce com ads",
        },
        {
          quote:
            "O trabalho da Lara foi incrível. Ela fez a cobertura total do evento, filmou cada detalhe e agregou DEMAIS pras marcas. Foi a creator que mais gerou conteúdo pra BF em 2024.",
          role: "Conteúdo em evento presencial",
          metricLabel: "vídeos durante o evento BF",
        },
        {
          quote:
            "Lara entregou um material muito legal e bem feito. Com certeza vamos querer trabalhar novamente!",
          role: "Campanha de receitas",
          metricLabel: "alcance no reels",
        },
        {
          quote:
            "Alto nível de domínio em UGC: roteiro, narrativa, performance natural na frente da câmera e edição. Comunicação fluida em todas as etapas!",
          role: "Conteúdo pra e-commerce + ads",
          metricLabel: "vendas no e-commerce com ads",
        },
      ],
    },
    contact: {
      tag: "Contato",
      title1: "Vamos criar algo",
      titleAccent: "juntos",
      titleEnd: "?",
      body: "Conta um pouco sobre sua marca e o que você quer alcançar. Respondo em até 48h.",
      name: "Nome",
      namePh: "Seu nome",
      email: "E-mail",
      emailPh: "voce@marca.com",
      brand: "Marca / Empresa",
      brandPh: "Nome da marca",
      budget: "Orçamento estimado",
      budgetPh: "Ex: R$ 1.000 – R$ 5.000",
      message: "Conta sobre o projeto",
      messagePh: "Categoria, formato, prazo, objetivo da campanha...",
      send: "Enviar mensagem",
      sending: "Enviando...",
      sent: "Enviado! Respondo em breve.",
    },
    footer: { role: "UGC Creator & Content Strategist" },
    popup: {
      tag: "Vamos conversar?",
      title: "Curtindo o portfolio?",
      body: "Deixa seu contato e eu mando ideias de conteúdo personalizadas pra sua marca.",
      name: "Seu nome",
      email: "Seu email",
      phone: "Telefone (opcional)",
      cta: "Quero receber",
      sending: "Enviando...",
      privacy: "Sem spam, prometo. Só conteúdo relevante.",
      successTitle: "Recebido!",
      successBody: "Vou te mandar novidades em breve.",
      error: "Algo deu errado, tenta de novo?",
    },
    gestao: {
      hero: {
        tag: "laradam.gestão",
        titleLine1: "Gestão de",
        titleLine2: "Campanhas UGC",
        subtitle: "do briefing à entrega.",
        body: "Cuidamos de todo o processo pra sua empresa: seleção dos creators certos, briefing alinhado com seu posicionamento, roteiro revisado, produção acompanhada e entrega no prazo.",
        bodyBold: "Você roda mídia. Nós rodamos a operação.",
        cta: "Quero conversar sobre minha campanha",
        ctaSub: "Resposta em até 24h. Diagnóstico gratuito antes de qualquer proposta.",
        stats: {
          campanhas: "campanhas gerenciadas",
          marcas: "marcas atendidas",
          creators: "creators em rede",
        },
        bubble: "De creator pra creator",
      },
      marquee: {
        item1: "Sem retrabalho",
        item2: "Sem improviso",
        item3: "Processo claro",
      },
      cases: {
        title1: "Conteúdos gerenciados",
        title2: "pelo nosso time.",
        subtitle: "Conheça algumas creators que poderão criar para a sua marca.",
        stats: {
          campanhas: "campanhas gerenciadas",
          creators: "creators em rede",
          videos: "vídeos produzidos",
        },
        emBreve: "Em breve",
      },
      oQueFaco: {
        title1: "Gestão completa.",
        title2: "Sem montar time interno.",
        body: "Eu opero a campanha de ponta a ponta. Você define o objetivo, eu entrego o que vai pro ar.",
        etapa: "Etapa",
        de: "de",
        items: [
          {
            titulo: "Seleção de creators",
            tagShort: "Seleção",
            texto: "Hunting com critério, não mensagem em massa. Perfil alinhado com sua persona, histórico de entrega, nicho compatível e disponibilidade real. Você recebe creators pré-aprovados.",
          },
          {
            titulo: "Briefing co-criado",
            tagShort: "Briefing",
            texto: "Construído junto com você, traduzindo posicionamento de marca em direção criativa que o creator entende e executa. Briefing claro é metade do trabalho.",
          },
          {
            titulo: "Roteiros revisados",
            tagShort: "Roteiro",
            texto: "Toda campanha minha tem roteiro revisado por mim antes do creator gravar. É onde mais campanha desanda no mercado, e onde mais cuido pra não desandar a sua.",
          },
          {
            titulo: "Produção acompanhada",
            tagShort: "Produção",
            texto: "Acompanhamento direto com cada creator. Cobrança de prazo, ajuste de execução, suporte técnico. Você não vai ficar correndo atrás de ninguém.",
          },
          {
            titulo: "Revisão antes da entrega",
            tagShort: "Revisão",
            texto: "Antes do material chegar em você, ele já passou por revisão. Você recebe entrega, não rascunho.",
          },
          {
            titulo: "Relatório e leitura",
            tagShort: "Relatório",
            texto: "Leitura clara do que performou, o que saturou e o que vamos testar no próximo ciclo. Decisão baseada em dado, não em achismo.",
          },
        ],
      },
      modalidades: {
        title1: "Três formas de trabalhar.",
        title2: "Você escolhe.",
        maisEscolhido: "Mais escolhido",
        idealPara: "Ideal pra",
        cards: [
          {
            name: "Pacote Recorrente Mensal",
            pitch: "Operação contínua pra quem já roda UGC com volume.",
            bullets: [
              "Volume mensal definido",
              "Entrega recorrente, sempre com creators novos no banco",
              "Briefing, roteiro, produção e revisão inclusos",
              "Suporte direto durante o mês inteiro",
            ],
            ideal: "Marcas que já validaram UGC e querem escalar com previsibilidade.",
            cta: "Quero conversar sobre meu plano mensal",
          },
          {
            name: "Campanha Pontual",
            pitch: "Campanha com começo, meio e fim, escopo fechado.",
            bullets: [
              "Lançamento, ativação sazonal ou teste pontual",
              "Escopo fechado de creators e entregas",
              "Briefing, roteiro, produção e revisão",
              "Entrega em prazo definido",
            ],
            ideal: "Marcas que querem testar UGC com qualidade ou têm necessidade pontual em datas específicas.",
            cta: "Quero conversar sobre minha campanha pontual",
          },
          {
            name: "Consultoria Estratégica",
            pitch: "Estrutura pro seu time aplicar, sem terceirizar a execução.",
            bullets: [
              "Diagnóstico do que já é feito hoje",
              "Processos de gestão de UGC pro seu time",
              "Briefing modelo + framework de seleção",
              "Acompanhamento de implementação",
            ],
            ideal: "Marcas com operação interna que querem profissionalizar o que já fazem.",
            cta: "Quero conversar sobre consultoria",
          },
        ],
      },
      processo: {
        title1: "Cinco etapas.",
        title2: "Sem mistério, sem milagre.",
        body: "Esse é o processo que rodei em mais de 100 campanhas. Cada etapa existe porque, sem ela, alguma coisa quebra.",
        etapas: [
          {
            n: "01",
            title: "Diagnóstico",
            body: "Antes de qualquer proposta, conversa de diagnóstico. Eu preciso entender seu produto, seu público, o que você já tentou e onde está hoje. Sem isso, qualquer proposta é chute.",
          },
          {
            n: "02",
            title: "Estratégia e seleção",
            body: "Definimos juntos o objetivo da campanha, os ângulos que vamos testar e o perfil de creator ideal. A partir daí, eu seleciono os creators dentro do meu banco e te apresento já filtrados.",
          },
          {
            n: "03",
            title: "Briefing e roteiro",
            body: "Briefing co-criado, roteiro revisado por mim antes da gravação. Cada creator recebe direção clara, não margem pra interpretação.",
          },
          {
            n: "04",
            title: "Produção e acompanhamento",
            body: "Os creators gravam, eu acompanho. Quando chega ajuste, é antes de você ver. Quando chega entrega na sua mão, já passou por filtro.",
          },
          {
            n: "05",
            title: "Entrega e leitura",
            body: "Material entregue dentro do prazo combinado. Ao final, leitura do que funcionou e plano pro próximo ciclo.",
          },
        ],
      },
      quemSou: {
        eyebrow: "Eu sou",
        title: "Lara",
        titleAccent: "Dam.",
        paragraphs: [
          "Fui uma das primeiras pessoas no Brasil a falar publicamente sobre gestão de campanhas UGC. Não porque planejei. Porque já estava fazendo.",
          "Antes de existir nome bonito pra isso, eu já organizava creator, escrevia briefing, revisava roteiro, cobrava prazo e entregava campanha que funcionava. Aprendi na prática, errando, ajustando e fazendo de novo. E foi assim que construí o método que rodo até hoje.",
          "Em mais de 100 campanhas, com marcas como **OLX, ZAP Imóveis, Magalu, Porto Seguro, Chilli Beans** e muitas outras, uma coisa ficou clara: o que separa campanha boa de campanha que dá errado não é talento isolado de creator. É processo.",
          "Eu não acredito em fórmula mágica. Acredito em fazer o básico bem feito.",
        ],
        brandsHighlight: "OLX, ZAP Imóveis, Magalu, Porto Seguro, Chilli Beans",
      },
      faq: {
        title1: "Perguntas que",
        title2: "recebo com frequência.",
        items: [
          { q: "O que é UGC e por que minha marca precisa disso?", a: "UGC é conteúdo produzido por pessoas reais, com cara de pessoa real. Funciona porque audiência confia em pessoa, não em propaganda. Se sua marca roda mídia paga, redes sociais ou quer presença digital constante, UGC é o formato que mais retém atenção e gera conversão hoje." },
          { q: "Como vocês selecionam os creators?", a: "A partir de um banco com mais de 1.200 perfis ativos, filtramos por nicho, perfil de audiência, estilo de entrega e histórico. Você recebe creators pré-aprovados que fazem sentido pra sua marca, não uma lista genérica." },
          { q: "Quanto tempo leva uma campanha do início à entrega?", a: "Depende do escopo, mas pra te dar uma referência: campanha pontual com 3 a 5 creators leva entre 3 e 5 semanas. Pacote mensal entrega volume contínuo a partir do primeiro mês." },
          { q: "Vocês fazem só o vídeo ou cuidam da estratégia?", a: "Cuidamos da estratégia também. Pra mim, vídeo solto sem direção é onde a maioria das marcas perde dinheiro. Briefing, roteiro e ângulo criativo são parte do que entrego." },
          { q: "Preciso enviar briefing pronto?", a: "Não. Briefing é construído junto com você. Eu pergunto o que precisa ser perguntado pra ter direção clara, e te entrego o briefing finalizado pra você aprovar antes de qualquer creator começar." },
          { q: "Os vídeos são pra orgânico ou pra mídia paga?", a: "Os dois. Eu adapto o formato e o ângulo dependendo de onde você vai usar. Vídeo pra orgânico tem lógica diferente de vídeo pra ads, e isso entra no planejamento." },
          { q: "E se uma entrega não vier do jeito que esperávamos?", a: "Antes de chegar em você, eu já revisei. Se ainda assim algo precisa ajustar, ajustamos sem custo adicional dentro do escopo combinado. Faz parte do processo." },
          { q: "Vocês garantem resultado em vendas ou ROAS?", a: "Não garanto venda nem ROAS, e quem garante isso na primeira campanha está te enganando. O que garanto é entrega bem feita, conteúdo com lógica e processo claro. Resultado de venda depende da sua oferta, do seu funil e do seu produto. UGC bem feito é peça do quebra-cabeça, não o quebra-cabeça inteiro." },
          { q: "Como funciona a cobrança?", a: "Pacote mensal: contrato com valor fixo mensal, definido conforme volume. Campanha pontual: orçamento fechado, pago em parcelas conforme escopo. Consultoria: valor definido após diagnóstico. Tudo formalizado em contrato. Sem surpresa." },
          { q: "Como começo?", a: "Clica no botão abaixo, agendamos uma conversa de diagnóstico, e a partir dali eu monto proposta sob medida pra sua marca. Conversa não tem custo." },
        ],
      },
      ctaFinal: {
        title1: "Sua marca não precisa de mais um vídeo.",
        title2: "Precisa de uma campanha que funcione.",
        paragraphs: [
          "Se você chegou até aqui, é porque alguma coisa do que eu falei bateu. Talvez seu time esteja sobrecarregado, talvez você já tenha rodado UGC e não funcionou, talvez você só queira começar do jeito certo.",
          "De qualquer forma, o próximo passo é simples: a gente conversa, eu entendo seu momento, e a partir dali decidimos juntos se faz sentido trabalhar.",
          "Sem proposta enlatada. Sem promessa que eu não posso cumprir. Conversa real pra entender se o que eu faço é o que sua marca precisa agora.",
        ],
        cta: "Quero conversar sobre minha campanha",
        ctaSub: "Resposta em até 24h. Diagnóstico inicial sem custo.",
      },
      contactForm: {
        tag: "#contato",
        title1: "Vamos conversar sobre",
        title2: "sua campanha?",
        subtitle: "Diagnóstico gratuito antes de qualquer proposta. Resposta em até 24h.",
        successEmoji: "🚀",
        successTitle: "Recebido!",
        successBody: "Entro em contato em até 24h.",
        labels: {
          name: "Nome completo",
          email: "E-mail",
          whatsapp: "Whatsapp",
          company: "Empresa",
          role: "Cargo",
          site: "Site",
          modality: "Modalidade de interesse",
          goal: "Objetivo principal",
          budget: "Orçamento estimado",
          message: "Conta sobre o projeto",
        },
        placeholders: {
          whatsapp: "(   )",
          message: "Prazo, momento da marca, o que você já tentou...",
        },
        options: {
          roles: ["Marketing", "Growth / Performance", "Founder / C-level", "Social Media", "Outro"],
          modalities: ["Pacote mensal recorrente", "Campanha pontual", "Consultoria estratégica", "Não sei ainda — quero diagnóstico"],
          goals: ["Conteúdo pra mídia paga", "Always-on no TikTok/Instagram", "Lançamento de campanha", "Presença digital da marca"],
          budgets: ["Até R$ 5.000", "R$ 5.000 a R$ 15.000", "R$ 15.000 a R$ 50.000", "+R$ 50.000", "A definir"],
        },
        next: "Avançar",
        back: "← Voltar",
        submit: "Enviar",
      },
    },
  },
  en: {
    nav: {
      sobre: "About",
      servicos: "Services",
      categorias: "Categories",
      contato: "Contact",
      gestao: "Management",
      gestaoComingSoon: "Coming soon",
      trabalheComigo: "Work with me",
    },
    hero: {
      badge: "UGC Creator & Content Strategist · Available 2026",
      title1: "Creating content",
      title2: "that",
      titleAccent: "converts",
      body1: "From hook to CTA, every second built to perform.",
      metrics:
        "500+ videos  |  200+ brand partners  |  100M+ views.",
      cta: "Let's create together",
      saibaMais: "Learn more →",
      bubble1Title: "Delivery was perfect!",
      bubble1Sub: "Super on-brief",
      bubble2Title: "CTR record on Meta",
      bubble2Sub: "+100M views · InfinitePay",
    },
    marquee: [
      "Conversion UGC",
      "High-Performance Creatives",
      "Strategic Scripts",
      "Lifestyle Photos",
      "E-commerce Content",
      "UGC Consulting",
      "Sponsored Posts",
    ],
    stats: [
      { value: "500+", label: "Videos shot" },
      { value: "200+", label: "Brand partners" },
      { value: "100M+", label: "Total views" },
      { value: "2 years", label: "Of experience" },
    ],
    about: {
      tag: "About me",
      greeting1: "Hi, I'm",
      greetingName: "Lara Dam",
      body1:
        "I'm **27**, a **UGC Creator and content strategist** based on the coast of São Paulo. In **2 years**, I've shot **500+ videos** and worked with **200+ brands**, building real connections and high-conversion strategies. My analytical eye turns product into desire, with **authentic content** that drives authority and results.",
      body2:
        "Over **140M views** in campaigns, **CTR records on Meta**, **CPA reduced by up to 38%** and **2.4x ROAS**. Content that became a creative playbook for brands like **InfinitePay**, **Méliuz** and **DT3**.",
      pillBrands: "200+ brand partners",
      pillLocation: "Coast of SP · Brazil",
      etapa: "Step",
      primeiroContato: "First contact",
      criacao: "Creation",
      entrega: "Delivery",
      bubblePerfeitaTitle: "Delivery was perfect!",
      bubblePerfeitaSub: "Super on-brief",
    },
    brandsMarquee: { title: "Brands that trust my work" },
    services: {
      tag: "Services",
      title1: "What we can",
      title2: "create",
      titleAccent: "together",
      intro:
        "These are the formats where my UGC campaign management can help your brand win more customers and drive real results.",
      scrollHint: "Swipe to see more →",
      items: [
        {
          title: "Conversion UGC",
          description: "Authentic videos built to sell.",
          cta: "I want UGC that converts",
        },
        {
          title: "Paid Media Creatives",
          description: "Ads optimized for Meta, TikTok and YouTube.",
          cta: "I want to create ads",
        },
        {
          title: "Strategic Scripts",
          description: "Scripts validated by performance.",
          cta: "I want high-performing scripts",
        },
        {
          title: "Lifestyle Photos",
          description: "Art-directed images for campaigns.",
          cta: "I want photos for my brand",
        },
        {
          title: "E-commerce Content",
          description: "Monthly packages to keep your feed alive.",
          cta: "I want recurring content",
        },
        {
          title: "UGC Consulting",
          description: "Briefing, curation and creator direction.",
          cta: "I want consulting",
        },
      ],
    },
    bestResults: {
      tag: "Content that went viral",
      title1: "The best",
      titleAccent: "results",
      eyeline: "Have you seen me out there? 👀",
      body1Pre: "Over ",
      body1ViewsHi: "140M views",
      body1Mid:
        " in campaigns — CTR records on Meta, CPA reduced by up to ",
      body1Cpa: "38%",
      body1Mid2: " and ROAS of ",
      body1Roas: "2.4x",
      body1End:
        ". Content that became a creative playbook for brands like InfinitePay, Méliuz and DT3.",
      audioCardTitle: "Client testimonial",
      audioCardNow: "now",
      highlights: [
        { metric: "+ 100M views", platform: "on TikTok alone" },
        { metric: "+ 30M views", platform: "on TikTok alone" },
        { metric: "5.94x ROAS", platform: "performance ads" },
        {
          metric: "1,023 videos",
          platform: "360° campaign",
          stats: [
            { value: "5.6M", label: "total views" },
            { value: "66k", label: "total saves" },
          ],
        },
      ],
    },
    categories: {
      tag: "Categories",
      title1: "What kind of",
      titleAccent: "content",
      title2: "do you need?",
      intro:
        "Browse by niche. Each row is a specialty — swipe sideways to see more.",
      comingSoon: "Coming soon in this category.",
      items: [
        {
          slug: "beleza",
          name: "Beauty",
          tagline: "Products that become a ritual",
        },
        {
          slug: "casa",
          name: "Home & Deco",
          tagline: "Spaces that inspire",
        },
        {
          slug: "gastronomia",
          name: "Gastronomy",
          tagline: "Food that makes your mouth water",
        },
        {
          slug: "food",
          name: "Drinks & Desserts",
          tagline: "Drinks, sweets and flavors that turn into desire",
        },
        {
          slug: "tech",
          name: "Tech & Apps",
          tagline: "Apps and gadgets in human language",
        },
        {
          slug: "moda",
          name: "Fashion",
          tagline: "Outfits that tell a story",
        },
        {
          slug: "viagem",
          name: "Travel",
          tagline: "Experiences & destinations",
        },
      ],
    },
    youtubeAds: {
      tag: "YouTube Ads",
      title1: "Your brand on",
      title2: "YouTube",
      subline1: "More visibility,",
      subline2: "more strategy,",
      subline3: "more results!",
      bodyPre: "All of this with videos built for ",
      bodyAccent: "YouTube Ads",
      bodyEnd: ".",
      viewsLabel: "views",
    },
    testimonials: {
      tag: "Testimonials",
      title1: "What they say",
      titleAccent: "about the work",
      intro:
        "Feedback from brands that saw the difference of UGC built for performance.",
      quotes: [
        {
          quote:
            "Lara delivers way beyond what we ask for. She gets performance and the video came ready to run as a creative — it broke the CTR record on Meta.",
          role: "Record-breaking video on Meta",
          metricLabel: "views on 1 video",
        },
        {
          quote:
            "I work with several creators and Lara converts the most. Sharp scripts, fast delivery, and she nails brief direction on the first review.",
          role: "Script + creative for growth",
          metricLabel: "views · grocery campaign",
        },
        {
          quote:
            "We've closed 4 campaigns and each one performed better than the last. Lara became part of our creative playbook.",
          role: "Recurring creative playbook",
          metricLabel: "active campaigns",
        },
        {
          quote:
            "Lara did an incredible job. We loved the result of the video, the quality and the attention to understanding the demand. Highly recommended.",
          role: "Content for e-commerce + ads",
          metricLabel: "ROAS · e-commerce with ads",
        },
        {
          quote:
            "Lara's work was incredible. She fully covered the event, filmed every detail and added SO MUCH for the brands. She was the creator who generated the most content for BF 2024.",
          role: "On-site event content",
          metricLabel: "videos during BF event",
        },
        {
          quote:
            "Lara delivered a really cool, well-made piece of content. We'll definitely want to work together again!",
          role: "Recipe campaign",
          metricLabel: "reach on reels",
        },
        {
          quote:
            "High-level UGC mastery: script, narrative, natural performance on camera and editing. Smooth communication at every step!",
          role: "Content for e-commerce + ads",
          metricLabel: "e-commerce sales with ads",
        },
      ],
    },
    contact: {
      tag: "Contact",
      title1: "Let's create something",
      titleAccent: "together",
      titleEnd: "",
      body: "Tell me a bit about your brand and what you want to achieve. I reply within 48h.",
      name: "Name",
      namePh: "Your name",
      email: "Email",
      emailPh: "you@brand.com",
      brand: "Brand / Company",
      brandPh: "Brand name",
      budget: "Estimated budget",
      budgetPh: "e.g.: $1,000 – $3,000",
      message: "Tell me about the project",
      messagePh: "Category, format, deadline, campaign goal...",
      send: "Send message",
      sending: "Sending...",
      sent: "Sent! I'll get back to you soon.",
    },
    footer: { role: "UGC Creator & Content Strategist" },
    popup: {
      tag: "Let's chat?",
      title: "Enjoying the portfolio?",
      body: "Drop your contact and I'll send tailored content ideas for your brand.",
      name: "Your name",
      email: "Your email",
      phone: "Phone (optional)",
      cta: "Send me ideas",
      sending: "Sending...",
      privacy: "No spam, promise. Just relevant content.",
      successTitle: "Got it!",
      successBody: "I'll be in touch soon.",
      error: "Something went wrong, try again?",
    },
    gestao: {
      hero: {
        tag: "laradam.management",
        titleLine1: "UGC campaign",
        titleLine2: "management",
        subtitle: "from briefing to delivery.",
        body: "We handle the full process for your company: selecting the right creators, briefing aligned with your positioning, scripts reviewed, production tracked, delivery on time.",
        bodyBold: "You run media. We run the operation.",
        cta: "Let's talk about my campaign",
        ctaSub: "Reply within 24h. Free diagnosis before any proposal.",
        stats: {
          campanhas: "campaigns managed",
          marcas: "brands served",
          creators: "creators in network",
        },
        bubble: "Creator to creator",
      },
      marquee: {
        item1: "No rework",
        item2: "No improv",
        item3: "Clear process",
      },
      cases: {
        title1: "Content managed",
        title2: "by our team.",
        subtitle: "Meet some of the creators who could make content for your brand.",
        stats: {
          campanhas: "campaigns managed",
          creators: "creators in network",
          videos: "videos produced",
        },
        emBreve: "Coming soon",
      },
      oQueFaco: {
        title1: "End-to-end management.",
        title2: "Without building an in-house team.",
        body: "I run the campaign from start to finish. You set the goal, I deliver what goes live.",
        etapa: "Step",
        de: "of",
        items: [
          {
            titulo: "Creator selection",
            tagShort: "Selection",
            texto: "Hunting with criteria, not mass messaging. Profile aligned with your persona, delivery track record, niche fit and real availability. You get pre-approved creators.",
          },
          {
            titulo: "Co-built briefing",
            tagShort: "Briefing",
            texto: "Built with you, translating brand positioning into creative direction the creator understands and executes. A clear briefing is half the work.",
          },
          {
            titulo: "Reviewed scripts",
            tagShort: "Script",
            texto: "Every campaign I run has the script reviewed by me before the creator records. It's where most campaigns derail in the market, and where I focus the most so yours doesn't.",
          },
          {
            titulo: "Tracked production",
            tagShort: "Production",
            texto: "Direct follow-up with each creator. Deadline tracking, execution adjustments, technical support. You won't be chasing anyone.",
          },
          {
            titulo: "Pre-delivery review",
            tagShort: "Review",
            texto: "Before the material reaches you, it's already been reviewed. You get a delivery, not a draft.",
          },
          {
            titulo: "Reporting and analysis",
            tagShort: "Report",
            texto: "Clear read on what performed, what saturated, and what we'll test in the next cycle. Decisions based on data, not guesses.",
          },
        ],
      },
      modalidades: {
        title1: "Three ways to work together.",
        title2: "You choose.",
        maisEscolhido: "Most chosen",
        idealPara: "Ideal for",
        cards: [
          {
            name: "Monthly Recurring Package",
            pitch: "Continuous operation for those already running UGC at volume.",
            bullets: [
              "Defined monthly volume",
              "Recurring delivery, always with new creators from the database",
              "Briefing, script, production and review included",
              "Direct support throughout the month",
            ],
            ideal: "Brands that have validated UGC and want to scale predictably.",
            cta: "Let's talk about my monthly plan",
          },
          {
            name: "One-off Campaign",
            pitch: "Campaign with start, middle and end, fixed scope.",
            bullets: [
              "Launch, seasonal activation or specific test",
              "Closed scope of creators and deliverables",
              "Briefing, script, production and review",
              "Delivery in defined timeframe",
            ],
            ideal: "Brands that want to test UGC with quality or have specific needs on key dates.",
            cta: "Let's talk about my one-off campaign",
          },
          {
            name: "Strategic Consulting",
            pitch: "Structure for your team to apply, without outsourcing execution.",
            bullets: [
              "Diagnosis of what's done today",
              "UGC management processes for your team",
              "Briefing template + selection framework",
              "Implementation follow-up",
            ],
            ideal: "Brands with internal operations that want to professionalize what they already do.",
            cta: "Let's talk about consulting",
          },
        ],
      },
      processo: {
        title1: "Five steps.",
        title2: "No mystery, no miracle.",
        body: "This is the process I've run in over 100 campaigns. Each step exists because, without it, something breaks.",
        etapas: [
          {
            n: "01",
            title: "Diagnosis",
            body: "Before any proposal, a diagnosis call. I need to understand your product, your audience, what you've already tried and where you are today. Without that, any proposal is a guess.",
          },
          {
            n: "02",
            title: "Strategy and selection",
            body: "Together we define the campaign goal, the angles to test and the ideal creator profile. From there, I select creators from my database and present them already filtered.",
          },
          {
            n: "03",
            title: "Briefing and script",
            body: "Co-built briefing, script reviewed by me before recording. Each creator gets clear direction, no margin for interpretation.",
          },
          {
            n: "04",
            title: "Production and follow-up",
            body: "Creators record, I follow up. When adjustments are needed, it happens before you see it. When the delivery reaches you, it's already been filtered.",
          },
          {
            n: "05",
            title: "Delivery and analysis",
            body: "Material delivered within the agreed timeline. At the end, a read on what worked and a plan for the next cycle.",
          },
        ],
      },
      quemSou: {
        eyebrow: "I am",
        title: "Lara",
        titleAccent: "Dam.",
        paragraphs: [
          "I was one of the first people in Brazil to publicly talk about UGC campaign management. Not because I planned it. Because I was already doing it.",
          "Before there was a fancy name for it, I was already organizing creators, writing briefings, reviewing scripts, chasing deadlines and delivering campaigns that worked. I learned in practice, by failing, adjusting and doing it again. That's how I built the method I run today.",
          "In over 100 campaigns, with brands like **OLX, ZAP Imóveis, Magalu, Porto Seguro, Chilli Beans** and many others, one thing became clear: what separates a good campaign from one that flops isn't isolated creator talent. It's process.",
          "I don't believe in magic formulas. I believe in doing the basics well.",
        ],
        brandsHighlight: "OLX, ZAP Imóveis, Magalu, Porto Seguro, Chilli Beans",
      },
      faq: {
        title1: "Questions I get",
        title2: "all the time.",
        items: [
          { q: "What is UGC and why does my brand need it?", a: "UGC is content produced by real people, looking like real people. It works because audiences trust people, not advertising. If your brand runs paid media, social or wants consistent digital presence, UGC is the format that grabs attention and converts most today." },
          { q: "How do you select the creators?", a: "From a database with over 1,200 active profiles, we filter by niche, audience profile, delivery style and history. You get pre-approved creators that fit your brand, not a generic list." },
          { q: "How long does a campaign take from start to delivery?", a: "Depends on scope, but as a reference: a one-off campaign with 3 to 5 creators takes 3 to 5 weeks. Monthly package delivers continuous volume from the first month." },
          { q: "Do you only do the video or also handle strategy?", a: "We handle strategy too. To me, a video without direction is where most brands lose money. Briefing, script and creative angle are part of what I deliver." },
          { q: "Do I need to provide a complete briefing?", a: "No. Briefing is built together with you. I ask what needs to be asked to get clear direction, and deliver the finalized briefing for you to approve before any creator starts." },
          { q: "Are videos for organic or paid media?", a: "Both. I adapt format and angle depending on where you'll use it. Organic video has a different logic than ad video, and that's part of the planning." },
          { q: "What if a delivery doesn't come out as expected?", a: "Before reaching you, I've already reviewed it. If something still needs adjusting, we adjust at no additional cost within the agreed scope. It's part of the process." },
          { q: "Do you guarantee sales or ROAS results?", a: "I don't guarantee sales or ROAS, and anyone guaranteeing that on the first campaign is misleading you. What I guarantee is well-done delivery, content with logic and clear process. Sales results depend on your offer, funnel and product. Well-done UGC is part of the puzzle, not the whole puzzle." },
          { q: "How does billing work?", a: "Monthly package: contract with a fixed monthly value, defined by volume. One-off campaign: closed budget, paid in installments based on scope. Consulting: value defined after diagnosis. Everything formalized in contract. No surprises." },
          { q: "How do I get started?", a: "Click the button below, we schedule a diagnosis call, and from there I build a tailored proposal for your brand. The conversation is free." },
        ],
      },
      ctaFinal: {
        title1: "Your brand doesn't need another video.",
        title2: "It needs a campaign that works.",
        paragraphs: [
          "If you've made it this far, something I said resonated. Maybe your team is overloaded, maybe you've already run UGC and it didn't work, maybe you just want to start the right way.",
          "Either way, the next step is simple: we talk, I understand your moment, and from there we decide together if it makes sense to work together.",
          "No canned proposal. No promise I can't keep. A real conversation to figure out if what I do is what your brand needs right now.",
        ],
        cta: "Let's talk about my campaign",
        ctaSub: "Reply within 24h. Initial diagnosis at no cost.",
      },
      contactForm: {
        tag: "#contact",
        title1: "Let's talk about",
        title2: "your campaign?",
        subtitle: "Free diagnosis before any proposal. Reply within 24h.",
        successEmoji: "🚀",
        successTitle: "Got it!",
        successBody: "I'll be in touch within 24h.",
        labels: {
          name: "Full name",
          email: "Email",
          whatsapp: "WhatsApp",
          company: "Company",
          role: "Role",
          site: "Website",
          modality: "Interested in",
          goal: "Main goal",
          budget: "Estimated budget",
          message: "Tell me about the project",
        },
        placeholders: {
          whatsapp: "(   )",
          message: "Timeline, brand moment, what you've already tried...",
        },
        options: {
          roles: ["Marketing", "Growth / Performance", "Founder / C-level", "Social Media", "Other"],
          modalities: ["Monthly recurring package", "One-off campaign", "Strategic consulting", "Not sure yet — want diagnosis"],
          goals: ["Content for paid media", "Always-on on TikTok/Instagram", "Campaign launch", "Brand digital presence"],
          budgets: ["Up to $1,000", "$1,000 to $3,000", "$3,000 to $10,000", "+$10,000", "TBD"],
        },
        next: "Next",
        back: "← Back",
        submit: "Send",
      },
    },
  },
};

export function useT(): Dict {
  const { lang } = useLang();
  return dict[lang];
}
