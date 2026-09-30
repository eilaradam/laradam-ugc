"use client";

import { useEffect, useRef } from "react";

// Fundo branco com pontilhado em azul que reage ao mouse (ou ao dedo):
// perto do cursor os pontos crescem, escurecem e se afastam um pouco, como
// uma lente passando por cima. Canvas fixo atrás de tudo.
export default function Fundo() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1;
    let passo = 24;
    let pontos: { x: number; y: number }[] = [];
    const alvo = { x: -9999, y: -9999 };
    const cursor = { x: -9999, y: -9999 };
    let raf = 0;
    let ultimoScroll = window.scrollY;
    let energia = 0; // velocidade da rolagem, suavizada
    let t0 = performance.now();

    const montar = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      passo = w < 768 ? 20 : 24;
      pontos = [];
      for (let y = passo / 2; y < h + passo; y += passo) {
        for (let x = passo / 2; x < w + passo; x += passo) pontos.push({ x, y });
      }
    };

    const desenhar = (agora: number) => {
      const dt = Math.min(0.05, (agora - t0) / 1000);
      t0 = agora;
      // suaviza o cursor
      cursor.x += (alvo.x - cursor.x) * 0.18;
      cursor.y += (alvo.y - cursor.y) * 0.18;
      // energia da rolagem
      const v = Math.abs(window.scrollY - ultimoScroll);
      ultimoScroll = window.scrollY;
      energia += (Math.min(1, v / 60) - energia) * 0.12;

      ctx.clearRect(0, 0, w, h);
      const R = w < 768 ? 120 : 170;
      const respira = 0.5 + 0.5 * Math.sin(agora / 1400);
      for (const p of pontos) {
        const dx = p.x - cursor.x;
        const dy = p.y - cursor.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        let r = 1.15 + energia * 0.6 + respira * 0.15;
        let a = 0.16 + energia * 0.12;
        let ox = 0, oy = 0;
        if (d < R) {
          const k = 1 - d / R;           // 0 na borda, 1 no centro
          const s = k * k * (3 - 2 * k); // smoothstep
          r += 3.2 * s;
          a += 0.7 * s;
          const emp = 7 * s;             // empurra pra fora, efeito lente
          if (d > 0.001) { ox = (dx / d) * emp; oy = (dy / d) * emp; }
        }
        ctx.beginPath();
        ctx.arc(p.x + ox, p.y + oy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(27,36,64,${Math.min(0.95, a)})`;
        ctx.fill();
      }
      // anel azul fininho ao redor do cursor
      if (cursor.x > -999) {
        ctx.beginPath();
        ctx.arc(cursor.x, cursor.y, R * 0.55 + Math.sin(agora / 600) * 2, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(46,91,255,0.18)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      void dt;
      raf = requestAnimationFrame(desenhar);
    };

    const onMove = (e: PointerEvent) => { alvo.x = e.clientX; alvo.y = e.clientY; };
    const onLeave = () => { alvo.x = -9999; alvo.y = -9999; };
    const onTouch = (e: TouchEvent) => { const t = e.touches[0]; if (t) { alvo.x = t.clientX; alvo.y = t.clientY; } };

    montar();
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzir) {
      // sem animação: só o pontilhado parado
      ctx.clearRect(0, 0, w, h);
      for (const p of pontos) { ctx.beginPath(); ctx.arc(p.x, p.y, 1.15, 0, Math.PI * 2); ctx.fillStyle = "rgba(27,36,64,0.16)"; ctx.fill(); }
      window.addEventListener("resize", montar);
      return () => window.removeEventListener("resize", montar);
    }
    raf = requestAnimationFrame(desenhar);
    window.addEventListener("resize", montar);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", montar);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchstart", onTouch);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="fixed inset-0 z-0 pointer-events-none" />;
}
