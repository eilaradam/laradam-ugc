/** Asterisco decorativo (referência INKED). */
export default function Ornamento({
  className = "h-6 w-6",
  cor = "currentColor",
}: {
  className?: string;
  cor?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={cor} aria-hidden>
      <path d="M12 0c.6 3.2.9 5.6.9 7.2 1.1-1.1 2.8-2.8 5.1-5.1l1.9 1.9c-2.3 2.3-4 4-5.1 5.1 1.6 0 4-.3 7.2-.9v2.7c-3.2-.6-5.6-.9-7.2-.9 1.1 1.1 2.8 2.8 5.1 5.1l-1.9 1.9c-2.3-2.3-4-4-5.1-5.1 0 1.6.3 4 .9 7.2h-2.7c.6-3.2.9-5.6.9-7.2-1.1 1.1-2.8 2.8-5.1 5.1l-1.9-1.9c2.3-2.3 4-4 5.1-5.1-1.6 0-4 .3-7.2.9v-2.7c3.2.6 5.6.9 7.2.9-1.1-1.1-2.8-2.8-5.1-5.1l1.9-1.9c2.3 2.3 4 4 5.1 5.1 0-1.6-.3-4-.9-7.2h2.7z" />
    </svg>
  );
}
