import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {throwIfNotAdmin} from '@spinach/common/controller/user/permission';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {hashPassword} from '@spinach/common/utils/secret';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';


type SetUserPasswordOpts = ControllerRequireUserIdOpts & {
  targetUserId: string,
  password: string,
};

export const setUserPassword = async ({
  executorUserId,
  targetUserId,
  password,
}: SetUserPasswordOpts): Promise<ApiErrorCode | null> => {
  await throwIfNotAdmin(executorUserId);

  const result = await userInfoCollection.updateOne(
    {_id: new ObjectId(targetUserId)},
    {$set: {passwordHash: await hashPassword(password)}},
  );

  if (!result.matchedCount) {
    return 'accountNotFound';
  }

  return null;
};
