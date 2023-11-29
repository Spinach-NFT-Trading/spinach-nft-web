import {Static, Type} from '@sinclair/typebox';

import {bankAccountPattern, bankCodePattern} from '@spinach/common/const/auth';
import {UserIdSchemaBase} from '@spinach/common/types/api/auth/common';


export const BankDetailsSchemaBase = {
  code: Type.String({pattern: bankCodePattern}),
  account: Type.String({pattern: bankAccountPattern}),
  verified: Type.Boolean(),
};

export const BankDetailsSchema = Type.Object(
  BankDetailsSchemaBase,
  {additionalProperties: false},
);

export const UserBankDetailsSchema = Type.Object(
  {
    ...BankDetailsSchemaBase,
    userId: UserIdSchemaBase,
  },
  {additionalProperties: false},
);

export type UserBankDetails = Static<typeof UserBankDetailsSchema>;
