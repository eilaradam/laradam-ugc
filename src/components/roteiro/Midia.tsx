"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Film, ImagePlus, Link2, LoaderCircle, Play, X } from "lucide-react";
import { tipoRef, type Ref } from "@/lib/roteiro";
import { useRoteiro } from "./contexto";

// Fotos que representam o momento do roteiro e links de referência pra marca assistir.
// Só a Lara (link com ?k=) adiciona ou tira; a marca vê e abre.

type Props = { bloco: string; fotos?: string[]; refs?: Ref[]; vazio?: string };

export default function Midia({ bloco, fotos = [], refs = [], vazio }: Props) {
  const { lara, enviar, subirFotos } = useRoteiro();
  const [foto, setFoto] = useState<number | null>(null);
  const [ref, setRef] = useState<Ref | null>(null);
  const [novoLink, setNovoLink] = useState(false);
  const [subindo, setSubindo] = useState(false);
  const arquivo = useRef<HTMLInputElement>(null);

  if (!lara && fotos.length === 0 && refs.length === 0) return null;

  return (
    <div className="space-y-3 pt-1">
      {fotos.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {fotos.map((f, i) => (
            <div key={f} className="group/foto relative">
              <button onClick={() => setFoto(i)} className="block w-full overflow-hidden rounded-xl bg-[var(--rt-linha)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-500 hover:scale-[1.03]" />
              </button>
              {lara && <Tirar onClick={() => enviar("foto_rm", { bloco, url: f })} />}
            </div>
          ))}
        </div>
      )}

      {refs.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {refs.map((r) => (
            <div key={r.url} className="group/foto relative">
              <CartaoRef r={r} abrir={() => setRef(r)} />
              {lara && <Tirar onClick={() => enviar("ref_rm", { bloco, url: r.url })} />}
            </div>
          ))}
        </div>
      )}

      {lara && (
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={arquivo}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={async (e) => {
              const lista = [...(e.target.files ?? [])];
              e.target.value = "";
              if (!lista.length) return;
              setSubindo(true);
              await subirFotos(bloco, lista);
              setSubindo(false);
            }}
          />
          <BotaoLara onClick={() => arquivo.current?.click()} disabled={subindo}>
            {subindo ? <LoaderCircle size={13} className="animate-spin" /> : <ImagePlus size={13} />}
            {subindo ? "Subindo…" : "Fotos"}
          </BotaoLara>
          <BotaoLara onClick={() => setNovoLink((v) => !v)}>
            <Link2 size={13} /> Link de referência
          </BotaoLara>
          {vazio && fotos.length === 0 && refs.length === 0 && <span className="text-[11.5px] text-[var(--rt-muted)]">{vazio}</span>}
        </div>
      )}
      {lara && novoLink && <FormLink fechar={() => setNovoLink(false)} salvar={(url, titulo) => enviar("ref_add", { bloco, url, titulo })} />}

      {foto !== null && <Galeria fotos={fotos} inicio={foto} fechar={() => setFoto(null)} />}
      {ref && <ModalRef r={ref} fechar={() => setRef(null)} />}
    </div>
  );
}

function BotaoLara({ children, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...p}
      className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[var(--rt-roxo)]/50 px-3 py-1.5 text-[12px] font-semibold text-[var(--rt-roxo)] hover:bg-[var(--rt-lilas)] disabled:opacity-50"
    >
      {children}
    </button>
  );
}

function Tirar({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={() => confirm("Tirar do roteiro?") && onClick()}
      className="absolute -right-1.5 -top-1.5 grid size-6 place-items-center rounded-full bg-[var(--rt-ink)] text-white opacity-100 shadow md:opacity-0 md:group-hover/foto:opacity-100"
      aria-label="Tirar"
    >
      <X size={13} />
    </button>
  );
}

const NOME_REDE = { youtube: "YouTube", instagram: "Instagram", tiktok: "TikTok" } as const;

