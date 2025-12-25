import {ProxyConfig} from 'next/server';
import createMiddleware from 'next-intl/middleware';

import {defaultLocale} from '@spinach/next/const/locale';
import {locales} from '@spinach/next/types/next/locale';


export const proxy = createMiddleware({
  locales,
  defaultLocale,
});

export const config: ProxyConfig = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

export default proxy;
