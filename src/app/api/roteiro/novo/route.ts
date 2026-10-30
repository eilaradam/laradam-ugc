import { randomBytes } from "node:crypto";
import { supabaseAdmin } from "@/lib/supabase";
import { roteiroVazio, type RoteiroConteudo } from "@/lib/roteiro";

// Cria um roteiro novo (ou duplica um existente) pela aba Roteiros do admin
// (creators.laradam.com). Só passa quem manda o token de login de um usuário admin.

const ORIGENS = ["https://creators.laradam.com", "http://localhost:8000", "http://127.0.0.1:8000"];

function cors(req: Request) {
  const o = req.headers.get("origin") ?? "";
  return {
    "Access-Control-Allow-Origin": ORIGENS.includes(o) ? o : ORIGENS[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, content-type",
    Vary: "Origin",
  };
}

export function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: cors(req) });
}

function slugDe(marca: string) {
  const base = marca
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40) || "roteiro";
  return `${base}-${randomBytes(3).toString("hex")}`;
}

export async function POST(req: Request) {
  const h = cors(req);
  const resp = (corpo: unknown, status = 200) => Response.json(corpo, { status, headers: h });

  const token = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!token) return resp({ error: "Faça login no admin" }, 401);
  const db = supabaseAdmin();
  const { data: u } = await db.auth.getUser(token);
  if (!u.user) return resp({ error: "Login expirado, entre de novo" }, 401);
  const { data: perfil } = await db.from("usuarios").select("role").eq("id", u.user.id).maybeSingle();
  if (perfil?.role !== "admin") return resp({ error: "Só admin" }, 403);

  const body = await req.json().catch(() => ({}));
  const marca = typeof body.marca === "string" ? body.marca.trim().slice(0, 80) : "";
  if (!marca) return resp({ error: "Coloca o nome da marca" }, 400);
  const cor = typeof body.cor === "string" && /^#[0-9a-f]{6}$/i.test(body.cor) ? body.cor : undefined;

  let conteudo: RoteiroConteudo = roteiroVazio(marca, cor);
  if (typeof body.copiar_de === "string") {
    const { data: base } = await db.from("roteiros_marca").select("conteudo").eq("slug", body.copiar_de).maybeSingle();
    if (!base) return resp({ error: "Roteiro de origem não encontrado" }, 404);
    // Duplicar leva texto e estrutura; fotos, logo e links ficam de fora (são da outra marca).
    const c = structuredClone(base.conteudo) as RoteiroConteudo;
    const limpa = <T extends { fotos?: string[]; refs?: unknown[] }>(x: T) => {
      delete x.fotos;
      delete x.refs;
      return x;
    };
    conteudo = { ...limpa(c), marca, cor: cor ?? c.cor, logo: undefined, ganchos: c.ganchos.map(limpa), partes: c.partes.map(limpa) };
  }

  const { data, error } = await db
    .from("roteiros_marca")
    .insert({ slug: slugDe(marca), chave_lara: randomBytes(12).toString("hex"), conteudo })
    .select("slug, chave_lara")
    .single();
  if (error) return resp({ error: "Não consegui criar" }, 500);
  return resp(data);
}
