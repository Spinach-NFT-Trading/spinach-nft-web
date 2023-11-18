import {userBankDetailsCollection} from '@spinach/common/controller/collections/user';
import {UserInfo} from '@spinach/common/types/common/user';
import {UserModel} from '@spinach/common/types/data/user';
import {WithId} from 'mongodb';


export const toUserInfo = async (info: WithId<UserModel>): Promise<UserInfo> => {
  return {
    id: info._id.toHexString(),
    idNumber: info.idNumber,
    username: info.username,
    name: info.name,
    email: info.email,
    birthday: info.birthday,
    lineId: info.lineId,
    wallet: info.wallet,
    bankDetails: await userBankDetailsCollection.find({username: info.username}).toArray(),
    verified: info.verified,
    admin: info.admin,
  };
};
