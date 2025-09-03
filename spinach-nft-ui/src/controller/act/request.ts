import {ApiErrorCode} from '@spinach/common/types/api/error';
import {ObjectId} from 'mongodb';

import {setGlobalConfig} from '@spinach/next/controller/global/config';
import {recordGoldPendingTxn} from '@spinach/next/controller/gold/pending';
import {markGoldPurchaseTwBankRecord, recordGoldPurchaseTwBankTxn} from '@spinach/next/controller/gold/twBank';
import {buyNft} from '@spinach/next/controller/nft/action/buy';
import {sellNft} from '@spinach/next/controller/nft/action/sell';
import {deleteNftExchangeToken, updateNftExchangeToken} from '@spinach/next/controller/nft/request/token';
import {markBankDetailsVerified, uploadBankDetails} from '@spinach/next/controller/user/bankDetails';
import {uploadIdVerification} from '@spinach/next/controller/user/info';
import {markUserStatus} from '@spinach/next/controller/user/status';
import {markUserAgent} from '@spinach/next/controller/user/update/agent';
import {updateUserCommissionPercent} from '@spinach/next/controller/user/update/commissionPercent';
import {markUserSuspended} from '@spinach/next/controller/user/update/suspended';
import {isSuspended} from '@spinach/next/controller/utils';
import {UserDataRequestOpts} from '@spinach/next/types/userData/upload';


type HandleUserRequestOpts = {
  accountId: string,
  options: UserDataRequestOpts,
};

export const handleUserRequest = async ({
  accountId,
  options,
}: HandleUserRequestOpts): Promise<ApiErrorCode | null> => {
  const {type, data} = options;

  if (await isSuspended(accountId)) {
    return 'accountDisabled';
  }

  if (type === 'nft.buy') {
    return buyNft({buyer: new ObjectId(accountId), nftId: new ObjectId(data.nftId)});
  }

  if (type === 'nft.sell') {
    return sellNft({seller: new ObjectId(accountId), matchRequestUuid: data.matchRequestUuid});
  }

  if (type === 'exchange.gold.crypto') {
    return recordGoldPendingTxn({account: accountId});
  }

  if (type === 'exchange.gold.twBank') {
    return recordGoldPurchaseTwBankTxn({userId: accountId, request: data});
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

  if (type === 'admin.commission.update.agent') {
    const {targetId, commissionPercent} = data;

    return updateUserCommissionPercent({
      executorUserId: accountId,
      key: 'commissionPercentAgent',
      targetId,
      commissionPercent,
    });
  }

  if (type === 'admin.commission.update.member') {
    const {targetId, commissionPercent} = data;

    return updateUserCommissionPercent({
      executorUserId: accountId,
      key: 'commissionPercentMember',
      targetId,
      commissionPercent,
    });
  }

  if (type === 'admin.token.update') {
    await updateNftExchangeToken({
      executorUserId: accountId,
      tokenData: data,
    });
    return null;
  }

  if (type === 'admin.token.delete') {
    await deleteNftExchangeToken({
      executorUserId: accountId,
      token: data.token,
    });
    return null;
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

  if (type === 'admin.config.update') {
    return setGlobalConfig({
      executorUserId: accountId,
      config: data,
    });
  }

  console.error(`Unhandled user request type [${type satisfies never}]`);
  return null;
};
