/* =============================================================
   LOGICA DA PAGINA  (voce nao precisa editar isso)
   Le o CONFIG do data.js e monta tudo na tela.
   ============================================================= */

/* ---------- Icones (SVG) ---------- */
const ICONS = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="6"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.3 2.1 1.6 3.6 3.5 3.9V10c-1.4 0-2.7-.4-3.8-1.1v6.3c0 3.3-2.4 5.8-5.6 5.8-3 0-5.3-2.3-5.3-5.2 0-3 2.4-5.2 5.4-5.2.4 0 .7 0 1 .1v3.2c-.3-.1-.6-.2-1-.2-1.2 0-2.1.9-2.1 2.1 0 1.2.9 2.1 2.1 2.1 1.3 0 2.3-1 2.3-2.6V3h3.5z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2c-.2-1.4-.8-2.1-2.2-2.3C17.8 5.5 12 5.5 12 5.5s-5.8 0-7.8.4C2.8 6.1 2.2 6.8 2 8.2 1.7 9.7 1.7 12 1.7 12s0 2.3.3 3.8c.2 1.4.8 2.1 2.2 2.3 2 .4 7.8.4 7.8.4s5.8 0 7.8-.4c1.4-.2 2-.9 2.2-2.3.3-1.5.3-3.8.3-3.8s0-2.3-.3-3.8zM10 15V9l5 3-5 3z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 3.5a2 2 0 100 4 2 2 0 000-4zM3 9h3v12H3zM9 9h2.9v1.6h.04c.4-.76 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7V21H18.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4.5 13.5H11l-1 8.5L19.5 10H13z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>',
  external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 5h5v5M19 5l-8 8M18 13v6H5V6h6"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/><path d="M2 3h2.2l2 12h11l2-8H6"/></svg>',
  spotify: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.5 14.4a.75.75 0 01-1 .25c-2.8-1.7-6.3-2.1-10.4-1.15a.75.75 0 11-.33-1.46c4.5-1 8.4-.6 11.5 1.3.35.2.46.66.23 1.06zm1.2-2.8a.94.94 0 01-1.28.3c-3.2-2-8-2.5-11.8-1.35a.94.94 0 11-.54-1.8c4.3-1.3 9.6-.7 13.3 1.55.44.27.58.85.32 1.3zm.1-2.9C14.3 8.4 8 8.2 4.4 9.3a1.12 1.12 0 11-.65-2.15C7.9 5.9 14.8 6.1 19 8.6a1.12 1.12 0 11-1.15 1.92z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.5A10 10 0 1012 2zm0 1.8a8.2 8.2 0 016.9 12.6l.2.3-.8 2.9-3-.8.3.2A8.2 8.2 0 1112 3.8zm-3.3 4c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.3s1 2.7 1.1 2.9c.1.2 2 3.1 4.9 4.3 2.4 1 2.9.8 3.4.8.5 0 1.6-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.2-.7.1l-.7.9c-.1.2-.3.2-.5.1-.3-.1-1.2-.5-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.1-.3 0-.4.1-.5l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.4-.6-.5h-.5z"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3 1.2 4 2.5 1-1.3 2-2.5 4-2.5 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21z"/></svg>',
  comment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a8 8 0 01-11.5 7.2L3 21l1.8-6.5A8 8 0 1121 12z"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 3L11 14M22 3l-7 19-4-8-8-4 19-7z"/></svg>',
  bookmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12v18l-6-4-6 4z"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
};

/* ---------- Analytics simples (conta cliques) ----------
   Guarda no navegador e mostra no console. Pra ligar num
   analytics de verdade, e so trocar o corpo da funcao track().
*/
const Analytics = {
  track(evento, dados = {}) {
    const store = JSON.parse(localStorage.getItem("bio_analytics") || "{}");
    const chave = evento + (dados.id ? ":" + dados.id : "");
    store[chave] = (store[chave] || 0) + 1;
    localStorage.setItem("bio_analytics", JSON.stringify(store));
    console.log("[analytics]", evento, dados, "-> total:", store[chave]);
    // window.verAnalytics() no console mostra o resumo
  },
};
window.verAnalytics = () => JSON.parse(localStorage.getItem("bio_analytics") || "{}");

/* ---------- Helpers ---------- */
const $ = (sel, el = document) => el.querySelector(sel);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const delay = (ms) => new Promise(r => setTimeout(r, ms));
const capa = (p) => p.imagem
  ? `background-image:url('${p.imagem}')`
  : `background:linear-gradient(150deg, ${p.capaCor}, ${p.capaCor}88)`;

