#!/usr/bin/env python3
"""Aplica no tour 3D as marcacoes de produto e o painel de clique.

Uso: python3 scripts/patch-tour-3d.py "~/Downloads/lara-isa-3d (2).html"
Le o HTML cru que a Lara gera e escreve public/projeto/3d/index.html.
Rodar de novo a cada modelo novo: o arquivo cru nao tem nada disso.
"""
import sys, os, pathlib

DESTINO = pathlib.Path(__file__).resolve().parent.parent / "public/projeto/3d/index.html"

# etiqueta -> aplicada em todas as pecas criadas depois do comentario indicado
MARCAS = [
    ("  // geladeira 60x62, ao lado da porta", "geladeira"),
    ("  // armário café 65 (z 77..142)", "cafe"),
    ("  // prateleira com LED ao lado da geladeira", "prateleira"),
    ("  // armário aéreo 142 x 95 x 40", "marcenaria"),
    ("  // porta de entrada (z 144..223)", "porta"),
    ("  // ilha conforme detalhamento 03", "ilha"),
    ("  // bancos sob o balanço do tampo", "banqueta"),
    ("  // livro de receitas e tábua na ilha", "utensilios"),
    ("  // ---------- RIPADO (x 246..474", "ripado"),
    ("  // espelho arco 60 x 160 encostado", "espelho"),
    ("  // ---------- ESTAR ----------", "quadros"),
    ("  // sofá Belgrado 230 com chaise", "sofa"),
    ("  // tapete chenille off-white", "tapete"),
    ("  // puff redondo linho areia", "puff"),
    ("  // rack existente 200 x 40 x 50", "rack"),
    ("  // TV The Frame 122 x 70", "tv"),
    ("  // 2 prateleiras madeiradas 100+110", "prateleira"),
    ("  // quadro Dublin 50x70 sobre a mesa", "quadros"),
    ("  // ---------- JANTAR ----------", "mesa"),
    ("  // pendente Saruê 40cm sobre a mesa", "pendente"),
    ("  // vaso com capim seco na mesa", "decor"),
    ("  // ---------- LUMINÁRIA DE CHÃO E PLANTAS ----------", "luminaria"),
    ("  // planta pendente na prateleira da TV", "plantas"),
    ("  // ---------- CORTINA (parede direita) ----------", "cortina"),
    ("  // trilho eletrificado com 4 spots", "iluminacao"),
    ("  // ---------- COZINHA, CORREDOR, BANHEIRO E QUARTO", "piso"),
    ("    // armário em L: perna longa", "marcenaria_cozinha"),
    ("    // cuba embutida + torneira gooseneck", "pia"),
    ("    // cooktop de indução + air fryer", "cooktop"),
    ("    // máquina de lavar no canto do fundo", "lavadora"),
    ("    // armário aéreo: portas em off-white", "marcenaria_cozinha"),
    ("    // prateleira de madeira no fundo, sobre a perna curta", "prateleira"),
    ("    // temperinhos na tampa do passa-prato", "plantas"),
    ("    // passadeira bege no piso", "tapete"),
    ("    // janela basculante alta na parede do fundo", "janela"),
    ("    // cama box estofada em linho bege", "cama"),
    ("    // cabeceira larga estofada com canto arredondado", "cama"),
    ("    // painel de madeira clara atrás da cama", "marcenaria_quarto"),
    ("    // dois quadros com molduras finas acima da cabeceira", "quadros"),
    ("    // mesinha lateral redonda com base de arame", "mesinha"),
    ("    // espelho arco na parede sul", "espelho"),
    ("    // prateleiras no canto entre a janela e o espelho", "prateleira"),
    ("    // janela com persiana rolô na parede leste", "cortina"),
    ("    // ---- marcenaria integrada: closet em freijó", "closet"),
    ("    // bancada em freijó na parede da janela", "home_office"),
    ("    // dois postos: monitor + teclado e notebook", "tech"),
    ("    // cadeiras de madeira com palhinha, uma em cada posto", "cadeiras"),
    ("    // ficus grande ao lado da torre", "plantas"),
    ("    // tapete cru sob a cama", "tapete"),
    ("    // manta xadrez caída no pé da cama", "cama"),
    ("    // prateleira comprida acima da janela", "prateleira"),
    ("    // planta perto do pé da cama", "plantas"),
    ("    // papel de parede botânico na parede da direita", "revestimento"),
    ("    // box do chuveiro na parede da porta", "box"),
    ("    // janela basculante alta na parede da direita", "janela"),
    ("    // vaso sanitário monobloco", "louca"),
    ("    // gabinete ripado suspenso em freijó", "gabinete"),
    ("    // espelho oval com luz por trás", "espelho"),
    ("    // prateleira de madeira ao lado do espelho", "prateleira"),
    ("    // planta de galhos ao lado da cuba", "plantas"),
    ("    // tapete pequeno e piso", "tapete_banheiro"),
    ("  // ---------- mini Lara gravando conteúdo na ilha", "gravacao"),
    ("  // ---------- base de maquete", None),
    ("  // ---------- luzes pontuais quentes", None),
]

