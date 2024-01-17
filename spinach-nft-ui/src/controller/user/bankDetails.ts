import {azureContainer} from '@spinach/common/controller/blob/const';
import {uploadBlob} from '@spinach/common/controller/blob/upload';
import {userBankDetailsCollection, userInfoCollection} from '@spinach/common/controller/collections/user';
import {Mongo} from '@spinach/common/controller/const';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {BankDetailsMap} from '@spinach/common/types/data/user/bank';
import {ObjectId} from 'mongodb';
import {v4} from 'uuid';

import {getDataAsArray, getDataAsMap} from '@spinach/next/controller/common';
import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {throwIfNotAdmin} from '@spinach/next/controller/utils';
import {RequestOfUserBankDetails} from '@spinach/next/types/userData/upload';


export const getBankDetailsMap = (uuidList: string[]): Promise<BankDetailsMap> => {
  return getDataAsMap(userBankDetailsCollection, ({uuid}) => uuid, {uuid: {$in: uuidList}});
};

export const getVerifiedBankDetailsOfUser = (userId: string) => {
  return getDataAsArray(userBankDetailsCollection, {userId, status: 'verified'});
};

export const getUnverifiedBankDetails = async ({executorUserId}: ControllerRequireUserIdOpts) => {
  await throwIfNotAdmin(executorUserId);

  return getDataAsArray(userBankDetailsCollection, {status: 'unverified'});
};

type MarkBankDetailsVerifiedOpts = ControllerRequireUserIdOpts & {
  uuid: string,
  pass: boolean,
};

export const markBankDetailsVerified = async ({
  executorUserId,
  uuid,
  pass,
}: MarkBankDetailsVerifiedOpts): Promise<ApiErrorCode | null> => {
  await throwIfNotAdmin(executorUserId);

  if (!pass) {
    const deletionResult = await userBankDetailsCollection.deleteOne({uuid});

    return deletionResult.deletedCount > 0 ? null : 'bankDetailsNotFound';
  }

  const result = await userBankDetailsCollection.updateOne(
    {uuid},
    {$set: {status: 'verified'}},
  );

  return result.modifiedCount > 0 ? null : 'bankDetailsNotFound';
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
    console.error(`Failed to insert user bank details for ${userId}`, details, e);
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
    console.error(`Failed to upload user bank details images of ${userId}`, details, e);
    await session.abortTransaction();
    await session.endSession();
    return 'bankDetailsUploadFailed';
  }

  await session.commitTransaction();
  await session.endSession();
  return null;
};
