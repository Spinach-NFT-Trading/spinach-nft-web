import createNextI18nPlugin from 'next-intl/plugin';
import path from 'path';
import {fileURLToPath} from 'url';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withNextI18n = createNextI18nPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@project/spinach-nft-common'],
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../'),
  outputFileTracingIncludes: {
    '/*': ['./messages/**/*.json'],
  },
};

export default withNextI18n(nextConfig);
