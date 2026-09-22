/**
 * Datas comerciais que interessam pra uma marca contratar conteúdo.
 * A tag da capa olha essa lista, acha a PRÓXIMA data que ainda vai acontecer
 * e mostra a contagem sozinha. Não precisa mexer em nada todo ano: as datas
 * móveis (Dia das Mães, dos Pais, Black Friday) são calculadas pelo ano corrente.
 *
 * Pra adicionar uma data nova, é só somar um item em DATAS_COMERCIAIS.
 * `janela` = a quantos dias de distância a tag começa a aparecer.
 */

export type DataComercial = {
  nome: string;
  /** Recebe o ano e devolve a data daquele ano. */
  quando: (ano: number) => Date;
  /** Frase curta, falando com a marca. */
  recado: string;
  /** Só aparece quando faltar esse tanto de dias ou menos. */
  janela: number;
  /** Data grande do ano: a faixa do topo fica maior e com o selo. */
  destaque?: boolean;
  /** Frases extras que rodam na vertical dentro da faixa (além do recado). */
  linhas?: string[];
};

/** Ex: 2º domingo de maio (Dia das Mães). */
function domingoDaSemana(ano: number, mes: number, n: number): Date {
  const d = new Date(ano, mes - 1, 1);
  const primeiro = 1 + ((7 - d.getDay()) % 7); // primeiro domingo
  return new Date(ano, mes - 1, primeiro + (n - 1) * 7);
}

/** Ex: última sexta de novembro (Black Friday). */
function ultimaSexta(ano: number, mes: number): Date {
  const ultimo = new Date(ano, mes, 0); // último dia do mês
  const recuo = (ultimo.getDay() - 5 + 7) % 7;
  return new Date(ano, mes - 1, ultimo.getDate() - recuo);
}

const dia = (mes: number, d: number) => (ano: number) => new Date(ano, mes - 1, d);

export const DATAS_COMERCIAIS: DataComercial[] = [
  {
    nome: "Black Friday",
    quando: (a) => ultimaSexta(a, 11),
    recado: "reserve a sua agenda de novembro",
    janela: 100,
    destaque: true,
    linhas: [
      "criativos de tráfego prontos antes do pico",
      "vídeo de e-commerce que vende no dia",
      "roteiros validados por performance",
      "poucas vagas pra gravar em novembro",
    ],
  },
  {
    nome: "o Natal",
    quando: dia(12, 25),
    recado: "vamos gravar a sua campanha de fim de ano?",
    janela: 60,
  },
  {
    nome: "o Dia do Consumidor",
    quando: dia(3, 15),
    recado: "a Black Friday do primeiro semestre",
    janela: 45,
  },
  {
    nome: "o Dia das Mães",
    quando: (a) => domingoDaSemana(a, 5, 2),
    recado: "a data mais emocionante do varejo",
    janela: 55,
  },
  {
    nome: "o Dia dos Namorados",
    quando: dia(6, 12),
    recado: "ainda dá tempo de fazer bonito",
    janela: 40,
  },
  {
    nome: "o Dia dos Pais",
    quando: (a) => domingoDaSemana(a, 8, 2),
    recado: "bora gravar a sua campanha?",
    janela: 50,
  },
  {
    nome: "o Dia do Cliente",
    quando: dia(9, 15),
    recado: "hora de agradecer quem compra de você",
    janela: 35,
  },
];

export type Contagem = {
  nome: string;
  recado: string;
  dias: number;
  destaque: boolean;
  /** O recado primeiro, depois as frases extras. É o que roda na faixa. */
  linhas: string[];
};

/**
 * A próxima data dentro da janela dela. Devolve null quando não tem nada
 * chegando, e aí a capa mostra a linha normal.
 */
export function proximaData(hoje = new Date()): Contagem | null {
  const zero = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
  let melhor: Contagem | null = null;

  for (const d of DATAS_COMERCIAIS) {
    // testa o ano atual e o que vem, pra virada de ano funcionar
    for (const ano of [zero.getFullYear(), zero.getFullYear() + 1]) {
      const alvo = d.quando(ano);
      const dias = Math.round((alvo.getTime() - zero.getTime()) / 86400000);
      if (dias < 0 || dias > d.janela) continue;
      if (!melhor || dias < melhor.dias) {
        melhor = {
          nome: d.nome,
          recado: d.recado,
          dias,
          destaque: !!d.destaque,
          linhas: [d.recado, ...(d.linhas || [])],
        };
      }
    }
  }
  return melhor;
}

/**
 * "Faltam 87 dias pra Black Friday", "Falta 1 dia pro Natal", "O Natal é hoje".
 * O nome vem com artigo ("o Natal") pra a frase ficar certa nos dois lugares,
 * e aqui a preposição junta com ele: pra + o = pro.
 */
function paraOnde(nome: string): string {
  if (nome.startsWith("o ")) return `pro ${nome.slice(2)}`;
  if (nome.startsWith("a ")) return `pra ${nome.slice(2)}`;
  return `pra ${nome}`;
}

export function fraseContagem(c: Contagem): string {
  if (c.dias === 0) return `${c.nome[0].toUpperCase() + c.nome.slice(1)} é hoje`;
  if (c.dias === 1) return `Falta 1 dia ${paraOnde(c.nome)}`;
  return `Faltam ${c.dias} dias ${paraOnde(c.nome)}`;
}
