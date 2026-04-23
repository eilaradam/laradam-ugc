import { MARQUEE_ITEMS } from "@/data/content";

export default function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="bg-foreground text-background py-2.5 overflow-hidden border-y border-foreground/10">
      <div className="marquee">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display font-bold text-xs md:text-sm uppercase tracking-[0.15em] flex items-center gap-4"
          >
            {item}
            <span className="text-primary">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
