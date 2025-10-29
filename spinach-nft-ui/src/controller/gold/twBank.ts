import {getGlobalConfig} from '@spinach/common/controller/actors/global';
import {getNewBalance} from '@spinach/common/controller/actors/user';
import {azureContainer} from '@spinach/common/controller/blob/const';
import {getImageBlob} from '@spinach/common/controller/blob/get';
import {txnGoldPurchaseTwBankRecordCollection} from '@spinach/common/controller/collections/txn';
import {userBalanceCollection, userInfoCollection} from '@spinach/common/controller/collections/user';
import {throwIfNotPrivileged} from '@spinach/common/controller/user/permission';
import {getDataAsArray} from '@spinach/common/controller/utils/common';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {GoldPurchaseTwBankRecordClient} from '@spinach/common/types/data/gold/purchase';
import {ObjectId} from 'mongodb';
import {v4} from 'uuid';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {RequestOfGoldExchangeTwBank} from '@spinach/next/types/userData/upload';


export const getUnverifiedGoldPurchaseTwBankRecordClient = async ({
  executorUserId,
}: ControllerRequireUserIdOpts): Promise<GoldPurchaseTwBankRecordClient[]> => {
  await throwIfNotPrivileged(executorUserId);

  return (await getDataAsArray(txnGoldPurchaseTwBankRecordCollection, {status: 'unverified'}))
    .map(({
      accountId,
      targetWalletId,
      ...txn
    }): GoldPurchaseTwBankRecordClient => ({
      accountId: accountId.toHexString(),
      targetWalletId: targetWalletId.toHexString(),
      ...txn,
    }));
};

type MarkGoldPurchaseTwBankRecordOpts = ControllerRequireUserIdOpts & {
  uuid: string,
  pass: boolean,
};

export const markGoldPurchaseTwBankRecord = async ({
  executorUserId,
  uuid,
  pass,
}: MarkGoldPurchaseTwBankRecordOpts): Promise<ApiErrorCode | null> => {
  await throwIfNotPrivileged(executorUserId);

  if (!pass) {
    const deletionResult = await txnGoldPurchaseTwBankRecordCollection.deleteOne({uuid});

    return deletionResult.deletedCount > 0 ? null : 'goldTwBankTxnNotFound';
  }

  const result = await txnGoldPurchaseTwBankRecordCollection.findOneAndUpdate(
    {uuid},
    {$set: {status: 'verified'}},
  );
  if (!result) {
    return 'goldTwBankTxnNotFound';
  }

  const config = await getGlobalConfig();

  // Need to call `insertOne()` twice because `getNewBalance()` fetches the latest balance
  await userBalanceCollection.insertOne({
    ...(await getNewBalance({
      accountId: result.accountId,
      diff: result.amount,
    })),
    type: 'deposit.twBank',
    uuid,
  });
  await userBalanceCollection.insertOne({
    ...(await getNewBalance({
      accountId: result.accountId,
      diff: result.amount * (config.cashbackPercent.twBank / 100),
    })),
    type: 'deposit.twBank.cashback',
    uuid,
  });

  return null;
};

type RecordGoldPurchaseTwBankTxnOpts = {
  userId: string,
  request: RequestOfGoldExchangeTwBank,
};

export const recordGoldPurchaseTwBankTxn = async ({
  userId,
  request,
}: RecordGoldPurchaseTwBankTxnOpts): Promise<ApiErrorCode | null> => {
  const {
    sourceBankDetailsUuid,
    txnProofImageId,
    targetWalletId,
    amount,
  } = request;

  const userObjectId = new ObjectId(userId);

  const userData = userInfoCollection.findOne({_id: userObjectId});
  if (!userData) {
    return 'accountNotFound';
  }

  await txnGoldPurchaseTwBankRecordCollection.insertOne({
    accountId: userObjectId,
    sourceBankDetailsUuid,
    targetWalletId: new ObjectId(targetWalletId),
    uuid: v4(),
    amount,
    status: 'unverified',
    txnProofImageId,
  });

  return null;
};

type GetGoldPurchaseTwBankVerificationImageOpts = ControllerRequireUserIdOpts & {
  uuid: string,
};

export const getGoldPurchaseTwBankVerificationImage = async ({
  executorUserId,
  uuid,
}: GetGoldPurchaseTwBankVerificationImageOpts) => {
  await throwIfNotPrivileged(executorUserId);

  const txnRecord = await txnGoldPurchaseTwBankRecordCollection.findOne({uuid});
  if (!txnRecord) {
    return null;
  }

  return getImageBlob({
    container: azureContainer.pool,
    name: txnRecord.txnProofImageId,
  });
};
