import {userBankDetailsCollection} from '@spinach/common/controller/collections/user';
import {UserData, UserInfo} from '@spinach/common/types/common/user';
import {UserModel} from '@spinach/common/types/data/user/data';
import {WithId} from 'mongodb';

import {getDataAsArray} from '@spinach/next/controller/common';


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

export const toUserInfo = async (model: WithId<UserModel>): Promise<UserInfo> => {
  const {
    _id,
    status,
    admin,
    agent,
    recruitedBy,
  } = model;

  return {
    ...toUserData(model),
    id: _id.toHexString(),
    bankDetails: await getDataAsArray(userBankDetailsCollection, {userId: _id.toHexString()}),
    status,
    admin,
    agent,
    recruitedBy,
  };
};
