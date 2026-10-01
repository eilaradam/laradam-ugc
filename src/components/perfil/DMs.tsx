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
          <span className="av" style={{ background: "var(--azul)", color: "#fff" }}><Headphones className="w-5 h-5" /></span>
          <span className="msg" style={{ background: "var(--azul2)" }}>
            <span className="quem">Cliente · mensagem de voz · 13:52</span>
            <span className="flex items-center gap-1 text-[var(--azul)]">{Array.from({ length: 28 }).map((_, i) => <i key={i} className="block w-[3px] rounded bg-current" style={{ height: `${8 + Math.abs(Math.sin(i * 0.8)) * 18}px` }} />)}</span>
            <span className="reacao">▶ <b>ouvir o áudio</b></span>
          </span>
        </button>
        {TESTIMONIALS.map((t) => (
          <div key={t.brand} className="pf-dm">
            <Avatar brand={t.brand} logoFile={t.logoFile} />
            <div className="msg">
              <div className="quem">{t.instagram ? <a href={`https://instagram.com/${t.instagram}`} target="_blank" rel="noopener">@{t.instagram}</a> : t.brand}{t.role ? ` · ${t.role}` : ""}</div>
              {t.quote}
              {t.metric && <div><span className="reacao">🔥 <b>{t.metric.value}</b> {t.metric.label}</span></div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
