import {Static, Type} from '@sinclair/typebox';

import {bankAccountPattern, bankCodePattern} from '@spinach/common/const/auth';
import {UserIdSchemaBase} from '@spinach/common/types/api/auth/common';
import {VerificationStatusSchema} from '@spinach/common/types/common/status';
import {UuidSchemaBase} from '@spinach/common/types/common/uuid';


export const BankPublicDetailsSchemaBase = {
  code: Type.String({pattern: bankCodePattern}),
  account: Type.String({pattern: bankAccountPattern}),
};

export const BankPublicDetailsSchema = Type.Object(
  BankPublicDetailsSchemaBase,
  {additionalProperties: false},
);

export type BankPublicDetails = Static<typeof BankPublicDetailsSchema>;

export const BankDetailsSchemaBase = {
  code: Type.String({pattern: bankCodePattern}),
  account: Type.String({pattern: bankAccountPattern}),
  status: VerificationStatusSchema,
  uuid: UuidSchemaBase,
  imageUploadId: UuidSchemaBase,
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
