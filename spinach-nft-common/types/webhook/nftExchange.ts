import {Static, Type} from '@sinclair/typebox';

import {UuidSchemaBase} from '@spinach/common/types/common/uuid';
import {BankDetailsSchema} from '@spinach/common/types/data/user/bank';


export const NftExchangeRequestWebhookPayloadSchema = Type.Object(
  {
    requestUuid: {
      ...UuidSchemaBase,
      description: 'NFT 購買請求的唯一識別碼。',
    },
    amount: Type.Integer({
      exclusiveMinimum: 0,
      description: '購買請求匹配到的 NFT 售價。必為正整數。',
    }),
    bankDetails: Type.Array(
      BankDetailsSchema,
      {description: 'NFT 持有人的銀行帳戶資訊清單。'},
    ),
  },
  {additionalProperties: false},
);

export type NftExchangeRequestWebhookPayload = Static<typeof NftExchangeRequestWebhookPayloadSchema>;
