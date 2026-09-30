// "Lara Dam Studio": o portfólio como uma ilha de edição de vídeo.
// Timeline fixa no pé, playhead que anda com a rolagem, timecode no topo e
// cada parte do portfólio é um take. Rota de prévia: fora do menu, não indexada.
import type { Metadata } from "next";
import StudioApp from "@/components/studio/StudioApp";

export const metadata: Metadata = {
  title: "Lara Dam Studio · portfólio",
  description:
    "Lara Dam, UGC creator e influenciadora. O portfólio montado como uma ilha de edição: dá play e navega pelos takes.",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <StudioApp />;
}
