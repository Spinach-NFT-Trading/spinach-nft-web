'use server';
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
  if (await isAdmin(executorUserId)) {
    // If the user is an admin, the executor can give the target user any amount of GOLD
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
  }

  const userInfo = await getUserInfoById({
    requiresElevated: false,
    userId: targetUserId,
  });
  if (!userInfo) {
    return 'userInfoNotFound';
  }
  if (userInfo.recruitedBy !== executorUserId) {
    return 'unauthorized';
  }

  const balanceAfterAdjustment = await getNewBalance({
    accountId: new ObjectId(executorUserId),
    diff: -amount,
  });
  if (balanceAfterAdjustment.current < 0) {
    return 'goldNotEnough';
  }

  await Mongo.withSession(async (session) => {
    await session.withTransaction(async () => {
      await userBalanceCollection.insertOne({
        ...balanceAfterAdjustment,
        type: 'transferFromAgent',
      }, {session});
      await userBalanceCollection.insertOne({
        ...(await getNewBalance({
          accountId: new ObjectId(targetUserId),
          diff: amount,
          session,
        })),
        type: 'transferFromAgent',
      }, {session});
    });
  });
  return null;
};
