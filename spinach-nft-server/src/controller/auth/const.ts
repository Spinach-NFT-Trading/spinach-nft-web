import {UserBankDetailModel, UserModel} from 'spinach-nft-common/types/data/user';

import {Mongo} from '@/controller/const';


const userDb = Mongo.db('user');

export const userInfoCollection = userDb.collection<UserModel>('info');

export const userBankDetailsCollection = userDb.collection<UserBankDetailModel>('bankDetails');

userInfoCollection.createIndex({username: 1}, {unique: true})
  .catch((err) => console.error('Failed to init user info index', err));
