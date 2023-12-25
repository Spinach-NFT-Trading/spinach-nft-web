import * as console from 'console';

import {Mongo} from '@spinach/common/controller/const';
import {GoldWallet} from '@spinach/common/types/data/gold/wallet';
import {GoldCompletedTxn, GoldTrackedTxn} from '@spinach/common/types/data/gold/txn';


const db = Mongo.db('txn');

export const txnTrackedCollection = db.collection<GoldTrackedTxn>('tracked');

export const txnCompletedCollection = db.collection<GoldCompletedTxn>('completed');

export const txnWalletCollection = db.collection<GoldWallet>('wallet');

const initTxnDatabaseIndex = () => {
  return Promise.all([
    txnTrackedCollection.createIndex({hash: 1}, {unique: true}),
    txnTrackedCollection.createIndex({from: 1, blockEpoch: -1}),
    txnCompletedCollection.createIndex({hash: 1}, {unique: true}),
    txnCompletedCollection.createIndex({accountId: 1}),
    txnWalletCollection.createIndex({wallet: 1}, {unique: true}),
  ]);
};

initTxnDatabaseIndex().catch((err) => console.error('Failed to init TxN db index', err));
