import {UserInfoSchemaBase} from '@spinach/common/types/common/user';
import {UserBankDetailModel, UserModel} from '@spinach/common/types/data/user';

import {Mongo} from '@spinach/server/controller/const';


const userDb = Mongo.db('user');

export const userInfoCollection = userDb.collection<UserModel>('info');

export const userBankDetailsCollection = userDb.collection<UserBankDetailModel>('bankDetails');

const initUserInfoIndex = async () => {
  return Promise.all([
    ...Object.keys(UserInfoSchemaBase).map((key) => userInfoCollection.createIndex({[key]: 1}, {unique: true})),
  ]);
};

initUserInfoIndex().catch((err) => console.error('Failed to init user info index', err));
