import {Static, Type} from '@sinclair/typebox';

import {PasswordSchemaBase} from '@spinach/common/types/api/auth/common';
import {AccountIdVerificationTypeSchema} from '@spinach/common/types/api/profile/id';
import {UserDataSchemaBase} from '@spinach/common/types/common/user/data';
import {generateApiFailableSchema} from '@spinach/common/utils/api/schema';


export const UserIdVerificationUploadIdMapSchema = Type.Partial(Type.Record(
  AccountIdVerificationTypeSchema,
  Type.Union([Type.String(), Type.Null()]),
));

export type UserIdVerificationUploadIdMap = Static<typeof UserIdVerificationUploadIdMapSchema>;

export const UserRegisterRequestSchema = Type.Object(
  {
    ...UserDataSchemaBase,
    password: PasswordSchemaBase,
    imageUploadIdMap: UserIdVerificationUploadIdMapSchema,
  },
  {additionalProperties: false},
);

export type UserRegisterRequest = Static<typeof UserRegisterRequestSchema>;

export const UserRegisterResponseSchema = generateApiFailableSchema(Type.Null());

export type UserRegisterResponse = Static<typeof UserRegisterResponseSchema>;
