import {Mongo} from '@spinach/common/controller/const';
import {UserBalanceHistoryModel} from '@spinach/common/types/data/user/balance';
import {UserBankDetails} from '@spinach/common/types/data/user/bank';
import {UserModel} from '@spinach/common/types/data/user/data';
import {UserNftPositionModel} from '@spinach/common/types/data/user/nftPosition';


const db = Mongo.db('user');

export const userInfoCollection = db.collection<UserModel>('info');

export const userBalanceCollection = db.collection<UserBalanceHistoryModel>('balance');

export const userNftPositionCollection = db.collection<UserNftPositionModel>('nft');

export const userBankDetailsCollection = db.collection<UserBankDetails>('bankDetails');

const initUserIndex = async () => {
  return Promise.all([
    userInfoCollection.createIndex({email: 1}, {unique: true}),
    userInfoCollection.createIndex({username: 1}, {unique: true}),
    userInfoCollection.createIndex({idNumber: 1}, {unique: true}),
    userInfoCollection.createIndex({name: 1}, {unique: true}),
    userInfoCollection.createIndex({lineId: 1}, {unique: true}),
    userInfoCollection.createIndex({wallet: 1}, {unique: true}),
    userBalanceCollection.createIndex({userId: 1}),
    userBalanceCollection.createIndex(
      {txnHash: 1},
      {unique: true, partialFilterExpression: {type: 'deposit.crypto'}, name: 'depositTxnHash'},
    ),
    userBalanceCollection.createIndex(
      {uuid: 1},
      {unique: true, partialFilterExpression: {type: 'deposit.twBank'}, name: 'depositTwBankUuid'},
    ),
    userBalanceCollection.createIndex(
      {nftTxnId: 1},
      {unique: true, partialFilterExpression: {type: 'nftBuy'}, name: 'nftBuyTxn'},
    ),
    userBalanceCollection.createIndex(
      {nftTxnId: 1},
      {unique: true, partialFilterExpression: {type: 'nftSell'}, name: 'nftSellTxn'},
    ),
    userNftPositionCollection.createIndex({owner: 1, nftId: 1}, {unique: true}),
    userBankDetailsCollection.createIndex({userId: 1, account: 1, code: 1}, {unique: true}),
    userBankDetailsCollection.createIndex({uuid: 1}, {unique: true}),
  ]);
};

initUserIndex().catch((err) => console.error('Failed to init user db index', err));
