import {ApiErrorCode} from '@spinach/common/types/api/error';
import {ObjectId} from 'mongodb';

import {recordGoldPendingTxn} from '@spinach/next/controller/gold/pending';
import {markGoldPurchaseTwBankRecord, recordGoldPurchaseTwBankTxn} from '@spinach/next/controller/gold/twBank';
import {buyNft} from '@spinach/next/controller/nft';
import {markBankDetailsVerified, uploadBankDetails} from '@spinach/next/controller/user/bankDetails';
import {markUserVerified} from '@spinach/next/controller/user/update';
import {UserDataRequestOpts} from '@spinach/next/types/userData/upload';


type HandleUserRequestOpts = {
  accountId: string,
  options: UserDataRequestOpts,
};

export const handleUserRequest = async ({accountId, options}: HandleUserRequestOpts): Promise<ApiErrorCode | null> => {
  const {type, data} = options;

  if (type === 'exchangeGold') {
    return recordGoldPendingTxn({account: accountId});
  }

  if (type === 'exchangeGoldTwBank') {
    return recordGoldPurchaseTwBankTxn({userId: accountId, request: data});
  }

  if (type === 'nftBuy') {
    return buyNft({buyer: new ObjectId(accountId), nftId: new ObjectId(data.nftId)});
  }

  if (type === 'userBankDetails') {
    return uploadBankDetails({userId: accountId, request: data});
  }

  if (type === 'adminVerifyAccount') {
    return markUserVerified({executorUserId: accountId, targetId: data.targetId});
  }

  if (type === 'adminVerifyBankDetails') {
    return markBankDetailsVerified({
      executorUserId: accountId,
      uuid: data.targetUuid,
      pass: data.pass,
    });
  }

  if (type === 'adminVerifyGoldTxnTwBank') {
    return markGoldPurchaseTwBankRecord({
      executorUserId: accountId,
      uuid: data.targetUuid,
      pass: data.pass,
    });
  }

  console.error(`Unhandled user request type [${type satisfies never}]`);
  return null;
};
