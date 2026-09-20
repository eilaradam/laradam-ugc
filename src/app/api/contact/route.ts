import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendLeadNotification } from "@/lib/resend";
import {
  guardLead,
  emailBudgetOk,
  validEmail,
  str,
  tooManyLinks,
} from "@/lib/guard";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;
  if (!body) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // 5 envios por hora por IP: manda email, então é a cota mais apertada.
  const barrado = guardLead(req, body, {
    name: "contact",
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
    phone: null as string | null,
    brand: str(body.brand, 120),
    budget: str(body.budget, 80),
    message: str(body.message, 4000),
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

  // 2) Envia email via Resend. Mensagem cheia de link é spam: fica só salva.
  if (!tooManyLinks(lead.message) && emailBudgetOk()) {
    try {
      await sendLeadNotification(lead);
    } catch (e) {
      console.error("[contact] resend exception", e);
    }
  } else {
    console.warn("[contact] email suprimido (spam ou teto horário)");
  }

  return NextResponse.json({ ok: true });
}
