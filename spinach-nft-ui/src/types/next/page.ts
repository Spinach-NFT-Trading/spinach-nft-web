import {Locale} from '@spinach/next/types/next/locale';


export type CommonPageParams = {
  locale: Locale,
};

export type NextSearchParamsObject = {[key in string]?: string | string[]};

export type NextPageProps<
  TParams extends object = object,
  TSearchParams extends NextSearchParamsObject = NextSearchParamsObject,
> = {
  params: Promise<TParams>,
  searchParams?: Promise<TSearchParams>,
};
