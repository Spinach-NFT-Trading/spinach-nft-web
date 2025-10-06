import {getNewBalance} from '@spinach/common/controller/actors/user';
import {userBalanceCollection} from '@spinach/common/controller/collections/user';
import {Mongo} from '@spinach/common/controller/const';
import {throwIfNotAdmin} from '@spinach/common/controller/user/permission';
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
}: RecordManualBalanceAdjustmentOpts) => {
  await throwIfNotAdmin(executorUserId);

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
};
