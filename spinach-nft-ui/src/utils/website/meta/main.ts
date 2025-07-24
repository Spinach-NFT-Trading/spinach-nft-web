import {I18nMessageKeysOfNamespace} from '@spinach/next/types/i18n';
import {GenerateMetadata, GeneratePageMetaValues} from '@spinach/next/types/next/metadata';
import {generateSiteMetadata} from '@spinach/next/utils/website/meta/metadata';


export type GeneratePageMetaOpts = {
  key: I18nMessageKeysOfNamespace<'UI.Metadata'>,
  values?: GeneratePageMetaValues,
};

export const generatePageMeta = ({
  key,
  values,
}: GeneratePageMetaOpts): GenerateMetadata => async ({params}) => {
  const {locale} = params;
  const {
    name,
    nameTemplate,
    description,
    metadataBase,
    keywords,
    languages,
  } = await generateSiteMetadata({key, values, locale});

  return {
    metadataBase,
    alternates: {
      canonical: '/',
      languages,
    },
    applicationName: name,
    title: name,
    description,
    authors: [],
    creator: 'Spinach-NFT',
    appleWebApp: {
      capable: true,
      title: name,
      statusBarStyle: 'black',
      startupImage: '/icons/icon.png',
    },
    twitter: {
      card: 'summary',
      title: {
        default: name,
        template: nameTemplate,
      },
      description,
    },
    generator: 'Next.js',
    manifest: '/manifest.webmanifest',
    keywords,
    icons: {
      icon: [
        {
          url: '/icons/icon.png',
          sizes: '256x256',
          type: 'image/png',
        },
      ],
      shortcut: '/favicon.ico',
      apple: [
        {
          url: '/icons/icon.png',
          sizes: '180x180',
          type: 'image/png',
        },
      ],
    },
    formatDetection: {
      url: true,
      date: true,
      email: true,
      address: false,
      telephone: false,
    },
    other: {
      'mobile-web-app-capable': 'yes',
      'msapplication-TileColor': '#97a8ff',
      'msapplication-tap-highlight': 'no',
      'msapplication-TileImage': '/icons/icon.png',
    },
  };
};

type generatePageMetaFromStringOpts = {
  t: (key: I18nMessageKeysOfNamespace<'UI.Metadata'>) => string,
  title: string,
};

export const generatePageMetaFromString = ({
  t,
  title,
}: generatePageMetaFromStringOpts) => {
  return {
    title: `${title} | ${t('Site.Name')}`,
    description: t('Site.Description'),
  };
};