function spotifyEmbed(url) {
  try {
    const u = new URL(url);
    if (!u.pathname.startsWith("/embed")) u.pathname = "/embed" + u.pathname;
    return "https://open.spotify.com" + u.pathname + "?utm_source=generator&theme=0";
  } catch { return url; }
}

/* =============================================================
   RENDER DA PAGINA
   ============================================================= */
function render() {
  const wrap = $("#app");
  const C = CONFIG;
  document.title = C.perfil.nome + " | Link na bio";

  // fundo desfocado a partir da foto
  $("#bg").style.backgroundImage = `url('${C.perfil.foto}')`;

  const frag = document.createDocumentFragment();

  /* 1. HERO */
  const hero = el("header", "hero reveal");
  hero.innerHTML = `
    <img class="avatar" src="${C.perfil.foto}" alt="${esc(C.perfil.nome)}">
    <h1>${esc(C.perfil.nome)}</h1>
    <p>${esc(C.perfil.subtitulo)}</p>
    <div class="scroll-hint">${ICONS.chevronDown}</div>
    <nav class="socials" aria-label="Redes sociais">
      ${C.redes.map(r => `<a href="${r.url}" target="_blank" rel="noopener" aria-label="${r.rede}" data-track="social:${r.rede}">${ICONS[r.rede] || ICONS.external}</a>`).join("")}
    </nav>`;
  frag.appendChild(hero);

  /* 2. CHATBOT CARD */
  const chatCard = el("button", "card chat-card reveal");
  chatCard.setAttribute("aria-label", "Abrir chat");
  chatCard.innerHTML = `
    <span class="bolt">${ICONS.bolt}</span>
    <span class="txt"><small>Concierge de IA</small><strong>${esc(C.chat.tituloCard)}</strong></span>
    <span class="arrow">${ICONS.arrow}</span>`;
  chatCard.onclick = openChat;
  frag.appendChild(chatCard);

  /* 3. CARROSSEL DE PRODUTOS (destaques) */
  frag.appendChild(el("h2", "section-title reveal", esc(C.textos.tituloCarrossel)));
  frag.appendChild(carrossel(C.produtos.slice(0, 3)));

  /* 4. LINK EXTERNO SIMPLES */
  const L = C.linkExterno;
  const linkExt = el("button", "card link-ext reveal");
  linkExt.innerHTML = `
    <span class="thumb" style="${L.imagem ? `background-image:url('${L.imagem}')` : `background:linear-gradient(135deg,${L.thumbCor},${L.thumbCor}99)`}"></span>
    <span class="info"><strong>${esc(L.titulo)}</strong><small>${esc(L.descricao)}</small></span>
    <span class="out">${ICONS.external}</span>`;
  linkExt.onclick = () => { Analytics.track("link_externo", { id: "livro" }); window.open(L.url, "_blank", "noopener"); };
  frag.appendChild(linkExt);

  /* 5. PLATAFORMA (powered by) */
  frag.appendChild(poweredBy(C.plataforma));

  /* 6. SPOTIFY */
  const sp = el("section", "card spotify-card reveal");
  sp.innerHTML = `
    <div class="spotify-head"><span class="sp-ico">${ICONS.spotify}</span><strong>${esc(C.spotify.nome)}</strong></div>
    <iframe src="${spotifyEmbed(C.spotify.url)}" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
  frag.appendChild(sp);

  /* 7. WHATSAPP */
  C.whatsapp.forEach((w, i) => {
    const link = `https://wa.me/${w.numero}?text=${encodeURIComponent(w.mensagem)}`;
    const card = el("section", "card wa-card reveal");
    card.style.background = `linear-gradient(135deg, ${w.cor}, ${w.cor}cc)`;
    card.innerHTML = `
      <div class="wa-top">
        <span class="wa-ico">${ICONS.whatsapp}</span>
        <span class="wa-meta"><small>${esc(w.categoria)}</small><strong>${esc(w.numeroExibicao)}</strong></span>
      </div>
      <button class="wa-pill" data-track="whatsapp:${i}">Iniciar conversa ${ICONS.arrow}</button>`;
    $(".wa-pill", card).onclick = () => { Analytics.track("whatsapp", { id: i }); window.open(link, "_blank", "noopener"); };
    frag.appendChild(card);
  });

  /* 8. FEED DO INSTAGRAM */
  const ig = C.instagram;
  frag.appendChild(el("h2", "section-title reveal", esc(ig.usuario)));
  const igCar = el("div", "carousel reveal");
  ig.posts.forEach(p => {
    const post = el("a", "ig-post");
    post.href = ig.url; post.target = "_blank"; post.rel = "noopener";
    post.style.cssText = p.imagem ? `background-image:url('${p.imagem}')` : `background:linear-gradient(160deg, ${p.cor}, ${p.cor}77)`;
    post.innerHTML = `
      <span class="ig-badge">${ICONS.instagram}</span>
      <div class="ig-actions">${ICONS.heart}${ICONS.comment}${ICONS.share}<span class="grow"></span>${ICONS.bookmark}</div>`;
    post.onclick = () => Analytics.track("instagram_post", { id: p.legenda });
    igCar.appendChild(post);
  });
  frag.appendChild(igCar);

  /* 9. CATALOGO COMPLETO */
  frag.appendChild(el("h2", "section-title reveal", esc(C.textos.tituloCatalogo)));
  frag.appendChild(carrossel(C.produtos));

  /* 10. RODAPE */
  const foot = el("footer", "foot reveal");
  foot.innerHTML = `Feito com <strong>${esc(C.plataforma.nome)}</strong><br>${esc(C.plataforma.atribuicao)}`;
  frag.appendChild(foot);

  wrap.appendChild(frag);
  observarReveal();
}

