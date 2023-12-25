import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {ObjectId} from 'mongodb';


type RecordGoldPendingTxnOpts = {
  account: string,
};

export const recordGoldPendingTxn = async ({
  account,
}: RecordGoldPendingTxnOpts): Promise<ApiErrorCode | null> => {
  const accountId = new ObjectId(account);

  const userInfo = await userInfoCollection.findOne({_id: accountId}, {projection: {_id: false}});

  if (!userInfo) {
    return 'accountNotFound';
  }

  return null;
};
