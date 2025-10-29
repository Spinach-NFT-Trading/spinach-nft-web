import {azureContainer} from '@spinach/common/controller/blob/const';
import {getImageBlob} from '@spinach/common/controller/blob/get';
import {userBankDetailsCollection, userInfoCollection} from '@spinach/common/controller/collections/user';
import {getUserInfoById} from '@spinach/common/controller/user/info';
import {throwIfNotPrivileged, throwIfNotElevated} from '@spinach/common/controller/user/permission';
import {getDataAsArray, getDataAsMap} from '@spinach/common/controller/utils/common';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {BankDetails, BankDetailsMap} from '@spinach/common/types/data/user/bank';
import {ObjectId} from 'mongodb';
import {v4} from 'uuid';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {RequestOfUserBankDetails} from '@spinach/next/types/userData/upload';


export const getBankDetailsMap = (uuidList: string[]): Promise<BankDetailsMap> => {
  return getDataAsMap(userBankDetailsCollection, ({uuid}) => uuid, {uuid: {$in: uuidList}});
};

type GetBankDetailsOfUserOpts = ControllerRequireUserIdOpts & {
  userId: string,
};

export const getBankDetailsOfUser = async ({
  executorUserId,
  userId,
}: GetBankDetailsOfUserOpts): Promise<BankDetails[]> => {
  if (userId !== executorUserId) {
    const executor = await throwIfNotElevated(executorUserId);
    const user = await getUserInfoById({executorUserId, userId, requiresElevated: true});

    if (executor.isAgent && user?.recruitedBy !== executorUserId) {
      throw new Error(`${executorUserId} attempted to get the bank details of ${userId} without permission`);
    }
  }

  return getDataAsArray(userBankDetailsCollection, {userId});
};

type GetBankDetailsByUuidOpts = ControllerRequireUserIdOpts & {
  uuid: string,
};

export const getBankDetailsVerificationImageByUuid = async ({
  executorUserId,
  uuid,
}: GetBankDetailsByUuidOpts) => {
  await throwIfNotElevated(executorUserId);

  const bankDetails = await userBankDetailsCollection.findOne({uuid});
  if (bankDetails == null) {
    return null;
  }

  return getImageBlob({
    container: azureContainer.pool,
    name: bankDetails.imageUploadId,
  });
};

export const getVerifiedBankDetailsOfUser = (userId: string) => {
  return getDataAsArray(userBankDetailsCollection, {userId, status: 'verified'});
};

export const getUnverifiedBankDetails = async ({executorUserId}: ControllerRequireUserIdOpts) => {
  await throwIfNotPrivileged(executorUserId);

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
  await throwIfNotPrivileged(executorUserId);

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
  const {details, imageUploadId} = request;

  const userData = userInfoCollection.findOne({_id: new ObjectId(userId)});
  if (!userData) {
    return 'accountNotFound';
  }

  await userBankDetailsCollection.insertOne({
    userId,
    uuid: v4(),
    imageUploadId,
    ...details,
  });

  return null;
};
