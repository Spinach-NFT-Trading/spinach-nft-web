import {txnWalletCollection} from '@spinach/common/controller/collections/gold';
import {userInfoCollection} from '@spinach/common/controller/collections/user';
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

export const getDepositWallet = (channel: GoldExchangeChannel): Promise<GoldWallet | null> => (
  txnWalletCollection.findOne({channel}, {projection: {_id: false}})
);
