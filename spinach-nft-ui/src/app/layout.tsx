/* eslint-disable new-cap */
import React from 'react';

import type {Metadata} from 'next';
// eslint-disable-next-line camelcase
import {Noto_Sans} from 'next/font/google';

import {PageLayoutParams} from '@/types/next/layout';
import {Providers} from '@/ui/base/providers';
import './globals.css';


const font = Noto_Sans({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '菠菜 NFT 交易平台',
  description: 'Got a spinach in here!',
};

const RootLayout = ({children}: React.PropsWithChildren<PageLayoutParams>) => {
  return (
    <html lang="zh" className="h-full" suppressHydrationWarning>
      <body className={font.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
