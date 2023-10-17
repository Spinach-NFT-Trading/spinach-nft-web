import {
  smsVerifyFinalizedCollection,
  smsVerifyInitialCollection,
} from '@spinach/common/controller/collections/verify/sms';
import {SmsVerifyOtp} from '@spinach/common/types/api/auth/verify/sms/common';
import {SmsVerifyInitialResponseData} from '@spinach/common/types/api/auth/verify/sms/initial';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {SmsVerifyInitialData} from '@spinach/common/types/data/verify/sms';
import {generateSecretKey} from '@spinach/common/utils/secret';

import {smsVerificationExpiry} from '@spinach/server/controller/auth/verify/sms/const';


type RecordSmsVerifyInitialOpts = {
  phone: string,
  otp: SmsVerifyOtp,
};

export const recordSmsVerifyInitialize = async ({
  phone,
  otp,
}: RecordSmsVerifyInitialOpts): Promise<SmsVerifyInitialResponseData | ApiErrorCode> => {
  if (await smsVerifyInitialCollection.findOne({phone})) {
    return 'smsAlreadyRequested';
  }

  if (await smsVerifyFinalizedCollection.findOne({phone})) {
    return 'smsPhoneUsed';
  }

  const key = generateSecretKey();
  await smsVerifyInitialCollection.insertOne({
    key,
    phone,
    otp,
    expiry: new Date(new Date().getTime() + smsVerificationExpiry * 1000),
  });

  return {key};
};

type PopPendingSmsVerificationOpts = {
  key: string,
  otp: SmsVerifyOtp,
};

export const popPendingSmsVerification = async ({
  key,
  otp,
}: PopPendingSmsVerificationOpts): Promise<SmsVerifyInitialData | ApiErrorCode> => {
  const data = await smsVerifyInitialCollection.findOneAndDelete({
    key,
    otp,
  });

  if (!data?.value) {
    return 'smsCodeInvalid';
  }

  return data.value;
};
