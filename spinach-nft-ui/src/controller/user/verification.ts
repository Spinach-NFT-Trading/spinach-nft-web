import {azureContainer} from '@spinach/common/controller/blob/const';
import {getImageBlob} from '@spinach/common/controller/blob/get';
import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {getUserInfoById} from '@spinach/common/controller/user/info';
import {throwIfNotElevated} from '@spinach/common/controller/user/permission';
import {UserIdVerificationUploadIdMap} from '@spinach/common/types/api/auth/register';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {AccountIdVerificationType} from '@spinach/common/types/api/profile/id';
import {UserModel} from '@spinach/common/types/data/user/data';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';


type UpdateUserIdVerificationUploadIdMapOpts = {
  userId: string,
  request: UserIdVerificationUploadIdMap,
};

export const updateUserIdVerificationUploadIdMap = async ({
  userId,
  request,
}: UpdateUserIdVerificationUploadIdMapOpts): Promise<ApiErrorCode | null> => {
  const userData = await userInfoCollection.findOneAndUpdate(
    {_id: new ObjectId(userId)},
    {$set: {status: 'unverified', verificationImageUploadIdMap: request} satisfies Partial<UserModel>},
  );
  if (!userData) {
    return 'accountNotFound';
  }

  return null;
};

type GetUserVerificationImageOpts = ControllerRequireUserIdOpts & {
  userId: string,
  type: AccountIdVerificationType,
};

export const getUserVerificationImage = async ({
  executorUserId,
  userId,
  type,
}: GetUserVerificationImageOpts) => {
  await throwIfNotElevated(executorUserId);

  const userInfo = await getUserInfoById({
    requiresElevated: false,
    userId,
  });
  if (userInfo == null) {
    return null;
  }

  const imageUploadId = userInfo.verificationImageUploadIdMap[type];
  if (imageUploadId == null) {
    return null;
  }

  return getImageBlob({
    container: azureContainer.pool,
    name: imageUploadId,
  });
};
