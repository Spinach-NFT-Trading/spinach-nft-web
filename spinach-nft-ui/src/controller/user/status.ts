import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {throwIfNotPrivileged} from '@spinach/common/controller/user/permission';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {VerificationStatus} from '@spinach/common/types/common/status';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';


type MarkUserStatusOpts = ControllerRequireUserIdOpts & {
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
}: MarkUserStatusOpts): Promise<ApiErrorCode | null> => {
  await throwIfNotPrivileged(executorUserId);

  const result = await userInfoCollection.updateOne(
    {_id: new ObjectId(targetId), status: status.original},
    {$set: {status: status.new}},
  );

  if (!result.matchedCount) {
    return 'accountNotFound';
  }

  return null;
};
