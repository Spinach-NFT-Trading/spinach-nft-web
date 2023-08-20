import {Static, Type} from '@sinclair/typebox';
import {ObjectId} from 'mongodb';

import {UsernameSchemaBase} from '@spinach/common/types/api/auth/common';
import {BankDetailsSchemaBase, UserInfoSchemaBase} from '@spinach/common/types/common/user';


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

export type UserBalanceHistoryModelRequired = {
  userId: ObjectId,
  diff: number,
  current: number,
};

export type UserBalanceHistoryModel = UserBalanceHistoryModelRequired & ({
  type: 'deposit',
  txnHash: string,
} | {
  type: 'nftBuy',
  nftTxnId: ObjectId,
} | {
  type: 'nftSell',
  nftTxnId: ObjectId,
});
