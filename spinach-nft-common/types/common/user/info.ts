import {Static, Type} from '@sinclair/typebox';

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
  agentId: string | null,
  members: UserInfo[],
};
