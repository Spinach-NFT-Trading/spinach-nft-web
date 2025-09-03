import {Type} from '@sinclair/typebox';

import {VerificationStatusSchema} from '@spinach/common/types/common/status';
import {UserCommissionPercentSchema} from '@spinach/common/types/common/user/commission';


export const UserPropertySchemaBase = {
  status: VerificationStatusSchema,
  isAdmin: Type.Boolean(),
  isMod: Type.Boolean(),
  isAgent: Type.Boolean(),
  isSuspended: Type.Boolean(),
  commissionPercentAgent: UserCommissionPercentSchema,
  commissionPercentMember: UserCommissionPercentSchema,
};
