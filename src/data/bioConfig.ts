// Tipos do conteudo editavel do /bio (guardado na tabela bio_config do Supabase)

export type BioRede = { rede: string; url: string };

export type BioProduto = {
  id: string;
  titulo: string;
  capaCor: string;
  imagem: string;
  preco: string;
  descricao: string;
  cta: string;
  checkout: string;
  tags: string[];
};

export type BioWhats = {
  categoria: string;
  numero: string;
  numeroExibicao: string;
  mensagem: string;
  cor: string;
};

export type BioPost = { cor: string; imagem: string; legenda: string };

export type BioChatOpcao = { label: string; tags?: string[]; proximo: string };
export type BioChatPasso = {
  tipo: string;
  texto: string;
  proximo?: string;
  opcoes?: BioChatOpcao[];
  placeholder?: string;
};

export type BioConfig = {
  perfil: { nome: string; subtitulo: string; foto: string };
  redes: BioRede[];
  chat: {
    tituloCard: string;
    atendente: string;
    boasVindas: string;
    passoInicial: string;
    passos: Record<string, BioChatPasso>;
  };
  produtos: BioProduto[];
  linkExterno: {
    titulo: string;
    descricao: string;
    thumbCor: string;
    imagem: string;
    url: string;
  };
  spotify: { nome: string; url: string };
  whatsapp: BioWhats[];
  instagram: { usuario: string; url: string; posts: BioPost[] };
  plataforma: { nome: string; descricao: string; url: string; atribuicao: string };
  textos: { tituloCarrossel: string; tituloCatalogo: string };
};

export const REDES_DISPONIVEIS = [
  "instagram",
  "tiktok",
  "youtube",
  "linkedin",
] as const;
