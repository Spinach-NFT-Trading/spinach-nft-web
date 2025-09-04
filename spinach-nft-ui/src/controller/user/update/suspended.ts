import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {throwIfNotPrivileged} from '@spinach/common/controller/user/permission';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';


type MarkUserSuspendedOpts = ControllerRequireUserIdOpts & {
  targetId: string,
  isSuspended: boolean,
};

export const markUserSuspended = async ({
  executorUserId,
  targetId,
  isSuspended,
}: MarkUserSuspendedOpts): Promise<ApiErrorCode | null> => {
  await throwIfNotPrivileged(executorUserId);

  const result = await userInfoCollection.updateOne(
    {_id: new ObjectId(targetId)},
    {$set: {isSuspended}},
  );

  if (!result.matchedCount) {
    return 'accountNotFound';
  }

  return null;
};
