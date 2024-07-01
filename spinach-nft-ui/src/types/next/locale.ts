export const locales = [
  'zh-Hant',
  'zh-Hans',
  'en',
  'ja',
  'vi',
  'th',
] as const;

export type Locale = typeof locales[number];
