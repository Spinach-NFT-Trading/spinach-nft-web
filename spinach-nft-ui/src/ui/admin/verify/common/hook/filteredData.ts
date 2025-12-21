import {Nullable} from '@spinach/common/types/common/typing';
import {isNotNullish} from '@spinach/common/utils/type';

import {AdminVerifyFilterData, AdminVerifyInput} from '@spinach/next/ui/admin/verify/common/type';


type UseAdminVerifyFilteredDataOpts<
  TKey extends string,
  TInput extends AdminVerifyInput<TKey>,
  TData,
> = {
  input: TInput,
  data: TData[],
  toFilterData: (data: TData) => Nullable<AdminVerifyFilterData<TKey>>,
};

export const useAdminVerifyFilteredData = <TKey extends string, TInput extends AdminVerifyInput<TKey>, TData>({
  input,
  data,
  toFilterData,
}: UseAdminVerifyFilteredDataOpts<TKey, TInput, TData>): TData[] => {
  const {key, value} = input;

  return data
    .map((entry) => {
      const filterData = toFilterData(entry);

      if (!filterData) {
        return null;
      }

      return {
        entry,
        filterData,
      };
    })
    .filter(isNotNullish)
    .filter(({filterData}) => (
      !value || filterData[key].includes(value)
    ))
    .map(({entry}) => entry);
};
