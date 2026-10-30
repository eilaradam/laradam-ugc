import { Resend } from "resend";

const FROM = process.env.RESEND_FROM ?? "Lara Dam Portfolio <onboarding@resend.dev>";
const TO = process.env.RESEND_TO ?? "laradam.ugc@gmail.com";

type LeadPayload = {
  source: "popup" | "contact";
  name?: string | null;
  email: string;
  phone?: string | null;
  brand?: string | null;
  budget?: string | null;
  message?: string | null;
};

export async function sendLeadNotification(lead: LeadPayload) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[resend] RESEND_API_KEY não configurada — email não enviado");
    return;
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  const subject =
    lead.source === "popup"
      ? `Novo lead (popup) — ${lead.email}`
      : `Novo contato — ${lead.name ?? lead.email}`;

  const lines = [
    `<p><strong>Origem:</strong> ${lead.source === "popup" ? "Card popup do site" : "Form de contato"}</p>`,
    lead.name && `<p><strong>Nome:</strong> ${escapeHtml(lead.name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>`,
    lead.phone && `<p><strong>Telefone:</strong> ${escapeHtml(lead.phone)}</p>`,
    lead.brand && `<p><strong>Marca:</strong> ${escapeHtml(lead.brand)}</p>`,
    lead.budget && `<p><strong>Orçamento:</strong> ${escapeHtml(lead.budget)}</p>`,
    lead.message &&
      `<p><strong>Mensagem:</strong></p><p style="white-space:pre-wrap">${escapeHtml(lead.message)}</p>`,
  ].filter(Boolean);

  await resend.emails.send({
    from: FROM,
    to: TO,
    subject,
    html: lines.join(""),
    replyTo: lead.email,
  });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Aviso pra Lara quando a marca mexe num roteiro compartilhado.
 * Usa a mesma função do Supabase que avisa do robô (avisar-robo, Resend com domínio próprio).
 */
const AVISO_URL = "https://mfrmnquvwwuxraqgemyh.supabase.co/functions/v1/avisar-robo";

export async function sendRoteiroAviso(a: { assunto: string; linhas: string[]; link: string }) {
  const token = process.env.ROBO_AVISO_TOKEN;
  if (!token) {
    console.warn("[roteiro] ROBO_AVISO_TOKEN não configurado — aviso não enviado");
    return;
  }
  const r = await fetch(AVISO_URL, {
    method: "POST",
    headers: { "content-type": "application/json", "x-robo-token": token },
    body: JSON.stringify({ assunto: a.assunto, texto: [...a.linhas, "", `Abrir o roteiro: ${a.link}`].join("\n\n") }),
  });
  if (!r.ok) console.error("[roteiro] aviso falhou", r.status, await r.text());
}
