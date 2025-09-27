import React from 'react';

import {NextIntlClientProvider} from 'next-intl';

import {getI18nLocale} from '@spinach/next/components/i18n/exports';
import {getMessages} from '@spinach/next/utils/i18n';


export const I18nProvider = async ({children}: React.PropsWithChildren) => {
  const locale = await getI18nLocale();
  const messages = await getMessages(locale);

  if (!messages) {
    return null;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};
