import {uploadBlob} from '@spinach/common/controller/blob/upload';
import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {throwIfNotPrivileged} from '@spinach/common/controller/user/permission';
import {UserIdVerificationData} from '@spinach/common/types/api/auth/verify/id/main';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {accountIdVerificationType} from '@spinach/common/types/api/profile/id';
import {UserDataMap} from '@spinach/common/types/common/user/data';
import {UserInfo} from '@spinach/common/types/common/user/info';
import {toUserData} from '@spinach/common/utils/data/user';
import {isNotNullish} from '@spinach/common/utils/type';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';


type UploadIdVerificationOpts = {
  userId: string,
  request: UserIdVerificationData,
};

export const uploadIdVerification = async ({
  userId,
  request,
}: UploadIdVerificationOpts): Promise<ApiErrorCode | null> => {
  const userData = await userInfoCollection.findOneAndUpdate(
    {_id: new ObjectId(userId)},
    {$set: {status: 'unverified'}},
  );
  if (!userData) {
    return 'accountNotFound';
  }

  await Promise.all(accountIdVerificationType
    .map((type) => {
      const data = request[type];

      if (!data) {
        return null;
      }

      return uploadBlob({
        container: type,
        name: userData._id.toHexString(),
        ...data,
      });
    })
    .filter(isNotNullish),
  );

  return null;
};

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
