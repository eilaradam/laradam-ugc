"use client";

import { useState } from "react";

export function HeroPhoto({
  className = "",
  rounded = false,
}: {
  className?: string;
  rounded?: boolean;
}) {
  const SOURCES = [
    "/lara-fundo.png",
    "/larafundo.png",
    "/lara-hero.png",
    "/lara-hero.jpg",
    "/lara-sobre.jpg",
  ];
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  const isPng = SOURCES[idx]?.endsWith(".png");

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={SOURCES[idx]}
      alt="Lara Dam"
      className={`${className} ${
        !isPng && rounded ? "rounded-2xl shadow-2xl object-cover" : "object-contain"
      }`}
      onError={() => {
        if (idx < SOURCES.length - 1) setIdx(idx + 1);
        else setFailed(true);
      }}
    />
  );
}
