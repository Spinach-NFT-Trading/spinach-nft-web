import {uploadBlob} from '@spinach/common/controller/blob/upload';
import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {UserIdVerificationData} from '@spinach/common/types/api/auth/verify/id/main';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {accountIdVerificationType} from '@spinach/common/types/api/profile/id';
import {UserDataMap, UserInfo} from '@spinach/common/types/common/user';
import {isNotNullish} from '@spinach/common/utils/type';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {toUserData, toUserInfo} from '@spinach/next/controller/user/utils';
import {throwIfNotAdmin} from '@spinach/next/controller/utils';


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

export const getUserById = (userId: string | undefined) => {
  return userInfoCollection.findOne({_id: new ObjectId(userId)});
};

export const getUserInfoById = async (id: string): Promise<UserInfo | undefined> => {
  const model = await getUserById(id);

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
    }))
    .toArray();
};
