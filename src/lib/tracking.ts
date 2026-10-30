"use client";

export type TrackEventType = "page_view" | "button_click" | "video_view";

const SESSION_KEY = "ugc_session_id";

const ORIGEM_KEY = "ugc_origem";

let cachedSessionId: string | null = null;
let cachedOrigem: Record<string, string> | null = null;

// ?si=<codigo da campanha>&c=<categoria> vem do link do robo do Seu Influencer.
// Guarda na sessao pra continuar valendo depois que a URL muda (ancoras, troca de idioma).
export function getOrigem(): Record<string, string> {
  if (cachedOrigem) return cachedOrigem;
  if (typeof window === "undefined") return {};
  try {
    const q = new URLSearchParams(window.location.search);
    const si = q.get("si")?.slice(0, 40);
    if (si) {
      const o: Record<string, string> = { si };
      const c = q.get("c")?.slice(0, 40);
      if (c) o.c = c;
      sessionStorage.setItem(ORIGEM_KEY, JSON.stringify(o));
      return (cachedOrigem = o);
    }
    const stored = sessionStorage.getItem(ORIGEM_KEY);
    cachedOrigem = stored ? JSON.parse(stored) : {};
  } catch {
    cachedOrigem = {};
  }
  return cachedOrigem!;
}

function getSessionId(): string {
  if (cachedSessionId) return cachedSessionId;
  if (typeof window === "undefined") return "";
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      cachedSessionId = stored;
      return stored;
    }
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(SESSION_KEY, id);
    cachedSessionId = id;
    return id;
  } catch {
    return "";
  }
}

export function track(
  eventType: TrackEventType,
  eventName: string,
  metadata?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;
  try {
    const payload = JSON.stringify({
      event_type: eventType,
      event_name: eventName,
      session_id: getSessionId(),
      page_path: window.location.pathname,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
      metadata: { ...getOrigem(), ...(metadata ?? {}) },
    });

    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/track", blob);
      return;
    }

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // never break UX por falha de tracking
  }
}
