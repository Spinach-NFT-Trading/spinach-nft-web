import {Static, Type} from '@sinclair/typebox';

import {UserIdSchemaBase} from '@spinach/common/types/api/auth/common';
import {UuidSchemaBase} from '@spinach/common/types/common/uuid';
import {BankDetailsSchema} from '@spinach/common/types/data/user/bank';
import {generateApiFailableSchema} from '@spinach/common/utils/api/schema';


export const NftExchangeRequestSchema = Type.Object(
  {
    amount: Type.Integer({exclusiveMinimum: 0}),
  },
  {additionalProperties: false},
);

export type NftExchangeRequest = Static<typeof NftExchangeRequestSchema>;

export const NftExchangeResultOfFoundSchema = Type.Object(
  {
    result: Type.Literal('found'),
    userId: UserIdSchemaBase,
    bankDetails: Type.Array(BankDetailsSchema),
  },
  {additionalProperties: false},
);

export const NftExchangeResultOfQueuedSchema = Type.Object({
  result: Type.Literal('queued'),
  requestUuid: UuidSchemaBase,
});

export const NftExchangeResultSchema = Type.Union([
  NftExchangeResultOfFoundSchema,
  NftExchangeResultOfQueuedSchema,
]);

export type NftExchangeResult = Static<typeof NftExchangeResultSchema>;

export const NftExchangeResponseSchema = generateApiFailableSchema(NftExchangeResultSchema);

export type NftExchangeResponse = Static<typeof NftExchangeResponseSchema>;
