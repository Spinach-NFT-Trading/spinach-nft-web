import {ApiErrorCode} from '@spinach/common/types/api/error';
import {ObjectId} from 'mongodb';

import {recordGoldPendingTxn} from '@spinach/next/controller/gold/pending';
import {markGoldPurchaseTwBankRecord, recordGoldPurchaseTwBankTxn} from '@spinach/next/controller/gold/twBank';
import {buyNft} from '@spinach/next/controller/nft/utils';
import {markBankDetailsVerified, uploadBankDetails} from '@spinach/next/controller/user/bankDetails';
import {uploadIdVerification} from '@spinach/next/controller/user/info';
import {markUserStatus} from '@spinach/next/controller/user/status';
import {markUserAgent} from '@spinach/next/controller/user/update/agent';
import {updateUserCommissionRate} from '@spinach/next/controller/user/update/commissionRate';
import {markUserSuspended} from '@spinach/next/controller/user/update/suspended';
import {isSuspended} from '@spinach/next/controller/utils';
import {UserDataRequestOpts} from '@spinach/next/types/userData/upload';


type HandleUserRequestOpts = {
  accountId: string,
  options: UserDataRequestOpts,
};

export const handleUserRequest = async ({accountId, options}: HandleUserRequestOpts): Promise<ApiErrorCode | null> => {
  const {type, data} = options;

  if (await isSuspended(accountId)) {
    return 'accountDisabled';
  }

  if (type === 'exchange.gold.crypto') {
    return recordGoldPendingTxn({account: accountId});
  }

  if (type === 'exchange.gold.twBank') {
    return recordGoldPurchaseTwBankTxn({userId: accountId, request: data});
  }

  if (type === 'nft.buy') {
    return buyNft({buyer: new ObjectId(accountId), nftId: new ObjectId(data.nftId)});
  }

  if (type === 'user.bank') {
    return uploadBankDetails({userId: accountId, request: data});
  }

  if (type === 'user.account.verify.id') {
    return uploadIdVerification({userId: accountId, request: data});
  }

  if (type === 'admin.member.mark.agent') {
    return markUserAgent({
      executorUserId: accountId,
      ...data,
    });
  }

  if (type === 'admin.member.mark.suspended') {
    return markUserSuspended({
      executorUserId: accountId,
      ...data,
    });
  }

  if (type === 'admin.member.update.commission') {
    return updateUserCommissionRate({
      executorUserId: accountId,
      ...data,
    });
  }

  if (type === 'admin.verify.account') {
    return markUserStatus({
      executorUserId: accountId,
      targetId: data.targetId,
      status: {
        original: 'unverified',
        new: options.data.pass ? 'verified' : 'rejected',
      },
    });
  }

  if (type === 'admin.verify.bank') {
    return markBankDetailsVerified({
      executorUserId: accountId,
      uuid: data.targetUuid,
      pass: data.pass,
    });
  }

  if (type === 'admin.verify.gold.twBank') {
    return markGoldPurchaseTwBankRecord({
      executorUserId: accountId,
      uuid: data.targetUuid,
      pass: data.pass,
    });
  }

  console.error(`Unhandled user request type [${type satisfies never}]`);
  return null;
};
