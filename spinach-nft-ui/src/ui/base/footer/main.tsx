'use client';
import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {localeName} from '@spinach/next/const/locale';
import {locales} from '@spinach/next/types/next/locale';
import {useLanguageSwitch} from '@spinach/next/ui/base/footer/hook';


export const Footer = () => {
  const {currentLocale, isPending, onLocaleSwitch} = useLanguageSwitch();

  return (
    <Flex direction="row" center className="p-10">
      {locales.map((locale) => (
        <Flex key={locale} noFullWidth className="p-2 not-last:border-r not-last:border-slate-500">
          <button
            key={locale}
            disabled={isPending || currentLocale === locale}
            className={clsx(
              'enabled:border-b enabled:border-blue-400 enabled:text-blue-400',
              'enabled:hover:border-blue-200 enabled:hover:text-blue-200',
              'disabled:text-slate-500',
            )}
            onClick={() => onLocaleSwitch(locale)}
          >
            {localeName[locale]}
          </button>
        </Flex>
      ))}
    </Flex>
  );
};
