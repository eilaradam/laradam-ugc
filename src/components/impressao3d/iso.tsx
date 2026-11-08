// Projeção isométrica (levemente girada) e caixa 3D, usadas pela impressora e pela peça.
export const GIRO = (-14 * Math.PI) / 180;
export const C = Math.cos(Math.PI / 6);
export const S = 0.5;
export const p = (x: number, y: number, z: number) => {
  const dx = x - 100;
  const dy = y - 100;
  const rx = 100 + dx * Math.cos(GIRO) - dy * Math.sin(GIRO);
  const ry = 100 + dx * Math.sin(GIRO) + dy * Math.cos(GIRO);
  return [(rx - ry) * C, (rx + ry) * S - z] as const;
};
export const pts = (a: (readonly [number, number])[]) => a.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
export const quad = (a: [number, number, number][]) => pts(a.map(([x, y, z]) => p(x, y, z)));

export type Cores = { top: string; left: string; right: string };
export const NAVY: Cores = { top: "#33436A", left: "#1E2A44", right: "#151E33" };
export const CLARO: Cores = { top: "#FBFAF5", left: "#E2E2D9", right: "#CBCBBF" };
export const TRILHO: Cores = { top: "#9AA3B5", left: "#7C8390", right: "#626A7A" };

export function Caixa({ x, y, z, w, d, h, c }: { x: number; y: number; z: number; w: number; d: number; h: number; c: Cores }) {
  return (
    <g>
      <polygon points={quad([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={c.left} />
      <polygon points={quad([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]])} fill={c.right} />
      <polygon points={quad([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={c.top} />
    </g>
  );
}

