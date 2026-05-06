"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Mail,
  ArrowUpRight,
  Briefcase,
  Camera,
  Clapperboard,
  GraduationCap,
  Star,
  MapPin,
  Users,
} from "lucide-react";
import { SITE } from "@/data/content";

type Audience = "marca" | "creator";

type IconProps = { className?: string };

function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.4 7.4c-1.6-.3-3-1.3-3.8-2.7-.3-.5-.5-1-.6-1.6h-3.4v12.6c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5c.3 0 .5 0 .8.1V9.7c-.3 0-.5-.1-.8-.1-3.2 0-5.9 2.6-5.9 5.9s2.6 5.9 5.9 5.9 5.9-2.6 5.9-5.9V9.4c1.3.9 2.9 1.5 4.6 1.5V7.5c-.1 0-.2 0-.2-.1z" />
    </svg>
  );
}

function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23 12s0-3.6-.5-5.4c-.2-1-1-1.8-2-2C18.7 4 12 4 12 4s-6.7 0-8.5.6c-1 .2-1.8 1-2 2C1 8.4 1 12 1 12s0 3.6.5 5.4c.2 1 1 1.8 2 2 1.8.6 8.5.6 8.5.6s6.7 0 8.5-.6c1-.2 1.8-1 2-2 .5-1.8.5-5.4.5-5.4zM10 15.5v-7l6 3.5-6 3.5z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        fill="#25D366"
        d="M16 .4C7.4.4.4 7.4.4 16c0 2.7.7 5.4 2.1 7.7L.3 31.6l8.1-2.1c2.3 1.2 4.9 1.9 7.6 1.9C24.6 31.4 31.6 24.4 31.6 15.8 31.6 11.6 30 7.7 27.1 4.8 24.2 1.9 20.2.4 16 .4z"
      />
      <path
        fill="#FFF"
        d="M16 28.7c-2.4 0-4.7-.6-6.8-1.8l-.5-.3-5 1.3 1.3-4.9-.3-.5c-1.3-2.1-2-4.5-2-7C2.7 8.7 8.7 2.7 16 2.7c3.5 0 6.9 1.4 9.4 3.9 2.5 2.5 3.9 5.9 3.9 9.4 0 7.3-6 12.7-13.3 12.7zm7.4-9.5c-.4-.2-2.4-1.2-2.7-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.5-.2.3-.4.3-.8.1-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.4-2.2-2.8-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.7.1-.3 0-.5-.1-.7-.1-.2-.9-2.2-1.2-3-.3-.8-.7-.7-.9-.7h-.8c-.3 0-.7.1-1.1.5-.4.4-1.4 1.4-1.4 3.4 0 2 1.5 3.9 1.7 4.2.2.3 2.9 4.4 7 6.2 1 .4 1.7.7 2.3.9.9.3 1.8.2 2.5.1.8-.1 2.4-1 2.7-1.9.3-1 .3-1.8.2-1.9-.1-.2-.4-.3-.8-.5z"
      />
    </svg>
  );
}

type LinkCard = {
  label: string;
  description: string;
  href: string;
  eyebrow?: string;
  highlight?: boolean;
  external?: boolean;
  comingSoon?: boolean;
  // Visual: ou logo (imagem em /public) ou ícone Lucide/SVG
  logo?: { src: string; alt: string; bg?: string };
  icon?: React.ComponentType<{ className?: string }>;
};

const MARCA_LINKS: LinkCard[] = [
  {
    label: "Portfólio UGC",
    description: "+500 vídeos, +200 parceiros, 100M+ views",
    href: "/",
    icon: Star,
    highlight: true,
  },
  {
    label: "Solicitar orçamento",
    description: "Falar comigo direto no WhatsApp",
    href: `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
      "Oi Lara! Vim pelo seu Instagram e quero falar sobre um projeto."
    )}`,
    icon: WhatsAppIcon,
    external: true,
  },
  {
    label: "Agência UGC",
    description: "Campanhas com creators gerenciadas do início ao fim",
    href: "/gestao",
    icon: Briefcase,
  },
  {
    label: "Consultoria UGC para Marcas",
    description: "Treinamento de equipe interna para UGC",
    href: `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
      "Oi Lara! Quero saber mais sobre a Consultoria UGC pra marcas."
    )}`,
    icon: Users,
    external: true,
    comingSoon: true,
  },
  {
    label: "Serviços",
    description: "UGC, criativos, roteiros, fotos lifestyle",
    href: "/#services",
    icon: Camera,
  },
  {
    label: "Enviar email",
    description: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: Mail,
    external: true,
  },
];

