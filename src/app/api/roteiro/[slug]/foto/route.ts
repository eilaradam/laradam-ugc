import { randomUUID } from "node:crypto";
import { supabaseAdmin } from "@/lib/supabase";
import { blocoDe, type RoteiroConteudo } from "@/lib/roteiro";

// Foto de um momento do roteiro. Só a Lara (chave_lara) sobe.
// O navegador já reduz pra JPG de até 1600px antes de mandar.

const BUCKET = "roteiros-marca";
const MAX = 4 * 1024 * 1024;

export async function POST(req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const db = supabaseAdmin();
  const { data: r } = await db.from("roteiros_marca").select("id, chave_lara, conteudo").eq("slug", slug).maybeSingle();
  if (!r) return Response.json({ error: "Roteiro não encontrado" }, { status: 404 });

  const fd = await req.formData();
  if (fd.get("k") !== r.chave_lara) return Response.json({ error: "Só a Lara pode subir foto" }, { status: 403 });
  const foto = fd.get("foto");
  if (!(foto instanceof Blob) || foto.size === 0) return Response.json({ error: "Foto vazia" }, { status: 400 });
  if (foto.size > MAX) return Response.json({ error: "Foto grande demais" }, { status: 413 });
  if (!foto.type.startsWith("image/")) return Response.json({ error: "Só imagem" }, { status: 400 });

  const conteudo: RoteiroConteudo = structuredClone(r.conteudo);
  const bloco = String(fd.get("bloco") ?? "");
  const b = bloco === "logo" ? conteudo : blocoDe(conteudo, bloco);
  if (!b) return Response.json({ error: "Bloco inválido" }, { status: 400 });

  // logo vem em PNG (pra manter fundo transparente); o resto em JPG
  const png = foto.type === "image/png";
  const caminho = `${slug}/${randomUUID()}.${png ? "png" : "jpg"}`;
  const { error } = await db.storage.from(BUCKET).upload(caminho, foto, { contentType: png ? "image/png" : "image/jpeg", upsert: false });
  if (error) return Response.json({ error: "Falha ao salvar a foto" }, { status: 500 });

  const url = db.storage.from(BUCKET).getPublicUrl(caminho).data.publicUrl;
  if (bloco === "logo") {
    const antigo = conteudo.logo?.split(`/${BUCKET}/`)[1];
    if (antigo) await db.storage.from(BUCKET).remove([antigo]);
    conteudo.logo = url;
  } else {
    b.fotos = [...(b.fotos ?? []), url];
  }
  await db.from("roteiros_marca").update({ conteudo, updated_at: new Date().toISOString() }).eq("id", r.id);

  const { data: atualizado } = await db
    .from("roteiros_marca")
    .select("slug, conteudo, gancho_escolhido, gancho_escolhido_por, aprovado_em, aprovado_por, updated_at")
    .eq("id", r.id)
    .single();
  return Response.json({ roteiro: atualizado });
}
