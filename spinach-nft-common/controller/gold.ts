import * as console from 'console';

import {walletPattern} from '@spinach/common/const/auth';
import {Mongo} from '@spinach/common/controller/const';
import {GoldCompletedTxn, GoldTrackedTxn, GoldWallet} from '@spinach/common/types/data/gold';


const db = Mongo.db('txn');

export const txnTrackedCollection = db.collection<GoldTrackedTxn>('tracked');

export const txnCompletedCollection = db.collection<GoldCompletedTxn>('completed');

export const txnWalletCollection = db.collection<GoldWallet>('wallet');

const initTxnDatabaseIndex = () => {
  return Promise.all([
    txnTrackedCollection.createIndex({hash: 1}, {unique: true}),
    txnTrackedCollection.createIndex({from: 1}),
    txnTrackedCollection.createIndex({blockEpoch: -1}),
    txnCompletedCollection.createIndex({hash: 1}, {unique: true}),
    txnCompletedCollection.createIndex({accountId: 1}),
    txnWalletCollection.createIndex({wallet: 1}, {unique: true}),
  ]);
};

initTxnDatabaseIndex().catch((err) => console.error('Failed to init TxN db index', err));

const initTxnWalletValidation = () => {
  // Needs to match the type of `Announcement`
  return db.command({
    collMod: 'wallet',
    validator: {
      $jsonSchema: {
        required: ['_id', 'wallet'],
        properties: {
          _id: {
            bsonType: 'objectId',
          },
          wallet: {
            bsonType: 'string',
            pattern: walletPattern,
          },
        },
        additionalProperties: false,
      },
    },
  });
};

initTxnWalletValidation().catch((err) => console.error('Failed to init TxN wallet validation', err));
