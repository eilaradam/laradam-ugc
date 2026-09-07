"use client";

/* ============================================================================
   UGC para marcas de IA — modelo aberto de proposta.
   Mesma linguagem visual da /gestao (mesma paleta, mesmas classes), sem nome de
   marca nem destinatario: e uma pagina que ela manda pra qualquer marca de IA.
   O miolo e a calculadora, que monta o pacote na frente de quem esta lendo.
   ========================================================================== */

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const PALETTE: React.CSSProperties = {
  ["--mm-orange" as string]: "#FF5824",
  ["--mm-orange-deep" as string]: "#E0430F",
  ["--mm-pink" as string]: "#FFCFD2",
};

/* Preco por creator. Enquanto for null, a calculadora mostra o ESCOPO em vez de
   dinheiro: melhor nao mostrar numero nenhum do que mostrar um chutado. */
const PRECO_CREATOR: number | null = null;

const PORTAS = [
  {
    tag: "Porta 1 · quem constrói",
    titulo: "De ideia parada a coisa pronta",
    corpo: "A barreira não é técnica, é de permissão: a pessoa acha que precisa ser especialista.",
    ganchos: [
      "“Eu não sei fazer isso. Ficou pronto em 40 minutos.”",
      "“Todo mundo tem uma ideia parada no bloco de notas.”",
    ],
  },
  {
    tag: "Porta 2 · quem usa no dia a dia",
    titulo: "Não é pra especialista. É pra quem tem caixa de entrada.",
    corpo: "Ela já usa IA e não sabe que o seu produto existe. Uma tarefa chata e real, resolvida na frente dela.",
    ganchos: [
      "“Eu parei de fazer isso em planilha. Fiz uma coisa que faz por mim.”",
      "“Você já usa IA pra perguntar. Ninguém te contou que dá pra usar pra isso.”",
    ],
  },
];

const ETAPAS = [
  { n: "01", title: "Diagnóstico", body: "Antes de qualquer proposta, conversa. Preciso entender o produto, quem você quer alcançar e o que já foi testado." },
  { n: "02", title: "As duas portas", body: "Definimos os dois posicionamentos que vão brigar entre si e o perfil de creator ideal pra cada um." },
  { n: "03", title: "Casting e roteiro", body: "Seleciono dentro da minha base e escrevo os roteiros por segundo. Você aprova antes de qualquer gravação." },
  { n: "04", title: "Produção", body: "Os creators gravam, eu acompanho. Quando chega na sua mão, já passou por filtro." },
  { n: "05", title: "Entrega e leitura", body: "Arquivos nomeados por conceito, gancho e proporção. No fim, leitura de qual porta venceu." },
];

