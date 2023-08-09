import {Static, Type} from '@sinclair/typebox';

import {PasswordSchemaBase} from '@/types/api/auth/common';
import {UserInfoSchema, UserInfoSchemaBase} from '@/types/common/user';
import {BoolFalseSchema, BoolTrueSchema} from '@/types/typebox';


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
      error: Type.String({minLength: 1}),
    },
    {additionalProperties: false},
  ),
]);

export type UserRegisterResponse = Static<typeof UserRegisterResponseSchema>;
