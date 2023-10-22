import {SmsVerifyOtp} from '@spinach/common/types/api/auth/verify/sms/common';


const validOtpCharacter = '0123456789' as const;

export const generateOtp = (length: number): SmsVerifyOtp => {
  let otp = '';

  for (let i = 0; i < length; i++) {
    otp += validOtpCharacter[Math.floor(Math.random() * 10)];
  }

  return otp;
};
