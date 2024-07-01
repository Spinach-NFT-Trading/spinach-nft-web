import {LocaleLayoutProps} from '@spinach/next/types/next/layout';
import {CommonPageParams} from '@spinach/next/types/next/page';


export type GenerateStaticParamsPageParams = CommonPageParams;

export type GenerateStaticParamsFunc<T extends GenerateStaticParamsPageParams = GenerateStaticParamsPageParams> = (
  params: LocaleLayoutProps,
) => Omit<T, 'locale'>[] | Promise<Omit<T, 'locale'>[]>;
