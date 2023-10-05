import {Static, Type} from '@sinclair/typebox';

import {PasswordSchemaBase, UsernameSchemaBase} from '@spinach/common/types/api/auth/common';
import {UserInfoSchema} from '@spinach/common/types/common/user';
import {generateApiFailableSchema} from '@spinach/common/utils/api/schema';


export const UserLoginRequestSchema = Type.Object(
  {
    username: UsernameSchemaBase,
    password: PasswordSchemaBase,
  },
  {additionalProperties: false},
);

export type UserLoginRequest = Static<typeof UserLoginRequestSchema>;

export const UserLoginResponseSchema = generateApiFailableSchema(UserInfoSchema);

export type UserLoginResponse = Static<typeof UserLoginResponseSchema>;
