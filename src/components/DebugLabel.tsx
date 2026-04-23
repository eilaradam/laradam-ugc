/**
 * Label de debug temporário — mostra o nome da seção e os paddings/margens
 * principais no canto superior esquerdo de cada <section>.
 * Pra remover depois, é só apagar as chamadas <DebugLabel /> e este arquivo.
 */
export default function DebugLabel({
  name,
  info,
}: {
  name: string;
  info: string;
}) {
  return (
    <div className="hidden md:flex absolute top-2 left-2 z-50 pointer-events-none items-center gap-1 px-1.5 py-0.5 rounded bg-primary text-primary-light text-[9px] font-mono tracking-tight shadow-md">
      <span className="font-bold">{name}</span>
      <span className="opacity-80">·</span>
      <span className="opacity-80">{info}</span>
    </div>
  );
}
