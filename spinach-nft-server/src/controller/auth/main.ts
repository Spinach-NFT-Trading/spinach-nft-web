import {userBankDetailsCollection, userInfoCollection} from '@spinach/common/controller/collections/user';
import {UserLoginRequest} from '@spinach/common/types/api/auth/login';
import {UserRegisterRequest} from '@spinach/common/types/api/auth/register';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {UserInfo} from '@spinach/common/types/common/user';
import {hashPassword, verifyPasswordOrThrow} from '@spinach/common/utils/password';
import {checkTrxAddress} from '@spinach/common/utils/tron/address';
import {ObjectId} from 'mongodb';


export const registerUser = async ({
  name,
  email,
  lineId,
  wallet,
  username,
  password,
}: UserRegisterRequest): Promise<ApiErrorCode | ObjectId> => {
  if (await userInfoCollection.findOne({username})) {
    return 'takenUsername';
  }

  if (await userInfoCollection.findOne({name})) {
    return 'takenName';
  }

  if (await userInfoCollection.findOne({email})) {
    return 'takenEmail';
  }

  if (await userInfoCollection.findOne({lineId})) {
    return 'takenLineId';
  }

  if (await userInfoCollection.findOne({wallet})) {
    return 'takenWallet';
  }

  const checkResult = await checkTrxAddress({wallet});
  console.log(checkResult);
  if ('message' in checkResult) {
    return 'walletNotExist';
  }

  if (checkResult.isToken || checkResult.isContract) {
    return 'walletInvalid';
  }

  const result = await userInfoCollection.insertOne({
    username,
    passwordHash: await hashPassword(password),
    name,
    email,
    lineId,
    wallet,
  });

  return result.insertedId;
};

export const getUserInfo = async (request: UserLoginRequest): Promise<UserInfo | ApiErrorCode> => {
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
    email: info.email,
    lineId: info.lineId,
    wallet: info.wallet,
    bankDetails: await userBankDetailsCollection.find({username: info.username}).toArray(),
  };
};
