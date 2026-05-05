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
    whatsapp: body.whatsapp ?? null,
    company: body.company ?? null,
    role: body.role ?? null,
    site: body.site ?? null,
    modality: body.modality ?? null,
    goal: body.goal ?? null,
    budget: body.budget ?? null,
    message: body.message ?? null,
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

  return NextResponse.json({ ok: true });
}
