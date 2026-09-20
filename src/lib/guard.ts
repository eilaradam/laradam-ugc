// Proteções compartilhadas das rotas públicas de API.
//
// Camadas (nenhuma delas sozinha resolve, juntas cobrem o abuso comum):
//  1. rate limit por IP, em memória do processo
//  2. teto global por hora nas rotas que disparam email (custo do Resend)
//  3. origem: só aceita requisição vinda do próprio site
//  4. honeypot: campo escondido que humano não preenche e bot preenche
//  5. validação de formato e tamanho
//
// Limitação conhecida: a memória é por instância serverless, então um ataque
// distribuído em muitas instâncias passa por cima do contador. Para o cenário
// real aqui (script de uma máquina só) resolve. Se precisar de contagem
// confiável, migrar os contadores para uma tabela no Supabase.

const ALLOWED_HOSTS = [
  "ugc.laradam.com",
  "www.ugc.laradam.com",
  "laradam.com",
  "www.laradam.com",
  "localhost",
  "127.0.0.1",
];

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "desconhecido";
}

/** Aceita o próprio site e previews da Vercel. Sem Origin nem Referer devolve null. */
export function originAllowed(req: Request): boolean | null {
  const raw = req.headers.get("origin") ?? req.headers.get("referer");
  if (!raw) return null;
  let host: string;
  try {
    host = new URL(raw).hostname;
  } catch {
    return false;
  }
  if (ALLOWED_HOSTS.includes(host)) return true;
  return host.endsWith(".vercel.app");
}

type Bucket = { count: number; reset: number };
const buckets = new Map<string, Bucket>();

function prune(now: number) {
  if (buckets.size < 5000) return;
  for (const [k, b] of buckets) if (b.reset <= now) buckets.delete(k);
}

/** Devolve ok=false quando o IP (ou o teto global) estourou a janela. */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  prune(now);
  const b = buckets.get(key);
  if (!b || b.reset <= now) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  b.count += 1;
  if (b.count > limit) {
    return { ok: false, retryAfter: Math.ceil((b.reset - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

/** Campos isca. Preenchidos = bot. */
const HONEYPOT_FIELDS = ["website", "_gotcha", "empresa_site"];

export function isHoneypotFilled(body: Record<string, unknown>): boolean {
  return HONEYPOT_FIELDS.some(
    (f) => typeof body[f] === "string" && (body[f] as string).trim() !== ""
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function validEmail(v: unknown): v is string {
  return typeof v === "string" && v.length <= 160 && EMAIL_RE.test(v.trim());
}

export function str(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim().slice(0, max);
  return s === "" ? null : s;
}

/** Texto com muito link é spam; corta antes de virar email. */
export function tooManyLinks(v: unknown, max = 2): boolean {
  if (typeof v !== "string") return false;
  return (v.match(/https?:\/\//gi) ?? []).length > max;
}

export function tooManyRequests(retryAfter: number) {
  return new Response(
    JSON.stringify({ error: "Muitas tentativas. Tenta de novo mais tarde." }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(Math.max(retryAfter, 1)),
      },
    }
  );
}

/**
 * Bloco comum das rotas de lead: origem, honeypot e rate limit por IP.
 * Devolve uma Response quando deve barrar, ou null quando pode seguir.
 */
export function guardLead(
  req: Request,
  body: Record<string, unknown>,
  opts: { name: string; limit: number; windowMs: number }
): Response | null {
  const allowed = originAllowed(req);
  if (allowed === false) {
    return new Response(JSON.stringify({ error: "Origem não permitida" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Bot preencheu a isca: responde ok para ele não perceber, mas não salva nada.
  if (isHoneypotFilled(body)) return Response.json({ ok: true });

  const ip = clientIp(req);
  // Sem Origin nem Referer é sinal de script: metade da cota.
  const limit = allowed === null ? Math.max(1, Math.floor(opts.limit / 2)) : opts.limit;
  const r = rateLimit(`${opts.name}:${ip}`, limit, opts.windowMs);
  if (!r.ok) return tooManyRequests(r.retryAfter);

  return null;
}

/** Teto global das rotas que mandam email, para o custo não escapar. */
export function emailBudgetOk(): boolean {
  return rateLimit("global:email", 40, 60 * 60 * 1000).ok;
}
