/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false, // fix Render lightningcss error
  },
};

module.exports = nextConfig;
