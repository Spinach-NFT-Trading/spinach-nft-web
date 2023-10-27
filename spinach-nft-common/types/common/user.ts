import {Static, Type} from '@sinclair/typebox';

import {bankAccountPattern, bankCodePattern, lineIdPattern, namePattern} from '@spinach/common/const/auth';
import {UsernameSchemaBase} from '@spinach/common/types/api/auth/common';
import {IsoDateStringSchema} from '@spinach/common/types/common/date';
import {WalletSchemaBase} from '@spinach/common/types/common/wallet';


export const BankDetailsSchemaBase = {
  code: Type.String({pattern: bankCodePattern}),
  account: Type.String({pattern: bankAccountPattern}),
};

export const BankDetailsSchema = Type.Object(
  BankDetailsSchemaBase,
  {additionalProperties: false},
);

export type BankDetails = Static<typeof BankDetailsSchema>;

export const UserBankDetailsSchema = Type.Object(
  {
    ...BankDetailsSchemaBase,
    verified: Type.Boolean(),
  },
  {additionalProperties: false},
);

export type UserBankDetails = Static<typeof UserBankDetailsSchema>;

export const UserInfoSchemaBase = {
  username: UsernameSchemaBase,
  name: Type.String({pattern: namePattern}),
  email: Type.String({format: 'email'}),
  birthday: IsoDateStringSchema,
  lineId: Type.String({pattern: lineIdPattern}),
  wallet: WalletSchemaBase,
};

export const UserInfoSchema = Type.Object(
  {
    id: Type.String(),
    ...UserInfoSchemaBase,
    bankDetails: Type.Array(BankDetailsSchema, {uniqueItems: true}),
  },
  {additionalProperties: false},
);

export type UserInfo = Static<typeof UserInfoSchema>;
