import {AuthErrorCode} from '@/types/api/auth/error';
import {UserLoginRequest} from 'spinach-nft-common/types/api/auth/login';
import {UserRegisterRequest} from 'spinach-nft-common/types/api/auth/register';
import {UserInfo} from 'spinach-nft-common/types/common/user';
import {hashPassword, verifyPasswordOrThrow} from 'spinach-nft-common/utils/password';

import {userBankDetailsCollection, userInfoCollection} from '@/controller/auth/const';


export const registerUser = async (request: UserRegisterRequest): Promise<string> => {
  const result = await userInfoCollection.insertOne({
    username: request.username,
    passwordHash: await hashPassword(request.password),
    name: request.name,
    email: request.email,
    phone: request.phone,
    lineId: request.lineId,
    wallet: request.wallet,
  });

  return result.insertedId.toHexString();
};

export const getUserInfo = async (request: UserLoginRequest): Promise<UserInfo | AuthErrorCode> => {
  const info = await userInfoCollection.findOne({
    username: request.username,
  });

  if (!info) {
    return 'accountNotFound';
  }

  try {
    await verifyPasswordOrThrow(request.password, info.passwordHash);
  } catch (e) {
    return 'passwordMismatch';
  }

  return {
    id: info._id.toHexString(),
    username: info.username,
    name: info.name,
    phone: info.phone,
    email: info.email,
    lineId: info.lineId,
    wallet: info.wallet,
    bankDetails: await userBankDetailsCollection.find({username: info.username}).toArray(),
  };
};
