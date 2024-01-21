import {userBankDetailsCollection, userInfoCollection} from '@spinach/common/controller/collections/user';
import {UserLoginRequest} from '@spinach/common/types/api/auth/login';
import {UserRegisterRequest} from '@spinach/common/types/api/auth/register';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {UserInfo} from '@spinach/common/types/common/user';
import {UserModel} from '@spinach/common/types/data/user/data';
import {hashPassword, verifyPasswordOrThrow} from '@spinach/common/utils/secret';
import {checkTrxAddress} from '@spinach/common/utils/tron/address';
import {ObjectId} from 'mongodb';

import {RegisterUserResult} from '@spinach/server/controller/auth/type';
import {isSmsVerificationKeyValid} from '@spinach/server/controller/auth/verify/sms/finalize';
import {RegisterAsAdminLineIdKey} from '@spinach/server/env';


export const registerUser = async ({
  phoneVerificationKey,
  idNumber,
  name,
  email,
  birthday,
  lineId,
  wallet,
  username,
  password,
  recruitedBy,
}: UserRegisterRequest): Promise<ApiErrorCode | RegisterUserResult> => {
  if (await userInfoCollection.findOne({idNumber})) {
    return 'takenIdNumber';
  }

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

  if (recruitedBy) {
    const agent = await userInfoCollection.findOne({_id: new ObjectId(recruitedBy)});

    if (!agent) {
      return 'agentNotFound';
    }

    if (!agent.isAgent) {
      return 'agentInactive';
    }
  }

  const checkResult = await checkTrxAddress({wallet});
  if ('message' in checkResult) {
    return 'walletNotExist';
  }

  if (checkResult.isToken || checkResult.isContract) {
    return 'walletInvalid';
  }

  if (!await isSmsVerificationKeyValid(phoneVerificationKey)) {
    return 'smsPhoneInvalid';
  }

  const model: UserModel = {
    idNumber,
    username,
    passwordHash: await hashPassword(password),
    name,
    email,
    birthday,
    lineId,
    wallet,
    status: 'unverified',
    isAdmin: lineId === RegisterAsAdminLineIdKey,
    isAgent: false,
    recruitedBy,
  };
  const result = await userInfoCollection.insertOne(model);

  return {
    model,
    id: result.insertedId,
  };
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

  const {
    _id,
    idNumber,
    username,
    name,
    email,
    birthday,
    lineId,
    wallet,
    status,
    isAdmin,
    isAgent,
    recruitedBy,
  } = info;

  return {
    id: _id.toHexString(),
    idNumber,
    username,
    name,
    email,
    birthday,
    lineId,
    wallet,
    bankDetails: await userBankDetailsCollection.find({username: info.username}).toArray(),
    status,
    isAdmin,
    isAgent,
    recruitedBy,
  };
};
