import {userBalanceCollection} from '@spinach/common/controller/collections/user';
import {throwIfNotPrivileged} from '@spinach/common/controller/user/permission';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';


type GetUserBalanceAtDayOpts = ControllerRequireUserIdOpts & {
  userId: ObjectId,
  latestId: ObjectId,
};

export const getUserBalanceAtDay = async ({
  executorUserId,
  userId,
  latestId,
}: GetUserBalanceAtDayOpts): Promise<number> => {
  await throwIfNotPrivileged(executorUserId);

  return (await userBalanceCollection.findOne(
    {userId, _id: {$lte: latestId}},
    {sort: {_id: -1}},
  ))?.current ?? 0;
};
