// Troca o texto de um roteiro pelo JSON, mantendo as fotos, links, logo e traduções que já estão no banco.
// Diferente de `roteiro.mjs --slug`, que regrava tudo a partir do arquivo.
//
//   node scripts/atualizar-roteiro.mjs <arquivo.json> <slug>
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
const env = Object.fromEntries(readFileSync(new URL("../.env.local", import.meta.url),"utf8").split("\n").filter(l=>l.includes("=")&&!l.startsWith("#")).map(l=>[l.slice(0,l.indexOf("=")),l.slice(l.indexOf("=")+1).replace(/^"|"$/g,"")]));
const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false}});
const [arquivo, slug] = process.argv.slice(2);
const novo = JSON.parse(readFileSync(arquivo, "utf8"));
const { data } = await db.from("roteiros_marca").select("conteudo").eq("slug", slug).single();
const velho = data.conteudo;
// mantém fotos, refs e logo que já estão no banco (subidas pelo site ou por script)
const copia = (de, para) => { for (const k of ["fotos", "refs"]) if (de?.[k]?.length && !para[k]?.length) para[k] = de[k]; };
copia(velho, novo); if (velho.logo && !novo.logo) novo.logo = velho.logo;
for (const g of novo.ganchos) copia(velho.ganchos.find((x) => x.id === g.id), g);
for (const p of novo.partes) copia(velho.partes.find((x) => x.id === p.id), p);
if (velho.traducoes) novo.traducoes = velho.traducoes;
const { error } = await db.from("roteiros_marca").update({ conteudo: novo, updated_at: new Date().toISOString() }).eq("slug", slug);
console.log(slug, error ?? "ok", "| fotos mantidas:", [...novo.ganchos, ...novo.partes].filter((x) => x.fotos?.length).map((x) => x.id).join(", ") || "nenhuma");
