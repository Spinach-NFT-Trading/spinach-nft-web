import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {VerificationStatus} from '@spinach/common/types/common/status';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {throwIfNotAdmin} from '@spinach/next/controller/utils';


type MarkUserVerifiedOpts = ControllerRequireUserIdOpts & {
  targetId: string,
  status: {
    original: VerificationStatus,
    new: VerificationStatus,
  },
};

export const markUserStatus = async ({
  executorUserId,
  targetId,
  status,
}: MarkUserVerifiedOpts): Promise<ApiErrorCode | null> => {
  await throwIfNotAdmin(executorUserId);

  const result = await userInfoCollection.updateOne(
    {_id: new ObjectId(targetId), status: status.original},
    {$set: {status: status.new}},
  );

  if (!result.matchedCount) {
    return 'accountNotFound';
  }

  return null;
};
