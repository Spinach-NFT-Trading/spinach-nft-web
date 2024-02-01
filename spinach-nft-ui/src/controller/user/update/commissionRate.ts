import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {throwIfNotAdmin} from '@spinach/next/controller/utils';


type UpdateUserCommissionRateOpts = ControllerRequireUserIdOpts & {
  targetId: string,
  commissionRate: number,
};

export const updateUserCommissionRate = async ({
  executorUserId,
  targetId,
  commissionRate,
}: UpdateUserCommissionRateOpts): Promise<ApiErrorCode | null> => {
  await throwIfNotAdmin(executorUserId);

  if (commissionRate > 0.1) {
    return 'commissionOverLimit';
  }

  const result = await userInfoCollection.updateOne(
    {_id: new ObjectId(targetId)},
    {$set: {commissionRate}},
  );

  if (!result.matchedCount) {
    return 'accountNotFound';
  }

  return null;
};
