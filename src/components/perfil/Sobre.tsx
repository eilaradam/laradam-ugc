"use client";

import { SOBRE } from "@/data/perfil";

export default function Sobre() {
  return (
    <section id="sobre" className="pf-sec">
      <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-center">
        <div className="md:col-span-5 relative">
          <div className="pf-caixa !p-2 md:!p-3" style={{ boxShadow: "8px 8px 0 var(--azul3)" }}>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={SOBRE.foto} alt="Lara Dam apoiada no sofá do estúdio" loading="lazy" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 35%" }} />
            </div>
          </div>
          <svg className="absolute -left-3 -bottom-6 w-28 h-28 md:w-36 md:h-36" viewBox="0 0 200 200" aria-hidden>
            <defs><path id="pf-c" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" /></defs>
            <circle cx="100" cy="100" r="92" fill="#fff" stroke="#14213D" strokeWidth="4" /><circle cx="100" cy="100" r="52" fill="var(--claro2)" stroke="#14213D" strokeWidth="3" />
            <text fontFamily="var(--pf-font)" fontWeight="800" fontSize="19" fill="#14213D" letterSpacing="3"><textPath href="#pf-c">UGC CREATOR ★ INFLUENCIADORA ★ LITORAL DE SP ★ </textPath></text>
            <text x="100" y="110" textAnchor="middle" fontFamily="var(--pf-font)" fontWeight="800" fontSize="30" fill="#14213D">2026</text>
          </svg>
        </div>
        <div className="md:col-span-7">
          <h2>{SOBRE.titulo}</h2>
          <p className="mt-4 font-semibold text-base md:text-lg leading-relaxed">{SOBRE.p1}</p>
          <p className="mt-3 font-semibold text-base md:text-lg leading-relaxed text-[var(--cinza)]">{SOBRE.p2}</p>
          <div className="mt-5 text-xs font-extrabold uppercase tracking-widest text-[var(--cinza)]">{SOBRE.nichosTitulo}</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {SOBRE.pills.map((p, i) => (
              <span key={p} className="px-3 py-2 rounded-xl border-2 border-[var(--ink)] text-sm font-extrabold" style={{ background: i % 2 ? "#fff" : "var(--claro2)" }}>{p}</span>
            ))}
          </div>
          <div className="mt-6 pf-caixa" style={{ boxShadow: "none", padding: 0, overflow: "hidden" }}>
            <div className="px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest bg-[var(--azul2)] border-b-2 border-[var(--ink)]">Ficha técnica de uma campanha comigo</div>
            {SOBRE.ficha.map((f) => (
              <div key={f.k} className="flex justify-between gap-4 px-4 py-2.5 border-b border-[var(--linha)] last:border-b-0 text-sm"><span className="font-bold text-[var(--cinza)]">{f.k}</span><span className="font-extrabold text-right">{f.v}</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
