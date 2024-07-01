import {Metadata, MetadataRoute} from 'next';

import {Locale} from '@spinach/next/types/next/locale';


export type Manifest = MetadataRoute.Manifest;

export type SiteMetadata = Omit<
  Manifest,
  'name' | 'start_url' | 'short_name' | 'languages'
> & Metadata & {
  name: string,
  nameTemplate: string,
  shortName: Manifest['short_name'],
  languages: {[locale in Locale]: string},
};
