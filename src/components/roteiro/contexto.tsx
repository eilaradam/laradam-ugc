"use client";

import { createContext, useContext } from "react";
import type { Lingua, Nota } from "@/lib/roteiro";
import type { Textos } from "./textos";

export type Enviar = (acao: string, dados?: Record<string, unknown>) => Promise<boolean>;

type Ctx = {
  nome: string;
  setNome: (n: string) => void;
  lara: boolean;
  notas: Nota[];
  enviar: Enviar;
  /** só no modo Lara: sobe fotos pra um bloco ("gancho:A", "parte:x", "geral") */
  subirFotos: (bloco: string, arquivos: File[]) => Promise<void>;
  lingua: Lingua;
  t: Textos;
  /** tradução do trecho na língua escolhida (null em português ou sem tradução) */
  traduzir: (alvo: string, original: string) => { texto: string; velha: boolean } | null;
};

export const RoteiroCtx = createContext<Ctx | null>(null);

export function useRoteiro() {
  const c = useContext(RoteiroCtx);
  if (!c) throw new Error("useRoteiro fora do RoteiroCtx");
  return c;
}

const LOCALE: Record<Lingua, string> = { pt: "pt-BR", en: "en-US", es: "es" };

export function quando(iso: string, lingua: Lingua = "pt") {
  return new Date(iso).toLocaleString(LOCALE[lingua], { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}
