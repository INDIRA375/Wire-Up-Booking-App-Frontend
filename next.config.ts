import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: false, // Disable LightningCSS to fix Render build error
  },
};

export default nextConfig;
