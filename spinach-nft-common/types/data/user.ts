import {Static, Type} from '@sinclair/typebox';

import {UsernameSchemaBase} from '@/types/api/auth/common';
import {BankDetailsSchemaBase, UserInfoSchemaBase} from '@/types/common/user';


export const UserModelSchema = Type.Object(
  {
    ...UserInfoSchemaBase,
    passwordHash: Type.String(),
  },
  {additionalProperties: false},
);

export type UserModel = Static<typeof UserModelSchema>;

export const UserBankDetailModelSchema = Type.Object(
  {
    ...BankDetailsSchemaBase,
    username: UsernameSchemaBase,
  },
  {additionalProperties: false},
);

export type UserBankDetailModel = Static<typeof UserBankDetailModelSchema>;
