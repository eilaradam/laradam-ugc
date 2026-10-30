// Cadastra (ou atualiza) um roteiro compartilhado e imprime os links.
//
//   node scripts/roteiro.mjs roteiros-dados/marca.json            -> cria link novo
//   node scripts/roteiro.mjs roteiros-dados/marca.json --slug X   -> troca o texto do roteiro X
//
// Atenção: atualizar sobrescreve o texto inteiro, inclusive sugestões já aceitas no site.
import { readFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).replace(/^"|"$/g, "")])
);
const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const [arquivo, flag, slugExistente] = process.argv.slice(2);
if (!arquivo) {
  console.error("uso: node scripts/roteiro.mjs <arquivo.json> [--slug <slug>]");
  process.exit(1);
}
const conteudo = JSON.parse(readFileSync(arquivo, "utf8"));

let row;
if (flag === "--slug") {
  const { data, error } = await db
    .from("roteiros_marca")
    .update({ conteudo, updated_at: new Date().toISOString() })
    .eq("slug", slugExistente)
    .select("slug, chave_lara")
    .single();
  if (error) throw error;
  row = data;
} else {
  const base = conteudo.marca
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const slug = `${base}-${randomBytes(4).toString("hex").slice(0, 6)}`;
  const { data, error } = await db
    .from("roteiros_marca")
    .insert({ slug, chave_lara: randomBytes(12).toString("hex"), conteudo })
    .select("slug, chave_lara")
    .single();
  if (error) throw error;
  row = data;
}

console.log(`\nLink da marca:  https://ugc.laradam.com/roteiro/${row.slug}`);
console.log(`Link da Lara:   https://ugc.laradam.com/roteiro/${row.slug}?k=${row.chave_lara}\n`);
