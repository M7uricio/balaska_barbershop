import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Existe um pnpm-lock.yaml no diretório home do usuário; sem isso o Next
  // infere a raiz do workspace errada.
  turbopack: { root: path.resolve(__dirname) },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