PRODUTOS_JS = """
  // ---------- produtos que procuro em cada móvel ----------
  const PRODUTOS = {
    geladeira:          ['Geladeira', 'Organizador de geladeira', 'Ímãs e porta-retrato', 'Potes herméticos', 'Purificador de água'],
    cafe:               ['Cafeteira', 'Cápsulas e café', 'Xícaras e canecas', 'Bandeja', 'Potes e organizadores'],
    prateleira:         ['Objetos de decoração', 'Livros', 'Vasos pequenos', 'Fita de LED', 'Prateleira de madeira'],
    marcenaria:         ['Marcenaria planejada', 'Puxadores', 'Organizadores internos', 'Iluminação de nicho'],
    porta:              ['Tinta', 'Fechadura inteligente', 'Puxador', 'Capacho'],
    ilha:               ['Pedra da bancada', 'Móvel planejado', 'Forno de embutir', 'Cooktop', 'Tábuas', 'Organizadores'],
    banqueta:           ['Banquetas', 'Almofadas de assento', 'Capa de banqueta'],
    utensilios:         ['Tábuas', 'Kit de utensílios', 'Livro de receitas', 'Fruteira', 'Potes'],
    ripado:             ['Painel ripado', 'Marcenaria', 'Tinta', 'Iluminação de destaque'],
    espelho:            ['Espelho', 'Moldura', 'Iluminação de espelho'],
    quadros:            ['Quadros e pôsteres', 'Molduras', 'Trilho de quadros'],
    sofa:               ['Sofá', 'Almofadas', 'Manta', 'Capa de sofá', 'Mesa lateral'],
    tapete:             ['Tapete', 'Passadeira', 'Manta antiderrapante'],
    puff:               ['Puff', 'Poltrona', 'Almofada de chão'],
    rack:               ['Rack', 'Marcenaria planejada', 'Decoração do rack', 'Vitrola e discos'],
    tv:                 ['TV', 'Soundbar', 'Suporte de parede', 'Streaming'],
    mesa:               ['Mesa de jantar', 'Cadeiras', 'Jogo americano', 'Louça e talheres', 'Taças', 'Toalha de mesa'],
    cadeiras:           ['Cadeiras', 'Almofadas de assento', 'Capa de cadeira'],
    pendente:           ['Pendente', 'Lâmpada inteligente', 'Luminárias'],
    decor:              ['Vasos', 'Flores secas', 'Velas', 'Objetos de mesa'],
    luminaria:          ['Luminária de chão', 'Abajur', 'Lâmpada inteligente'],
    plantas:            ['Plantas', 'Vasos e cachepôs', 'Substrato e adubo', 'Regador'],
    cortina:            ['Cortina', 'Trilho', 'Blackout', 'Persiana'],
    iluminacao:         ['Trilho e spots', 'Fita de LED', 'Lâmpadas inteligentes', 'Automação'],
    piso:               ['Piso vinílico ou laminado', 'Porcelanato', 'Rodapé', 'Instalação'],
    parede:             ['Tinta', 'Papel de parede', 'Revestimento', 'Painel ripado'],
    marcenaria_cozinha: ['Marcenaria planejada', 'Puxadores', 'Organizadores', 'Pedra da bancada'],
    pia:                ['Cuba', 'Torneira', 'Purificador', 'Lixeira embutida', 'Escorredor'],
    cooktop:            ['Cooktop', 'Air fryer', 'Forno', 'Coifa', 'Micro-ondas'],
    lavadora:           ['Máquina de lavar', 'Secadora', 'Produtos de limpeza', 'Cesto de roupa'],
    janela:             ['Esquadria', 'Persiana', 'Película', 'Cortina'],
    cama:               ['Cama', 'Colchão', 'Lençol', 'Travesseiro', 'Fronha', 'Cobertor e colcha'],
    mesinha:            ['Mesa de cabeceira', 'Abajur', 'Objetos de mesa'],
    closet:             ['Guarda-roupa planejado', 'Cabides', 'Organizadores', 'Porta de palhinha'],
    home_office:        ['Bancada planejada', 'Cadeira de escritório', 'Luminária de mesa', 'Organizador de mesa'],
    tech:               ['Monitor', 'Teclado e mouse', 'Notebook', 'Suporte e hub', 'Microfone e câmera'],
    marcenaria_quarto:  ['Painel ripado', 'Marcenaria', 'Iluminação indireta'],
    box:                ['Box de vidro', 'Chuveiro', 'Ducha higiênica', 'Deck de madeira', 'Nicho'],
    louca:              ['Vaso sanitário', 'Assento', 'Ducha higiênica', 'Lixeira'],
    gabinete:           ['Gabinete planejado', 'Cuba de apoio', 'Torneira', 'Pedra da bancada', 'Organizadores'],
    revestimento:       ['Papel de parede', 'Porcelanato', 'Pastilhas', 'Tinta'],
    tapete_banheiro:    ['Tapete de banheiro', 'Toalhas', 'Porta-escova', 'Saboneteira'],
    gravacao:           ['Iluminação de gravação', 'Tripé e suporte', 'Microfone', 'Câmera', 'Ring light', 'Roupas e figurino'],
  };
  const NOMES = {
    geladeira:'Geladeira', cafe:'Cantinho do café', prateleira:'Prateleiras', marcenaria:'Marcenaria da copa',
    porta:'Porta de entrada', ilha:'Ilha da cozinha', banqueta:'Banquetas', utensilios:'Utensílios',
    ripado:'Painel ripado', espelho:'Espelho', quadros:'Quadros', sofa:'Sofá', tapete:'Tapete', puff:'Puff',
    rack:'Rack da TV', tv:'TV', mesa:'Mesa de jantar', cadeiras:'Cadeiras', pendente:'Pendente',
    decor:'Decoração', luminaria:'Luminária de chão', plantas:'Plantas', cortina:'Cortina',
    iluminacao:'Iluminação', piso:'Piso', parede:'Parede', marcenaria_cozinha:'Armários da cozinha',
    pia:'Pia e torneira', cooktop:'Cooktop e eletros', lavadora:'Máquina de lavar', janela:'Janela',
    cama:'Cama', mesinha:'Mesa de cabeceira', closet:'Closet', home_office:'Bancada de trabalho',
    tech:'Setup de trabalho', marcenaria_quarto:'Painel do quarto', box:'Box do chuveiro',
    louca:'Vaso sanitário', gabinete:'Gabinete do banheiro', revestimento:'Revestimento',
    tapete_banheiro:'Tapete do banheiro', gravacao:'Aqui é onde eu gravo',
  };

  const painel = document.getElementById('painel');
  const painelTitulo = document.getElementById('painelTitulo');
  const painelLista = document.getElementById('painelLista');
  const painelCta = document.getElementById('painelCta');
  document.getElementById('painelX').addEventListener('click', ()=> painel.classList.remove('on'));

  function abrePainel(chave){
    const nome = NOMES[chave] || chave;
    painelTitulo.textContent = nome;
    painelLista.innerHTML = '';
    (PRODUTOS[chave] || []).forEach(t=>{
      const s = document.createElement('span'); s.textContent = t; painelLista.appendChild(s);
    });
    painelCta.href = 'https://wa.me/5512988729264?text=' + encodeURIComponent(
      'Oi Lara! Vi o tour 3D do Projeto Casa Estúdio e quero falar sobre: ' + nome + '.'
    );
    painel.classList.add('on');
  }

  // clique nos móveis
  const ray = new THREE.Raycaster();
  const alvo = new THREE.Vector2();
  function itemDe(obj){
    let o = obj;
    while(o){ if(o.userData && o.userData.item) return o.userData.item; o = o.parent; }
    return null;
  }
  function pegaItem(cx, cy){
    const r = el0.getBoundingClientRect();
    alvo.x = ((cx - r.left)/r.width)*2 - 1;
    alvo.y = -((cy - r.top)/r.height)*2 + 1;
    ray.setFromCamera(alvo, cam);
    const hits = ray.intersectObjects(root.children, true);
    for(const h of hits){
      if(h.object.visible === false) continue;
      const it = itemDe(h.object);
      if(it) return it;
    }
    return null;
  }
  let downX = 0, downY = 0, downT = 0;
  el0.addEventListener('pointerdown', e=>{ downX = e.clientX; downY = e.clientY; downT = Date.now(); });
  el0.addEventListener('pointerup', e=>{
    if(pointers.size > 0) return;
    if(Math.hypot(e.clientX-downX, e.clientY-downY) > 6 || Date.now()-downT > 600) return;
    const it = pegaItem(e.clientX, e.clientY);
    if(it) abrePainel(it); else painel.classList.remove('on');
  });
  // cursor de mãozinha em cima do que é clicável
  let ultimoHover = 0;
  el0.addEventListener('pointermove', e=>{
    if(dragging || e.pointerType !== 'mouse') return;
    const agora = Date.now();
    if(agora - ultimoHover < 90) return;
    ultimoHover = agora;
    el0.style.cursor = pegaItem(e.clientX, e.clientY) ? 'pointer' : 'grab';
  });

"""

