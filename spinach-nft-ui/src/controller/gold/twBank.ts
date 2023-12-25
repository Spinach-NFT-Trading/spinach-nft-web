import {azureContainer} from '@spinach/common/controller/blob/const';
import {uploadBlob} from '@spinach/common/controller/blob/upload';
import {txnGoldPurchaseTwBankRecordCollection} from '@spinach/common/controller/collections/gold';
import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {Mongo} from '@spinach/common/controller/const';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {GoldPurchaseTwBankRecordClient} from '@spinach/common/types/data/gold/purchase';
import {ObjectId} from 'mongodb';
import {v4} from 'uuid';

import {getDataAsArray} from '@spinach/next/controller/common';
import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {throwIfNotAdmin} from '@spinach/next/controller/utils';
import {RequestOfGoldExchangeTwBank} from '@spinach/next/types/userData/upload';


export const getUnverifiedGoldPurchaseTwBankRecordClient = async ({
  executorUserId,
}: ControllerRequireUserIdOpts): Promise<GoldPurchaseTwBankRecordClient[]> => {
  await throwIfNotAdmin(executorUserId);

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

type MarkGoldPurchaseTwBankRecordVerifiedOpts = ControllerRequireUserIdOpts & {
  uuid: string,
};

export const markGoldPurchaseTwBankRecordVerified = async ({
  executorUserId,
  uuid,
}: MarkGoldPurchaseTwBankRecordVerifiedOpts): Promise<ApiErrorCode | null> => {
  await throwIfNotAdmin(executorUserId);

  const result = await txnGoldPurchaseTwBankRecordCollection.updateOne(
    {uuid},
    {$set: {status: 'verified'}},
  );

  return result.modifiedCount > 0 ? null : 'goldTwBankTxnNotFound';
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
    console.error(e);
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
    await session.abortTransaction();
    await session.endSession();
    return 'goldTwBankTxnRecordFailed';
  }

  await session.commitTransaction();
  await session.endSession();
  return null;
};
