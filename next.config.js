/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 60 * 60 * 24,
    deviceSizes: [320, 640, 660, 768, 1024, 1600],
  },
};

module.exports = nextConfig;
