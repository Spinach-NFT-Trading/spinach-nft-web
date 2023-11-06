import {Static, Type} from '@sinclair/typebox';

import {PasswordSchemaBase} from '@spinach/common/types/api/auth/common';
import {AccountIdVerificationTypeSchema} from '@spinach/common/types/api/profile/id';
import {BinaryDataSchema} from '@spinach/common/types/common/binary';
import {UserInfoSchema, UserInfoSchemaBase} from '@spinach/common/types/common/user';
import {generateApiFailableSchema} from '@spinach/common/utils/api/schema';


export const UserRegisterRequestSchema = Type.Object(
  {
    ...UserInfoSchemaBase,
    phoneVerificationKey: Type.String(),
    password: PasswordSchemaBase,
    image: Type.Record(
      AccountIdVerificationTypeSchema,
      Type.Union([BinaryDataSchema, Type.Null()]),
    ),
  },
  {additionalProperties: false},
);

export type UserRegisterRequest = Static<typeof UserRegisterRequestSchema>;

export const UserRegisterResponseSchema = generateApiFailableSchema(UserInfoSchema);

export type UserRegisterResponse = Static<typeof UserRegisterResponseSchema>;
