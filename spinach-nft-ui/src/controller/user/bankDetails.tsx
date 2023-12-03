import {azureContainer} from '@spinach/common/controller/blob/const';
import {uploadBlob} from '@spinach/common/controller/blob/upload';
import {userBankDetailsCollection, userInfoCollection} from '@spinach/common/controller/collections/user';
import {Mongo} from '@spinach/common/controller/const';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {ObjectId} from 'mongodb';
import {v4} from 'uuid';

import {getDataAsArray} from '@spinach/next/controller/common';
import {RequestOfUserBankDetails} from '@spinach/next/types/userData/upload';


export const getBankDetailsOfUser = (userId: string) => {
  return getDataAsArray(userBankDetailsCollection, {userId});
};

type UploadBankDetailsOpts = {
  userId: string,
  request: RequestOfUserBankDetails,
};

export const uploadBankDetails = async ({
  userId,
  request,
}: UploadBankDetailsOpts): Promise<ApiErrorCode | null> => {
  const {image, details} = request;

  const session = Mongo.startSession();
  session.startTransaction();

  const userData = userInfoCollection.findOne({_id: new ObjectId(userId)});
  if (!userData) {
    return 'accountNotFound';
  }

  const uuid = v4();
  try {
    await userBankDetailsCollection.insertOne({
      userId,
      uuid,
      ...details,
    }, {session});
  } catch (e) {
    await session.abortTransaction();
    await session.endSession();
    return 'bankDetailsAlreadyExist';
  }

  try {
    await uploadBlob({
      container: azureContainer.bankDetails,
      name: uuid,
      ...image,
    });
  } catch (e) {
    await session.abortTransaction();
    await session.endSession();
    return 'bankDetailsUploadFailed';
  }

  await session.commitTransaction();
  await session.endSession();
  return null;
};
