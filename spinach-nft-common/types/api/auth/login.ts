import {Static, Type} from '@sinclair/typebox';

import {PasswordSchemaBase, UsernameSchemaBase} from '@spinach/common/types/api/auth/common';
import {AuthErrorCodeSchema} from '@spinach/common/types/api/auth/error';
import {UserInfoSchema} from '@spinach/common/types/common/user';
import {BoolFalseSchema, BoolTrueSchema} from '@spinach/common/types/typebox';


export const UserLoginRequestSchema = Type.Object(
  {
    username: UsernameSchemaBase,
    password: PasswordSchemaBase,
  },
  {additionalProperties: false},
);

export type UserLoginRequest = Static<typeof UserLoginRequestSchema>;

export const UserLoginResponseSchema = Type.Union([
  Type.Object(
    {
      success: BoolTrueSchema,
      data: UserInfoSchema,
    },
    {additionalProperties: false},
  ),
  Type.Object(
    {
      success: BoolFalseSchema,
      error: AuthErrorCodeSchema,
    },
    {additionalProperties: false},
  ),
]);

export type UserLoginResponse = Static<typeof UserLoginResponseSchema>;
