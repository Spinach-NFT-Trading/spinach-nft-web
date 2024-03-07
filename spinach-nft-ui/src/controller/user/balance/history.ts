import {userBalanceCollection} from '@spinach/common/controller/collections/user';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {toIdRangeFromLookBackRequest} from '@spinach/next/controller/user/utils';
import {throwIfNotElevated} from '@spinach/next/controller/utils';
import {UserBalanceHistoryModelClient} from '@spinach/next/types/mongo/balance';
import {DataLookBackRequestOnUser} from '@spinach/next/types/userData/load';


type GetUserBalanceHistoryOpts = ControllerRequireUserIdOpts & DataLookBackRequestOnUser;

export const getUserBalanceHistory = async ({
  executorUserId,
  userId,
  ...request
}: GetUserBalanceHistoryOpts): Promise<UserBalanceHistoryModelClient[]> => {
  await throwIfNotElevated(executorUserId);

  return userBalanceCollection.find({
    userId: new ObjectId(userId),
    ...toIdRangeFromLookBackRequest(request),
  })
    .sort({_id: 1})
    .map(({
      _id,
      type,
      current,
      diff,
    }): UserBalanceHistoryModelClient => ({
      id: _id.toHexString(),
      epochMs: _id.getTimestamp().getTime(),
      type,
      current,
      diff,
    }))
    .toArray();
};
