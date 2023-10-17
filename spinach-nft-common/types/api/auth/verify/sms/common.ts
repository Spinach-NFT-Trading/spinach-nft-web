import {Static, Type} from '@sinclair/typebox';


export const SmsVerifyOtpSchemaBase = Type.String({});

export type SmsVerifyOtp = Static<typeof SmsVerifyOtpSchemaBase>;
