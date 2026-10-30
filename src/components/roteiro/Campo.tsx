"use client";

import { useState } from "react";
import { Check, MessageCircle, Pencil, RotateCcw, X } from "lucide-react";
import { diffPalavras, type Nota } from "@/lib/roteiro";
import { quando, useRoteiro } from "./contexto";

// Um trecho do roteiro que a marca pode sugerir mudança ou comentar.
// As sugestões abertas aparecem logo abaixo, com o que sai riscado e o que entra marcado.

type Props = {
  alvo: string;
  texto: string;
  className?: string;
  /** como o texto aparece (aspas, rótulo "Tela" etc.) */
  render?: (t: string) => React.ReactNode;
  multilinha?: boolean;
};

export default function Campo({ alvo, texto, className = "", render, multilinha = true }: Props) {
  const { notas, lara } = useRoteiro();
  const [modo, setModo] = useState<null | "sugerir" | "comentar">(null);
  const [aberto, setAberto] = useState(false);

  const minhas = notas.filter((n) => n.alvo === alvo && n.tipo !== "resposta");
  const abertas = minhas.filter((n) => n.status === "aberta");
  const fechadas = minhas.filter((n) => n.status !== "aberta");
  const [verHistorico, setVerHistorico] = useState(false);

  return (
    <div className={`rt-campo group relative ${className}`}>
      <div
        className={`rt-alvo -mx-2 cursor-text rounded-lg px-2 py-0.5 transition-colors ${
          abertas.length ? "bg-[var(--rt-amarelo)]" : ""
        } ${aberto ? "bg-[var(--rt-lilas)]" : "hover:bg-[var(--rt-lilas)]"}`}
        onClick={() => setAberto((v) => !v)}
      >
        {render ? render(texto) : texto}
      </div>

      <div
        className={`flex gap-1.5 transition-opacity ${
          aberto || modo
            ? "mt-2"
            : "pointer-events-none absolute -top-4 right-0 z-10 opacity-0 md:group-hover:pointer-events-auto md:group-hover:opacity-100"
        }`}
      >
        <Acao icone={<Pencil size={13} />} ativo={modo === "sugerir"} onClick={() => setModo(modo === "sugerir" ? null : "sugerir")}>
          {lara ? "Editar" : "Sugerir mudança"}
        </Acao>
        <Acao icone={<MessageCircle size={13} />} ativo={modo === "comentar"} onClick={() => setModo(modo === "comentar" ? null : "comentar")}>
          Comentar
        </Acao>
      </div>

      {modo && (
        <Formulario
          key={modo}
          alvo={alvo}
          modo={modo}
          inicial={modo === "sugerir" ? texto : ""}
          multilinha={multilinha}
          fechar={() => {
            setModo(null);
            setAberto(false);
          }}
        />
      )}

      {abertas.length > 0 && (
        <div className="mt-2 space-y-2">
          {abertas.map((n) => (
            <NotaCard key={n.id} nota={n} />
          ))}
        </div>
      )}

      {fechadas.length > 0 && (
        <button
          className="mt-1.5 text-[11px] font-medium text-[var(--rt-muted)] underline-offset-2 hover:underline"
          onClick={() => setVerHistorico((v) => !v)}
        >
          {verHistorico ? "esconder histórico" : `histórico (${fechadas.length})`}
        </button>
      )}
      {verHistorico && (
        <div className="mt-2 space-y-2 opacity-70">
          {fechadas.map((n) => (
            <NotaCard key={n.id} nota={n} />
          ))}
        </div>
      )}
    </div>
  );
}

