/* eslint-disable new-cap */
import React from 'react';

import {projectName} from '@spinach/common/const/project';
import type {Metadata} from 'next';
// eslint-disable-next-line camelcase
import {Noto_Sans} from 'next/font/google';

import {PageLayoutParams} from '@spinach/next/types/next/layout';
import {Providers} from '@spinach/next/ui/base/providers';

import './globals.css';


const font = Noto_Sans({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: projectName,
  description: `${projectName}.`,
};

const RootLayout = ({children}: React.PropsWithChildren<PageLayoutParams>) => {
  return (
    <html lang="zh" className="h-full" suppressHydrationWarning>
      <body className={font.className}>
        <div className="min-h-screen bg-black/50">
          <Providers>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
