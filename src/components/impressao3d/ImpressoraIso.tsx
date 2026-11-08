"use client";

import { useEffect, useState } from "react";

// Impressora 3D fechada (câmara com porta de vidro e unidade de filamento em cima),
// desenhada em perspectiva isométrica em SVG puro, levemente girada pra a quina
// da frente não cortar a máquina ao meio. A peça (um vaso) sobe camada por camada
// e o cabeçote corre de um lado pro outro. Com "reduzir movimento", fica a peça pronta.

const GIRO = (-14 * Math.PI) / 180;
const C = Math.cos(Math.PI / 6);
const S = 0.5;
const p = (x: number, y: number, z: number) => {
  const dx = x - 100;
  const dy = y - 100;
  const rx = 100 + dx * Math.cos(GIRO) - dy * Math.sin(GIRO);
  const ry = 100 + dx * Math.sin(GIRO) + dy * Math.cos(GIRO);
  return [(rx - ry) * C, (rx + ry) * S - z] as const;
};
const pts = (a: (readonly [number, number])[]) => a.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
const quad = (a: [number, number, number][]) => pts(a.map(([x, y, z]) => p(x, y, z)));

type Cores = { top: string; left: string; right: string };
const NAVY: Cores = { top: "#33436A", left: "#1E2A44", right: "#151E33" };
const CLARO: Cores = { top: "#FBFAF5", left: "#E2E2D9", right: "#CBCBBF" };
const TRILHO: Cores = { top: "#9AA3B5", left: "#7C8390", right: "#626A7A" };

