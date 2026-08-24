"use client";

import { PROJETO } from "@/data/projeto";
import Ornamento from "./Ornamento";

const LINKS = [
  { href: "#projeto", label: "O projeto" },
  { href: "#tour", label: "Tour 3D" },
  { href: "#procuro", label: "O que procuro" },
  { href: "#parceria", label: "Parceria" },
];

export const waLink = (msg = PROJETO.whatsappMensagem) =>
  `https://wa.me/${PROJETO.whatsapp}?text=${encodeURIComponent(msg)}`;

export default function ProjetoNav() {
  return (
    <header className="sticky top-0 z-40 bg-pj-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 sm:px-10">
        <a href="#topo" className="flex shrink-0 items-center gap-2">
          <Ornamento className="h-5 w-5 text-pj-olive-soft" />
          <span className="pj-label hidden sm:block">Casa Estúdio</span>
        </a>

        <nav className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-pj-line bg-pj-paper p-1.5 [scrollbar-width:none] sm:gap-1.5 [&::-webkit-scrollbar]:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap rounded-full px-3 py-2 text-[12.5px] font-medium transition hover:bg-pj-bg2 sm:px-4 sm:text-[13px]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-pj-ink px-5 py-2.5 text-[13px] font-semibold text-pj-bg transition hover:bg-pj-terra sm:block"
        >
          Falar comigo
        </a>
      </div>
    </header>
  );
}
