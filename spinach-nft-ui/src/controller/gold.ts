import {userInfoCollection} from '@spinach/common/controller/auth';
import {txnWalletCollection} from '@spinach/common/controller/gold';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {ObjectId} from 'mongodb';


type RecordGoldPendingExchangeOpts = {
  account: string,
};

export const recordPendingTxN = async ({
  account,
}: RecordGoldPendingExchangeOpts): Promise<ApiErrorCode | null> => {
  const accountId = new ObjectId(account);

  const userInfo = await userInfoCollection.findOne({_id: accountId}, {projection: {_id: false}});

  if (!userInfo) {
    return 'accountNotFound';
  }

  return null;
};

export const getDepositWallet = () => txnWalletCollection.findOne({}, {projection: {_id: false}});
