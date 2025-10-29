'use server';
import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {throwIfNotPrivileged} from '@spinach/common/controller/user/permission';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';


type UpdateUserRecruiterOpts = ControllerRequireUserIdOpts & {
  targetId: string,
  recruiterId: string,
};

export const updateUserRecruiter = async ({
  executorUserId,
  targetId,
  recruiterId,
}: UpdateUserRecruiterOpts): Promise<ApiErrorCode | null> => {
  if (targetId === recruiterId) {
    throw new Error('Recruiter cannot be self');
  }

  await throwIfNotPrivileged(executorUserId);

  const recruiter = await userInfoCollection.findOne({_id: new ObjectId(recruiterId)});
  if (!recruiter) {
    return 'accountNotFound';
  }

  const result = await userInfoCollection.updateOne(
    {_id: new ObjectId(targetId)},
    {$set: {recruitedBy: recruiterId}},
  );
  if (!result.matchedCount) {
    return 'accountNotFound';
  }

  return null;
};
