import {Static, Type} from '@sinclair/typebox';

import {bankAccountPattern} from '@spinach/common/const/auth';
import {generateApiFailableSchema} from '@spinach/common/utils/api/schema';


export const NftSellRequestSchema = Type.Object(
  {
    bankAccount: Type.String({
      pattern: bankAccountPattern,
      description: '用於接收款項的銀行帳戶。',
    }),
    amount: Type.Integer({
      exclusiveMinimum: 0,
      description: 'NFT 售價。必須為正整數。',
    }),
  },
  {additionalProperties: false},
);

export type NftSellRequest = Static<typeof NftSellRequestSchema>;

export const NftSellResultSchema = Type.Object(
  {
    limitedNftId: Type.String({description: '已建立的限時 NFT 的唯一識別碼。'}),
  },
  {additionalProperties: false},
);

export type NftSellResult = Static<typeof NftSellResultSchema>;

export const NftSellResponseSchema = generateApiFailableSchema(NftSellResultSchema);

export type NftSellResponse = Static<typeof NftSellResponseSchema>;

