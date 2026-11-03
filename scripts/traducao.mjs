// Traduções de um roteiro pra marca revisar em inglês e espanhol.
//
//   node scripts/traducao.mjs <slug>                 -> lista os trechos e o que falta ou ficou velho
//   node scripts/traducao.mjs <slug> <arquivo.json>  -> grava { "en": { alvo: texto }, "es": { ... } }
//
// Cada tradução guarda o português de onde saiu. Se a Lara mudar o texto depois,
// a página deixa de mostrar a tradução velha e avisa no modo Lara.
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).replace(/^"|"$/g, "")])
);
const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const [slug, arquivo] = process.argv.slice(2);
if (!slug) {
  console.error("uso: node scripts/traducao.mjs <slug> [arquivo.json]");
  process.exit(1);
}

const { data: r, error } = await db.from("roteiros_marca").select("conteudo").eq("slug", slug).single();
if (error) throw error;
const c = r.conteudo;

// Todos os trechos com texto, no mesmo endereço (alvo) que a página usa.
function trechos(c) {
  const out = {};
  const por = (alvo, v) => v && (out[alvo] = v);
  const refs = (lista) => (lista ?? []).forEach((x) => por(`ref:${x.url}`, x.titulo));
  for (const k of ["titulo", "creator", "marca", "formato", "duracao", "conceito", "regra"]) por(`geral:${k}`, c[k]);
  refs(c.refs);
  for (const g of c.ganchos) {
    for (const k of ["titulo", "fala", "tela"]) por(`gancho:${g.id}:${k}`, g[k]);
    refs(g.refs);
  }
  for (const p of c.partes) {
    for (const k of ["nome", "tempo", "fala", "tela"]) por(`parte:${p.id}:${k}`, p[k]);
    refs(p.refs);
  }
  return out;
}

const pt = trechos(c);

if (!arquivo) {
  for (const [alvo, texto] of Object.entries(pt)) {
    const st = ["en", "es"].map((l) => {
      const tr = c.traducoes?.[l]?.[alvo];
      return `${l}:${!tr ? "falta" : tr.de.trim() !== texto.trim() ? "velha" : "ok"}`;
    });
    console.log(`${alvo}\t${st.join(" ")}\t${texto.replace(/\n/g, " / ")}`);
  }
  process.exit(0);
}

const novas = JSON.parse(readFileSync(arquivo, "utf8"));
const traducoes = structuredClone(c.traducoes ?? {});
const desconhecidos = [];
for (const [lingua, mapa] of Object.entries(novas)) {
  if (!["en", "es"].includes(lingua)) throw new Error(`língua inválida: ${lingua}`);
  traducoes[lingua] ??= {};
  for (const [alvo, t] of Object.entries(mapa)) {
    if (!pt[alvo]) {
      desconhecidos.push(alvo);
      continue;
    }
    traducoes[lingua][alvo] = { de: pt[alvo], t };
  }
}
if (desconhecidos.length) {
  console.error("trechos que não existem no roteiro:", [...new Set(desconhecidos)].join(", "));
  process.exit(1);
}

// relê na hora de gravar pra não apagar uma edição feita pelo site no meio do caminho
const { data: atual } = await db.from("roteiros_marca").select("conteudo").eq("slug", slug).single();
const { error: e2 } = await db.from("roteiros_marca").update({ conteudo: { ...atual.conteudo, traducoes } }).eq("slug", slug);
if (e2) throw e2;
const faltam = ["en", "es"].flatMap((l) => Object.keys(pt).filter((a) => !traducoes[l]?.[a]).map((a) => `${l}:${a}`));
console.log(`ok: ${slug}`, faltam.length ? `\nainda sem tradução: ${faltam.join(", ")}` : "(tudo traduzido)");
