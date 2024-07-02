import React from 'react';

import LanguageIcon from '@heroicons/react/24/outline/LanguageIcon';
import {clsx} from 'clsx';

import {DropDown} from '@spinach/next/components/dropdown/main';
import {localeName} from '@spinach/next/const/locale';
import {locales} from '@spinach/next/types/next/locale';
import {useLanguageSwitch} from '@spinach/next/ui/base/navbar/languageSwitch/hook';


export const LanguageSwitch = () => {
  const {currentLocale, isPending, onLocaleSwitch} = useLanguageSwitch();

  return (
    <DropDown
      origin="topLeft"
      renderButton={(DropdownMenuButton) => (
        <DropdownMenuButton className="button-clickable-bg h-full whitespace-nowrap px-2 py-1">
          <LanguageIcon className="size-7"/>
        </DropdownMenuButton>
      )}
      itemList={[
        locales.map((locale) => (
          <button
            key={locale}
            disabled={isPending || currentLocale === locale}
            className={clsx(
              'transform-smooth whitespace-nowrap p-0.5 enabled:hover:text-amber-300 disabled:text-slate-500',
            )}
            onClick={() => onLocaleSwitch(locale)}
          >
            {localeName[locale]}
          </button>
        )),
      ]}
    />
  );
};
