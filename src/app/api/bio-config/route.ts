import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

// Sempre buscar fresco: quando a Lara edita no admin, reflete na hora.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sb = getSupabase();
    const { data, error } = await sb
      .from("bio_config")
      .select("config")
      .eq("id", 1)
      .single();
    if (error) throw error;
    return NextResponse.json(data?.config ?? {}, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    // Se der qualquer problema, devolve vazio -> o /bio usa o fallback local.
    return NextResponse.json({}, { headers: { "Cache-Control": "no-store" } });
  }
}
