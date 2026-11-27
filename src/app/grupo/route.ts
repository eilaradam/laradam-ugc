import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { str } from "@/lib/guard";

// Link contado do grupo da aula de edição (13/11/2026): cada clique vira um evento em
// portfolio_events (event_name "grupo-edicao", metadata.de = canal) e a pessoa vai pro grupo.
// ?de=wpp | email | story | post ... separa de onde veio. Robôs de prévia não contam.
// 27/11/2026: a aula já passou, então o link leva pra página de venda da Turma 5 (com ref=grupo-<canal>).
// O grupo antigo era https://chat.whatsapp.com/IcCFzWRX93B6UppXhygakU
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
  const destino = new URL("https://ugc.laradam.com/edicaoclaude");
  destino.searchParams.set("ref", `grupo-${de}`);
  destino.searchParams.set("utm_source", "grupo");
  destino.searchParams.set("utm_medium", de);
  return NextResponse.redirect(destino.toString(), 302);
}