CSS_PAINEL = """  #painel{position:absolute;left:22px;bottom:22px;width:340px;max-width:calc(100vw - 44px);background:#fbfaf5;border:1px solid var(--line);border-radius:22px;padding:20px 20px 18px;box-shadow:0 18px 50px rgba(0,0,0,.14);transform:translateY(14px);opacity:0;pointer-events:none;transition:opacity .25s ease, transform .25s ease}
  #painel.on{opacity:1;transform:none;pointer-events:auto}
  #painel .cap{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#b4654a;font-weight:700}
  #painel h2{margin:10px 0 0;font-size:24px;line-height:1.05;letter-spacing:-.02em}
  #painel .lista{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px}
  #painel .lista span{background:#eceae4;border-radius:999px;padding:6px 11px;font-size:12.5px;color:#3f4a35}
  #painel a.cta{display:inline-flex;align-items:center;gap:6px;margin-top:16px;background:#2b2f2c;color:#fff;border-radius:999px;padding:10px 16px;font-size:12.5px;font-weight:600;text-decoration:none}
  #painel a.cta:hover{background:#b4654a}
  #painel .x{position:absolute;top:14px;right:14px;border:0;background:transparent;font-size:18px;line-height:1;color:var(--muted);cursor:pointer}
"""

MARKUP_PAINEL = """</footer>
  <div id="painel" role="dialog" aria-live="polite">
    <button class="x" id="painelX" aria-label="Fechar">✕</button>
    <span class="cap">Você consegue imaginar o seu produto aqui?</span>
    <h2 id="painelTitulo"></h2>
    <div class="lista" id="painelLista"></div>
    <a class="cta" id="painelCta" target="_blank" rel="noopener">Quero patrocinar esse item ↗</a>
  </div>"""


