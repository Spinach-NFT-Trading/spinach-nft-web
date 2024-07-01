import {projectName} from '@spinach/common/const/project';

import {defaultLocale} from '@spinach/next/const/locale';
import {Locale, locales} from '@spinach/next/types/next/locale';
import {SiteMetadata} from '@spinach/next/types/next/manifest';
import {getI18nTranslator} from '@spinach/next/utils/i18n';
import {GeneratePageMetaOpts} from '@spinach/next/utils/website/meta/main';


type GenerateSiteMetadataOpts = {
  key?: GeneratePageMetaOpts['key'],
  values?: GeneratePageMetaOpts['values'],
  locale?: Locale,
};

export const generateSiteMetadata = ({
  key = 'Home.Title',
  values,
  locale = defaultLocale,
}: GenerateSiteMetadataOpts): Promise<SiteMetadata> => getI18nTranslator({
  locale,
  namespace: 'UI.Metadata',
}).then((t) => ({
  name: `${t(key, values)} | ${t('Site.Name')}`,
  nameTemplate: '%s - PWA',
  metadataBase: process.env.NEXT_PUBLIC_HOST ?
    new URL(process.env.NEXT_PUBLIC_HOST) :
    undefined,
  shortName: projectName,
  description: t('Site.Description'),
  keywords: [
    'NFT',
  ],
  shortcuts: [
    {
      name: t('Home.Title'),
      url: '/',
    },
  ],
  languages: locales.reduce((obj, _locale) => ({
    ...obj,
    [_locale]: `/${_locale}`,
  }), {}) as SiteMetadata['languages'],
}));
