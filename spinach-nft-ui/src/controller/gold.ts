import {txnWalletCollection} from '@spinach/common/controller/collections/gold';
import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {GoldExchangeChannel, GoldWallet} from '@spinach/common/types/data/gold';
import {ObjectId} from 'mongodb';


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

export const getDepositWallet = (channel: GoldExchangeChannel): Promise<GoldWallet | null> => (
  txnWalletCollection.findOne({channel}, {projection: {_id: false}})
);
