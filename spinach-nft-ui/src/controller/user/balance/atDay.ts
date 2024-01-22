import {userBalanceCollection} from '@spinach/common/controller/collections/user';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {throwIfNotAdmin} from '@spinach/next/controller/utils';


type GetUserBalanceAtDayOpts = ControllerRequireUserIdOpts & {
  userId: ObjectId,
  latestId: ObjectId,
};

export const getUserBalanceAtDay = async ({
  executorUserId,
  userId,
  latestId,
}: GetUserBalanceAtDayOpts): Promise<number> => {
  await throwIfNotAdmin(executorUserId);

  return (await userBalanceCollection.findOne(
    {userId, _id: {$lte: latestId}},
    {sort: {_id: -1}},
  ))?.current ?? 0;
};
