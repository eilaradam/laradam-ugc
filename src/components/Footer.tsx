import { SITE } from "@/data/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-foreground text-background border-t border-background/10 px-6 md:px-12 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="font-display font-black text-xl">
            LARA DAM<span className="text-primary">.</span>
          </div>
          <div className="text-xs uppercase tracking-wider text-background/50 mt-1">
            {SITE.role}
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-wider text-background/50">
          <a href={`mailto:${SITE.email}`} className="hover:text-primary">
            {SITE.email}
          </a>
          <span>·</span>
          <a
            href={`https://instagram.com/${SITE.instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener"
            className="hover:text-primary"
          >
            Instagram
          </a>
          <span>·</span>
          <span>© {year}</span>
        </div>
      </div>
    </footer>
  );
}
