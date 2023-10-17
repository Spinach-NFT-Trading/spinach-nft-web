import {Static, Type} from '@sinclair/typebox';

import {SmsVerifyOtpSchemaBase} from '@spinach/common/types/api/auth/verify/sms/common';
import {SmsVerifyInitialResponseDataSchema} from '@spinach/common/types/api/auth/verify/sms/initial';
import {generateApiFailableSchema} from '@spinach/common/utils/api/schema';


export const SmsVerifyFinalizeRequestSchema = Type.Object(
  {
    key: Type.String(),
    otp: SmsVerifyOtpSchemaBase,
  },
  {additionalProperties: false},
);

export type SmsVerifyFinalizeRequest = Static<typeof SmsVerifyFinalizeRequestSchema>;

export const SmsVerifyFinalizeResponseDataSchema = Type.Object(
  {
    key: Type.String(),
  },
  {additionalProperties: false},
);

export type SmsVerifyFinalizeResponseData = Static<typeof SmsVerifyInitialResponseDataSchema>;

export const SmsVerifyFinalizeResponseSchema = generateApiFailableSchema(
  SmsVerifyFinalizeResponseDataSchema,
);

export type SmsVerifyFinalizeResponse = Static<typeof SmsVerifyFinalizeResponseSchema>;
