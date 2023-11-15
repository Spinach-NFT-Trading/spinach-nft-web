import {userBankDetailsCollection, userInfoCollection} from '@spinach/common/controller/collections/user';
import {UserInfo} from '@spinach/common/types/common/user';
import {ObjectId} from 'mongodb';


export const getUserInfoById = async (id: string): Promise<UserInfo | undefined> => {
  const info = await userInfoCollection.findOne({
    _id: new ObjectId(id),
  });

  if (!info) {
    return undefined;
  }

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
