import {Static, Type} from '@sinclair/typebox';

import {UserCommissionPercent} from '@spinach/common/types/common/user/commission';
import {UserDataSchemaBase} from '@spinach/common/types/common/user/data';
import {UserPropertySchemaBase} from '@spinach/common/types/common/user/property';


export const UserInfoSchema = Type.Object(
  {
    id: Type.String(),
    ...UserDataSchemaBase,
    ...UserPropertySchemaBase,
  },
  {additionalProperties: false},
);

export type UserInfo = Static<typeof UserInfoSchema>;

export type UserInfoListByAgent = {
  members: UserInfo[],
} & ({
  agentId: string,
  commissionPercent: UserCommissionPercent,
} | {
  // `null` as in the member is not recruited by any agent
  agentId: null,
  commissionPercent: null,
});
