import {Locale} from '@spinach/next/types/next/locale';


export type CommonPageParams = {
  locale: Locale,
};

export type NextPageProps<
  TExtraParams,
  TSearchParams extends {[key: string]: string | string[] | undefined} = {}
> = {
  params: TExtraParams & CommonPageParams,
  searchParams?: TSearchParams,
};
