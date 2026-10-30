"use client";

import { createContext, useContext } from "react";
import type { Nota } from "@/lib/roteiro";

export type Enviar = (acao: string, dados?: Record<string, unknown>) => Promise<boolean>;

type Ctx = {
  nome: string;
  setNome: (n: string) => void;
  lara: boolean;
  notas: Nota[];
  enviar: Enviar;
  /** só no modo Lara: sobe fotos pra um bloco ("gancho:A", "parte:x", "geral") */
  subirFotos: (bloco: string, arquivos: File[]) => Promise<void>;
};

export const RoteiroCtx = createContext<Ctx | null>(null);

export function useRoteiro() {
  const c = useContext(RoteiroCtx);
  if (!c) throw new Error("useRoteiro fora do RoteiroCtx");
  return c;
}

export function quando(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}