def aplicar(origem: str) -> None:
    s = open(origem, encoding="utf-8").read()

    # three.js servido do proprio site, com caminho absoluto (a rota /projeto/3d nao tem barra final)
    s = s.replace("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js", "/projeto/3d/three.min.js")

    # helpers marcam cada peca com a etiqueta atual
    s = s.replace("""  function box(w,h,d, material, x,y,z, parent=root){
    const m = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), material);""",
"""  // etiqueta do movel que esta sendo montado (usada pelo clique nos produtos)
  let TAG = null;
  function tag(t){ TAG = t; }
  function marca(m){ if(TAG) m.userData.item = TAG; return m; }

  function box(w,h,d, material, x,y,z, parent=root){
    const m = marca(new THREE.Mesh(new THREE.BoxGeometry(w,h,d), material));""")
    s = s.replace("""    const m = new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,seg), material);""",
                  """    const m = marca(new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,seg), material));""")
    s = s.replace("""    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 14), material);""",
                  """    const m = marca(new THREE.Mesh(new THREE.SphereGeometry(r, 18, 14), material));""")
    s = s.replace("m.userData.dir = dir; m.userData.y0 = y0; m.userData.y1 = y1; m.userData.interior = interior;",
                  "m.userData.dir = dir; m.userData.y0 = y0; m.userData.y1 = y1; m.userData.interior = interior; m.userData.item = 'parede';")

    faltando = []
    for alvo, t in MARCAS:
        if alvo not in s:
            faltando.append(alvo)
            continue
        ident = " " * (len(alvo) - len(alvo.lstrip()))
        s = s.replace(alvo, f"{ident}tag({'null' if t is None else chr(39)+t+chr(39)});\n" + alvo, 1)

    s = s.replace("  plant(440, 40, 26, 55, 17, C.folha);", "  tag('plantas');\n  plant(440, 40, 26, 55, 17, C.folha);", 1)
    s = s.replace("  chair(330, 205, Math.PI/2);", "  tag('cadeiras');\n  chair(330, 205, Math.PI/2);", 1)
    s = s.replace("top.rotation.x = -Math.PI/2; top.position.y = 86;", "top.userData.item = 'ilha'; top.rotation.x = -Math.PI/2; top.position.y = 86;")
    s = s.replace("frame.rotation.x = 0; frame.position.set(396, 0, 3.5);", "frame.userData.item = 'espelho'; frame.rotation.x = 0; frame.position.set(396, 0, 3.5);")
    s = s.replace("glass.scale.set(.9,.93,1); glass.position.set(396, 2, 4.5);", "glass.userData.item = 'espelho'; glass.scale.set(.9,.93,1); glass.position.set(396, 2, 4.5);")
    s = s.replace("hb.rotation.y = Math.PI/2; hb.position.set(qx+5, 0, 0);", "hb.userData.item = 'cama'; hb.rotation.y = Math.PI/2; hb.position.set(qx+5, 0, 0);")

    # painel de produtos
    s = s.replace("  @media (max-width:640px){", CSS_PAINEL + "  @media (max-width:640px){", 1)
    s = s.replace("    #hint{bottom:150px}", "    #painel{left:12px;right:12px;bottom:12px;width:auto;padding:16px}\n    #painel h2{font-size:20px}\n    #hint{bottom:150px}", 1)
    s = s.replace("</footer>", MARKUP_PAINEL, 1)
    s = s.replace("Arraste para girar, pince ou role para aproximar, ou escolha um ambiente acima",
                  "Clique nos móveis para ver os produtos que procuro. Arraste para girar.")
    s = s.replace("  resize(); updateCam(); syncButtons();", PRODUTOS_JS + "  resize(); updateCam(); syncButtons();", 1)

    DESTINO.write_text(s, encoding="utf-8")
    print(f"gerado {DESTINO} ({len(s)//1024} KB)")
    print(f"etiquetas aplicadas: {len(MARCAS)-len(faltando)}/{len(MARCAS)}")
    if faltando:
        print("NAO ENCONTRADAS (conferir se o modelo mudou):")
        for f in faltando:
            print("  -", f.strip())


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit("uso: python3 scripts/patch-tour-3d.py <arquivo-html-do-modelo>")
    aplicar(os.path.expanduser(sys.argv[1]))
