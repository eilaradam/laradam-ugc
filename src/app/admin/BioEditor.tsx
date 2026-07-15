"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import {
  REDES_DISPONIVEIS,
  type BioConfig,
  type BioProduto,
  type BioRede,
  type BioWhats,
  type BioPost,
} from "@/data/bioConfig";

/* ---------- upload de imagem pro bucket 'bio' ---------- */
async function uploadImage(file: File, folder: string): Promise<string | null> {
  const sb = getSupabase();
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
  const { error } = await sb.storage
    .from("bio")
    .upload(path, file, { upsert: true, cacheControl: "3600" });
  if (error) {
    alert("Erro no upload: " + error.message);
    return null;
  }
  return sb.storage.from("bio").getPublicUrl(path).data.publicUrl;
}

/* ---------- componentes de campo ---------- */
function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wider text-foreground-soft">
        {label}
      </span>
      <input
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full bg-background border border-foreground/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
      />
    </label>
  );
}

function Area({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wider text-foreground-soft">
        {label}
      </span>
      <textarea
        value={value ?? ""}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full bg-background border border-foreground/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary resize-y"
      />
    </label>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wider text-foreground-soft">
        {label}
      </span>
      <div className="mt-1 flex items-center gap-2">
        <input
          type="color"
          value={value || "#FF5A4D"}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-12 rounded border border-foreground/15 bg-background"
        />
        <input
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-background border border-foreground/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
        />
      </div>
    </label>
  );
}

function ImageField({
  label,
  value,
  onChange,
  folder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  folder: string;
}) {
  const [busy, setBusy] = useState(false);
  return (
    <div>
      <span className="text-[11px] uppercase tracking-wider text-foreground-soft">
        {label}
      </span>
      <div className="mt-1 flex items-center gap-3">
        <div className="h-16 w-16 rounded-lg bg-foreground/5 border border-foreground/10 overflow-hidden flex items-center justify-center flex-shrink-0">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-[10px] text-foreground-soft">sem foto</span>
          )}
        </div>
        <div className="flex-1 space-y-1.5">
          <label className="inline-block text-xs px-3 py-1.5 bg-foreground text-background rounded-full font-semibold cursor-pointer hover:bg-primary transition-colors">
            {busy ? "Enviando..." : "Subir foto"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={busy}
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                setBusy(true);
                const url = await uploadImage(f, folder);
                setBusy(false);
                if (url) onChange(url);
              }}
            />
          </label>
          <input
            value={value ?? ""}
            placeholder="ou cole uma URL de imagem"
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-background border border-foreground/15 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-foreground/10 p-5 space-y-4">
      <h3 className="font-display font-black text-lg">{title}</h3>
      {children}
    </section>
  );
}

function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-[11px] uppercase tracking-wider text-red-500 hover:text-red-400 font-bold"
    >
      Remover
    </button>
  );
}

function AddBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="text-xs px-3 py-1.5 rounded-full border border-primary/40 text-primary font-semibold hover:bg-primary/10 transition-colors"
    >
      + {label}
    </button>
  );
}

