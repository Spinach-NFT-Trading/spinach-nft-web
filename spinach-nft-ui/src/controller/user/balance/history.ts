import {userBalanceCollection} from '@spinach/common/controller/collections/user';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {toIdRangeFromTimelineLookBackRequest} from '@spinach/next/controller/user/utils';
import {throwIfNotAdminOrAgent} from '@spinach/next/controller/utils';
import {UserBalanceHistoryModelClient} from '@spinach/next/types/mongo/balance';
import {UserTimelineLookBackRequest} from '@spinach/next/types/userData/load';


type GetUserBalanceHistoryOpts = ControllerRequireUserIdOpts & UserTimelineLookBackRequest;

export const getUserBalanceHistory = async ({
  executorUserId,
  ...request
}: GetUserBalanceHistoryOpts): Promise<UserBalanceHistoryModelClient[]> => {
  const {userId} = request;
  await throwIfNotAdminOrAgent(executorUserId);

  return userBalanceCollection.find({
    userId: new ObjectId(userId),
    ...toIdRangeFromTimelineLookBackRequest(request),
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
