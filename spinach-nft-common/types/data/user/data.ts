import {Static, Type} from '@sinclair/typebox';

import {UserDataSchemaBase, UserPropertySchemaBase} from '@spinach/common/types/common/user';


export const UserModelSchema = Type.Object(
  {
    ...UserDataSchemaBase,
    ...UserPropertySchemaBase,
    passwordHash: Type.String(),
  },
  {additionalProperties: false},
);

export type UserModel = Static<typeof UserModelSchema>;
