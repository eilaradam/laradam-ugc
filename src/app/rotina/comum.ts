// Cores, séries e datas que as abas da Rotina dividem.

export const C = { fundo: "#F2F1ED", roxo: "#6C3CF5", roxoClaro: "#EEE8FE", limao: "#DCFB4E", rosa: "#DB4FA0", preto: "#18181B", suave: "#5B5B66" };

export const SERIES: Record<string, { nome: string; cor: string; tinta: string }> = {
  claude: { nome: "Fiz com o Claude", cor: C.roxo, tinta: "#fff" },
  dica: { nome: "Dica completa", cor: C.limao, tinta: C.preto },
  aluna: { nome: "Antes e depois", cor: C.rosa, tinta: "#fff" },
  bastidor: { nome: "Bastidor", cor: C.preto, tinta: "#fff" },
  venda: { nome: "Venda", cor: "#F5B301", tinta: C.preto },
};

export type Item = {
  id: string;
  data: string;
  serie: string | null;
  formato: string | null;
  titulo: string;
  gancho: string | null;
  roteiro: string | null;
  legenda: string | null;
  checklist: { t: string; ok: boolean }[];
  takes_url: string | null;
  status: string;
};

export type Ideia = {
  id: string;
  titulo: string;
  descricao: string | null;
  formato: string | null;
  status: string;
  tags: string[] | null;
  favorita: boolean;
  roteiro: { gancho?: string | null; desenvolvimento?: string[] | null; cta?: string | null } | null;
  created_at: string;
};

export type Marco = { t: string; tipo: "campanha" | "data" };
export type Plano = {
  narrativa: { quem: string; praQuem: string; vende: string; quer: string; trava: string; pesquisa: string };
  frequencia: { reels: number; carrossel: number };
  meses: Record<string, { tema: string; marcos: Marco[] }>;
};

export const PLANO_VAZIO: Plano = {
  narrativa: { quem: "", praQuem: "", vende: "", quer: "", trava: "", pesquisa: "" },
  frequencia: { reels: 2, carrossel: 2 },
  meses: {},
};

export const hojeSP = () => new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
export const diaBonito = (d: string) =>
  new Date(d + "T12:00:00").toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" }).replace(".", "");
export const isoDe = (d: Date) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");

/** Segunda-feira da semana de uma data (YYYY-MM-DD). */
export function segundaDe(dia: string) {
  const d = new Date(dia + "T12:00:00");
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return isoDe(d);
}

/** "Carrossel 7 slides" conta como carrossel; qualquer outro com Reels conta como Reels. */
export function tipoDoFormato(f: string | null): "reels" | "carrossel" | "outro" {
  const s = (f ?? "").toLowerCase();
  if (s.startsWith("carrossel")) return "carrossel";
  if (s.includes("reel")) return "reels";
  if (s.includes("carrossel")) return "carrossel";
  return "outro";
}
