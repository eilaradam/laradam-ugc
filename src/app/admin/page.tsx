"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabase, type Lead, type EventRow } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

const ALLOWED_EMAIL = "laradam.ugc@gmail.com";

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [configError, setConfigError] = useState<string | null>(null);

  useEffect(() => {
    let sb: ReturnType<typeof getSupabase>;
    try {
      sb = getSupabase();
    } catch (e) {
      setConfigError(e instanceof Error ? e.message : "Erro de configuração");
      setLoading(false);
      return;
    }
    sb.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (configError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 px-6 text-center">
        <h1 className="font-display font-black text-2xl">Configuração pendente</h1>
        <p className="text-foreground-soft text-sm max-w-md">{configError}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted">
        Carregando...
      </div>
    );
  }

  if (!session) return <Login />;

  if (session.user.email?.toLowerCase() !== ALLOWED_EMAIL) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6">
        <h1 className="font-display font-black text-2xl">Acesso negado</h1>
        <p className="text-foreground-soft text-sm">
          Esse email ({session.user.email}) não tem permissão.
        </p>
        <button
          onClick={() => getSupabase().auth.signOut()}
          className="text-sm text-primary underline"
        >
          Sair
        </button>
      </div>
    );
  }

  return <Dashboard email={session.user.email!} />;
}

