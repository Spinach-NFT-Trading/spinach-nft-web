import {SmsPassword, SmsUsername} from '@spinach/server/env';
import {SendSmsPayload} from '@spinach/server/types/external/sms';


type ToSmsOtpPayload = {
  otp: string,
  phone: string,
};

export const toSmsOtpPayload = ({phone, otp}: ToSmsOtpPayload): SendSmsPayload => {
  return {
    method: 'instant',
    username: SmsUsername,
    password: SmsPassword,
    smsMessage: `NFT 3.0 Market 一次性密碼 (OTP): ${otp}`,
    phone: [phone],
  };
};
