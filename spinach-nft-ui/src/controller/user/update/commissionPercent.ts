import {commissionPercentLimit} from '@spinach/common/const/user';
import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {UserCommissionPercent} from '@spinach/common/types/common/user/commission';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {throwIfNotAdmin} from '@spinach/next/controller/utils';


type UpdateUserCommissionPercentOpts = ControllerRequireUserIdOpts & {
  targetId: string,
  commissionPercent: UserCommissionPercent,
};

export const updateUserCommissionPercent = async ({
  executorUserId,
  targetId,
  commissionPercent,
}: UpdateUserCommissionPercentOpts): Promise<ApiErrorCode | null> => {
  await throwIfNotAdmin(executorUserId);

  if (commissionPercent.buy > commissionPercentLimit || commissionPercent.sell > commissionPercentLimit) {
    return 'commissionOverLimit';
  }

  const result = await userInfoCollection.updateOne(
    {_id: new ObjectId(targetId)},
    {$set: {commissionPercent}},
  );

  if (!result.matchedCount) {
    return 'accountNotFound';
  }

  return null;
};
