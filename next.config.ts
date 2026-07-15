import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // A pagina /bio e um site estatico servido de public/bio/
      { source: "/bio", destination: "/bio/index.html" },
      { source: "/bio/", destination: "/bio/index.html" },
    ];
  },
};

export default nextConfig;
