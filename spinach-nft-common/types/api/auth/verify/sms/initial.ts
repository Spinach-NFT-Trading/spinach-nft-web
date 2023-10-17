import {Static, Type} from '@sinclair/typebox';

import {phonePattern} from '@spinach/common/const/auth';
import {generateApiFailableSchema} from '@spinach/common/utils/api/schema';


export const SmsVerifyInitialRequestSchema = Type.Object(
  {
    phone: Type.String({pattern: phonePattern}),
  },
  {additionalProperties: false},
);

export type SmsVerifyInitialRequest = Static<typeof SmsVerifyInitialRequestSchema>;

export const SmsVerifyInitialResponseDataSchema = Type.Object({
  key: Type.String(),
});

export type SmsVerifyInitialResponseData = Static<typeof SmsVerifyInitialResponseDataSchema>;

export const SmsVerifyInitialResponseSchema = generateApiFailableSchema(
  SmsVerifyInitialResponseDataSchema,
);

export type SmsVerifyInitialResponse = Static<typeof SmsVerifyInitialResponseSchema>;
