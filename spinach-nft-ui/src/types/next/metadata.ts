import {Metadata} from 'next';

import {CommonPageParams} from '@spinach/next/types/next/page';


export type GenerateMetadataParams = CommonPageParams;

export type GenerateMetadataOpts<P extends GenerateMetadataParams> = {
  params: Promise<P>,
};

export type GenerateMetadata<
  T extends GenerateMetadataParams = GenerateMetadataParams,
> = (
  opts: GenerateMetadataOpts<T>,
) => Promise<Metadata>;

export type GeneratePageMetaValues = {
  id: string,
};
