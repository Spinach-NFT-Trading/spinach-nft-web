import {Static, Type} from '@sinclair/typebox';

import {commissionPercentLimit} from '@spinach/common/const/user';


export const UserCommissionPercentSchema = Type.Object(
  {
    buy: Type.Number({minimum: 0, maximum: commissionPercentLimit}),
    sell: Type.Number({minimum: 0, maximum: commissionPercentLimit}),
  },
  {additionalProperties: false},
);

export type UserCommissionPercent = Static<typeof UserCommissionPercentSchema>;
