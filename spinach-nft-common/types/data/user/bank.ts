import {Static, Type} from '@sinclair/typebox';

import {bankAccountPattern, bankCodePattern} from '@spinach/common/const/auth';
import {uuidPattern} from '@spinach/common/const/common';
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

export type BankDetails = Static<typeof BankDetailsSchema>;

export const UserBankDetailsSchema = Type.Object(
  {
    ...BankDetailsSchemaBase,
    userId: UserIdSchemaBase,
    uuid: Type.String({pattern: uuidPattern}),
  },
  {additionalProperties: false},
);

export type UserBankDetails = Static<typeof UserBankDetailsSchema>;
