"use client";

export type TrackEventType = "page_view" | "button_click" | "video_view";

const SESSION_KEY = "ugc_session_id";

let cachedSessionId: string | null = null;

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
      metadata: metadata ?? {},
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
