import {createSharedPathnamesNavigation} from 'next-intl/navigation';
import {getLocale} from 'next-intl/server';

import {Locale, locales} from '@spinach/next/types/next/locale';
import {isLocale} from '@spinach/next/utils/i18n';


export const {Link, redirect, usePathname, useRouter} = createSharedPathnamesNavigation({locales});

export const getI18nLocale = async (): Promise<Locale> => {
  const locale = await getLocale();
  if (!isLocale(locale)) {
    throw new Error(`Invalid Locale: ${locale}`);
  }

  return locale;
};