/* ---------- editor principal ---------- */
export default function BioEditor() {
  const [cfg, setCfg] = useState<BioConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [chatJson, setChatJson] = useState("");
  const [chatErr, setChatErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const sb = getSupabase();
      const { data, error } = await sb
        .from("bio_config")
        .select("config")
        .eq("id", 1)
        .single();
      if (error) {
        setMsg("Erro ao carregar: " + error.message);
      } else if (data?.config) {
        setCfg(data.config as BioConfig);
        setChatJson(JSON.stringify((data.config as BioConfig).chat.passos, null, 2));
      }
      setLoading(false);
    })();
  }, []);

  function update(mutator: (c: BioConfig) => void) {
    setCfg((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      mutator(next);
      return next;
    });
  }

  async function salvar() {
    if (!cfg) return;
    // aplica o JSON do chat (se valido)
    const toSave = structuredClone(cfg);
    try {
      toSave.chat.passos = JSON.parse(chatJson);
      setChatErr(null);
    } catch {
      setChatErr("O JSON do chat esta invalido. Corrija antes de salvar.");
      return;
    }
    setSaving(true);
    setMsg(null);
    const sb = getSupabase();
    const { error } = await sb
      .from("bio_config")
      .update({ config: toSave, updated_at: new Date().toISOString() })
      .eq("id", 1);
    setSaving(false);
    if (error) {
      setMsg("Erro ao salvar: " + error.message);
    } else {
      setCfg(toSave);
      setMsg("Salvo! Abra /bio e atualize (F5) pra ver.");
    }
  }

  if (loading)
    return <div className="py-20 text-center text-foreground-soft">Carregando conteudo...</div>;
  if (!cfg)
    return (
      <div className="py-20 text-center text-foreground-soft">
        {msg ?? "Nao consegui carregar o conteudo do bio."}
      </div>
    );

  return (
    <div className="space-y-5 pb-28">
      {/* PERFIL */}
      <Section title="Perfil">
        <Field label="Nome" value={cfg.perfil.nome} onChange={(v) => update((c) => { c.perfil.nome = v; })} />
        <Area label="Subtitulo" value={cfg.perfil.subtitulo} onChange={(v) => update((c) => { c.perfil.subtitulo = v; })} rows={2} />
        <ImageField label="Foto de perfil" value={cfg.perfil.foto} folder="perfil" onChange={(v) => update((c) => { c.perfil.foto = v; })} />
      </Section>

      {/* TITULOS */}
      <Section title="Titulos das secoes">
        <Field label="Titulo do 1o carrossel" value={cfg.textos.tituloCarrossel} onChange={(v) => update((c) => { c.textos.tituloCarrossel = v; })} />
        <Field label="Titulo do catalogo" value={cfg.textos.tituloCatalogo} onChange={(v) => update((c) => { c.textos.tituloCatalogo = v; })} />
      </Section>

      {/* REDES */}
      <Section title="Redes sociais">
        <div className="space-y-3">
          {cfg.redes.map((r, i) => (
            <div key={i} className="flex items-end gap-2">
              <label className="block w-32">
                <span className="text-[11px] uppercase tracking-wider text-foreground-soft">Rede</span>
                <select
                  value={r.rede}
                  onChange={(e) => update((c) => { c.redes[i].rede = e.target.value; })}
                  className="mt-1 w-full bg-background border border-foreground/15 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-primary"
                >
                  {REDES_DISPONIVEIS.map((rd) => (
                    <option key={rd} value={rd}>{rd}</option>
                  ))}
                </select>
              </label>
              <div className="flex-1">
                <Field label="Link" value={r.url} onChange={(v) => update((c) => { c.redes[i].url = v; })} />
              </div>
              <div className="pb-2"><RemoveBtn onClick={() => update((c) => { c.redes.splice(i, 1); })} /></div>
            </div>
          ))}
        </div>
        <AddBtn label="Adicionar rede" onClick={() => update((c) => { c.redes.push({ rede: "instagram", url: "" } as BioRede); })} />
      </Section>

      {/* PRODUTOS */}
      <Section title="Produtos">
        <div className="space-y-4">
          {cfg.produtos.map((p, i) => (
            <div key={i} className="rounded-xl border border-foreground/10 p-4 space-y-3 bg-foreground/[0.02]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground-soft">Produto {i + 1}</span>
                <RemoveBtn onClick={() => update((c) => { c.produtos.splice(i, 1); })} />
              </div>
              <Field label="Titulo" value={p.titulo} onChange={(v) => update((c) => { c.produtos[i].titulo = v; })} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Preco" value={p.preco} onChange={(v) => update((c) => { c.produtos[i].preco = v; })} />
                <Field label="Texto do botao" value={p.cta} onChange={(v) => update((c) => { c.produtos[i].cta = v; })} />
              </div>
              <Area label="Descricao" value={p.descricao} onChange={(v) => update((c) => { c.produtos[i].descricao = v; })} rows={3} />
              <Field label="Link de compra (checkout)" value={p.checkout} onChange={(v) => update((c) => { c.produtos[i].checkout = v; })} />
              <div className="grid grid-cols-2 gap-3 items-start">
                <ColorField label="Cor da capa" value={p.capaCor} onChange={(v) => update((c) => { c.produtos[i].capaCor = v; })} />
                <Field label="Tags (separadas por virgula)" value={p.tags.join(", ")} onChange={(v) => update((c) => { c.produtos[i].tags = v.split(",").map((t) => t.trim()).filter(Boolean); })} />
              </div>
              <ImageField label="Capa (opcional)" value={p.imagem} folder="produtos" onChange={(v) => update((c) => { c.produtos[i].imagem = v; })} />
            </div>
          ))}
        </div>
        <AddBtn label="Adicionar produto" onClick={() => update((c) => { c.produtos.push({ id: "prod" + Date.now(), titulo: "Novo produto", capaCor: "#FF5A4D", imagem: "", preco: "R$ 0", descricao: "", cta: "Acessar", checkout: "", tags: [] } as BioProduto); })} />
      </Section>

      {/* LINK EXTERNO */}
      <Section title="Link externo (ex: livro)">
        <Field label="Titulo" value={cfg.linkExterno.titulo} onChange={(v) => update((c) => { c.linkExterno.titulo = v; })} />
        <Area label="Descricao" value={cfg.linkExterno.descricao} onChange={(v) => update((c) => { c.linkExterno.descricao = v; })} rows={2} />
        <Field label="Link" value={cfg.linkExterno.url} onChange={(v) => update((c) => { c.linkExterno.url = v; })} />
        <div className="grid grid-cols-2 gap-3 items-start">
          <ColorField label="Cor da miniatura" value={cfg.linkExterno.thumbCor} onChange={(v) => update((c) => { c.linkExterno.thumbCor = v; })} />
          <ImageField label="Miniatura (opcional)" value={cfg.linkExterno.imagem} folder="link" onChange={(v) => update((c) => { c.linkExterno.imagem = v; })} />
        </div>
      </Section>

      {/* WHATSAPP */}
      <Section title="WhatsApp">
        <div className="space-y-4">
          {cfg.whatsapp.map((w, i) => (
            <div key={i} className="rounded-xl border border-foreground/10 p-4 space-y-3 bg-foreground/[0.02]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground-soft">Contato {i + 1}</span>
                <RemoveBtn onClick={() => update((c) => { c.whatsapp.splice(i, 1); })} />
              </div>
              <Field label="Categoria (ex: Publicidade)" value={w.categoria} onChange={(v) => update((c) => { c.whatsapp[i].categoria = v; })} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Numero (so digitos, com DDI)" value={w.numero} onChange={(v) => update((c) => { c.whatsapp[i].numero = v; })} placeholder="5511999999999" />
                <Field label="Numero (como aparece)" value={w.numeroExibicao} onChange={(v) => update((c) => { c.whatsapp[i].numeroExibicao = v; })} placeholder="+55 11 99999-9999" />
              </div>
              <Area label="Mensagem pronta" value={w.mensagem} onChange={(v) => update((c) => { c.whatsapp[i].mensagem = v; })} rows={2} />
              <ColorField label="Cor do card" value={w.cor} onChange={(v) => update((c) => { c.whatsapp[i].cor = v; })} />
            </div>
          ))}
        </div>
        <AddBtn label="Adicionar WhatsApp" onClick={() => update((c) => { c.whatsapp.push({ categoria: "", numero: "", numeroExibicao: "", mensagem: "", cor: "#25D366" } as BioWhats); })} />
      </Section>

      {/* SPOTIFY */}
      <Section title="Spotify (podcast)">
        <Field label="Nome do podcast" value={cfg.spotify.nome} onChange={(v) => update((c) => { c.spotify.nome = v; })} />
        <Field label="Link do Spotify" value={cfg.spotify.url} onChange={(v) => update((c) => { c.spotify.url = v; })} />
      </Section>

      {/* INSTAGRAM */}
      <Section title="Feed do Instagram">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Usuario (@)" value={cfg.instagram.usuario} onChange={(v) => update((c) => { c.instagram.usuario = v; })} />
          <Field label="Link do perfil" value={cfg.instagram.url} onChange={(v) => update((c) => { c.instagram.url = v; })} />
        </div>
        <div className="space-y-4 mt-2">
          {cfg.instagram.posts.map((p, i) => (
            <div key={i} className="rounded-xl border border-foreground/10 p-4 space-y-3 bg-foreground/[0.02]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground-soft">Post {i + 1}</span>
                <RemoveBtn onClick={() => update((c) => { c.instagram.posts.splice(i, 1); })} />
              </div>
              <Field label="Legenda" value={p.legenda} onChange={(v) => update((c) => { c.instagram.posts[i].legenda = v; })} />
              <div className="grid grid-cols-2 gap-3 items-start">
                <ColorField label="Cor (se sem foto)" value={p.cor} onChange={(v) => update((c) => { c.instagram.posts[i].cor = v; })} />
                <ImageField label="Foto do post" value={p.imagem} folder="instagram" onChange={(v) => update((c) => { c.instagram.posts[i].imagem = v; })} />
              </div>
            </div>
          ))}
        </div>
        <AddBtn label="Adicionar post" onClick={() => update((c) => { c.instagram.posts.push({ cor: "#FF5A4D", imagem: "", legenda: "" } as BioPost); })} />
      </Section>

      {/* PLATAFORMA */}
      <Section title="Marca da plataforma (rodape)">
        <Field label="Nome" value={cfg.plataforma.nome} onChange={(v) => update((c) => { c.plataforma.nome = v; })} />
        <Field label="Descricao" value={cfg.plataforma.descricao} onChange={(v) => update((c) => { c.plataforma.descricao = v; })} />
        <Field label="Link" value={cfg.plataforma.url} onChange={(v) => update((c) => { c.plataforma.url = v; })} />
        <Field label="Atribuicao (rodape)" value={cfg.plataforma.atribuicao} onChange={(v) => update((c) => { c.plataforma.atribuicao = v; })} />
      </Section>

      {/* CHAT */}
      <Section title="Chat / Concierge de IA">
        <Field label="Titulo do card" value={cfg.chat.tituloCard} onChange={(v) => update((c) => { c.chat.tituloCard = v; })} />
        <Field label="Nome da atendente" value={cfg.chat.atendente} onChange={(v) => update((c) => { c.chat.atendente = v; })} />
        <Area label="Mensagem de boas-vindas" value={cfg.chat.boasVindas} onChange={(v) => update((c) => { c.chat.boasVindas = v; })} rows={2} />
        <div>
          <span className="text-[11px] uppercase tracking-wider text-foreground-soft">
            Perguntas do chat (avancado — formato JSON)
          </span>
          <textarea
            value={chatJson}
            rows={12}
            spellCheck={false}
            onChange={(e) => setChatJson(e.target.value)}
            className="mt-1 w-full bg-background border border-foreground/15 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-primary resize-y"
          />
          {chatErr && <div className="text-xs text-red-500 mt-1">{chatErr}</div>}
          <p className="text-[11px] text-foreground-soft mt-1">
            Cada passo tem tipo (bot/escolha/texto), texto e as opcoes. Mexa com cuidado.
          </p>
        </div>
      </Section>

      {/* BARRA DE SALVAR (fixa) */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-foreground/10 p-4 z-20">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          {msg && (
            <span className={`text-xs ${msg.startsWith("Erro") ? "text-red-500" : "text-green-600"}`}>
              {msg}
            </span>
          )}
          <a
            href="/bio"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-xs uppercase tracking-wider text-foreground-soft hover:text-primary font-bold"
          >
            Ver /bio →
          </a>
          <button
            onClick={salvar}
            disabled={saving}
            className="bg-primary text-primary-light px-6 py-3 rounded-xl font-display font-bold text-sm hover:brightness-105 transition disabled:opacity-60"
          >
            {saving ? "Salvando..." : "Salvar alteracoes"}
          </button>
        </div>
      </div>
    </div>
  );
}
