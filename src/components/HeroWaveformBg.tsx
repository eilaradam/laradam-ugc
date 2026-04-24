"use client";

/**
 * Waveform de fundo pro Hero — mesmo estilo do áudio da cliente,
 * mas em escala grande, lento e com opacidade baixa pra não
 * competir com o texto.
 */

// Padrão pseudo-random estável (mesmo seed em SSR e client evita hydration diff)
const HEIGHTS = [
  20, 45, 30, 58, 35, 70, 48, 28, 62, 38, 72, 42, 55, 25, 40, 68, 32, 78,
  50, 38, 65, 28, 55, 42, 24, 60, 46, 36, 68, 40, 28, 58, 42, 72, 50, 32,
  64, 38, 26, 52, 44, 66, 30, 58, 46, 72, 36, 50, 68, 28, 44, 60, 38, 70,
  32, 55, 48, 26, 62, 40, 52, 38, 66, 28, 48, 70, 34, 56, 42, 60, 30, 68,
  44, 36, 58, 28, 50, 72, 38, 62, 46, 32, 66, 40, 54, 24, 58, 42, 70, 30,
  48, 64, 36, 56, 28, 50, 72, 38, 44, 60,
];

export default function HeroWaveformBg() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center gap-[3px] md:gap-1 px-4 md:px-8 pointer-events-none opacity-40 md:opacity-50 z-0"
    >
      {HEIGHTS.map((h, i) => (
        <span
          key={i}
          className="flex-1 rounded-full bg-white wave-bar-bg"
          style={{
            height: `${h}%`,
            maxHeight: "45%",
            animationDelay: `${(i % 12) * 120}ms`,
          }}
        />
      ))}
    </div>
  );
}
