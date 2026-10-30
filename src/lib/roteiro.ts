// Tipos e utilidades dos roteiros compartilhados (/roteiro/<slug>).
// Usado no servidor e no cliente.

/** Link de referência (Instagram, TikTok, YouTube, Drive…) que a Lara coloca pra marca assistir. */
export type Ref = { url: string; titulo?: string };

export type Gancho = {
  id: string; // "A", "B", "C"
  titulo: string;
  fala: string;
  tela?: string;
  recomendado?: boolean;
  fotos?: string[];
  refs?: Ref[];
};

export type Parte = {
  id: string;
  nome: string;
  tempo?: string;
  fala: string;
  tela?: string;
  fotos?: string[];
  refs?: Ref[];
};

export type RoteiroConteudo = {
  marca: string;
  creator: string;
  formato: string;
  duracao: string;
  conceito?: string;
  regra?: string;
  ganchos: Gancho[];
  partes: Parte[];
  /** referências gerais do roteiro */
  refs?: Ref[];
};

export type RoteiroPublico = {
  slug: string;
  conteudo: RoteiroConteudo;
  gancho_escolhido: string | null;
  gancho_escolhido_por: string | null;
  aprovado_em: string | null;
  aprovado_por: string | null;
  updated_at: string;
};

export type Nota = {
  id: string;
  parent_id: string | null;
  alvo: string;
  tipo: "comentario" | "sugestao" | "resposta";
  autor: string;
  autor_lara: boolean;
  texto: string | null;
  original: string | null;
  sugerido: string | null;
  status: "aberta" | "aceita" | "recusada" | "resolvida";
  created_at: string;
};

// Alvo = endereço de um trecho editável: "geral:conceito", "gancho:A:fala", "parte:antes:tela".
const CAMPOS_GERAL = ["conceito", "regra"] as const;
const CAMPOS_GANCHO = ["titulo", "fala", "tela"] as const;
const CAMPOS_PARTE = ["nome", "fala", "tela"] as const;

export function lerAlvo(c: RoteiroConteudo, alvo: string): string | undefined {
  const [sec, id, campo] = alvo.split(":");
  if (sec === "geral" && (CAMPOS_GERAL as readonly string[]).includes(id)) {
    return c[id as (typeof CAMPOS_GERAL)[number]];
  }
  if (sec === "gancho" && (CAMPOS_GANCHO as readonly string[]).includes(campo)) {
    return c.ganchos.find((g) => g.id === id)?.[campo as (typeof CAMPOS_GANCHO)[number]];
  }
  if (sec === "parte" && (CAMPOS_PARTE as readonly string[]).includes(campo)) {
    return c.partes.find((p) => p.id === id)?.[campo as (typeof CAMPOS_PARTE)[number]];
  }
  return undefined;
}

/** Devolve uma cópia com o texto do alvo trocado, ou null se o alvo não existe. */
export function gravarAlvo(c: RoteiroConteudo, alvo: string, texto: string): RoteiroConteudo | null {
  const novo: RoteiroConteudo = structuredClone(c);
  const [sec, id, campo] = alvo.split(":");
  if (sec === "geral" && (CAMPOS_GERAL as readonly string[]).includes(id)) {
    novo[id as (typeof CAMPOS_GERAL)[number]] = texto;
    return novo;
  }
  if (sec === "gancho") {
    const g = novo.ganchos.find((x) => x.id === id);
    if (!g || !(CAMPOS_GANCHO as readonly string[]).includes(campo)) return null;
    g[campo as (typeof CAMPOS_GANCHO)[number]] = texto;
    return novo;
  }
  if (sec === "parte") {
    const p = novo.partes.find((x) => x.id === id);
    if (!p || !(CAMPOS_PARTE as readonly string[]).includes(campo)) return null;
    p[campo as (typeof CAMPOS_PARTE)[number]] = texto;
    return novo;
  }
  return null;
}

export type Pedaco = { t: string; tipo: "igual" | "saiu" | "entrou" };

/** Diff por palavra (LCS). Os roteiros são curtos, então O(n·m) basta. */
export function diffPalavras(a: string, b: string): Pedaco[] {
  const A = a.split(/(\s+)/).filter(Boolean);
  const B = b.split(/(\s+)/).filter(Boolean);
  const n = A.length;
  const m = B.length;
  const L: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      L[i][j] = A[i] === B[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const out: Pedaco[] = [];
  const push = (t: string, tipo: Pedaco["tipo"]) => {
    const ult = out[out.length - 1];
    if (ult && ult.tipo === tipo) ult.t += t;
    else out.push({ t, tipo });
  };
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (A[i] === B[j]) {
      push(A[i], "igual");
      i++;
      j++;
    } else if (L[i + 1][j] >= L[i][j + 1]) push(A[i++], "saiu");
    else push(B[j++], "entrou");
  }
  while (i < n) push(A[i++], "saiu");
  while (j < m) push(B[j++], "entrou");
  return out;
}

/** Bloco que guarda fotos e links: "geral", "gancho:A" ou "parte:<id>". */
export function blocoDe(c: RoteiroConteudo, bloco: string): { fotos?: string[]; refs?: Ref[] } | undefined {
  const [sec, id] = bloco.split(":");
  if (sec === "geral") return c;
  if (sec === "gancho") return c.ganchos.find((g) => g.id === id);
  if (sec === "parte") return c.partes.find((p) => p.id === id);
  return undefined;
}

export type TipoRef =
  | { tipo: "youtube"; id: string }
  | { tipo: "instagram"; id: string }
  | { tipo: "tiktok"; id: string }
  | { tipo: "link"; host: string };

export function tipoRef(url: string): TipoRef {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return { tipo: "link", host: url };
  }
  const host = u.hostname.replace(/^www\./, "");
  if (host === "youtu.be") return { tipo: "youtube", id: u.pathname.slice(1) };
  if (host.endsWith("youtube.com")) {
    const id = u.searchParams.get("v") ?? u.pathname.match(/\/(?:shorts|embed|live)\/([\w-]+)/)?.[1];
    if (id) return { tipo: "youtube", id };
  }
  if (host.endsWith("instagram.com")) {
    const id = u.pathname.match(/\/(?:reel|reels|p|tv)\/([\w-]+)/)?.[1];
    if (id) return { tipo: "instagram", id };
  }
  if (host.endsWith("tiktok.com")) {
    const id = u.pathname.match(/\/video\/(\d+)/)?.[1];
    if (id) return { tipo: "tiktok", id };
  }
  return { tipo: "link", host };
}
