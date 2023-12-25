import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {throwIfNotAdmin} from '@spinach/next/controller/utils';


type MarkUserVerifiedOpts = ControllerRequireUserIdOpts & {
  targetId: string,
};

export const markUserVerified = async ({
  executorUserId,
  targetId,
}: MarkUserVerifiedOpts): Promise<ApiErrorCode | null> => {
  await throwIfNotAdmin(executorUserId);

  const result = await userInfoCollection.findOneAndUpdate(
    {_id: new ObjectId(targetId), status: 'unverified'},
    {$set: {status: 'verified'}},
  );

  if (!result) {
    return 'accountNotFound';
  }

  return null;
};
