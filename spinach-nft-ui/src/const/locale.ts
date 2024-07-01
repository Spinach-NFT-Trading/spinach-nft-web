import {Locale} from '@spinach/next/types/next/locale';


export const localeName: {[locale in Locale]: string} = {
  'zh-Hant': '繁體中文',
  'zh-Hans': '简体中文',
  'en': 'English',
  'ja': '日本語',
  'vi': 'Tiếng Việt',
  'th': 'ไทย',
} as const;

export const defaultLocale: Locale = 'zh-Hant';
