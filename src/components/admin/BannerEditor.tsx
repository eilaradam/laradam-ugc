"use client";

import { useEffect, useRef, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { BANNER_PADRAO, normalizaBanner, type Banner } from "@/lib/banner";
import type { HeroFoto } from "@/data/content";

/**
 * Editor do banner da capa. A Lara cria um banner por época (Black Friday,
 * Natal, Dia das Mães...), sobe as fotos e liga o que quiser. Só um fica ativo.
 * As fotos vão pro bucket público "banners", pasta capa/.
 */
type Linha = Banner & { id: string; ativo: boolean };

const VAZIO = (): Omit<Linha, "id"> => ({
  ...BANNER_PADRAO,
  ativo: false,
  nome: "Novo banner",
  fotos: [],
});

export default function BannerEditor() {
  const [lista, setLista] = useState<Linha[]>([]);
  const [edit, setEdit] = useState<Partial<Linha> | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const inputFoto = useRef<HTMLInputElement>(null);

  async function carregar() {
    setCarregando(true);
    const { data } = await getSupabase()
      .from("hero_banners")
      .select("*")
      .order("created_at", { ascending: true });
    setLista((data as Linha[]) || []);
    setCarregando(false);
  }
  useEffect(() => {
    carregar();
  }, []);

  async function salvar() {
    if (!edit) return;
    const nome = (edit.nome || "").trim();
    if (!nome) {
      setAviso("Dá um nome pro banner, tipo Black Friday 2026.");
      return;
    }
    setSalvando(true);
    const dados = {
      nome,
      eyebrow: edit.eyebrow ?? "",
      titulo: edit.titulo ?? "",
      destaque: edit.destaque ?? "",
      sublinha: edit.sublinha ?? "",
      cta_texto: edit.cta_texto ?? "",
      cta_link: edit.cta_link ?? "",
      link_texto: edit.link_texto ?? "",
      link_href: edit.link_href ?? "",
      fotos: edit.fotos ?? [],
      updated_at: new Date().toISOString(),
    };
    const sb = getSupabase();
    const r = edit.id
      ? await sb.from("hero_banners").update(dados).eq("id", edit.id)
      : await sb.from("hero_banners").insert(dados);
    setSalvando(false);
    if (r.error) {
      setAviso("Não consegui salvar: " + r.error.message);
      return;
    }
    setEdit(null);
    setAviso(null);
    carregar();
  }

  async function ativar(id: string) {
    const sb = getSupabase();
    // só um por vez: desliga todos e liga esse
    await sb.from("hero_banners").update({ ativo: false }).neq("id", id);
    await sb
      .from("hero_banners")
      .update({ ativo: true, updated_at: new Date().toISOString() })
      .eq("id", id);
    carregar();
  }

  async function apagar(l: Linha) {
    if (l.ativo) {
      setAviso("Esse é o banner que está no ar. Liga outro antes de apagar esse.");
      return;
    }
    if (!confirm(`Apagar o banner "${l.nome}"?`)) return;
    await getSupabase().from("hero_banners").delete().eq("id", l.id);
    carregar();
  }

  async function subirFotos(files: FileList | null) {
    if (!files || !files.length || !edit) return;
    setSalvando(true);
    setAviso(null);
    const sb = getSupabase();
    const novas: HeroFoto[] = [];
    for (const f of Array.from(files)) {
      if (f.size > 6 * 1024 * 1024) {
        setAviso(`"${f.name}" tem mais de 6 MB. Salva mais leve (JPG qualidade 80).`);
        continue;
      }
      const ext = (f.name.split(".").pop() || "jpg").toLowerCase();
      const caminho = `capa/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await sb.storage
        .from("banners")
        .upload(caminho, f, { upsert: true, contentType: f.type });
      if (error) {
        setAviso("Upload falhou: " + error.message);
        continue;
      }
      const { data } = sb.storage.from("banners").getPublicUrl(caminho);
      novas.push({ src: data.publicUrl, alt: "Lara Dam" });
    }
    setEdit({ ...edit, fotos: [...(edit.fotos ?? []), ...novas] });
    setSalvando(false);
    if (inputFoto.current) inputFoto.current.value = "";
  }

  function mexeFoto(i: number, campo: keyof HeroFoto, valor: string) {
    if (!edit) return;
    const fotos = [...(edit.fotos ?? [])];
    fotos[i] = { ...fotos[i], [campo]: valor };
    setEdit({ ...edit, fotos });
  }
  function moveFoto(i: number, passo: number) {
    if (!edit) return;
    const fotos = [...(edit.fotos ?? [])];
    const j = i + passo;
    if (j < 0 || j >= fotos.length) return;
    [fotos[i], fotos[j]] = [fotos[j], fotos[i]];
    setEdit({ ...edit, fotos });
  }
  function tiraFoto(i: number) {
    if (!edit) return;
    setEdit({ ...edit, fotos: (edit.fotos ?? []).filter((_, n) => n !== i) });
  }

  if (carregando)
    return <div className="py-20 text-center text-foreground-soft">Carregando banners...</div>;

  const b = edit ? normalizaBanner(edit) : null;

  return (
    <div className="space-y-6">
      {aviso && (
        <div className="rounded-xl bg-primary-light border border-primary/25 px-4 py-3 text-sm text-primary">
          {aviso}
        </div>
      )}

      {!edit && (
        <>
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <p className="text-sm text-foreground-soft">
              Um banner por época. Liga o que você quer no ar, e a capa muda sozinha.
            </p>
            <button
              onClick={() => setEdit(VAZIO())}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-dark transition-colors"
            >
              + Novo banner
            </button>
          </div>

          <div className="grid gap-3">
            {lista.map((l) => (
              <div
                key={l.id}
                className={`rounded-2xl border p-4 flex flex-wrap items-center gap-4 ${
                  l.ativo ? "border-primary bg-primary-light/40" : "border-foreground/10 bg-background"
                }`}
              >
                <div className="flex-1 min-w-[220px]">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-black text-lg">{l.nome}</span>
                    {l.ativo && (
                      <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        no ar
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-foreground-soft mt-0.5">
                    {l.titulo}{" "}
                    <em className="text-primary not-italic font-semibold">{l.destaque}</em>
                    {" · "}
                    {(l.fotos || []).length} foto{(l.fotos || []).length === 1 ? "" : "s"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!l.ativo && (
                    <button
                      onClick={() => ativar(l.id)}
                      className="rounded-full border border-primary px-4 py-2 text-xs font-bold text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      Colocar no ar
                    </button>
                  )}
                  <button
                    onClick={() => setEdit(l)}
                    className="rounded-full bg-foreground/5 px-4 py-2 text-xs font-bold hover:bg-foreground/10 transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => apagar(l)}
                    className="px-3 py-2 text-xs font-bold text-red-600 hover:underline"
                  >
                    Apagar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {edit && b && (
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8 items-start">
          {/* formulário */}
          <div className="space-y-4">
            <Campo
              rotulo="Nome do banner (só você vê)"
              valor={edit.nome ?? ""}
              ao={(v) => setEdit({ ...edit, nome: v })}
              dica="Ex: Black Friday 2026"
            />
            <Campo
              rotulo="Linha de cima"
              valor={edit.eyebrow ?? ""}
              ao={(v) => setEdit({ ...edit, eyebrow: v })}
              dica="Ex: Vagas abertas pra Black Friday"
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <Campo
                rotulo="Título"
                valor={edit.titulo ?? ""}
                ao={(v) => setEdit({ ...edit, titulo: v })}
                dica="Ex: sua Black Friday"
              />
              <Campo
                rotulo="Parte em destaque"
                valor={edit.destaque ?? ""}
                ao={(v) => setEdit({ ...edit, destaque: v })}
                dica="Sai em itálico colorido"
              />
            </div>
            <Campo
              rotulo="Linha de baixo"
              valor={edit.sublinha ?? ""}
              ao={(v) => setEdit({ ...edit, sublinha: v })}
              area
              dica="Os números viram negrito sozinhos"
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <Campo
                rotulo="Botão"
                valor={edit.cta_texto ?? ""}
                ao={(v) => setEdit({ ...edit, cta_texto: v })}
              />
              <Campo
                rotulo="Link do botão"
                valor={edit.cta_link ?? ""}
                ao={(v) => setEdit({ ...edit, cta_link: v })}
                dica="#contato ou um link inteiro"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Campo
                rotulo="Link discreto"
                valor={edit.link_texto ?? ""}
                ao={(v) => setEdit({ ...edit, link_texto: v })}
              />
              <Campo
                rotulo="Para onde ele vai"
                valor={edit.link_href ?? ""}
                ao={(v) => setEdit({ ...edit, link_href: v })}
              />
            </div>

            {/* fotos */}
            <div className="rounded-2xl border border-foreground/10 p-4">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground-soft">
                  Fotos do carrossel
                </span>
                <button
                  onClick={() => inputFoto.current?.click()}
                  className="rounded-full bg-foreground/5 px-4 py-2 text-xs font-bold hover:bg-foreground/10 transition-colors"
                >
                  + Subir fotos
                </button>
                <input
                  ref={inputFoto}
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={(e) => subirFotos(e.target.files)}
                />
              </div>
              <p className="text-xs text-foreground-soft mb-3">
                Deitadas, 3200 x 1000 (16:5), com o assunto no meio. Até 6 MB cada.
              </p>
              <div className="space-y-2">
                {(edit.fotos ?? []).map((f, i) => (
                  <div key={f.src + i} className="flex items-center gap-3 rounded-xl bg-foreground/5 p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.src} alt="" className="h-12 w-24 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0 grid sm:grid-cols-2 gap-2">
                      <input
                        value={f.legenda ?? ""}
                        onChange={(e) => mexeFoto(i, "legenda", e.target.value)}
                        placeholder="Legenda (opcional)"
                        className="w-full rounded-lg border border-foreground/10 bg-background px-3 py-1.5 text-xs"
                      />
                      <input
                        value={f.posicao ?? ""}
                        onChange={(e) => mexeFoto(i, "posicao", e.target.value)}
                        placeholder="Enquadramento: center 28%"
                        className="w-full rounded-lg border border-foreground/10 bg-background px-3 py-1.5 text-xs"
                      />
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button onClick={() => moveFoto(i, -1)} className="px-2 py-1 text-xs hover:text-primary" title="Subir">
                        ↑
                      </button>
                      <button onClick={() => moveFoto(i, 1)} className="px-2 py-1 text-xs hover:text-primary" title="Descer">
                        ↓
                      </button>
                      <button onClick={() => tiraFoto(i)} className="px-2 py-1 text-xs text-red-600" title="Tirar">
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
                {!(edit.fotos ?? []).length && (
                  <p className="text-xs text-foreground-soft py-3">
                    Sem foto ainda. Sem foto, a capa usa as fotos padrão do site.
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={salvar}
                disabled={salvando}
                className="rounded-full bg-primary px-7 py-3 text-sm font-bold text-white hover:bg-primary-dark disabled:opacity-60 transition-colors"
              >
                {salvando ? "Salvando..." : "Salvar banner"}
              </button>
              <button
                onClick={() => {
                  setEdit(null);
                  setAviso(null);
                }}
                className="text-sm font-semibold text-foreground-soft hover:text-foreground"
              >
                Cancelar
              </button>
            </div>
          </div>

          {/* prévia ao vivo */}
          <div className="lg:sticky lg:top-6">
            <div className="text-xs font-bold uppercase tracking-wider text-foreground-soft mb-2">
              Prévia
            </div>
            <div className="rounded-2xl border border-foreground/10 bg-background overflow-hidden">
              <div className="px-6 py-8 text-center">
                <div className="text-[10px] uppercase tracking-[0.25em] text-primary font-medium">
                  {b.eyebrow}
                </div>
                <div className="mt-2 font-display font-medium text-3xl leading-tight">
                  {b.titulo} <span className="font-serif-accent italic text-primary">{b.destaque}</span>
                </div>
                <p className="mt-2 text-xs text-foreground-soft">{b.sublinha}</p>
              </div>
              {b.fotos[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={b.fotos[0].src}
                  alt=""
                  className="w-full aspect-[16/5] object-cover"
                  style={{ objectPosition: b.fotos[0].posicao || "center 28%" }}
                />
              )}
              <div className="px-6 py-6 text-center">
                <span className="inline-block rounded-full bg-primary px-6 py-3 text-xs font-bold text-white">
                  {b.cta_texto}
                </span>
                <span className="ml-4 text-xs font-semibold text-foreground-soft underline">
                  {b.link_texto}
                </span>
              </div>
            </div>
            <p className="mt-3 text-xs text-foreground-soft">
              Depois de salvar e colocar no ar, a capa em <b>/capa</b> atualiza em até 30 segundos.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Campo({
  rotulo,
  valor,
  ao,
  dica,
  area,
}: {
  rotulo: string;
  valor: string;
  ao: (v: string) => void;
  dica?: string;
  area?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-bold uppercase tracking-wider text-foreground-soft mb-1.5">
        {rotulo}
      </span>
      {area ? (
        <textarea
          value={valor}
          onChange={(e) => ao(e.target.value)}
          rows={2}
          className="w-full rounded-xl border border-foreground/15 bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
        />
      ) : (
        <input
          value={valor}
          onChange={(e) => ao(e.target.value)}
          className="w-full rounded-xl border border-foreground/15 bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
        />
      )}
      {dica && <span className="block text-[11px] text-foreground-soft mt-1">{dica}</span>}
    </label>
  );
}