/* ---------- Carrossel de produtos ---------- */
function carrossel(produtos) {
  const car = el("div", "carousel reveal");
  produtos.forEach(p => {
    const card = el("article", "product");
    card.innerHTML = `
      <div class="cover" style="${capa(p)}"><span>${esc(p.titulo)}</span></div>
      <div class="body">
        <h3>${esc(p.titulo)}</h3>
        <span class="price">${esc(p.preco)}</span>
        <button class="btn-ghost">Ver detalhes</button>
      </div>`;
    $(".btn-ghost", card).onclick = () => openProduto(p);
    car.appendChild(card);
  });
  return car;
}

/* ---------- Card powered by ---------- */
function poweredBy(pf) {
  const c = el("button", "card powered reveal");
  c.innerHTML = `
    <span class="logo">${esc(pf.nome[0])}</span>
    <span class="p-txt"><strong>${esc(pf.nome)}</strong><small>${esc(pf.descricao)}</small></span>
    <span class="out">${ICONS.external}</span>`;
  c.onclick = () => { Analytics.track("plataforma"); window.open(pf.url, "_blank", "noopener"); };
  return c;
}

/* =============================================================
   MODAIS (overlay generico)
   ============================================================= */
const overlay = $("#overlay");
function abrirOverlay(modalEl) {
  overlay.innerHTML = "";
  overlay.appendChild(modalEl);
  document.body.classList.add("no-scroll");
  requestAnimationFrame(() => overlay.classList.add("open"));
}
function fecharOverlay() {
  overlay.classList.remove("open");
  document.body.classList.remove("no-scroll");
  setTimeout(() => { overlay.innerHTML = ""; }, 350);
}
overlay.addEventListener("click", e => { if (e.target === overlay) fecharOverlay(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") fecharOverlay(); });

function botaoX() {
  const b = el("button", "modal-x", ICONS.close);
  b.setAttribute("aria-label", "Fechar");
  b.onclick = fecharOverlay;
  return b;
}

/* ---------- Modal de PRODUTO ---------- */
function openProduto(p) {
  Analytics.track("produto_ver", { id: p.id });
  const m = el("div", "modal");
  m.style.position = "relative";
  m.innerHTML = `
    <div class="pm-cover" style="${capa(p)}"><span>${esc(p.titulo)}</span></div>
    <div class="pm-body">
      <h2>${esc(p.titulo)}</h2>
      <div class="pm-price">${esc(p.preco)}</div>
      <p>${esc(p.descricao)}</p>
    </div>
    <div class="pm-foot">
      <button class="btn-primary">${ICONS.cart}${esc(p.cta)}</button>
    </div>`;
  m.appendChild(botaoX());
  $(".btn-primary", m).onclick = () => {
    Analytics.track("produto_comprar", { id: p.id });
    window.open(p.checkout, "_blank", "noopener");
  };
  abrirOverlay(m);
}

/* =============================================================
   CHATBOT (funil de perguntas + recomendacao)
   ============================================================= */
const ChatEngine = {
  tags: [],
  nome: "",
  body: null,

  open() {
    Analytics.track("chat_abrir");
    const C = CONFIG.chat, P = CONFIG.perfil;
    const m = el("div", "modal chat-modal");
    m.style.position = "relative";
    m.innerHTML = `
      <div class="chat-header">
        <img src="${P.foto}" alt="">
        <div class="ch-meta"><strong>${esc(C.atendente)}</strong><small><span class="dot"></span>Online agora</small></div>
      </div>
      <div class="chat-body"></div>
      <div class="chat-input" style="display:none">
        <input type="text" placeholder="Digite aqui..." aria-label="Sua resposta">
        <button aria-label="Enviar">${ICONS.send}</button>
      </div>`;
    m.appendChild(botaoX());
    abrirOverlay(m);

    this.body = $(".chat-body", m);
    this.inputWrap = $(".chat-input", m);
    this.input = $(".chat-input input", m);
    this.sendBtn = $(".chat-input button", m);
    this.tags = [];
    this.nome = "";

    // tela de boas-vindas
    const welcome = el("div", "chat-welcome");
    welcome.innerHTML = `
      <img src="${P.foto}" alt="">
      <p>${esc(C.boasVindas)}</p>
      <button>Iniciar Chat</button>`;
    $("button", welcome).onclick = () => { this.body.innerHTML = ""; this.run(C.passoInicial); };
    this.body.appendChild(welcome);
  },

  scroll() { this.body.scrollTop = this.body.scrollHeight; },

  async botSay(texto) {
    const t = el("div", "typing", "<i></i><i></i><i></i>");
    this.body.appendChild(t); this.scroll();
    await delay(700 + Math.min(texto.length * 12, 900));
    t.remove();
    this.body.appendChild(el("div", "bubble bot", esc(texto)));
    this.scroll();
    await delay(200);
  },

  meSay(texto) {
    this.body.appendChild(el("div", "bubble me", esc(texto)));
    this.scroll();
  },

  async run(id) {
    const step = CONFIG.chat.passos[id];
    if (!step) return;

    if (step.tipo === "bot") {
      await this.botSay(step.texto);
      if (step.proximo) this.run(step.proximo);

    } else if (step.tipo === "escolha") {
      await this.botSay(step.texto);
      const box = el("div", "chat-options");
      step.opcoes.forEach(op => {
        const b = el("button", null, esc(op.label));
        b.onclick = () => {
          box.remove();
          this.meSay(op.label);
          (op.tags || []).forEach(t => this.tags.push(t));
          Analytics.track("chat_escolha", { id: op.label });
          this.run(op.proximo);
        };
        box.appendChild(b);
      });
      this.body.appendChild(box);
      this.scroll();

    } else if (step.tipo === "texto") {
      await this.botSay(step.texto);
      this.inputWrap.style.display = "flex";
      this.input.placeholder = step.placeholder || "Digite aqui...";
      this.input.focus();
      const enviar = () => {
        const v = this.input.value.trim();
        if (!v) return;
        this.meSay(v);
        this.nome = v;
        this.input.value = "";
        this.inputWrap.style.display = "none";
        this.run(step.proximo);
      };
      this.sendBtn.onclick = enviar;
      this.input.onkeydown = (e) => { if (e.key === "Enter") enviar(); };

    } else if (step.tipo === "recomendar") {
      const produto = this.melhorProduto();
      const texto = step.texto.replace("{nome}", this.nome || "Ei");
      await this.botSay(texto);
      await delay(300);
      this.mostrarReco(produto);
      Analytics.track("chat_recomendou", { id: produto.id });
    }
  },

  // escolhe o produto com mais "tags" em comum com as respostas
  melhorProduto() {
    let melhor = CONFIG.produtos[0], max = -1;
    CONFIG.produtos.forEach(p => {
      const pontos = (p.tags || []).filter(t => this.tags.includes(t)).length;
      if (pontos > max) { max = pontos; melhor = p; }
    });
    return melhor;
  },

  mostrarReco(p) {
    const reco = el("div", "reco");
    reco.innerHTML = `
      <div class="reco-cover" style="${capa(p)}"><span>${esc(p.titulo)}</span></div>
      <div class="reco-body">
        <h4>${esc(p.titulo)}</h4>
        <div class="price">${esc(p.preco)}</div>
        <a href="${p.checkout}" target="_blank" rel="noopener">${esc(p.cta)} ${ICONS.arrow}</a>
      </div>`;
    $("a", reco).onclick = () => Analytics.track("chat_cta", { id: p.id });
    this.body.appendChild(reco);
    this.scroll();
  },
};
function openChat() { ChatEngine.open(); }

/* ---------- Revelar ao rolar ---------- */
function observarReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach(elm => io.observe(elm));
}

/* ---------- Start ---------- */
document.addEventListener("DOMContentLoaded", render);
