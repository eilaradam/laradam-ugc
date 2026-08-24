import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // A pagina /bio e um site estatico servido de public/bio/
      { source: "/bio", destination: "/bio/index.html" },
      { source: "/bio/", destination: "/bio/index.html" },
      // Tour 3D do apartamento (Three.js estatico)
      { source: "/projeto/3d", destination: "/projeto/3d/index.html" },
      { source: "/projeto/3d/", destination: "/projeto/3d/index.html" },
    ];
  },
};

export default nextConfig;
