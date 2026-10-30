// Tipos e utilidades dos roteiros compartilhados (/roteiro/<slug>).
// Usado no servidor e no cliente.

export type Exemplo = {
  titulo: string;
  nota?: string;
  /** id do YouTube (Shorts ou normal) */
  youtube?: string;
  /** mp4 local (public/...) ou URL */
  mp4?: string;
};

export type Gancho = {
  id: string; // "A", "B", "C"
  titulo: string;
  fala: string;
  tela?: string;
  recomendado?: boolean;
  exemplo?: Exemplo;
};

export type Parte = {
  id: string;
  nome: string;
  tempo?: string;
  fala: string;
  tela?: string;
  exemplo?: Exemplo;
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
  exemplos?: Exemplo[];
  /** texto do botão na prévia do celular (ex.: "Saiba mais") */
  cta?: string;
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

/** Segundos de fala estimados (~2,6 palavras por segundo, ritmo de UGC). */
export function segundosDeFala(texto: string) {
  const palavras = texto.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(3, palavras / 2.6);
}
