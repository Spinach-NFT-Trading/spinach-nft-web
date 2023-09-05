export type NextPageProps<TParams> = {
  params: TParams,
  searchParams?: {[key: string]: string | string[] | undefined},
};
