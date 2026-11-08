import { p, Caixa, type Cores } from "./iso";

// A peça que o Claude cria na aula: suporte de celular com "ANA" em relevo.
// O encosto sobe em degraus, que lembram as camadas da impressão.

const PECA: Cores = { top: "#9AD3CF", left: "#5BB0AA", right: "#4FA39E" };
const CELULAR: Cores = { top: "#33436A", left: "#1E2A44", right: "#151E33" };

// Texto deitado no plano z (a "cara" de cima da base).
function TextoNoPlano({ x, y, z, texto, tam, cor }: { x: number; y: number; z: number; texto: string; tam: number; cor: string }) {
  const [ox, oy] = p(x, y, z);
  const [ax, ay] = p(x + 1, y, z);
  const [bx, by] = p(x, y + 1, z);
  return (
    <text
      transform={`matrix(${ax - ox} ${ay - oy} ${bx - ox} ${by - oy} ${ox} ${oy})`}
      fontSize={tam}
      fontWeight={900}
      fontFamily="var(--font-dm-sans), sans-serif"
      textAnchor="middle"
      fill={cor}
    >
      {texto}
    </text>
  );
}

export default function SuporteIso({ className = "" }: { className?: string }) {
  const degraus = 11;
  return (
    <svg viewBox="-140 -140 280 310" className={className} role="img" aria-label="Suporte de celular impresso em 3D com o nome ANA">
      <ellipse cx="0" cy="118" rx="125" ry="40" fill="#000" opacity="0.18" />
      <Caixa x={40} y={40} z={0} w={120} d={110} h={10} c={PECA} />
      {/* encosto inclinado, em camadas */}
      {Array.from({ length: degraus }, (_, k) => (
        <Caixa key={k} x={40} y={52 - k * 2.6} z={10 + k * 11} w={120} d={12} h={11} c={PECA} />
      ))}
      {/* celular apoiado */}
      {Array.from({ length: 9 }, (_, k) => (
        <Caixa key={k} x={52} y={66 - k * 2.6} z={14 + k * 11} w={96} d={6} h={11} c={CELULAR} />
      ))}
      {/* nome em relevo e trava da frente */}
      <TextoNoPlano x={101} y={126} z={10} texto="ANA" tam={30} cor="#2F7C77" />
      <TextoNoPlano x={100} y={124} z={12} texto="ANA" tam={30} cor="#E6F4F3" />
      <Caixa x={40} y={138} z={10} w={120} d={12} h={16} c={PECA} />
    </svg>
  );
}
