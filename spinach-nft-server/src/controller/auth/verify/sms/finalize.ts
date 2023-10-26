import {smsVerifyFinalizedCollection} from '@spinach/common/controller/collections/verify/sms';
import {SmsVerifyOtp} from '@spinach/common/types/api/auth/verify/sms/common';
import {SmsVerifyFinalizeResponseData} from '@spinach/common/types/api/auth/verify/sms/finalize';
import {ApiErrorCode, isApiError} from '@spinach/common/types/api/error';
import {generateSecretKey} from '@spinach/common/utils/secret';

import {smsVerifiedExpiry} from '@spinach/server/controller/auth/verify/sms/const';
import {popPendingSmsVerification} from '@spinach/server/controller/auth/verify/sms/initial';


type RecordSmsVerifyFinalizedOpts = {
  key: string,
  otp: SmsVerifyOtp,
};

export const recordSmsVerifyFinalized = async ({
  key,
  otp,
}: RecordSmsVerifyFinalizedOpts): Promise<SmsVerifyFinalizeResponseData | ApiErrorCode> => {
  const data = await popPendingSmsVerification({key, otp});

  if (isApiError(data)) {
    return data;
  }

  const completedKey = generateSecretKey();
  const {phone} = data;
  await smsVerifyFinalizedCollection.insertOne({
    key: completedKey,
    phone,
    expiry: new Date(new Date().getTime() + smsVerifiedExpiry * 1000),
  });

  return {key: completedKey};
};

export const isSmsVerificationKeyValid = async (key: string) => {
  return !!await smsVerifyFinalizedCollection.findOne({key});
};
