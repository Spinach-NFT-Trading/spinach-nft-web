'use server';
import {ObjectId} from 'mongodb';

import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {ControllerOptionalElevationOpts} from '@spinach/common/controller/type';
import {throwIfNotElevated} from '@spinach/common/controller/user/permission';
import {UserInfo} from '@spinach/common/types/common/user/info';
import {toUserInfo} from '@spinach/common/utils/data/user';


export const getUserById = async (userId: string | undefined) => {
  return userInfoCollection.findOne({_id: new ObjectId(userId)});
};

export type GetUserInfoByIdOpts = ControllerOptionalElevationOpts & {
  userId: string | null,
};

export const getUserInfoById = async ({
  executorUserId,
  requiresElevated,
  userId,
}: GetUserInfoByIdOpts): Promise<UserInfo | null> => {
  if (requiresElevated) {
    await throwIfNotElevated(executorUserId);
  }

  if (!userId) {
    return null;
  }

  const userModel = await getUserById(userId);
  if (!userModel) {
    return null;
  }

  return toUserInfo(userModel);
};
