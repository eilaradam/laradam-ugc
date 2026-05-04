import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Lazy: só cria o client na primeira chamada (evita crash de build sem env vars)
let _public: SupabaseClient | null = null;
export function getSupabase() {
  if (_public) return _public;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase não configurado. Adicione NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY ao .env.local"
    );
  }
  _public = createClient(url, key);
  return _public;
}

// Cliente admin (server-only) — bypassa RLS
export function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

export type Lead = {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  brand: string | null;
  budget: string | null;
  message: string | null;
  source: "popup" | "contact";
  created_at: string;
};

export type EventRow = {
  id: string;
  created_at: string;
  event_type: "page_view" | "button_click" | "video_view";
  event_name: string;
  session_id: string | null;
  page_path: string | null;
  user_agent: string | null;
  referrer: string | null;
  metadata: Record<string, unknown>;
};