function Caixa({ x, y, z, w, d, h, c }: { x: number; y: number; z: number; w: number; d: number; h: number; c: Cores }) {
  return (
    <g>
      <polygon points={quad([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={c.left} />
      <polygon points={quad([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]])} fill={c.right} />
      <polygon points={quad([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={c.top} />
    </g>
  );
}

const CAMADAS = 28;
const ALT = 3.4;
const BASE = 46;
const TETO = 222;
const raio = (i: number) => 17 + 11 * Math.sin((i / CAMADAS) * Math.PI * 0.9) - (i > CAMADAS - 4 ? (i - (CAMADAS - 4)) * 1.6 : 0);

export default function ImpressoraIso({ className = "", onProgresso }: { className?: string; onProgresso?: (pct: number) => void }) {
  const [t, setT] = useState(9.9);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const inicio = performance.now();
    const loop = (agora: number) => {
      setT(((agora - inicio) / 1000) % 12);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // 0 a 9,8s imprime; depois segura a peça pronta e recomeça.
  const n = Math.min(CAMADAS, Math.floor(t / 0.35) + 1);
  const pronto = n >= CAMADAS;
  useEffect(() => onProgresso?.(Math.round((n / CAMADAS) * 100)), [n, onProgresso]);

  const topoPeca = BASE + n * ALT;
  const hx = pronto ? 150 : 100 + Math.cos(t * 5) * raio(n - 1) * 0.9;
  const gz = topoPeca + 8;
  const [bx, by] = p(hx, 100, gz - 6);
  const [tx0, ty0] = p(110, 60, TETO);
  const [tx1, ty1] = p(hx, 99, gz + 30);

  return (
    <svg viewBox="-205 -262 410 480" className={className} role="img" aria-label="Ilustração de uma impressora 3D imprimindo um vaso">
      <defs>
        <radialGradient id="brilho" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD9A0" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FFB45A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="vidro" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.05" />
          <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      <ellipse cx="0" cy="128" rx="205" ry="70" fill="#1E2A44" opacity="0.08" />

      {/* corpo: base e câmara interna */}
      <Caixa x={0} y={0} z={0} w={200} d={200} h={30} c={{ ...NAVY, top: "#10172A" }} />
      <polygon points={quad([[0, 0, 30], [200, 0, 30], [200, 0, TETO], [0, 0, TETO]])} fill="#2A3961" />
      <polygon points={quad([[0, 0, 30], [0, 200, 30], [0, 200, TETO], [0, 0, TETO]])} fill="#202D4D" />

      {/* mesa */}
      <Caixa x={24} y={24} z={34} w={152} d={152} h={12} c={TRILHO} />
      <Caixa x={20} y={20} z={40} w={160} d={160} h={6} c={CLARO} />

      {/* peça */}
      {Array.from({ length: n }, (_, i) => {
        const r = raio(i);
        const z0 = BASE + i * ALT;
        const [cx, cy0] = p(100, 100, z0);
        const cy1 = cy0 - ALT;
        const rx = r * Math.SQRT2 * C;
        const ry = r * Math.SQRT2 * S;
        const lado = i % 2 ? "#4FA39E" : "#5BB0AA";
        return (
          <g key={i}>
            <ellipse cx={cx} cy={cy0} rx={rx} ry={ry} fill={lado} />
            <rect x={cx - rx} y={cy1} width={rx * 2} height={ALT} fill={lado} />
            <ellipse cx={cx} cy={cy1} rx={rx} ry={ry} fill={i === n - 1 ? "#9AD3CF" : lado} />
          </g>
        );
      })}

      {/* tubo de filamento, eixo X e cabeçote */}
      <path d={`M${tx0},${ty0} C${tx0},${ty0 + 60} ${tx1},${ty1 - 60} ${tx1},${ty1}`} fill="none" stroke="#7FC4C0" strokeWidth="3" opacity="0.9" />
      <Caixa x={6} y={94} z={gz + 12} w={188} d={12} h={8} c={TRILHO} />
      <Caixa x={hx - 16} y={86} z={gz} w={32} d={26} h={32} c={CLARO} />
      <polygon points={quad([[hx - 16, 112, gz + 14], [hx + 16, 112, gz + 14], [hx + 16, 112, gz + 20], [hx - 16, 112, gz + 20]])} fill="#5BB0AA" />
      <Caixa x={hx - 3} y={97} z={gz - 7} w={6} d={6} h={7} c={NAVY} />
      {!pronto && <circle cx={bx} cy={by + 2} r="10" fill="url(#brilho)" />}

      {/* vidro (porta e lateral) */}
      <polygon points={quad([[200, 0, 30], [200, 200, 30], [200, 200, TETO], [200, 0, TETO]])} fill="url(#vidro)" />
      <polygon points={quad([[0, 200, 30], [200, 200, 30], [200, 200, TETO], [0, 200, TETO]])} fill="url(#vidro)" />

      {/* quinas e tampa */}
      <Caixa x={192} y={0} z={30} w={8} d={8} h={TETO - 30} c={NAVY} />
      <Caixa x={0} y={192} z={30} w={8} d={8} h={TETO - 30} c={NAVY} />
      <Caixa x={192} y={192} z={30} w={8} d={8} h={TETO - 30} c={NAVY} />
      <Caixa x={0} y={0} z={TETO} w={200} d={200} h={10} c={NAVY} />
      {/* puxador da porta e tela */}
      <polygon points={quad([[200, 30, 110], [200, 36, 110], [200, 36, 150], [200, 30, 150]])} fill="#7FC4C0" />
      <polygon points={quad([[60, 200, 9], [120, 200, 9], [120, 200, 22], [60, 200, 22]])} fill="#7FC4C0" />

      {/* unidade de filamento em cima, com 4 carretéis */}
      <Caixa x={24} y={36} z={TETO + 10} w={152} d={112} h={34} c={CLARO} />
      {["#5BB0AA", "#1E2A44", "#9AD3CF", "#7C8390"].map((cor, i) => (
        <polygon key={cor} points={quad([[34 + i * 36, 148, TETO + 17], [58 + i * 36, 148, TETO + 17], [58 + i * 36, 148, TETO + 37], [34 + i * 36, 148, TETO + 37]])} fill={cor} />
      ))}
    </svg>
  );
}