const CREATOR_LINKS: LinkCard[] = [
  {
    eyebrow: "Curso UGC Manager",
    label: "Manager Club",
    description: "A formação completa pra nova geração de UGC Manager",
    href: "https://kiwify.app/CZ6sO7U",
    logo: { src: "/logo-managerclub.png", alt: "Manager Club" },
    highlight: true,
    external: true,
  },
  {
    label: "Meu Manager",
    description: "App de organização para criadores de conteúdo",
    href: "https://meumanager.com/login",
    logo: { src: "/logo-meumanager.png", alt: "Meu Manager", bg: "#FFFFFF" },
    external: true,
  },
  {
    label: "Banco de Creators",
    description: "Vagas e oportunidades pra creators",
    href: "https://creators.laradam.com/cadastro/",
    icon: Clapperboard,
    external: true,
  },
  {
    eyebrow: "Mentoria UGC",
    label: "Entrar para lista de espera",
    description: "Te aviso quando abrir",
    href: `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
      "Oi Lara! Quero entrar na lista de espera da Mentoria UGC."
    )}`,
    icon: GraduationCap,
    external: true,
  },
  {
    label: "Falar comigo",
    description: "WhatsApp direto",
    href: `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
      "Oi Lara! Sou creator e queria trocar uma ideia com você."
    )}`,
    icon: WhatsAppIcon,
    external: true,
  },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: `https://instagram.com/${SITE.instagram.replace("@", "")}`,
    icon: InstagramIcon,
  },
  {
    label: "TikTok",
    href: `https://tiktok.com/@${SITE.tiktok.replace("@", "")}`,
    icon: TikTokIcon,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@eilaradam",
    icon: YoutubeIcon,
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${SITE.whatsapp}`,
    icon: WhatsAppIcon,
  },
  {
    label: "Email",
    href: `mailto:${SITE.email}`,
    icon: Mail,
  },
];

export default function BioPage() {
  const [audience, setAudience] = useState<Audience>("creator");
  const links = audience === "marca" ? MARCA_LINKS : CREATOR_LINKS;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAF8F4] px-5 pt-8 pb-16 text-foreground">
      {/* Grid quadriculado fininho — mesmo padrão da home */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Glow laranja sutil no topo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(255,88,36,0.22) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[440px] flex-col items-center">
        {/* Capa horizontal — proporção 1920x800, contida na largura */}
        <div
          className="relative w-full overflow-hidden rounded-2xl bg-foreground shadow-[0_10px_30px_-10px_rgba(27,27,27,0.35)] ring-1 ring-black/5"
          style={{ aspectRatio: "1920 / 800" }}
        >
          <Image
            src="/fotobio.png"
            alt="Lara Dam"
            fill
            sizes="(max-width: 480px) 100vw, 440px"
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
            priority
          />
        </div>

        {/* Identity */}
        <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight">
          Lara Dam
        </h1>
        <p className="mt-1 text-sm font-medium text-foreground-soft">
          UGC Creator & Estrategista de Conteúdo
        </p>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted">
          <MapPin className="h-3.5 w-3.5" />
          <span>{SITE.location}</span>
        </div>

        {/* Socials row */}
        <div className="mt-5 flex items-center gap-2.5">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              data-track={`bio_social_${label.toLowerCase()}`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:-translate-y-0.5 hover:bg-primary"
            >
              <Icon className="h-4.5 w-4.5" />
            </a>
          ))}
        </div>

        {/* Tagline */}
        <p className="mt-7 text-center text-[15px] leading-relaxed text-foreground-soft">
          Crio UGC de alta conversão pra marcas e ajudo creators a viverem disso.
          <br />
          <span className="font-serif-accent text-foreground">
            Por onde você quer começar?
          </span>
        </p>

        {/* Audience toggle */}
        <div
          className="mt-5 grid w-full grid-cols-2 gap-2 rounded-full bg-white p-1.5 shadow-sm ring-1 ring-border"
          role="tablist"
          aria-label="Você é creator ou marca?"
        >
          <button
            type="button"
            role="tab"
            aria-selected={audience === "creator"}
            onClick={() => setAudience("creator")}
            data-track="bio_toggle_creator"
            className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
              audience === "creator"
                ? "bg-primary text-white shadow-md"
                : "text-foreground-soft hover:text-foreground"
            }`}
          >
            Sou Creator
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={audience === "marca"}
            onClick={() => setAudience("marca")}
            data-track="bio_toggle_marca"
            className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
              audience === "marca"
                ? "bg-primary text-white shadow-md"
                : "text-foreground-soft hover:text-foreground"
            }`}
          >
            Sou Marca
          </button>
        </div>

        {/* Audience hint */}
        <p className="mt-3 text-center text-xs uppercase tracking-[0.18em] text-muted">
          {audience === "marca"
            ? "Pra marcas que querem criativo que vende"
            : "Pra creators que querem viver de UGC"}
        </p>

        {/* Links list */}
        <div className="mt-4 flex w-full flex-col gap-2.5">
          {links.map((card) => {
            const isExternal = card.external ?? card.href.startsWith("http");
            const baseClasses =
              "group relative flex items-center gap-3 rounded-2xl px-4 py-4 transition-all";
            const styleClasses = card.highlight
              ? "bg-foreground text-background shadow-[0_8px_24px_-8px_rgba(27,27,27,0.4)] hover:bg-primary"
              : "bg-white text-foreground ring-1 ring-border hover:-translate-y-0.5 hover:shadow-md";

            const iconWrapBase =
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl overflow-hidden";

            const renderIcon = () => {
              if (card.logo) {
                return (
                  <span
                    className={`${iconWrapBase} ring-1 ring-black/5`}
                    style={{ background: card.logo.bg ?? "#FFFFFF" }}
                  >
                    <Image
                      src={card.logo.src}
                      alt={card.logo.alt}
                      width={44}
                      height={44}
                      className="h-9 w-9 object-contain"
                    />
                  </span>
                );
              }
              if (card.icon) {
                const Icon = card.icon;
                return (
                  <span
                    className={`${iconWrapBase} ${
                      card.highlight
                        ? "bg-white/15 text-background"
                        : "bg-primary-light text-primary"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                );
              }
              return null;
            };

            const inner = (
              <>
                {renderIcon()}
                <span className="flex-1 min-w-0">
                  {card.eyebrow && (
                    <span
                      className={`block text-[10px] font-semibold uppercase tracking-[0.18em] ${
                        card.highlight ? "text-background/60" : "text-muted"
                      }`}
                    >
                      {card.eyebrow}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`font-display font-bold leading-tight ${
                        card.eyebrow ? "text-[17px]" : "text-[15px]"
                      }`}
                    >
                      {card.label}
                    </span>
                    {card.comingSoon && (
                      <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        Em breve
                      </span>
                    )}
                  </span>
                  <span
                    className={`mt-0.5 block text-xs ${
                      card.highlight ? "text-background/70" : "text-muted"
                    }`}
                  >
                    {card.description}
                  </span>
                </span>
                <ArrowUpRight
                  className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    card.highlight ? "text-background/70" : "text-muted"
                  }`}
                />
              </>
            );

            if (isExternal) {
              return (
                <a
                  key={card.label}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track={`bio_${audience}_${card.label
                    .toLowerCase()
                    .replace(/\s+/g, "_")}`}
                  className={`${baseClasses} ${styleClasses}`}
                >
                  {inner}
                </a>
              );
            }

            return (
              <Link
                key={card.label}
                href={card.href}
                data-track={`bio_${audience}_${card.label
                  .toLowerCase()
                  .replace(/\s+/g, "_")}`}
                className={`${baseClasses} ${styleClasses}`}
              >
                {inner}
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-10 flex flex-col items-center gap-1.5 text-center">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-soft hover:text-primary"
          >
            ugc.laradam.com
          </Link>
          <span className="text-[11px] text-muted">
            © {new Date().getFullYear()} Lara Dam · Todos os direitos reservados
          </span>
        </div>
      </div>
    </main>
  );
}
