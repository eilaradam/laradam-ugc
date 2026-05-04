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
        "Tenho 27 anos e sou UGC Creator e estrategista de conteúdo no Litoral de SP. Com 2 anos de experiência, meu trabalho é focado em criar conexões reais e estratégias de alta conversão para marcas que buscam destaque. Com uma bagagem sólida de mais de 500 vídeos gravados e parcerias com mais de 200 parceiros, utilizo meu olhar analítico para transformar produtos em desejos de consumo, garantindo autoridade e resultados concretos através de um conteúdo autêntico e humano.",
      body2:
        "Mais de 140M de views em campanhas, recorde de CTR no Meta, CPA reduzido em até 38% e ROAS de 2.4x. Conteúdo que virou playbook de criativo pra marcas como InfinitePay, Méliuz e DT3.",
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
        "I'm 27 years old, a UGC Creator and content strategist based on the coast of São Paulo, Brazil. With 2 years of experience, my work is focused on building real connections and high-conversion strategies for brands that want to stand out. With a solid track record of 500+ videos and partnerships with 200+ brands, I use an analytical eye to turn products into desire — delivering authority and concrete results through authentic, human content.",
      body2:
        "Over 140M views in campaigns, CTR records on Meta, CPA reduced by up to 38% and 2.4x ROAS. Content that became a creative playbook for brands like InfinitePay, Méliuz and DT3.",
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
  },
};

export function useT(): Dict {
  const { lang } = useLang();
  return dict[lang];
}