const CREATORS = [
  { nome: "a definir", nicho: "porta 1 · quem constrói", src: "" },
  { nome: "a definir", nicho: "porta 1 · quem constrói", src: "" },
  { nome: "a definir", nicho: "porta 2 · dia a dia", src: "" },
  { nome: "a definir", nicho: "porta 2 · dia a dia", src: "" },
  { nome: "a definir", nicho: "talento em câmera", src: "" },
  { nome: "a definir", nicho: "talento em câmera", src: "" },
];

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="font-display font-black text-black tabular-nums text-xl md:text-2xl">{value}</span>
      <span className="uppercase tracking-wider text-black/60 text-[10px] md:text-xs">{label}</span>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F4] text-black pt-24 md:pt-28 pb-0">
      <div className="relative max-w-6xl mx-auto px-6 md:px-12 pt-2 md:pt-4 pb-10 md:pb-14">
        <div className="flex items-center gap-2.5 mb-4 md:mb-5">
          <div className="w-2 h-2 rounded-full bg-[var(--mm-orange)] animate-pulse" />
          <span className="font-display font-black text-black text-xs md:text-sm tracking-widest uppercase">
            LARADAM<span className="text-[var(--mm-orange)]">.</span>IA
          </span>
        </div>
        <h1 className="font-display font-black text-black text-3xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tighter uppercase">
          <span className="block text-[1.2em]">Vídeo para</span>
          <span className="block">marcas de IA</span>
        </h1>
        <p className="mt-2 md:mt-3 font-display font-bold text-[var(--mm-orange)] text-base md:text-lg lg:text-xl tracking-tight">
          feito por quem ensina IA.
        </p>
        <p className="mt-4 text-sm md:text-base max-w-xl leading-relaxed text-black/75">
          Creators brasileiras que já usam inteligência artificial no trabalho delas. Criativo nascido em português,
          não adaptado de peça global.{" "}
          <span className="text-black font-semibold">Você roda mídia. Nós rodamos a criação.</span>
        </p>
        <div className="mt-5">
          <a
            href="#calculadora"
            className="inline-flex items-center gap-2 bg-[var(--mm-orange)] text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wide hover:bg-[var(--mm-orange-deep)] transition-colors"
          >
            Montar meu pacote
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <p className="mt-2 text-[11px] md:text-xs text-black/55">
            Resposta em até 24h. Diagnóstico gratuito antes de qualquer proposta.
          </p>
        </div>
        <div className="mt-6 flex flex-nowrap items-center gap-x-3 text-black/70 border-t border-black/10 pt-3 overflow-x-auto whitespace-nowrap">
          <Stat value="+100" label="campanhas gerenciadas" />
          <span className="text-black/20">|</span>
          <Stat value="+1.200" label="creators em rede" />
          <span className="text-black/20">|</span>
          <Stat value="9 dias" label="do aceite à entrega" />
        </div>
      </div>

      <div className="relative bg-[var(--mm-orange)] py-3 md:py-4 overflow-hidden">
        <div className="marquee-slow">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 md:gap-5 text-xs md:text-sm uppercase tracking-[0.25em] font-bold text-white whitespace-nowrap">
              <span>Nascido em português</span>
              <span className="text-white/70">✦</span>
              <span>Creators que já usam IA</span>
              <span className="text-white/70">✦</span>
              <span>Sem cara de anúncio</span>
              <span className="text-white/70">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portas() {
  return (
    <section className="bg-white py-14 md:py-20 border-t border-black/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter text-black uppercase max-w-3xl">
          Toda marca de IA tem duas portas.{" "}
          <span className="text-[var(--mm-orange)]">Testamos as duas.</span>
        </h2>
        <p className="mt-4 text-base md:text-lg text-black/75 max-w-2xl leading-relaxed">
          Produzidas como campanhas separadas, com cenário e caso de uso diferentes, pra o teste conseguir ler qual vence.
        </p>
        <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-4 md:gap-5">
          {PORTAS.map((p, i) => (
            <motion.div
              key={p.tag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl p-6 md:p-7 bg-white border-2 border-black/10"
            >
              <span className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-wider text-[var(--mm-orange)] bg-[var(--mm-pink)] rounded-full px-3 py-1">
                {p.tag}
              </span>
              <h3 className="font-display font-black text-lg md:text-xl tracking-tight uppercase mt-4 mb-2 text-black">
                {p.titulo}
              </h3>
              <p className="text-sm md:text-base text-black/70 leading-relaxed">{p.corpo}</p>
              <div className="mt-5 pt-4 border-t border-black/10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3">mecânica de gancho</p>
                {p.ganchos.map((g) => (
                  <p key={g} className="font-display font-bold text-base md:text-lg leading-snug text-black mb-2.5 pl-3 border-l-2 border-[var(--mm-orange)]">
                    {g}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Calculadora() {
  const [modo, setModo] = useState<"creators" | "orcamento">("creators");
  const [creators, setCreators] = useState(5);
  const [orcamento, setOrcamento] = useState(10);
  const [portas, setPortas] = useState(2);
  const [ganchos, setGanchos] = useState(2);
  const [ratios, setRatios] = useState(3);

  const verba = orcamento * 5000;
  const n = modo === "orcamento" && PRECO_CREATOR ? Math.max(1, Math.floor(verba / PRECO_CREATOR)) : creators;
  const variacoes = n * portas * ganchos;
  const arquivos = variacoes * ratios;
  const porPorta = portas ? Math.round(variacoes / portas) : 0;
  const dinheiro = (v: number) => "R$ " + Math.round(v).toLocaleString("pt-BR");

  const Seg = ({ v, set, opts, label, dica }: { v: number; set: (n: number) => void; opts: number[]; label: string; dica: string }) => (
    <div className="mb-6 last:mb-0">
      <p className="text-xs md:text-sm font-bold text-black mb-2.5">{label}</p>
      <div className="flex gap-2">
        {opts.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => set(o)}
            className={`flex-1 rounded-xl py-2.5 font-display font-black text-base transition-colors border-2 ${
              v === o ? "bg-[var(--mm-orange)] border-[var(--mm-orange)] text-white" : "bg-white border-black/10 text-black/60 hover:border-black/25"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      <p className="mt-2 text-[11px] md:text-xs text-black/50 leading-relaxed">{dica}</p>
    </div>
  );

  return (
    <section id="calculadora" className="bg-[#FAF8F4] py-14 md:py-20 border-t border-black/10 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter text-black uppercase max-w-3xl">
          Monte o seu pacote.{" "}
          <span className="text-[var(--mm-orange)]">Sem reunião pra saber o tamanho.</span>
        </h2>

        <div className="mt-10 md:mt-14 rounded-2xl overflow-hidden border-2 border-black/10 bg-white">
          <div className="flex border-b-2 border-black/10">
            {(["creators", "orcamento"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setModo(m)}
                className={`flex-1 py-4 text-xs md:text-sm font-bold uppercase tracking-wide transition-colors ${
                  modo === m ? "bg-white text-[var(--mm-orange)]" : "bg-black/[0.03] text-black/50 hover:text-black/70"
                }`}
              >
                {m === "creators" ? "Escolher por creators" : "Escolher por orçamento"}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-[1fr_340px]">
            <div className="p-6 md:p-8">
              {modo === "creators" ? (
                <div className="mb-6">
                  <div className="flex justify-between items-baseline mb-2.5">
                    <p className="text-xs md:text-sm font-bold text-black">Creators</p>
                    <span className="font-display font-black text-2xl text-[var(--mm-orange)]">{creators}</span>
                  </div>
                  <input type="range" min={1} max={15} value={creators} onChange={(e) => setCreators(Number(e.target.value))}
                    className="w-full accent-[var(--mm-orange)]" />
                  <p className="mt-2 text-[11px] md:text-xs text-black/50">Cada creator grava as duas portas com o caso de uso dele.</p>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="flex justify-between items-baseline mb-2.5">
                    <p className="text-xs md:text-sm font-bold text-black">Orçamento</p>
                    <span className="font-display font-black text-2xl text-[var(--mm-orange)]">
                      {PRECO_CREATOR ? dinheiro(verba) : "—"}
                    </span>
                  </div>
                  <input type="range" min={1} max={30} value={orcamento} onChange={(e) => setOrcamento(Number(e.target.value))}
                    className="w-full accent-[var(--mm-orange)]" />
                  <p className="mt-2 text-[11px] md:text-xs text-black/50">Eu mostro quantos creators cabem e o que sai disso.</p>
                </div>
              )}
              <Seg v={portas} set={setPortas} opts={[1, 2]} label="Portas testadas"
                dica="Duas é o padrão: é o que permite comparar posicionamento." />
              <Seg v={ganchos} set={setGanchos} opts={[1, 2, 3]} label="Ganchos por porta"
                dica="Aberturas diferentes da mesma ideia, pra achar a que segura." />
              <Seg v={ratios} set={setRatios} opts={[1, 2, 3]} label="Proporções"
                dica="9:16 pro vertical, 4:5 pro feed, 16:9 pro YouTube e display." />
            </div>

            <div className="bg-black text-white p-6 md:p-8 flex flex-col justify-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                {PRECO_CREATOR ? "investimento" : "o que você recebe"}
              </p>
              <p className="font-display font-black text-3xl md:text-4xl leading-none mt-2">
                {PRECO_CREATOR ? dinheiro(n * PRECO_CREATOR) : arquivos + " arquivos"}
              </p>
              <p className="text-sm text-white/60 mt-1.5">{n} {n === 1 ? "creator" : "creators"}</p>
              <div className="mt-6 pt-5 border-t border-white/20 space-y-2.5">
                {[["variações criativas", variacoes], ["arquivos finais", arquivos], ["peças por porta", porPorta]].map(([k, v]) => (
                  <div key={String(k)} className="flex justify-between text-sm">
                    <span className="text-white/60">{k}</span>
                    <span className="font-display font-black tabular-nums">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="px-6 md:px-8 py-4 border-t-2 border-black/10 text-xs md:text-sm text-black/60 leading-relaxed">
            {portas > 1 && porPorta < 6 ? (
              <span className="text-[var(--mm-orange-deep)] font-semibold">
                Atenção: com {porPorta} peça{porPorta === 1 ? "" : "s"} por porta, o teste dificilmente separa qual posicionamento vence.
                A partir de 10 por porta a leitura fica confiável.{" "}
              </span>
            ) : null}
            O valor cobre roteiro, gravação, edição, legenda em português e todos os cortes de proporção.
            Distribuição no canal do creator é cobrada à parte.
          </div>
        </div>
      </div>
    </section>
  );
}

function Processo() {
  return (
    <section className="bg-white py-14 md:py-20 border-t border-black/10">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter uppercase text-black">
          Cinco etapas.{" "}
          <span className="text-[var(--mm-orange)]">Sem mistério, sem milagre.</span>
        </h2>
        <div className="mt-10 md:mt-14 relative">
          <div className="absolute left-5 md:left-7 top-2 bottom-2 w-px bg-black/15" />
          <div className="space-y-6 md:space-y-8">
            {ETAPAS.map((e, i) => (
              <motion.div
                key={e.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative pl-14 md:pl-20"
              >
                <div className="absolute left-0 top-0 w-10 h-10 md:w-14 md:h-14 rounded-full bg-[var(--mm-orange)] text-white flex items-center justify-center font-display font-black text-sm md:text-base">
                  {e.n}
                </div>
                <h3 className="font-display font-black text-lg md:text-xl tracking-tight uppercase mb-2 mt-1.5 md:mt-2.5 text-black">
                  {e.title}
                </h3>
                <p className="text-sm md:text-base text-black/75 leading-relaxed">{e.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section className="bg-[#FAF8F4] py-14 md:py-20 border-t border-black/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter uppercase text-black">
          Quem grava.{" "}
          <span className="text-[var(--mm-orange)]">Peças recentes da nossa base.</span>
        </h2>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
          {CREATORS.map((c, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-white border-2 border-black/10">
              <div className="aspect-[9/16] bg-black/[0.04] flex items-center justify-center relative">
                {c.src ? (
                  <video src={c.src} controls playsInline preload="metadata" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center px-2">
                    <Play className="w-5 h-5 mx-auto text-black/20 mb-1.5" />
                    <p className="text-[10px] text-black/35 leading-tight">vídeo<br />a subir</p>
                  </div>
                )}
              </div>
              <div className="p-2.5">
                <p className="text-[11px] font-bold text-black leading-tight">{c.nome}</p>
                <p className="text-[10px] text-black/50 leading-tight mt-0.5">{c.nicho}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTAFinal() {
  return (
    <section className="bg-black text-white py-14 md:py-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <h2 className="font-display font-black text-2xl md:text-4xl leading-[0.95] tracking-tighter uppercase">
          Me manda o seu briefing{" "}
          <span className="text-[var(--mm-orange)]">e eu volto com o casting.</span>
        </h2>
        <a
          href="https://wa.me/5512988729264?text=Oi%20Lara!%20Quero%20falar%20sobre%20UGC%20pra%20marca%20de%20IA"
          target="_blank"
          rel="noopener"
          className="mt-8 inline-flex items-center gap-2 bg-[var(--mm-orange)] text-white px-6 py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-wide hover:bg-[var(--mm-orange-deep)] transition-colors"
        >
          Falar comigo agora
          <ArrowRight className="w-4 h-4" />
        </a>
        <p className="mt-4 text-xs text-white/50">Resposta em até 24h · @eilaradam</p>
      </div>
    </section>
  );
}

export default function UgcIa() {
  return (
    <div style={PALETTE}>
      <Hero />
      <Portas />
      <Calculadora />
      <Processo />
      <Portfolio />
      <CTAFinal />
    </div>
  );
}
