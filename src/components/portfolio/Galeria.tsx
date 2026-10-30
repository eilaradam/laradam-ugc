"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VIDEOS } from "@/data/content";
import VideoCard from "@/components/VideoCard";
import { useT } from "@/lib/i18n";
import { getOrigem } from "@/lib/tracking";

// Quantos vídeos aparecem antes do "Ver todos" (2 fileiras de 5)
const INICIAIS = 10;

// Vídeos por nicho em abas: uma especialidade de cada vez, em vez de 10 fileiras empilhadas.
// Visita vinda do robô do Seu Influencer (?c=beleza) já abre na aba da campanha e rola até aqui.
export default function Galeria() {
  const t = useT();
  const nichos = t.categories.items.filter((c) => VIDEOS.some((v) => v.category === c.slug));

  // lido depois de montar pra não divergir do HTML do servidor
  const daCampanha = useSyncExternalStore(
    () => () => {},
    () => getOrigem().c ?? null,
    () => null
  );
  const valida = !!daCampanha && nichos.some((c) => c.slug === daCampanha);

  const [escolhida, setEscolhida] = useState<string | null>(null);
  const [todos, setTodos] = useState(false);
  const ativa = escolhida ?? (valida ? daCampanha : nichos[0]?.slug);
  const nicho = nichos.find((c) => c.slug === ativa) ?? nichos[0];
  const videos = VIDEOS.filter((v) => v.category === nicho?.slug);
  const visiveis = todos ? videos : videos.slice(0, INICIAIS);

  // Abre já rolada na galeria: uma vez por visita, e só se a pessoa ainda não mexeu na página.
  // Repete depois que as imagens de cima carregam, porque elas empurram a galeria pra baixo.
  useEffect(() => {
    if (!valida) return;
    const CHAVE = "ugc_pulou_categoria";
    try {
      if (sessionStorage.getItem(CHAVE)) return;
    } catch {}
    let mexeu = false;
    const parar = () => { mexeu = true; };
    window.addEventListener("wheel", parar, { passive: true });
    window.addEventListener("touchstart", parar, { passive: true });
    window.addEventListener("keydown", parar);
    const ir = () => {
      if (mexeu) return;
      const alvo = document.getElementById("categorias");
      if (!alvo) return;
      // desconta o que fica grudado no topo (menu, faixa da data comercial)
      const grudado = [...document.querySelectorAll<HTMLElement>("nav, header, [class*='fixed'], [class*='sticky']")]
        .map((e) => ({ cs: getComputedStyle(e), r: e.getBoundingClientRect() }))
        .filter(({ cs, r }) => (cs.position === "fixed" || cs.position === "sticky") && r.top < 200 && r.height < 300)
        .reduce((m, { r }) => Math.max(m, r.bottom), 0);
      window.scrollTo({ top: alvo.getBoundingClientRect().top + window.scrollY - grudado });
      try { sessionStorage.setItem(CHAVE, "1"); } catch {}
    };
    const timers = [300, 1200, 2500].map((ms) => setTimeout(ir, ms));
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("wheel", parar);
      window.removeEventListener("touchstart", parar);
      window.removeEventListener("keydown", parar);
    };
  }, [valida]);

  return (
    <section id="categorias" className="bg-background-alt px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 mb-8 md:mb-10 items-end">
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">{t.categories.tag}</p>
            <h2 className="font-display font-black text-4xl md:text-6xl leading-[0.95] tracking-tighter text-foreground">
              {t.categories.title1}{" "}
              <span className="font-serif-accent italic text-primary">{t.categories.titleAccent}</span>{" "}
              {t.categories.title2}
            </h2>
          </div>
          <p className="md:col-span-5 text-foreground-soft text-base leading-relaxed md:justify-self-end max-w-sm">
            {t.categories.intro}
          </p>
        </div>

        <div role="tablist" aria-label={t.categories.tabsHint} className="flex flex-wrap gap-2 mb-8 md:mb-10">
          {nichos.map((c) => {
            const on = c.slug === nicho?.slug;
            const n = VIDEOS.filter((v) => v.category === c.slug).length;
            return (
              <button
                key={c.slug}
                type="button"
                role="tab"
                aria-selected={on}
                data-track={`aba_${c.slug}`}
                onClick={() => { setEscolhida(c.slug); setTodos(false); }}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  on
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-foreground border-foreground/10 hover:border-foreground/40"
                }`}
              >
                {c.name}
                <span className={`ml-1.5 text-xs ${on ? "text-background/60" : "text-muted"}`}>{n}</span>
              </button>
            );
          })}
        </div>

        <div id={`cat-${nicho?.slug}`} role="tabpanel">
          <p className="font-serif-accent italic text-foreground-soft mb-5">{nicho?.tagline}</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${nicho?.slug}-${todos}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
            >
              {visiveis.map((v, i) => (
                <VideoCard key={v.id} video={v} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {videos.length > INICIAIS && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                data-track={todos ? `ver_menos_${nicho?.slug}` : `ver_todos_${nicho?.slug}`}
                onClick={() => setTodos(!todos)}
                className="px-6 py-3 rounded-full border border-foreground/20 text-sm font-semibold text-foreground hover:border-foreground transition-colors"
              >
                {todos ? t.categories.verMenos : t.categories.verTodos.replace("{n}", String(videos.length))}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
