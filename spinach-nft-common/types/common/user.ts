import {Static, Type} from '@sinclair/typebox';

import {UsernameSchemaBase} from '@/types/api/auth/common';


export const BankDetailsSchemaBase = {
  code: Type.String({pattern: '[0-9]{3}'}),
  account: Type.String({pattern: '\\w+'}),
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
  // TRC20 address regex
  wallet: Type.String({pattern: 'T[A-Za-z1-9]{33}'}),
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
