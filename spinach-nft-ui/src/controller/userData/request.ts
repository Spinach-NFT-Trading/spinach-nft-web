import {phonePattern} from '@spinach/common/const/auth';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {ObjectId} from 'mongodb';

import {recordSmsVerificationComplete} from '@spinach/next/controller/account/verify/sms/complete';
import {recordSmsVerificationPending} from '@spinach/next/controller/account/verify/sms/pending';
import {recordPendingTxN} from '@spinach/next/controller/gold';
import {buyNft} from '@spinach/next/controller/nft';
import {UserDataRequestOpts} from '@spinach/next/types/userData/upload';
import {toSmsOtpPayload} from '@spinach/next/utils/api/sms/payload';
import {sendSms} from '@spinach/next/utils/api/sms/send';


type HandleUserRequestOpts = {
  accountId: string,
  options: UserDataRequestOpts,
};

export const handleUserRequest = async ({accountId, options}: HandleUserRequestOpts): Promise<ApiErrorCode | null> => {
  const {type, data} = options;

  if (type === 'exchangeGold') {
    return recordPendingTxN({account: accountId});
  }

  if (type === 'nftBuy') {
    return buyNft({buyer: new ObjectId(accountId), nftId: new ObjectId(data.nftId)});
  }

  if (type === 'verify.sms.phone') {
    const {phone} = data;

    if (!new RegExp(phonePattern).test(phone)) {
      return 'smsPhoneInvalid';
    }

    const otp = await recordSmsVerificationPending({userId: new ObjectId(accountId), phone});

    const {stats} = await sendSms({
      data: toSmsOtpPayload({
        phone,
        otp,
      }),
    });

    if (!stats) {
      return 'smsSendFailed';
    }

    return null;
  }

  if (type === 'verify.sms.code') {
    const {code} = data;

    return recordSmsVerificationComplete({userId: new ObjectId(accountId), code});
  }

  console.error(`Unhandled user request type [${type satisfies never}]`);
  return null;
};
