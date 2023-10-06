import {AccountVerifySmsCode} from '@spinach/next/types/mongo/account/verify';


const validOtpCharacter = '0123456789' as const;

export const generateOtp = (length: number): AccountVerifySmsCode => {
  let otp = '';

  for (let i = 0; i < length; i++) {
    otp += validOtpCharacter[Math.floor(Math.random() * 10)];
  }

  return otp;
};
