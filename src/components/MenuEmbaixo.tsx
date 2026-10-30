"use client";

import { useEffect, useState } from "react";
import { Home, Play, Sparkles, User, MessageCircle } from "lucide-react";
import { useLang, useT } from "@/lib/i18n";

// Menu fixo na parte de baixo da tela, só no celular (no computador o menu fica no topo).
// Acende o item da seção que está na tela.
export default function MenuEmbaixo() {
  const t = useT();
  const { lang } = useLang();
  const itens = [
    { id: "top", label: lang === "en" ? "Home" : "Início", Icone: Home },
    { id: "categorias", label: lang === "en" ? "Videos" : "Vídeos", Icone: Play },
    { id: "servicos", label: t.nav.servicos, Icone: Sparkles },
    { id: "sobre", label: t.nav.sobre, Icone: User },
    { id: "contato", label: t.nav.contato, Icone: MessageCircle },
  ];
  const [ativo, setAtivo] = useState("top");

  useEffect(() => {
    const ids = ["top", "categorias", "servicos", "sobre", "contato"];
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setAtivo((e.target as HTMLElement).id);
      },
      // conta como "na tela" a seção que passa pela faixa do meio
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      aria-label="Menu"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-background/95 backdrop-blur border-t border-foreground/10"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-5">
        {itens.map(({ id, label, Icone }) => {
          const on = ativo === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                data-track={`menu_embaixo_${id}`}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition-colors ${on ? "text-primary" : "text-foreground/60"}`}
              >
                <Icone className="w-5 h-5" strokeWidth={on ? 2.4 : 1.8} />
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
