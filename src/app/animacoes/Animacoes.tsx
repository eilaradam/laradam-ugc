"use client";

import { useEffect, useState } from "react";

// Cores do próprio guia (as mesmas das animações): creme, preto, amarelo e marrom, com cara de colagem.
const C = { creme: "#F8F1DF", tinta: "#1A1411", amarelo: "#F4E07A", marrom: "#4E2B1D", papel: "#FFFDF7", suave: "#6B5A4E", linha: "#E9DFC6" };
const MARCA = "animacoes_liberado";
const TURMA5 = "https://ugc.laradam.com/edicaoclaude";

const P_BASE = `Use a foto anexada como referência de identidade. Quero uma FOTO REALISTA da mesma mulher, sem mudar nada do rosto nem do cabelo.

Regras para todas as imagens desta conversa:
- Foto de verdade, não ilustração, não 3D. Textura natural da pele.
- Fundo liso azul claro (#9CC8F0), sem sombra, sem objetos, sem degradê.
- Sem contorno branco, sem borda, sem texto.
- Luz suave de frente.
- Roupa: roupão de cetim creme liso e uma faixa de cabelo creme.
- Formato vertical 2:3, alta resolução, com folga em volta.

Primeira imagem: busto (do peito pra cima), olhando de lado com um sorrisinho.`;

const P_FOTOS = [
  "Mesma pessoa, mesma roupa, mesmo enquadramento, mesmo fundo e mesma luz. Mude só a expressão: olhos fechados, sorriso leve, como quem está sentindo o produto na pele.",
  "Mesma pessoa, mesma roupa, mesmo enquadramento, mesmo fundo e mesma luz. Mude só a expressão: biquinho com uma piscadinha.",
  "Mesma pessoa, mesma roupa, mesmo fundo e mesma luz. Agora de corpo inteiro, em pé, de frente, braços soltos, pés aparecendo. Folga acima da cabeça e abaixo dos pés.",
  "Só uma mão e antebraço da mesma pessoa, entrando pela lateral direita, em posição de pinça (polegar e indicador quase se tocando), sem segurar nada. Mesmo fundo azul liso, sem contorno branco.",
];

const P_PRODUTO = `Use a imagem anexada como referência. Foto realista do MESMO produto, de pé, visto de frente. Fundo liso azul claro (#9CC8F0), sem sombra, sem reflexo, sem contorno branco, sem texto extra. Luz suave. Vertical 2:3, alta resolução.`;
const P_ABERTO = `Mesmo produto, mesmo fundo e mesma luz. Agora aberto, em duas peças separadas e afastadas: à esquerda o frasco sem tampa, à direita a tampa conta-gotas sozinha, na vertical, com uma gota na ponta.`;
const P_GOTA = `Mesmo fundo e mesma luz. Só uma gota do produto, grande, brilhante e translúcida, no centro.`;
const P_PINCELADA = `Mesmo fundo e mesma luz. Só uma pincelada do produto espalhado, como se tivesse sido passado com o dedo.`;

const P_ESTILO = `Você vai criar animações verticais (9:16, 1080x1920) no estilo colagem, pra eu usar num Reels de UGC.

Estilo:
- Fundo claro com padrão suave (listras, bolinhas ou grade) em creme e amarelo.
- Recorte as minhas fotos e os produtos tirando o fundo azul, sem deixar borda branca nem azul.
- Textos curtos em tarjas de cor (como fita), letra sem serifa grossa, e balões de mensagem.
- Estrelas e brilhos como detalhe.
- Movimento com mola: as coisas entram dando um pulinho, nada parado.
- Cores: creme #F8F1DF, preto #1A1411, amarelo #F4E07A e marrom #4E2B1D.
- Nada de texto nos 250 px de cima nem nos 360 px de baixo (área do Instagram).

Monte cada animação como uma página que toca sozinha em loop, em tela cheia, pra eu gravar a tela. Me confirme que entendeu e espere o primeiro pedido.`;

const P_VARAL = `Animação 1, com 5 segundos: varal de produtos.

- Fundo creme com bolinhas.
- No alto, o número 1 dentro de uma estrela marrom e a tarja "varal de produtos".
- Uma corda atravessa a tela. Os produtos (as imagens que eu mandei) estão pendurados com fita amarela e vão passando da direita pra esquerda, balançando de leve.
- No segundo 3, a minha mão em pinça entra pela direita e "pega" o produto do meio. Ele para de balançar, cresce um pouco e aparece uma estrela amarela atrás.
- Entra um balão: "escolho esse".`;

