import {Static, Type} from '@sinclair/typebox';

import {PasswordSchemaBase} from '@spinach/common/types/api/auth/common';
import {UserIdVerificationDataSchema} from '@spinach/common/types/api/auth/verify/id/main';
import {UserDataSchemaBase} from '@spinach/common/types/common/user/data';
import {UserInfoSchema} from '@spinach/common/types/common/user/info';
import {generateApiFailableSchema} from '@spinach/common/utils/api/schema';


export const UserRegisterRequestSchema = Type.Object(
  {
    ...UserDataSchemaBase,
    password: PasswordSchemaBase,
    image: UserIdVerificationDataSchema,
  },
  {additionalProperties: false},
);

export type UserRegisterRequest = Static<typeof UserRegisterRequestSchema>;

export const UserRegisterResponseSchema = generateApiFailableSchema(UserInfoSchema);

export type UserRegisterResponse = Static<typeof UserRegisterResponseSchema>;
