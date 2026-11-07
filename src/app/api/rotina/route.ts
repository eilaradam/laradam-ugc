import { supabaseAdmin } from "@/lib/supabase";
import { str } from "@/lib/guard";

// Rotina de conteúdo do @eilaradam (tabela conteudo_perfil).
// Tudo exige a chave (?k= ou header x-rotina) que fica só com a Lara; os roteiros não vão pro git.

const STATUS = ["pendente", "gravado", "editado", "agendado", "postado"] as const;

function autorizado(req: Request) {
  const u = new URL(req.url);
  const k = u.searchParams.get("k") ?? req.headers.get("x-rotina");
  return !!process.env.ROTINA_CHAVE && k === process.env.ROTINA_CHAVE;
}

export async function GET(req: Request) {
  if (!autorizado(req)) return Response.json({ error: "Chave inválida" }, { status: 401 });
  const u = new URL(req.url);
  const de = u.searchParams.get("de") ?? new Date(Date.now() - 7 * 864e5).toISOString().slice(0, 10);
  const ate = u.searchParams.get("ate") ?? new Date(Date.now() + 45 * 864e5).toISOString().slice(0, 10);
  const { data, error } = await supabaseAdmin()
    .from("conteudo_perfil")
    .select("*")
    .gte("data", de)
    .lte("data", ate)
    .order("data")
    .order("created_at");
  if (error) return Response.json({ error: error.message }, { status: 500 });

  // formato curto pro widget do iPhone: o que falta hoje e o próximo
  if (u.searchParams.get("widget")) {
    const hoje = new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
    const abertos = (data ?? []).filter((c) => c.status !== "postado");
    return Response.json({
      hoje: abertos.filter((c) => c.data <= hoje).map((c) => ({ id: c.id, data: c.data, titulo: c.titulo, status: c.status, serie: c.serie })),
      proximos: abertos.filter((c) => c.data > hoje).slice(0, 3).map((c) => ({ id: c.id, data: c.data, titulo: c.titulo, status: c.status, serie: c.serie })),
    });
  }
  return Response.json({ itens: data ?? [] });
}

export async function PATCH(req: Request) {
  if (!autorizado(req)) return Response.json({ error: "Chave inválida" }, { status: 401 });
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }
  const id = str(body.id, 60);
  if (!id) return Response.json({ error: "Sem id" }, { status: 400 });
  const mudar: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (typeof body.status === "string" && (STATUS as readonly string[]).includes(body.status)) mudar.status = body.status;
  if (Array.isArray(body.checklist)) mudar.checklist = body.checklist.slice(0, 30);
  if (typeof body.takes_url === "string") mudar.takes_url = body.takes_url.slice(0, 500);
  if (typeof body.legenda === "string") mudar.legenda = body.legenda.slice(0, 2200);
  const { data, error } = await supabaseAdmin().from("conteudo_perfil").update(mudar).eq("id", id).select().maybeSingle();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ item: data });
}

export async function DELETE(req: Request) {
  if (!autorizado(req)) return Response.json({ error: "Chave inválida" }, { status: 401 });
  const id = str(new URL(req.url).searchParams.get("id"), 60);
  if (!id) return Response.json({ error: "Sem id" }, { status: 400 });
  const { error } = await supabaseAdmin().from("conteudo_perfil").delete().eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
