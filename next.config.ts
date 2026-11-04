import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Emit /route/index.html so GitHub Pages serves both /route and /route/ correctly.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
