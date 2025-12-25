import {Locale} from '@spinach/next/types/next/locale';


export type LocaleLayoutParams = {
  locale: Locale,
};

export type LocaleLayoutProps = {
  params: Promise<LocaleLayoutParams>,
};
