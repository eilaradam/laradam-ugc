"use client";

import { PERFIL } from "@/data/perfil";

// Rodapé + botão fixo de WhatsApp (celular). `zap` muda a mensagem por página.
export default function Rodape({ zap = PERFIL.whatsappUrl, zapRotulo = "💬 Chamar no WhatsApp", track = "zap_fixo" }: { zap?: string; zapRotulo?: string; track?: string }) {
  return (
    <>
      <footer className="pf-rodape">
        <div className="links">
          <a href={PERFIL.instagramUrl} target="_blank" rel="noopener">Instagram @{PERFIL.usuario}</a>
          <a href={PERFIL.tiktokUrl} target="_blank" rel="noopener">TikTok @{PERFIL.tiktok}</a>
          <a href="/entrada">Início</a>
          <a href={`mailto:${PERFIL.email}`}>{PERFIL.email}</a>
        </div>
        <div>© {new Date().getFullYear()} Lara Dam · UGC creator & influenciadora · Litoral de SP</div>
      </footer>
      <a href={zap} target="_blank" rel="noopener" className="pf-zap-fixo" data-track={track} aria-label="Chamar a Lara no WhatsApp">{zapRotulo}</a>
    </>
  );
}
