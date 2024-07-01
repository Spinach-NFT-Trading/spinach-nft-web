import createNextI18nPlugin from 'next-intl/plugin';


const withNextI18n = createNextI18nPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@project/spinach-nft-common'],
  experimental: {
    serverMinification: false,
  },
};

export default withNextI18n(nextConfig);
