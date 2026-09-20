import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendLeadNotification } from "@/lib/resend";
import { guardLead, emailBudgetOk, validEmail, str } from "@/lib/guard";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;
  if (!body) {
    return NextResponse.json({ error: "Email obrigatório" }, { status: 400 });
  }

  const barrado = guardLead(req, body, {
    name: "leads",
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });
  if (barrado) return barrado;

  if (!validEmail(body.email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  const lead = {
    name: str(body.name, 120),
    email: String(body.email).trim(),
    phone: str(body.phone, 40),
    brand: null as string | null,
    budget: null as string | null,
    message: null as string | null,
    source: "popup" as const,
  };

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const sb = supabaseAdmin();
      const { error } = await sb.from("portfolio_leads").insert(lead);
      if (error) console.error("[leads] supabase insert error", error);
    } else {
      console.warn("[leads] Supabase não configurado — lead não persistido");
    }
  } catch (e) {
    console.error("[leads] supabase exception", e);
  }

  if (emailBudgetOk()) {
    try {
      await sendLeadNotification(lead);
    } catch (e) {
      console.error("[leads] resend exception", e);
    }
  } else {
    console.warn("[leads] email suprimido (teto horário)");
  }

  return NextResponse.json({ ok: true });
}
