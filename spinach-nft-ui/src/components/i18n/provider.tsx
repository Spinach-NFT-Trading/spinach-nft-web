import React from 'react';

import pick from 'lodash/pick';
import {NextIntlClientProvider} from 'next-intl';

import {getI18nLocale} from '@spinach/next/components/i18n/exports';
import {I18nNamespaces} from '@spinach/next/types/i18n';
import {getMessages} from '@spinach/next/utils/i18n';


type Props = {
  namespaces: I18nNamespaces[],
};

export const I18nProvider = async ({namespaces, children}: React.PropsWithChildren<Props>) => {
  const locale = await getI18nLocale();
  const messages = await getMessages(locale);

  if (!messages) {
    return null;
  }

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={pick(messages, ...namespaces)}
    >
      {children}
    </NextIntlClientProvider>
  );
};
