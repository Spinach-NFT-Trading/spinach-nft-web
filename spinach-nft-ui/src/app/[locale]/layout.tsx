import React from 'react';

import {Noto_Sans} from 'next/font/google';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';

import {MainContext} from '@spinach/next/context/main';
import {LocaleLayoutParams, LocaleLayoutProps} from '@spinach/next/types/next/layout';
import {locales} from '@spinach/next/types/next/locale';
import {GenerateStaticParamsFunc} from '@spinach/next/types/next/static';
import '../globals.css';
import {isLocale} from '@spinach/next/utils/i18n';


export const generateStaticParams: GenerateStaticParamsFunc<LocaleLayoutParams> = async () => {
  return locales.map((locale) => ({locale}));
};

const font = Noto_Sans({
  weight: '400',
  subsets: ['latin'],
});

const RootLayout = async ({params, children}: React.PropsWithChildren<LocaleLayoutProps>) => {
  const {locale} = await params;

  // Show a 404 error if the user requests an unknown locale
  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className="h-full" suppressHydrationWarning>
      <body className={font.className}>
        <div className="min-h-screen bg-black/50">
          <MainContext>
            {children}
          </MainContext>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
