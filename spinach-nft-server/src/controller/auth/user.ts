import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {UserLoginRequest} from '@spinach/common/types/api/auth/login';
import {UserRegisterRequest} from '@spinach/common/types/api/auth/register';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {UserInfo} from '@spinach/common/types/common/user/info';
import {UserModel} from '@spinach/common/types/data/user/data';
import {hashPassword, verifyPasswordOrThrow} from '@spinach/common/utils/secret';
import {checkTrxAddress} from '@spinach/common/utils/tron/address';
import {ObjectId} from 'mongodb';

import {RegisterUserResult} from '@spinach/server/controller/auth/type';
import {RegisterAsAdminLineIdKey} from '@spinach/server/env';


export const registerUser = async ({
  idNumber,
  name,
  email,
  birthday,
  lineId,
  wallet,
  phone,
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

  if (wallet && await userInfoCollection.findOne({wallet})) {
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

  if (wallet) {
    const checkResult = await checkTrxAddress({wallet});
    if ('message' in checkResult) {
      return 'walletNotExist';
    }

    if (checkResult.isToken || checkResult.isContract) {
      return 'walletInvalid';
    }
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
    phone,
    status: 'unverified',
    isAdmin: lineId === RegisterAsAdminLineIdKey,
    isMod: false,
    isAgent: false,
    isSuspended: false,
    commissionPercent: {
      buy: 0,
      sell: 0,
    },
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
    phone,
    status,
    isAdmin,
    isMod,
    isAgent,
    isSuspended,
    commissionPercent,
    recruitedBy,
  } = info;

  if (isSuspended) {
    return 'accountDisabled';
  }

  return {
    id: _id.toHexString(),
    idNumber,
    username,
    name,
    email,
    birthday,
    lineId,
    wallet,
    phone,
    status,
    isAdmin,
    isMod,
    isAgent,
    isSuspended,
    commissionPercent,
    recruitedBy,
  };
};
