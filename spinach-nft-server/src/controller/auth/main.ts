import {AuthErrorCode} from '@/types/api/auth/error';
import {ObjectId} from 'mongodb';
import {UserLoginRequest} from 'spinach-nft-common/types/api/auth/login';
import {UserRegisterRequest} from 'spinach-nft-common/types/api/auth/register';
import {UserInfo} from 'spinach-nft-common/types/common/user';
import {hashPassword, verifyPasswordOrThrow} from 'spinach-nft-common/utils/password';

import {userBankDetailsCollection, userInfoCollection} from '@/controller/auth/const';


export const registerUser = async ({
  name,
  email,
  phone,
  lineId,
  wallet,
  username,
  password,
}: UserRegisterRequest): Promise<AuthErrorCode | ObjectId> => {
  if (await userInfoCollection.findOne({username})) {
    return 'takenUsername';
  }

  if (await userInfoCollection.findOne({name})) {
    return 'takenName';
  }

  if (await userInfoCollection.findOne({email})) {
    return 'takenEmail';
  }

  if (await userInfoCollection.findOne({phone})) {
    return 'takenPhone';
  }

  if (await userInfoCollection.findOne({lineId})) {
    return 'takenLineId';
  }

  if (await userInfoCollection.findOne({wallet})) {
    return 'takenWallet';
  }

  const result = await userInfoCollection.insertOne({
    username,
    passwordHash: await hashPassword(password),
    name,
    email,
    phone,
    lineId,
    wallet,
  });

  return result.insertedId;
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