function Login() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);
    const { error } = await getSupabase().auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo:
          typeof window !== "undefined" ? `${window.location.origin}/admin` : undefined,
      },
    });
    if (error) setError(error.message);
    else setSent(true);
    setSending(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="font-display font-black text-2xl mb-1">
          LARA DAM<span className="text-primary">.</span>
        </div>
        <h1 className="font-display font-black text-3xl tracking-tight mb-6">
          Admin
        </h1>

        {sent ? (
          <div className="rounded-2xl bg-primary-light border border-primary/20 px-5 py-6 text-center">
            <div className="text-2xl mb-2">📬</div>
            <div className="font-semibold text-foreground mb-1">
              Link enviado pra {email}
            </div>
            <div className="text-xs text-foreground-soft">
              Clica no link do email pra entrar.
            </div>
          </div>
        ) : (
          <form onSubmit={send} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="w-full bg-background border border-foreground/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            />
            {error && <div className="text-xs text-red-600">{error}</div>}
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-foreground text-background py-3 rounded-xl font-semibold text-sm hover:bg-primary transition-colors disabled:opacity-60"
            >
              {sending ? "Enviando..." : "Enviar link de acesso"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

type Tab = "overview" | "leads" | "buttons" | "videos";

function Dashboard({ email }: { email: string }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("overview");
  const [days, setDays] = useState<7 | 30 | 90 | 0>(30); // 0 = all

  useEffect(() => {
    let active = true;
    (async () => {
      const sb = getSupabase();
      const [leadsRes, eventsRes] = await Promise.all([
        sb.from("leads").select("*").order("created_at", { ascending: false }),
        sb
          .from("events")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(20000),
      ]);
      if (!active) return;
      if (leadsRes.error) console.error(leadsRes.error);
      if (eventsRes.error) console.error(eventsRes.error);
      setLeads((leadsRes.data as Lead[]) ?? []);
      setEvents((eventsRes.data as EventRow[]) ?? []);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const filteredEvents = useMemo(() => {
    if (days === 0) return events;
    const cutoff = Date.now() - days * 86400_000;
    return events.filter((e) => new Date(e.created_at).getTime() >= cutoff);
  }, [events, days]);

  const filteredLeads = useMemo(() => {
    if (days === 0) return leads;
    const cutoff = Date.now() - days * 86400_000;
    return leads.filter((l) => new Date(l.created_at).getTime() >= cutoff);
  }, [leads, days]);

  const stats = useMemo(() => {
    const pageViews = filteredEvents.filter((e) => e.event_type === "page_view");
    const uniqueSessions = new Set(
      pageViews.map((e) => e.session_id).filter(Boolean)
    ).size;
    const buttonClicks = filteredEvents.filter(
      (e) => e.event_type === "button_click"
    );
    const videoViews = filteredEvents.filter((e) => e.event_type === "video_view");

    return {
      pageViews: pageViews.length,
      uniqueVisitors: uniqueSessions,
      buttonClicks: buttonClicks.length,
      videoViews: videoViews.length,
      leads: filteredLeads.length,
    };
  }, [filteredEvents, filteredLeads]);

  const buttonAgg = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of filteredEvents) {
      if (e.event_type !== "button_click") continue;
      map.set(e.event_name, (map.get(e.event_name) ?? 0) + 1);
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [filteredEvents]);

  const videoAgg = useMemo(() => {
    const map = new Map<
      string,
      { count: number; title?: string; brand?: string; category?: string }
    >();
    for (const e of filteredEvents) {
      if (e.event_type !== "video_view") continue;
      const cur = map.get(e.event_name) ?? { count: 0 };
      cur.count += 1;
      const m = e.metadata as Record<string, unknown> | null;
      if (m && typeof m === "object") {
        if (typeof m.title === "string") cur.title = m.title;
        if (typeof m.brand === "string") cur.brand = m.brand;
        if (typeof m.category === "string") cur.category = m.category;
      }
      map.set(e.event_name, cur);
    }
    return [...map.entries()].sort((a, b) => b[1].count - a[1].count);
  }, [filteredEvents]);

  const dailyViews = useMemo(() => {
    const days = 14;
    const buckets: { date: string; count: number }[] = [];
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 86400_000);
      buckets.push({ date: d.toISOString().slice(0, 10), count: 0 });
    }
    for (const e of filteredEvents) {
      if (e.event_type !== "page_view") continue;
      const day = e.created_at.slice(0, 10);
      const b = buckets.find((x) => x.date === day);
      if (b) b.count++;
    }
    return buckets;
  }, [filteredEvents]);

  return (
    <div className="min-h-screen px-4 md:px-8 py-6 md:py-10 bg-background">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <div className="font-display font-black text-xl mb-0.5">
              LARA DAM<span className="text-primary">.</span> · Admin
            </div>
            <div className="text-xs text-foreground-soft">{email}</div>
          </div>
          <button
            onClick={() => getSupabase().auth.signOut()}
            className="text-xs uppercase tracking-wider text-foreground-soft hover:text-primary"
          >
            Sair →
          </button>
        </header>

        {/* Tabs + range */}
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
          {(["overview", "leads", "buttons", "videos"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-full uppercase tracking-wider font-bold transition-colors ${
                tab === t
                  ? "bg-foreground text-background"
                  : "bg-foreground/5 text-foreground-soft hover:bg-foreground/10"
              }`}
            >
              {tabLabel(t)}
            </button>
          ))}
          <span className="ml-auto flex items-center gap-1.5">
            {([7, 30, 90, 0] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-2.5 py-1 rounded-full uppercase tracking-wider font-bold text-[10px] transition-colors ${
                  days === d
                    ? "bg-primary text-primary-light"
                    : "bg-foreground/5 text-foreground-soft hover:bg-foreground/10"
                }`}
              >
                {d === 0 ? "Tudo" : `${d}d`}
              </button>
            ))}
          </span>
        </div>

        {loading ? (
          <div className="py-20 text-center text-foreground-soft">Carregando...</div>
        ) : (
          <>
            {tab === "overview" && (
              <Overview stats={stats} dailyViews={dailyViews} />
            )}
            {tab === "leads" && <LeadsList leads={filteredLeads} />}
            {tab === "buttons" && <ButtonsList items={buttonAgg} />}
            {tab === "videos" && <VideosList items={videoAgg} />}
          </>
        )}
      </div>
    </div>
  );
}

function tabLabel(t: Tab) {
  switch (t) {
    case "overview":
      return "Visão geral";
    case "leads":
      return "Leads";
    case "buttons":
      return "Botões";
    case "videos":
      return "Vídeos";
  }
}

function Overview({
  stats,
  dailyViews,
}: {
  stats: {
    pageViews: number;
    uniqueVisitors: number;
    buttonClicks: number;
    videoViews: number;
    leads: number;
  };
  dailyViews: { date: string; count: number }[];
}) {
  const max = Math.max(1, ...dailyViews.map((d) => d.count));
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatCard label="Visitas" value={stats.pageViews} />
        <StatCard label="Visitantes únicos" value={stats.uniqueVisitors} />
        <StatCard label="Cliques em botões" value={stats.buttonClicks} />
        <StatCard label="Vídeos vistos" value={stats.videoViews} />
        <StatCard label="Leads" value={stats.leads} accent />
      </div>

      <div className="rounded-2xl border border-foreground/10 p-5">
        <div className="text-xs uppercase tracking-wider text-foreground-soft mb-4">
          Visitas — últimos 14 dias
        </div>
        <div className="flex items-end gap-1.5 h-32">
          {dailyViews.map((d) => (
            <div
              key={d.date}
              className="flex-1 flex flex-col items-center gap-1 group"
              title={`${d.date}: ${d.count}`}
            >
              <div
                className="w-full bg-primary rounded-t transition-all group-hover:bg-primary-dark"
                style={{ height: `${(d.count / max) * 100}%`, minHeight: 2 }}
              />
              <div className="text-[9px] text-foreground-soft">
                {d.date.slice(8, 10)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-4 border ${
        accent
          ? "bg-primary text-primary-light border-primary"
          : "border-foreground/10"
      }`}
    >
      <div
        className={`text-[10px] uppercase tracking-wider ${
          accent ? "text-primary-light/80" : "text-foreground-soft"
        }`}
      >
        {label}
      </div>
      <div className="font-display font-black text-3xl mt-1">{value}</div>
    </div>
  );
}

function ButtonsList({ items }: { items: [string, number][] }) {
  if (items.length === 0)
    return (
      <div className="py-20 text-center text-foreground-soft">
        Nenhum clique registrado ainda.
      </div>
    );
  const max = items[0][1];
  return (
    <div className="space-y-2">
      {items.map(([name, count]) => (
        <div
          key={name}
          className="rounded-xl border border-foreground/10 p-4 flex items-center gap-4"
        >
          <div className="flex-1 min-w-0">
            <div className="font-mono text-xs text-foreground truncate">{name}</div>
            <div className="mt-1.5 h-1.5 rounded-full bg-foreground/5 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${(count / max) * 100}%` }}
              />
            </div>
          </div>
          <div className="font-display font-black text-2xl tabular-nums">
            {count}
          </div>
        </div>
      ))}
    </div>
  );
}

function VideosList({
  items,
}: {
  items: [
    string,
    { count: number; title?: string; brand?: string; category?: string }
  ][];
}) {
  if (items.length === 0)
    return (
      <div className="py-20 text-center text-foreground-soft">
        Nenhum vídeo visualizado ainda.
      </div>
    );
  const max = items[0][1].count;
  return (
    <div className="space-y-2">
      {items.map(([id, info]) => (
        <div
          key={id}
          className="rounded-xl border border-foreground/10 p-3 flex items-center gap-3"
        >
          <a
            href={`https://www.youtube.com/watch?v=${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
          >
            <img
              src={`https://i.ytimg.com/vi/${id}/mqdefault.jpg`}
              alt={info.title ?? id}
              className="w-24 h-14 object-cover rounded-md bg-foreground/5"
            />
          </a>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-foreground truncate">
              {info.title ?? id}
            </div>
            <div className="text-xs text-foreground-soft truncate">
              {[info.brand, info.category].filter(Boolean).join(" · ") || id}
            </div>
            <div className="mt-1.5 h-1.5 rounded-full bg-foreground/5 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${(info.count / max) * 100}%` }}
              />
            </div>
          </div>
          <div className="font-display font-black text-2xl tabular-nums flex-shrink-0">
            {info.count}
          </div>
        </div>
      ))}
    </div>
  );
}

function LeadsList({ leads }: { leads: Lead[] }) {
  const [filter, setFilter] = useState<"all" | "popup" | "contact">("all");
  const filtered = filter === "all" ? leads : leads.filter((l) => l.source === filter);
  return (
    <>
      <div className="flex items-center gap-2 mb-5 text-xs">
        {(["all", "popup", "contact"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full uppercase tracking-wider font-bold transition-colors ${
              filter === f
                ? "bg-foreground text-background"
                : "bg-foreground/5 text-foreground-soft hover:bg-foreground/10"
            }`}
          >
            {f === "all" ? "Todos" : f === "popup" ? "Popup" : "Form"}
          </button>
        ))}
        <span className="ml-auto text-foreground-soft">
          {filtered.length} {filtered.length === 1 ? "lead" : "leads"}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-foreground-soft">
          Nenhum lead nesse período. 🌱
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((l) => (
            <LeadRow key={l.id} lead={l} />
          ))}
        </div>
      )}
    </>
  );
}

function LeadRow({ lead }: { lead: Lead }) {
  const [open, setOpen] = useState(false);
  const date = new Date(lead.created_at).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="border border-foreground/10 rounded-xl bg-background overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-4 text-left hover:bg-foreground/[0.02] transition-colors"
      >
        <span
          className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
            lead.source === "popup"
              ? "bg-primary-light text-primary"
              : "bg-foreground text-background"
          }`}
        >
          {lead.source}
        </span>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-foreground truncate">
            {lead.name ?? lead.email}
          </div>
          <div className="text-xs text-foreground-soft truncate">{lead.email}</div>
        </div>
        <div className="text-xs text-foreground-soft flex-shrink-0">{date}</div>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-2 text-sm space-y-2 border-t border-foreground/5">
          {lead.phone && (
            <div>
              <span className="text-foreground-soft">Telefone:</span>{" "}
              <a href={`tel:${lead.phone}`} className="text-primary">
                {lead.phone}
              </a>
            </div>
          )}
          {lead.brand && (
            <div>
              <span className="text-foreground-soft">Marca:</span> {lead.brand}
            </div>
          )}
          {lead.budget && (
            <div>
              <span className="text-foreground-soft">Orçamento:</span> {lead.budget}
            </div>
          )}
          {lead.message && (
            <div>
              <div className="text-foreground-soft mb-1">Mensagem:</div>
              <div className="bg-foreground/5 rounded-lg p-3 whitespace-pre-wrap text-foreground-soft">
                {lead.message}
              </div>
            </div>
          )}
          <div className="flex gap-2 pt-1">
            <a
              href={`mailto:${lead.email}`}
              className="text-xs px-3 py-1.5 bg-foreground text-background rounded-full font-semibold hover:bg-primary transition-colors"
            >
              Responder por email
            </a>
            {lead.phone && (
              <a
                href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 bg-[#25D366] text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
