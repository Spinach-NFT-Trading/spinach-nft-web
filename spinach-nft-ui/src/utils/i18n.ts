import {createTranslator} from 'next-intl';

import {defaultLocale} from '@spinach/next/const/locale';
import {I18nNamespaces} from '@spinach/next/types/i18n';
import {locales, Locale} from '@spinach/next/types/next/locale';


export const isLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale);
};

export const getMessages = async (locale: string) => {
  let localeToUse = locale;
  if (!isLocale(locale)) {
    localeToUse = defaultLocale satisfies Locale;
  }

  const [UI] = await Promise.all([
    import(`../../messages/ui/${localeToUse}.json`),
  ]);

  return {
    Locale: locale,
    UI: UI.default,
  };
};

export const getMessagesOfLocales = async <TLocale extends Locale>(
  locales: TLocale[],
): Promise<{[locale in TLocale]: IntlMessages}> => {
  return Object.fromEntries(
    (await Promise.all(locales.map((locale) => getMessages(locale))))
      .map((messages) => [messages.Locale, messages]),
  ) as {[locale in TLocale]: IntlMessages};
};

type GetI18nTranslatorOpts<TNamespace extends I18nNamespaces> = {
  locale: Locale,
  namespace: TNamespace,
};

export const getI18nTranslator = async <TNamespace extends I18nNamespaces>({
  locale,
  namespace,
}: GetI18nTranslatorOpts<TNamespace>) => {
  const messages = await getMessages(locale);
  return createTranslator<TNamespace>({
    locale,
    messages,
    namespace,
  });
};
