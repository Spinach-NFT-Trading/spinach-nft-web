import {Mongo} from '@spinach/common/controller/const';
import {UserInfoSchemaBase} from '@spinach/common/types/common/user';
import {UserBalanceHistoryModel, UserBankDetailModel, UserModel} from '@spinach/common/types/data/user';


const db = Mongo.db('user');

export const userInfoCollection = db.collection<UserModel>('info');

export const userBalanceCollection = db.collection<UserBalanceHistoryModel>('balance');

export const userBankDetailsCollection = db.collection<UserBankDetailModel>('bankDetails');

const initUserIndex = async () => {
  return Promise.all([
    ...Object.keys(UserInfoSchemaBase).map((key) => userInfoCollection.createIndex({[key]: 1}, {unique: true})),
    userBalanceCollection.createIndex({userId: 1}),
  ]);
};

initUserIndex().catch((err) => console.error('Failed to init user db index', err));