function CartaoRef({ r, abrir }: { r: Ref; abrir: () => void }) {
  const t = tipoRef(r.url);
  const conteudo = (
    <>
      <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-lg bg-[var(--rt-ink)] text-white">
        {t.tipo === "youtube" ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${t.id}/hqdefault.jpg`} alt="" className="absolute inset-0 size-full object-cover opacity-80" />
            <Play size={14} fill="white" className="relative" />
          </>
        ) : t.tipo === "link" ? (
          <ExternalLink size={16} />
        ) : (
          <Film size={16} />
        )}
      </span>
      <span className="min-w-0 pr-1 text-left">
        <span className="block max-w-[220px] truncate text-[13px] font-semibold leading-tight">{r.titulo || "Referência"}</span>
        <span className="block text-[11.5px] text-[var(--rt-muted)]">{t.tipo === "link" ? t.host : `Assistir no ${NOME_REDE[t.tipo]}`}</span>
      </span>
    </>
  );
  const cls =
    "flex items-center gap-2.5 rounded-xl border border-[var(--rt-linha)] bg-white p-1.5 pr-3 transition-colors hover:border-[var(--rt-roxo)]";
  return t.tipo === "link" ? (
    <a href={r.url} target="_blank" rel="noreferrer" className={cls}>
      {conteudo}
    </a>
  ) : (
    <button onClick={abrir} className={cls}>
      {conteudo}
    </button>
  );
}

function FormLink({ fechar, salvar }: { fechar: () => void; salvar: (url: string, titulo: string) => Promise<boolean> }) {
  const [url, setUrl] = useState("");
  const [titulo, setTitulo] = useState("");
  const [enviando, setEnviando] = useState(false);
  const valido = /^https?:\/\/\S+\.\S+/.test(url.trim());
  return (
    <form
      className="flex flex-col gap-2 rounded-xl border border-[var(--rt-linha)] bg-white p-3 sm:flex-row"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!valido) return;
        setEnviando(true);
        const ok = await salvar(url.trim(), titulo.trim());
        setEnviando(false);
        if (ok) fechar();
      }}
    >
      <input
        autoFocus
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Cole o link (Instagram, TikTok, YouTube, Drive…)"
        className="min-w-0 flex-[2] rounded-lg border border-[var(--rt-linha)] px-3 py-2 text-[13px] outline-none focus:border-[var(--rt-roxo)]"
      />
      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Nome (ex.: tom de fala)"
        className="min-w-0 flex-1 rounded-lg border border-[var(--rt-linha)] px-3 py-2 text-[13px] outline-none focus:border-[var(--rt-roxo)]"
      />
      <button disabled={!valido || enviando} className="rounded-full bg-[var(--rt-roxo)] px-4 py-2 text-[13px] font-semibold text-white disabled:opacity-40">
        {enviando ? "Salvando…" : "Adicionar"}
      </button>
    </form>
  );
}

function useEsc(fechar: () => void, extra?: (e: KeyboardEvent) => void) {
  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
      extra?.(e);
    };
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, [fechar, extra]);
}

function Galeria({ fotos, inicio, fechar }: { fotos: string[]; inicio: number; fechar: () => void }) {
  const [i, setI] = useState(inicio);
  const ir = (d: number) => setI((v) => (v + d + fotos.length) % fotos.length);
  useEsc(fechar, (e) => {
    if (e.key === "ArrowRight") ir(1);
    if (e.key === "ArrowLeft") ir(-1);
  });
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-4" onClick={fechar}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={fotos[i]} alt="" className="max-h-[86vh] max-w-full rounded-2xl object-contain" onClick={(e) => e.stopPropagation()} />
      {fotos.length > 1 && (
        <>
          <Seta lado="esq" onClick={() => ir(-1)} />
          <Seta lado="dir" onClick={() => ir(1)} />
          <p className="absolute bottom-5 text-[13px] font-semibold text-white/80">
            {i + 1} / {fotos.length}
          </p>
        </>
      )}
      <button onClick={fechar} className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/15 text-white" aria-label="Fechar">
        <X size={20} />
      </button>
    </div>
  );
}

function Seta({ lado, onClick }: { lado: "esq" | "dir"; onClick: () => void }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white ${lado === "esq" ? "left-3" : "right-3"}`}
      aria-label={lado === "esq" ? "Anterior" : "Próxima"}
    >
      {lado === "esq" ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
    </button>
  );
}

function ModalRef({ r, fechar }: { r: Ref; fechar: () => void }) {
  useEsc(fechar);
  const t = tipoRef(r.url);
  const src =
    t.tipo === "youtube"
      ? `https://www.youtube.com/embed/${t.id}?autoplay=1&playsinline=1&rel=0`
      : t.tipo === "instagram"
        ? `https://www.instagram.com/p/${t.id}/embed/`
        : t.tipo === "tiktok"
          ? `https://www.tiktok.com/embed/v2/${t.id}`
          : null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur-sm" onClick={fechar}>
      <div className="w-[min(92vw,380px)]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-2 flex items-center gap-2 text-white">
          <p className="min-w-0 flex-1 truncate text-[14px] font-semibold">{r.titulo || "Referência"}</p>
          <a href={r.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[12px] text-white/75 hover:text-white">
            abrir <ExternalLink size={12} />
          </a>
          <button onClick={fechar} className="grid size-8 place-items-center rounded-full bg-white/15" aria-label="Fechar">
            <X size={16} />
          </button>
        </div>
        {src && (
          <iframe
            src={src}
            allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
            allowFullScreen
            className="h-[min(78vh,680px)] w-full rounded-2xl bg-white"
          />
        )}
      </div>
    </div>
  );
}
