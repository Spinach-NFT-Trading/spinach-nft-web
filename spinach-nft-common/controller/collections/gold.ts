import {Mongo} from '@spinach/common/controller/const';
import {GoldTwBankTxnRecord} from '@spinach/common/types/data/gold/twBank';
import {GoldCompletedTxn, GoldTrackedTxn} from '@spinach/common/types/data/gold/txn';
import {GoldWallet} from '@spinach/common/types/data/gold/wallet';


const db = Mongo.db('txn');

export const txnTrackedCollection = db.collection<GoldTrackedTxn>('tracked');

export const txnCompletedCollection = db.collection<GoldCompletedTxn>('completed');

export const txnWalletCollection = db.collection<GoldWallet>('wallet');

export const txnTwBankRecordCollection = db.collection<GoldTwBankTxnRecord>('twBankTxn');

const initTxnDatabaseIndex = () => {
  return Promise.all([
    txnTrackedCollection.createIndex({hash: 1}, {unique: true}),
    txnTrackedCollection.createIndex({from: 1, blockEpoch: -1}),
    txnCompletedCollection.createIndex({hash: 1}, {unique: true}),
    txnCompletedCollection.createIndex({accountId: 1}),
    txnWalletCollection.createIndex({wallet: 1}, {unique: true}),
    txnTwBankRecordCollection.createIndex({uuid: 1}, {unique: true}),
    txnTwBankRecordCollection.createIndex({initiatorId: 1}),
  ]);
};

initTxnDatabaseIndex().catch((err) => console.error('Failed to init TxN db index', err));
