import {UserData, UserInfo} from '@spinach/common/types/common/user';
import {UserModel} from '@spinach/common/types/data/user/data';
import {endOfDay} from 'date-fns/endOfDay';
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
  startDate,
  endDate,
}: DataLookBackRequest) => {
  return {
    _id: {
      $gte: ObjectId.createFromTime(new Date(startDate).getTime() / 1000),
      $lt: ObjectId.createFromTime(endOfDay(new Date(endDate)).getTime() / 1000),
    },
  };
};
