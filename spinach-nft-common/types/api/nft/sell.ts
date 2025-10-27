import {Static, Type} from '@sinclair/typebox';

import {bankAccountPattern} from '@spinach/common/const/auth';
import {generateApiFailableSchema} from '@spinach/common/utils/api/schema';


export const NftSellRequestSchema = Type.Object(
  {
    bankAccount: Type.String({pattern: bankAccountPattern}),
    amount: Type.Integer({exclusiveMinimum: 0}),
  },
  {additionalProperties: false},
);

export type NftSellRequest = Static<typeof NftSellRequestSchema>;

export const NftSellResultSchema = Type.Object(
  {
    limitedNftId: Type.String(),
  },
  {additionalProperties: false},
);

export type NftSellResult = Static<typeof NftSellResultSchema>;

export const NftSellResponseSchema = generateApiFailableSchema(NftSellResultSchema);

export type NftSellResponse = Static<typeof NftSellResponseSchema>;

