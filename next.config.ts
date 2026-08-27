import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so the site can be served straight from GitHub Pages.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
