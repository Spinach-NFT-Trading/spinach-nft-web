import {Static, Type} from '@sinclair/typebox';

import {bankAccountPattern, bankCodePattern} from '@spinach/common/const/auth';
import {UserIdSchemaBase} from '@spinach/common/types/api/auth/common';
import {VerificationStatusSchema} from '@spinach/common/types/common/status';
import {UuidSchemaBase} from '@spinach/common/types/common/uuid';


export const BankDetailsSchemaBase = {
  code: Type.String({pattern: bankCodePattern}),
  account: Type.String({pattern: bankAccountPattern}),
  status: VerificationStatusSchema,
  uuid: UuidSchemaBase,
};

export const BankDetailsSchema = Type.Object(
  BankDetailsSchemaBase,
  {additionalProperties: false},
);

export type BankDetails = Static<typeof BankDetailsSchema>;

export type BankDetailsMap = {[uuid in string]?: BankDetails};

export const UserBankDetailsSchema = Type.Object(
  {
    ...BankDetailsSchemaBase,
    userId: UserIdSchemaBase,
  },
  {additionalProperties: false},
);

export type UserBankDetails = Static<typeof UserBankDetailsSchema>;
