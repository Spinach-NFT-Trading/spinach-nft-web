import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

import {getMessages, isLocale} from '@spinach/next/utils/i18n';


export default getRequestConfig(async ({locale}) => {
  if (!locale || !isLocale(locale)) {
    notFound();
  }

  return {
    locale,
    messages: await getMessages(locale),
  };
});
