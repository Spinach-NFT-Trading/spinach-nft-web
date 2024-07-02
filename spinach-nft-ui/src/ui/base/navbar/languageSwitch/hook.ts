import React from 'react';

import {useLocale} from 'next-intl';

import {usePathname, useRouter} from '@spinach/next/components/i18n/exports';
import {Locale} from '@spinach/next/types/next/locale';


export const useLanguageSwitch = () => {
  const currentLocale = useLocale();
  const [isPending, startTransition] = React.useTransition();

  const router = useRouter();
  const pathname = usePathname();

  const onLocaleSwitch = (nextLocale: Locale) => {
    startTransition(() => {
      router.push(pathname, {locale: nextLocale, scroll: false});
    });
  };

  return {currentLocale: currentLocale as Locale, isPending, onLocaleSwitch};
};
