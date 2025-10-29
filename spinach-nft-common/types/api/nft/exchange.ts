import {Static, Type} from '@sinclair/typebox';

import {UserIdSchemaBase} from '@spinach/common/types/api/auth/common';
import {UuidSchemaBase} from '@spinach/common/types/common/uuid';
import {BankDetailsSchema} from '@spinach/common/types/data/user/bank';
import {generateApiFailableSchema} from '@spinach/common/utils/api/schema';


export const NftExchangeRequestSchema = Type.Object(
  {
    amount: Type.Integer({
      exclusiveMinimum: 0,
      description:
        'NFT 購買請求金額。平台會優先找尋符合這個金額的 NFT。如果找不到符合這個金額的 NFT，則會改找金額最接近的 NFT。\n' +
        '這個數字必須為正整數。',
    }),
  },
  {additionalProperties: false},
);

export type NftExchangeRequest = Static<typeof NftExchangeRequestSchema>;

export const NftExchangeResultOfFoundSchema = Type.Object(
  {
    result: Type.Literal(
      'found',
      {description: '表示找到配對的交換請求。'},
    ),
    userId: {
      ...UserIdSchemaBase,
      description: '配對到的交換對象使用者 ID。',
    },
    bankDetails: Type.Array(
      BankDetailsSchema,
      {description: '配對到的交換對象銀行帳戶資訊清單。'},
    ),
  },
  {additionalProperties: false},
);

export const NftExchangeResultOfQueuedSchema = Type.Object({
  result: Type.Literal(
    'queued',
    {description: '表示交換請求已排入佇列等待後續配對。'},
  ),
  requestUuid: {
    ...UuidSchemaBase,
    description: '已排入佇列的交換請求的唯一識別碼。',
  },
});

export const NftExchangeResultSchema = Type.Union([
  NftExchangeResultOfFoundSchema,
  NftExchangeResultOfQueuedSchema,
]);

export type NftExchangeResult = Static<typeof NftExchangeResultSchema>;

export const NftExchangeResponseSchema = generateApiFailableSchema(NftExchangeResultSchema);

export type NftExchangeResponse = Static<typeof NftExchangeResponseSchema>;
