import {defaultLocale} from '@spinach/next/const/locale';
import {Manifest} from '@spinach/next/types/next/manifest';
import {generateSiteMetadata} from '@spinach/next/utils/website/meta/metadata';


export const generateSiteManifest = async (): Promise<Manifest> => {
  const {
    name,
    shortName,
    metadataBase,
    description,
    shortcuts,
  } = await generateSiteMetadata({
    locale: defaultLocale,
  });

  return {
    start_url: metadataBase?.toString(),
    id: 'spinach.nft',
    name,
    short_name: shortName,
    description,
    display: 'standalone',
    orientation: 'any',
    background_color: '#2a2dd7',
    scope: '/',
    categories: ['shop'],
    shortcuts,
    display_override: ['window-controls-overlay', 'standalone', 'browser'],
    icons: [
      {
        src: '/icons/icon.png',
        sizes: '256x256',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: '/icons/icon.png',
        sizes: '256x256',
        type: 'image/png',
      },
    ],
  };
};