const P_ROSTO = `Animação 2, com 5 segundos: o produto passando no rosto.

- Fundo de listras creme e amarelo, um espelho dourado oval atrás de mim e uma bancada de madeira embaixo, com uma plantinha.
- Eu de busto, na frente do espelho. Começo olhando de lado.
- O frasco fechado aparece na bancada. Ele abre: a tampa conta-gotas sobe, vai até a minha bochecha e pinga uma gota.
- A gota cai e vira a pincelada do produto espalhada na bochecha.
- Nessa hora eu troco pra foto de olhos fechados e aparecem brilhos em volta do rosto.
- A tampa volta pro frasco, ele fecha e eu termino na foto da piscadinha.
- Entram dois balões com os benefícios: "[benefício 1]" e "[benefício 2]".
- No alto, o número 2 na estrela e a tarja "produto no rosto".`;

const P_CARRINHO = `Animação 3, com 4 segundos: carrinho dos favoritos.

- Fundo creme com bolinhas e uma estrela amarela grande no meio.
- Uma cestinha de compras amarela entra dando um pulinho.
- Os produtos caem de cima, um de cada vez, e ficam DENTRO da cesta (a parede da frente da cesta passa na frente deles). A cesta balança um pouquinho a cada produto que cai.
- Entra um balão: "meus favoritos 🛒".
- No alto, o número 3 na estrela e a tarja "carrinho dos favoritos".`;

const AJUSTES = [
  "O produto está de cabeça pra baixo, deixa ele de pé.",
  "O produto ficou fora da cesta, coloca dentro.",
  "Ficou uma borda azul em volta do meu cabelo, tira.",
  "Está trocando de expressão rápido demais, troca só 2 ou 3 vezes.",
  "O texto está em cima do meu rosto, sobe ele.",
  "Usa só as minhas cores, tira o rosa.",
];

const ROTEIRO = `Episódio 1. Como eu faria uma animação com o Claude pra uma marca de skincare? Três ideias. Um: um varal com os produtos passando, e a minha mão escolhe o queridinho. Dois: o sérum abre, pinga no meu rosto, e eu mostro como a pele fica depois. Três: um carrinho com os meus favoritos caindo dentro. Quer os três prompts? Comenta Claude UGC que eu te mando.`;

const fundoBolinha = { backgroundColor: C.creme, backgroundImage: `radial-gradient(${C.amarelo} 1.6px, transparent 1.7px)`, backgroundSize: "22px 22px" };

export default function Animacoes() {
  const [liberado, setLiberado] = useState(false);
  const [origem, setOrigem] = useState("animacoes");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const o = q.get("ref") || q.get("utm_campaign");
    // a origem e a marca de "já se cadastrou" só existem no navegador
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (o) setOrigem(o.slice(0, 40));
    try { if (localStorage.getItem(MARCA)) setLiberado(true); } catch {}
  }, []);

  return (
    <main className="min-h-screen pb-24" style={{ ...fundoBolinha, color: C.tinta }}>
      <div className="mx-auto max-w-xl px-4 pt-8">
        <p className="text-sm font-bold" style={{ color: C.marrom }}>@eilaradam</p>

        <section className="relative mt-4 overflow-hidden rounded-[28px] p-6 sm:p-8" style={{ background: C.marrom, color: C.creme }}>
          <Estrela className="absolute -right-6 -top-6 h-28 w-28 opacity-90" cor={C.amarelo} />
          <span className="inline-block -rotate-2 rounded-md px-3 py-1 text-[13px] font-extrabold uppercase tracking-wide" style={{ background: C.amarelo, color: C.tinta }}>
            episódio 1 · skincare
          </span>
          <h1 className="mt-4 text-[34px] font-extrabold leading-[1.02] tracking-tight sm:text-[42px]">Animações com o Claude</h1>
          <p className="mt-2 text-[26px] leading-none" style={{ fontFamily: "var(--font-caveat)", color: C.amarelo }}>com as suas fotos ✦</p>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "rgba(248,241,223,.85)" }}>
            Um guia curtinho pra você criar as 3 animações do vídeo: o varal de produtos, o produto passando no rosto e o carrinho dos favoritos.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["1 · varal de produtos", "2 · produto no rosto", "3 · carrinho dos favoritos"].map((t, i) => (
              <span key={t} className="rounded-full px-3 py-1.5 text-[12.5px] font-bold" style={{ background: C.creme, color: C.marrom, transform: `rotate(${[-1.5, 1, -0.5][i]}deg)` }}>{t}</span>
            ))}
          </div>
        </section>

        {liberado ? <Guia /> : <Cadastro origem={origem} liberar={() => { try { localStorage.setItem(MARCA, "1"); } catch {} setLiberado(true); }} />}
      </div>
    </main>
  );
}

