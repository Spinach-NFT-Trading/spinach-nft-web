/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@project/spinach-nft-common'],
  experimental: {
    serverMinification: false,
  },
};

module.exports = nextConfig;
