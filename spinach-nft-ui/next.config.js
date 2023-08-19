/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@project/spinach-nft-common'],
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
