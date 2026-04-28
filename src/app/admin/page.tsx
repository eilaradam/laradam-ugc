"use client";

import { useEffect, useState } from "react";
import { getSupabase, type Lead } from "@/lib/supabase";
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

function Dashboard({ email }: { email: string }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "popup" | "contact">("all");

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await getSupabase()
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (!active) return;
      if (error) console.error(error);
      setLeads((data as Lead[]) ?? []);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const filtered = filter === "all" ? leads : leads.filter((l) => l.source === filter);

  return (
    <div className="min-h-screen px-4 md:px-8 py-6 md:py-10">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <div className="font-display font-black text-xl mb-0.5">
              LARA DAM<span className="text-primary">.</span> · Leads
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

        {loading ? (
          <div className="py-20 text-center text-foreground-soft">Carregando leads...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-foreground-soft">
            Nenhum lead ainda. 🌱
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((l) => (
              <LeadRow key={l.id} lead={l} />
            ))}
          </div>
        )}
      </div>
    </div>
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
