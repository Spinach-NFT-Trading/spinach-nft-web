import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {throwIfNotAdmin} from '@spinach/next/controller/utils';


type MarkUserAgentOpts = ControllerRequireUserIdOpts & {
  targetId: string,
  agent: boolean,
};

export const markUserAgent = async ({
  executorUserId,
  targetId,
  agent,
}: MarkUserAgentOpts): Promise<ApiErrorCode | null> => {
  await throwIfNotAdmin(executorUserId);

  const result = await userInfoCollection.updateOne(
    {_id: new ObjectId(targetId)},
    {$set: {agent}},
  );

  if (!result.matchedCount) {
    return 'accountNotFound';
  }

  return null;
};