function Acao({ icone, ativo, onClick, children }: { icone: React.ReactNode; ativo?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11.5px] font-semibold shadow-sm transition-colors ${
        ativo
          ? "border-[var(--rt-roxo)] bg-[var(--rt-roxo)] text-white"
          : "border-[var(--rt-linha)] bg-white text-[var(--rt-ink)] hover:border-[var(--rt-roxo)] hover:text-[var(--rt-roxo)]"
      }`}
    >
      {icone}
      {children}
    </button>
  );
}


function Formulario({
  alvo,
  modo,
  inicial,
  multilinha,
  fechar,
}: {
  alvo: string;
  modo: "sugerir" | "comentar";
  inicial: string;
  multilinha: boolean;
  fechar: () => void;
}) {
  const { enviar, lara } = useRoteiro();
  const [texto, setTexto] = useState(inicial);
  const [motivo, setMotivo] = useState("");
  const [enviando, setEnviando] = useState(false);
  const mudou = modo === "sugerir" ? texto.trim() !== inicial.trim() && texto.trim() !== "" : texto.trim() !== "";

  async function mandar() {
    setEnviando(true);
    const ok =
      modo === "sugerir" && lara
        ? await enviar("editar", { alvo, texto: texto.trim() })
        : modo === "sugerir"
        ? await enviar("sugerir", { alvo, sugerido: texto.trim(), texto: motivo.trim() || undefined })
        : await enviar("comentar", { alvo, texto: texto.trim() });
    setEnviando(false);
    if (ok) fechar();
  }

  return (
    <div className="mt-2 rounded-xl border border-[var(--rt-roxo)]/30 bg-white p-3 shadow-[0_6px_24px_-12px_rgba(91,61,245,.35)]">
      <textarea
        autoFocus
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        rows={multilinha ? Math.min(8, Math.max(2, Math.ceil(inicial.length / 70))) : 1}
        placeholder={modo === "comentar" ? "Escreve seu comentário…" : ""}
        className="w-full resize-y rounded-lg border border-[var(--rt-linha)] px-3 py-2 text-[14px] leading-relaxed outline-none focus:border-[var(--rt-roxo)]"
      />
      {modo === "sugerir" && !lara && (
        <>
          {mudou && (
            <p className="mt-2 rounded-lg bg-[var(--rt-fundo)] px-3 py-2 text-[13px] leading-relaxed">
              <Diff de={inicial} para={texto} />
            </p>
          )}
          <input
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Por quê? (opcional)"
            className="mt-2 w-full rounded-lg border border-[var(--rt-linha)] px-3 py-2 text-[13px] outline-none focus:border-[var(--rt-roxo)]"
          />
        </>
      )}
      <div className="mt-2 flex justify-end gap-2">
        <button onClick={fechar} className="rounded-full px-3 py-1.5 text-[13px] font-medium text-[var(--rt-muted)] hover:text-[var(--rt-ink)]">
          Cancelar
        </button>
        <button
          disabled={!mudou || enviando}
          onClick={mandar}
          className="rounded-full bg-[var(--rt-roxo)] px-4 py-1.5 text-[13px] font-semibold text-white disabled:opacity-40"
        >
          {enviando ? "Enviando…" : modo === "sugerir" ? (lara ? "Salvar" : "Enviar sugestão") : "Comentar"}
        </button>
      </div>
    </div>
  );
}

export function Diff({ de, para }: { de: string; para: string }) {
  return (
    <>
      {diffPalavras(de, para).map((p, i) =>
        p.tipo === "igual" ? (
          <span key={i}>{p.t}</span>
        ) : p.tipo === "saiu" ? (
          <del key={i} className="mr-0.5 rounded-sm bg-[#FDE2DF] text-[#B4321F] decoration-[#B4321F]/70">
            {p.t}
          </del>
        ) : (
          <ins key={i} className="rounded-sm bg-[#DDF5E6] font-medium text-[#13703A] no-underline">
            {p.t}
          </ins>
        )
      )}
    </>
  );
}

const SELO: Record<Nota["status"], { txt: string; cls: string } | null> = {
  aberta: null,
  aceita: { txt: "aceita", cls: "bg-[#DDF5E6] text-[#13703A]" },
  recusada: { txt: "recusada", cls: "bg-[#FDE2DF] text-[#B4321F]" },
  resolvida: { txt: "resolvido", cls: "bg-[var(--rt-fundo)] text-[var(--rt-muted)]" },
};

function NotaCard({ nota }: { nota: Nota }) {
  const { notas, lara, enviar } = useRoteiro();
  const respostas = notas.filter((n) => n.parent_id === nota.id);
  const [respondendo, setRespondendo] = useState(false);
  const [resposta, setResposta] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const selo = nota.autor_lara && nota.tipo === "sugestao" ? null : SELO[nota.status];

  async function agir(acao: string, dados: Record<string, unknown>) {
    setOcupado(true);
    await enviar(acao, dados);
    setOcupado(false);
  }

  return (
    <div className="rounded-xl border border-[var(--rt-linha)] bg-white p-3 text-[13px]">
      <div className="flex items-center gap-2">
        <Avatar nome={nota.autor} lara={nota.autor_lara} />
        <span className="font-semibold">{nota.autor}</span>
        <span className="text-[11px] text-[var(--rt-muted)]">
          {nota.tipo === "sugestao" ? (nota.autor_lara ? "editou" : "sugeriu") : "comentou"} · {quando(nota.created_at)}
        </span>
        {selo && <span className={`ml-auto rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${selo.cls}`}>{selo.txt}</span>}
      </div>

      {nota.tipo === "sugestao" && nota.sugerido != null && (
        <p className="mt-2 leading-relaxed">
          <Diff de={nota.original ?? ""} para={nota.sugerido} />
        </p>
      )}
      {nota.texto && <p className={`mt-1.5 leading-relaxed ${nota.tipo === "sugestao" ? "text-[var(--rt-muted)] italic" : ""}`}>{nota.texto}</p>}

      {respostas.map((r) => (
        <div key={r.id} className="mt-2 border-l-2 border-[var(--rt-linha)] pl-3">
          <div className="flex items-center gap-2">
            <Avatar nome={r.autor} lara={r.autor_lara} />
            <span className="font-semibold">{r.autor}</span>
            <span className="text-[11px] text-[var(--rt-muted)]">{quando(r.created_at)}</span>
          </div>
          <p className="mt-1 leading-relaxed">{r.texto}</p>
        </div>
      ))}

      {respondendo && (
        <div className="mt-2">
              <textarea
            autoFocus
            rows={2}
            value={resposta}
            onChange={(e) => setResposta(e.target.value)}
            placeholder="Responder…"
            className="w-full rounded-lg border border-[var(--rt-linha)] px-3 py-2 outline-none focus:border-[var(--rt-roxo)]"
          />
          <div className="mt-1 flex justify-end gap-2">
            <button onClick={() => setRespondendo(false)} className="px-2 text-[var(--rt-muted)]">
              Cancelar
            </button>
            <button
              disabled={!resposta.trim() || ocupado}
              onClick={async () => {
                setOcupado(true);
                const ok = await enviar("responder", { parent_id: nota.id, texto: resposta.trim() });
                setOcupado(false);
                if (ok) {
                  setResposta("");
                  setRespondendo(false);
                }
              }}
              className="rounded-full bg-[var(--rt-ink)] px-3 py-1 font-semibold text-white disabled:opacity-40"
            >
              Responder
            </button>
          </div>
        </div>
      )}

      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {!respondendo && (
          <button onClick={() => setRespondendo(true)} className="rounded-full px-2 py-1 text-[12px] font-medium text-[var(--rt-muted)] hover:text-[var(--rt-ink)]">
            Responder
          </button>
        )}
        {lara && nota.status === "aberta" && nota.tipo === "sugestao" && (
          <>
            <BotaoLara onClick={() => agir("aceitar", { id: nota.id })} disabled={ocupado} cor="verde" icone={<Check size={13} />}>
              Aceitar
            </BotaoLara>
            <BotaoLara onClick={() => agir("recusar", { id: nota.id })} disabled={ocupado} icone={<X size={13} />}>
              Recusar
            </BotaoLara>
          </>
        )}
        {lara && nota.status === "aberta" && nota.tipo === "comentario" && (
          <BotaoLara onClick={() => agir("resolver", { id: nota.id })} disabled={ocupado} cor="verde" icone={<Check size={13} />}>
            Resolver
          </BotaoLara>
        )}
        {lara && nota.status !== "aberta" && nota.status !== "aceita" && (
          <BotaoLara onClick={() => agir("reabrir", { id: nota.id })} disabled={ocupado} icone={<RotateCcw size={12} />}>
            Reabrir
          </BotaoLara>
        )}
      </div>
    </div>
  );
}

function BotaoLara({
  children,
  icone,
  cor,
  ...p
}: { children: React.ReactNode; icone: React.ReactNode; cor?: "verde" } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...p}
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-semibold disabled:opacity-40 ${
        cor === "verde" ? "bg-[#13703A] text-white" : "border border-[var(--rt-linha)] text-[var(--rt-ink)]"
      }`}
    >
      {icone}
      {children}
    </button>
  );
}

export function Avatar({ nome, lara }: { nome: string; lara?: boolean }) {
  return (
    <span
      className={`grid size-5 shrink-0 place-items-center rounded-full text-[10px] font-bold ${
        lara ? "bg-[var(--rt-roxo)] text-white" : "bg-[var(--rt-ink)] text-white"
      }`}
    >
      {nome.trim().charAt(0).toUpperCase()}
    </span>
  );
}
