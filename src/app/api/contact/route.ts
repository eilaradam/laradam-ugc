import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.email || !body?.message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // TODO: enviar via Resend (reaproveitar chave do MeuManager)
  // Por enquanto só loga e retorna ok pra o form funcionar no preview.
  console.log("[CONTACT]", body);

  return NextResponse.json({ ok: true });
}
