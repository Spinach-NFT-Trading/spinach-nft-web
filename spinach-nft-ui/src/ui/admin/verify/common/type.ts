export type AdminVerifyDataRowCommonProps<TData> = {
  isTitle: true,
  data?: never,
} | {
  isTitle?: never,
  data: TData,
};

export type AdminVerifyInput<TKey extends string> = {
  key: TKey,
  value: string,
};

export type AdminVerifyFilterData<TKey extends string> = {[basis in TKey]: string};
