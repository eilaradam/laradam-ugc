import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendLeadNotification } from "@/lib/resend";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.email) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const lead = {
    name: body.name ?? null,
    email: String(body.email).trim(),
    phone: null as string | null,
    brand: body.brand ?? null,
    budget: body.budget ?? null,
    message: body.message ?? null,
    source: "contact" as const,
  };

  // 1) Salva no Supabase (não bloqueia resposta se falhar)
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const sb = supabaseAdmin();
      const { error } = await sb.from("portfolio_leads").insert(lead);
      if (error) console.error("[contact] supabase insert error", error);
    } else {
      console.warn("[contact] Supabase não configurado — lead não persistido");
    }
  } catch (e) {
    console.error("[contact] supabase exception", e);
  }

  // 2) Envia email via Resend
  try {
    await sendLeadNotification(lead);
  } catch (e) {
    console.error("[contact] resend exception", e);
  }

  return NextResponse.json({ ok: true });
}
