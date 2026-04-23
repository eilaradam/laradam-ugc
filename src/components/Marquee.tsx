import { MARQUEE_ITEMS } from "@/data/content";

export default function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="bg-foreground text-background py-6 overflow-hidden border-y border-foreground/10">
      <div className="marquee">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display font-black text-2xl md:text-4xl uppercase tracking-tight flex items-center gap-8"
          >
            {item}
            <span className="text-primary">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
