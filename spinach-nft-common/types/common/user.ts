import {Static, Type} from '@sinclair/typebox';

import {UsernameSchemaBase} from '@/types/api/auth/common';


export const BankDetailsSchemaBase = {
  code: Type.String({pattern: '[0-9]{3}'}),
  // TODO: Bank account format?
  account: Type.String({pattern: '[0-9]'}),
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
  name: Type.String({pattern: '\\w+'}),
  phone: Type.String({pattern: '[0-9]+'}),
  email: Type.String({format: 'email'}),
  lineId: Type.String({pattern: '[a-zA-Z0-9]+'}),
  // TODO: Crypto wallet format?
  wallet: Type.String({pattern: '[0-9a-f]+'}),
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