function Estrela({ className, cor }: { className?: string; cor: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d="M50 4 61 36 95 37 68 57 78 91 50 71 22 91 32 57 5 37 39 36Z" fill={cor} />
    </svg>
  );
}

function Cadastro({ origem, liberar }: { origem: string; liberar: () => void }) {
  const [f, setF] = useState({ nome: "", whatsapp: "", email: "", instagram: "", website: "" });
  const [indo, setIndo] = useState(false);
  const [erro, setErro] = useState("");
  const campo = "mt-1 w-full rounded-xl border bg-white px-3.5 py-3 text-[16px] outline-none focus:border-[#4E2B1D]";
  const mudar = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (indo) return;
    setErro("");
    setIndo(true);
    try {
      const r = await fetch("/api/animacoes-lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...f, origem }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) { setErro(j.error || "Não consegui salvar agora. Tenta de novo?"); setIndo(false); return; }
      liberar();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setErro("Sem conexão. Tenta de novo?");
      setIndo(false);
    }
  };

  return (
    <form onSubmit={enviar} className="mt-5 rounded-[24px] p-5 shadow-sm sm:p-6" style={{ background: C.papel, border: `1px solid ${C.linha}` }}>
      <h2 className="text-xl font-extrabold">Libera os prompts</h2>
      <p className="mt-1 text-[14.5px]" style={{ color: C.suave }}>Preenche rapidinho que o guia aparece na hora, com todos os prompts prontos pra copiar.</p>
      <label className="mt-4 block text-sm font-bold">Seu nome
        <input className={campo} style={{ borderColor: C.linha }} value={f.nome} onChange={mudar("nome")} required maxLength={120} autoComplete="given-name" />
      </label>
      <label className="mt-3 block text-sm font-bold">WhatsApp
        <input className={campo} style={{ borderColor: C.linha }} value={f.whatsapp} onChange={mudar("whatsapp")} required maxLength={40} autoComplete="tel" inputMode="tel" placeholder="(11) 99999-9999" />
      </label>
      <label className="mt-3 block text-sm font-bold">Seu melhor e-mail
        <input className={campo} style={{ borderColor: C.linha }} type="email" value={f.email} onChange={mudar("email")} required maxLength={160} autoComplete="email" inputMode="email" />
      </label>
      <label className="mt-3 block text-sm font-bold">@ do Instagram
        <input className={campo} style={{ borderColor: C.linha }} value={f.instagram} onChange={mudar("instagram")} required maxLength={60} autoCapitalize="none" placeholder="@seuperfil" />
      </label>
      {/* isca pra robô: gente de verdade não vê nem preenche */}
      <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" value={f.website} onChange={mudar("website")} name="website" />
      {erro && <p className="mt-3 rounded-lg px-3 py-2 text-sm font-semibold" style={{ background: "#FFF1E6", color: "#9A3412" }}>{erro}</p>}
      <button type="submit" disabled={indo} className="mt-5 w-full rounded-full py-3.5 text-[16px] font-extrabold disabled:opacity-60" style={{ background: C.amarelo, color: C.tinta, boxShadow: `0 3px 0 ${C.marrom}` }}>
        {indo ? "Liberando…" : "Quero os prompts ✦"}
      </button>
      <p className="mt-3 text-center text-xs" style={{ color: C.suave }}>Seus dados ficam só comigo. Nada de spam.</p>
    </form>
  );
}

