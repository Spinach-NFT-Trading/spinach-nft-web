'use server';
import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {throwIfNotPrivileged} from '@spinach/common/controller/user/permission';
import {UserDataMap} from '@spinach/common/types/common/user/data';
import {UserInfo} from '@spinach/common/types/common/user/info';
import {toUserData, toUserInfo} from '@spinach/common/utils/data/user';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';


export const getUserDataMap = async (userIds: string[]): Promise<UserDataMap> => {
  return Object.fromEntries((await userInfoCollection
    .find({_id: {$in: userIds.map((id) => new ObjectId(id))}})
    .toArray())
    .map((data) => [data._id.toHexString(), toUserData(data)]));
};

type GetUnverifiedUsersOpts = ControllerRequireUserIdOpts;

export const getUnverifiedUsers = async ({executorUserId}: GetUnverifiedUsersOpts): Promise<UserInfo[]> => {
  await throwIfNotPrivileged(executorUserId);

  return await userInfoCollection.find({status: 'unverified'})
    .map(({_id, ...data}): UserInfo => ({
      ...data,
      id: _id.toHexString(),
    }))
    .toArray();
};

type SearchAgentsByUsernameOpts = ControllerRequireUserIdOpts & {
  selfUserId: string,
  usernamePattern: string,
};

export const searchAgentsByUsername = async ({
  executorUserId,
  selfUserId,
  usernamePattern,
}: SearchAgentsByUsernameOpts): Promise<UserInfo[]> => {
  await throwIfNotPrivileged(executorUserId);

  return await userInfoCollection
    .find({
      _id: {$ne: new ObjectId(selfUserId)},
      username: {$regex: usernamePattern, $options: 'i'},
      isAgent: true,
    })
    .limit(10)
    .map(toUserInfo)
    .toArray();
};
