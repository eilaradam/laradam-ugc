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
    return NextResponse.json({ error: "Email obrigatório" }, { status: 400 });
  }

  const barrado = guardLead(req, body, {
    name: "gestao-leads",
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
    whatsapp: str(body.whatsapp, 40),
    company: str(body.company, 160),
    role: str(body.role, 120),
    site: str(body.site, 200),
    modality: str(body.modality, 80),
    goal: str(body.goal, 200),
    budget: str(body.budget, 80),
    message: str(body.message, 4000),
  };

  // 1) Salva no Supabase
  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const sb = supabaseAdmin();
      const { error } = await sb.from("gestao_leads").insert(lead);
      if (error) console.error("[gestao-leads] supabase insert error", error);
    } else {
      console.warn("[gestao-leads] Supabase não configurado");
    }
  } catch (e) {
    console.error("[gestao-leads] supabase exception", e);
  }

  // 2) Email via Resend (reaproveita a função existente, com formato compatível)
  if (!tooManyLinks(lead.message) && emailBudgetOk()) {
    try {
      await sendLeadNotification({
        name: lead.name,
        email: lead.email,
        phone: lead.whatsapp,
        brand: lead.company,
        budget: lead.budget,
        message: [
          lead.role && `Cargo: ${lead.role}`,
          lead.site && `Site: ${lead.site}`,
          lead.modality && `Modalidade: ${lead.modality}`,
          lead.goal && `Objetivo: ${lead.goal}`,
          lead.message,
        ]
          .filter(Boolean)
          .join("\n"),
        source: "contact" as const,
      });
    } catch (e) {
      console.error("[gestao-leads] resend exception", e);
    }
  } else {
    console.warn("[gestao-leads] email suprimido (spam ou teto horário)");
  }

  return NextResponse.json({ ok: true });
}