function Prompt({ titulo, texto }: { titulo?: string; texto: string }) {
  const [copiou, setCopiou] = useState(false);
  const copiar = async () => {
    try { await navigator.clipboard.writeText(texto); } catch { return; }
    setCopiou(true);
    setTimeout(() => setCopiou(false), 2500);
  };
  return (
    <div className="mt-3">
      {titulo && <p className="text-[14px] font-extrabold" style={{ color: C.marrom }}>{titulo}</p>}
      <div className="mt-1.5 rounded-2xl p-4" style={{ background: C.tinta, color: "#F3EBD7" }}>
        <pre className="max-h-[260px] overflow-auto whitespace-pre-wrap text-[13.5px] leading-relaxed" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{texto}</pre>
      </div>
      <button type="button" onClick={copiar} className="mt-2 w-full rounded-full py-2.5 text-[14.5px] font-extrabold"
        style={copiou ? { background: C.marrom, color: C.creme } : { background: C.amarelo, color: C.tinta }}>
        {copiou ? "Copiado ✓" : "Copiar o prompt"}
      </button>
    </div>
  );
}

function Passo({ n, titulo, children }: { n: number | string; titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-4 rounded-[24px] p-5 sm:p-6" style={{ background: C.papel, border: `1px solid ${C.linha}` }}>
      <div className="flex items-center gap-3">
        <span className="relative grid h-12 w-12 flex-shrink-0 place-items-center">
          <Estrela className="absolute inset-0 h-12 w-12" cor={C.marrom} />
          <span className="relative text-[17px] font-extrabold" style={{ color: C.creme }}>{n}</span>
        </span>
        <h2 className="text-[19px] font-extrabold leading-tight">{titulo}</h2>
      </div>
      <div className="mt-3 space-y-2.5 text-[15.5px] leading-relaxed" style={{ color: "#3A2E26" }}>{children}</div>
    </section>
  );
}

function Turma5({ grande }: { grande?: boolean }) {
  return (
    <a href={TURMA5} className={`mt-5 block rounded-[24px] p-5 ${grande ? "sm:p-7" : ""}`} style={{ background: C.tinta, color: C.creme }}>
      <span className="inline-block -rotate-2 rounded-md px-2.5 py-0.5 text-[12px] font-extrabold uppercase" style={{ background: C.amarelo, color: C.tinta }}>turma 5</span>
      <p className="mt-2 text-[20px] font-extrabold leading-tight">Quer aprender a editar e criar com o Claude comigo?</p>
      <p className="mt-1 text-[14.5px]" style={{ color: "rgba(248,241,223,.75)" }}>As inscrições da Turma 5 estão abertas.</p>
      <span className="mt-4 inline-block rounded-full px-5 py-2.5 text-[15px] font-extrabold" style={{ background: C.amarelo, color: C.tinta }}>Quero entrar na Turma 5 👉</span>
    </a>
  );
}

