import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {throwIfNotPrivileged} from '@spinach/next/controller/utils';


type MarkUserAgentOpts = ControllerRequireUserIdOpts & {
  targetId: string,
  isAgent: boolean,
};

export const markUserAgent = async ({
  executorUserId,
  targetId,
  isAgent,
}: MarkUserAgentOpts): Promise<ApiErrorCode | null> => {
  await throwIfNotPrivileged(executorUserId);

  const result = await userInfoCollection.updateOne(
    {_id: new ObjectId(targetId)},
    {$set: {isAgent}},
  );

  if (!result.matchedCount) {
    return 'accountNotFound';
  }

  return null;
};
