import {Mongo} from '@spinach/common/controller/const';
import {GoldPurchaseTwBankRecord} from '@spinach/common/types/data/gold/purchase';
import {GoldCompletedTxn, GoldTrackedTxn} from '@spinach/common/types/data/gold/txn';
import {GoldWallet} from '@spinach/common/types/data/gold/wallet';


const db = Mongo.db('txn');

export const txnTrackedCollection = db.collection<GoldTrackedTxn>(
  'tracked',
);

export const txnCompletedCollection = db.collection<GoldCompletedTxn>(
  'completed',
);

export const txnWalletCollection = db.collection<GoldWallet>(
  'wallet',
);

export const txnGoldPurchaseTwBankRecordCollection = db.collection<GoldPurchaseTwBankRecord>(
  'goldPurchase/twBank',
);

const initTxnDatabaseIndex = () => {
  return Promise.all([
    txnTrackedCollection.createIndex({hash: 1}, {unique: true}),
    txnTrackedCollection.createIndex({from: 1, blockEpoch: -1}),
    txnCompletedCollection.createIndex({hash: 1}, {unique: true}),
    txnCompletedCollection.createIndex({accountId: 1}),
    txnWalletCollection.createIndex({wallet: 1}, {unique: true}),
    txnGoldPurchaseTwBankRecordCollection.createIndex({uuid: 1}, {unique: true}),
    txnGoldPurchaseTwBankRecordCollection.createIndex({accountId: 1}),
  ]);
};

initTxnDatabaseIndex().catch((err) => console.error('Failed to init TxN db index', err));
