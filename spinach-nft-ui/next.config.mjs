import createNextI18nPlugin from 'next-intl/plugin';


const withNextI18n = createNextI18nPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@project/spinach-nft-common'],
};

export default withNextI18n(nextConfig);
