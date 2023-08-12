import {Static, Type} from '@sinclair/typebox';

import {PasswordSchemaBase} from '@spinach/common/types/api/auth/common';
import {ApiErrorCodeSchema} from '@spinach/common/types/api/error';
import {UserInfoSchema, UserInfoSchemaBase} from '@spinach/common/types/common/user';
import {BoolFalseSchema, BoolTrueSchema} from '@spinach/common/types/typebox';


export const UserRegisterRequestSchema = Type.Object(
  {
    ...UserInfoSchemaBase,
    password: PasswordSchemaBase,
  },
  {additionalProperties: false},
);

export type UserRegisterRequest = Static<typeof UserRegisterRequestSchema>;

export const UserRegisterResponseSchema = Type.Union([
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
      error: ApiErrorCodeSchema,
    },
    {additionalProperties: false},
  ),
]);

export type UserRegisterResponse = Static<typeof UserRegisterResponseSchema>;
