export type NextPageProps<TParams, TSearchParams extends {[key: string]: string | string[] | undefined} = {}> = {
  params: TParams,
  searchParams?: TSearchParams,
};
