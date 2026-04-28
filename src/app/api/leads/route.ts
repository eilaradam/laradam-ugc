import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendLeadNotification } from "@/lib/resend";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.email) {
    return NextResponse.json({ error: "Email obrigatório" }, { status: 400 });
  }

  const lead = {
    name: body.name ?? null,
    email: String(body.email).trim(),
    phone: body.phone ?? null,
    brand: null as string | null,
    budget: null as string | null,
    message: null as string | null,
    source: "popup" as const,
  };

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const sb = supabaseAdmin();
      const { error } = await sb.from("leads").insert(lead);
      if (error) console.error("[leads] supabase insert error", error);
    } else {
      console.warn("[leads] Supabase não configurado — lead não persistido");
    }
  } catch (e) {
    console.error("[leads] supabase exception", e);
  }

  try {
    await sendLeadNotification(lead);
  } catch (e) {
    console.error("[leads] resend exception", e);
  }

  return NextResponse.json({ ok: true });
}
