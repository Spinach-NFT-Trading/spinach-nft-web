import {SmsVerifyOtp} from '@spinach/common/types/api/auth/verify/sms/common';


export type SmsVerifyCommonData = {
  key: string,
  phone: string,
  expiry: Date,
};

export type SmsVerifyInitialData = SmsVerifyCommonData & {
  otp: SmsVerifyOtp,
};

export type SmsVerifyFinalizedData = SmsVerifyCommonData;