function Guia() {
  return (
    <>
      <p className="mt-6 px-1 text-[28px] leading-tight" style={{ fontFamily: "var(--font-caveat)", color: C.marrom }}>Prontinho! Bora criar as suas 👇</p>

      <section className="mt-3 rounded-[24px] p-5 sm:p-6" style={{ background: C.amarelo }}>
        <h2 className="text-[18px] font-extrabold">Antes de começar</h2>
        <ul className="mt-2 space-y-1 text-[15px]">
          <li>✦ Uma conta no <b>ChatGPT</b> ou no <b>Gemini</b> (pras suas fotos e as do produto)</li>
          <li>✦ Uma conta no <b>Claude</b> (claude.ai)</li>
          <li>✦ Uma foto sua de rosto, bem iluminada, olhando pra câmera</li>
        </ul>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[12.5px] font-bold">
          {["Você cria as fotos em fundo azul liso", "Manda pro Claude com o prompt", "O Claude anima e você grava a tela"].map((t, i) => (
            <div key={t} className="rounded-2xl p-2.5" style={{ background: C.papel }}><span className="block text-[18px]" style={{ color: C.marrom }}>{i + 1}</span>{t}</div>
          ))}
        </div>
        <p className="mt-3 text-[13.5px]" style={{ color: C.marrom }}><b>Por que fundo azul?</b> Porque fica fácil de recortar: cabelo escuro e roupa clara se separam muito bem do azul.</p>
      </section>

      <Passo n={1} titulo="Suas fotos (no ChatGPT ou Gemini)">
        <p>Mande a sua foto junto com o prompt base. Peça <b>uma imagem por vez</b>, sempre na mesma conversa, pra ele manter o seu rosto.</p>
        <Prompt titulo="Prompt base (cole primeiro)" texto={P_BASE} />
        <p className="pt-2 font-bold">Depois, uma por vez:</p>
        {P_FOTOS.map((t, i) => <Prompt key={i} titulo={["Olhos fechados", "Piscadinha", "Corpo inteiro", "Mão em pinça"][i]} texto={t} />)}
      </Passo>

      <Passo n={2} titulo="O produto (no ChatGPT ou Gemini)">
        <p>Se você tem a foto do produto da marca, use como referência. Se não tem, descreva o produto.</p>
        <Prompt titulo="Produto de pé" texto={P_PRODUTO} />
        <Prompt titulo="Versão aberta (sérum ou produto com tampa)" texto={P_ABERTO} />
        <p className="pt-2 font-bold">Dois extras que deixam a animação mais bonita:</p>
        <Prompt titulo="Gota" texto={P_GOTA} />
        <Prompt titulo="Pincelada" texto={P_PINCELADA} />
        <p className="text-[14px]" style={{ color: C.suave }}><b>Dica:</b> salve tudo numa pasta só, com nomes fáceis (busto_lado, busto_olhos_fechados, mao_pinca, serum_fechado…). Isso ajuda o Claude a entender cada arquivo.</p>
      </Passo>

      <Passo n={3} titulo="As animações (no Claude)">
        <p>Abra uma conversa nova no Claude, anexe as imagens e cole <b>um prompt por vez</b>. Comece sempre pelo de estilo, que vale pras três.</p>
        <Prompt titulo="Prompt de estilo (cole primeiro)" texto={P_ESTILO} />
        <Prompt titulo="Ideia 1 · Varal de produtos" texto={P_VARAL} />
        <Prompt titulo="Ideia 2 · Produto no rosto" texto={P_ROSTO} />
        <Prompt titulo="Ideia 3 · Carrinho dos favoritos" texto={P_CARRINHO} />
      </Passo>

      <Passo n={4} titulo="Ajustes que mais aparecem">
        <p>Depois de ver a animação, peça ajustes curtinhos, um por vez. Os que eu mais precisei:</p>
        <ul className="space-y-1.5">
          {AJUSTES.map((a) => <li key={a} className="rounded-xl px-3 py-2 text-[14.5px]" style={{ background: C.creme }}>“{a}”</li>)}
        </ul>
      </Passo>

      <Passo n={5} titulo="Do Claude pro Reels">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Abra a animação em tela cheia.</li>
          <li>Grave a tela (no celular, pela gravação de tela; no computador, com o gravador de tela).</li>
          <li>Corte o começo e o fim no editor que você já usa.</li>
          <li>Junte as 3 ideias, grave a sua narração por cima e coloque a legenda.</li>
        </ol>
        <Prompt titulo="Roteiro que eu usei" texto={ROTEIRO} />
      </Passo>

      <section className="mt-4 rounded-[24px] p-5 sm:p-6" style={{ background: C.papel, border: `2px dashed ${C.marrom}` }}>
        <h2 className="text-[17px] font-extrabold">Antes de postar pra uma marca</h2>
        <ul className="mt-2 space-y-1.5 text-[14.5px]" style={{ color: "#3A2E26" }}>
          <li>✦ Use produto da marca só com autorização dela. Se for ideia sua, deixe claro na legenda que não é publi.</li>
          <li>✦ Benefício na tela só se estiver escrito na embalagem ou no briefing.</li>
          <li>✦ Fotos suas geradas por IA: vale avisar na legenda que a colagem é montada.</li>
        </ul>
      </section>

      <Turma5 grande />

      <p className="mt-8 text-center text-[22px]" style={{ fontFamily: "var(--font-caveat)", color: C.marrom }}>Salva esse guia pra testar 📌</p>
      <p className="mt-2 text-center text-sm" style={{ color: C.suave }}>Fez a sua? Me marca no story <b style={{ color: C.marrom }}>@eilaradam</b> que eu quero ver ✦</p>
    </>
  );
}
