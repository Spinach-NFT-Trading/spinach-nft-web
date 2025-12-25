import {getRequestConfig} from 'next-intl/server';

import {defaultLocale} from '@spinach/next/const/locale';
import {getMessages, isLocale} from '@spinach/next/utils/i18n';


export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  if (!locale || !isLocale(locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: await getMessages(locale),
  };
});
