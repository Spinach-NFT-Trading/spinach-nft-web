import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {UserInfo} from '@spinach/common/types/common/user';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {toUserInfo} from '@spinach/next/controller/user/utils';
import {throwIfNotAdmin} from '@spinach/next/controller/utils';


export const getUserInfoById = async (id: string): Promise<UserInfo | undefined> => {
  const model = await userInfoCollection.findOne({
    _id: new ObjectId(id),
  });

  if (!model) {
    return undefined;
  }

  return toUserInfo(model);
};

type GetUnverifiedUsersOpts = ControllerRequireUserIdOpts;

export const getUnverifiedUsers = async ({executorUserId}: GetUnverifiedUsersOpts): Promise<UserInfo[]> => {
  await throwIfNotAdmin(executorUserId);

  return await userInfoCollection.find({verified: false})
    .map(({_id, ...data}): UserInfo => ({
      ...data,
      id: _id.toHexString(),
      bankDetails: [],
    }))
    .toArray();
};
