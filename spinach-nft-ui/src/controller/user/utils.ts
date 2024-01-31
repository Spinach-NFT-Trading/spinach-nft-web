import {UserData, UserInfo} from '@spinach/common/types/common/user';
import {UserModel} from '@spinach/common/types/data/user/data';
import {ObjectId, WithId} from 'mongodb';

import {DataLookBackRequest} from '@spinach/next/types/userData/load';


export const toUserData = ({
  idNumber,
  username,
  name,
  email,
  birthday,
  lineId,
  wallet,
  recruitedBy,
}: WithId<UserModel>): UserData => {
  return {
    idNumber,
    username,
    name,
    email,
    birthday,
    lineId,
    wallet,
    recruitedBy,
  };
};

export const toUserInfo = (model: WithId<UserModel>): UserInfo => {
  const {
    _id,
    status,
    isAdmin,
    isAgent,
    isSuspended,
    commissionRate,
    recruitedBy,
  } = model;

  return {
    ...toUserData(model),
    id: _id.toHexString(),
    status,
    isAdmin,
    isAgent,
    isSuspended,
    commissionRate,
    recruitedBy,
  };
};

export const toIdRangeFromLookBackRequest = ({
  startEpochMs,
  endEpochMs,
}: DataLookBackRequest) => {
  return {
    _id: {
      $gte: ObjectId.createFromTime(startEpochMs / 1000),
      $lt: ObjectId.createFromTime(endEpochMs / 1000),
    },
  };
};
