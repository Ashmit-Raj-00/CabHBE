import type { NextConfig } from "next";

// Builds a plain HTML/CSS/JS website into the `out/` folder, ready to upload to
// GoDaddy (or any web host) — no Node.js server needed.
const nextConfig: NextConfig = {
  output: "export",
  // Emits /about/index.html instead of /about.html so Apache serves /about/ directly.
  trailingSlash: true,
  // Image resizing needs a server; images in public/ are served as they are.
  images: { unoptimized: true },
};

export default nextConfig;
