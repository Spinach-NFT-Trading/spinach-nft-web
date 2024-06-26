import {Static, Type} from '@sinclair/typebox';

import {UserDataSchemaBase} from '@spinach/common/types/common/user/data';
import {UserPropertySchemaBase} from '@spinach/common/types/common/user/property';


export const UserModelSchema = Type.Object(
  {
    ...UserDataSchemaBase,
    ...UserPropertySchemaBase,
    passwordHash: Type.String(),
  },
  {additionalProperties: false},
);

export type UserModel = Static<typeof UserModelSchema>;
