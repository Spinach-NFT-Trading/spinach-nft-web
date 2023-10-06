import {SendSmsPayload} from '@spinach/next/types/api/sms';


type ToSmsOtpPayload = {
  otp: string,
  phone: string,
};

export const toSmsOtpPayload = ({phone, otp}: ToSmsOtpPayload): SendSmsPayload => {
  return {
    method: 'instant',
    username: process.env.EXTERNAL_SMS_USERNAME,
    password: process.env.EXTERNAL_SMS_PASSWORD,
    smsMessage: `NFT 3.0 Market 一次性密碼 (OTP): ${otp}`,
    phone: [phone],
  };
};
