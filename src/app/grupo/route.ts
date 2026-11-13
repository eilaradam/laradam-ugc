import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { str } from "@/lib/guard";

// Link contado do grupo da aula de edição (13/11/2026): cada clique vira um evento em
// portfolio_events (event_name "grupo-edicao", metadata.de = canal) e a pessoa vai pro grupo.
// ?de=wpp | email | story | post ... separa de onde veio. Robôs de prévia não contam.
const GRUPO = "https://chat.whatsapp.com/IcCFzWRX93B6UppXhygakU";
const ROBO = /whatsapp|facebookexternalhit|facebot|bot|crawler|spider|preview|slack|telegram|discord|skype/i;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const de = (url.searchParams.get("de") || "direto").slice(0, 40);
  const ua = req.headers.get("user-agent") || "";
  if (!ROBO.test(ua)) {
    try {
      await supabaseAdmin().from("portfolio_events").insert({
        event_type: "button_click",
        event_name: "grupo-edicao",
        page_path: "/grupo",
        user_agent: str(ua, 500),
        referrer: str(req.headers.get("referer") || "", 500),
        metadata: { de },
      });
    } catch (e) {
      console.error("[grupo] falhou ao contar", e);
    }
  }
  return NextResponse.redirect(GRUPO, 302);
}
