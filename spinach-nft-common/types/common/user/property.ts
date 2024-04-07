import {Type} from '@sinclair/typebox';

import {commissionPercentLimit} from '@spinach/common/const/user';
import {VerificationStatusSchema} from '@spinach/common/types/common/status';


export const UserPropertySchemaBase = {
  status: VerificationStatusSchema,
  isAdmin: Type.Boolean(),
  isMod: Type.Boolean(),
  isAgent: Type.Boolean(),
  isSuspended: Type.Boolean(),
  commissionPercent: Type.Object(
    {
      buy: Type.Number({minimum: 0, maximum: commissionPercentLimit}),
      sell: Type.Number({minimum: 0, maximum: commissionPercentLimit}),
    },
    {additionalProperties: false},
  ),
};
