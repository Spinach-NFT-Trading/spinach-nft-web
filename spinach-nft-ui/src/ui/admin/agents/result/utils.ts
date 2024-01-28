import {Nullable} from '@spinach/common/types/common/typing';
import {toSum} from '@spinach/common/utils/array';
import {isNotNullish} from '@spinach/common/utils/type';

import {UserBalanceActivity} from '@spinach/next/types/mongo/balance';


type GetSumOfBalanceActivityOpts = {
  activities: UserBalanceActivity[],
  getValue: (activity: UserBalanceActivity) => Nullable<number>,
};

export const getSumOfBalanceActivity = ({activities, getValue}: GetSumOfBalanceActivityOpts): number => (
  toSum(activities.map(getValue).filter(isNotNullish))
);
