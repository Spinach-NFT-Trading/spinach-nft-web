import {Mongo} from '@spinach/common/controller/const';
import {UserInfoSchemaBase} from '@spinach/common/types/common/user';
import {UserBankDetailModel, UserModel} from '@spinach/common/types/data/user';


const userDb = Mongo.db('user');

export const userInfoCollection = userDb.collection<UserModel>('info');

export const userBankDetailsCollection = userDb.collection<UserBankDetailModel>('bankDetails');

const initUserIndex = async () => {
  return Promise.all([
    ...Object.keys(UserInfoSchemaBase).map((key) => userInfoCollection.createIndex({[key]: 1}, {unique: true})),
  ]);
};

initUserIndex().catch((err) => console.error('Failed to init user db index', err));
