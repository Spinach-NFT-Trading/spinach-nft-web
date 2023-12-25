import {azureContainer} from '@spinach/common/controller/blob/const';
import {uploadBlob} from '@spinach/common/controller/blob/upload';
import {txnTwBankRecordCollection, txnWalletCollection} from '@spinach/common/controller/collections/gold';
import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {Mongo} from '@spinach/common/controller/const';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {GoldExchangeChannel} from '@spinach/common/types/data/gold/common';
import {GoldWalletClient} from '@spinach/common/types/data/gold/wallet';
import {ObjectId} from 'mongodb';
import {v4} from 'uuid';

import {RequestOfGoldExchangeTwBank} from '@spinach/next/types/userData/upload';


export const getDepositWallet = async (channel: GoldExchangeChannel): Promise<GoldWalletClient | null> => {
  const wallet = await txnWalletCollection.findOne({channel});
  if (!wallet) {
    return null;
  }

  const {_id, ...walletContent} = wallet;

  return {
    ...walletContent,
    id: wallet._id.toHexString(),
  };
};

type RecordGoldPendingTxnOpts = {
  account: string,
};

export const recordPendingTxN = async ({
  account,
}: RecordGoldPendingTxnOpts): Promise<ApiErrorCode | null> => {
  const accountId = new ObjectId(account);

  const userInfo = await userInfoCollection.findOne({_id: accountId}, {projection: {_id: false}});

  if (!userInfo) {
    return 'accountNotFound';
  }

  return null;
};

type RecordTwBankTxnOpts = {
  userId: string,
  request: RequestOfGoldExchangeTwBank,
};

export const recordTwBankTxn = async ({
  userId,
  request,
}: RecordTwBankTxnOpts): Promise<ApiErrorCode | null> => {
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
    await txnTwBankRecordCollection.insertOne({
      accountId: userObjectId,
      sourceBankDetailsUuid,
      targetWalletId: new ObjectId(targetWalletId),
      uuid,
      amount,
    }, {session});
  } catch (e) {
    console.error(e);
    await session.abortTransaction();
    await session.endSession();
  }

  try {
    await uploadBlob({
      container: azureContainer.goldTwBankTxn,
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

