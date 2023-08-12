import {userInfoCollection} from '@spinach/common/controller/auth';
import {goldPendingCollection} from '@spinach/common/controller/gold';
import {MongoError, ObjectId} from 'mongodb';


type RecordGoldPendingExchangeOpts = {
  account: string,
};

export const recordGoldPendingExchange = async ({account}: RecordGoldPendingExchangeOpts) => {
  const accountId = new ObjectId(account);

  const userInfo = await userInfoCollection.findOne({_id: accountId});

  if (!userInfo) {
    return false;
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
      return false;
    }

    throw e;
  }

  return true;
};
