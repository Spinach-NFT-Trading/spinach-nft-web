import {UserInfoSchemaBase} from '@/types/common/user';
import {UserBankDetailModel, UserModel} from 'spinach-nft-common/types/data/user';

import {Mongo} from '@/controller/const';


const userDb = Mongo.db('user');

export const userInfoCollection = userDb.collection<UserModel>('info');

export const userBankDetailsCollection = userDb.collection<UserBankDetailModel>('bankDetails');

const initUserInfoIndex = async () => {
  return Promise.all([
    ...Object.keys(UserInfoSchemaBase).map((key) => userInfoCollection.createIndex({[key]: 1}, {unique: true})),
  ]);
};

initUserInfoIndex().catch((err) => console.error('Failed to init user info index', err));
