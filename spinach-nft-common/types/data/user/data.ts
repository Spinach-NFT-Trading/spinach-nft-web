import {Static, Type} from '@sinclair/typebox';

import {UserInfoSchemaBase, UserPropertySchemaBase} from '@spinach/common/types/common/user';


export const UserModelSchema = Type.Object(
  {
    ...UserInfoSchemaBase,
    ...UserPropertySchemaBase,
    passwordHash: Type.String(),
  },
  {additionalProperties: false},
);

export type UserModel = Static<typeof UserModelSchema>;
