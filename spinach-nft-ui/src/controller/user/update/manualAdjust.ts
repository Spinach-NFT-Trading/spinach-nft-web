import {getNewBalance} from '@spinach/common/controller/actors/user';
import {userBalanceCollection} from '@spinach/common/controller/collections/user';
import {Mongo} from '@spinach/common/controller/const';
import {getUserInfoById} from '@spinach/common/controller/user/info';
import {isAdmin} from '@spinach/common/controller/user/permission';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';


type RecordManualBalanceAdjustmentOpts = ControllerRequireUserIdOpts & {
  targetUserId: string,
  amount: number,
};

export const recordManualBalanceAdjustment = async ({
  executorUserId,
  targetUserId,
  amount,
}: RecordManualBalanceAdjustmentOpts): Promise<ApiErrorCode | null> => {
  // Only allow if:
  // - the user is an admin
  // - the target user is recruited by the executor
  let authorized = false;

  authorized ||= await isAdmin(executorUserId);

  if (!authorized) {
    const userInfo = await getUserInfoById({
      requiresElevated: false,
      userId: targetUserId,
    });
    if (!userInfo) {
      return 'userInfoNotFound';
    }

    authorized ||= userInfo.recruitedBy === executorUserId;
  }

  if (!authorized) {
    throw new Error('Manual balance adjustment not authorized');
  }

  await Mongo.withSession(async (session) => {
    await session.withTransaction(async () => {
      await userBalanceCollection.insertOne({
        ...(await getNewBalance({
          accountId: new ObjectId(targetUserId),
          diff: amount,
          session,
        })),
        type: 'adminAdjustment',
      }, {session});
    });
  });
  return null;
};
