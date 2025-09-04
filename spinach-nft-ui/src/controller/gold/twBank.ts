import {getGlobalConfig} from '@spinach/common/controller/actors/global';
import {getNewBalance} from '@spinach/common/controller/actors/user';
import {azureContainer} from '@spinach/common/controller/blob/const';
import {uploadBlob} from '@spinach/common/controller/blob/upload';
import {txnGoldPurchaseTwBankRecordCollection} from '@spinach/common/controller/collections/txn';
import {userBalanceCollection, userInfoCollection} from '@spinach/common/controller/collections/user';
import {Mongo} from '@spinach/common/controller/const';
import {throwIfNotPrivileged} from '@spinach/common/controller/user/permission';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {GoldPurchaseTwBankRecordClient} from '@spinach/common/types/data/gold/purchase';
import {ObjectId} from 'mongodb';
import {v4} from 'uuid';

import {getDataAsArray} from '@spinach/next/controller/common';
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
    txnProofImage,
    targetWalletId,
    amount,
  } = request;

  const session = Mongo.startSession();
  session.startTransaction();

  const userObjectId = new ObjectId(userId);

  const userData = userInfoCollection.findOne({_id: userObjectId});
  if (!userData) {
    return 'accountNotFound';
  }

  const uuid = v4();
  try {
    await txnGoldPurchaseTwBankRecordCollection.insertOne({
      accountId: userObjectId,
      sourceBankDetailsUuid,
      targetWalletId: new ObjectId(targetWalletId),
      uuid,
      amount,
      status: 'unverified',
    }, {session});
  } catch (e) {
    console.error('Failed to record Gold purchasing txn via TW bank (insert TxN)', e);
    await session.abortTransaction();
    await session.endSession();
  }

  try {
    await uploadBlob({
      container: azureContainer.goldPurchase.twBank,
      name: uuid,
      ...txnProofImage,
    });
  } catch (e) {
    console.error('Failed to record Gold purchasing txn via TW bank (Upload)', e);
    await session.abortTransaction();
    await session.endSession();
    return 'goldTwBankTxnRecordFailed';
  }

  await session.commitTransaction();
  await session.endSession();
  return null;
};
