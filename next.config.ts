import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // A pagina /bio e um site estatico servido de public/bio/
      { source: "/bio", destination: "/bio/index.html" },
      { source: "/bio/", destination: "/bio/index.html" },
      // Proposta do Replit (HTML estatico em public/replit/)
      { source: "/replit", destination: "/replit/index.html" },
      { source: "/replit/", destination: "/replit/index.html" },
      // Pagina de UGC para marcas de supermercado (HTML estatico em public/mercado/)
      { source: "/mercado", destination: "/mercado/index.html" },
      { source: "/mercado/", destination: "/mercado/index.html" },
      // Pagina de UGC para eventos (HTML estatico em public/eventos/)
      { source: "/eventos", destination: "/eventos/index.html" },
      { source: "/eventos/", destination: "/eventos/index.html" },
      // 5 dicas pro primeiro UGC (isca do carrossel do Instagram, HTML estatico em public/dicas-insta-2026/)
      { source: "/dicas-insta-2026", destination: "/dicas-insta-2026/index.html" },
      { source: "/dicas-insta-2026/", destination: "/dicas-insta-2026/index.html" },
      // Landing page do Intensivo Edicao com Claude, Turma 05 (HTML estatico em public/edicaoclaude/)
      { source: "/edicaoclaude", destination: "/edicaoclaude/index.html" },
      { source: "/edicaoclaude/", destination: "/edicaoclaude/index.html" },
      // Tour 3D do apartamento (Three.js estatico)
      { source: "/projeto/3d", destination: "/projeto/3d/index.html" },
      { source: "/projeto/3d/", destination: "/projeto/3d/index.html" },
    ];
  },
};

export default nextConfig;
