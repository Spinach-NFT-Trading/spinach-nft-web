import {userInfoCollection} from '@spinach/common/controller/auth';
import {goldPendingCollection} from '@spinach/common/controller/gold';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {MongoError, ObjectId} from 'mongodb';


type RecordGoldPendingExchangeOpts = {
  account: string,
};

export const recordGoldPendingExchange = async ({
  account,
}: RecordGoldPendingExchangeOpts): Promise<ApiErrorCode | null> => {
  const accountId = new ObjectId(account);

  const userInfo = await userInfoCollection.findOne({_id: accountId}, {projection: {_id: false}});

  if (!userInfo) {
    return 'accountNotFound';
  }

  try {
    await goldPendingCollection.insertOne({
      accountId,
      // 30 min
      expiry: new Date(new Date().getTime() + 30 * 60 * 1000),
      wallet: userInfo.wallet,
    });
  } catch (e) {
    if (e instanceof MongoError && e.code === 11000) {
      return 'goldExchangeInProgress';
    }

    throw e;
  }

  return null;
};
