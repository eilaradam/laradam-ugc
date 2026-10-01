"use client";

import { useState } from "react";
import { Headphones } from "lucide-react";
import { TESTIMONIALS } from "@/data/content";
import { useVideoModal } from "@/components/VideoModalProvider";

// Logos com texto miúdo ficam ilegíveis no círculo: essas usam as iniciais.
const SO_INICIAIS = new Set(["Tropical Especiarias", "Beauty Fair", "Terramazonia"]);

function Avatar({ brand, logoFile }: { brand: string; logoFile?: string }) {
  const [erro, setErro] = useState(SO_INICIAIS.has(brand));
  const iniciais = brand.replace(/[^A-Za-z0-9 ]/g, "").split(" ").map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  return (
    <span className="av">
      {logoFile && !erro ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/logo-1/${logoFile}`} alt={brand} onError={() => setErro(true)} />
      ) : iniciais}
    </span>
  );
}

export default function DMs() {
  const { open } = useVideoModal();
  return (
    <section id="depoimentos" className="pf-sec">
      <h2>O que chega na minha DM 💬</h2>
      <p className="sub">Feedback das marcas, do jeito que chegou. Um deles é áudio de verdade.</p>
      <div className="pf-dms">
        <button
          className="pf-dm text-left"
          onClick={() => open({ id: "audio-cliente", title: "Depoimento de cliente", category: "áudio", brand: "Cliente", youtubeId: "rRrIpSRu90A", audioOnly: true })}
        >
          <span className="av" style={{ background: "var(--azul)", color: "#fff" }}><Headphones className="w-6 h-6" /></span>
          <span className="quote">Mensagem de voz, 13:52</span>
          <span className="flex items-center justify-center gap-1 text-[var(--azul)] my-3">{Array.from({ length: 22 }).map((_, i) => <i key={i} className="block w-[3px] rounded bg-current" style={{ height: `${8 + Math.abs(Math.sin(i * 0.8)) * 16}px` }} />)}</span>
          <span className="quem">Cliente</span>
          <span className="reacao">▶ ouvir o áudio</span>
        </button>
        {TESTIMONIALS.map((t) => (
          <div key={t.brand} className="pf-dm">
            <Avatar brand={t.brand} logoFile={t.logoFile} />
            <div className="quote">&ldquo;{t.quote}&rdquo;</div>
            <div className="quem">{t.instagram ? <a href={`https://instagram.com/${t.instagram}`} target="_blank" rel="noopener">@{t.instagram}</a> : t.brand}</div>
            {t.metric && <span className="reacao">🔥 <b>{t.metric.value}</b> {t.metric.label}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
