import {SendSmsMethod} from '@spinach/next/types/api/sms';


export const sendSmsMethodToId: {[method in SendSmsMethod]: number} = {
  instant: 1,
  scheduled: 2,
};

export const smsVerificationExpiry = 600; // 10 mins
