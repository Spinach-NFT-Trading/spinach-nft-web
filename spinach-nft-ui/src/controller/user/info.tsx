import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {UserInfo, UserDataMap} from '@spinach/common/types/common/user';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {toUserData, toUserInfo} from '@spinach/next/controller/user/utils';
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

export const getUserDataMap = async (userIds: string[]): Promise<UserDataMap> => {
  return Object.fromEntries((await userInfoCollection
    .find({_id: {$in: userIds.map((id) => new ObjectId(id))}})
    .toArray())
    .map((data) => [data._id.toHexString(), toUserData(data)]));
};

type GetUnverifiedUsersOpts = ControllerRequireUserIdOpts;

export const getUnverifiedUsers = async ({executorUserId}: GetUnverifiedUsersOpts): Promise<UserInfo[]> => {
  await throwIfNotAdmin(executorUserId);

  return await userInfoCollection.find({status: 'unverified'})
    .map(({_id, ...data}): UserInfo => ({
      ...data,
      id: _id.toHexString(),
      bankDetails: [],
    }))
    .toArray();
};
