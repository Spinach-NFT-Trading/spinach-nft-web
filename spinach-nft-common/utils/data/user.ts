import {WithId} from 'mongodb';

import {UserData} from '@spinach/common/types/common/user/data';
import {UserInfo} from '@spinach/common/types/common/user/info';
import {UserModel} from '@spinach/common/types/data/user/data';


export const toUserData = ({
  idNumber,
  username,
  name,
  email,
  birthday,
  lineId,
  wallet,
  phone,
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
    phone,
    recruitedBy,
  };
};

export const toUserInfo = (model: WithId<UserModel>): UserInfo => {
  const {
    _id,
    status,
    isAdmin,
    isMod,
    isAgent,
    isSuspended,
    commissionPercentAgent,
    commissionPercentMember,
    recruitedBy,
    verificationImageUploadIdMap,
  } = model;

  return {
    ...toUserData(model),
    id: _id.toHexString(),
    status,
    isAdmin,
    isMod,
    isAgent,
    isSuspended,
    commissionPercentAgent,
    commissionPercentMember,
    recruitedBy,
    verificationImageUploadIdMap,
  };
};
